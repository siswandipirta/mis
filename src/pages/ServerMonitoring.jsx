import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [servers, setServers] = useState([]);
  const [selected, setSelected] = useState("");
  const [monitor, setMonitor] = useState({});
  const [listStatus, setListStatus] = useState([]);
  const loadServers = () => {
    axios.get("http://localhost/MIS/MIS/Backend/servers.php")
      .then(res => {
        setServers(res.data);
        if (res.data.length > 0) {
          setSelected(res.data[0].ip);
        }
      });
  };

  const loadMonitor = (ip) => {
    axios.get(`http://localhost/MIS/MIS/Backend/monitor.php?ip=${ip}`)
      .then(res => setMonitor(res.data));
  };

  const loadAllStatus = async () => {
    const res = await axios.get("http://localhost/MIS/MIS/Backend/servers.php");

    const results = await Promise.all(
      res.data.map(async (s) => {
        const r = await axios.get(`http://localhost/MIS/MIS/Backend/monitor.php?ip=${s.ip}`);
        return { ...s, ...r.data };
      })
    );

    setListStatus(results);
  };

  useEffect(() => {
    loadServers();
  }, []);

  useEffect(() => {
    if (selected) {
      loadMonitor(selected);
    }
  }, [selected]);

  // auto refresh
  useEffect(() => {
    const interval = setInterval(() => {
      if (selected) loadMonitor(selected);
      loadAllStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, [selected]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">🌐 Multi Server Monitoring</h1>

      {/* DROPDOWN */}
      <div className="mb-6">
        <select
          className="p-2 border rounded"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {servers.map(s => (
            <option key={s.id} value={s.ip}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* DETAIL SERVER */}
      <div className="flex gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl shadow w-60">
          <h3>Status</h3>
          <p className={`text-xl font-bold ${
            monitor.status === "UP" ? "text-green-500" : "text-red-500"
          }`}>
            {monitor.status}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow w-60">
          <h3>CPU</h3>
          <p>{monitor.cpu}%</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow w-60">
          <h3>RAM</h3>
          <p>{monitor.ram}%</p>
        </div>

      </div>

      {/* LIST SEMUA SERVER */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="mb-4 font-semibold">Server List</h3>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th>Nama</th>
              <th>IP</th>
              <th>Status</th>
              <th>CPU</th>
              <th>RAM</th>
            </tr>
          </thead>

          <tbody>
            {listStatus.map((s,i)=>(
              <tr key={i} className="border-b">
                <td>{s.name}</td>
                <td>{s.ip}</td>
                <td className={
                  s.status === "UP" ? "text-green-500" : "text-red-500"
                }>
                  {s.status}
                </td>
                <td>{s.cpu}%</td>
                <td>{s.ram}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}