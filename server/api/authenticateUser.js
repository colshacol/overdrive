import mysql from "../mysql"

export default async (app) => {
  app.post("/api/v0/authenticateUser", async (request, response) => {
    const [sql, pool, procedures] = await mysql
    const invokeProcedure = procedures.getUserByEmail(request.body)

    const handleSuccess = (data) => {
      const user = data.recordset[0]

      return user.PHash === request.body.password
        ? response.send({ isSuccess: true, user })
        : response.status(404).send({ isSuccess: false })
    }

    const handleError = (error) => {
      console.log("[ERROR] /api/authenticateUser", error)
      return response.status(400).send({ isSuccess: false })
    }

    invokeProcedure.then(handleSuccess)
    invokeProcedure.catch(handleError)
  })
}
