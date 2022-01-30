import { loggedInVar } from "../graphql/apollo"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { SIGNUP } from "../graphql/queries"
import { useState } from "react"
import { useMutation } from "@apollo/client"

// styles
import styled from 'styled-components'
import { MDtop, CW, LoginForm, Input, BlueBTN, Title, Subtitle, Subtitle2, TitleAndSubtitle, Separator, SeparatorLine, SeparatorSpan, SignupText, SignupLink } from '../STYLES/styleForm'
import { GrFacebook } from "react-icons/gr"

import ErrorSignup from '../components/ErrorSignup'
import Footer from '../components/Footer'


const Signup = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState, getValues, setError, clearErrors } = useForm({ mode: "onChange" })
  const { errors } = formState
  const [createAccount, { loading }] = useMutation(SIGNUP, {
    onCompleted: data => {
      setError("resultSingup", { message: null })
      clearErrors()

      const { ok, error } = data.createAccount
      if (!ok) {
        setError("resultSingup", { message: error })
        setTimeout(() => {
          setError("resultSingup", { message: null })
          clearErrors()
        }, 2400)
        return null
      }

      const { username, password } = getValues()
      navigate('/signupRedirect', { state: { ok, username, password } })
    }
  })


  const onSuccess = async data => {
    if (loading) return;
    const { username, password, fullName, email } = getValues()
    await createAccount({ variables: { username, password, fullName, email } })
  }
  const onFailure = data => console.log("dataFailure", data)

  return (
    <MDtop>
      <Helmet><title>Instapound :: signup</title></Helmet>
      <CW>

        <TitleAndSubtitle>
          <Title >Instapound</Title>
          <Subtitle2>Sign up to see photos and videos from your friends.</Subtitle2>
        </TitleAndSubtitle>

        {errors?.resultSingup?.message ? <ErrorSignup errorMessage={errors.resultSingup.message} /> : null}

        <FacebookBTN ><FacebookIcon />Log in with Facebook</FacebookBTN>

        <Separator>
          <SeparatorLine />
          <SeparatorSpan>OR</SeparatorSpan>
          <SeparatorLine />
        </Separator>
        <LoginForm onSubmit={handleSubmit(onSuccess, onFailure)}>
          <Input type="text" placeholder="Email"
            {...register("email", { minLength: { value: 2, message: "email too short" }, required: true })} />
          <Input type="text" placeholder="Full Name"
            {...register("fullName", { minLength: { value: 2, message: "fullname too short" }, required: true })} />
          <Input type="text" placeholder="Username"
            {...register("username", { minLength: { value: 2, message: "username too short" }, required: true })} />
          <Input type="password" placeholder="Password"
            {...register("password", { minLength: { value: 2, message: "password too short" }, required: true })} />
          <SignupBTN type='submit' disabled={!loading || formState.isValid ? false : true} >Sign Up</SignupBTN>
        </LoginForm>


        <Terms>
          By signing up, you agree to our <Bold>Terms</Bold>.
          Always convert your <Bold>Data </Bold> from metric.
          Any attemps to post things in kilograms will be persecuted and all your data sold
          to the Nigerian prince!
          We use cookies. Do you like <Bold>Cookies</Bold>?
        </Terms>

      </CW>
      <CW>
        <SignupText>Have an account? <SignupLink to="/login">Sign In</SignupLink></SignupText>
      </CW>
      <Footer />
    </MDtop>
  )
}


const SignupBTN = styled(BlueBTN)`
  margin-top: 11px;
  background-color: ${p => p.disabled ? "rgb(178, 223, 252)" : p.theme.blueBTN1};
`

const FacebookBTN = styled(BlueBTN)`
  background-color: #0095F6;
`

const FacebookIcon = styled(GrFacebook)`
  margin-right: 7px;
  font-size: 0.76rem;
  transform: translateY(2px);
`

const Terms = styled.p`
  text-align: center;
  font-size: 0.60rem;
  color: #818181;
  line-height: 1.3;
`

const Bold = styled.span`
  font-weight: bold;
`
export default Signup