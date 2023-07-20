import Authentication from "./components/Authentication";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="flex text-center bg-black h-screen">
        <div className="w-[300px] p-10">
          <Sidebar />
        </div>
        <div className="w-[40%] text-left">
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
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
