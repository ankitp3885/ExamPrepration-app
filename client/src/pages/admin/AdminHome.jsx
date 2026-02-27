import axios from 'axios';
import React, { useEffect, useState } from 'react'
 
 function AdminHome() {
    const [data,setData] = useState([]);
    const handlefetch = async ()=>{
        const res  = await axios.get('http://localhost:5000/api/admindashboard/')
        setData(res.data);
    }
    useEffect(()=>{
        handlefetch()
    },[])
   return (
     <div>
        {data.totalExaminees}
        {data.totalExams}
        {data.totalSubject}
     </div>
   )
 }
 
 export default AdminHome