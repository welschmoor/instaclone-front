import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { useUserHook } from "./graphql/useUserHook"
import { useReactiveVar } from "@apollo/client"
import { loggedInVar } from "./graphql/apollo"
import { useEffect, useState } from "react"

// styles
import { ThemeProvider } from "styled-components"
import { GlobalStyle, darkTheme, lightTheme } from "./STYLES/globalStyles"

import Home from './pages/Home'
import Feed from './pages/Feed'
import About from './pages/About'
import Login from './pages/Login'
import Search from './pages/Search'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Page404 from './pages/Page404'
import Hashtag from './pages/Hashtag'
import SignupRedirect from './pages/SignupRedirect'
import AccountDeletedRedirect from './pages/AccountDeletedRedirect'

import SinglePic from "./components/SinglePic"
import YesNavbar from './components/YesNavbar'
import FileUpload from "./pages/FileUpload"
import Message from "./pages/Message"
import TestPage from "./pages/TestPage"


const App = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("instapounddarkmode") === "false")
  const loggedInBool = useReactiveVar(loggedInVar)
  console.log('loggedInBool', loggedInBool)

  useEffect(() => {
    let unsub = false
    const tokenLS = window.localStorage.getItem('instapoundtoken')
    if (tokenLS) {
      if (!unsub) {
        loggedInVar(true)
      }
    }

    return () => { unsub = true }
  }, [loggedInBool])


  return (
    <HelmetProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <BrowserRouter >
          {/* <Navbar setDarkMode={setDarkMode} /> */}
          <Routes>

            <Route path='/search/:searchTerm' element={<YesNavbar setDarkMode={setDarkMode}><Search /></YesNavbar>} />
            <Route path='/hashtag/:hashtag' element={<YesNavbar setDarkMode={setDarkMode}><Hashtag /></YesNavbar>} />
            <Route path='/profile/:userName' element={<YesNavbar setDarkMode={setDarkMode}><Profile /></YesNavbar>} />
            <Route path='/signupRedirect' element={loggedInBool ? <Navigate to='/' /> : <SignupRedirect />} />
            <Route path='/pic/:id' element={<YesNavbar setDarkMode={setDarkMode}><SinglePic /></YesNavbar>} />
            <Route path='/signup' element={loggedInBool ? <Navigate to='/' /> : <Signup />} />
            <Route path='/about' element={<YesNavbar setDarkMode={setDarkMode}><About /></YesNavbar>} />

            <Route path='/accountDeletedRedirect' element={<YesNavbar setDarkMode={setDarkMode}><AccountDeletedRedirect /></YesNavbar>} />
            <Route path='/message' element={<YesNavbar setDarkMode={setDarkMode}><Message /></YesNavbar>} />
            <Route path='/login' element={loggedInBool ? <Navigate to='/' /> : <Login />} />
            <Route path='/upload' element={<YesNavbar setDarkMode={setDarkMode}><FileUpload /></YesNavbar>} />
            <Route path='/feed' element={!loggedInBool ? <Navigate to='/' /> : <YesNavbar setDarkMode={setDarkMode}><Feed /></YesNavbar>} />
            <Route path='/' element={<YesNavbar setDarkMode={setDarkMode}><Home /> </YesNavbar>} exact />
            <Route path='*' element={<YesNavbar setDarkMode={setDarkMode}><Page404 /></YesNavbar>} />

            <Route path='/TestPage' element={<TestPage />} />

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
