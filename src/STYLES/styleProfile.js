

import styled from 'styled-components'
import { CW } from "./styleForm"


export const AvatarDiv = styled.div`
  overflow: hidden;
  border-radius: 50%;
  width: 40px;
  width: 40px;

`

export const Avatar = styled.img`
  width: 100%;
  display: block;
`

export const TopContainer = styled(CW)`
padding-left: 14px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: left;
gap: 16px;
margin: 0;

height: 60px;
width: 100%;

border-top: none;
border-left: none;
border-right: none;
border-bottom: 0.4px solid ${p => p.theme.BORCOL1};

position: relative;

`