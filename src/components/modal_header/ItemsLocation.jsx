import React from "react";
import PropTypes from "prop-types";

const ItemsLocation = ({ city, country, onClick }) => {
  return (
    <li
      className="flex items-center gap-2 px-10 py-5 text-gray-600 cursor-pointer"
      onClick={onClick}
    >
      <svg
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="LocationOnIcon"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5"></path>
      </svg>
      <span>
        {city}, {country}
      </span>
    </li>
  );
};

ItemsLocation.propTypes = {
  city: PropTypes.string,
  country: PropTypes.string,
  onClick: PropTypes.func,
};

export default ItemsLocation;
