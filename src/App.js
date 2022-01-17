
import { useReactiveVar } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { loggedInVar } from "./apollo";

// styles


import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Page404 from './pages/Page404'

import Navbar from './components/Navbar'



const App = () => {
  const loggedInBool = useReactiveVar(loggedInVar)

  return (
    <div>

      <BrowserRouter >
      <Navbar />
        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/about' element={<About />} />
          <Route path='/' element={<Home />} exact />
          <Route path='*' element={<Page404 />}/>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
