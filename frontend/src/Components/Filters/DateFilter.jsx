import React from "react";

const DateFilter = () => {
  return (
    <div>
      <select>
        <option disabled value="">
          Filter By Date
        </option>
        <option value="Ascending">Ascending</option>
        <option value="Descending">Descending</option>
      </select>
    </div>
  );
};

export default DateFilter;
