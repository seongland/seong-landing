import React from "react"

import Paral from "../paral/index.jsx"
import Switch from "../switch"
import Snackbar from "../snackbar"
import { SnackbarProvider } from "notistack"

import "react-hot-loader"

export default function Layout({ children, location, ...args }) {
  return (
    <SnackbarProvider maxSnack={Infinity}>
      <Paral />
      <Switch />
      <Snackbar location={location} />
      {children}
    </SnackbarProvider>
  )
}
