import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Signup  from "./Pages/Signup";
import  Signin  from "./Pages/Signin";
import Playground from "./Pages/Playground";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/playground" element={<Playground/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
