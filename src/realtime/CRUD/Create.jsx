import React, { useEffect, useState } from 'react';
import { get, push, ref, remove, set } from 'firebase/database';
import db from './firebase';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Create = () => {
    const { register, handleSubmit, formState: { errors },reset } = useForm()
    const [user, setUser] = useState([])

    function submitData(data) {
        console.log(data);
        set(push(ref(db, 'rnw-crud/student')), data)
        showFirebase()
        reset()
        toast('🦄 Data Has been inserted.!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }

    async function showFirebase() {
        const res = await get(ref(db, 'rnw-crud/student'))
        console.log("res..........");
        console.log(res);

        const obj = res.val()
        console.log(obj);

        const arr = []
        for (var key in obj) {
            console.log(key);
            console.log(obj[key]);
            const user = obj[key]
            const newuser = {
                id: key,
                ...user
            }
            console.log(newuser);
            arr.push(newuser)
        }
        console.log("newarr....................");
        console.log(arr);
        setUser(arr)
    }

    useEffect(() => {
        showFirebase()
    }, [])

    async function trash(id) {
        if (confirm("do you want to delete this item..?")) {
            const delete_user = ref(db, `rnw-crud/student/${id}`)
            await remove(delete_user)
            showFirebase()
        }
    }

    return (
        <div>
            <div className='col-6 mx-auto my-5 p-5 shadow'>
                <form action='' method='post' onSubmit={handleSubmit(submitData)}>
                    <div className="my-3">
                        <label>UserName:</label>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Enter The Name'
                            {...register('uname', {
                                required: {
                                    value: true,
                                    message: 'Enter user name'
                                },
                                minLength: {
                                    value: 3,
                                    message: "Must be at least 3 characters"
                                },
                                maxLength: {
                                    value: 10,
                                    message: "Must be 10 characters or less"
                                },
                                pattern: {
                                    value: /^[A-Za-z]+$/,
                                    message: "Only letters are allowed"
                                }
                            })}
                        />
                        <p className='text-danger'>{errors?.uname?.message}</p>
                    </div>

                    <div className="my-3">
                        <label>Email:</label>
                        <input
                            type='email'
                            className='form-control'
                            placeholder='Enter the Email'
                            {...register('uemail', {
                                required: {
                                    value: true,
                                    message: 'Enter Email'
                                },
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email"
                                }
                            })}
                        />
                        <p className='text-danger'>{errors?.uemail?.message}</p>
                    </div>

                    <div className="my-3">
                        <label>Mobile:</label>
                        <input
                            type='number'
                            className='form-control'
                            placeholder='Enter the Mobile'
                            {...register('umobile', {
                                required: {
                                    value: true,
                                    message: "Enter mobile number"
                                },
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Enter a valid 10-digit mobile number"
                                }
                            })}
                        />
                        <p className='text-danger'>{errors?.umobile?.message}</p>
                    </div>

                    <div className="my-3">
                        <label>Address:</label>
                        <textarea
                            className='form-control'
                            placeholder='Enter the Address'
                            {...register('uaddress', {
                                required: {
                                    value: true,
                                    message: "Enter address"
                                }
                            })}
                        />
                        <p className='text-danger'>{errors?.uaddress?.message}</p>
                    </div>
                    <div className="my-3">
                        <button className='btn btn-danger'>Submit</button>
                    </div>
                </form>
            </div>

            <div className='table-responsive container'>
                <table className='table table-hover table-stripped table-success'>
                    <thead className='table-dark text-uppercase'>
                        <tr>
                            <th>SRNO</th>
                            <th>UserName</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {user.map((users, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{users?.uname}</td>
                                    <td>{users?.uemail}</td>
                                    <td>{users?.umobile}</td>
                                    <td>{users.uaddress}</td>
                                    <td>
                                        <NavLink to={`/single/${users.id}`}>
                                            <button className='btn btn-primary mx-2'><i className="fa-solid fa-eye"></i></button>
                                        </NavLink>
                                        <NavLink to={`/update/${users.id}`}>
                                            <button className='btn btn-danger mx-1'><i className="fa-solid fa-pen" ></i></button>
                                        </NavLink>
                                        <button className='btn btn-warning mx-1' onClick={() => trash(users.id)}><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Create;
