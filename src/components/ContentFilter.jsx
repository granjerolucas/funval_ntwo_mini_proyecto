import React, { useState } from "react";
import PropTypes from "prop-types";
import CardStay from "./content_filter/CardStay";
import { useFilters, useStays } from "../queries/stay.query";

const ContentFilter = () => {
  // const [country, setCountry] = useState("all");
  // const [city, setCity] = useState("all");
  const { data: dataFilters } = useFilters();
  const [country, city, guests] = dataFilters;

  const { data } = useStays(country, city, guests);

  // const mFilter = useMutateFilters()
  return (
    <section className="px-2 mt-10">
      <div className="flex justify-between items-center px-6">
        <div>
          <h3 className="font-bold text-2xl">Stays in Finland</h3>
        </div>
        <div>
          <span className="font-semibold">
            {data.length > 12 ? 12 + "+" : data.length}&nbsp;stays
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-10 content-center items-center px-6 mt-8">
        {data.map((item, index) => (
          <CardStay key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

ContentFilter.propTypes = {};

export default ContentFilter;
