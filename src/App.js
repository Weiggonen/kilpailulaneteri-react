import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Search from "./pages/search";
import TopBar from "./components/topBar";
import Footer from "./components/Footer";
import {
  FaHome,
  FaSearch,
  FaStream,
  FaRunning,
  FaUserAlt,
} from "react-icons/fa";
import Competition from "./pages/competition";
import SignToComp from "./pages/signToComp";
import CompSignIns from "./pages/compSignIns";
import Profile from "./pages/profile";
import CreateProfile from "./pages/createProfile";
import UserCompetitions from "./pages/UserCompetitions";
import EditProfile from "./pages/EditProfile";
import { useEffect, useState } from "react";
import { GlobalProvider } from "./GlobalProvider";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <TopBar></TopBar>
        <div style={{ fontFamily: "'Saira', sans-serif" }}>
          <nav className="bg-info text-light fixed-bottom d-lg-none">
            <div className="container">
              <ul className="list-unstyled d-flex justify-content-between py-2">
                <li>
                  <Link
                    className="text-light text-decoration-none fs-5"
                    to="/kisakalenteri"
                  >
                    <FaHome />
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-light text-decoration-none fs-5"
                    to="/search"
                  >
                    <FaSearch />
                  </Link>
                </li>
                {/*  <li>
                <Link className="text-light text-decoration-none fs-5" to="/">
                  <FaStream />
                </Link>
              </li> */}
                <li>
                  <Link
                    className="text-light text-decoration-none fs-5"
                    to="/user/competitions"
                  >
                    <FaRunning />
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-light text-decoration-none fs-5"
                    to="/profile"
                  >
                    <FaUserAlt />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <nav className="bg-info text-light d-none d-lg-block">
            <div className="container">
              <ul className="list-unstyled d-flex justify-content-between py-2">
                <li>
                  <Link
                    className="text-light text-decoration-none fs-5 d-flex align-items-center"
                    to="/kisakalenteri"
                  >
                    <FaHome />
                    <span className="ms-1">Etusivu</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-light text-decoration-none fs-5 d-flex align-items-center"
                    to="/search"
                  >
                    <FaSearch />
                    <span className="ms-1">Haku</span>
                  </Link>
                </li>
                {/*  <li>
                <Link
                  className="text-light text-decoration-none fs-5 d-flex align-items-center"
                  to="/"
                >
                  <FaStream />
                  <span className="ms-1">Selaus</span>
                </Link>
              </li> */}
                <li>
                  <Link
                    className="text-light text-decoration-none fs-5 d-flex align-items-center"
                    to="/user/competitions"
                  >
                    <FaRunning />
                    <span className="ml-2">Omat kisat</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-light text-decoration-none fs-5 d-flex align-items-center"
                    to="/profile"
                  >
                    <FaUserAlt />
                    <span className="ms-1">Profiili</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <div className="container mt-4">
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/profile/create" element={<CreateProfile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/kisakalenteri" element={<Home />} />
              <Route path="/competition/:id" element={<Competition />} />
              <Route path="/competition/signin/:id" element={<SignToComp />} />
              <Route
                path="/competition/signins/:id"
                element={<CompSignIns />}
              />
              <Route path="/user/competitions" element={<UserCompetitions />} />
            </Routes>
          </div>
        </div>
        {/*  <Footer></Footer> */}
      </Router>
    </GlobalProvider>
  );
}

export default App;
