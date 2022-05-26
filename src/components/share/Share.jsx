import { React, useRef, useState } from 'react';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';
import "./share.css";
import { Link } from "react-router-dom";

import axios from 'axios';

const Share = () => {

    const description = useRef();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const server =process.env.REACT_APP_SERVER;
    const user = JSON.parse(localStorage.getItem('user'));
    const [file, setFile] = useState(null)
    const [updating, setUpdating] = useState(false)

    //---------------------------handeling share button-----------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        //set desc and user id of post
        const newPost = {
            user_id: user._id,
            description: description.current.value
        };


        //accessing file and setting up filename posting req
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            //creating a unique file name
            newPost.image = fileName;
            try {
                await axios.post(`${server}/api/upload`, data);
            } catch (error) {
                console.log(error);
            }
        }
        //creation of post in data basse
        try {
            await axios.post(`${server}/api/post/create`, newPost);
            setUpdating(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <Link style={{margin:0, padding:0}} to={`/profile/${user.username}`}>
                        <img crossOrigin="anonymous" className="shareProfileImg"
                            src={
                                user.profilePicture
                                    ? PF + "person/" + user.profilePicture
                                    : PF + "default/noavatar.jpg"}
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
                    </div>{ updating? <CircularProgress style={{color:'green'}} />
                   : <button disabled={file===null} className="shareButton" type='submit'>Share</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default Share