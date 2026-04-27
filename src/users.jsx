function UsersPage(){
  const users = [
    {name:"Admin",role:"Admin"},
    {name:"User1",role:"User"}
  ];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">User Management</h1>
      <table className="w-full bg-white dark:bg-gray-800">
        <thead>
          <tr><th>Name</th><th>Role</th></tr>
        </thead>
        <tbody>
          {users.map((u,i)=>(
            <tr key={i}><td>{u.name}</td><td>{u.role}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Card({title,value}){
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <p className="text-sm">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}

export default UsersPage;