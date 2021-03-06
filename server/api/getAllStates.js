import mysql from "../mysql"

export default async (app) => {
  app.post("/api/v0/getAllStates", async (request, response) => {
    const [sql, pool, procedures] = await mysql
    const invokeProcedure = procedures.getAllStates(request.body)

    const handleSuccess = (data) => {
      const states = data.recordset
      return response.send({ isSuccess: true, states })
    }

    const handleError = (error) => {
      console.log("[ERROR] /api/v0/getAllStates", error)
      return response.status(400).send({ isSuccess: false, error })
    }

    invokeProcedure.then(handleSuccess)
    invokeProcedure.catch(handleError)
  })
}
