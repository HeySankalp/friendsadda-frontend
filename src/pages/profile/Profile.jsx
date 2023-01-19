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
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';






const Profile = () => {
  const loggedinUser = JSON.parse(localStorage.getItem('user'));
  const server = process.env.REACT_APP_SERVER;
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [updating, setUpdating] = useState(false);
  const userName = useParams().username;
  const inputRef = useRef();


  const handlePlus = () => {
    inputRef.current.click();
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const fileName = uuidv4() + file.name;
    const storageRef = ref(storage, `/profilepicture/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on('state_changed',
      () => { },
      (error) => {
        console.log(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        if (url) {
          //now setting user image in database
          setUpdating(false);
          setFile(null);
          const data = {
            _id: user._id,
            profilePicture: url
          }
          axios.put(`${server}/api/user/${loggedinUser._id}`, data);
          try {
            const profilePicRef = firebase.storage().refFromURL(user.profilePicture)
            profilePicRef.delete()
          } catch (error) {
          }
          if (user.profilePicture) {
            localStorage.setItem('user', localStorage.getItem('user').replace(user.profilePicture, url))
          } else {
            let temp = JSON.parse(localStorage.getItem('user'))
            temp.profilePicture=url;
            localStorage.setItem('user',JSON.stringify(temp));
          }

          window.location.reload();
        }
      })
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
              <img src="/assets/cover.png" alt="CoverPhoto" className="profileCoverImg" />
              <div className='profileUserFolder'>
                <img src={user.profilePicture ? user.profilePicture : "/assets/noavatar.jpg"} alt="CoverPhoto" className="profileUserImg" />
                {
                  loggedinUser._id === user._id && <form>
                    {file ? <CancelIcon className='profileUserEdit' style={{ color: 'red' }} onClick={() => { setFile(null) }} /> : <AddCircleIcon className='profileUserEdit' onClick={handlePlus} />}

                    <input style={{ display: 'none' }} ref={inputRef} type="file" id="filedp" accept=".jpeg, .jpg" onChange={(e) => setFile(e.target.files[0])} />
                  </form>
                }
                {updating ? <CircularProgress className='profileUserLoader' />
                  : file && <button id='updateBtn' onClick={handleUpdate} className='profileUserSubmit'>Update</button>
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