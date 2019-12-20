import mysql from "../mysql"

export default async (app) => {
  app.post("/api/v0/getProject", async (request, response) => {
    const [sql, pool, procedures] = await mysql
    const invokeProcedure = procedures.getProject(request.body)

    const handleSuccess = (data) => {
      const projects = data.recordset
      return response.send({ isSuccess: true, parcel: projects[0] })
    }

    const handleError = (error) => {
      console.log("[ERROR] /api/v0/getProject", error)
      return response.status(400).send({ isSuccess: false, error })
    }

    invokeProcedure.then(handleSuccess)
    invokeProcedure.catch(handleError)
  })
}

ProjectSEL
