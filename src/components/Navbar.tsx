"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Topnav from "./Topnav";
import { AddEditPropertyModel } from './Forms/AddNewProperty';
import { houseContext } from "@/context/context";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { activeSection, setActiveSection }: any = useContext(houseContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAddPropertyFormOpen, setIsAddPropertyAddPropertyFormOpen] = useState(false);

    const handleOpenForm = () => {
        setIsAddPropertyAddPropertyFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsAddPropertyAddPropertyFormOpen(false);
    };

    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedInUser");
        setIsLoggedIn(loggedIn !== null);
    }, []);

    const navigateToBuy = (p0: string) => setActiveSection("Buy");
    const navigateToRent = (p0: string) => setActiveSection("Rent");
    const navigateToAbout = (p0: string) => setActiveSection("About");
    const navigateToContact = (p0: string) => setActiveSection("Contact");

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleAddEditFormSubmit = async (formData: any) => {
        //   dispatch(createPropertyListingFromProjects(formData)).then(() => {
        //     setIsModalOpen(false);
        //     window.location.reload();
        //   });
        //   propertyModelClose();
        console.log(formData, 'formData on submit');
    }

    return (
        <>
            <div className="lg:flex flex-col w-[80%] sm:w-[90%] mx-auto p-4">
                {isLoggedIn ? <Topnav /> : null}

                <nav className="bg-white br-2 rounded relative py-8 px-8 justify-between font-poppins flex items-center">
                    <Link href="/">
                        <div className="font-bold lg:text-5xl sm:text-3xl xl:text-6xl text-[#333333]">
                            HommyFind
                        </div>
                    </Link>
                    <div className="lg:hidden">
                        <button onClick={toggleMenu} className="text-black focus:outline-none">
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className={`lg:flex lg:items-center lg:space-x-8 lg:text-black ${isMenuOpen ? "block" : "hidden"}`}>
                        <Link href="/properties">
                            <div
                                className={`cursor-pointer px-3 ${activeSection === "Buy"
                                    ? "text-white rounded-full"
                                    : ""
                                    }`}
                                onClick={() => navigateToBuy("Buy")}
                            >
                                Buy
                            </div>
                        </Link>
                        <Link href="/properties">
                            <div
                                className={`cursor-pointer px-3 ${activeSection === "Rent"
                                    ? "bg-[#407BFF] text-white rounded-full"
                                    : ""
                                    }`}
                                onClick={() => navigateToRent("Rent")}
                            >
                                Rent
                            </div>
                        </Link>
                        <Link href="/AboutUs">
                            <div
                                className={`cursor-pointer ${activeSection === "About"
                                    ? "text-[#00A3FF] font-bold"
                                    : "hover:text-[#00A3FF]"
                                    }`}
                                onClick={() => navigateToAbout("About")}
                            >
                                About
                            </div>
                        </Link>
                        <Link href="/contact">
                            <div
                                className={`cursor-pointer ${activeSection === "About"
                                    ? "text-[#00A3FF] font-bold"
                                    : "hover:text-[#00A3FF]"
                                    }`}
                                onClick={() => navigateToAbout("About")}
                            >
                                Contact Us
                            </div>
                        </Link>
                        <div>
                            <div
                                className="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
                                onClick={handleOpenForm}
                            >
                                List Your Property
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            {isAddPropertyFormOpen && (
                <AddEditPropertyModel
                    isOpen={isAddPropertyFormOpen}
                    onClose={handleCloseForm}
                    onSubmit={handleAddEditFormSubmit}
                />
            )}
        </>
    );
};

export default Navbar;
