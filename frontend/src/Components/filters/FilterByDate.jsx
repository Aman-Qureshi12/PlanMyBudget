import React from "react";

const FilterByDate = ({ OnChange }) => {
  return (
    <select
      onChange={OnChange}
      className="border-2 border-palePink rounded-sm px-4 py-2 max-small:w-full bg-richBlack text-palePink"
    >
      <option value="" disabled selected>
        Filter By Date
      </option>
      <option value="all">All</option>
      <option value="Ascending">Ascending</option>
      <option value="Descending">Descending</option>
    </select>
  );
};

export default FilterByDate;
