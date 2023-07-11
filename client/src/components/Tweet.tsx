import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useCookies } from "react-cookie";
import { StateInterface } from "./Home";

type TweetProps = {
  username: string;
  text: string;
  likes: number;
  liked: boolean;
  postID: string;
  trigger: StateInterface["triggerRender"];
  setTrigger: StateInterface["setTriggerRender"];
};

const Tweet = ({
  username,
  text,
  likes,
  liked,
  postID,
  trigger,
  setTrigger,
}: TweetProps) => {
  const [cookies, _] = useCookies(["access_token"]);

  const likeTweet = async () => {
    try {
      await axios.put(
        "http://localhost:8000/posts/like",
        {
          postID: postID,
          userID: localStorage.getItem("userID"),
        },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      setTrigger((prevTrigger) => !prevTrigger);
    } catch (error) {
      console.error(error);
    }

    console.log("liked");
  };

  const unlikeTweet = async () => {
    try {
      await axios.put(
        "http://localhost:8000/posts/unlike",
        {
          postID: postID,
          userID: localStorage.getItem("userID"),
        },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      setTrigger((prevTrigger) => !prevTrigger);
    } catch (error) {
      console.error(error);
    }
    console.log("unliked");
  };

  return (
    <div className="border-[1px] border-zinc-800 p-6">
      <h1 className="text-white font-bold text-xl text-left  w-full mb-0">
        @{username}
      </h1>
      <p className="text-white">{text}</p>
      <p className="text-white flex">
        <button onClick={liked ? unlikeTweet : likeTweet}>
          {liked ? (
            <AiFillHeart style={{ color: "#e85f5f" }} />
          ) : (
            <AiOutlineHeart />
          )}
        </button>

        <span className="ml-1">{likes}</span>
      </p>
    </div>
  );
};

export default Tweet;
