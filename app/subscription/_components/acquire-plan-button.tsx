"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";

export default function AcquirePlanButton() {
  async function handleAcquirePlanClick() {
    const { sessionId } = await createStripeCheckout();

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
      throw new Error("Stripe public key not found");
    }

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    if (!stripe) {
      throw new Error("Stripe could not be loaded");
    }

    await stripe.redirectToCheckout({ sessionId });
  }

  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanClick}
    >
      Adquirir plano
    </Button>
  );
}
