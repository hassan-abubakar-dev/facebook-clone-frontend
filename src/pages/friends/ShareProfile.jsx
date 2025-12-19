import { ChevronDown, Ellipsis, MessageCircle, MessageCircleMore, Settings, Share2, SlidersHorizontal, ThumbsUp, UserRound } from "lucide-react";
import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import FriendsImage from '../../assets/friends-image.png'

import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import Toast from "../../components/Toast";
dayjs.extend(relativeTime);

const ShareProfile = ({openProfile, user, add}) => {

    
        const [addedUserIds, setAddedeUserIds] = useState([]);
    const {sendFriendRequest, sendCancelFriendRequest, setOpenPostComment, setCommentObject} = useUserContext();
    const [error, setError] = useState(false);
       
            const addFriend = async(id) => {
               
            try{
                const res = await sendFriendRequest(id);
                if(res.status < 400){
                    setAddedeUserIds(prev => [...prev, id]);
                    
                }
            }
            catch(err){
                
                
               if(err.response.data.message === 'sorry this request already exist'){
                    alert('This user is already added');
                    
                    setAddedeUserIds(prev => [...prev, id]);
               }else{
                setError(true);
               }
                
            }
        };
    
          const cancelRequest = async(receiverId) => {
            try{
                const res = await sendCancelFriendRequest(receiverId);
                if(res.status < 400){
                    
                    setAddedeUserIds(prev => prev.filter(id => id !== receiverId));
                    
                }
            }
            catch(err){
               if(err){
                setError(true);
               }
                
            }
        };

           const commentPost = (comment) => {
      setOpenPostComment(true);
      setCommentObject(comment);
      alert('yes')
    };
    
    return (
         <div>
            {error && <Toast message="something went wrong  try again" />}
              {openProfile && (<div className="pl-[248px] relative">
                <div className="w-[85%] justify-self-center h-[340px] mt-5 rounded-md bg-gray-200 " >
                   {user.coverPhoto && 
                     (<img src={user.coverPhoto.image} alt="" className={`h-full w-full rounded-md  object-cover `} />
                    )}
                 </div>
                   <div className="w-[165px] h-[165px] rounded-full absolute top-[270px] left-[360px] border-4 border-white shadow-xl">
                  {user.profile &&  <img src={user?.profile?.image} alt="" className="w-full h-full object-cover rounded-full cursor-pointer"
                    />}

                </div>

                  <div className="justify-self-left ml-[290px] w-[300px] ">
                <p className="mt-5 text-[30px] font-bold leading-none text-left">{user.firstName} {user.surName}</p>
                
            </div>

       {add && (
         <div className="flex gap-3 justify-self-end mr-32 -mt-7">
                {!addedUserIds.includes(user.id) && (
                    <button className="bg-blue-600 profile-edit-story text-white " onClick={() => addFriend(user.id)}>
                    <UserRound className="inline-block w-4 h-4" /> Add friend
                </button>
                )}
                {addedUserIds.includes(user.id) && (
                    <button className="bg-gray-200 profile-edit-story  " onClick={() => cancelRequest(user.id)}>
                    <UserRound className="inline-block w-4 h-4" /> Cancel
                </button>
                )}
                <button className="bg-gray-300 profile-edit-story text-black">
                    <MessageCircleMore className="inline-block w-4 h-4" /> message
                </button>
                <button className="bg-gray-300 profile-edit-story text-black mr-10">
                    <ChevronDown className="inline-block w-4 h-4" />
                </button>

            </div>
       )}

            <hr className="mt-8 text-gray-400 w-[79%] mr-auto ml-[110px]" />

             <div className="flex">
                <div className="text-left ml-[110px] flex">
                    <button className="profile-sections text-blue-800">Posts</button>
                    <button className="profile-sections">About</button>
                    <button className="profile-sections">Friends</button>
                    <button className="profile-sections">Photos</button>
                    <button className="profile-sections">Reels</button>
                    <button className="profile-sections">Check-ins</button>
                    <button className="profile-sections">Sports</button>
                    <button className="profile-sections">More <ChevronDown className="w-3 inline-block" /></button>
                </div>
                <button className="ml-[200px] bg-gray-300 mt-3 px-4 h-8 rounded-md cursor-pointer">
                    <Ellipsis className="w-5" />
                </button>
            </div>

            <div className="bg-gray-200 pl-[140px]">
               <div className="flex pt-4 gap-4">
                                  <div>
                                     
                                      <div className=" bg-white ml-3 rounded-xl py-4 mt-4">
                                         <div className="flex">
                                             <p className="text-left mt-1 text-[18px] font-bold ml-4 ">Photos</p>
                                          <p className="text-left text-[17px] text-blue-600 ml-auto mr-4 mt-1">See All Photos</p>
                                         </div>
                                          <div className="w-20 h-20 ml-4 flex gap-2">
                                            {user.profile && <img src={user?.profile?.image} alt="" className="rounded-md min-w-22" />}
                                            {user.coverPhoto &&  <img src={user.coverPhoto.image} alt="" className="rounded-md min-w-22" />}
                                          </div>
                                      </div>
                                   
                                  </div>
                                  <div>
                                      <div className="bg-white ml-3 rounded-xl py-4 mt-4 flex mb-3">
                                          <p className="text-left text-[21px] font-bold ml-4">Posts</p>
                                          <div className="ml-auto">
                                              <button className="bg-gray-300 py-2 px-4 mr-3  rounded-xl text-[15px] font-medium">
                                                  <SlidersHorizontal  className="inline-block w-4" /> Filters
                                              </button>
                                             
                                          </div>
              
                                      </div>
                                      <hr />
                                      {user.Posts.length > 1 &&  <p className=" text-gray-600 text-center text-[21px] font-bold mt-5">No posts available</p>}
                                     
                                      
                          <div className='w-full flex flex-col gap-5 mt-4'>      
          {user.Posts.length > 0 && user.Posts.map((post) => {

				return (
                    
					<div key={post.id} className='bg-white rounded-xl w-[500px] mx-auto '> 
				<div className='flex gap-3 mt-3 ml-4 mb-5'>

						<img src={user?.profile?.image} alt="user profile"  className='rounded-full w-12 h-12'/>
		
					<div className="">
						<p className='text-sm font-bold'>Hassan Scientists</p>
						<div className="flex items-startj]">
                            
							<p className='text-nowrap'>{dayjs(post.createdAt).fromNow()} &middot; </p>
							<img src={FriendsImage} alt="" className='self-start  mt-1 inline-block pb-1 ml-1' />

							<div 
								className='mr-5 hover:bg-gray-200 ml-[280px] -mt-7 w-10  h-9 rounded-full cursor-pointer '
							>
								{<Ellipsis className='inline-block w-6 h-6 '/>}
							</div>
                        </div>
						
					</div>
				</div>

				{post.content && <p className='ml-4 text-[18px] mb-3 wrap-break-word'  style={{backgroundColor: post.postColor}}>
                    {post.content}
                </p>}
				{post.postImage && (
					<div className='w-full '>
					<img src={post.postImage} alt="" className='h-full w-full ' />
				</div>
				)}
				<hr className="" />

				<div className='flex ml-4 py-1'>
					<div className='flex gap-2   px-9.5 hover:bg-gray-200 py-1 cursor-pointer'>
						{<ThumbsUp />}
						<p>Like</p>
					</div>

					<div className='flex gap-2  px-9.5 hover:bg-gray-200 py-1 cursor-pointer'onClick={() => {commentPost(post)}} >
						{<MessageCircle />}
						<p>Comments</p>
					</div>

					<div className='flex gap-2  px-9.5 hover:bg-gray-200 py-1 cursor-pointer'>
						{<Share2 />}
						<p>Share</p>
					</div>
				</div>
				
				
			</div>
            
				);
			})}

    </div>
                                  </div>
                              </div>
            </div>

            </div>)}
         </div>
    );
};

export default ShareProfile;