import { React, useState, useEffect} from 'react';
import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';


const Post = ({ post }) => {
  // const { user: loggedinUser } = useContext(AuthContext)
  const loggedinUser = JSON.parse(localStorage.getItem('user'));
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(loggedinUser._id));
  const [likeColor, setLikeColor] = useState(isLiked ? "blue": "black");
  const [user, setUser] = useState({});
  const server =process.env.REACT_APP_SERVER;

 const handleDeletePost = async()=>{
  console.log(post._id);
  await axios.delete(`${server}/api/post/${post._id}/${loggedinUser._id}/${post.image}`);
  window.location.reload();
 }



  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${server}/api/user?user_id=${post.user_id}`);
      setUser(res.data);
    };
    fetchUser();
  },[])


// like handling functionality
  const likeHandler = async () => {
    //client side 
    setLike(isLiked ? like - 1 : like + 1)
    isLiked ? setLikeColor("black") : setLikeColor("blue");
    setIsLiked(!isLiked);

    //server side
      await axios.put(`${server}/api/post/${post._id}/like`, { _id: loggedinUser._id });

  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img  crossOrigin="anonymous" className="postProfileImg" src={user.profilePicture ? PF + "person/" + user.profilePicture : PF + "default/noavatar.jpg"} alt="" />
            </Link>
            <span className="postUserName">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            {loggedinUser._id===post.user_id
            ?<DeleteIcon className='postTopRightDelete' onClick={handleDeletePost} />:""
            }
            <MoreVertIcon className="postTopRightIcon" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.description}</span>
          <img  crossOrigin="anonymous" src={PF +"post/"+ post.image} alt="post img" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img   src="/assets/like1.png" alt="" className="postLikeImg" onClick={likeHandler} />
            <img  src="/assets/like2.png" alt="" className="postLikeImg" onClick={likeHandler} />
            <span
              style={{ color: likeColor }}
              className="postlikeCounter">{like} {like<=1?"like":"likes"}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post