import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import CartListProvider from "./contexts/CartListContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUBLIC_KEY =
  "pk_test_51KWktUJXb1zkNSJCaKK5HlMxJlIE3YuyidRJ6FDwr5MbHlyNm2Pare1TiSXyFZfIWcCLBphzvWrRiNVg1T3OWCK100miBzFapK";
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartListProvider>
          <Elements stripe={stripePromise}>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </Elements>
        </CartListProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
