import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dbfire from './FireBaseFire'

const SingleUserFire = () => {
    const { id } = useParams()
    const [user, setUser] = useState({})

    async function singleUserFire() {
        const single_data = await getDoc(doc(dbfire, "users", id))
       setUser(single_data.data());
    }
    useEffect(() => {
        singleUserFire()
    }, [])
    return (
        <div>
            <div className="col-6 mx-auto my-5 p-5 shadow">
                <ul>
                    <li>{user.uname}</li>
                    <li>{user.uemail}</li>
                    <li>{user.umobile}</li>
                    <li>{user.uaddress}</li>
                </ul>
            </div>
        </div>
    )
}

export default SingleUserFire
