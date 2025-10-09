import React from "react";

const FilterByCategory = ({ OnChange, categories }) => {
  return (
    <select
      onChange={OnChange}
      className="border-2 border-palePink rounded-sm px-4 py-2 max-small:w-full bg-richBlack text-palePink"
    >
      <option value="" disabled selected>
        Filter By Category
      </option>
      <option value="all">All</option>
      {categories?.map((cat) => (
        <option value={cat.category}>{cat.category}</option>
      ))}
    </select>
  );
};

export default FilterByCategory;
