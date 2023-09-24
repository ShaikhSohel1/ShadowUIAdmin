"use client"

import Link from 'next/link';
import React, { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="" className="flex items-center">
          <img
            src=""
            className="h-8 mr-3"
            alt=""
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            uiVerse
          </span>
        </a>
        <button
          onClick={toggleMobileMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={mobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className={`w-5 h-5 ${mobileMenuOpen ? 'hidden' : 'block'}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
          <svg
            className={`w-5 h-5 ${mobileMenuOpen ? 'block' : 'hidden'}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div
          className={`w-full md:w-auto md:flex-grow md:flex md:items-center md:justify-end ${mobileMenuOpen ? 'block' : 'hidden'}`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-10 md:p-0 mt-4 border border-gray-100 text-white rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
            <Link 
              href="/"
              >
              <p
             
                className="block py-2 pl-3 pr-4 rounded  md:p-0 "
                aria-current="page"
              >
                All Posts
              </p>
              </Link>
            </li>
            <li>
              <Link 
              href="/review"
              >
              <p
                className="block py-2 pl-3 pr-4  rounded   md:border-0  md:p-0 "
              >
                Review
              </p>
              </Link>
            </li>
            <li>
              <p
      
                className="block py-2 pl-3 pr-4 md:p-0 "
              >
                Users
              </p>
            </li>
   
          </ul>
        </div>
      </div>
    </nav>
  );
}
