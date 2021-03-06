import { Link, useLocation, useNavigate } from "react-router-dom"
import { loggedInVar } from "../graphql/apollo"
import { LOGIN } from '../graphql/queries.js'
import { useMutation } from "@apollo/client"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"

// styles
import styled from 'styled-components'
import { useState } from "react"
import { MDtop as MDtopNS, CW, LoginForm, Input, BlueBTN, Title, Subtitle, TitleAndSubtitle, Separator, SeparatorLine, SeparatorSpan, SignupText, SignupLink } from '../STYLES/styleForm'
import { DarkModeBTN, SunIcon, MoonIcon } from "../STYLES/styleButtons"


import ErrorLogin from "../components/ErrorLogin"
import Footer from '../components/Footer'


const Login = ({ setDarkMode, darkMode, darkModeHandler }) => {
  const location = useLocation()

  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState, getValues, setError, clearErrors } = useForm({
    mode: "onChange",
    // defaultValues: { username: location?.state?.username || "", password: location?.state?.password || "" },
  })

  const [login, { loading }] = useMutation(LOGIN, {
    fetchPolicy: "network-only",   // Used for first execution
    nextFetchPolicy: "network-only", // Used for subsequent executions
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
        // window.location.reload(true) // this reloads the browser 
        navigate('/')
      }
    }
  })

  const errors = formState?.errors

  const onSuccess = async data => {
    if (loading) return;
    const { username, password } = getValues()
    const response = await login({ variables: { username, password } })
    window.localStorage.setItem("instapoundtoken", response.data.login.token)

  }
  const onFailure = data => {
    console.log("Login Failed")
  }

  // console.log(errors)
  // console.log("formState valid???", formState.isValid)

  return (
    <MDtop>
      <Helmet><title>Instapound :: login</title></Helmet>
      <DarkModeBTN onClick={darkModeHandler}>{darkMode ? <MoonIcon /> : <SunIcon />}</DarkModeBTN>
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
      <Footer />
    </MDtop>
  )
}


const LoginBTN = styled(BlueBTN)`
  margin-top: 11px;
  background-color: ${p => p.disabled ? "rgb(178, 223, 252)" : p.theme.blueBTN1};
`

const MDtop = styled(MDtopNS)`
  padding-top: 50px;
  min-height: 100vh;
`


export default Login