import React, {useEffect, useState} from 'react'
import axios from 'axios'

const  Profile = () => {
    const [data,setData] = useState({})
    const fetchUser = async () =>{
       const responseData = await axios.get(process.env.REACT_APP_BACKEND_URL+'/users/profile')
       console.log(responseData)
    }
    useEffect(() => {fetchUser()},[])

    
    return (
        <div>
            <h2>hi dsa</h2>
        </div>
    )
}
export default Profile