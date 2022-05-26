import { React, useRef } from 'react';
import "./topbar.css";
import SearchIcon from '@mui/icons-material/Search';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert';
import axios from "axios";

const Topbar = () => {
  const server =process.env.REACT_APP_SERVER;
  const alert = useAlert();
  const inputSearch = useRef();
  const navigate = useNavigate();
  

  const scrollTop = () => {
    document.documentElement.scrollTop = 0;
  }


  const handleLogout = ()=>{
    localStorage.clear();
    navigate('/');
    alert.show('Logged-out successfully',{type: 'success'});
  }

  const searchProfile = async() => {
    const res = await axios.get(`${server}/api/user/checkuser/${inputSearch.current.value}`);
    if(res.data.success){
      navigate(`/profile/${inputSearch.current.value}`)
      inputSearch.current.value = "";
    }else{
      alert.show('User not found',{type: 'error'});
    }
  }

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const loggedinUser = JSON.parse(localStorage.getItem('user'));

  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <Link style={{ textDecoration: 'none' }} to={'/home'}>
          <span className="topbarLogo">FriendsAdda</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" onClick={searchProfile} />
          <input placeholder="Search for friend, post or video " className="searchInput" ref={inputSearch} />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to={'/home'} className="topbarLink topbarHome">Homepage</Link>
          <span onClick={scrollTop} className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PeopleAltIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <ChatIcon />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">3</span>
          </div>
        </div>
        <div className='topbarprofile'>
          <span className="topbarLinkLogout" onClick={handleLogout}>Logout</span>
          <Link to={`/profile/${loggedinUser.username}`}>
            <img crossOrigin="anonymous" src={loggedinUser.profilePicture
              ? PF + "person/" + loggedinUser.profilePicture
              : PF + "default/noavatar.jpg"} alt="profile" className="topbarImg" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Topbar