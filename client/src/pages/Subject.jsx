import axios from 'axios';
import { useEffect, useState } from 'react';
  
export default function Subject(){
    const [form, setForm] = useState({
        name: '',
        description: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
const [id, setId] = useState({
    id:''
});
const [edit ,setEdit] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(edit){
                const res = await axios.put(`http://localhost:5000/api/subject/${id.id}`, form);
            alert('Updated Successfully');
            console.log(res.data);
            }
            else{
                const res = await axios.post('http://localhost:5000/api/subject', form);
            alert("Added Successfully");
            console.log(res.data);
            }
        }catch(er) {
            alert('Subject not Added');
            console.error(er)
        }
    };
    const [data, setData] = useState([]);

    const handlefetch = async()=>{
        const res =await axios.get('http://localhost:5000/api/subject');
        setData(res.data)
    }
    useEffect(()=>{
        handlefetch()
    },[])

    const handleDelete = async(id)=>{
        try{
            const res = await axios.delete(`http://localhost:5000/api/subject/${id}`);
            alert("Subject Deleted Successfully");
            handlefetch()
        }catch(er){
            alert("sorry try again later")
            console.log(er);
        }
    }
    const handleEdit = (item)=> {
        setForm({
            name:item.name,
            desscription:item.description
        })
        setEdit(true)
        setId({
            id:item._id
        });
    }

      return (
        <div>
            <form
                className="w-75 mx-auto my-auto mt-5 border p-2"
                method="post"
                onSubmit={handleSubmit}
            >
                <div className="mt-3">
                    <input
                        type="text"
                        name="name"   
                        value={form.name}   
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Subject Name"
                    />
                </div>
                <div className="mt-3">
                    <textarea
                        type="text"   
                        name="description"   
                        value={form.description}  
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter Description"
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary mt-4 mb-3 ms-3">
                    Submit
                </button>
            </form>

            <div className="w-75 mx-auto mt-5 border p-2">
                <h1>Subjects</h1>
                <table className="w-100 mx-auto mt-2 border mb-4">
                    <thead>
                        <tr>
                            <th className="pt-1 border border-2 ps-3 pb-1">S.No</th>
                            <th className="pt-1 border border-2 ps-3 pb-1">Name</th>
                            <th className="pt-1 border border-2 ps-3 pb-1">Description</th>
                            <th className="pt-1 border border-2 ps-3 pb-1">Date</th>
                            <th className="pt-1 border border-2 ps-3 pb-1">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                      {data.map((item ,i)=>(
                        <tr key={item._id}>
                         <td>{i+1}</td>
                         <td>{item.name}</td>
                          <td>{item.description}</td> 
                           <td>
                            <button className='btn-danger btn' onClick={()=>{handleDelete(item._id)}}>Delete</button>
                            <button className='btn btn-success' onClick={()=>{handleEdit(item)}}>Edit</button>
                           </td>
                        </tr>
                      ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}