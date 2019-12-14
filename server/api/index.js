import addAuthenticateUserRoute from "./authenticateUser"
import addGetParcelsRoute from "./getParcels"
import addGetTitlesRoute from "./getTitles"

export default async (app) => {
  addAuthenticateUserRoute(app)
  addGetParcelsRoute(app)
  addGetTitlesRoute(app)
}
