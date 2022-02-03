/// this component wraps other components and for them the Navbar is shown

import styled from "styled-components"
import Navbar from "./Navbar"


const YesNavbar = ({ children, setDarkMode }) => {
  return (
    <>
      <Navbar setDarkMode={setDarkMode} />
      <Wrapper>
        {children}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  transition: ${p => p.theme.TIMES.zero2};
  padding-top: ${p=>p.theme.navbarHeight};
  background-color: ${p=>p.theme.BG10};
  padding-left: 10px;
  padding-right: 10px;
`

export default YesNavbar