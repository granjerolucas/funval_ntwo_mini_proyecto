import React from "react";
import PropTypes from "prop-types";

const CardStay = ({ item }) => {
  return (
    <div className="">
      <img
        src={item.photo}
        alt=""
        className="rounded-2xl h-72 w-full object-cover"
      />
      <div className="mt-2 flex  gap-2 place-content-between items-center h-6">
        <div className="flex content-center gap-3 items-center">
          {item.superHost && (
            <span className="border border-black font-extrabold rounded-xl px-3 py-2 text-xs">
              SUPER HOST
            </span>
          )}
          <h3 className="text-sm font-medium text-gray-400">
            {item.type}.&nbsp;{item.beds > 1 ? item.beds + " " : ""}beds
          </h3>
        </div>
        <div className="flex gap-3 place-content-between">
          <span className="text-red-500">
            <svg
              className="w-6 h-6 "
              focusable="false"
              aria-hidden="true"
              viewBox=" 0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
            </svg>
          </span>
          <span className="text-sm">{item.rating}</span>
        </div>
      </div>
      <p className="mt-2 text-md font-semibold">{item.title}</p>
    </div>
  );
};

CardStay.propTypes = {
  item: PropTypes.object,
};

export default CardStay;
