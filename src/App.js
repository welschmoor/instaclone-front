
import { useReactiveVar } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { loggedInVar } from "./apollo";

// styles
import { ThemeProvider } from "styled-components";
import { GlobalStyle, darkTheme, lightTheme } from "./STYLES/globalStyles";
import { darkModeVar } from './apollo'

import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Page404 from './pages/Page404'

import Navbar from './components/Navbar'



const App = () => {
  // const loggedInBool = useReactiveVar(loggedInVar)
  const darkModeBool = useReactiveVar(darkModeVar)


  return (
    <ThemeProvider theme={darkModeBool ? darkTheme : lightTheme}>
      <GlobalStyle />
      <BrowserRouter >
        <Navbar />
        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/about' element={<About />} />
          <Route path='/' element={<Home />} exact />
          <Route path='*' element={<Page404 />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
