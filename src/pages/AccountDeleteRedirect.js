
import { useLocation, Navigate } from "react-router-dom"

// styles
import styled from 'styled-components'
import { MDtop, CW, SignupText, SignupLink } from '../STYLES/styleForm'


const AccountDeleteRedirect = () => {
  const location = useLocation()

  if (location?.state?.ok) {
    return (
      <MDtop>
        <CWAccountDeleteRedirectRedirect>
          <SignupText>Success! Your account has been deleted. You can create a new one: <SignupLink to="/signup">Sign Up</SignupLink></SignupText>
        </CWAccountDeleteRedirectRedirect>
      </MDtop>
    )
  }

  return <Navigate to='/' /> // redirect home if user came to this page not after signup
}


const CWAccountDeleteRedirectRedirect = styled(CW)`
  line-height: 1.64;
  text-align: center;
`

export default AccountDeleteRedirect