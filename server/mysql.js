import sql from "mssql"

import { titles } from "../states.json"

const createProcedures = (sql, pool) => {
  const getUserByEmail = (parameters) => {
    return pool
      .request()
      .input("EmailAddress", sql.VarChar(50), parameters.emailAddress)
      .execute("dbo.EmployeeDetailByEmailSEL")
  }

  // "ProjectSEL" @ProjectID = 1
  const getProject = (parameters) => {
    return pool
      .request()
      .input("ProjectID", sql.VarChar(50), parameters.projectID)
      .execute("dbo.ProjectSEL")
  }

  const getEmployeesForProject = (parameters) => {
    console.log({ parameters })
    return pool
      .request()
      .input("ProjectID", sql.VarChar(50), parameters.projectID)
      .execute("dbo.ProjectTeamInfoSEL")
  }

  // "ParcelSEL" @ParcelID = 1
  const getParcel = (parameters) => {
    return pool
      .request()
      .input("ParcelID", sql.VarChar(50), parameters.parcelID)
      .execute("dbo.ParcelSEL")
  }

  // "TitleSEL" @TitleID = 1
  const getTitle = (parameters) => {
    return pool
      .request()
      .input("TitleID", sql.VarChar(50), parameters.titleID)
      .execute("dbo.TitleSEL")
  }

  // "ParcelsForProjectEmployeeSEL" @EmployeeID = 1, @ProjectID = 1
  const getParcelsForProject = (parameters) => {
    return (
      pool
        .request()
        .input("ProjectID", sql.VarChar(50), parameters.projectID)
        // .input("EmployeeID", sql.VarChar(50), parameters.employeeID)
        .execute("dbo.ParcelsForProjectEmployeeSEL")
    )
  }

  // "ProjectsForEmployeeIDSEL" @EmployeeID = 1
  const getProjectsForEmployee = (parameters) => {
    return pool
      .request()
      .input("EmployeeID", sql.VarChar(50), parameters.employeeID)
      .execute("dbo.ProjectsForEmployeeIDSEL")
  }

  const getParcelsForCounty = async (parameters) => {
    return pool
      .request()
      .input("StateCode", sql.VarChar(50), parameters.stateCode)
      .input("County", sql.VarChar(50), parameters.county)
      .execute("dbo.ParcelsForStateAndCountySEL")
    return titles
  }

  const getTitlesForParcel = (parameters) => {
    return pool
      .request()
      .input("ParcelID", sql.VarChar(50), parameters.parcelID)
      .execute("dbo.TitleDetailForParcelSEL")
  }

  const insertParcel = (parameters) => {
    console.log(parameters)
    return pool
      .request()
      .input("ParcelID", sql.Int, parameters.parcelID)
      .input("Acres", sql.Float, parameters.acres)
      .input("StateCode", sql.VarChar(50), parameters.stateCode)
      .input("County", sql.VarChar(50), parameters.county)
      .input("Section", sql.VarChar(50), parameters.section)
      .input("TownshipName", sql.VarChar(50), parameters.townshipName)
      .input("Range", sql.VarChar(50), parameters.range)
      .input("APN", sql.VarChar(50), parameters.apn)
      .input("LegalDescription", sql.VarChar(50), parameters.legalDescription)
      .input("Meridian", sql.VarChar(50), parameters.meridian)
      .input("Region", sql.VarChar(50), parameters.region)
      .execute("dbo.ParcelINS")
  }

  const updateParcel = (parameters) => {
    console.log(parameters)
    return pool
      .request()
      .input("ParcelID", sql.Int, parameters.parcelID)
      .input("Acres", sql.Float, parameters.acres)
      .input("StateCode", sql.VarChar(50), parameters.stateCode)
      .input("County", sql.VarChar(50), parameters.county)
      .input("Section", sql.VarChar(50), parameters.section)
      .input("TownshipName", sql.VarChar(50), parameters.townshipName)
      .input("Range", sql.VarChar(50), parameters.range)
      .input("APN", sql.VarChar(50), parameters.apn)
      .input("LegalDescription", sql.VarChar(50), parameters.legalDescription)
      .input("Meridian", sql.VarChar(50), parameters.meridian)
      .input("Region", sql.VarChar(50), parameters.region)
      .execute("dbo.ParcelUPD")
  }

  const getParcelDetails = (parameters) => {
    return pool
      .request()
      .input("ParcelID", sql.VarChar(50), parameters.parcelID)
      .input("ProjectID", sql.VarChar(50), parameters.projectID)
      .execute("dbo.ParcelDetailSEL")
  }

  const associateParcelWithProject = (parameters) => {
    console.log(parameters)
    return pool
      .request()
      .input("ProjectID", sql.Int, parameters.projectID)
      .input("ParcelID", sql.Int, parameters.parcelID)
      .input("EmployeeID", sql.Int, parameters.employeeID)
      .execute("dbo.AddParcelToProject")
  }

  const getStateCounties = (parameters) => {
    return pool
      .request()
      .input("StateID", sql.VarChar(50), parameters.stateID)
      .execute("dbo.CountySEL")
  }

  // "ParcelStatesSEL"
  const getStatesWithParcels = (parameters) => {
    return pool.request().execute("dbo.ParcelStatesSEL")
  }

  const getAllStates = (parameters) => {
    return pool.request().execute("dbo.USStateSEL")
  }

  // "ParcelCountiesForStateSEL" @StateCode = "DE"
  const getStateCountiesWithParcels = (parameters) => {
    return pool
      .request()
      .input("StateCode", sql.VarChar(50), parameters.stateCode)
      .execute("dbo.ParcelCountiesForStateSEL")
  }

  return {
    updateParcel,
    getEmployeesForProject,
    getProject,
    getParcel,
    getTitle,
    getUserByEmail,
    getParcelsForCounty,
    getParcelsForProject,
    getProjectsForEmployee,
    getTitlesForParcel,
    getStatesWithParcels,
    getStateCountiesWithParcels,
    getAllStates,
    getStateCounties,
    insertParcel,
    associateParcelWithProject,
    getParcelDetails,
  }
}

export default (async () => {
  const pool = await sql.connect(
    "mssql://plmweb:Global3404@plmland.database.windows.net/landdev?encrypt=true"
  )

  const procedures = createProcedures(sql, pool)
  return [sql, pool, procedures]
})()

// mssql -s plmland.database.windows.net -u plmweb -p Global3404 -d landdev -e
