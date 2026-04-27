import { useEffect, useState } from "react";
import axios from "axios";

function KPIPage({ token }) {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ date: "", uptime: 0 });

  useEffect(() => {
    const fetch = () => {
      axios
        .get("http://localhost/mis/mis/backend/kpi.php", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((r) => setData(r.data));
    };

    fetch();
  }, [token]);

  const save = async () => {
    await axios.post("http://localhost/mis/mis/backend/kpi.php", form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // refresh data after save
    axios
      .get("http://localhost/mis/mis/backend/kpi.php", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r) => setData(r.data));
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">KPI Input</h1>
      <input
        className="border p-2"
        placeholder="Date"
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <input
        className="border p-2"
        placeholder="Uptime"
        onChange={(e) => setForm({ ...form, uptime: +e.target.value })}
      />
      <button onClick={save} className="ml-2 px-4 py-2 bg-blue-600 text-white">
        Save
      </button>

      <div className="mt-4">
        {data.map((d, i) => (
          <div key={i}>
            {d.date} - {d.uptime}%
          </div>
        ))}
      </div>
    </div>
  );
}

export default KPIPage;