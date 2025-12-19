import FriendsImage from '../../assets/friends-image.png'
import { Bell, BellOff, Bookmark, BookX, CalendarDays, ChevronLeft, ChevronRight, CirclePlus, Clock, CodeXml, ContactRound, Delete, Ellipsis, GlobeLock, Logs, MessageCircle, MessageSquareWarning, MinusCircle, Pencil, Plus, Settings, Share2, SquareX, ThumbsUp, Trash2, X } from
    'lucide-react'

import PostingImage3 from '../../assets/story-2.jpg'

import Like2 from '../../assets/like-2.svg'
import Post1 from '../../assets/post-1.jpg'
import Post2 from '../../assets/post-2.jpg'

import { useEffect, useState } from 'react'
import privateAxiosInstance from '../../api/privateAxiosInstance'
import { useUserContext } from '../../context/UserContext';


import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);


export function PeoplePosting({postIsOpen}) {

const {setOpenPostComment,  setCommentObject,  setLikeObject,  setOpenPostLike, navigateToProfile, setGlobalError} = useUserContext();
const [loading, setLoading] = useState(true);

    // const[userPosting, setUserPosting] = useState(null);
    const [comments, setComments] = useState([]);
    const [likeId, setLikeId] = useState(null);
    const {logginUser} = useUserContext();
    const [userLikeId, setUserLikeId] = useState(null);
    const [isLike, setIsLike] = useState(true);

    useEffect(() => {
      const fetchFriendPosts = async() => {
          try{
            const res = await privateAxiosInstance.get('/friend-posts');
            if(res.status < 400){
             
                setComments(res.data.posts);
              setLoading(false);
            }
        }
        catch(err){
            if(err){
                setGlobalError(true)
            }
            
        }
      };

      fetchFriendPosts();
    }, []);
    

        

    
   

    // const [activeOption, setActiveOption] = useState(null);

    const [removed, setRemoved] = useState(false);
    const [postToRevomed, setPostToRemoved] = useState('')

    // function postOptions(newComment, id){
    //     setActiveOption(preveId => {
    //         return preveId === id ? null : id;
    //     });
     
    //     setUserPosting(newComment)
    // }

    function removePost(comment){
        setPostToRemoved(comment);
        setRemoved(true)
        
    }
    
    function undoPost(){
       setRemoved(false)
    };

    const like = async(id) => {
        try{
            const res = await privateAxiosInstance.post(`/like/${id}`);
            if(res.status < 400){
      
                setLikeId(id);
                setUserLikeId(res.data.userId);
                if(res.data.message === "Post liked"){
                    setIsLike(true)
                }else if(res.data.message === 'Post unliked'){
                    setIsLike(false);
                }
                
            }
        }
        catch(err){
        if(err){
                setGlobalError(true)
            }
            
        }
    };

    const commentPost = (comment) => {
      setOpenPostComment(true);
      setCommentObject(comment);
    };

    const viewLikes = (peopleLike) => {

setOpenPostLike(true);
setLikeObject(peopleLike);
    }
    
    return (
        <div className={`${postIsOpen && 'opacity-35'}`}>
    {loading && (
                <div className="bg-white rounded-xl w-[500px] mx-auto animate-pulse p-4 mt-4 shadow-2l">
      
      {/* Top user row */}
      <div className="flex gap-3 mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div className="flex flex-col gap-2">
          <div className="w-32 h-3 bg-gray-300 rounded"></div>
          <div className="w-20 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Post text */}
      <div className="w-full h-3 bg-gray-300 rounded mb-2"></div>
      <div className="w-4/5 h-3 bg-gray-300 rounded mb-4"></div>

      {/* Post image */}
      <div className="w-full h-64 bg-gray-300 rounded-xl mb-4"></div>

      <hr className="mb-2 text-gray-300" />

      {/* Reactions row */}
      <div className="flex justify-around py-2">
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 bg-gray-300 rounded mb-1"></div>
          <div className="w-10 h-3 bg-gray-200 rounded"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 bg-gray-300 rounded mb-1"></div>
          <div className="w-12 h-3 bg-gray-200 rounded"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 bg-gray-300 rounded mb-1"></div>
          <div className="w-10 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
    )}

            {comments.map((comment) => {
                return (
                    <div className='bg-white rounded-xl w-[500px] mx-auto pt-1 mt-4' key={comment.id}>
                     

                    <div key={comment.id} className={postToRevomed.id === comment.id ? `${removed === true ? 'hidden' : 'bg-white rounded-xl shadow-xl'}` :`bg-white rounded-xl shadow-xl mt-5 ${postIsOpen === true ? '' : 'relative'} `}>
                        <div className='flex gap-3 mt-3 ml-4 mb-5'>
                            <div className='w-10 h-10'>
                                <img src={comment.User?.profile?.image} alt="user profile" className='w-full h-full object-cover rounded-full cursor-pointer'  onClick={() => {navigateToProfile(comment.User)}} />
                            </div>
                            <div>
                                <p className='text-sm font-bold'> {comment.User.firstName} {comment.User.surName}</p>
                                <div className='flex gap-2'>
                                    <div className='mt-2'>

                                        <p className='inline-block text-nowrap'>{dayjs(comment.createdAt).fromNow()} &middot; </p>
                                        <img src={FriendsImage} alt="" className='self-start mt-1 inline-block pb-1 ml-1' />
                                    </div>
                                    <div className='flex md:ml-[230px] -mt-10 ml-[200px]'>
                                        <div className='inline-block   hover:bg-gray-200 pt-1.5 pl-1 h-9 w-9 rounded-full cursor-pointer' 
                                        >
                                            {<Ellipsis />}
                                        </div>
                                        <div 
                                            className='inline-block hover:bg-gray-200 pt-1.5 pl-1 h-9 w-9 rounded-full cursor-pointer'
                                            onClick={() => {removePost(comment)}}
                                        >
                                            {<X />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      
                        {comment.content && <p className='ml-4 text-[18px] mb-3 wrap-break-word' style={{backgroundColor: comment.postColor}}>{comment.content}</p>}
				{comment.image && (
					<div className='w-full'>
					<img src={comment.image} alt="" className='w-full object-cover' />
				</div> 

				)}
                  <div className='flex mt-3'>
                            <div className=' ml-3  flex gap-2'>
                                <img src={Like2} alt="" className='w-5' />
                                <p className='hover:underline cursor-pointer' onClick={() => viewLikes(comment.Likes)}>
                                    {logginUser.id === userLikeId && comment.id === likeId && isLike && <span>you and </span>} 
                                        {comment.Likes.length > 0 && comment.Likes.length} {logginUser.id ===  userLikeId && comment.id === likeId && isLike && <span>other people like on this post</span>
                                    }
                                </p>
                               
                            </div>
                            <div className='flex ml-auto mr-3 gap-2'>
                                <div >{comment.Comments.length > 0 && comment.Comments.length}</div>
                                {<MessageCircle className=' w-5 text-black' />}

                            </div>
                             
                        </div>
                        {logginUser.id === userLikeId && comment.id === likeId && !isLike && <p className='text-blue-400 ml-4 text-[14px]'>you unlike this post</p>}
                        <hr className='mt-2 w-[95%] ml-auto mr-auto' />
                        <div className='flex ml-4 py-1'>
                            <div className='flex gap-2 px-9.5 hover:bg-gray-200 py-1 cursor-pointer' onClick={() => like(comment.id)}>
                                {<ThumbsUp  className={`${logginUser.id ===  userLikeId && comment.id === likeId  && isLike  && 'text-blue-600'}`} />}
                                <p>Like</p>
                            </div>

                            <div className='flex gap-2 px-9.5 hover:bg-gray-200 py-1 cursor-pointer' onClick={() => commentPost(comment)}>
                                {<MessageCircle />}
                                <p>Comment</p>
                            </div>

                            <div className='flex gap-2  px-9.5 hover:bg-gray-200 py-1 cursor-pointer'>
                                {<Share2 />}
                                <p>Share</p>
                            </div>
                        </div>

{/* 
                        <div className={activeOption === comment.id ? (`absolute top-[80px] bg-white   w-[430px] h-[400px] overflow-y-scroll left-[60px] shadow-xl rounded-xl `) : 'hidden'}>
                            <div>
                                <div className='hover:bg-gray-200 m-2 py-1 pl-2 rounded-md cursor-pointer'>
                                    {<CirclePlus className='inline-block ' />}
                                    <p className='inline-block font-bold ml-3'>Interested</p>
                                    <p className='ml-9 text-sm'>more of ypor posts will be like this.</p>
                                </div>
                            </div>

                            <div className='hover:bg-gray-200 m-2 py-1 pl-2 rounded-md cursor-pointer'

                            >
                                {<MinusCircle className='inline-block ' />}
                                <p className='inline-block font-bold ml-3'>Not interested</p>
                                <p className='ml-9 text-sm'>Less of ypor posts will be like this.</p>
                            </div>
                            <hr className='w-[92%] ml-auto mr-auto' />

                            <div className='hover:bg-gray-200 m-2 py-1 pl-2 rounded-md cursor-pointer'>
                                {<Bookmark className='inline-block ' />}
                                <p className='inline-block font-bold ml-3'>Save Post</p>
                                <p className='ml-9 text-sm'>Add this to your saved items</p>
                            </div>

                            <hr className='w-[92%] ml-auto mr-auto' />

                            <div className='cursor-pointer hover:bg-gray-200 m-2 py-1 pl-2 rounded-md'>
                                {<Bell className='inline-block ' />}
                                <p className='inline-block font-bold ml-3'>
                                    Turn on notification this post
                                </p>
                            </div>

                            <div className='cursor-pointer hover:bg-gray-200 m-2 py-1 pl-2 rounded-md'>
                                {<CodeXml className='inline-block ' />}
                                <p className='inline-block font-bold ml-3'>
                                    Embed
                                </p>
                            </div>

                            <hr className='w-[92%] ml-auto mr-auto' />

                            <div className='cursor-pointer hover:bg-gray-200 m-2 py-1 pl-2 rounded-md'>
                                {<Delete className='inline-block ' />}
                                <p className='inline-block font-bold ml-3'>Hide Post</p>
                                 <p className='ml-9 text-sm'>See fewer post like this.</p>
                            </div>

                            <div className='cursor-pointer hover:bg-gray-200 m-2 py-1 pl-2 rounded-md'>
                                {<Clock className='inline-block ' />}
                                <p className='inline-block font-bold ml-3'>Snooze {userPosting !== null && userPosting.userName} for 30days</p>
                                 <p className='ml-9 text-sm'>Temporarily stop seeing this posts</p>
                            </div>

                             <div className='cursor-pointer hover:bg-gray-200 m-2 py-1 pl-2 rounded-md'>
                                {<SquareX className='inline-block ' />}
                                <p className='inline-block font-bold ml-3'>UnFollow {userPosting !== null && userPosting.userName}</p>
                                 <p className='ml-9 text-sm'>
                                    Stp seeing this post but stay friends. they won't be notified that you unfollowed

                                 </p>
                            </div>

                            <div className='cursor-pointer hover:bg-gray-200 m-2 py-1 pl-2 rounded-md'>
                                {<MessageSquareWarning  className='inline-block ' />}
                                <p className='inline-block font-bold ml-3'>Report post</p>
                                 <p className='ml-9 text-sm'>
                                    we won't let {userPosting !== null && userPosting.userName} Know who report this
                                 </p>
                            </div>

                            
                            <div className='cursor-pointer hover:bg-gray-200 m-2 py-1 pl-2 rounded-md'>
                                {<ContactRound  className='inline-block ' />}
                                <p className='inline-block font-bold ml-3'>Block {userPosting !== null && userPosting.userName}'s Profile</p>
                                 <p className='ml-9 text-sm'>
                                    you won't be able to see this or contact each other
                                 </p>
                            </div>

                            
                        </div> */}

                        
                     
                    </div>

                    <div className={postToRevomed.id === comment.id ? `${removed === false ? 'hidden' : 'bg-white rounded-xl mt-4 shadow-xl pb-2'}` :  'hidden'}>

                          <div className=' m-2 py-1 pl-2 rounded-md'>
                                {<SquareX  className='inline-block ' />}
                                <p className='inline-block font-medium text-xl ml-3'>Hidden</p>
                                <div className='flex'>
                                 <p className='ml-9 text-sm'>
                                   Hiding posts helps Facebook personalize your Feed.
                                 </p>

                                 <button 
                                    className='bg-gray-200 py-3 px-7 rounded-xl inline-block ml-auto mr-2 -mt-4 mb-3 font-bold cursor-pointer hover:bg-gray-300'
                                onClick={undoPost}
                                >
                                    Undo
                                </button>
                                </div>
                                 <hr className='w-[92%] ml-auto mr-auto' />

                            </div>

                            <div className='cursor-pointer hover:bg-gray-200 m-2 py-1 pl-2 rounded-md'>
                                {<Clock className='inline-block ' />}
                                <p className='inline-block font-bold ml-3 text-xl'>Snooze {comment.User.firstName}  for 30days</p>
                                 <p className='ml-9 text-sm'>Temporarily stop seeing this posts</p>
                            </div>

                            <div className='cursor-pointer hover:bg-gray-200 m-2 py-1 pl-2 rounded-md'>
                                {<MessageSquareWarning  className='inline-block ' />}
                                <p className='inline-block font-bold ml-3'>Report post</p>
                                 <p className='ml-9 text-sm'>
                                    we won't let {comment.User.firstName}  Know who report this
                                 </p>
                            </div>

                             <div className='cursor-pointer hover:bg-gray-200 m-2 py-1 pl-2 rounded-md'>
                                {<Logs className='inline-block ' />}
                                <p className='inline-block font-bold ml-3 text-xl mb-3'>
                                    Content preferences
                                </p>
                            </div>

                               


                    </div>
</div>
                
                );
            })}

        </div>
    );

}