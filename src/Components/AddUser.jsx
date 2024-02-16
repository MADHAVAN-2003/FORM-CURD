import axios from "axios";
import { useFormik } from "formik";

const baseURL =  "http://localhost:8000/users"

function AddUser(){
    const formik = useFormik({
        initialValues: {
            name:"",
            email:"",
        },
        onSubmit: (val) => {
            console.log(val,"form values")
            axios.post(baseURL , val)
        },
    }) 
    return(
        <div>
            <h1>Add-userForm</h1>
            <form onSubmit={formik.handleSubmit}>
                <input type="text" name="name" placeholder="Enter Name.." onChange={formik.handleChange} /> <br />
                <input type="email" name="email" placeholder="Enter Email.." onChange={formik.handleChange} /> <br />
                <input type="number" name="phone" placeholder="Enter PhoneNumber.." onChange={formik.handleChange} /> <br />
                <button type="submit" onClick={()=> alert("User added sucessfully")}>click</button>
            </form>
        </div>
    );
}
export default AddUser