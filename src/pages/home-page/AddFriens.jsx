import ProfileImage from '../../assets/profile.jpg'
import Profile2 from '../../assets/profile-2.jpg'
import { Ban, ChevronLeft, ChevronRight, Ellipsis, MessageCircle, Plus, Share2, ThumbsUp, UserRound, UsersRound, X } from 'lucide-react'

import FriendsImage from '../../assets/friends-image.png'
import MockProfile from '../../assets/hassan 2.jpg'
import Stori1 from '../../assets/story-1.jpg'
import Stori2 from '../../assets/story-2.jpg'
import Stori3 from '../../assets/story-3.jpg'
import Post1 from '../../assets/post-1.jpg'
import Post2 from '../../assets/post-2.jpg'
import Like2 from '../../assets/like-2.svg'
import { useEffect, useRef, useState } from 'react'
import { useUserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import Toast from '../../components/Toast'
export function AddFriends(){
    const [friends, setFriends] = useState([]);

    const {getUsers, sendFriendRequest, sendCancelFriendRequest, postIsOpen, navigateToProfile} = useUserContext(); 
    const [addedUserIds, setAddedeUserIds] = useState([]);
    const navigate = useNavigate();
     const [error, setError] = useState(false);
 
    const fetchDefaultUsersToAdd = async() => {
         try{
            const res = await getUsers(1, 25);
            const defaultFriends = res.data.users;
            setFriends(defaultFriends);
          
            
        }
        catch(err){
            if(err){
                setError(true)
            }
            
        }
    }

    const friendsElement = useRef(null);
    useEffect(() => {
       fetchDefaultUsersToAdd();
    }, [])

    function scrollLeft(){
        const container = friendsElement.current;

        if(container){
            container.scrollBy({
                left: -320,
                behavior: 'smooth'
            })
        }
    }
    function scrollRight(){

         const container = friendsElement.current;

         if(container){
            container.scrollBy({
                left: 320,
                behavior: 'smooth'
            })
         }

    }
   
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
                setError(true)
            }
            
        }
    };

    return (
        	<>

               <div className={`md:w-[500px] md:ml-0 ml-20 w-[450px]  justify-self-center mt-4 relative bg-white rounded-xl shadow-xl ${postIsOpen && 'opacity-35'}`}>
					<div className='flex pt-3 rounded-2xl ml-3'>
					{<UsersRound className='w-5' />}
					<p className='ml-2'>People you may know</p>
					{<Ellipsis className='ml-auto mr-3' />}
				</div>
                {error && <Toast message="something went wrong  try again" />}
				<div className='flex overflow-x-hidden' ref={friendsElement}>
				
                {friends.map((friend) => {
                    return (
                        <div key={friend.id} className='min-w-52 border-gray-300 border-2 ml-3 rounded-xl shadow-md'>
						<img src={friend?.profile?.image} alt="" className='w-full cursor-pointer'  onClick={() => navigateToProfile(friend)}/>
						<div className='ml-3 flex flex-col gap-2 pb-3 '>
						<p className='my-2'>{friend.firstName} {friend.surName}</p>

					
						{!addedUserIds.includes(friend.id) && (
                            <button className={` text-blue-700 py-2 px-7 rounded-md font-medium mr-3 bg-green-100 cursor-pointer`}
                        onClick={() => {addFriend(friend.id)}}
                        >
							{<UserRound className='inline-block w-4 mr-2'/>}
						 	Add friend
						 </button>
                        )}

                        {addedUserIds.includes(friend.id) && (
                             <button className={` py-2 px-7 rounded-md font-medium mr-3 bg-gray-200 cursor-pointer`}
                        onClick={() => {cancelRequest(friend.id)}}
                        >
							{<Ban className='inline-block w-4 mr-2'/>}
						 	Cancel
						 </button>
                        )}
						 </div>
					</div>
                    );
                })}

				</div>
				
					<button className='my-3  hover:bg-gray-200 p-2 ml-3 mr-3 cursor-pointer rounded-xl text-blue-700 font-medium w-[96%] '
                         onClick={() => {navigate('/friends')}}
                    >
                        See all
                    </button>
				

					<div className='absolute flex top-48 md:gap-[360px] gap-[260px] ml-4'>
					<div className='bg-white rounded-full p-3   cursor-pointer ml-3.5'
						onClick={scrollLeft}
					>
						{<ChevronLeft />}
					</div>

					<div className='bg-white rounded-full p-3   cursor-pointer'
						onClick={scrollRight}
					>
						{<ChevronRight />}
					</div>
				</div>
			</div>
            </>
    );
}