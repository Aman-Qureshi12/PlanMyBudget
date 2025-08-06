import SideBar from "./Layout/SideBar";
import Overview from "./Pages/Overview";

function App() {
  return (
    <div className="flex gap-10">
      <SideBar />
      <Overview />
    </div>
  );
}

export default App;
