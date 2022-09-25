import { React, useRef, useState } from 'react';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';
import "./share.css";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import { storage } from '../../firebase/firebase';

const Share = () => {

    const description = useRef();
    const server = process.env.REACT_APP_SERVER;
    const user = JSON.parse(localStorage.getItem('user'));
    const [file, setFile] = useState(null)
    const [updating, setUpdating] = useState(false)

    //---------------------------handeling share button-----------------------------------
    const handleSubmit = async (e) => {
        console.log("started");
        e.preventDefault();
        setUpdating(true);
        const fileName = uuidv4() + file.name;
        const storageRef = ref(storage, `/posts/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on('state_changed',
            () => { },
            (error) => {
                console.log(error);
            },
            async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref)
                if(url){
                    setUpdating(false);
                    setFile(null);
                    const data = {
                        user_id: user._id,
                        description: description.current.value,
                        image: url
                    }
                    axios.post(`${server}/api/post/create`,data);
                    description.current.value =""
                    window.location.reload();
                }
                
            })
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <Link style={{ margin: 0, padding: 0 }} to={`/profile/${user.username}`}>
                        <img className="shareProfileImg"
                            src={
                                user.profilePicture
                                    ? user.profilePicture
                                    : "/assets/noavatar.jpg"}
                            alt="profile" />
                    </Link>
                    <input placeholder={`What's in your mind ${user.username}?`} className="shareInput" ref={description} />
                </div>
                <hr className="shareHr" />
                {/* ------------------------show share image after this --------------------------------*/}
                {file && (
                    <div className="shareBottomImgCont">
                        <img className='shareBottomImg' src={URL.createObjectURL(file)} alt="" />
                        <CancelIcon fontSize='medium' className='shareBottomCancel' onClick={() => { setFile(null) }} />
                    </div>
                )}

                <form className="shareBottom" onSubmit={handleSubmit}>
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <PermMediaIcon htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or video</span>
                            <input style={{ display: "none" }} type="file" id="file" accept=".png, .jpeg, .jpg" onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <LabelIcon htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Label</span>
                        </div>
                        <div className="shareOption">
                            <LocationOnIcon htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>{updating ? <CircularProgress style={{ color: 'green' }} />
                        : <button disabled={file === null} className="shareButton" type='submit'>Share</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default Share