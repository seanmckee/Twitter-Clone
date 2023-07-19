import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useCookies } from "react-cookie";
import { StateInterface } from "./Home";

import { FaRegComment } from "react-icons/fa";
import { HiReply } from "react-icons/hi";
import { useState } from "react";
import Popup from "reactjs-popup";

type TweetProps = {
  username: string;
  text: string;
  likes: number;
  liked: boolean;
  postID: string;
} & StateInterface;

const Tweet = ({
  username,
  text,
  likes,
  liked,
  postID,
  triggerRender,
  setTriggerRender,
}: TweetProps) => {
  const [cookies, _] = useCookies(["access_token"]);
  const [open, setOpen] = useState(false);

  const togglePopup = () => {
    setOpen(!open);
  };

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
      setTriggerRender(!triggerRender);
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
      setTriggerRender(!triggerRender);
    } catch (error) {
      console.error(error);
    }
    console.log("unliked");
  };

  // const openComments = async () => {
  //   try {
  //     await axios.put(
  //       "http://localhost:8000/posts/comments",
  //       {
  //         postID: postID,
  //       },
  //       {
  //         headers: { authorization: cookies.access_token },
  //       }
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const postComment = async () => {
  //   try {
  //     await axios.post(
  //       "http://localhost:8000/posts/comments",
  //       {
  //         postID: postID,
  //       },
  //       {
  //         headers: { authorization: cookies.access_token },
  //       }
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="border-[1px] border-zinc-800 p-6">
      <h1 className="text-white font-bold text-xl text-left w-full mb-0">
        @{username}
      </h1>
      <p className="text-white">{text}</p>
      <div className="text-white flex">
        <div className="flex">
          <button onClick={liked ? unlikeTweet : likeTweet}>
            {liked ? (
              <AiFillHeart style={{ color: "#e85f5f" }} />
            ) : (
              <AiOutlineHeart />
            )}
          </button>

          <span className="ml-1">{likes}</span>
        </div>
        <div>
          <button className="ml-3">
            <FaRegComment />
          </button>
          <span className="ml-1">0</span>
        </div>

        <button onClick={togglePopup}>
          <HiReply />
        </button>
        <Popup
          open={open}
          closeOnDocumentClick
          onClose={togglePopup}
          contentStyle={{
            background: "black",
            position: "relative",
            borderRadius: "2rem",
          }}
          overlayStyle={{
            background:
              "linear-gradient(rgba(147, 197, 253, 0.2), rgba(147, 197, 253, 0.2))",
          }}
        >
          <div className="w-[500px] h-[250px] p-4 rounded-3xl">
            <div className="absolute inset-0 bg-black rounded-3xl text-slate-400" />
            <textarea
              className="absolute focus:outline-0 border-0 top-4 bg-black border-t-0 mb-2 text-white resize-none w-[450px] h-[100px] placeholder:text-xl p-3 text-xl"
              name="tweet"
              id="tweet"
              cols={20}
              rows={10}
              placeholder="Tweet your reply!"
              // value={tweetText}
              // onChange={(event) => setTweetText(event.target.value)}
            ></textarea>
            <button
              // onClick={handleTweet}
              className="bg-blue-400 rounded-full text-white p-2 px-4 float-right absolute right-4 bottom-4"
            >
              Reply
            </button>
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default Tweet;
