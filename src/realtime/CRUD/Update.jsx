import { get, ref, set } from 'firebase/database'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import db from './firebase'

const Update = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const navigate = useNavigate()
    const { id } = useParams()
    async function single() {
        const single_user = await get(ref(db, `rnw-crud/student/${id}`))
        console.log(single_user.val())
        reset(single_user.val())
    }

    useEffect(() => {
        single()
    }, [])

    async function submitData(data) {
        console.log(data);
        await set(ref(db, `rnw-crud/student/${id}`), data)
            .then(() => {
                alert("data has been update..")
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
        showFirebase()
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
                        <button className='btn btn-warning'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Update
