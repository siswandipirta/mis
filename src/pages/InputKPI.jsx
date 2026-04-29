import { useState } from "react";
import axios from "axios";

export default function InputKPI() {
  const [form, setForm] = useState({
    date: "",
    uptime: ""
  });

  const save = async () => {
    await axios.post("http://localhost/MIS/MIS/Backend/kpi.php", form);
    alert("Data tersimpan");
  };

  return (
    <div className="p-6 w-full">

      <h1 className="text-2xl font-bold mb-4">Input KPI</h1>

      <div className="bg-white p-4 rounded-xl shadow w-96">

        <input
          type="date"
          className="w-full mb-3 p-2 border rounded"
          onChange={e=>setForm({...form, date:e.target.value})}
        />

        <input
          type="number"
          placeholder="Uptime"
          className="w-full mb-3 p-2 border rounded"
          onChange={e=>setForm({...form, uptime:e.target.value})}
        />

        <button
          onClick={save}
          className="w-full bg-blue-600 text-white py-2 rounded-xl"
        >
          Simpan
        </button>

      </div>

    </div>
  );
}