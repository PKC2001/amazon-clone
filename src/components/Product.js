import React, { useState } from 'react'
import Image from "next/legacy/image";
import { StarIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { addToBasket } from '@/slices/basketSlice';

const Product = ({category, description, id, image, price, rating, title}) => {
    const [hasPrime] = useState(Math.random() < 0.5)
    const dispatch = useDispatch();

    const addItemToBasket = (state) => {
      const Product = {category, description, id, image, price, rating, title, hasPrime}

      dispatch(addToBasket(Product))
    }

  return ( 
    <div className='relative z-30 flex flex-col p-10 m-5 bg-gray-50'>
        <p className='absolute text-xs italic text-gray-400 top-2 right-2'>{category}</p>
        <Image
        src={image}
        height={200}
        width={200}
        objectFit='contain'
        />
        <h4 className="my-3">{title}</h4>
        <div className='flex'>
            {Array(Math.round(rating.rate)).fill().map((_, i) => (<StarIcon className='h-5 text-yellow-500' />))}
        </div>
        <p className='my-2 text-xs line-clamp-2'>{description}</p>
        <div className='mb-5'>₹ {price}</div>
        {hasPrime && (
        <div className='flex items-center -mt-5 space-x-2'>
            <img className="w-12" src='https://links.papareact.com/fdw' alt='prime-logo' />
            <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
        </div>)}
        <button className='mt-auto button' onClick={addItemToBasket}>Add to Basket</button>
    </div>
  )
}

export default Product

