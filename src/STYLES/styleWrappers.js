
import styled from 'styled-components'
import { Link } from "react-router-dom"


export const MWr = styled.div`
  transition: ${p => p.theme.TIMES.zero2};
  background-color: ${p=>p.theme.BG10};
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`

export const CWr = styled.div`

  margin-left: 10px;
  max-width: 940px;
  margin: 0 auto;
  background-color: ${p=>p.theme.BG10};
  padding-bottom: 40px;
`
