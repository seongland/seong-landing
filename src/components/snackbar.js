import React, { useEffect } from "react"
import { useSnackbar } from "notistack"
import { navigate } from "@reach/router"
import axios from "axios"
import consola from "consola"
import decode from "jwt-decode"

export default ({ location }) => {
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    let searchParams = new URLSearchParams(location.search)
    const accessToken = searchParams.get("access_token")
    if (accessToken) hiUser(accessToken, enqueueSnackbar)
  }, [enqueueSnackbar, location])
  return <div></div>
}

async function hiUser(accessToken, enqueueSnackbar) {
  try {
    const sub = decode(accessToken).sub
    const config = { headers: { Authorization: accessToken } }
    const res = await axios(`https://account.seongland.com/user/${sub}`, config)
    const user = res.data
    login({ accessToken, user })
    enqueueSnackbar(`Hello ${user.name}`)
    navigate("/")
  } catch (e) {
    consola.error(e)
    logout()
  }
}

async function logout() {
  console.log("logout")
}

async function login() {
  console.log("login")
}
