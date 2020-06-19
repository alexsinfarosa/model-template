import "typeface-inter"
import "./src/index.css"

import React from "react"
import { GlobalStateProvider } from "./src/context/globalStateContext"

export const wrapRootElement = ({ element }) => (
  <GlobalStateProvider>{element}</GlobalStateProvider>
)

exports.onInitialClientRender = () => {
  // Called when the initial (but not subsequent) render of Gatsby App is done on the client.
  console.log("ReactDOM.render has executed")
}
