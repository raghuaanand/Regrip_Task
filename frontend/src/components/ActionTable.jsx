import React from 'react';

const TableComponent = ({ data }) => {
  
  return (
    <div className="overflow-x-auto rounded-2xl my-8 bg-white">
      <div className='flex px-6 py-4 gap-10'>
        <p className='font-semibold'>Pending Actions</p>
        <p className='font-semibold border-b-4 border-green-500 pb-2'>Completed Actions</p>
        <p className='font-semibold'>Financial Summary</p>
      </div>
      <table className="min-w-full bg-white rounded-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 -2 border-gray-300  text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
              Date <span className="inline-block ml-2">&#x25B2;</span>
            </th>
            <th className="px-6 py-3 -2 border-gray-300  text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
              Action Category <span className="inline-block ml-2">&#x25B2;</span>
            </th>
            <th className="px-6 py-3 -2 border-gray-300  text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
              Tyre S.No. <span className="inline-block ml-2">&#x25B2;</span>
            </th>
            <th className="px-6 py-3 -2 border-gray-300  text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
              Brand <span className="inline-block ml-2">&#x25B2;</span>
            </th>
            <th className="px-6 py-3 -2 border-gray-300  text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
              Model <span className="inline-block ml-2">&#x25B2;</span>
            </th>
            <th className="px-6 py-3 -2 border-gray-300  text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
              Size <span className="inline-block ml-2">&#x25B2;</span>
            </th>
            <th className="px-6 py-3 -2 border-gray-300  text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
              Vehicle No. <span className="inline-block ml-2">&#x25B2;</span>
            </th>
            <th className="px-6 py-3 -2 border-gray-300  text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
              Status <span className="inline-block ml-2">&#x25B2;</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap  border-gray-200 text-sm leading-5 text-gray-700">
                {item.date}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap  border-gray-200 text-sm leading-5 text-gray-700">
                {item.category}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap  border-gray-200 text-sm leading-5 text-gray-700">
                {item.tyreNo}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap  border-gray-200 text-sm leading-5 text-gray-700">
                {item.brand}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap  border-gray-200 text-sm leading-5 text-gray-700">
                {item.model}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap  border-gray-200 text-sm leading-5 text-gray-700">
                {item.size}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap  border-gray-200 text-sm leading-5 text-gray-700">
                {item.vehicleNo}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap  border-gray-200 text-sm leading-5 text-gray-700">
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
