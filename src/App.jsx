import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBarLinkIn from "./components/NavBarLinkIn";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { HomePageLink } from "./components/pages/HomePageLink";
import { Container } from "react-bootstrap";
import { JobsPageLink } from "./components/pages/JobsPageLink";
import { ProfileLinked } from "./components/pages/ProfileLinked";
import FooterLinkIn from "./components/FooterLinked";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBarLinkIn />
        <Container
          className="mt-5 pt-4"
          style={{
            width: "60%",
          }}
        >
          <Routes>
            <Route path="/" element={<HomePageLink />} />
            <Route path="/lavoro" element={<JobsPageLink />} />
            <Route path="/profile/:userId" element={<ProfileLinked />} />
          </Routes>
        </Container>
        <FooterLinkIn />
      </BrowserRouter>
    </>
  );
}

export default App;
