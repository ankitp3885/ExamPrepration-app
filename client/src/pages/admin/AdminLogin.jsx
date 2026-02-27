
import { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", form);

      if (res.data.message === "Login Successfully") {
        alert("Login Successfully");
        localStorage.setItem("adminEmail", res.data.admin.email);
        localStorage.setItem("id", res.data.admin.id);
        localStorage.setItem("role", res.data.admin.role);

        window.location.href = "/adminDashboard";
      } else {
        alert(res.data.message || "Login Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error logging in. Please try again.");
    }
  };

  return (
    <div>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          background-color: rgb(79, 118, 216);
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
          margin-bottom: 20px;
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
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit} method="POST">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">LOGIN</button>
        </form>
        <div className="links">
          {/* <p>
            <a href="#">Forgot Username / Password?</a>
          </p> */}
          {/* <p>
            Create an account? <Link to="/registration">Sign up</Link>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
