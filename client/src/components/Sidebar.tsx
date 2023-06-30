import { FaTwitter } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { FaRegBookmark } from "react-icons/fa";
import { BiUser, BiHomeCircle } from "react-icons/bi";

const Sidebar = () => {
  const logout = () => {
    window.localStorage.removeItem("userID");
    window.location.reload();
  };

  return (
    <div className="text-left fixed">
      <ul className=" flex flex-col">
        <li className="font-bold text-white text-4xl mb-5">
          <FaTwitter className="ml-4" />
        </li>
        <li className="flex text-2xl ">
          <div className="flex hover:bg-zinc-800 rounded-full p-3">
            <BiHomeCircle className="text-white text-3xl" />
            <span className="text-white ml-2">Home</span>
          </div>
        </li>
        <li className="flex">
          <div className="flex hover:bg-zinc-800 rounded-full p-3">
            <HiSearch className="text-white text-2xl" />
            <span className="text-white text-2xl ml-3 ">Explore</span>
          </div>
        </li>
        <li className="flex ">
          <div className="flex hover:bg-zinc-800 rounded-full p-3">
            <FaRegBookmark className="text-white text-2xl" />
            <span className="text-white text-2xl ml-3">Bookmarks</span>
          </div>
        </li>
        <li className="flex">
          <div className="flex hover:bg-zinc-800 rounded-full p-3 ">
            <BiUser className="text-white text-2xl" />
            <span className="text-white text-2xl ml-3">Profile</span>
          </div>
        </li>
        <li>
          <button className="bg-blue-400 text-white p-3 rounded-full w-[200px] font-bold m-2 mt-4">
            Tweet
          </button>
        </li>
      </ul>

      <button
        onClick={logout}
        className={
          window.localStorage.getItem("userID")
            ? "border-2 border-blue-400 text-white p-3 rounded-full w-[200px] font-bold m-2 mt-4 "
            : "hidden"
        }
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
