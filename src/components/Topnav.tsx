"use client";
import React from "react";
import Link from "next/link";
import {Facebook, Twitter, Linkedin, InstagramIcon } from "lucide-react";
const Topnav = () => {

    return (
        <div className="font-lato p-3">
            <nav className="flex justify-between mx-10 h-5 relative">
                <div className=" text-white flex gap-x-6">
                    <div className="flex items-center">
                   +396757455
                    </div>
                    <div className="flex items-center">
                       hommyFind@gmail.com
                    </div>
                </div>

                <div className="flex items-center justify-end gap-x-7">
                    <Link
                        href={"/properties/favourites"}
                        className="flex items-center font-medium text-[15px] gap-x-2 cursor-pointer"
                    >
                        <Facebook size={16} fill="white" color="white" />
                    </Link>
                    <Link
                        href={"/properties/favourites"}
                        className="flex items-center font-medium text-[15px] gap-x-2 cursor-pointer"
                    >
                        <Twitter size={16} fill="white" color="white" />
                    </Link>
                    <Link
                        href={"/properties/favourites"}
                        className="flex items-center font-medium text-[15px] gap-x-2 cursor-pointer"
                    >
                        <Twitter size={16} fill="white" color="white" />
                    </Link>
                    <Link
                        href={"/properties/favourites"}
                        className="flex items-center font-medium text-[15px] gap-x-2 cursor-pointer"
                    >
                        <Linkedin size={16} fill="white" color="white" />
                    </Link>
                    <Link
                        href={"/properties/favourites"}
                        className="flex items-center font-medium text-[15px] gap-x-2 cursor-pointer"
                    >
                        <InstagramIcon size={16} fill="white" color="white" />
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Topnav;
