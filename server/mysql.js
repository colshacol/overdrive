import sql from "mssql"
import procedures from "./procedures"

const createProcedures = (sql, pool) => {
  const getUserByEmail = (parameters) => {
    return pool
      .request()
      .input("EmailAddress", sql.VarChar(50), parameters.emailAddress)
      .execute("dbo.EmployeeDetailByEmailSEL")
  }

  const getParcelsForProject = (parameters) => {
    return pool
      .request()
      .input("ProjectID", sql.VarChar(50), parameters.projectID)
      .input("EmployeeID", sql.VarChar(50), parameters.employeeID)
      .execute("dbo.ParcelsForProjectEmployeeSEL")
  }

  const getProjectsForEmployee = (parameters) => {
    return pool
      .request()
      .input("EmployeeID", sql.VarChar(50), parameters.employeeID)
      .execute("dbo.ProjectsForEmployeeIDSEL")
  }

  const getTitlesForParcel = (parameters) => {
    return pool
      .request()
      .input("ParcelID", sql.VarChar(50), parameters.parcelID)
      .execute("dbo.TK")
  }

  return {
    getUserByEmail,
    getParcelsForProject,
    getProjectsForEmployee,
    getTitlesForParcel,
  }
}

export default (async () => {
  const pool = await sql.connect(
    "mssql://plmweb:Global3404@plmland.database.windows.net/landdev?encrypt=true"
  )

  const procedures = createProcedures(sql, pool)
  return [sql, pool, procedures]
})()
