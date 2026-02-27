import { Link, Outlet } from "react-router";
export default function UserDashboard() {
const role = localStorage.getItem('userRole')
if(role == "user") {
    var email = localStorage.getItem('userEmail')
}
else {
    window.location.href='/'
}
const getGreeting = () => {
    const hour = new Date().getHours();
    if(hour < 12) return 'Good Morning';
    if(hour < 12) return 'Good Afternoon';
    return 'Good Evening'
};
const handlelogout = ()=>{
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userId')
    window.location.href = '/';
}
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
        <h2>User</h2>
        <ul>
            <li ><Link to="myexams" className='text-white text-decoration-none'>My Exams</Link> </li>
            <li ><Link to="myresult" className='text-white text-decoration-none'>My Result</Link> </li>
            <li ><Link to="changepassword" className='text-white text-decoration-none'>Change Password</Link> </li>
            <li ><Link to="message" className='text-white text-decoration-none'>Message</Link> </li>
            <li ><Link to="logout" className='text-white text-decoration-none' onClick={()=>{handlelogout()}}>Logout</Link> </li>
  

        </ul>
        </div>

      {/* Main Content */}
        <div className="main">
        <div className="topbar">
            <button className="collapse-btn">Collapse</button>
            <h1>User Dashboard</h1>
        </div>
        <div className="content">
        <Outlet />
        </div>
        </div>
    </div>
    </div>
    );
}