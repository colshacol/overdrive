import * as React from "react"
import * as apiV0 from "../services/api/v0"

export const useEmployeesForProject = (options) => {
  const [employees, setEmployees] = React.useState([])

  React.useEffect(() => {
    console.log({ options })
    apiV0.getEmployeesForProject(options).then((employees) => {
      console.log({ employees })
      setEmployees(employees)
    })
  }, [options.projectID])

  return employees
}
