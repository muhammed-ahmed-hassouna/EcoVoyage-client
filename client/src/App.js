import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Website/Home";
import Login from "./components/Users/Login";
import Signup from "./components/Users/Signup";
import Destinations from "./components/Website/Destinations";
import Accommodations from "./components/Website/Accommodations";
import DestinationDetails from "./components/Website/DestinationDetails";
import AboutUs from "./components/Website/AboutUs";
import Contact from "./components/Website/Contact";
import AccommodationDetails from "./components/Website/AccommodationDetails";
import Activites from "./components/Website/Activites";
import Packages from "./components/Website/Packages";
import PackageDetails from "./components/Website/PackageDetails";
import NotFound from "./components/NotFound";
import AdminAccount from "./components/Admin/AdminAccount";
import Payment from "./components/Website/Payment/Payment";
import Flights from "./components/Website/Flights";
import Profile from "./components/Users/Profile";
import { useEffect } from "react";
import ActivityDetails from "./components/Website/ActivityDetails";
import Rooms from "./components/Website/Rooms";
import ForgotPassword from "./components/Users/ForgitPassword";
import VerifyCode from "./components/Users/VerifyCode";
import ResetPassword from "./components/Users/ResetPassword";
import { useCookies } from "react-cookie";

function App() {
  const [cookies] = useCookies(["token", "isAdmin"]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (cookies["isAdmin"]) {
      if (location.pathname !== "/dashboard") {
        navigate("/dashboard");
      }
    } else if (cookies["token"]) {
      if (
        location.pathname == "/login" ||
        location.pathname == "/signup" ||
        location.pathname == "/forgot-password" ||
        location.pathname == "/verify-code" ||
        location.pathname == "/reset-password"
      ) {
        navigate("/profile");
      }
    } else {
      if (
        location.pathname == "/profile" ||
        location.pathname == "/payment" ||
        location.pathname == "/dashboard"
      ) {
        navigate("/login");
      }
    }
  }, [location.pathname]);
  return (
    <div className="App bg-second-color">
      <Header />
      <div className="min-h-screen" id="root">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destination/:id" element={<DestinationDetails />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/accommodations" element={<Accommodations />} />
          <Route path="/accommodation/:id" element={<AccommodationDetails />} />
          <Route path="/rooms/:id" element={<Rooms />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/package/:id" element={<PackageDetails />} />
          <Route path="/activities" element={<Activites />} />
          <Route path="/activity/:id" element={<ActivityDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard" element={<AdminAccount />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
