"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";

// Define the context type
interface HouseContextType {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchPageNumber: number;
  setSearchPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  properties: any[]; 
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  setProperties: React.Dispatch<React.SetStateAction<any[]>>;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context with a default value of undefined
export const HouseContext = createContext<HouseContextType | undefined>(undefined);

export const HouseProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchPageNumber, setSearchPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedActiveSection = sessionStorage.getItem("activeSection");
      if (storedActiveSection) {
        setActiveSection(storedActiveSection);
      }

      const checkLocationAndUpdateState = () => {
        const currentPath = window.location.pathname;
        if (
          currentPath !== "/properties" &&
          currentPath !== "/community" &&
          currentPath !== "/services"
        ) {
          setActiveSection("");
          sessionStorage.setItem("activeSection", "");
        }
      };

      checkLocationAndUpdateState();
      window.addEventListener("popstate", checkLocationAndUpdateState);
      return () => {
        window.removeEventListener("popstate", checkLocationAndUpdateState);
      };
    }
  }, []);


  return (
    <HouseContext.Provider
      value={{
        searchText,
        setSearchText,
        searchPageNumber,
        setSearchPageNumber,
        setIsLoading,
        isLoading,
        properties,
        totalPages,
        setTotalPages,
        setProperties,
        pageNumber,
        setPageNumber,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};
