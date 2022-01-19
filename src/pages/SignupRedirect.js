import { loggedInVar } from "../graphql/apollo"
import { useLocation, useNavigate, Navigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { SIGNUP } from "../graphql/queries"
import { useState } from "react"
import { useMutation } from "@apollo/client"

// styles
import styled from 'styled-components'
import { MDtop, CW, LoginForm, Input, BlueBTN, Title, Subtitle, Subtitle2, TitleAndSubtitle, Separator, SeparatorLine, SeparatorSpan, SignupText, SignupLink } from '../STYLES/styleForm'
import { GrFacebook } from "react-icons/gr"

import ErrorLogin from '../components/ErrorLogin'

const SignupRedirect = () => {
  const location = useLocation()
  const navigate = useNavigate()
  console.log('location', location)

  if (location?.state?.ok) {
    return (
      <MDtop>
        <CWsignupRedirect>
          <SignupText>Success! Your account has been created. You can login now: <SignupLink to="/login">Sign In</SignupLink></SignupText>
        </CWsignupRedirect>
      </MDtop>
    )
  }
  return <Navigate to='/' /> // redirect home if user came to this page not after signup
}

const CWsignupRedirect = styled(CW)`
  line-height: 1.64;
  text-align: center;
`

const SignupBTN = styled(BlueBTN)`
  margin-top: 11px;
  background-color: ${p => p.disabled ? "rgb(178, 223, 252)" : "#0095F6"}
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
export default SignupRedirect