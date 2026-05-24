import Loader from "./components/common/Loader";
import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import ScrollToTopButton from "./components/common/ScrollToTop";
import ScrollToTopOnNavigate from "./components/common/ScrollToTopOnNavigate";

import LanguageSelector from "./components/LanguageSelector";
import ChatbotLauncher from "./components/chatbot/ChatbotLauncher";

import NotFound from "./components/NotFound";

// Lazy Loaded Pages
const Home = lazy(() => import("./pages/Home"));
const Home2 = lazy(() => import("./pages/Home2"));
const About = lazy(() => import("./pages/About"));
const Features = lazy(() => import("./pages/Features"));
const Destinations = lazy(() => import("./pages/Destinations"));
const Contact = lazy(() => import("./pages/Contact"));
const Signup = lazy(() => import("./pages/signup"));
const Login = lazy(() => import("./pages/Login"));
const AddFavorite = lazy(() => import("./pages/AddFavorite"));
const DestinationDetails = lazy(() =>
  import("./pages/DestinationDetails")
);

const PlanTrip = lazy(() => import("./pages/PlanTrip"));
const OAuthSuccess = lazy(() => import("./pages/OAuthSuccess"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));

const TripPlanner = lazy(() => import("./pages/TripPlanner"));
const SmartTripPlanner = lazy(() =>
  import("./pages/SmartTripPlanner")
);

const DynamicPlannerPage = lazy(() =>
  import("./pages/DynamicPlannerPage")
);

const WatchDemoPage = lazy(() =>
  import("./pages/DemoSection")
);

function ProtectedRoute({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function AppRoutes() {
  const location = useLocation();

  const hideNavigationPaths = ["/signup", "/login"];

  const showNavigation =
    !hideNavigationPaths.includes(location.pathname);

  return (
    <>
      <ScrollToTopOnNavigate />

      {showNavigation && <Navigation />}

      <ScrollToTopButton />
      <LanguageSelector />
      <ChatbotLauncher />

      <div className={showNavigation ? "pt-16" : ""}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/home2"
              element={
                <ProtectedRoute>
                  <Home2 />
                </ProtectedRoute>
              }
            />

            <Route path="/demo" element={<WatchDemoPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route
              path="/destinations"
              element={<Destinations />}
            />

            <Route
              path="/destinations/:id"
              element={<DestinationDetails />}
            />

            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/help" element={<HelpCenter />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/favorites"
              element={<AddFavorite />}
            />

            <Route path="/plan-trip" element={<PlanTrip />} />

            <Route
              path="/dynamic-planner"
              element={<DynamicPlannerPage />}
            />

            <Route
              path="/trip-planner"
              element={<TripPlanner />}
            />

            <Route
              path="/smart-trip-planner"
              element={<SmartTripPlanner />}
            />

            <Route
              path="/oauth-success"
              element={<OAuthSuccess />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      {showNavigation && <Footer />}
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ThemeProvider>
      <ToastProvider>
        <FavoritesProvider>
          <Router>
            <AppRoutes />
          </Router>
        </FavoritesProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
