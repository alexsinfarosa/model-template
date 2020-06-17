import "typeface-inter"
import "./src/index.css"

import React from "react"
import { GlobalStateProvider } from "./src/context/globalStateContext"

export const wrapRootElement = ({ element }) => {
  return <GlobalStateProvider>{element}</GlobalStateProvider>
}
