import { ChevronLeft, ChevronRight, Ellipsis, MessageCircle, Plus, Share2, ThumbsUp, UserRound, UsersRound, X } from 'lucide-react'
import Stori1 from '../../assets/story-1.jpg'
import Stori2 from '../../assets/story-2.jpg'
import { useUserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Toast from '../../components/Toast';

 function ConfirmFriendRequest(){
    const navigate = useNavigate();

    const {noFriendRequest, defaultFriendRequest, sendAcceptRequest, sendDeleteFriendRequest, 
        defaultCountFriendRequest, getfriendRequest, navigateToProfile} = useUserContext();
    const [usersConfirmIds, setUsersConfirmIds] = useState([]);
    const [usersDeleteIds, setUserDeleteIds] = useState([])
    const [friends, setFriends] = useState([]);
    const [page, setpage] = useState(2);
    const [count, setCount] = useState(defaultCountFriendRequest);
    const [unNavigatedIds, setUnNavigatedIds] = useState([]);
       const [error, setError] = useState(false);


    useEffect(() => {
        setFriends(defaultFriendRequest);
        
    }, [defaultFriendRequest])
   
     const limit = 12;
   const confirmRequest =  async(senderId) => {
        try{
            const res = await sendAcceptRequest(senderId);
            if(res.status < 400){
                setUsersConfirmIds(prev => [...prev, senderId]);
                setUnNavigatedIds(prev => [...prev, senderId]);
            }
        }
        catch(err){
           if(err){
            setError(true)
           }
            
        }
   }

   const deleteRequest = async(senderId) => {
        try{
            const res = await sendDeleteFriendRequest(senderId);
            if(res.status < 400){
                setUserDeleteIds(prev => [...prev, senderId]);
               setUnNavigatedIds(prev => [...prev, senderId]);  
            }
        }
        catch(err){
         if(err){
            setError(true)
           }
            
        }
   };

   const loadMore = async() => {
       try{
         const res = await getfriendRequest(page, limit);
        if(res.status < 400){
            
            setFriends(prev => [...prev, ...res.data.friendRequests])
            setpage(page + 1);
            setCount(res.data.count)
        }
       }
       catch(err){
         if(err){
            setError(true)
           }
       }
   };

   const navigatedUsers = friends.filter(friend => !unNavigatedIds.includes(friend.sender.id));
   
   const seeAllFriendRequest = () => {
        navigate('/friends/requests', {state: {navigatedUsers, page, count}});
   };

    return (
           <>
  {friends.length > 0 && (
    <div className={`${noFriendRequest && 'hidden'}`}>
      <div className='flex items-center mt-4 mb-3'>
        <p className='text-left ml-3 font-bold text-[17px]'>
          Friend Requests
        </p>

        <button
          className='hover:bg-gray-200 ml-auto text-blue-700 py-1 px-2 rounded-md'
          onClick={seeAllFriendRequest}
        >
          See all
        </button>
      </div>
{error && <Toast message="something went wrong  try again" />}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
        {friends.map(friend => (
          <div
            key={friend.sender.id}
            className='border-gray-300 border-2 rounded-xl shadow-md overflow-hidden bg-white flex flex-col'
          >
            <img
              src={friend.sender?.profile?.image}
              alt=""
              className='w-full h-44 object-cover cursor-pointer'
              onClick={() => navigateToProfile(friend.sender)}
            />

            <div className='px-3 py-2 flex flex-col gap-2 flex-grow'>
              <p
                className='text-left font-medium hover:underline cursor-pointer'
                onClick={() => navigateToProfile(friend.sender)}
              >
                {friend.sender.firstName} {friend.sender.surName}
              </p>

              {/* Buttons */}
              <div className='flex flex-col gap-2 mt-auto'>
                {!usersConfirmIds.includes(friend.sender.id) &&
                  !usersDeleteIds.includes(friend.sender.id) && (
                    <button
                      className='w-full text-blue-500 text-[15px] hover:bg-blue-100 py-1 rounded-md font-medium bg-green-100'
                      onClick={() => confirmRequest(friend.sender.id)}
                    >
                      Confirm
                    </button>
                  )}

                {!usersConfirmIds.includes(friend.sender.id) &&
                  !usersDeleteIds.includes(friend.sender.id) && (
                    <button
                      className='w-full text-black text-[15px] py-1 rounded-md font-medium bg-gray-200 hover:bg-gray-300'
                      onClick={() => deleteRequest(friend.sender.id)}
                    >
                      Delete
                    </button>
                  )}

                {usersConfirmIds.includes(friend.sender.id) &&
                  !usersDeleteIds.includes(friend.sender.id) && (
                    <button
                      className='w-full text-gray-400 text-[15px] cursor-not-allowed py-1 rounded-md font-medium bg-gray-200'
                    >
                      Request accepted
                    </button>
                  )}

                {!usersConfirmIds.includes(friend.sender.id) &&
                  usersDeleteIds.includes(friend.sender.id) && (
                    <button
                      className='w-full text-gray-400 text-[15px] cursor-not-allowed py-1 rounded-md font-medium bg-gray-200'
                    >
                      Request deleted
                    </button>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`hover:bg-gray-300 mt-4 rounded-md font-medium text-blue-600 cursor-pointer py-2 text-center ${
          count < limit && 'hidden'
        }`}
        onClick={loadMore}
      >
        See more
      </div>
    </div>
  )}
</>

    );
};

export default ConfirmFriendRequest;