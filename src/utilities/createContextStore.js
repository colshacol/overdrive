import * as React from "react"

const createContextStore = (creator) => {
  const Context = React.createContext()

  const Provider = (props) => {
    const store = creator(props)

    return <Context.Provider value={store}>{props.children}</Context.Provider>
  }

  const useStore = () => {
    return React.useContext(Context)
  }

  return [Provider, useStore]
}

export { createContextStore }
export default createContextStore
