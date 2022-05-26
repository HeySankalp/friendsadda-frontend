import React from 'react';
import Profilerightbar from './Profilerightbar';
import Homerightbar from './Homerightbar';
import "./rightbar.css";



const Rightbar = ({ user }) => {



    
    return (
        <div className="rightbar">
            <div className="rightWrapper">
                {user? <Profilerightbar user={user}/>: <Homerightbar/>}
            </div>
        </div>
    )
}
export default Rightbar