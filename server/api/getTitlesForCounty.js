import mysql from "../mysql"
import { titles } from "../../states.json"

export default async (app) => {
  app.post("/api/v0/getTitlesForCounty", async (request, response) => {
    return response.send({ isSuccess: true, titles })

    const [sql, pool, procedures] = await mysql
    const invokeProcedure = procedures.getTitlesForCounty(request.body)

    const handleSuccess = (data) => {
      const parcels = data.recordset
      return response.send({ isSuccess: true, parcels })
    }

    const handleError = (error) => {
      console.log("[ERROR] /api/v0/getTitlesForCounty", error)
      return response.status(400).send({ isSuccess: false, error })
    }

    invokeProcedure.then(handleSuccess)
    invokeProcedure.catch(handleError)
  })
}
