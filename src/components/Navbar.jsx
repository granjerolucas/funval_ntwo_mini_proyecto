import React from "react";
import PropTypes from "prop-types";
import "./navbar.css";
const Navbar = (props) => {
  return (
    <header className="bg-amber-800x p-2">
      <nav>
        <div className="flex justify-between items-center p-4">
          <div className="text-2xl font-bold text-white">
            <a href="#">
              <span className="text-white">
                <span className="sr-only">Logo</span>
                <img src="/logo.svg" alt="Logo" />
              </span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <form action="" className="flex form-filter">
              <button type="text" value={"Vaasa, Finlad"}>
                Vaasa, Finlad
              </button>
              <button type="text" value={"Vaasa, Finlad"}>
                Vaasa, Finlad
              </button>

              <button type="text" placeholder="Add guests">
                Add guests
              </button>

              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

Navbar.propTypes = {};

export default Navbar;
