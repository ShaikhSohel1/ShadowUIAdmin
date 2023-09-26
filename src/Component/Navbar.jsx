"use client"

import { signOut, useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Navbar() {
  const {data: session, status}= useSession();
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
            SHADOWUI
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
{session ? (
        <div className="relative flex rounded-full mt-[5px] bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mx-8 hover:cursor-pointer"
        onClick={() => signOut()}
        >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <img
          className="h-8 w-8 rounded-full "
          src={session.user?.image}
          alt=""
         
        />
      </div>
):(
<SigninButton />
)}

      </div>
    </nav>
  );
}

const SigninButton = () => {
  const cssCode = `.button1 {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 15px;
    gap: 15px;
    background-color: #181717;
    outline: 3px #181717 solid;
    outline-offset: -3px;
    border-radius: 13px;
    border: none;
    cursor: pointer;
    transition: 400ms;
  }
  
  .button1 .text {
    color: white;
    font-weight: 700;
    font-size: 1em;
    transition: 400ms;
  }
  
  .button1 svg path {
    transition: 400ms;
  }
  
  .button1:hover {
    background-color: transparent;
  }
  
  .button1:hover .text {
    color: white;
  }
  
  .button1:hover svg path {
    fill: white;
  }`
  return(
    <div>
    <button className="button1 mx-9" onClick={()=> signIn("github")}>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z" fill="white"></path>
  </svg>
  <p className="text">GitHub</p>
</button>
<style>{cssCode}</style>
    </div>
  )
}