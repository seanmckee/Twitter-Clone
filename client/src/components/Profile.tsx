const Profile = () => {
  return (
    <div className="p-3">
      <h1 className="text-white text-2xl font-bold">username</h1>
      <p className="text-slate-700">0 Tweets</p>
      <div className="flex text-white">
        <p className="mr-2">
          0 <span className="text-slate-700 text-md">Following</span>
        </p>
        <p className="">
          0 <span className="text-slate-700 text-md">Followers</span>
        </p>
      </div>
      <ul className="text-white flex justify-center">
        <li className="p-2 text-slate-700 flex flex-grow items-center justify-center hover:bg-slate-900">
          Tweets
        </li>
        <li className="p-2 text-slate-700 flex flex-grow items-center justify-center hover:bg-slate-900">
          Replies
        </li>
        <li className="p-2 text-slate-700 flex flex-grow items-center justify-center hover:bg-slate-900">
          Likes
        </li>
        <li className="p-2 text-slate-700 flex flex-grow items-center justify-center hover:bg-slate-900">
          Retweets
        </li>
      </ul>
    </div>
  );
};

export default Profile;
