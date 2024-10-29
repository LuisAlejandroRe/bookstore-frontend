import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Checkout from "./components/Checkout/Checkout";
import PaymentWrapper from "./components/Payment/PaymentWrapper";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Orders from "./components/Orders/Orders";

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
    path: "/orders",
    element: (
      <main>
        <Header />
        <PrivateRoute>
          <Orders />
        </PrivateRoute>
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
  return <RouterProvider router={router} />;
}

export default App;
