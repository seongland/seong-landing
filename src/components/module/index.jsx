import { useSprings } from "react-spring"
import { useDrag } from "react-use-gesture"
import { useState } from "react"

export const to = i => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -5 + Math.random() * 10,
  delay: i * 100,
})

export const isVertical = () => {
  if (window.innerHeight > window.innerWidth) return true
  return false
}

export const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })

export const trans = (r, s) =>
  `perspective(1500px) rotateX(10deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`

export function Deck(prop) {
  const cards = prop.urls
  const [gone] = useState(() => new Set())
  const [props, set] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i),
  }))
  const bind = useDrag(
    ({ args: [index], down, delta: [xDelta], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2
      const dir = xDir < 0 ? -1 : 1
      if (!down && trigger) gone.add(index)
      set(i => {
        if (index !== i) return
        const isGone = gone.has(index)
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0)
        const scale = down ? 1.1 : 1
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        }
      })
      if (!down && gone.size === cards.length)
        setTimeout(() => gone.clear() || set(i => to(i)), 600)
    }
  )
  return prop.deck(props, bind)
}
