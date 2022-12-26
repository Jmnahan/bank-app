import { Route, Routes } from "react-router-dom"
import Homepage from "./components/Homepage"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"

export default function App() {
  return ( 
      <main> 
          <Routes basename="/batch22-fe-activities/bank-app">
            <Route path="/" element={<Homepage />}/>
            <Route path="/Dashboard" element={<Dashboard />}/>
            <Route path="/Login" element={<Login />}/>
          </Routes>
      </main>
  )
}

//basename="/batch22-fe-activities/bank-app"