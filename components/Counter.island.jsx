import { useState } from 'preact/hooks'

export default function Counter({ initValue = 0 }) {
  const [x, setX] = useState(initValue)

  const onClick = () => {
    setX(x + 1)
  }

  return (
    <button class="btn" onClick={onClick}>
      {x}
    </button>
  )
}
