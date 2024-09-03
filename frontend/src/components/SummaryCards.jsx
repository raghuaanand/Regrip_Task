import React from 'react';

const SummaryCards = ({ data }) => {
  return (
    <div className='bg-white w-[40%] rounded-2xl'>
      <h2 className='text-2xl font-bold p-4'>Summary</h2>
      <div className="grid grid-cols-3 gap-4 p-4">
        {data.map((item, index) => (
          <div key={index} className="bg-[#ece9e9c2] py-2 pl-2 pr-6 shadow rounded">
            <p className="text-xl font-bold text-green-500">{item.value}</p>
            <h3 className="text-lg">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;
