import Image from "next/legacy/image";
import React from "react";

const Header = () => {
  return (
    <header>
      {/* Top Nav */}
      <div className="flex items-center flex-grow p-1 py-2 bg-amazon_blue">
        <div className="flex items-center flex-grow mt-2 sm:flex-grow-0">
          <Image
            className="cursor-pointer"
            alt="logo"
            src={"https://links.papareact.com/f90"}
            objectFit="contain"
            height={40}
            width={150}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
