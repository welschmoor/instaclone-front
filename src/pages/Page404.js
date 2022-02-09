import { Helmet } from "react-helmet-async"
import styled from "styled-components"
import { MWr, CWr } from '../STYLES/styleWrappers'
import { Link, useNavigate } from "react-router-dom"


const Page404 = () => {
  const navigate = useNavigate()
  const redirectBack = () => {
    navigate(-1)
  }

  return (
    <MWr>
      <Page404Wrapper>
        <Helmet><title>404 Page not found - Instapound </title></Helmet>
        <p>404 Page not found</p>
        <p >You can return to the <StyledLink onClick={redirectBack}> previous page</StyledLink></p>
        <p>or you can go to the <Link to={'/'}>Home page</Link></p>

      </Page404Wrapper>
    </MWr >
  )
}

const Page404Wrapper = styled.div`
  padding-top: 40px;

  p {
    margin-bottom: 12px;
    color: ${p => p.theme.TEXT.mainLogo};
  }
`

const StyledLink = styled.span`
  text-decoration: underline;
  color: #3333af;
  cursor: pointer;
`

export default Page404