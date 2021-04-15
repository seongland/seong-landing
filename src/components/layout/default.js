import React from "react"

import Paral from "../paral/index.jsx"
import Switch from "../switch"
import Snackbar from "../snackbar"
import { SnackbarProvider } from "notistack"

import "react-hot-loader"

export default function Layout({ children, location, ...args }) {
  console.log(location, args)
  return (
    <div style={{ margin: `0 auto`, maxWidth: 650, padding: `0 1rem` }}>
      <SnackbarProvider maxSnack={Infinity}>
        <Paral />
        <Switch />
        <Snackbar location={location} />
        {children}
      </SnackbarProvider>
    </div>
  )
}
