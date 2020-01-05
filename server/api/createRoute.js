import mysql from "../mysql"

export default (options) => {
  return (app) => {
    app.post(options.path, async (request, response) => {
      const [sql, pool, procedures] = await mysql
      const invokeProcedure = procedures[options.procedure](request.body)

      const handleSuccess = (data) => {
        return response.send({ isSuccess: true, ...options.handleData(data) })
      }

      const handleError = (error) => {
        console.log("[ERROR] /api/v0/" + options.path, error)
        return response.status(400).send({ isSuccess: false, error })
      }

      invokeProcedure.then(handleSuccess)
      invokeProcedure.catch(handleError)
    })
  }
}
