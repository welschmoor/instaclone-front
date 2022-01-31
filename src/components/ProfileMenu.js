import { useReactiveVar } from "@apollo/client"
import { loggedInVar } from "../graphql/apollo"
import useScroll from '../hooks/useScroll'

//styles
import styled from "styled-components"
import { BlueBTN as BlueBTNNS } from '../STYLES/styleForm'
import { useUserHook } from "../graphql/useUserHook"
import { Link } from "react-router-dom"

const ProfileMenu = ({ visible, setDarkMode }) => {
  const { y } = useScroll()
  const loggedInBool = useReactiveVar(loggedInVar)
  const { data: userData } = useUserHook()

  const logout = () => {
    loggedInVar(false)
    localStorage.removeItem("instapoundtoken")
    localStorage.clear()
  }

  const darkModeHandler = () => {
    setDarkMode(p => {
      localStorage.setItem("instapounddarkmode", p)
      return !p
    })
  }

  return (
    <MenuWrapper visible={visible} y={y}>
      <div>Hello, {userData?.me?.username} </div>
      <Link to={`/profile/${userData?.me?.username}`}>See Profile</Link>
      <button onClick={darkModeHandler} >change theme</button>
      <div>MENU</div>
      <div>MENU</div>
      <div>MENU</div>

      {loggedInBool && <BlueBTN onClick={() => logout()} >logout</BlueBTN>}
    </MenuWrapper>
  )
}

const MenuWrapper = styled.div`
  min-width: 240px;
  transition: 0.2s;
  position: fixed;
  padding: 10px;
  padding-top: 40px;

  /* visible must be one pixel less than the height of navbar */
  top: ${p => p.visible
    ? p.y > 20 ? "45px" : "59px"
    : p.y > 20 ? "-185px" : "-199px"

  };  
  right: -1px;
  background-color: ${p => p.theme.BG1};
  z-index: 12;
  border: ${p => p.theme.BOR1};
  box-shadow: 0px 0px 6px 6px rgba(0, 0, 0, 0.05);
`

const BlueBTN = styled(BlueBTNNS)`
  background-color: ${p => p.theme.blueBTN1};
`


export default ProfileMenu