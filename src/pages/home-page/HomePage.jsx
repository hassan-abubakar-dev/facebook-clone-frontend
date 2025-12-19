import FeedSkeletonLoader from "../../spinners/FeedSkeletonLoader";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/left-side-bar/home-page-sidebar/SideBar";
import { RightSideBar } from "../../components/right-side-bar/home-page-sidebar/RihtSideBar";
import { Posting } from "./Posting";
import { Stories } from "./Stories";
import { useEffect, useState } from "react";
import { Post } from "./Post";
import { PeoplePosting } from "./PeoplePosting";
import { ChevronLeft, MessageCircle, SendHorizonal, Share2, ThumbsUp, X } from "lucide-react";
import Like2 from '../../assets/like-2.svg';
import { useUserContext } from "../../context/UserContext";
import privateAxiosInstance from "../../api/privateAxiosInstance";
import NoComment from '../../assets/no-comment.png'
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import FriendsImage from '../../assets/friends-image.png'
import { AddFriends } from "./AddFriens";
import Toast from "../../components/Toast";
import WelcomePopup from "../../components/WelcomePopup";
import NoPostMessage from "./NoPostMessage";

const HomePage = () => {
    const [isHidden] = useState(true);
   
const {openPostComment, setOpenPostComment, commentObject, likeObject, openPostLike, setOpenPostLike, logginUser, 
  noFriends, globalerror, newUser, setNewUser} = useUserContext();

const [isLike, setIsLike] = useState(false);
const [likePost, setlikePost] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
const [noPost, setNoPost] = useState(false);

// console.log('commentObject', commentObject);


useEffect(() => {
  const check = localStorage.getItem('isNewUser');
  if(check){
    setNewUser(true);
  };

   const fetchFriendPosts = async() => {
          try{
            const res = await privateAxiosInstance.get('/friend-posts');
            if(res.status < 400){
            const posts = res.data.posts;
            if(posts.length === 0){
              setNoPost(true);
            }
              setLoading(false);
            }
        }
        catch(err){
            if(err){
                setError(true)
            }
            
        }
      };

      fetchFriendPosts();
}, []);
const [comments, setComments] = useState([]);

const [comment, setComment] = useState('');


const closeComment = () => {
    setOpenPostComment(false);
    setComments([]);
};

const getComment = (e) => {
    setComment(e.target.value.trim());
};

const sendComment = async(id) => {
    setLoading(true);
    try{
        const res = await privateAxiosInstance.post(`/create-comment/${id}`, {comment});
        if(res.status < 400){
            // console.log('res.data.comment', res.data.comment.User?.profile?.image);
            setLoading(false);
             const newComment = res.data.comment; 
              setComments(prev => [...prev, newComment]);
           
        }
    }
    catch(err){
        // console.log(err.response);
       if(err){
         setLoading(false);
        setError(true)
       }
    }
};

const closeLike = () => {
    setOpenPostLike(false);
};

    const like = async(id) => {
        try{
            const res = await privateAxiosInstance.post(`/like/${id}`);
            if(res.status < 400){
                // console.log(res.data);
                setlikePost(true);
                // setLikeId(id);
                // setUserLikeId(res.data.userId);
                if(res.data.message === "Post liked"){
                    setIsLike(true)
                }else if(res.data.message === 'Post unliked'){
                    setIsLike(false);
                }
                
            }
        }
        catch(err){
           if(err){
            setError(true);
           }
            
        }
    };
    

    return (
        <div className="bg-gray-100 min-h-screen pb-20">
          {newUser && <WelcomePopup userName={logginUser.firstName} />}
           {error && <Toast message="something went wrong  try again" />}
           {globalerror && <Toast message="something went wrong  try again" /> }
            <FeedSkeletonLoader  isHidden={isHidden} />
            <Header />
            <SideBar />
             <Posting />
             <Stories />
             <Post />
             {noPost && <NoPostMessage />}
            {!noFriends &&  <AddFriends />}
             <PeoplePosting />
            <RightSideBar />

{openPostComment && (
  <div className="bg-white z-40 fixed inset-0 md:inset-auto md:top-14 md:left-[230px] md:right-[230px] md:bottom-10 shadow-2xl rounded-xl max-h-full md:max-h-[540px] overflow-y-auto overflow-x-hidden">

    <div className="relative">

      {loading && (
        <div className="w-20 h-20 border-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      )}

     

      <div className="flex items-center justify-between mt-3 mx-3">
         <ChevronLeft className="md:hidden block" onClick={closeComment} />
        <p className="font-bold text-[18px] md:ml-0 ml-6">
          {commentObject.User.firstName}'s post
        </p>
        <div className="hover:bg-gray-300 p-1 rounded-full cursor-pointer" onClick={closeComment} >
          <X />
        </div>
      </div>

      <hr />

      {commentObject && (
        <div className='flex gap-3 mt-3 mx-4 mb-5 flex-wrap md:flex-nowrap'>
          <div>
            <img src={commentObject.User?.profile?.image} alt="user profile" className='rounded-full w-12 h-12' />
          </div>
          <div className="flex-1 min-w-0">
            <p className='text-sm font-bold'>{commentObject.User.firstName} {commentObject.User.surName}</p>
            <div className='flex gap-2 flex-wrap'>
              <div className='mt-2'>
                <p className='inline-block text-nowrap'>
                  {dayjs(comment.createdAt).fromNow()} &middot;
                </p>
                <img src={FriendsImage} alt="" className='self-start mt-1 inline-block pb-1 ml-1' />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-3">
        {commentObject.image && (
          <div className="w-full h-[300px] mb-5 rounded-xl overflow-hidden">
            <img src={commentObject.image} alt="" className='w-full h-full object-cover rounded-xl' />
          </div>
        )}
        {commentObject.content && (
          <p className="break-words">{commentObject.content}</p>
        )}
      </div>

      <div className='flex mt-3 flex-wrap md:flex-nowrap items-center'>
        <div className='flex gap-2 ml-3'>
          <img src={Like2} alt="" className='w-5' />
          <p className='hover:underline cursor-pointer'>
            {isLike && <>you and </>} {commentObject.Likes.length > 0 && commentObject.Likes.length} {isLike && <> other people like on this post</>}
          </p>
        </div>
        <div className='flex ml-auto mr-3 gap-2'>
          {commentObject.Comments.length > 0 && commentObject.Comments.length}
          <p>comments</p>
        </div>
      </div>

      {likePost && !isLike && <p className="text-blue-500 ml-3">you unlike this post</p>}

      <div className='flex flex-wrap md:flex-nowrap mt-3'>
        <div className='flex gap-2 px-3 py-1 cursor-pointer md:ml-3 ml-0  hover:bg-gray-200' onClick={() => like(commentObject.id)}>
          <ThumbsUp className={`${isLike && 'text-blue-600'}`} />
          <p>Like</p>
        </div>

        <div className='flex gap-2 px-3 py-1 mx-auto  cursor-pointer hover:bg-gray-200 md:ml-[400px]'>
          <MessageCircle />
          <p>Comment</p>
        </div>

        <div className='flex gap-2 px-3 py-1 cursor-pointer hover:bg-gray-200 ml-auto md:mr-1 mr-0'>
          <Share2 />
          <p>Share</p>
        </div>
      </div>

      {commentObject.Comments.length < 1 && (
        <div className="text-center my-8">
          <img src={NoComment} alt="" className="mx-auto" />
          <p className="font-bold mt-4 text-[23px] text-gray-500">No comments yet</p>
          <p className="mt-1 text-[20px] text-gray-400">Be the first to comment</p>
        </div>
      )}

      <div className="flex flex-col gap-2 mx-3">
        {commentObject.Comments.map((commentValue) => (
          <div key={commentValue.id} className="flex gap-2 items-start flex-wrap">
            <img src={commentValue.User?.profile?.image} alt="" className="rounded-full h-9 w-9" />
            <div className="bg-gray-300 rounded-xl py-1 px-2 break-words flex-1">
              {commentValue.comment}
            </div>
          </div>
        ))}
      </div>

      {comments.length > 0 && (
        <div className="flex flex-col gap-2 mx-3 mt-2">
          {comments.map((commentValue) => (
            <div key={commentValue.id} className="flex gap-2 items-start flex-wrap">
              <img src={commentValue.User?.profile?.image} alt="" className="rounded-full h-9 w-9" />
              <div className="bg-gray-300 rounded-xl py-1 px-2 break-words flex-1">
                {commentValue.comment}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Input for new comment */}
   
      
                     <div className="flex gap-2  items-start mt-52 ml-3 sticky bottom-0 border-t-gray-300 border-t bg-white py-4 md:w-full mr-3 md:mr-0 z-50">
                            <img src={commentObject.User?.profile?.image} alt="" className="rounded-full w-12 h-12" />
                            <div className=" rounded-xl py-1 px-2 w-[96%] text-wrap bg-gray-200">
                                <input type="text" name="" id="" className="w-full border-none focus:outline-none" onChange={getComment} />
                               
                               <div className={`justify-self-end mb-3  p-2 mr-3
                                    ${comment ? 'cursor-pointer hover:bg-gray-400 rounded-full text-blue-600': 'cursor-not-allowed '}`}
                                    onClick={() => sendComment(commentObject.id)}
                               >
                                 <SendHorizonal className="w-4 h-4" />
                               </div>
                            </div>
                        </div>

    </div>
  </div>
)}

       
{openPostLike && likeObject && (
  <div className="
    fixed z-40 bg-white shadow-2xl rounded-xl
    inset-0 md:inset-auto
    md:top-26 md:left-1/2 md:-translate-x-1/2
    md:w-[520px] md:h-[440px]
    h-full w-full
    overflow-y-scroll overflow-x-hidden
    p-3
  ">
    <div className="ml-3 flex gap-2 items-center">
      <ChevronLeft className="md:hidden block"  onClick={closeLike} />
      <img src={Like2} alt="" className="w-5" />
      <p className="hover:underline cursor-pointer">
        {likeObject.length}
      </p>
      <div
        className="hover:bg-gray-300 ml-auto p-1 rounded-full cursor-pointer"
        onClick={closeLike}
      >
        <X />
      </div>
    </div>

    <div className="flex flex-col mt-5 gap-4">
      {likeObject.map((userLike) => (
        <div key={userLike.id} className="flex items-center">
          <img
            src={userLike.User?.profile?.image}
            alt=""
            className="rounded-full w-12 h-12"
          />
          <p className="ml-3">
            {userLike.User.firstName} {userLike.User.surName}
          </p>
          {userLike.User.id !== logginUser.id && (
            <p className="ml-auto text-blue-500">Friend</p>
          )}
        </div>
      ))}
    </div>
  </div>
)}
        </div>
    ); 
}

export default HomePage;