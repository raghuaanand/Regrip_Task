import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SummaryCards from '../components/SummaryCards';
import Alerts from '../components/Alerts';
import TyreInventory from '../components/TyreInventory';
import ActionsTable from '../components/ActionTable';
import Charts from '../components/Chart';
import axiosInstance from '../axiosInstance';
const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axiosInstance.get('/userdata',)
      .then(response => {
        setData(response.data);
      })
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 px-10 py-6 bg-gray-100 ml-80">
        <Header />
        <div className='flex gap-7 mt-24'>
          <SummaryCards data={data.summary} />
          <Alerts data={data.alerts} />
          <TyreInventory data={data.inventory} />
        </div>
        <ActionsTable data={data.actions} />
        <Charts data={data.chartData}/>
      </div>
    </div>
  );
};

export default Dashboard;
