import React, { useEffect, useState } from "react";
import {
  AddressElement,
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Heading from "../components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import { useCart } from "@/hooks/useCart";
import Button from "../components/Button";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface CheckoutProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("deu bom ");

          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <Heading title="bakojifenjsijokipnoj" />
      </div>
      <h2 className="font-semibold mb-2">Endereço</h2>
      <AddressElement
        options={{
          mode: "shipping",
          allowedCountries: ["BR", "US"],
        }}
      />
      <h2 className="font-semibold mt-4 mb-2">Informações de pagamento</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div className="py-4 text-center text-slate-700 text-4xl font-bold">
        Total: {formattedPrice}
      </div>
      <Button
        label={isLoading ? "Processando" : "Pague agora"}
        disabled={isLoading || !stripe || !elements}
        onClick={() => {}}
      />
    </form>
  );
};

export default CheckoutForm;
