import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Videos from "./pages/Videos";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { HOME, LOGIN, REGISTER, ABOUT, NOT_FOUND } from "./routes/PublicPaths";
import { VIDEOS, PROFILE } from "./routes/PrivatePaths";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserProvider from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={HOME} element={<Home />} />
          <Route path={LOGIN} element={<Login />} />
          <Route path={REGISTER} element={<Register />} />
          <Route
            path={VIDEOS}
            element={
              <PrivateRoute>
                <Videos />
              </PrivateRoute>
            }
          />
          <Route
            path={PROFILE}
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path={ABOUT} element={<About />}></Route>
          <Route path={NOT_FOUND} element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
