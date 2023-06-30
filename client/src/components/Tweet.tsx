type TweetProps = {
  username: string;
  text: string;
  likes: number;
};

const Tweet = ({ username, text, likes }: TweetProps) => {
  return (
    <div className="border-[1px] border-zinc-800 p-4">
      <h1 className="text-white font-bold text-xl text-left  w-full mb-0">
        @{username}
      </h1>
      <p className="text-white">{text}</p>
      <p className="text-white">Likes: {likes}</p>
    </div>
  );
};

export default Tweet;
