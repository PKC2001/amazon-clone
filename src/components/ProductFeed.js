import React from "react";
import Product from "./Product";

const ProductFeed = ({ products }) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 mx-auto md:-mt-52 lg:grid-cols-3 xl:grid-cols-4">
  
      {products.slice(0,4).map((product) => (
        <Product 
          key={product.id} 
          category={product.category} 
          description={product.description} 
          id={product.id} 
          image={product.image} 
          price={product.price} 
          title={product.title} 
          rating={product.rating}
        />
      ))}

      <img className="md:col-span-full" src="https://links.papareact.com/dyz" alt="img" />
      <div className="md:col-span-2">
      {products.slice(4,5).map((product) => (
        <Product 
          key={product.id} 
          category={product.category} 
          description={product.description} 
          id={product.id} 
          image={product.image} 
          price={product.price} 
          title={product.title} 
          rating={product.rating}
        />
      ))}
      </div>
      {products.slice(5, products.length-1).map((product) => (
        <Product 
          key={product.id} 
          category={product.category} 
          description={product.description} 
          id={product.id} 
          image={product.image} 
          price={product.price} 
          title={product.title} 
          rating={product.rating}
        />
      ))}
    </div>
  );
};

export default ProductFeed;
