import * as React from "react"
import * as apiV0 from "../services/api/v0"

export const useEmployeesAssignedToParcel = (parcelID) => {
  const [employees, setEmployees] = React.useState([])

  React.useEffect(() => {
    apiV0.getEmployeesAssignedToParcel({ parcelID }).then((employees) => {
      setEmployees(employees)
    })
  }, [parcelID])

  return employees
}
