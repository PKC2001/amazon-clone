import CheckoutProduct from "@/components/CheckoutProduct";
import Header from "@/components/Header";
import { selectItems } from "@/slices/basketSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(process.env.stripe_public_key);

const checkout = () => {
  const items = useSelector(selectItems);
  const session = useSession();
  // console.log(session)  // ------------------

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Call the backend to create the checkout session...
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.data.user.email,
    });

    //  Redirect user/customer to Stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    // console.log(checkoutSession); //--------------------
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex lg:max-w-screen-2xl mx-auto">
        {/* left side div for large screen */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            alt="checkout page big image"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? "Your Basket is empty." : "Shopping Basket"}
            </h1>
            {items.map((item, index) => (
              <CheckoutProduct
                key={index}
                category={item.category}
                description={item.description}
                id={item.id}
                image={item.image}
                price={item.price}
                title={item.title}
                rating={item.rating}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>
        {/* right side div for large screen */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items): ₹{" "}
                <span className="font-bold">
                  {items.reduce((total, item) => total + item.price, 0)}
                </span>
              </h2>
              <button
                role="link"
                onClick={createCheckoutSession}
                className={`button mt-2 ${
                  session.status === "unauthenticated" &&
                  "from-gray-300 to gray-500 border-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                disabled={!session}
              >
                {session.status === "unauthenticated"
                  ? "Sign In to checkout"
                  : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default checkout;
