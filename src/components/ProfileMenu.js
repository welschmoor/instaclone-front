import { useReactiveVar } from "@apollo/client"
import styled from "styled-components"
import { loggedInVar } from "../graphql/apollo"



const ProfileMenu = ({ visible, setDarkMode }) => {
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
    <MenuWrapper visible={visible}>
    
      <div>See Profile</div>
      <button onClick={darkModeHandler} >change theme</button>
      <div>MENU</div>
      <div>MENU</div>
      <div>MENU</div>
      <div>MENU</div>
      <div>MENU</div>
      <div>MENU</div>
      {loggedInBool && <button onClick={() => logout()} >logout</button>}
    </MenuWrapper>
  )
}

const MenuWrapper = styled.div`
  min-width: 300px;
  transition: 0.2s;
  position: absolute;
  padding: 10px;
  padding-top: 40px;

  /* visible must be one pixel less than the height of navbar */
  top: ${p => p.visible ? "59px" : "-199px"};  
  right: -1px;
  background-color: ${p => p.theme.BG1};
  z-index: 5;
  border: ${p => p.theme.BOR1};
`


export default ProfileMenu