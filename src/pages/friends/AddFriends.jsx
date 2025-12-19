import { ChevronLeft, ChevronRight, Ellipsis, Menu, MessageCircle, Plus, Share2, ThumbsUp, UserRound, UsersRound, X } from 'lucide-react'
import { useUserContext } from '../../context/UserContext'
import {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast';

export function AddFriends(){
    const navigate = useNavigate();

    const {getUsers, navigateToProfile, defaultFriendsToAdd, defaultCount, sendFriendRequest, sendCancelFriendRequest} = useUserContext();
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(defaultCount || 12);
    const [page, setPage] = useState(2); 
    const [userAddedIds, setUserAddedIds] = useState([]);
    const [unNavigatedIds, setUnNavigatedIds] = useState([]);
     const [error, setError] = useState(false);
    
    useEffect(() => {
        setUsers(defaultFriendsToAdd);
        
    }, [defaultFriendsToAdd])


    const limit = 12;

    const loadMore = async() => {
        try{
            const res = await getUsers(page, limit);
            setCount(res.data.count); 
            setPage(page + 1);
            setUsers(prev => [...prev, ...res.data.users])         
        }
        catch(err){
           if(err){
            setError(true)
           }
            
        }
    }
   
  


    const remove = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const addFriend = async(id) => {
        try{
            const res = await sendFriendRequest(id);
            if(res.status < 400){
              
               setUserAddedIds([
                ...userAddedIds,
                id
               ]);
               setUnNavigatedIds(prev => [...prev, id]);
            }
        }
        catch(err){
           if(err.response.data.message === 'sorry this request already exist'){
                alert('this user was already added as your friend');
                setUserAddedIds([
                ...userAddedIds,
                id
               ]);
           };
            
        }
    }

    const cancelFriendRequest = async(receiverId) => {
        try{
            const res = await sendCancelFriendRequest(receiverId);
            if(res.status < 400){
              
                setUserAddedIds(prev => prev.filter(id => id !== receiverId));
                setUnNavigatedIds(prev => prev.filter(id => id !== receiverId));
            }
        }
        catch(err){
            if(err){
              setError(true)
            }
            
        }
    };

    const navigatedUsers = users.filter(user => !unNavigatedIds.includes(user.id));
    const seeAll = () => {
        navigate('/friends/suggestions', {state: {users: navigatedUsers, count, page}});
    }

    return (
           <>
           {/* <Menu className='cursor-pointer md:hidden block'/> */}
  <div className='grid md:grid-cols-2 grid-cols-1 mt-4 mb-3 items-center'>
    <p className='text-left md:ml-3 font-bold text-[17px]'>
      People you may know
    </p>

    <div className='md:ml-auto text-right'>
      <button
        className='hover:bg-gray-200 text-blue-700 py-1 px-2 rounded-md cursor-pointer'
        onClick={seeAll}
      >
        See all
      </button>
    </div>
  </div>
 {error && <Toast  message="something went wrong  try again" />}
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
    {users && users.map((user) => {
      return (
        <div
          key={user.id}
          className='border-gray-300 border-2 rounded-xl shadow-md overflow-hidden bg-white flex flex-col'
        >
          <img
            src={user?.profile?.image}
            alt=""
            className='w-full h-44 object-cover cursor-pointer'
            onClick={() => navigateToProfile(user)}
          />

          <div className='px-3 py-2 flex flex-col gap-2 flex-grow'>
            <p
              className='text-left font-medium hover:underline cursor-pointer'
              onClick={() => navigateToProfile(user)}
            >
              {user.firstName} {user.surName}
            </p>

            {/* Buttons */}
            <div className='flex flex-col gap-2 mt-auto'>
              {!userAddedIds.includes(user.id) && (
                <button
                  className='w-full text-blue-500 text-[15px] cursor-pointer hover:bg-blue-100 py-1 rounded-md font-medium bg-green-100'
                  onClick={() => addFriend(user.id)}
                >
                  Add friend
                </button>
              )}

              {!userAddedIds.includes(user.id) && (
                <button
                  className='w-full text-black text-[15px] py-1 rounded-md cursor-pointer font-medium bg-gray-200 hover:bg-gray-300'
                  onClick={() => remove(user.id)}
                >
                  Remove
                </button>
              )}

              {userAddedIds.includes(user.id) && (
                <button
                  className='w-full text-black text-[15px] py-1 cursor-pointer cursor-pointer rounded-md font-medium bg-gray-200 hover:bg-gray-300'
                  onClick={() => cancelFriendRequest(user.id)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      );
    })}
  </div>

  <div
    className={`hover:bg-gray-300 mt-4 rounded-md font-medium text-blue-600 cursor-pointer py-2 text-center ${
      count < limit && 'hidden'
    }`}
    onClick={loadMore}
  >
    See more
  </div>
</>

    );
}