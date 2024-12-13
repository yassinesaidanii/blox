"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { IoSettings, IoHome, IoChatbubble  } from 'react-icons/io5';
import { UserButton } from '@clerk/nextjs';

const Sidebar = () => {
  // State to manage sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle function to open/close the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar visibility
  };

  return (
    <div>
      {/* Button to open/close sidebar */}
      <button
        onClick={toggleSidebar} // Toggle the sidebar visibility on click
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 z-50"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-48 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto shadow-md shadow-purple-300 -50 ">
            <Link href="/"><h1 className='w-full text-white font-bold bg-gradient-to-r from-purple-800 to-purple-500 text-2xl mb-10 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-800'>Blox Fruits</h1></Link>
          <ul className="space-y-4 font-semibold">
            <li>
              <Link
                href="/main"
                className="flex items-center p-2 text-gray-400 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoHome width={20} height={20} />
                <span className="ms-3">Main</span>
              </Link>
            </li>
            <li>
              <Link
                href="/tradefeed"
                className="flex items-center p-2 text-gray-400 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoChatbubble width={20} height={20} />
                <span className="ms-3">Trade Feed</span>
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center p-2 text-gray-400 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoSettings width={20} height={20} />
                <span className="ms-3">Settings</span>
              </Link>
            </li>
            <li className='bottom-0 fixed'>
              <UserButton 
              afterSignOutUrl='/'
                appearance={
                  {
                    elements:{
                      avatarBox: "w-[50px] h-[50px]"
                    }
                  }
                }
              />
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
