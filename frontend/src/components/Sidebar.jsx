import React from 'react';
import { MdDashboard } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { MdSupervisorAccount } from "react-icons/md";
import { BsTools } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import { LuGift } from "react-icons/lu";
import { BiSolidReport } from "react-icons/bi";
import { MdAnalytics } from "react-icons/md";
import { RiHome6Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <div className="bg-white text-black w-72 h-screen p-5 fixed">
      <div className="flex items-center mb-10">
        <FaUser className='text-2xl text-green-400 rounded-full w-10 h-10'/>
        <div className="ml-3">
          <p>User Name</p>
          <a href="#" className="text-sm text-gray-400">View profile</a>
        </div>
      </div>
      <nav>
        <ul>
          {data.map((data, index) => (
            <div>
              <li className='mb-4'><a className='flex items-center gap-2 hover:border-[1px] hover:rounded-md hover:px-3 hover:py-1 hover:bg-green-50'>{data.icon} {data.name}</a></li>
            </div>
          ))}
        </ul>
      </nav>
    </div>
  );
};

const data = [
  {
    name: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    name: "Inventory",
    icon: <MdInventory />,
  },
  {
    name: "Retreaders",
    icon: <MdSupervisorAccount />,
  },
  {
    name: "Fitters",
    icon: <BsTools />,
  },
  {
    name: "Vehicle Allocation",
    icon: <FaTruck />,
  },
  {
    name: "Collection Request",
    icon: <RiHome6Fill />,
  },
  {
    name: "Dispatch Request",
    icon: <LuGift />,
  },
  {
    name: "Reports",
    icon: <BiSolidReport />,
  },
  {
    name: "Analytics",
    icon: <MdAnalytics />,
  },

];



export default Sidebar;
