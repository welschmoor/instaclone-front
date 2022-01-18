import { useEffect } from "react"
import { useReactiveVar } from "@apollo/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { loggedInVar } from "./graphql/apollo";

// styles
import { ThemeProvider } from "styled-components";
import { GlobalStyle, darkTheme, lightTheme } from "./STYLES/globalStyles";
import { darkModeVar } from './graphql/apollo'

import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Page404 from './pages/Page404'

import Navbar from './components/Navbar'
import { HelmetProvider } from "react-helmet-async";



const App = () => {
  // const loggedInBool = useReactiveVar(loggedInVar)
  const darkModeBool = useReactiveVar(darkModeVar)
  const loggedInBool = useReactiveVar(loggedInVar)
  console.log('loggedInBool', loggedInBool)
  useEffect(() => {
    const tokenLS = window.localStorage.getItem('instapoundtoken')
    if (tokenLS) {
      loggedInVar(true)
    }
  }, [loggedInBool])


  return (
    <HelmetProvider>
      <ThemeProvider theme={darkModeBool ? darkTheme : lightTheme}>
        <GlobalStyle />
        <BrowserRouter >
          <Navbar />
          <Routes>

            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={loggedInBool ? <Navigate to='/'/> : <Signup />} />
            <Route path='/about' element={<About />} />
            <Route path='/' element={<Home />} exact />
            <Route path='*' element={<Page404 />} />

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
