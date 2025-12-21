import FacebookLogo from '../../src/assets/facebook-logo.png';
import { Bell,  ChevronDown,  ChevronRight,  Ellipsis, Gamepad,  House, LogOut, Logs, Menu, MessageCircle, MessageSquare, MessageSquareLock, Moon, MoveLeft, Search, Settings, Store, TrainFrontTunnel, TvMinimalPlay, UserRound, Users, VideoIcon } from "lucide-react";
import {  useEffect, useRef, useState } from "react";
import privateAxiosInstance from '../api/privateAxiosInstance.js';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext.jsx';
import Toast from './Toast.jsx';
export function Header(){
    const [profileOptions, setProfileOptions] = useState(false)
    const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);
    const {getUsers, socket,  getFetchNotifications, defaultNotifications, notificationCount, logginUser, 
        postIsOpen, setLeftSideBarOpen, setRightSideBarOpen, fetchDefaultFriendsSentYouRequest, newMessageArrieve, setNewmessageArrieve} = useUserContext();
    const navigate = useNavigate();
    const [usersSearch, setUsersSearch] = useState([]);
    const [searchValue, setSeachValue] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setpage] = useState(2);
    const [newNotificationsCount, setNewNotificationsCout] = useState(0);
    const [notificatioIsOpen, setNotificatioIsOpen] = useState(false);
    const [headerClickedValue, setHeaderClickedValue] = useState('home');
      const [error, setError] = useState(false);




    const socketRef = useRef(null);

   

    useEffect(() => {
       socketRef.current = socket;
       setNotifications(defaultNotifications);
        setCount(notificationCount);
        
       const listenNotification = (data) => {
        setNotifications(prev => [data, ...prev]);
       setNewNotificationsCout(prev => prev + 1);
        
      }

      

      socketRef.current.on('new-notification', listenNotification);

      return () => {
        socketRef.current.off('new-notification', listenNotification);
      }
       
    }, [socket, defaultNotifications, notificationCount]);

    function openSearchBar(){
        setSearchBarIsOpen(true)
    }

    function closeSearchBar(){
        setSearchBarIsOpen(false)
    }

    const openProfileOptions = () => {
       setProfileOptions(!profileOptions);
       setNotificatioIsOpen(false);
    }

    const logOut = async() => {
        try{
            const res = await privateAxiosInstance.post('/auths/logout');
            if(res.status < 400){
                console.log(res.data);
                
                localStorage.removeItem('accessToken');
                setProfileOptions(false);
                navigate('/logging', {replace: true})
            }
        }
        catch(err){
            console.log(err.response);
            
            if(err)
           {
            setError(true);
            
            
           }
            
        }
    };

    const searching = async(e) => {
        const textValue = e.target.value
          setSeachValue(textValue)
      if(textValue.trim() !== ''){
              try{
         setSeachValue(textValue)
           const res = await getUsers(1, 50, textValue);
            if(res.status < 400){
                setUsersSearch(res.data.users);
            }  
        }
        catch(err){
           if(err){
            setError(true);
           }
            
        }
      }
    };

const searchResult = (user) => {
    navigate(`/search/all?=${user.firstName}%${user.surName}`, {state: {usersSearch, firstUser: user}});
};

const redirectToFriends = (sender) => {
    const notificationBody = sender.split(' ');
    setNewNotificationsCout(0);
    if(notificationBody.includes('sent')){
        navigate('/friends/requests');
         fetchDefaultFriendsSentYouRequest();
         
    }else{
        navigate('/friends/lists');
    }
    
};

const loadMore = async() => {
    try{
        const res = await getFetchNotifications(page);
        if(res.status < 400){
            setNotifications(prev => [...prev, ...res.data.notifications]);
            setpage(page + 1);
            setCount(res.data.count)
        }
    }
    catch(err){
       if(err){
        setError(true);
       }
        
    }
}

const openNotification = () => {
  
    setNotificatioIsOpen(prev => prev === false ? true : false);
    setProfileOptions(false);
};

const getHeaderClickedValue = (page) => {
    setHeaderClickedValue(page);
    navigate(`/${page}`)
  
};

const seeAllNotifications = () => {
    navigate('/notification');
}
   
    return (
        <div className={`bg-white fixed top-0 left-0 right-0  flex shadow-sm z-30 ${postIsOpen && 'opacity-35'}`}>
{error && <Toast message="something went wrong  try again" />}
            <div className="flex mt-2 gap-2">
                
              <img src={FacebookLogo} alt="" className='h-10 ml-4 cursor-pointer ' onClick={() => {navigate('/home')}} />
                   
                     <div  className="md:h-11 md:w-[250px]  w-10 h-10  rounded-full bg-gray-200 flex pt-2 pl-3 md:pl-3 gap-2 text-black text-[15px]"  
                        onClick={openSearchBar}
                     >
                        {<Search className="w-4 " />}
                        <p className='md:block hidden'>Search Facebook</p>
                    </div>

                    <div className={`fixed top-0 left-0 bg-white pb-3 w-[323px] rounded-2xl shadow-2xl ${searchBarIsOpen === true ? '' : 'hidden'} }`}>
                       
                       <div className='flex gap-2'>
                            <div
                         className="hover:bg-gray-200 cursor-pointer ml-2 px-2 h-10 mt-2 rounded-full"
                         onClick={closeSearchBar} 
                        >
                         
                        {<MoveLeft className="mt-2 w-5 "/>}
                       </div>
                       <input type="text" name="" id="" className="h-10 w-64 mt-2 rounded-full bg-gray-200 placeholder:to-black pl-3" 
                        placeholder="Search facebook" autoFocus onChange={searching}
                    />
                       
                       </div>
                  

                       <div className=' mt-5 px-2'>
                        {!searchValue && (
                            <p className={`text-[14px] text-gray-500 `}>
                                No recent searches
                            </p> 
                           
                        )}
                            <div>
                                {usersSearch.map((user) => (
                                    <div className={`flex gap-3 hover:bg-gray-200 p-2 rounded-md cursor-pointer`}
                                         onClick={() => searchResult(user)}
                                    >
                                <div className='bg-gray-300 h-6 w-6 rounded-full pt-1 pl-1' >
                                    <Search className='w-3.5 h-3.5' />
                                </div>
                                <p className='mt-1 text-[14px]'>{user.firstName} {user.surName}</p>
                            </div>
                                ))}
                            </div>
                       </div>
                       
                    </div>
           
              
                     <div className='bg-gray-200 h-10 w-10 pt-2 pl-2 rounded-full cursor-pointer md:hidden block ' onClick={() => {setLeftSideBarOpen(true)}} >
                    {<Logs className='h-6 w-6' />}
                </div>
            </div>

            <div className="md:flex hidden ml-12 mt-1 gap-1 mb-1">
                <div className='hover:bg-gray-200 px-11 rounded-xl pt-3 cursor-pointer ml-10 ' onClick={() => getHeaderClickedValue('home')}>
                    {<House className={`h-6 w-6 ${headerClickedValue === 'home'? 'text-blue-700' : 'text-black'}`} />}
                </div>
                  
              
               <div className='hover:bg-gray-200 px-10 pt-2 rounded-xl cursor-pointer' onClick={() => getHeaderClickedValue('friends')}>
                     {<Users className={`h-7 w-7 ${headerClickedValue === 'friends'? 'text-blue-700' : 'text-black'}`} />}
               </div>

               
                 <div className='hover:bg-gray-200 px-10 pt-2 rounded-xl cursor-pointer' onClick={() => getHeaderClickedValue('feedback')}>
                    {<MessageSquare className={`h-7 w-7 ${headerClickedValue === 'feedback'? 'text-blue-700' : 'text-black'}`} />}
                </div>

                {logginUser.role === 'admin' && (
                     <div className='hover:bg-gray-200 px-11 rounded-xl pt-3 cursor-pointer ml-10 ' onClick={() => getHeaderClickedValue('feedback/view')}>
                    {<MessageSquareLock className={`h-6 w-6 ${headerClickedValue === 'feedback/view'? 'text-blue-700' : 'text-black'}`} />}
                </div>
                )}
            </div>
        

            <div className="flex mt-2 ml-auto mb-2 gap-2 mr-4 relative">
               
                <div className='bg-gray-200 pt-2 pb-2 px-3 rounded-full cursor-pointer md:hidden block relative'  onClick={() => {setRightSideBarOpen(true); setNewmessageArrieve(0)}}>
                    {<MessageCircle className='h-5 w-5 mt-1' />}
                     {newMessageArrieve > 0 && (
                        <div className='absolute bg-red-600 text-white font-bold -top-1 -right-1 rounded-full w-5.5 h-5.5 text-sm pt-0.5 pl-1.5'>
                        { newMessageArrieve > 0 &&  newMessageArrieve}
                    </div>
                     )}
                </div>
             
                <div className='bg-gray-200 p-2 rounded-full cursor-pointer relative' onClick={openNotification}>
                    {newNotificationsCount > 0  && (
                        <div className='absolute bg-red-600 text-white font-bold -top-1 -right-1 rounded-full w-5.5 h-5.5 text-sm pt-0.5 pl-1.5'>
                        {newNotificationsCount <= 9 ? newNotificationsCount : <>9+</>}
                    </div>
                    )}
                    {<Bell className='h-7 w-7' />}
                </div>
               
                <div onClick={openProfileOptions}>
                     <img src={logginUser?.profile?.image} alt="" className='rounded-full cursor-pointer h-11  w-11' />
                     <div className='absolute bottom-0 right-0 bg-gray-200 rounded-full border-white border cursor-pointer'>
                        <ChevronDown className='w-4 h-4' />
                     </div>

   
                     </div>
                     {/* notification part */}
                              <div className={`overflow-y-scroll bg-white p-2 absolute max-h-[560px] right-0 mt-13 w-[370px] rounded-xl shadow-xl }
                               ${notificatioIsOpen === false && 'hidden'} `} 
                        style={{
                    boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.2), 0px 4px 6px rgba(0, 0, 0, 0.2)'
                        }}  
                     >
                       {notifications.length < 1  && (
                         <p className='text-gray-500 ml-1'>
                            you not have notification yet
                        </p>
                       )}
                     {notifications.length > 0 && (
                        <div>
                          <div className='flex  '>
                        <p className='text-[20px] font-bold ml-2'>Notifications</p>
                        <div className='ml-auto hover:bg-gray-200  h-7 w-7 rounded-full pt-1 pl-1 cursor-pointer'>
                            <Ellipsis className='h-5 w-5' />
                        </div>
                       </div>
                        
                        <div className='flex mt-2'>
                            <p className='font-bold ml-2'>All</p>
                           <div className='ml-auto hover:bg-gray-200  p-2  cursor-pointer'>
                             <p className=' text-blue-600 text-[14px]' onClick={seeAllNotifications}>See all</p>
                           </div>
                        </div>
                        <div>
                            {notifications.map(notification => (
                               <div className='flex hover:bg-gray-200 px-2 py-1.5 rounded-md cursor-pointer' 
                               onClick={() => redirectToFriends(notification.notification)}
                               >
                                 <div className='max-w-13 max-h-13 min-h-13 min-w-13 rounded-full'>
                                    <img src={notification.senderProfile} alt="" className='w-full h-full  rounded-full' />
                                 </div>
                                  <p className='mt-3 ml-2'>{notification.notification}</p>
                               </div>
                            ))}
                        </div>
                       <button className={`bg-gray-300 w-full px-2 py-1.5 rounded-md mt-2 text-[14px] font-medium cursor-pointer 
                            // ${count < 30 && 'hidden'}`}
                            onClick={loadMore}    
                        >
                         See previous notifications
                    </button>
                     </div>
                     )}
                     </div>

{/* logout part */}
                              <div className={`bg-white absolute right-0 mt-13 w-[370px] rounded-xl shadow-xl 
                                ${profileOptions === false && 'hidden'}`} 
                        style={{
                    boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.2), 0px 4px 6px rgba(0, 0, 0, 0.2)'
                        }}  
                     >

                        <div className='bg-white mt-3 mx-4 rounded-xl shadow-xl p-1.5' 
                             style={{
                    boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.2), 0px 4px 6px rgba(0, 0, 0, 0.2)'
                        }}  
                        >
                        <div className='hover:bg-gray-200 flex py-2 px-3 rounded-xl'>
                            <img src={logginUser?.profile?.image} alt="" className='rounded-full cursor-pointer h-9 w-9' />
                            <p className='text-[16px] font-medium mt-1.5 ml-2'>{logginUser.firstName} {logginUser.surName}</p>
                        </div>
                        <hr className='text-gray-300 w-[95%] justify-self-center my-1' />
                       <button className='text-[15px] font-medium bg-gray-300 px-24 cursor-pointer rounded-xl py-1.5 my-2 whitespace-nowrap'>
                        <UserRound className='inline-block w-4' /> See all profiles
                       </button>
                        </div>

                        <div className='mt-6'>
                            <div className='hover:bg-gray-200 flex cursor-pointer mx-2 pl-2 rounded-md py-2'>
                                <div className='bg-gray-300 p-2 rounded-full'>
                                    <Settings />
                                </div>
                                <p className='text-[15px] font-medium mt-2 ml-3'>Settings & privecy </p>
                                <ChevronRight className='ml-auto w-8 h-10 text-gray-400' />
                            </div>
                            <div className='hover:bg-gray-200 flex cursor-pointer mx-2 pl-2 rounded-md py-2'>
                                <div className='bg-gray-300 w-10 h-10  rounded-full pt-2 pl-3'>
                                    <p className='bg-black text-white font-bold w-5 h-5 rounded-full text-[18px]'>?</p>
                                </div>
                                <p className='text-[15px] font-medium mt-2 ml-3'>Help & support</p>
                                <ChevronRight className='ml-auto w-8 h-10 text-gray-400' />
                            </div>
                            <div className='hover:bg-gray-200 flex cursor-pointer mx-2 pl-2 rounded-md py-2'>
                                <div className='bg-gray-300 p-2 rounded-full'>
                                    <Moon className='text-black' />
                                </div>
                                <p className='text-[15px] font-medium mt-2 ml-3'>Display & accessibility </p>
                                <ChevronRight className='ml-auto w-8 h-10 text-gray-400' />
                            </div>
                            <div className='hover:bg-gray-200 flex items-start cursor-pointer mx-2 pl-2 rounded-md py-2'>
                                <div className='bg-gray-300 p-2 rounded-full'>
                                    <MessageSquare className='w-5 text-black m-0.5' />
                                </div>
                                <div>
                                    <p className='text-[15px] font-medium ml-3'>Give feedback </p>
                                    <p className='text-left ml-3 text-[14px] text-gray-600'>CTRL B</p>
                                </div>
                                <ChevronRight className='ml-auto w-8 h-10 text-gray-400' />
                            </div>
                             <div className='hover:bg-gray-200 flex cursor-pointer mx-2 pl-2 rounded-md py-2'  onClick={logOut}>
                                <div className='bg-gray-300 p-2 rounded-full' >
                                    <LogOut className='text-black' />
                                </div>
                                <p className='text-[15px] font-medium mt-2 ml-3'>Log Out </p>
                                <ChevronRight className='ml-auto w-8 h-10 text-gray-400' />
                            </div>
                        </div>
                        <div className="ml-4 leading-3 mt-3 mr-3 text-left mb-4">
      <p className="shered-paragraph-style"><a href="#">Privacy &#183;</a></p>
      <p className="shered-paragraph-style"><a href="#">Terms &#183;</a></p>
      <p className="shered-paragraph-style"><a href="#">Advertising &#183;</a></p>
      <p className="shered-paragraph-style"><a href="#">Add Choices &#183;</a> <ChevronRight  className="inline-block -ml-2"/></p>
      <p className="shered-paragraph-style"><a href="#">Cookies &#183;</a></p>
      <p className="shered-paragraph-style"><a href="#">more &#183;</a></p>
     </div>
    </div>
                     
                </div>

               
              
            </div>
               

        
    );
}