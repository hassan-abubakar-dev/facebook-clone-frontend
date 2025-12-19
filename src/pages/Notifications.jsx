import { Header } from "../components/Header";
import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const Notification = () => {
    const { getFetchNotifications, defaultNotifications, notificationCount} = useUserContext();
    const [notifications, setNotifications] = useState([]);
    const [count, setCount] = useState(0);
     const [page, setpage] = useState(2);
    const navigate = useNavigate();
     const [error, setError] = useState(false);

    useEffect(() => {
        setNotifications(defaultNotifications);
        setCount(notificationCount);
    }, [defaultNotifications, notificationCount]);

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
            setError(true)
        }
        
    }
}
  const redirectToFriends = (sender) => {
    const notificationBody = sender.split(' ');
    
    if(notificationBody.includes('sent')){
        navigate('/friends/requests')
    }else{
        navigate('/friends/lists');
    }
    
};
    return (
        <div className="bg-gray-100 h-screen pt-19">
            <Header />
            {error && <Toast message="something went wrong  try again" />}
                     <div className=' bg-white shadow-xl justify-self-center w-[680px] rounded-xl  p-3 ' >
                       {notifications.length < 1  && (
                         <p className='text-gray-500 ml-1'>
                            you not have notification yet
                        </p>
                       )}
                     {notifications.length > 0 && (
                        <div>
                        <p className='text-[20px] font-bold ml-2'>Notifications</p>
                       
                       
                    
                            <p className='font-bold ml-2 mt-3'>All</p>
                           
                        <div>
                            {notifications.map(notification => (
                               <div className='flex hover:bg-gray-200 px-2 py-1.5 rounded-md cursor-pointer' key={notification.id}
                               onClick={() => redirectToFriends(notification.notification)}
                               >
                                 <div className='w-13 h-13 rounded-full'>
                                    <img src={notification.senderProfile} alt="" className='w-full h-full rounded-full' />
                                 </div>
                                  <p className='mt-3 ml-2'>{notification.notification}</p>
                               </div>
                            ))}
                        </div>
                       <button className={`bg-gray-300 w-full px-2 py-1.5 rounded-md mt-2 text-[14px] font-medium cursor-pointer 
                             ${count < 30 && 'hidden'}`}
                            onClick={loadMore}    
                        >
                         See previous notifications
                    </button>
                     </div>
                     )}
                     </div>
        </div>
    );
};

export default Notification;