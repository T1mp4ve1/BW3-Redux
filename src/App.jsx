import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import NavBarLinkIn from "./components/NavBarLinkIn";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBarLinkIn />
        <Routes>{/* <Route path="/" element={<HomePage />} /> */}</Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
