import { loggedInVar } from "../apollo"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"

// styles
import styled from 'styled-components'
import { useState } from "react"
import { MDtop, CW, LoginForm, Input, BlueBTN, Title, Subtitle, TitleAndSubtitle, Separator, SeparatorLine, SeparatorSpan, SignupText, SignupLink } from '../STYLES/styleForm'



const Login = () => {
  const { register, handleSubmit, watch, formState } = useForm()
  const errors = formState?.errors
  const onSuccess = data => console.log('')
  const onFailure = data => console.log('')

  console.log(errors)
  console.log("formState", formState.isValid)

  return (
    <MDtop>
      <Helmet><title>Instapound :: login</title></Helmet>
      <div>
        <CW>
          <TitleAndSubtitle>
            <Title >Instapound</Title>
            <Subtitle>For those who don't know the metric system</Subtitle>
          </TitleAndSubtitle>

          <LoginForm onSubmit={handleSubmit(onSuccess, onFailure)}>
            <Input type="text" {...register("username", { required: true, minLength: { value: 2, message: "min pw length 2" } })} placeholder="Phone number, username, or email" />
            <Input type="password" {...register("password", { required: true, minLength: { value: 2, message: "min pw length 2" } })} placeholder="Password" />
            <LoginBTN type="submit" disabled={formState.isValid ? false : true} >Log In</LoginBTN>
          </LoginForm>

          <Separator>
            <SeparatorLine />
            <SeparatorSpan>OR</SeparatorSpan>
            <SeparatorLine />
          </Separator>
          <SignupText>Or just don't log in!</SignupText>
        </CW>
        <CW>
          <SignupText>Don't have an account? <SignupLink to="/signup">Sign Up</SignupLink></SignupText>
        </CW>
      </div>
    </MDtop>
  )
}


const LoginBTN = styled(BlueBTN)`
  margin-top: 11px;
  background-color: ${p => p.disabled ? "rgb(178, 223, 252)" : "#0095F6"}
`


export default Login