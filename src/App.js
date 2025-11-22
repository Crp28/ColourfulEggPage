import { Routes, Route, Link, BrowserRouter as Router, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css"
import { HomePageZH, HomePageEN } from "./pages/home";
import { Nav, NavEN } from "./pages/nav_bar";
import Footer from "./pages/footer";
import NotFound from "./pages/404";
import { BachelorStudy, ColourfulStudy, FoundationStudy, PriSecStudy } from "./pages/studentpage";
import { CharacterSelection, CharacterSelectionEN } from "./pages/navselect";
import { NZLife } from "./pages/NZlife";
import Immigration from "./pages/immigration";
import { ContactUs, ContactUsEN } from "./pages/contact-us";


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  useEffect(() => {
    document.title = "纽蛋留学"
  })
  return (

    <Router basename={process.env.PUBLIC_URL}>
      <ScrollToTop />
      <div className="App d-flex flex-column min-vh-100">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <Routes>
          <Route path="/" element={<Navigate to="/zh" />}></Route>
          <Route path="/zh" element={<><Nav /><HomePageZH /></>}></Route>
          <Route path="/zh/guide" element={<><Nav /><CharacterSelection /></>}></Route>
          <Route path="/zh/LifeinNZ" element={<><Nav /><NZLife /></>}></Route>
          <Route path="/zh/colourfulstudy" element={<><div className="fixed inset-0 -z-10 bg-gray-500" /><Nav /><ColourfulStudy /></>}></Route>
          <Route path="/zh/colourfulstudy/PriSecStudy" element={<><Nav /><PriSecStudy /></>}></Route>
          <Route path="/zh/colourfulstudy/BachelorStudy" element={<><Nav /><BachelorStudy /></>}></Route>
          <Route path="/zh/colourfulstudy/MasterStudy" element={<><Nav /></>}></Route>
          <Route path="/zh/colourfulstudy/FoundationStudy" element={<><Nav /><FoundationStudy /></>}></Route>
          <Route path="/zh/aboutus" element={<><Nav /></>}></Route>
          <Route path="/zh/immigration" element={<><Nav /><Immigration /></>}></Route>
          <Route path="/zh/connect" element={<><Nav /><ContactUs /></>}></Route>
          <Route path="*" element={<><Nav /><NotFound /></>} />

          <Route path="/en" element={<><NavEN /><HomePageEN /></>}></Route>
          <Route path="/en/guide" element={<><NavEN /><CharacterSelectionEN /></>}></Route>
          <Route path="/en/LifeinNZ" element={<><NavEN /><NZLife /></>}></Route>
          <Route path="/en/colourfulstudy" element={<><div className="fixed inset-0 -z-10 bg-gray-500" /><Nav /></>}></Route>
          <Route path="/en/colourfulstudy/PriSecStudy" element={<><NavEN /></>}></Route>
          <Route path="/en/colourfulstudy/BachelorStudy" element={<><NavEN /></>}></Route>
          <Route path="/en/colourfulstudy/MasterStudy" element={<><NavEN /></>}></Route>
          <Route path="/en/colourfulstudy/FoundationStudy" element={<><NavEN /></>}></Route>
          <Route path="/en/aboutus" element={<><NavEN /></>}></Route>
          <Route path="/en/immigration" element={<><NavEN /></>}></Route>
          <Route path="/en/connect" element={<><NavEN /><ContactUsEN /></>}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>

  );
}

export default App;
