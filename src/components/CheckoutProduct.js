import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "@/slices/basketSlice";

const CheckoutProduct = ({
  category,
  hasPrime,
  description,
  id,
  image,
  price,
  rating,
  title,
}) => {
  const dispatch = useDispatch();
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({id}))
  }

  const addItemToBasket = (state) => {
    const product = {
      category,
      hasPrime,
      description,
      id,
      image,
      price,
      rating,
      title,
    };
    dispatch(addToBasket(product));
  };
  return (
    <div className="grid grid-cols-5">
      {/* left side */}

      <Image
        src={image}
        alt={title}
        objectFit="contain"
        height={200}
        width={200}
      />

      {/* middle section */}

      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(Math.round(rating.rate))
            .fill()
            .map((_, i) => (
              <StarIcon className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="my-2 text-xs line-clamp-3">{description}</p>
        <p>₹ {price}</p>
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              src="https://links.papareact.com/fdw"
              className="w-12"
              loading="lazy"
              alt="prime-logo"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      {/* right side */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="button" onClick={removeItemFromBasket}>Remove from Basket</button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
