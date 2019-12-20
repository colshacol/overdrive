import mysql from "../mysql"

export default async (app) => {
  app.post("/api/v0/getTitle", async (request, response) => {
    const [sql, pool, procedures] = await mysql
    const invokeProcedure = procedures.getTitle(request.body)

    const handleSuccess = (data) => {
      const titles = data.recordset
      return response.send({ isSuccess: true, parcel: titles[0] })
    }

    const handleError = (error) => {
      console.log("[ERROR] /api/v0/getTitle", error)
      return response.status(400).send({ isSuccess: false, error })
    }

    invokeProcedure.then(handleSuccess)
    invokeProcedure.catch(handleError)
  })
}
