
import { useReactiveVar } from "@apollo/client"
import { NavLink } from "react-router-dom"
import { loggedInVar } from "../graphql/apollo"

// styled
import styled from "styled-components"
import { MDtop, LoginForm, Input, BlueBTN, Title, Subtitle, TitleAndSubtitle, Separator, SeparatorLine, SeparatorSpan, SignupText, SignupLink } from '../STYLES/styleForm'
import { GrHomeRounded, GrSend, GrAddCircle } from "react-icons/gr"
import { CgAddR, CgHomeAlt, CgMail } from "react-icons/cg"


const Navbar = ({ setDarkMode }) => {
  const loggedInBool = useReactiveVar(loggedInVar)


  const logout = () => {
    loggedInVar(false)
    localStorage.removeItem("instapoundtoken")
  }

  const darkModeHandler = () => {
    setDarkMode(p => {
      localStorage.setItem("instapounddarkmode", p)
      return !p
    })
  }

  return (
    <Header>
      <CW>


        <MainLogo>Instapound</MainLogo>

        <CgAddR /> <CgHomeAlt /> <CgMail />

        <NavLink to="/"><HomeIcon /><SendIcon /><NewPostIcon/></NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
        {loggedInBool ? "logged in!" : "not logged in!"}
        <button onClick={() => logout()} >logout</button>
        <button onClick={darkModeHandler} >change theme</button>
      </CW>
    </Header>
  )
}

const Header = styled.header`
  height: 60px;
  width: 100%;
  position: fixed;
  top: 0;
  border-bottom: 1px solid ${p => p.theme.BORCOL1};
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`

const CW = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  max-width: 936px;
`


const MainLogo = styled(Title)`
  font-size: 1.4rem;
`

const HomeIcon = styled(GrHomeRounded)`
  font-size: 1rem;
`

const SendIcon = styled(GrSend)`
  font-size: 1rem;
`

const NewPostIcon = styled(GrAddCircle)`
  font-size: 1.3rem;
`

export default Navbar