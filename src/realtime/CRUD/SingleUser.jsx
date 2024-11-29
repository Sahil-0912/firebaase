import { get, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import db from './firebase'

const SingleUser = () => {
    const { id } = useParams()
    const [user, setUser] = useState({})

    async function single() {
        const single_user = await get(ref(db, `rnw-crud/student/${id}`))
        console.log(single_user.val())
        setUser(single_user.val())
    }

    useEffect(() => {
        single()
    }, [])
    return (
        <div className='col-6 mx-auto my-5 p-5 shadow'>
            <ul>
                <li>{user.uname}</li>
                <li>{user.uemail}</li>
                <li>{user.umobile}</li>
                <li>{user.uaddress}</li>
            </ul>
        </div>
    )
}

export default SingleUser
