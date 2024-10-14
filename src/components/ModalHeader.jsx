import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";

import ItemsLocation from "./modal_header/ItemsLocation";
import FormGuests from "./modal_header/FormGuests";
import {
  useFilters,
  useFirstCities,
  useMutateFilters,
} from "../queries/stay.query";

function ModalHeader({ onCloseModal }) {
  const { data: dataFilters } = useFilters();
  const [currentTab, setCurrentTab] = useState("location");
  const [country, city, guests] = dataFilters;
  const [countGuests, setCountGuests] = useState(guests);
  const [countryCity, setCountryCity] = useState([country, city]);
  const mFilter = useMutateFilters();
  const { data } = useFirstCities();

  const search = useMemo(() => {
    return [...countryCity, countGuests];
  }, [countGuests, countryCity]);

  const onClickCityCountry = useCallback((country, city) => {
    setCountryCity([country, city]);
  }, []);

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      const btn = e.target.closest("button");
      if (btn) {
        switch (btn.value) {
          case "location":
            setCurrentTab(btn.value);
            break;
          case "guests":
            setCurrentTab(btn.value);
            break;
          case "search":
            onCloseModal(() => false);
            mFilter.mutate(search);

            break;

          default:
            break;
        }
      }
    },
    [mFilter, onCloseModal, search]
  );

  return (
    <div className="  fixed top-0 left-0 w-full h-full  bg-[rgba(0,0,0,0.2)]">
      <div className="bg-white shadow-lg h-[75%] ">
        <div className="container mx-auto ">
          <div className="flex justify-between items-center py-5">
            <div className="text-1xl font-bold text-black">
              <span>Edit your search</span>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 cursor-pointer"
                onClick={() => {
                  onCloseModal(() => false);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <div className="py-2">
            <div
              action=""
              className="flex form-filter justify-between "
              onClick={handleClick}
            >
              <button
                type="submit"
                className="w-full text-left flex flex-col "
                value="location"
              >
                <span className="font-extrabold mb-1">Location</span>
                <p className="">
                  {countryCity[1] == "all" ? "Whole" : countryCity[1]},
                  {countryCity[0]}
                </p>
              </button>

              <button
                type="submit"
                placeholder="Add guests"
                className="w-full text-left"
                value="guests"
              >
                <label className="font-extrabold">Guests</label>
                <p>{countGuests}</p>
              </button>

              <button
                type="submit"
                className="w-[24rem] flex items-center bg-red-500 text-white"
                value="search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="white"
                  className="size-5 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>

                <span className="mx-3 text-white font-bold">Search</span>
              </button>
            </div>
            <div className="flex  justify-between mt-7">
              <div className="w-full">
                {currentTab == "location" && (
                  <ul className="">
                    {data.length > 0 &&
                      data[0].cities.map((item, index) => {
                        return (
                          <ItemsLocation
                            key={index}
                            city={item}
                            onClick={() => {
                              onClickCityCountry(data[0].country, item);
                            }}
                            country={data[0].country}
                            // title={`${item}, ${data[0].country}`}
                          />
                        );
                      })}
                  </ul>
                )}
              </div>
              <div className="w-full">
                {currentTab == "guests" && (
                  <FormGuests onChange={setCountGuests} />
                )}
              </div>
              <div className="w-[24rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
ModalHeader.propTypes = {
  onCloseModal: PropTypes.func,
};
export default ModalHeader;
