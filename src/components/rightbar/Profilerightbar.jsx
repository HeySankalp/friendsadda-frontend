import "./profilerightbar.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';




const Profilerightbar = ({ user }) => {

    const currentuser = JSON.parse(localStorage.getItem('user'));
    const server =process.env.REACT_APP_SERVER;
    const [friends, setFriends] = useState([]);
    const [followed, setFollowed] = useState(false);
    const [processing, setProcessing] = useState(false);
    //------------------------------before the component is rendering---------------------------------
    useEffect(() => {
        setFollowed(currentuser.followings.includes(user._id));

        const getFriends = async () => {
                const friendList = await axios.get(`${server}/api/user/friends/${user._id}`);
                setFriends(friendList.data)
                console.clear();
        };

        getFriends();
    }, [user._id])

    //---------------------------------------Handeling follow button------------------------------------
    const handleFollow = async () => {
        try {
            if (followed) {
                // ----serverside----
                setProcessing(true);
                await axios.put(`${server}/api/user/${user._id}/unfollow`, { _id: currentuser._id });
                setProcessing(false)
                // ---clientside-----
                console.log(currentuser.followings);
                currentuser.followings.pop(user._id);
                localStorage.setItem('user',JSON.stringify(currentuser));
                console.log(currentuser.followings);
                setFollowed(!followed);

            } else {
                // ----serverside----
                setProcessing(true);
                await axios.put(`${server}/api/user/${user._id}/follow`, { _id: currentuser._id });
                setProcessing(false);
                // ---clientside-----
                console.log(currentuser.followings);
                currentuser.followings.push(user._id);
                localStorage.setItem('user',JSON.stringify(currentuser));
                console.log(currentuser.followings);
                setFollowed(!followed);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
        <div style={{margin:0,padding:0, display:"flex",alignItems:"center",position:"relative"}} >
            
            {user.username !== currentuser.username &&
                <button className="ProfileRightbarFollowBtn" onClick={handleFollow}>
                    
                    {followed ? "Following" : "Follow"}
                </button>
            }
            {processing? <CircularProgress style={{position:"absolute",top:"25px", left:"100px"}}/>: ""}
            </div>
            <h4 className="profileRightbarTitle">User Information</h4>
            <div className="profileRightbarInfo">
                <div className="profileRightbarInfoItem">
                    <span className="profileRightbarInfoKey">City:</span>
                    <span className="profileRightbarInfoValue">{user.city}</span>
                </div>
                <div className="profileRightbarInfoItem">
                    <span className="profileRightbarInfoKey">From:</span>
                    <span className="profileRightbarInfoValue">{user.from}</span>
                </div>
                <div className="profileRightbarInfoItem">
                    <span className="profileRightbarInfoKey">Relationship:</span>
                    <span className="profileRightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "married" : ""}</span>
                </div>
            </div>
            <h4 className="profileRightbarTitle">User Friends</h4>
            <div className="profileRightbarFollowings">
                {friends.map((friend) => {
                    return (
                        <Link key={friend._id} to={`/profile/${friend.username}`} style={{ textDecoration: "none", color: "black" }}>
                            <div className="profileRightbarFollowing">
                                <img
                                    src={friend.profilePicture
                                        ? friend.profilePicture
                                        : "/assets/noavatar.jpg"} alt="" className="profileRightbarFollowingImg" />
                                <span className="profileRightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default Profilerightbar