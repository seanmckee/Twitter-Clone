import Authentication from "./components/Authentication";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <div className="flex text-center bg-black h-full">
        <div className="w-[300px] p-10">
          <Sidebar />
        </div>
        <div className="w-[40%] text-left">
          <div>
            <Home />
          </div>
        </div>
        <div
          className={
            window.localStorage.getItem("userID") ? "hidden" : "w-[30%]"
          }
        >
          <Authentication />
        </div>
      </div>
    </>
  );
}

export default App;
