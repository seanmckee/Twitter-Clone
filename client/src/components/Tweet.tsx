import { AiOutlineHeart } from "react-icons/ai";

type TweetProps = {
  username: string;
  text: string;
  likes: number;
};

const Tweet = ({ username, text, likes }: TweetProps) => {
  return (
    <div className="border-[1px] border-zinc-800 p-6">
      <h1 className="text-white font-bold text-xl text-left  w-full mb-0">
        @{username}
      </h1>
      <p className="text-white">{text}</p>
      <p className="text-white flex">
        <button>
          <AiOutlineHeart />
        </button>

        <span className="ml-1">{likes}</span>
      </p>
    </div>
  );
};

export default Tweet;
