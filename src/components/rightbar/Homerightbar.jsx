import "./homerightbar.css";
import React from 'react'
import Online from "../online/Online";

const Homerightbar = () => {
    return (
        <>
                <div className="birthdayContainer">
                    <img crossOrigin="anonymous" src="/assets/gift.png" alt="loading..." className="birthdayImg" />
                    <span className="birthdayText"><b>David ram</b>, <b>Tony starks</b> and <b>3 others</b> have birthday today</span>
                </div>
                <img crossOrigin="anonymous" src="/assets/a3.jpg" alt="Ad" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    <Online/>
                </ul>
            </>
    )
}

export default Homerightbar