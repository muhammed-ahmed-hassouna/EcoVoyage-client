import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./components/Context/AuthContext";
import { PageProvider } from "./components/Context/SelectedPageContext";
import { BookProvider } from "./components/Context/BookingContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { SearchProvider } from "./components/Context/SearchHomePage";
import { BrowserRouter as Router } from "react-router-dom";

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <AuthProvider>
        <PageProvider>
          <BookProvider>
            <SearchProvider>
              <GoogleOAuthProvider clientId="639372653760-t2iheo16tp6fbbs87n08h0hnequdj9hc.apps.googleusercontent.com">
                <Router>
                  <App />
                </Router>
              </GoogleOAuthProvider>
            </SearchProvider>
          </BookProvider>
        </PageProvider>
      </AuthProvider>
    </I18nextProvider>
  </React.StrictMode>
);

reportWebVitals();
