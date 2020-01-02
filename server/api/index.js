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
import getAllStates from "./getAllStates"
import getStateCounties from "./getStateCounties"
import associateParcelWithProject from "./associateParcelWithProject"
import insertParcel from "./insertParcel"

export default async (app) => {
  insertParcel(app)
  associateParcelWithProject(app)
  getParcelsForCounty(app)
  getAllStates(app)
  getStateCounties(app)
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
