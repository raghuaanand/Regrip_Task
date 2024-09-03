import React from 'react';
import { MdNotificationAdd } from "react-icons/md";

const Header = () => {
  return (
    <div className=" bg-gray-100 flex justify-between p-4 pt-10 pr-10 mb-16 top-0 fixed z-100 w-[80%]">
      <h1 className="text-3xl text-green-400 font-extrabold">Dashboard</h1>
      <input type="text" placeholder="Search..." className="border p-2 rounded w-1/3"/>
      <div className="flex items-center">
      <MdNotificationAdd className='text-green-400 text-2xl'/>
      </div>
    </div>
  );
};

export default Header;
