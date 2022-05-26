import React from 'react';
import "./sidebar.css";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import Closefriend from "../closefriend/Closefriend"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeedIcon className="sidebarListIcon" />
            <span className="sidebarListText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatIcon className="sidebarListIcon" />
            <span className="sidebarListText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleIcon className="sidebarListIcon" />
            <span className="sidebarListText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <GroupIcon className="sidebarListIcon" />
            <span className="sidebarListText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <BookmarkIcon className="sidebarListIcon" />
            <span className="sidebarListText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutlineIcon className="sidebarListIcon" />
            <span className="sidebarListText">Ask question</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutlineIcon className="sidebarListIcon" />
            <span className="sidebarListText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <EventIcon className="sidebarListIcon" />
            <span className="sidebarListText">Events</span>
          </li>
          <li className="sidebarListItem">
            <SchoolIcon className="sidebarListIcon" />
            <span className="sidebarListText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">

         {/* bottom of side bar  */}
         <Closefriend/>
        
        </ul>
      </div>
    </div>
  )
}

export default Sidebar