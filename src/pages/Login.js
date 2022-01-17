import { loggedInVar } from "../apollo"
import { Link } from "react-router-dom"

// styles
import styled from 'styled-components'
import { useState } from "react"



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


const MD = styled.div`
  background-color: rgb(250, 250, 250);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 80vh;
`

const CW = styled.div`
  flex-direction: column;
  gap: 20px;
  background-color: white;
  display: flex;
  
  align-items: center;
  justify-content: center;
  
  margin-top: 20px;
  padding: 30px 40px 30px 40px;
  border: ${p => p.theme.BOR1};

  width: 352px;
`


//////////////////////////////////////////////////////////////
//     FORM
const LoginForm = styled.form`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction:column;
  gap: 6px;
  align-items: center;
  justify-content: center;
`

const Input = styled.input`
  width: 100%;
  height: 38px;
  background-color: ${p => p.theme.BG10};
  border: ${p => p.theme.BOR1};
  padding-left: 10px;
  border-radius: 3px;

  ::placeholder {
    font-size: 0.62rem;
    color: #8d8d8d;
  }
`

const LoginBTN = styled.button`
  width: 100%;
  height: 32px;
  cursor: pointer;
  background-color: rgb(178, 223, 252);
  border: none;
  border-radius: 3px;
  margin-top: 11px;

  color: white;
  font-weight: 600;
`


const Title = styled.h1`
  color: #383838;
  font-family: Monotype Corsiva;
  font-size: 2.2rem;
  font-weight: 600;


`

const Subtitle = styled.h2`
  font-size: 0.5rem;
`

const TitleAndSubtitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  margin-bottom: 22px;
  color: #a8a8a8;
`

///////////////////////////////////////////////
//      MISC
const Separator = styled.div`
  display: flex;
  gap: 14px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const SeparatorLine = styled.div`
  background-color: #cacaca;

  height: 0.2px;
  width: 100%;
`

const SeparatorSpan = styled.span`
  font-weight: 600;
  font-size: 0.6rem;
  color: #969696;
`

const SignupText = styled.p`
  color: #2e2e2e;
  font-size: 0.7rem;

`

const SignupLink = styled(Link)`
  font-weight: 600;
  text-decoration: none;
  color: rgb(111, 152, 236);
`

export default Login