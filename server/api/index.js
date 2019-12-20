import addAuthenticateUserRoute from "./authenticateUser"
import addGetEmployeeProjectsRoute from "./getProjectsForEmployee"
import getStatesWithParcels from "./getStatesWithParcels"
import getStateCountiesWithParcels from "./getStateCountiesWithParcels"
import addGetParcelsRoute from "./getParcelsForProject"
import addGetTitlesRoute from "./getTitlesForParcel"
import getParcel from "./getParcel"

export default async (app) => {
  getParcel(app)
  addAuthenticateUserRoute(app)
  addGetEmployeeProjectsRoute(app)
  addGetParcelsRoute(app)
  addGetTitlesRoute(app)
  getStatesWithParcels(app)
  getStateCountiesWithParcels(app)
}
