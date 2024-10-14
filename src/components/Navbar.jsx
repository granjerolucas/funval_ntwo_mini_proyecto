import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./navbar.css";
import { getStays } from "../api/stay.api";
import {
  useFilters,
  useMutateFilters,
  useMutationFirstCities,
  useStays,
} from "../queries/stay.query";
import ModalHeader from "./ModalHeader";
const Navbar = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // const [country, setCountry] = useState("all");
  // const [city, setCity] = useState("all");

  const { data: dataFilters } = useFilters();
  const [country, city, guests] = dataFilters;

  const { data } = useStays(country, city);
  const mFilter = useMutateFilters();
  const mFirtsCities = useMutationFirstCities();
  useEffect(() => {
    if (!loaded) {
      if (data.length > 0) {
        mFirtsCities.mutate();
        mFilter.mutate(["Finland", "all", 0]);
        // mFilter.mutate(['Finland', 'Turku', 0])
        setLoaded(true);
        // setCountry("Finland");
      }
    }
  }, [data, loaded, mFilter, mFirtsCities]);
  return (
    <>
      <header className="bg-amber-800x p-2">
        <nav className="px-2">
          <div className="flex justify-between items-center p-4">
            <div className="text-2xl font-bold text-white">
              <a href="#">
                <span className="text-white">
                  <img src="./logo.svg" alt="Logo" className="h-[1.6rem]" />
                </span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              {loaded && (
                <form
                  action=""
                  className="flex form-filter"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                  }}
                >
                  <button className="bbb" type="submit" value={"Vaasa, Finlad"}>
                    {city == "all" ? "Whole" : city}, {country}
                  </button>

                  <button
                    className="bbb text-gray-400"
                    type="submit"
                    placeholder="Add guests"
                  >
                    <span className="text-gray-400">{guests == 0 ? "Add guests" : guests}</span>
                  </button>

                  <button className="bbb" type="submit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="red"
                      className="size-5 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </nav>
        {/* <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          ut veritatis architecto dolores non suscipit ex explicabo unde nulla,
          error pariatur maxime magni ad numquam sint commodi soluta hic quod?
          <ul>
            {data.map((item, index) => {
              return <li key={index}>{item.title}</li>;
            })}
          </ul>
        </div> */}
      </header>
      {showModal && <ModalHeader onCloseModal={setShowModal} />}
    </>
  );
};

Navbar.propTypes = {};

export default Navbar;
