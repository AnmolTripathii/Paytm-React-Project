import React from 'react';
import { FaRegUserCircle, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function TopInfo({ user }) {
  return (
    <div className="flex items-center p-3 md:p-4 bg-slate-900 shadow-md">
      <Link to="/user/dashboard" className="mr-4">
        <FaHome className="w-8 h-8 text-slate-400 hover:text-white transition-colors duration-200" />
      </Link>
      <div className="flex items-center gap-8">
        {user.profilePic ? (
          <img
            src={user.profilePic}
            alt={user.firstName}
            className="w-10 h-10 md:w-16 md:h-16 rounded-full object-cover"
          />
        ) : (
          <FaRegUserCircle className="w-10 h-10 md:w-16 md:h-16 text-slate-400" />
        )}
        <div>
          <h2 className="text-lg font-semibold text-white">{`${user.firstName} ${user.lastName}`}</h2>
          <p className="text-gray-400">@{user.username}</p>
        </div>
      </div>
    </div>
  );
}

export default TopInfo;
