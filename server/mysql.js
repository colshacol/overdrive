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
    return pool
      .request()
      .input("ParcelID", sql.VarChar(50), parameters.parcelID)
      .input("Acres", sql.VarChar(50), parameters.acres)
      .input("StateCode", sql.VarChar(50), parameters.stateCode)
      .input("County", sql.VarChar(50), parameters.county)
      .input("Section", sql.VarChar(50), parameters.section)
      .input("TownshipName", sql.VarChar(50), parameters.townshipName)
      .input("Range", sql.VarChar(50), parameters.range)
      .input("StatusID", sql.Int, parameters.statusID)
      .input("APN", sql.VarChar(50), parameters.apn)
      .input("LegalDescription", sql.VarChar(50), parameters.legalDescription)
      .input("Meridian", sql.VarChar(50), parameters.meridian)
      .input("Region", sql.VarChar(50), parameters.region)
      .execute("dbo.ParcelINS")
  }

  const associateParcelWithProject = (parameters) => {
    return pool
      .request()
      .input("ParcelID", sql.VarChar(50), parameters.parcelID)
      .input("ProjectID", sql.VarChar(50), parameters.projectID)
      .input("StatusID", sql.VarChar(50), parameters.statusID)
      .input("EmployeeID", sql.VarChar(50), parameters.employeeID)
      .input("DateAssigned", sql.VarChar(50), parameters.dateAssigned)
      .input("DateCompleted", sql.VarChar(50), parameters.dateCompleted)
      .execute("dbo.ProjectParcelAssociationUPD")
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
