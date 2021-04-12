import React, { useReducer } from "react"
import useSound from "use-sound"

import Fab from "@material-ui/core/Fab"
import { PlayArrow, Pause } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"

import loop from "../sound/loop.mp3"

const reducer = (_, action) => ({ on: action })

const useStyles = makeStyles(theme => ({
  fab: {
    position: "absolute",
    top: theme.spacing(3),
    right: theme.spacing(3),
  },
}))

export default () => {
  const [state, dispatch] = useReducer(reducer, { on: false })
  const classes = useStyles()
  const [start, { stop }] = useSound(loop, { loop: true })

  const handleClick = () => {
    if (state.on) stop()
    dispatch(!state.on)
    if (!state.on) start()
  }
  return (
    <Fab
      onClick={handleClick}
      size="small"
      color="primary"
      aria-label="add"
      className={classes.fab}
    >
      {state.on ? <Pause /> : <PlayArrow />}
    </Fab>
  )
}
