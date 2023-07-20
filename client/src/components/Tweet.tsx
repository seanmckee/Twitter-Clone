import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useCookies } from "react-cookie";

import { FaRegComment } from "react-icons/fa";
import { HiReply } from "react-icons/hi";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";

type TweetProps = {
  username: string;
  text: string;
  likes: number;
  liked: boolean;
  postID: string;
};

const Tweet = ({ username, text, likes, liked, postID }: TweetProps) => {
  const [cookies, _] = useCookies(["access_token"]);
  const [open, setOpen] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [isLiked, setIsLiked] = useState(liked);
  const [tweetText, setTweetText] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsVisible, setCommentsVisible] = useState(false);

  const togglePopup = () => {
    setOpen(!open);
  };

  const likeTweet = async () => {
    try {
      setCurrentLikes(currentLikes + 1);
      setIsLiked(true);
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
    } catch (error) {
      console.error(error);
    }

    console.log("liked");
  };

  const unlikeTweet = async () => {
    try {
      setCurrentLikes(currentLikes - 1);
      setIsLiked(false);
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
    } catch (error) {
      console.error(error);
    }
    console.log("unliked");
  };

  const postComment = async () => {
    try {
      await axios.put(
        "http://localhost:8000/posts/comment",
        {
          postID: postID,
          userID: localStorage.getItem("userID"),
          text: tweetText,
        },
        { headers: { authorization: cookies.access_token } }
      );
      togglePopup();
    } catch (error) {
      console.error(error);
    }
  };

  const getComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/posts/comments/${postID}`
      );
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      <div className="border-[1px] border-zinc-800 p-6">
        <h1 className="text-white font-bold text-xl text-left w-full mb-0">
          @{username}
        </h1>
        <p className="text-white">{text}</p>
        <div className="text-white flex">
          <div className="flex">
            <button onClick={isLiked ? unlikeTweet : likeTweet}>
              {isLiked ? (
                <AiFillHeart style={{ color: "#e85f5f" }} />
              ) : (
                <AiOutlineHeart />
              )}
            </button>

            <span className="ml-1">{currentLikes}</span>
          </div>
          <div>
            <button
              className="ml-3"
              onClick={() => setCommentsVisible(!commentsVisible)}
            >
              <FaRegComment />
            </button>
            <span className="ml-1">{comments.length}</span>
          </div>

          <button onClick={togglePopup}>
            <HiReply />
          </button>

          <Popup
            open={open}
            closeOnDocumentClick
            // onClose={togglePopup}
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
                name="tweetText"
                id="tweetText"
                value={tweetText}
                onChange={(event) => setTweetText(event.target.value)}
                cols={20}
                rows={10}
                placeholder="Tweet your reply!"
              ></textarea>
              <button
                onClick={postComment}
                className="bg-blue-400 rounded-full text-white p-2 px-4 float-right absolute right-4 bottom-4"
              >
                Reply
              </button>
            </div>
          </Popup>
        </div>
      </div>
      <div className={commentsVisible ? "w-[95%] ml-auto" : "hidden"}>
        {comments &&
          comments
            .slice(0)
            .reverse()
            .map((comment: any) => (
              <Tweet
                username={comment.username}
                text={comment.text}
                likes={comment.likes ? comment.likes.length : 0}
                liked={
                  comment.likes
                    ? comment.likes.includes(localStorage.getItem("userID"))
                    : false
                }
                postID={comment._id}
                key={comment._id}
              />
            ))}
      </div>
    </div>
  );
};

export default Tweet;
