import styled from "styled-components"
import { BsSun, BsMoon } from "react-icons/bs"






export const DarkModeBTN = styled.button`

  background: none;
  border: none;
  cursor: pointer;
  position: fixed;
  top: 10px;
  right: 10px;
`

export const SunIcon = styled(BsSun)`
  font-size: 1.2rem;
  color: ${p=>p.theme.TEXT.mainLogo};

`

export const MoonIcon = styled(BsMoon)`
  font-size: 1rem;
  color: ${p=>p.theme.TEXT.mainLogo};
`