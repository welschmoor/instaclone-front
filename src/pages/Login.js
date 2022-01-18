import { loggedInVar } from "../apollo"
import { Link } from "react-router-dom"

// styles
import styled from 'styled-components'
import { useState } from "react"
import { MD, CW, LoginForm, Input, BlueBTN, Title, Subtitle, TitleAndSubtitle, Separator, SeparatorLine, SeparatorSpan, SignupText, SignupLink } from '../STYLES/styleForm'



const Login = () => {
  const [potato, setPotato] = useState(false)
  console.log(potato)
  const togglePotato = () => setPotato(p => !p)
  return (
    <MD>
      <CW>
        <TitleAndSubtitle>
          <Title onClick={togglePotato} potato={potato}>Instapound</Title>
          <Subtitle>For those who don't know the metric system</Subtitle>
        </TitleAndSubtitle>

        <LoginForm>
          <Input type="text" placeholder="Phone number, username, or email" />
          <Input type="password" placeholder="Password" />
          <LoginBTN type='submit' onClick={() => loggedInVar(true)} >Log In</LoginBTN>
        </LoginForm>

        <Separator>
          <SeparatorLine />
          <SeparatorSpan>OR</SeparatorSpan>
          <SeparatorLine />
        </Separator>
        <SignupText>Or just don't log in!</SignupText>
      </CW>
      <CW>
        <SignupText>Don't have an account? <SignupLink to="/signup">Sign Up</SignupLink></SignupText>
      </CW>
    </MD>
  )
}


const LoginBTN = styled(BlueBTN)`
  margin-top: 11px;
`


export default Login