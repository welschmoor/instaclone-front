import { loggedInVar } from "../apollo"
import { Link } from "react-router-dom"

// styles
import styled from 'styled-components'
import { useState } from "react"
import { MD, CW, LoginForm, Input, BlueBTN, Title, Subtitle, Subtitle2, TitleAndSubtitle, Separator, SeparatorLine, SeparatorSpan, SignupText, SignupLink } from '../STYLES/styleForm'
import { GrFacebook } from "react-icons/gr"


const Signup = () => {
  const [potato, setPotato] = useState(false)
  console.log(potato)
  const togglePotato = () => setPotato(p => !p)
  return (
    <MD>
      <CW>
        <TitleAndSubtitle>
          <Title onClick={togglePotato} potato={potato}>Instapound</Title>
          <Subtitle2>Sign up to see photos and videos from your friends.</Subtitle2>
        </TitleAndSubtitle>
        <FacebookBTN type='submit' onClick={() => loggedInVar(true)} ><FacebookIcon/>Log in with Facebook</FacebookBTN>

        <Separator>
          <SeparatorLine />
          <SeparatorSpan>OR</SeparatorSpan>
          <SeparatorLine />
        </Separator>
        <LoginForm>
          <Input type="text" placeholder="Email" />
          <Input type="text" placeholder="Full Name" />
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <SignupBTN type='submit' onClick={() => loggedInVar(true)} >Sign Up</SignupBTN>
        </LoginForm>


        <Terms>By signing up, you agree to our <Bold>Terms</Bold>. Learn how we collect, use and share your data in our <Bold>Data Policy</Bold> and how we use cookies and similar technology in our <Bold>Cookies Policy</Bold>.</Terms>
      </CW>
      <CW>
        <SignupText>Have an account? <SignupLink to="/login">Sign In</SignupLink></SignupText>
      </CW>
    </MD>
  )
}


const SignupBTN = styled(BlueBTN)`
  margin-top: 11px;
`

const FacebookBTN = styled(BlueBTN)`
  background-color: #0095F6;
`

const FacebookIcon = styled(GrFacebook)`
  margin-right: 7px;
  font-size: 0.76rem;
  transform: translateY(2px);
`

const Terms = styled.p`
  text-align: center;
  font-size: 0.60rem;
  color: #818181;
  line-height: 1.3;
`

const Bold = styled.span`
  font-weight: bold;
`
export default Signup