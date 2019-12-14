import addAuthenticateUserRoute from "./authenticateUser"
import addGetEmployeeProjectsRoute from "./getEmployeeProjects"
import addGetParcelsRoute from "./getParcels"
import addGetTitlesRoute from "./getTitles"

export default async (app) => {
  addAuthenticateUserRoute(app)
  addGetEmployeeProjectsRoute(app)
  addGetParcelsRoute(app)
  addGetTitlesRoute(app)
}
