import Image from "next/legacy/image";
import React, { useState } from "react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import { selectItems } from "@/slices/basketSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const router = useRouter();
  const session = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const items = useSelector(selectItems);
  // console.log(items) //------------------

  return (
    <header>
      {/* Top Nav */}
      <div className="flex items-center flex-grow p-1 py-2 bg-amazon_blue">
        <div className="flex items-center flex-grow mt-2 sm:flex-grow-0">
          <Image
            onClick={() => router.push('/')}
            className="cursor-pointer"
            alt="logo"
            src={"https://links.papareact.com/f90"}
            objectFit="contain"
            height={40}
            width={150}
          />
        </div>
        {/* Search Bar */}
        <div className="items-center flex-grow hidden h-10 bg-yellow-400 rounded-md cursor-pointer sm:flex hover:bg-yellow-500">
          <input
            className="flex-grow flex-shrink w-6 h-full p-2 px-4 focus:outline-none rounded-l-md"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="h-12 p-4" />
        </div>
        <div className="flex items-center mx-6 space-x-6 text-xs text-white whitespace-nowrap">
          <div className="link" onClick={session.status === "unauthenticated" ? signIn : signOut}>
            <p>{session.status === "authenticated" ? `Hello, ${session.data.user.name}` : "Sign In"}</p>
            <p className="font-extrabold md:text-sm">Accounts & Lists</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">&Orders</p>
          </div>
          <div className="relative flex items-center link" onClick={() => router.push("/checkout")}>
            <span className="absolute top-0 right-0 w-4 h-4 font-bold text-center text-black bg-yellow-400 rounded-full md:right-10">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden mt-2 font-extrabold md:inline md:text-sm">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* Bottom Nav */}
      <div className="flex items-center p-2 pl-6 space-x-3 text-xs font-semibold text-white bg-amazon_blue-light">
        {/* <MenuIcon className="w-4 h-4 ml-6 font-bold text-white cursor-pointer hover:scale-110" />
        <div className="text-xs text-white lg:inline-flex lg:text-xs lg:space-x-3 "> */}
        <p className="flex items-center link">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Bussiness</p>
        <p className="link">Today's Deals</p>
        <p className="hidden link lg:inline">Electonics</p>
        <p className="hidden link lg:inline">Food & Grocery</p>
        <p className="hidden link lg:inline">Prime</p>
        <p className="hidden link lg:inline">Buy Again</p>
        <p className="hidden link lg:inline">Shopper Toolkit</p>
        <p className="hidden link lg:inline">Health & Personal Care</p>
      </div>
      {/* </div> */}
    </header>
  );
};

export default Header;
