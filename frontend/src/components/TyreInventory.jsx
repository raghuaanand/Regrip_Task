import React from "react";

const TyreInventory = ({ data }) => {
  const totalInventory = data.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="bg-white shadow rounded-2xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold p-4 pl-6">Tyre Inventory</h2>
        <span className="text-green-500 text-2xl font-semibold pr-10">
          {totalInventory}
        </span>
      </div>
      <table
        className="w-full text-left border-separate"
        style={{ borderSpacing: "45px 10px" }}
      >
        <thead>
          <tr>
            <th className="text-gray-700 text-center">NSD</th>
            <th className="text-gray-700 text-center">New</th>
            <th className="text-gray-700 text-center">Retread</th>
            <th className="text-gray-700 text-center">Scrap</th>
            <th className="text-gray-700 text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="text-gray-600 text-center">{item.nsd}</td>
              <td className="text-gray-600 text-center">{item.new}</td>
              <td className="text-gray-600 text-center">{item.retread}</td>
              <td className="text-gray-600 text-center">{item.scrap}</td>
              <td className="text-gray-600 text-center">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TyreInventory;
