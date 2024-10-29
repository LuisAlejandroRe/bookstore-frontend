import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Checkout from "./components/Checkout/Checkout";
import PaymentWrapper from "./components/Payment/PaymentWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <main>
        <Header />
        <Home />
        <Footer />
      </main>
    ),
  },
  {
    path: "/checkout",
    element: (
      <main>
        <Header />
        <Checkout />
        <Footer />
      </main>
    ),
  },
  {
    path: "/payment",
    element: (
      <main>
        <Header />
        <PaymentWrapper />
        <Footer />
      </main>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
