
import { useState, useEffect } from "react";

const AdminLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");

  // check if admin user already exists in localStorage
  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminUser");
    if (!storedAdmin) {
      setIsRegisterMode(true);
    }
  }, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegisterMode) {
      if (!otpSent) {
        // generate and "send" OTP
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        setOtp(code);
        setOtpSent(true);
        alert(`Your OTP is ${code}`); // simulate email
        return;
      } else {
        // verify OTP
        if (enteredOtp === otp) {
          localStorage.setItem(
            "adminUser",
            JSON.stringify({ email: form.email, password: form.password, role: "admin" })
          );
          setIsRegisterMode(false);
          setOtpSent(false);
          setEnteredOtp("");
          alert("Admin account created. Please log in.");
          setForm({ email: "", password: "" });
        } else {
          alert("Invalid OTP. Please try again.");
        }
        return;
      }
    }

    // login flow: compare with stored admin
    const stored = JSON.parse(localStorage.getItem("adminUser") || "null");
    if (stored && stored.email === form.email && stored.password === form.password) {
      alert("Login Successfully");
      localStorage.setItem("adminEmail", stored.email);
      localStorage.setItem("id", "1");
      localStorage.setItem("role", stored.role);
      window.location.href = "/adminDashboard";
    } else {
      alert("Invalid credentials or no admin account available.");
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
        <h2>{isRegisterMode ? "Create Admin" : "Admin Login"}</h2>
        <form onSubmit={handleSubmit} method="POST">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={otpSent}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            disabled={otpSent}
          />
          {isRegisterMode && otpSent && (
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              required
            />
          )}
          <button type="submit">{isRegisterMode ? (otpSent ? "VERIFY OTP" : "REGISTER") : "LOGIN"}</button>
        </form>
        {!isRegisterMode && (
          <p style={{fontSize:'12px',marginTop:'10px'}}>
            Don&apos;t have an admin account? <a href="#" onClick={() => setIsRegisterMode(true)}>Create one</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
