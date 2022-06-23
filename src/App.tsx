import { useState, useEffect } from "react";
import "./global.scss";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";

// Page imports
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home/Home";
import DetailedAssetPage from "./pages/DetailedAssetPage/DetailedAssetPage";

// Component imports
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Internationalization imports
import { IntlProvider } from "react-intl";
import { LOCALES } from "./i18n/locales";
import { messages } from "./i18n/messages";

function App() {
  // Checks in local storage if user previously selected a language. If not, defaults to English.
  const getInitialLocale = () => {
    let savedLocale: string | null = localStorage.getItem("locale");
    if (!savedLocale) {
      return "en-US";
    }
    return savedLocale;
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [currentLocale, setCurrentLocale] = useState<string>(
    getInitialLocale()
  );

  useEffect(() => {}, [currentLocale]);

  const handleLanguageSelection = (locale: string) => {
    setCurrentLocale(locale);
    localStorage.setItem("locale", locale);
  };

  return (
    <IntlProvider
      messages={messages[currentLocale]}
      locale={currentLocale}
      defaultLocale={LOCALES.NEDERLANDS}
    >
      <div className="app">
        {location.pathname !== "/" ? (
          <NavBar
            navigate={navigate}
            setCurrentLocale={handleLanguageSelection}
            currentLocale={currentLocale}
          />
        ) : null}
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                navigate={navigate}
                setCurrentLocale={handleLanguageSelection}
                currentLocale={currentLocale}
              />
            }
          />
          <Route path="/home" element={<Home navigate={navigate} />} />
          <Route path="/asset/:id" element={<DetailedAssetPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </IntlProvider>
  );
}

export default App;
