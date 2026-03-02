import { useState } from "react";
import { Link } from "react-router";
export default function Login() {
const [form ,setform] = useState({
  email:'',
  password:''
});
const handleChange = (e)=>{
  setform({...form,[e.target.name]:e.target.value})
}
const handleSubmit = (e)=>{
  e.preventDefault();
  // authenticate against stored examinees
  const list = JSON.parse(localStorage.getItem('examinees') || '[]');
  const user = list.find(u => u.email === form.email && u.password === form.password && u.role === 'user');
  if (user) {
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("userRole", 'user');
    window.location.href='/userDashboard';
  } else {
    alert("Invalid credentials");
  }
}
  return (
    <div>
    <style>{`
    body {
  font-family: Arial, sans-serif;
 background-color:rgb(79, 118, 216);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.form-container {
  background: white;
  padding: 30px;
  border-radius: 30px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  width: 320px;
  text-align: center;
}

.form-container h2 {
  margin-bottom: 10px;
  font-weight: 500;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"],
select {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid black;
  border-radius: 15px;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #3b6ef5;
  border: none;
  color: white;
  font-size: 14px;
  border-radius: 15px;
  cursor: pointer;
}

button:hover {
  background-color: #2f59c6;
}

.links {
  margin-top: 15px;
  font-size: 12px;
}

.links a {
  color: #3b6ef5;
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}

    `}</style>
    <div className="form-container">
      <h2>Login</h2>
     <form onSubmit={handleSubmit}>
        <input type="email" placeholder="email" name="email" onChange={handleChange}  required />
        <input type="password" placeholder="password" name="password" onChange={handleChange} required />
        <button type="submit">LOGIN</button>
      </form>
      <div className="links">
        { <p>
          <a href="#">Forgot Username / Password?</a>
        </p> }
        <p>
          Create an account? <Link to="/registration">Sign up</Link>
        </p>
        <p style={{marginTop:'6px'}}>
          Are you an admin? <Link to="/adminlogin">Admin login</Link>
        </p>
      </div>
    </div>
    </div>

  );
}