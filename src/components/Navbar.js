
import { useReactiveVar } from "@apollo/client"
import { NavLink } from "react-router-dom"

import { darkModeVar, loggedInVar } from "../apollo"

const Navbar = () => {
  const loggedInBool = useReactiveVar(loggedInVar)
  const darkModeBool = useReactiveVar(darkModeVar)
  console.log("darkModeBool", darkModeBool)

  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      {loggedInBool ? "logged in!" : "not logged in!"}
      <button onClick={() => loggedInVar(false)} >logout</button>
      <button onClick={() => darkModeVar(darkModeBool ? false : true)} >change theme</button>
    </div>
  )
}


export default Navbar