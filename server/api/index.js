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
import insertParcel from "./insertParcel"

import createRoute from "./createRoute"

const authenticateUser = createRoute({
  path: "/api/v0/authenticateUser",
  procedure: "authenticateUser",
  handleData: (data) => {
    return { user: data.recordset[0] }
  },
})

const associateParcelWithProject = createRoute({
  path: "/api/v0/associateParcelWithProject",
  procedure: "associateParcelWithProject",
  handleData: (data) => {
    return { data }
  },
})

const getParcelDetails = createRoute({
  path: "/api/v0/getParcelDetails",
  procedure: "getParcelDetails",
  handleData: (data) => {
    return { parcel: data.recordset[0] }
  },
})

const getEmployeesForProject = createRoute({
  path: "/api/v0/getEmployeesForProject",
  procedure: "getEmployeesForProject",
  handleData: (data) => {
    return { employees: data.recordsets[0] }
  },
})

const updateParcel = createRoute({
  path: "/api/v0/updateParcel",
  procedure: "updateParcel",
  handleData: (data) => {
    return { data }
  },
})

export default async (app) => {
  getParcelDetails(app)
  associateParcelWithProject(app)
  authenticateUser(app)
  getEmployeesForProject(app)
  updateParcel(app)

  insertParcel(app)
  getParcelsForCounty(app)
  getAllStates(app)
  getStateCounties(app)
  getParcel(app)
  getTitle(app)
  getProject(app)
  addGetEmployeeProjectsRoute(app)
  addGetParcelsRoute(app)
  addGetTitlesRoute(app)
  getStatesWithParcels(app)
  getStateCountiesWithParcels(app)
}
