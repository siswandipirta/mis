import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState([]);

  const loadData = () => {
    axios.get("http://localhost/MIS/MIS/Backend/kpi.php")
      .then(res => setData(res.data));
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const last = data[data.length - 1] || {};

  const safe = (val) => val ?? 0;

  const getColor = (val) => {
    if (val >= 95) return "text-green-500";
    if (val >= 90) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="p-6 w-full bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">📊 Monitoring KPI</h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-sm text-gray-500">Uptime</h3>
          <p className={`text-2xl font-bold ${getColor(safe(last.uptime))}`}>
            {safe(last.uptime)}%
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-sm text-gray-500">Network</h3>
          <p className="text-2xl font-bold text-blue-500">
            {safe(last.network)} %
          </p>
        </div>

         <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-sm text-gray-500">ISP</h3>
          <p className="text-2xl font-bold text-blue-500">
            {safe(last.isp)} %
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-sm text-gray-500">Ticket</h3>
          <p className="text-2xl font-bold text-purple-500">
            {safe(last.ticket)} %
          </p>
        </div>

         <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-sm text-gray-500">Backup</h3>
          <p className="text-2xl font-bold text-purple-500">
            {safe(last.backup)} %
          </p>
        </div>



        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-sm text-gray-500">Incident</h3>
          <p className="text-2xl font-bold text-green-500">
            {safe(last.incident)}
          </p>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-6">

        {/* UPTIME */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="mb-2 font-semibold">Uptime</h3>

          <LineChart width={400} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="uptime" stroke="#22c55e" />
          </LineChart>
        </div>

        {/* NETWORK */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="mb-2 font-semibold">Network</h3>

          <LineChart width={400} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="network" stroke="#3b82f6" />
          </LineChart>
        </div>

        {/* ISP */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="mb-2 font-semibold">ISP</h3>

          <LineChart width={400} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="isp" stroke="#3b82f6" />
          </LineChart>
        </div>

            {/* TICKET */}
        <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="mb-2 font-semibold">Ticket</h3>

            <LineChart width={400} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="ticket" stroke="#8b5cf6" />
            </LineChart>
        </div>

            {/* BACKUP */}
        <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="mb-2 font-semibold">Backup</h3>

            <LineChart width={400} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="backup" stroke="#8b5cf6" />
            </LineChart>
        </div>

        {/* INCIDENT */}
        <div className="bg-white p-4 rounded-xl shadow col-span-2">
          <h3 className="mb-2 font-semibold">Incident</h3>

          <LineChart width={900} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="incident" stroke="#ef4444" />
          </LineChart>
        </div>

      </div>

    </div>
  );
}