import wretch from "wretch"

type ProcedureOptionsT = {
  procedureName: string,
  dataPath: string,
  input: [][],
}

export const invokeProcedure = (options: ProcedureOptionsT) => {
  return wretch(window.__env.serverUrl + "/api/v0/procRoute")
    .post(options)
    .json((response) => {
      console.log(options.procedureName, response[options.dataPath])
      return response.data
    })
}

const makeRequest = (pathName, options) => {
  return wretch(window.__env.serverUrl + "/api/v0/" + pathName)
    .post(options)
    .json((response) => {
      const logMethod = response.isSuccess ? console.log : console.error
      logMethod(`${pathName}: `, response)
      return response
    })
}

export const authenticate = (emailAddress, password) => {
  return wretch(window.__env.serverUrl + "/api/v0/authenticateUser")
    .post({
      emailAddress,
      password,
    })
    .json((response) => {
      return response
    })
}

export const updateParcel = (options) => {
  return makeRequest("updateParcel", options).then((response) => {
    return response
  })
}

export const getEmployeesForProject = (options) => {
  return makeRequest("getEmployeesForProject", options).then((response) => {
    return response.employees
  })
}

export const getEmployeesAssignedToParcel = (options) => {
  return makeRequest("getEmployeesAssignedToParcel", options).then(
    (response) => {
      return response.employees
    }
  )
}

export const getProjectsForEmployee = (employeeID) => {
  return wretch(window.__env.serverUrl + "/api/v0/getProjectsForEmployee")
    .post({
      employeeID: Number(employeeID),
    })
    .json((response) => {
      if (response.isSuccess) {
        console.log("getProjectsForEmployee: ", response)
        return response.projects
      }

      return response
    })
}

export const getParcelDetails = (options) => {
  return makeRequest("getParcelDetails", options).then((response) => {
    return response.parcel
  })
}

export const getParcel = (options) => {
  return makeRequest("getParcel", options).then((response) => {
    return response.parcel
  })
}

export const getProject = (projectID) => {
  return wretch(window.__env.serverUrl + "/api/v0/getProject")
    .post({
      projectID: Number(projectID),
    })
    .json((response) => {
      if (response.isSuccess) {
        console.log("getProject: ", response)
        return response.project
      }

      return response
    })
}

export const getTitle = (titleID) => {
  return wretch(window.__env.serverUrl + "/api/v0/getTitle")
    .post({
      titleID: Number(titleID),
    })
    .json((response) => {
      if (response.isSuccess) {
        console.log("getTitle: ", response)
        return response.title
      }

      return response
    })
}

export const getTitlesForPacel = (parcelID) => {
  return wretch(window.__env.serverUrl + "/api/v0/getTitlesForPacel")
    .post({
      parcelID: Number(parcelID),
    })
    .json((response) => {
      if (response.isSuccess) {
        console.log("getTitlesForPacel: ", response)
        return response.titles
      }

      return response
    })
}

export const getParcelsForProject = (employeeID, projectID) => {
  return wretch(window.__env.serverUrl + "/api/v0/getParcelsForProject")
    .post({
      employeeID: Number(employeeID),
      projectID: Number(projectID),
    })
    .json((response) => {
      if (response.isSuccess) {
        console.log("getParcelsForProject: ", response)
        return response.parcels
      }

      return response
    })
}

export const getAllStates = () => {
  return wretch(window.__env.serverUrl + "/api/v0/getAllStates")
    .post({})
    .json((response) => {
      if (response.isSuccess) {
        console.log("getAllStates: ", response)
        return response.states
      }

      return response
    })
}

export const associateParcelWithProject = (options) => {
  return wretch(window.__env.serverUrl + "/api/v0/associateParcelWithProject")
    .post(options)
    .json((response) => {
      if (response.isSuccess) {
        console.log("associateParcelWithProject: ", response)
        return response
      }

      return response
    })
}

export const insertParcel = (options) => {
  return wretch(window.__env.serverUrl + "/api/v0/insertParcel")
    .post(options)
    .json((response) => {
      if (response.isSuccess) {
        console.log("insertParcel: ", response)

        return new Promise((resolve) => {
          const doIt = () =>
            setTimeout(() => {
              return associateParcelWithProject({
                ...options,
                parcelID: response.parcel.ParcelID,
              }).then((res) => {
                if (res.isSuccess) {
                  return resolve(response)
                } else {
                  doIt()
                }
              })
            }, 1000)

          doIt()
        })
      }

      return response
    })
}

export const getStateCounties = (stateID) => {
  return wretch(window.__env.serverUrl + "/api/v0/getStateCounties")
    .post({ stateID })
    .json((response) => {
      if (response.isSuccess) {
        console.log("getStateCounties: ", response)
        return response.counties
      }

      return response
    })
}

export const getStatesWithParcels = () => {
  return wretch(window.__env.serverUrl + "/api/v0/getStatesWithParcels")
    .post({})
    .json((response) => {
      if (response.isSuccess) {
        console.log("getStatesWithParcels: ", response)
        return response.states
      }

      return response
    })
}

export const getStateCountiesWithParcels = (stateCode) => {
  return wretch(window.__env.serverUrl + "/api/v0/getStateCountiesWithParcels")
    .post({ stateCode })
    .json((response) => {
      if (response.isSuccess) {
        console.log("getStateCountiesWithParcels: ", response)
        return response.counties
      }

      return response
    })
}

export const getParcelsForCounty = (stateCode, county) => {
  return wretch(window.__env.serverUrl + "/api/v0/getParcelsForCounty")
    .post({ stateCode, county })
    .json((response) => {
      if (response.isSuccess) {
        console.log("getParcelsForCounty: ", response)
        return response.parcels
      }

      return response
    })
}

// getStateCountiesWithParcels
