import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

const WriteTweet = () => {
  const [tweetText, setTweetText] = useState("");
  const [cookies, _] = useCookies(["access_token"]);

  const handleTweet = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(tweetText);
    try {
      await axios.post(
        "http://localhost:8000/posts",
        {
          text: tweetText,
          user: window.localStorage.getItem("userID"),
        },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      setTweetText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <textarea
        className="bg-black border-t-0 border-[1px] border-zinc-800 mb-2 text-white resize-none w-full h-[100px] placeholder:text-xl p-3 text-xl"
        name="tweet"
        id="tweet"
        cols={30}
        rows={10}
        placeholder="What's happening?"
        value={tweetText}
        onChange={(event) => setTweetText(event.target.value)}
      ></textarea>
      <button
        onClick={handleTweet}
        className="bg-blue-400 rounded-full text-white p-2 px-4 float-right absolute right-2 bottom-6"
      >
        Tweet
      </button>
    </div>
  );
};

export default WriteTweet;
