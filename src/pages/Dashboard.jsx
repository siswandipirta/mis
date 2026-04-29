import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState([]);

  //Console LOG
  console.log("Dashboard jalan");

  // 🔄 LOAD DATA
  const loadData = () => {
    axios
      .get("http://localhost/MIS/MIS/Backend/kpi.php")
      .then((res) => {
        console.log("DATA KPI:", res.data);
        setData(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("ERROR KPI:", err);
      });
  };

  // 🔁 AUTO REFRESH
  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🧠 DATA TERAKHIR
  const last = data[data.length - 1] || {};

  // 🛡️ SAFE VALUE
  const safe = (val) => Number(val ?? 0);

  // 🎨 WARNA KPI
  const getColor = (val) => {
    if (val >= 95) return "text-green-500";
    if (val >= 90) return "text-yellow-500";
    return "text-red-500";
  };

  // ⏳ LOADING STATE (ANTI BLANK)
  if (!data || data.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-xl">Loading data KPI...</h1>
      </div>
    );
  }

  return (
    <div className="p-6 w-full bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">📊 Monitoring KPI</h1>

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        <Card title="Uptime" value={`${safe(last.uptime)}%`} color={getColor(safe(last.uptime))} />
        <Card title="Network" value={`${safe(last.network)}%`} color="text-blue-500" />
        <Card title="ISP" value={`${safe(last.isp)}%`} color="text-blue-500" />
        <Card title="Ticket" value={`${safe(last.ticket)}%`} color="text-purple-500" />
        <Card title="Backup" value={`${safe(last.backup)}%`} color="text-purple-500" />
        <Card title="Incident" value={safe(last.incident)} color="text-red-500" />

      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Chart title="Uptime" dataKey="uptime" data={data} color="#22c55e" />
        <Chart title="Network" dataKey="network" data={data} color="#3b82f6" />
        <Chart title="ISP" dataKey="isp" data={data} color="#3b82f6" />
        <Chart title="Ticket" dataKey="ticket" data={data} color="#8b5cf6" />
        <Chart title="Backup" dataKey="backup" data={data} color="#8b5cf6" />

        {/* INCIDENT FULL WIDTH */}
        <div className="bg-white p-4 rounded-xl shadow col-span-1 md:col-span-2">
          <h3 className="mb-2 font-semibold">Incident</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="incident" stroke="#ef4444" />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

//
// 🔹 COMPONENT: KPI CARD
//
function Card({ title, value, color }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

//
// 🔹 COMPONENT: CHART
//
function Chart({ title, dataKey, data, color }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="mb-2 font-semibold">{title}</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke={color} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}