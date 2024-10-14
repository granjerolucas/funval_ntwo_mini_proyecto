import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import InputGuest from "./InputGuest";

const FormGuests = ({ onChange }) => {
  const [adults, setAdults] = useState(0);
  const [childs, setChilds] = useState(0);
  const total = useMemo(() => {
    return adults + childs;
  }, [adults, childs]);
  useEffect(() => {
    onChange && onChange(total);
  }, [total, onChange]);
  return (
    <form action="" className="">
      <InputGuest
        label="Adult"
        description="Age 13 or above"
        className="mb-8"
        onChange={(value) => {
          setAdults(value);
        }}
      />
      <InputGuest
        label="Children"
        description="Age 2-12"
        onChange={(value) => {
          setChilds(value);
        }}
      />
    </form>
  );
};

FormGuests.propTypes = {
  onChange: PropTypes.func,
};

export default FormGuests;
