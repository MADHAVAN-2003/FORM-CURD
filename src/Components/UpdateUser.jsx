import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateUser({ user }) {
    const [userData, setUserData] = useState([]);
    const { id } = useParams();
    const baseURL = "http://localhost:8000/users";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await user();
                console.log(userData,"===>")
                setUserData(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };    
        fetchData()  
    }, [id, user]);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: ""
        },
        onSubmit: (values) => {
            axios.put(`${baseURL}/${id}`, values)
                .then(response => {
                    alert("User updated successfully:", response.data);
                })
                .catch(error => {
                    alert("Error updating user:", error);
                });
        }
    });

    useEffect(() => {
        const filteredUserData = userData.find(user => user.id === id);    
        if (filteredUserData) {
            formik.setValues({
                name: filteredUserData.name,
                email: filteredUserData.email,
                phone: filteredUserData.phone
            });
        }
    }, [id, userData]);

    return (
        <div>
            <h1>Update User</h1>
            <form onSubmit={formik.handleSubmit}>
                <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} /><br />
                <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} /><br />
                <input type="number" name="phone" value={formik.values.phone} onChange={formik.handleChange} /><br />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateUser;
