import { useState } from 'react'
import { useReactiveVar } from "@apollo/client"
import { NavLink as NavLinkNS } from "react-router-dom"
import { loggedInVar } from "../graphql/apollo"
import useScroll from '../hooks/useScroll'

// styled
import styled from "styled-components"
import { MDtop, LoginForm, Input, BlueBTN, Title, Subtitle, TitleAndSubtitle, Separator, SeparatorLine, SeparatorSpan, SignupText, SignupLink } from '../STYLES/styleForm'
import { GrHomeRounded, GrSend, GrAddCircle } from "react-icons/gr"
import { CgAddR, CgHomeAlt, CgMailOpen, CgInstagram } from "react-icons/cg"
import { useUserHook } from "../graphql/useUserHook"

import Avatar from "./Avatar"
import SearchForm from './SearchForm'
import ProfileMenu from "./ProfileMenu"
import UploadModal from './UploadModal2'


const Navbar = ({ setDarkMode }) => {
  const { y } = useScroll()
  const [menuOpenB, setMenuOpenB] = useState(false)
  const [uploadModalOpenB, setUploadModalOpenB] = useState(false)
  const loggedInBool = useReactiveVar(loggedInVar)
  const user = useUserHook()

  const openMenu = () => {
    console.log("menu toggle klacked")
    setMenuOpenB(p => !p)
  }

  const openModal = () => {
    console.log("modal klacked")
    setMenuOpenB(false)
    setUploadModalOpenB(p => !p)
  }

  return (
    <>
      <Header y={y}>
        <CW>
          <MainLogo><NavLink to="/">Instapound</NavLink></MainLogo>
          <SearchForm />

          <MainNav>
            <NavLink to="/"> <HomeIcon /> </NavLink>
            {loggedInBool && <NavLink to="/feed"><FeedIcon /></NavLink>}
            <ModalButton onClick={openModal}><NewPostIcon /></ModalButton>
            <NavLink to="/about"><SendIcon /></NavLink>
            {!loggedInBool && <NavLink to="/login">Login</NavLink>}
            {!loggedInBool && <NavLink to="/signup">Signup</NavLink>}
          </MainNav>

          {user.data && <Avatar imageURL={user?.data?.me?.avatar} onClick={openMenu} />}

        </CW>
      </Header>
      <ProfileMenu visible={loggedInBool && menuOpenB} setDarkMode={setDarkMode} />
      {uploadModalOpenB && <UploadModal setUploadModalOpenB={setUploadModalOpenB} />}
    </>
  )
}


const MainNav = styled.nav`
  margin-right: 80px;
  display: flex;
  gap: 20px;
`

const Header = styled.header`
  transition: height 0.2s;
  height: ${p => p.y > 20 ? "46px" : p.theme.navbarHeight};
  width: 100%;
  position: fixed;
  top: 0;
  border-bottom: 1px solid ${p => p.theme.BORCOL1};
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
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

const ModalButton = styled.button`
    display: inline;
    background: none;
    border: none;
    color: ${p => p.theme.FC1};
    cursor: pointer;
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

const FeedIcon = styled(CgInstagram)`
  font-size: 1.2rem;
  transform: translateY(2px);
`

export default Navbar