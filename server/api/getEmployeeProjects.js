import mysql from "../mysql"

export default async (app) => {
  app.post("/api/v0/getEmployeeProjects", async (request, response) => {
    const [sql, pool, procedures] = await mysql
    const invokeProcedure = procedures.getProjectsForEmployee(request.body)

    const handleSuccess = (data) => {
      const projects = data.recordset
      return response.send({ isSuccess: true, projects })
    }

    const handleError = (error) => {
      console.log("[ERROR] /api/v0/getEmployeeProjects", error)
      return response.status(400).send({ isSuccess: false, error })
    }

    invokeProcedure.then(handleSuccess)
    invokeProcedure.catch(handleError)
  })
}
