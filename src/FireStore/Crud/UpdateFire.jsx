import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dbfire from './FireBaseFire'
import { useForm } from 'react-hook-form'

const UpdateFire = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const redirect = useNavigate()
    const { id } = useParams()

    async function SingleUser() {
        const singleData = await getDoc(doc(dbfire, "users", id))
        console.log(singleData.data())
        reset(singleData.data())
    }

    useEffect(() => {
        SingleUser()
    }, [])


    async function submitData(data) {
        await updateDoc(doc(dbfire, "users", id), data)
        alert("data updated!")
        redirect("/")

    }
    return (
        <>
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
        </>
    )
}

export default UpdateFire
