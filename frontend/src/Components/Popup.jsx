import React from "react";

const Popup = ({ Message, bgColor }) => {
  return (
    <div
      className={`bg-${bgColor} text-richBlack fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded z-10 shadow`}
    >
      <p>{Message}</p>
      <div className="flex justify-between pt-6 text-textColor">
        <button className="bg-richBlack rounded-sm  px-4 py-2">Cancel</button>
        <button className="bg-richBlack rounded-sm  px-4 py-2">Submit</button>
      </div>
    </div>
  );
};

export default Popup;
