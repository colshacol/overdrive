import mysql from "../mysql"

export default async (app) => {
  app.post("/api/v0/getParcel", async (request, response) => {
    const [sql, pool, procedures] = await mysql
    const invokeProcedure = procedures.getParcel(request.body)

    const handleSuccess = (data) => {
      const parcels = data.recordset
      return response.send({ isSuccess: true, parcel: parcels[0], data })
    }

    const handleError = (error) => {
      console.log("[ERROR] /api/v0/getParcel", error)
      return response.status(400).send({ isSuccess: false, error })
    }

    invokeProcedure.then(handleSuccess)
    invokeProcedure.catch(handleError)
  })
}
