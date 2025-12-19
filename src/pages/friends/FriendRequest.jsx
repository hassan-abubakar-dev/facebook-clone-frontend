import { Header } from "../../components/Header";
import FaceBookImage from '../../assets/facebook.png'
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import ShareProfile from "./ShareProfile"; 
import { useUserContext } from "../../context/UserContext";
import { useLocation} from "react-router-dom";
import Toast from "../../components/Toast";
const FriendRequest = () => {

    const location = useLocation();
    const {sendAcceptRequest, noFriendRequest, defaultFriendRequest, sendDeleteFriendRequest, defaultCountFriendRequest, 
        getfriendRequest, totalFriendRequest, navigateToProfile} = useUserContext();
    const [friend, setFriend] = useState({});
    const [openProfile, setOpenProfile] = useState(false);
    const [friends, setFriends] = useState([]);
    const [friendAcceptedIds, setFriendAcceptedIds] = useState([]);
    const [friendDeletedIds, setFriendDeletedIds] = useState([]);
    const [count, setCount] = useState(location.state?.count || defaultCountFriendRequest || 12);
    const [page, setPage] = useState(location.state?.page || 2);
    const navigatedUsers = location.state?.navigatedUsers;
    const limit = 12;
    const [error, setError] = useState(false);

    useEffect(() => {
        setFriends(navigatedUsers || defaultFriendRequest);
        
    }, [defaultFriendRequest, navigatedUsers]);

    const viewProfile = (friendInfo) => {
        
        
        const isDesktop = window.matchMedia("(min-width: 768px)").matches;
        if(isDesktop){
            setOpenProfile(true);
            setFriend(friendInfo);
        }else{
            navigateToProfile(friendInfo);
        }
    }
 
    const back = () => {
        window.history.back();
    };

    const acceptRequest =  async(senderId) => {
        try{
            const res = await sendAcceptRequest(senderId);
            if(res.status < 400){
                // console.log(res.data);
                setFriendAcceptedIds(prev => [...prev, senderId]);
            };
        }
        catch(err){
            // console.log(err);
            if(err){
                setError(true);
            }
            
        }
   }

    const deleteRequest = async(senderId) => {
        try{
            const res = await sendDeleteFriendRequest(senderId);
            if(res.status < 400){
                // console.log('delete', res.data);
                setFriendDeletedIds(prev => [...prev, senderId]);
            };
        }
        catch(err){
            // console.log('err', err);
            if(err){
                setError(true);
            }
        }
    }
 
    const loadMore = async() => {
        try{
            const res = await getfriendRequest(page, limit);
            if(res.status < 400){
            
                setFriends(prev => [...prev, ...res.data.friendRequests]);
             
                setPage(page + 1);
                setCount(res.data.count)
                
            }
        }
        catch(err){
           if(err)  {
                 setError(true);
           }
            
        }
    }

    return (
        <div className="bg-gray-100 overflow-x-hidden">
            <Header />
    {error && <Toast message="something went wrong  try again" />}

            <div className="bg-white fixed top-0 bottom-0 left-0 md:w-[326px] w-full z-20 shadow-xl  pl-3 pt-20 overflow-y-scroll">
                <div>
                    <p className="text-left text-[13px] text-gray-600 ml-10 -mb-3">
                        Friends
                    </p>
                    <div className="hover:bg-gray-200 w-6 h-6 rounded-full cursor-pointer" onClick={back}>
                        <ArrowLeft className="text-gray-500 h-5 " />

                    </div>
                    <p className="text-left text-[22px] font-bold  -mt-3 ml-10">
                        Friend Requests
                    </p>
                    <p className="text-left text-[15px] font-medium text-gray-700 mb-2">
                       {friends.length > 0 && totalFriendRequest} Friend requests
                    </p>
                    <p className="text-left text-blue-500 text-[13px] cursor-pointer mb-2">
                        View sent requests
                    </p>
                    {noFriendRequest && <p className={`text-left text-gray-700 text-[13px] ${friends.length > 0 && 'hidden'}`}>
                        No new requests
                    </p>}

                 {friends && friends.length > 0 && (friends.map(friend => (
                        <div className="flex gap-3 items-start hover:bg-gray-300 p-2  rounded-md cursor-pointer " key={friend.sender.id}
                             onClick={() => viewProfile(friend.sender)}
                        >
                <div className="min-w-13 min-h-13 max-w-13 max-h-13 rounded-full overflow-hidden mt-1">
                    <img src={friend?.sender?.profile?.image} className="w-full h-full rounded-full" alt="" />
                </div>
                <div>
                   
                    <p className="text-[15px] text-left mb-2 mt-1 text-nowrap w-20">
                        {friend.sender.firstName} {friend.sender.surName}
                    </p>
                
                    {friendAcceptedIds.includes(friend.sender.id) && !friendDeletedIds.includes(friend.sender.id) && (
                         <p className="text-[12px] mt-1 text-gray-500">Request accepted</p>
                    )}
                    {!friendAcceptedIds.includes(friend.sender.id) && friendDeletedIds.includes(friend.sender.id) &&  (
                        <p className="text-[12px] mt-1 text-gray-500">Request removed</p>
                    )}
                   
                   {!friendAcceptedIds.includes(friend.sender.id) && !friendDeletedIds.includes(friend.sender.id) && (
                     <button className="text-white text-[13px] cursor-pointer   py-1.5 text-nowrap  px-7 rounded-md font-medium mr-3 bg-blue-500" 
                       onClick={(e) => {
                            e.stopPropagation();
                            acceptRequest(friend.sender.id)
                       }}
                    >
                       Confirm
                    </button>
                   )}
                    
                </div>
                {!friendAcceptedIds.includes(friend.sender.id) && !friendDeletedIds.includes(friend.sender.id) &&(
                    <button className=" text-[13px] cursor-pointer  -ml-4 py-1.5  px-7 rounded-md font-medium mr-3 bg-gray-200 mt-8.5" 
                   onClick={(e) => {
                    e.stopPropagation();
                    deleteRequest(friend.sender.id)
                }}
                >
                        Delete
                    </button>
                )}

           </div> 
           
                 )))}
                </div>
    
                       <div className={`hover:bg-gray-300 mt-4 rounded-md font-medium text-blue-600 cursor-pointer py-1 mb-3 
                            ${count < limit && 'hidden'}`
                        } 
                       onClick={loadMore}
                    >
                        See more
                    </div>
            </div>

        {!openProfile && (
                <div className="w-screen h-screen hidden md:block">
                <div className="flex  justify-center pt-52 ">
                    <img src={FaceBookImage} alt="" className="bg-gray-100 ml-32" />
                </div>
               {friends.length === 0 ? (
                 <p className="ml-[620px]  font-bold text-[18px] text-gray-500 mt-6">
                    When you have friend requests or suggestions, you'll see them here.
                </p>
               ) : (
                     <p className="ml-[620px] font-bold text-[18px] text-gray-500 mt-6 ">
                        Select people's names to preview their profile.
                </p>
               )
            }
            </div>
        )}

            <ShareProfile user={friend} openProfile={openProfile} />
        </div>
    );
};

export default FriendRequest;