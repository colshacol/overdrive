import mysql from "./mysql"
import get from "get-value"

const getSqlType = (sql, value) => {
  if (value === "Int") {
    return sql.Int
  } else if (value === "DateTime") {
    return sql.DateTime
  } else if (value === "VarChar") {
    return sql.VarChar(50)
  }
}

export default (app) => {
  app.post("/api/v0/procRoute", async (request, response) => {
    const { body } = request

    console.log({ body })
    const [sql, pool, procedures] = await mysql

    let req = pool.request()

    for (const input of body.input) {
      req = req.input(input[0], getSqlType(sql, input[1]), input[2])
    }

    const invocation = req.execute(`dbo.${body.procedureName}`)

    const handleSuccess = (data) => {
      console.log({ data })
      console.log(get(data, body.dataPath))
      return response.send({ isSuccess: true, data: get(data, body.dataPath) })
    }

    const handleError = (error) => {
      console.log("[ERROR] /api/v0/procRoute : ", body.procedureName, error)
      return response.status(400).send({ isSuccess: false, error })
    }

    invocation.then(handleSuccess)
    invocation.catch(handleError)

    return invocation
  })
}
