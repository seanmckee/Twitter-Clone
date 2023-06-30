import Authentication from "./components/Authentication";

function App() {
  return (
    <>
      <div className="flex text-center bg-black h-screen">
        <div className="w-[30%] bg-red-100">1</div>
        <div className="grow bg-yellow-100">1</div>
        <div className="w-[30%]">
          {localStorage.getItem("userID") ? (
            <button className="bg-blue-400 text-white p-3 rounded-full">
              Logout
            </button>
          ) : (
            <Authentication />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
