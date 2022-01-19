import { loggedInVar } from "../graphql/apollo"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"

// styles
import styled from 'styled-components'
import { useState } from "react"
import { MDtop, CW, LoginForm, Input, BlueBTN, Title, Subtitle, TitleAndSubtitle, Separator, SeparatorLine, SeparatorSpan, SignupText, SignupLink } from '../STYLES/styleForm'

import { LOGIN } from '../graphql/queries.js'
import { useMutation } from "@apollo/client"

import ErrorLogin from "../components/ErrorLogin"

const Login = () => {
  const location = useLocation()
  console.log("location", location)
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState, getValues, setError, clearErrors } = useForm({
    mode: "onChange",
    defaultValues: { username: location?.state?.username || "", password: location?.state?.password || "" },
  })

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      setError("result", { message: null })
      clearErrors()

      const { token, ok, error } = data.login

      if (!ok) {
        setError("result", { message: error })
        setTimeout(() => {
          setError("result", { message: null })
          clearErrors()
        }, 2400)
      }

      // save token in localStorage
      if (token) {
        window.localStorage.setItem("instapoundtoken", token)
        loggedInVar(true)
        navigate('/')
      }
    }
  })

  const errors = formState?.errors
  console.log("loading", loading)
  console.log("errors", errors)

  const onSuccess = async data => {
    if (loading) return;
    const { username, password } = getValues()
    const response = await login({ variables: { username, password } })
    // console.log("response", response)
  }
  const onFailure = data => console.log('')

  // console.log(errors)
  // console.log("formState valid???", formState.isValid)

  return (
    <MDtop>
      <Helmet><title>Instapound :: login</title></Helmet>
      <div>
        <CW>
          <TitleAndSubtitle>
            <Title >Instapound</Title>
            <Subtitle>For those who don't know the metric system</Subtitle>
          </TitleAndSubtitle>

          {errors?.result?.message ? <ErrorLogin errorMessage={errors.result.message} /> : null}

          <LoginForm onSubmit={handleSubmit(onSuccess, onFailure)}>
            <Input name="username" type="text" {...register("username", { required: true, minLength: { value: 2, message: "min pw length 2" } })} placeholder="Phone number, username, or email" />
            <Input name="password" type="password" {...register("password", { required: true, minLength: { value: 2, message: "min pw length 2" } })} placeholder="Password" />
            <LoginBTN type="submit" disabled={!loading || formState.isValid ? false : true} >Log In</LoginBTN>
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