import React, { useEffect } from "react"
import { useSnackbar } from "notistack"

export default () => {
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => enqueueSnackbar("location"), [enqueueSnackbar])
  return <div></div>
}
