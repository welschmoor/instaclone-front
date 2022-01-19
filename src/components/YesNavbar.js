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
  max-width: 936px;
`

export default YesNavbar