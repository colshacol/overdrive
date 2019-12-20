import sql from "mssql"

const createProcedures = (sql, pool) => {
  const getUserByEmail = (parameters) => {
    return pool
      .request()
      .input("EmailAddress", sql.VarChar(50), parameters.emailAddress)
      .execute("dbo.EmployeeDetailByEmailSEL")
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
    return pool
      .request()
      .input("ProjectID", sql.VarChar(50), parameters.projectID)
      .input("EmployeeID", sql.VarChar(50), parameters.employeeID)
      .execute("dbo.ParcelsForProjectEmployeeSEL")
  }

  // "ProjectsForEmployeeIDSEL" @EmployeeID = 1
  const getProjectsForEmployee = (parameters) => {
    return pool
      .request()
      .input("EmployeeID", sql.VarChar(50), parameters.employeeID)
      .execute("dbo.ProjectsForEmployeeIDSEL")
  }

  // TODO: This shit.
  const getTitlesForParcel = (parameters) => {
    return pool
      .request()
      .input("ParcelID", sql.VarChar(50), parameters.parcelID)
      .execute("dbo.TK")
  }

  // "ParcelStatesSEL"
  const getStatesWithParcels = (parameters) => {
    return pool.request().execute("dbo.ParcelStatesSEL")
  }

  // "ParcelCountiesForStateSEL" @StateCode = "DE"
  const getStateCountiesWithParcels = (parameters) => {
    return pool
      .request()
      .input("StateCode", sql.VarChar(50), parameters.stateCode)
      .execute("dbo.ParcelCountiesForStateSEL")
  }

  return {
    getParcel,
    getTitle,
    getUserByEmail,
    getParcelsForProject,
    getProjectsForEmployee,
    getTitlesForParcel,
    getStatesWithParcels,
    getStateCountiesWithParcels,
  }
}

export default (async () => {
  const pool = await sql.connect(
    "mssql://plmweb:Global3404@plmland.database.windows.net/landdev?encrypt=true"
  )

  const procedures = createProcedures(sql, pool)
  return [sql, pool, procedures]
})()

// mssql -s plmland.database.windows.net -u username@plmweb -p Global3404 -d landdev -e
