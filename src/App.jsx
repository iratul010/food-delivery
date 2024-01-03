import { BrowserRouter, Route, Routes } from "react-router-dom"
import GlobalStyles from "./styles/GlobalStyles"
import PageNotFound from "./pages/PageNotFound"

function App() {
  return (
    <>
    <GlobalStyles/>
    <BrowserRouter>
      <Routes>
        <Route path="home" element={""}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter></>
  )
}

export default App
