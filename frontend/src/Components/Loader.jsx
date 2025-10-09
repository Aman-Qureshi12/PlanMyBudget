const Loader = ({ Text, Position, bgBlack }) => {
  return (
    <div className={`flex flex-row gap-2 ${Position}  items-center`}>
      <span className="text-xl text-richBlack">{Text}</span>
      <div
        className={`w-3 h-3 rounded-full ${bgBlack} animate-bounce [animation-delay:.7s]`}
      ></div>
      <div
        className={`w-3 h-3 rounded-full ${bgBlack} animate-bounce [animation-delay:.3s]`}
      ></div>
      <div
        className={`w-3 h-3 rounded-full ${bgBlack} animate-bounce [animation-delay:.7s]`}
      ></div>
    </div>
  );
};

export default Loader;
