import React from 'react';
import { TbPointFilled } from "react-icons/tb";

const Alerts = ({ data }) => {
  return (
    <div className="bg-white w-[23%] shadow rounded-2xl">
      <h3 className="text-2xl font-bold p-4 pl-6">Alerts</h3>
      <div className="grid grid-cols-1 gap-4 p-4">
        {data.map((alert, index) => (
          <div key={index} className="flex justify-between">
            <div className='flex items-center gap-2'>
              <TbPointFilled className='text-red-600'/>
              <span>{alert.name}</span>
            </div>
            <span className="text-red-500 font-bold bg-red-50 px-2 rounded-lg">{alert.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
