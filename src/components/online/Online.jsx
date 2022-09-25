import React from 'react'
import "./online.css"

const Online = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
    <li className="rightbarFriend">
      <div className="rightbarProfileImgCon">
        <img  crossOrigin="anonymous" src="/assets/dummyuser/p1.jpg" alt="loading..." className="rightbarProfileImg" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUserName">David ram</span>
    </li>
    <li className="rightbarFriend">
      <div className="rightbarProfileImgCon">
        <img  crossOrigin="anonymous" src="/assets/dummyuser/p2.jpg" alt="loading..." className="rightbarProfileImg" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUserName">Sita sizel</span>
    </li>
    <li className="rightbarFriend">
      <div className="rightbarProfileImgCon">
        <img  crossOrigin="anonymous" src="/assets/dummyuser/p3.jpg" alt="loading..." className="rightbarProfileImg" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUserName">Hanu stroke</span>
    </li>
    <li className="rightbarFriend">
      <div className="rightbarProfileImgCon">
        <img  crossOrigin="anonymous" src="/assets/dummyuser/p4.jpg" alt="loading..." className="rightbarProfileImg" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUserName">Tom holand</span>
    </li>
    <li className="rightbarFriend">
      <div className="rightbarProfileImgCon">
        <img  crossOrigin="anonymous" src="/assets/dummyuser/p5.jpg" alt="loading..." className="rightbarProfileImg" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUserName">Tony starks</span>
    </li>
    <li className="rightbarFriend">
      <div className="rightbarProfileImgCon">
        <img  crossOrigin="anonymous" src="/assets/dummyuser/p6.jpg" alt="loading..." className="rightbarProfileImg" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUserName">Roman reigns</span>
    </li>
    </>
  )
}

export default Online