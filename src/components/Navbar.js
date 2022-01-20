import { useState } from 'react'
import { useReactiveVar } from "@apollo/client"
import { NavLink as NavLinkNS } from "react-router-dom"
import { loggedInVar } from "../graphql/apollo"

// styled
import styled from "styled-components"
import { MDtop, LoginForm, Input, BlueBTN, Title, Subtitle, TitleAndSubtitle, Separator, SeparatorLine, SeparatorSpan, SignupText, SignupLink } from '../STYLES/styleForm'
import { GrHomeRounded, GrSend, GrAddCircle } from "react-icons/gr"
import { CgAddR, CgHomeAlt, CgMailOpen } from "react-icons/cg"
import { useUserHook } from "../graphql/useUserHook"

import Avatar from "./Avatar"
import SearchForm from './SearchForm'
import ProfileMenu from "./ProfileMenu"


const Navbar = ({ setDarkMode }) => {
  const [menuOpenB, setMenuOpenB] = useState(false)
  console.log(menuOpenB)
  const loggedInBool = useReactiveVar(loggedInVar)
  const user = useUserHook()



  const openMenu = () => {
    console.log("menu toggle klacked")
    setMenuOpenB(p => !p)
  }

  return (
    <>
      <Header>
        <CW>

          <MainLogo><NavLink to="/">Instapound</NavLink></MainLogo>
          <SearchForm />
          <MainNav>
            <NavLink to="/"> <HomeIcon /> </NavLink>
            <NavLink to="/about"><NewPostIcon /></NavLink>
            <NavLink to="/about"><SendIcon /></NavLink>
            {!loggedInBool && <NavLink to="/login">Login</NavLink>}
            {!loggedInBool && <NavLink to="/signup">Signup</NavLink>}
          </MainNav>


          {loggedInBool && <Avatar imageURL={user?.data?.me?.avatar} onClick={openMenu} />}
        </CW>
      </Header>
      <ProfileMenu visible={loggedInBool && menuOpenB} setDarkMode={setDarkMode} />
    </>
  )
}

const MainNav = styled.nav`
  margin-right: 60px;
  display: flex;
  gap: 20px;
`

const Header = styled.header`
  height: ${p => p.theme.navbarHeight};;
  width: 100%;
  position: fixed;
  top: 0;
  border-bottom: 1px solid ${p => p.theme.BORCOL1};
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
`

const CW = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  max-width: 940px;
  /* margin-right: 70px; */
  margin-left: 10px;
`


const MainLogo = styled(Title)`
  font-size: 1.4rem;
`

const NavLink = styled(NavLinkNS)`
  text-decoration: none;
  color: ${p => p.theme.FC1};
`

const HomeIcon = styled(CgHomeAlt)`
  font-size: 1.3rem;
`

const SendIcon = styled(CgMailOpen)`
  font-size: 1.3rem;
  transform: translateY(-0.5px);
  /* margin: 0 3px; */
`

const NewPostIcon = styled(CgAddR)`
  font-size: 1.3rem;
  transform: translateY(1px);
`

export default Navbar