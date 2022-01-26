import { useEffect, useState } from "react"
import { useReactiveVar } from "@apollo/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { loggedInVar } from "./graphql/apollo";
import { useUserHook } from "./graphql/useUserHook"
import { HelmetProvider } from "react-helmet-async"

// styles
import { ThemeProvider } from "styled-components";
import { GlobalStyle, darkTheme, lightTheme } from "./STYLES/globalStyles"

import Home from './pages/Home'
import Feed from './pages/Feed'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Page404 from './pages/Page404'
import SignupRedirect from './pages/SignupRedirect'

import Navbar from './components/Navbar'
import YesNavbar from './components/YesNavbar'
import SinglePic from "./components/SinglePic";


const App = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("instapounddarkmode") === "false")

  const loggedInBool = useReactiveVar(loggedInVar)
  console.log('loggedInBool', loggedInBool)

  const user = useUserHook()


  useEffect(() => {
    const tokenLS = window.localStorage.getItem('instapoundtoken')
    if (tokenLS) {
      loggedInVar(true)
    }
  }, [loggedInBool])



  return (
    <HelmetProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <BrowserRouter >
          {/* <Navbar setDarkMode={setDarkMode} /> */}
          <Routes>

            <Route path='/pic/:id' element={<YesNavbar setDarkMode={setDarkMode}><SinglePic /></YesNavbar>} />
            <Route path='/login' element={loggedInBool ? <Navigate to='/' /> : <Login />} />
            <Route path='/signup' element={loggedInBool ? <Navigate to='/' /> : <Signup />} />
            <Route path='/signupRedirect' element={loggedInBool ? <Navigate to='/' /> : <SignupRedirect />} />
            <Route path='/about' element={<YesNavbar setDarkMode={setDarkMode}><About /></YesNavbar>} />
            <Route path='/feed' element={!loggedInBool ? <Navigate to='/' /> : <YesNavbar setDarkMode={setDarkMode}><Feed /></YesNavbar>} />
            <Route path='/' element={<YesNavbar setDarkMode={setDarkMode}><Home /> </YesNavbar>} exact />
            <Route path='*' element={<YesNavbar setDarkMode={setDarkMode}><Page404 /></YesNavbar>} />

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
