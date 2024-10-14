import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const InputGuest = ({ label, description, onChange, className = "" }) => {
  const [count, setCount] = useState(0);

  const handleClick = (e) => {
    const btn = e.target.closest("button");

    if (btn && btn.tagName.toLowerCase() == "button") {
      let _r = count;
      if (btn.value == "+") {
        _r = count + 1;
      } else if (btn.value == "-") {
        _r = count - 1;
        if (_r < 0) {
          _r = 0;
        }
      }
      setCount(_r);
      onChange && onChange(_r);
    }
  };
  useEffect(() => {
  }, [count]);
  return (
    <div className={`flex flex-col gap-0 ${className}`}>
      <label htmlFor="guests" className="font-extrabold ">
        {label}
      </label>
      <p className="text-gray-400">{description}</p>
      <div className="mt-2 px-1" onClick={handleClick}>
        <button
          type="button"
          value="-"
          className="border  rounded-md w-6 h-6 border-gray-400"
        >
          -
        </button>
        <span className="m-2">{count}</span>
        <button
          type="button"
          value="+"
          className="border  rounded-md w-6 h-6 border-gray-400"
        >
          +
        </button>
      </div>
    </div>
  );
};

InputGuest.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputGuest;
