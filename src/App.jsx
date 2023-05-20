import { BrowserRouter,Routes,Route } from 'react-router-dom'
import FileManager from './components/FileManager'
import './App.css'


const App=()=>(
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<FileManager/>}></Route>
        </Routes>
      </BrowserRouter>
  )

export default App