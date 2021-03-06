import * as React from "react"

export const useClickHandler = (query, handler) => {
  const _handler = typeof query === "string" ? handler : query

  React.useEffect(() => {
    const target =
      typeof query === "string" ? document.querySelector(query) : document

    target.addEventListener("click", handler)

    return () => {
      console.log("removing listener")
      target.removeEventListener("click", handler)
    }
  }, [query, handler])
}
