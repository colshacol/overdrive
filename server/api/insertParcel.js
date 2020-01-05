import mysql from "../mysql"

export default async (app) => {
  app.post("/api/v0/insertParcel", async (request, response) => {
    const [sql, pool, procedures] = await mysql
    const invokeProcedure = procedures.insertParcel(request.body)

    const handleSuccess = (data) => {
      return response.send({ isSuccess: true, parcel: data.recordset[0] })
    }

    const handleError = (error) => {
      console.log("[ERROR] /api/v0/insertParcel", error)
      return response.status(400).send({ isSuccess: false, error })
    }

    invokeProcedure.then(handleSuccess)
    invokeProcedure.catch(handleError)
  })
}
