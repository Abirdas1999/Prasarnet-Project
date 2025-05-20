import { Route, Router, Routes } from "react-router-dom"
import Signup from "./Pages/SignUp/signup";
import Verify from "./Pages/Otp/Verify";
import Home from "./Pages/Home/Home";





function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/verification' element={<Verify />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
