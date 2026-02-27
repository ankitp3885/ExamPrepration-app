import { Link, Outlet } from "react-router";
export default function AdminDashboard() {
    const role = localStorage.getItem("role");
  if (role == "admin") {
    var email = localStorage.getItem("adminEmail");
  } else {
    window.location.href = "/Adminlogin";
  }
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  const handlelogout = () => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminRole");
    localStorage.removeItem("adminId");
    window.location.href = "/Adminlogin";
  };
    return (

    <div>
        <style>{`
        .dashboard {
    display: flex;
    height: 100vh;
    font-family: Arial, sans-serif;
}

.sidebar {
    background-color: blue;
    color: white;
    width: 220px;
    padding: 20px 10px;
}

.sidebar h2 {
    margin-bottom: 20px;
}

.sidebar ul {
    list-style: none;
    padding: 0;
}

.sidebar ul li {
    padding: 10px 0;
    cursor: pointer;
}

.sidebar ul li:hover {
    background-color: #004080;
    padding-left: 8px;
}

.main {
    flex: 1;
    background-color: #f5f5f5;
}

.topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(to right, blue, blue);
    color: white;
    padding: 10px 20px;
}

.collapse-btn {
    background-color: white;
    color: black;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}

.content {
    padding: 20px;
}
        `}</style>
    <div className="dashboard">
      {/* Sidebar */}
        <div className="sidebar">
        <h2>Admin</h2>
        <ul>
            <li ><Link to="/admindashboard/session" className='text-white text-decoration-none'>Session</Link> </li>
            <li ><Link to="/admindashboard/subject" className='text-white text-decoration-none'>Subject</Link> </li>
            <li ><Link to="/admindashboard/examination" className='text-white text-decoration-none'>Examination</Link> </li>
            <li ><Link to="/admindashboard/questionbank" className='text-white text-decoration-none'>Question Bank</Link> </li>
            <li ><Link to="/admindashboard/reportgeneration" className='text-white text-decoration-none'>Report Generation</Link> </li>
            <li ><Link to="/admindashboard/examinee" className='text-white text-decoration-none'>Examinee</Link> </li>
            <li ><Link to="/admindashboard/messagereply" className='text-white text-decoration-none'>Message Reply</Link> </li>
            <li ><Link to="/admindashboard/adminchangepassword" className='text-white text-decoration-none' >Change password</Link> </li>
            <li ><Link to="/admindashboard/logout"
                className="text-white text-decoration-none"
                onClick={() => {
                            handlelogout()
                    }}>Logout</Link> </li>
        </ul>
        </div>

      {/* Main Content */}
        <div className="main">
        <div className="topbar">
            <button className="collapse-btn">Collapse</button>
            <h1>Admin Dashboard</h1>
        </div>
        <div className="content">
        <Outlet />
        </div>
        </div>
    </div>
    </div>
    );
}