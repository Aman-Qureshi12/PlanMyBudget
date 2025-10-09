import React from "react";

const FilterByMonth = ({ OnChange }) => {
  return (
    <select
      onChange={OnChange}
      className="border-2 border-palePink rounded-sm px-4 py-2 max-small:w-full bg-richBlack text-palePink"
    >
      <option value="" disabled selected>
        Filter By Months
      </option>
      <option value="0">All</option>
      <option value="1">Jan</option>
      <option value="2">Feb</option>
      <option value="3">Mar</option>
      <option value="4">Apr</option>
      <option value="5">May</option>
      <option value="6">Jun</option>
      <option value="7">Jul</option>
      <option value="8">Aug</option>
      <option value="9">Sep</option>
      <option value="10">Oct</option>
      <option value="11">Nov</option>
      <option value="12">Dec</option>
    </select>
  );
};

export default FilterByMonth;
