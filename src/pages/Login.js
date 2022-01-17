import { loggedInVar } from "../apollo"

// styles
import styled from 'styled-components'
import { useState } from "react"


const Login = () => {
  const [potato, setPotato] = useState(false)
  console.log(potato)
  const togglePotato = () => setPotato(p => !p)
  return (
    <div>
      <Title onClick={togglePotato} potato={potato}>Login Compo</Title>
      <button onClick={() => loggedInVar(true)} >login</button>
      <button onClick={togglePotato}>togglePOtat</button>
    </div>
  )
}


const Title = styled.h1`
  color: ${p => p.theme.fontColor};
`

export default Login