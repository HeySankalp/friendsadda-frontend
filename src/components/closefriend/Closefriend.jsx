import React from 'react';
import "./closefriend.css";

const Closefriend = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <li className="sidebarFriendItem">
        <img  crossOrigin="anonymous" src={PF+"person/p1.jpg"} alt="Loading.." className="sidebarFriendImg" />
        <span className="sidebarFriendName">David ram</span>
      </li>
      <li className="sidebarFriendItem">
        <img  crossOrigin="anonymous" src={PF+"person/p2.jpg"} alt="Loading.." className="sidebarFriendImg" />
        <span className="sidebarFriendName">Sita sizel</span>
      </li>
      <li className="sidebarFriendItem">
        <img  crossOrigin="anonymous" src={PF+"person/p3.jpg"} alt="Loading.." className="sidebarFriendImg" />
        <span className="sidebarFriendName">Hanu stroke</span>
      </li>
      <li className="sidebarFriendItem">
        <img  crossOrigin="anonymous" src={PF+"person/p4.jpg"} alt="Loading.." className="sidebarFriendImg" />
        <span className="sidebarFriendName">Tom holand</span>
      </li>
      <li className="sidebarFriendItem">
        <img  crossOrigin="anonymous" src={PF+"person/p5.jpg"} alt="Loading.." className="sidebarFriendImg" />
        <span className="sidebarFriendName">Tony starks</span>
      </li>
      <li className="sidebarFriendItem">
        <img  crossOrigin="anonymous" src={PF+"person/p6.jpg"} alt="Loading.." className="sidebarFriendImg" />
        <span className="sidebarFriendName">Roman reigns</span>
      </li>
    </>
  )
}

export default Closefriend