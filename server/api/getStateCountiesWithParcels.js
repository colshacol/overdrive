import mysql from "../mysql"

export default async (app) => {
  app.post("/api/v0/getStateCountiesWithParcels", async (request, response) => {
    const [sql, pool, procedures] = await mysql
    const invokeProcedure = procedures.getStateCountiesWithParcels(request.body)

    const handleSuccess = (data) => {
      const counties = data.recordset
      return response.send({ isSuccess: true, counties })
    }

    const handleError = (error) => {
      console.log("[ERROR] /api/v0/getStateCountiesWithParcels", error)
      return response.status(400).send({ isSuccess: false, error })
    }

    invokeProcedure.then(handleSuccess)
    invokeProcedure.catch(handleError)
  })
}
