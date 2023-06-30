import Authentication from "./components/Authentication";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <div className="flex text-center bg-black h-screen">
        <div className="w-[300px] p-10">
          <Sidebar />
        </div>
        <div className="grow bg-yellow-100">1</div>
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
