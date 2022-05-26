import { React, useState, useEffect, useRef } from 'react';
import axios from "axios";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import { useParams } from 'react-router';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';






const Profile = () => {
  const loggedinUser = JSON.parse(localStorage.getItem('user'));
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const server =process.env.REACT_APP_SERVER;
  const [user, setUser] = useState({});
  const [dpFile, setdpFile] = useState(null);
  const [updating, setUpdating] = useState(false);
  const userName = useParams().username;
  const inputRef = useRef();


  const handlePlus = () => {
    inputRef.current.click();
  }

  const handleUpdate = async(e) => {
    e.preventDefault();
    setUpdating(true);

    // set name of user profilepicture 
    const updateDatabase = {
      _id : loggedinUser._id,
      profilePicture : ""
    };

    // accessing file and setting up filename and posting req
    if (dpFile) {
      const data = new FormData();
      const fileName = Date.now() + dpFile.name
      data.append("name", fileName);
      data.append("file", dpFile);
      updateDatabase.profilePicture = fileName
      try {
        await axios.post(`${server}/api/uploadprofile/${user.profilePicture}`,data);
        loggedinUser.profilePicture = fileName
        localStorage.setItem('user',JSON.stringify(loggedinUser));
      } catch (error) {
        console.log(error);
      }
      // updating profilepicture in databasde
      try {
        await axios.put(`${server}/api/user/${loggedinUser._id}`,updateDatabase);
        window.location.reload();
        setUpdating(false);
      } catch (error) {
        console.log(error);
      }
    }
  document.querySelectorAll('#updateBtn').style.display = "none";
  }



  useEffect(() => {

    const fetchUser = async () => {
      const res = await axios.get(`${server}/api/user?username=${userName}`);
      setUser(res.data);
    };
    fetchUser();
  }, [user._id, userName])


  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img crossOrigin="anonymous" src={user.coverPicture ? PF + "person/" + user.coverPicture : PF + "person/cover.png"} alt="CoverPhoto" className="profileCoverImg" />
              <div className='profileUserFolder'>
              <img crossOrigin="anonymous" src={user.profilePicture ? PF + "person/" + user.profilePicture : PF + "default/noavatar.jpg"} alt="CoverPhoto" className="profileUserImg" />
              {
                loggedinUser._id === user._id && <form>
                  {dpFile? <CancelIcon className='profileUserEdit' style={{color:'red'}} onClick={() => { setdpFile(null) }}/>:<AddCircleIcon className='profileUserEdit' onClick={handlePlus}  />}
                  
                  <input style={{ display: 'none' }} ref={inputRef} type="file" id="filedp" accept=".jpeg, .jpg" onChange={(e) => setdpFile(e.target.files[0])} />
                  </form>
              }
              { updating? <CircularProgress className='profileUserLoader'/>
                : dpFile ? <button id='updateBtn' onClick={handleUpdate} className='profileUserSubmit'>Update</button> : ""
              }
              </div>


            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">
                {user.description}
              </span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={userName} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile