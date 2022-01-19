
import { useLocation, Navigate } from "react-router-dom"

// styles
import styled from 'styled-components'
import { MDtop, CW, SignupText, SignupLink } from '../STYLES/styleForm'


const SignupRedirect = () => {
  const location = useLocation()

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

export default SignupRedirect