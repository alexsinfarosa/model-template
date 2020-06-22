import React from "react"

export default function Footer() {
  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center">
          <div className="px-5 py-2">
            <a
              href="https://newa.rcc-acis.workers.dev/about-us"
              className="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              About Us
            </a>
          </div>
          <div className="px-5 py-2">
            <a
              href="https://newa.rcc-acis.workers.dev/become-partner"
              className="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              Become a Partner
            </a>
          </div>
          <div className="px-5 py-2">
            <a
              href="https://newa.rcc-acis.workers.dev/press-room"
              className="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              Press Room
            </a>
          </div>
          <div className="px-5 py-2">
            <a
              href="https://newa.rcc-acis.workers.dev/partners"
              className="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              Partners
            </a>
          </div>
          <div className="px-5 py-2">
            <a
              href="https://newa.rcc-acis.workers.dev/help"
              className="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              Get Help
            </a>
          </div>
        </nav>
        <div className="mt-8 flex justify-center">
          <a
            href="https://www.google.com"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Facebook</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="mailto:support@newa.zendesk.com"
            className="ml-6 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Email the NEWA Help Desk</span>
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </a>
        </div>
        <div className="mt-8">
          <p className="text-center text-base leading-6 text-gray-400">
            &copy; 1996-2020 NYS IPM Program, Cornell University
          </p>
        </div>
      </div>
    </div>
  )
}
