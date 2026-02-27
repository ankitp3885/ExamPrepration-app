import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";


export default function Registration() {
  const [form, setForm] = useState({
    name:'',
    email:'',
    password:'',
    collage:'',
    course:'',
    branch:'',
    session:'',
    phone:'',
 

  })
const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value})
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res =await axios.post('http://localhost:5000/api/examinee',form);
      alert("Registered Successfully")
      window.location.href='/'
    }catch(er){
      console.log(er)
      alert("Sorry Try Again Later")
    }
  }

  const[data ,setData] = useState([])
  const handlefetch =async()=>{
    try{
      const res = await axios.get('http://localhost:5000/api/session');
      setData(res.data)
    }catch(er){
    console.log(er)
  }
}
useEffect(()=>{
  handlefetch();
},[])

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
  border-radius: 10px;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #3b6ef5;
  border: none;
  color: white;
  font-size: 14px;
  border-radius: 10px;
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
      <h2>Registration</h2>
      <form onSubmit={handleSubmit} method="post">
        <input type="text" placeholder="name"  name="name" onChange={handleChange} required  />
        <input type="email" placeholder="email" name="email" onChange={handleChange} required />
        <input type="password" placeholder="password" name="password" onChange={handleChange} required />
        <input type="text" placeholder="collage" name="collage" onChange={handleChange} required />
        <input type="text" placeholder="course" name="course" onChange={handleChange} required />
        <input type="text" placeholder="branch" name="branch" onChange={handleChange} required />
        <input type="text" placeholder="phone"  name="phone" onChange={handleChange} required />
       
      <select name="session" id="" onChange={handleChange} className="form-select">
            <option value="">Select Session</option>
            
            {data.map((item)=>(
              <option key={item._id} value={item._id}>{item.name}</option>
            ))}
          </select>
        <button type="submit">REGISTRATION</button>
      </form>
      <div className="links">
        <p>
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </div>
    </div>
    </div>

  );
}
