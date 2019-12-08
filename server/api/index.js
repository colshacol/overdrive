import addAuthenticateUserRoute from "./authenticateUser"
import addGetEmployeeProjectsRoute from "./getProjectsForEmployee"
import getStatesWithParcels from "./getStatesWithParcels"
import getStateCountiesWithParcels from "./getStateCountiesWithParcels"
import addGetParcelsRoute from "./getParcelsForProject"
import addGetTitlesRoute from "./getTitlesForParcel"
import getParcel from "./getParcel"
import getTitle from "./getTitle"
import getProject from "./getProject"
import getParcelsForCounty from "./getParcelsForCounty"

export default async (app) => {
  getParcelsForCounty(app)
  getParcel(app)
  getTitle(app)
  getProject(app)
  addAuthenticateUserRoute(app)
  addGetEmployeeProjectsRoute(app)
  addGetParcelsRoute(app)
  addGetTitlesRoute(app)
  getStatesWithParcels(app)
  getStateCountiesWithParcels(app)
}
