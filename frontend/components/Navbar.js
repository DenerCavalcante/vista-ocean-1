import Link from "next/link"
import React from "react"
import NextImage from "./Image"

const Navbar = ({covers}) => {
  return (
    <React.Fragment>
      <header className="absolute top-0 left-0 w-full bg-white z-10  border-b px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64">
        <div className="flex w-full justify-between items-centertext-sm py-4">
          <div className="flex w-full items-center justify-between ">
            <div className=" ">
              <Link href="/">
                <a className="">
                  <NextImage
                    src="/img/logo.svg"
                    alt="home"
                    className="logo"
                    height="30"
                    width="320"
                  />
                </a>
              </Link>
            </div>

            <div className="flex justify-items-end">
              <nav className="w-full md:bg-transparent rounded shadow-lg px-6 text-center md:p-0 md:mt-0 md:shadow-none">
                <ul className="md:flex justify-items-end">
                  <li>
                    <a
                      className="py-2 inline-block md:hidden lg:block font-semibold"
                      href="#"
                    >
                      Sobre nós
                    </a>
                  </li>
                  <li className="md:ml-4">
                    <a
                      className="py-2 inline-block  md:px-2 font-semibold"
                      href="#"
                    >
                      LGPD
                    </a>
                  </li>
                  <li className="md:ml-4">
                    <a
                      className="py-2 inline-block  md:px-2 font-semibold"
                      href="#"
                    >
                      Politicas de uso
                    </a>
                  </li>

                  <li className="md:ml-6 mt-3 md:mt-0">
                    <button className="focus:outline-none  snipcart-checkout flex items-center">
                      <NextImage
                        height="30"
                        width="30"
                        src="/img/boat.svg"
                        alt="Cart"
                      />
                     
                      <span className="snipcart-total-price ml-1 font-semibold text-sm text-blue-900"></span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gray-100">
        <section
          className="cover bg-blue-teal-gradient relative bg-blue-600 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-32 flex: ;
      items-center"
        >
          <div className="h-full absolute top-0 left-0 z-0">
            <img
              src="/img/cover-gb.jpeg"
              alt=""
              className="w-full h-full object-cover opacity-20"
            />
          </div>

          <div className="lg:w-3/4 xl:w-2/4 relative z-10  lg:mt-16">
            <div>
              <h1 className="text-white text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                A better life starts with a beautiful smile.
              </h1>
              <p className="text-blue-100 text-xl md:text-2xl leading-snug mt-4">
                Welcome to the Dentist Office of Dr. Thomas Dooley, where trust
                and comfort are priorities.
              </p>
              <a
                href="#"
                className="px-8 py-4 bg-teal-500 text-white rounded inline-block mt-8 font-semibold"
              >
                Book Appointment
              </a>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
   )
  }
    // <div className="flex justify-between ml-6 mr-6 mt-4">
    //   <Link href="/">
    //     <a>
    //       <NextImage
    //         src="/strapi.png"
    //         alt="home"
    //         className="logo"
    //         height="44"
    //         width="150"
    //       />
    //     </a>
    //   </Link>
    //   <button className="stripe-checkout flex items-center">
    //     <NextImage height="150" width="150" src="/cart.svg" alt="Cart" />
    //     <span className="stripe-total-price ml-3 font-semibold text-sm text-indigo-500"></span>
    //   </button>
    // </div>
   
  
export default Navbar
