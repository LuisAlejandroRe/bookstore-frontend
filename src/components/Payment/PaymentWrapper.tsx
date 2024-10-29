import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Payment from "./Payment";
import Loader from "../Loader/Loader";

const promise = loadStripe(import.meta.env.VITE_STRIPE_PROMISE!);

const PaymentWrapper = () => {
  const [stripeLoaded, setStripeLoaded] = useState<Stripe | null>(null);

  useEffect(() => {
    const load = async () => {
      const stripe = await promise;
      setStripeLoaded(stripe);
    };
    load();
  }, []);

  return stripeLoaded ? (
    // @ts-ignore
    <Elements stripe={promise}>
      <Payment />
    </Elements>
  ) : (
    <Loader />
  );
};

export default PaymentWrapper;
