import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
export default function Comment({ comment, onLike }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`/api/user/${comment.userId}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="h-10 w-10 object-cover rounded-full bg-gray-300"
          src={user.profilePicture}
          alt=""
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="mr-1 ttext-xs truncate font-bold">
            @{user ? user.username : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 pb-2">{comment.content}</p>
        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
          <button
            onClick={() => onLike(comment._id)}
            type="button"
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "!text-blue-700"
            }`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-500">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "like" : "likes")}
          </p>
        </div>
      </div>
    </div>
  );
}
