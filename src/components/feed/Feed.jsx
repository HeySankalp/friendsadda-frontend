import { React, useState, useEffect } from 'react';
import axios from "axios";
import "./feed.css";
import Post from "../../components/post/Post";
import Share from "../../components/share/Share";
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';

const Feed = ({ username }) => {
    const server =process.env.REACT_APP_SERVER;
    const [posts, setPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchPost = async () => {

            //fetching timeline post according to home and profile page
            const response = username
                ? await axios.get(`${server}/api/post/profile/${username}`)
                : await axios.get(`${server}/api/post/timeline/post${user._id}`);// else do this
            setPosts(response.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
        };
        fetchPost();
    }, [username])

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}
                {posts.length===0
                    ? <h1 style={{margin:"100px",display:"flex",alignItem:"center"}}>Didn't posted anything yet! <SentimentNeutralIcon style={{color:"#1877f2"}} fontSize="large"/></h1>
                    : posts.map((post) => {
                        return <Post key={post._id} post={post} />
                    })
                    
                }
            </div>
        </div>
    )
}

export default Feed