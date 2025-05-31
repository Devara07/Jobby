import { useState,useEffect } from "react"
import "./index.css"
import Cookies from "js-cookie"


const Profile=()=>{
    const [profiledata,setProfileData]=useState({})
    useEffect(()=>{
        const fetchProfileData= async ()=>{
            const cookie=Cookies.get('jwt_token')
const options={
        method:"GET",
        headers:{
    "Authorization":`Bearer ${cookie}`,
        }
    }
    const api='https://apis.ccbp.in/profile'
    const response=await fetch('https://apis.ccbp.in/profile',options)
    if(response.ok)
    {
        const data=await response.json()
     
        const formattedData={
            name:data.profile_details.name,
            profileImageUrl:data.profile_details.profile_image_url,
            shortBio:data.profile_details.short_bio
        }
        setProfileData(formattedData)
    }
    
    

    }
    fetchProfileData()
        },[])
return(
    <div>
        <img src={profiledata.profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{profiledata.name}</h1>
        <p>{profiledata.shortBio}</p>
    </div>
)
    
}

export default Profile