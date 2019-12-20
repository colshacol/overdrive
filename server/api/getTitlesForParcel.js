import mysql from "../mysql"

export default async (app) => {
  app.post("/api/v0/getTitlesForPacel", async (request, response) => {
    const [sql, pool, procedures] = await mysql
    const invokeProcedure = procedures.getTitlesForParcel(request.body)

    const handleSuccess = (data) => {
      const titles = data.recordset
      return response.send({ isSuccess: true, titles })
    }

    const handleError = (error) => {
      console.log("[ERROR] /api/v0/getTitlesForPacel", error)
      return response.status(400).send({ isSuccess: false, error })
    }

    invokeProcedure.then(handleSuccess)
    invokeProcedure.catch(handleError)
  })
}
