
import HomePage from './pages/HomePage'
import {Route, Routes} from "react-router"
import ListPage from "./pages/ListPage"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/list/:id" element={<ListPage/>}/>
      </Routes>
    </div>
  )
}

export default App
