

import styled from 'styled-components'
import { Link } from "react-router-dom"


export const MD = styled.div`
  background-color: rgb(250, 250, 250);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

`
export const MDtop = styled(MD)`
  padding-top: 80px;
`


export const CW = styled.div`
  flex-direction: column;
  gap: 20px;
  background-color: white;
  display: flex;
  
  align-items: center;
  justify-content: center;
  
  margin-top: 12px;
  padding: 30px 40px 30px 40px;
  border: ${p => p.theme.BOR1};

  width: 352px;

  position: relative;
`


//////////////////////////////////////////////////////////////
//     FORM
export const LoginForm = styled.form`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction:column;
  gap: 6px;
  align-items: center;
  justify-content: center;
`

export const Input = styled.input`
  width: 100%;
  height: 38px;
  background-color: ${p => p.theme.BG10};
  border: ${p => p.theme.BOR1};
  padding-left: 10px;
  border-radius: 4px;

  ::placeholder {
    font-size: 0.62rem;
    color: #8d8d8d;
  }
`

// Login, SignUp, Log in with Facebook
export const BlueBTN = styled.button`
  width: 100%;
  height: 32px;
  cursor: pointer;
  background-color: rgb(178, 223, 252);
  border: none;
  border-radius: 4px;


  color: white;
  font-weight: 600;
`


export const Title = styled.h1`
  color: ${p => p.theme.TEXT.mainLogo};;

  font-family: Monotype Corsiva;
  font-size: 2.2rem;
  font-weight: 600;

`

export const Subtitle = styled.h2`
  font-size: 0.5rem;
`
export const Subtitle2 = styled.h2`
  margin-top: 15px;
  font-size: 0.8rem;
  text-align: center;
  color: #808080;
  line-height: 1.1;
`

export const TitleAndSubtitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  margin-bottom: 12px;
  color: #a8a8a8;
`

///////////////////////////////////////////////
//      MISC
export const Separator = styled.div`
  display: flex;
  gap: 14px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const SeparatorLine = styled.div`
  background-color: #cacaca;

  height: 0.2px;
  width: 100%;
`

export const SeparatorSpan = styled.span`
  font-weight: 600;
  font-size: 0.6rem;
  color: #969696;
`

export const SignupText = styled.p`
  color: #2e2e2e;
  font-size: 0.7rem;

`

export const SignupLink = styled(Link)`
  font-weight: 600;
  text-decoration: none;
  color: rgb(111, 152, 236);
`
