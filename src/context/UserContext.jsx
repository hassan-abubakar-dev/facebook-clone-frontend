import { createContext, useContext, useEffect, useState } from "react";
import privateAxiosInstance from "../api/privateAxiosInstance";
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';
const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [profilePicture, setProfilePicture] = useState('');
    const [coverPhoto, setCoverPhoto] = useState('');
    const [noCoverPhoto, setNoCoverPhoto] = useState(false);
    const [profilePictureFetched, setProfilePictureFetched] = useState(false);
    const [coverPhotoFetched, setCoverPhotoFetched] = useState(false);
    const [loading, setLoading] = useState(true);
    const [logginUser, setLogginUser] = useState({});
   const [defaultFriendsToAdd, setDefaultFriendsToAdd] = useState([]);
   const [defaultCount, setDefaultCount] = useState(0);
   const [noFriendRequest, setNoFriendRequest] = useState(false);
   const [defaultFriendRequest, setDefaultFriendRequest] = useState([]);
   const [defaultCountFriendRequest, setDefaultCountFriendRequest] = useState(0);
   const [totalFriendRequest, setTotalFriendRequest] = useState(0);
   const [userFriends, setUserFriends] = useState([]);
   const [totalUserFriends, setTotalUserFriends] = useState(0);
   const [userFriendsCount, setUserFriendsCount] = useState(0);
   const [noFriends, setNoFriends] = useState(false);
   const [socket, setSocket] = useState(null);
   const [defaultNotifications, setDefaultNotifications] = useState([]);
   const [notificationCount, setNotificationCount] = useState(0);
   const [posts, setPosts] = useState([]);
    const [openPostComment, setOpenPostComment] = useState(false);
    const [commentObject, setCommentObject] = useState({});
     const [openPostLike, setOpenPostLike] = useState(false);
    const [likeObject, setLikeObject] = useState({});
    const [runOpenChart, setRunOpenChart] = useState({});
    const [allowChatOpen, setAllowChartOpen] = useState(false);
    const [postIsOpen, setPostIsOpen] = useState(false);
    const [leftSideBarOpen, setLeftSideBarOpen] = useState(false);
    const [RightSideBarOpen, setRightSideBarOpen] = useState(false);
    const [globalerror, setGlobalError] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [newMessageArrieve, setNewmessageArrieve] = useState(0);

    const navigate = useNavigate();
    

    const fetchLogginUser = async() => {
            try{
                const res = await privateAxiosInstance.get('/users/user');
                if(res.status < 400){
                  
                    setLogginUser(res.data.user);
                    
                }
            }
            catch(err){
                if(err){
                    setGlobalError(true);
                }
                
            }
        }
    const fetchProfilePicture = async() => {
        try{
            const res = await privateAxiosInstance.get('/profile');
            if(res.status < 400){
                setProfilePicture(res.data.image)
                setProfilePictureFetched(true)
            }
        }
        catch(error){
            if(error){
                    setGlobalError(true);
                }
        }
    };

    const sendFriendRequest = (receiverId) => {
        return privateAxiosInstance.post(`/frienship/${receiverId}`)
    };

    const sendAcceptRequest = (senderId) => {
        return privateAxiosInstance.patch(`/friendship/${senderId}`)
    }

    const sendCancelFriendRequest = (receiverId) => {
        return privateAxiosInstance.delete(`/friendship/${receiverId}`)
    }

    const sendDeleteFriendRequest = (senderId) => {
        return privateAxiosInstance.delete(`/friendrequest/${senderId}`);
    };

    const fetchCoverPhoto = async() => {
        try{
            const res = await privateAxiosInstance.get('/cover-photo');
            if(res.status < 400){
                setCoverPhoto(res.data.image);
                setNoCoverPhoto(false);
                setCoverPhotoFetched(true)
                
            }
        }
        catch(err){
            if(err.response.data.message === 'you not have cover photo yet'){
                setCoverPhoto('')
                setNoCoverPhoto(true);
            }
           else{
            setGlobalError(true)
           }
            
        }
    };

    const getUsers = (page, limit, search) => {
      return privateAxiosInstance.get(`/users?${search && `query=${search}`}&page=${page}&limit=${limit}`);
    }

    const getfriends = (page, limit, search) => {
        return privateAxiosInstance.get(`/friendship/friends?${search && `query=${search}`}&page=${page}&limit=${limit}`)
    };

     const fetAllFriends = async() => {
        try{
            const res = await getfriends(1, 20);
            if(res.status < 400){
               setUserFriends(res.data.friends);
               setUserFriendsCount(res.data.count);
               setTotalUserFriends(res.data.totalFriends);
            };
        }
        catch(err){
           if(err.response.data.message === 'you not have friend yet'){
                setNoFriends(true);
           }
        }
    };


    const fetchDefaultFriendsToAdd = async() => {
       try{
         const res = await getUsers(1, 12);
        if(res.status < 400){
            setDefaultFriendsToAdd(res.data.users);
            setDefaultCount(res.data.count);    
                 
        }
       }catch(err){
        if(err){
            setGlobalError(true)
        }
       }
    }

    const getfriendRequest = (page, limit) => {
        return privateAxiosInstance.get(`/friendship/request?page=${page}&limit=${limit}`)
    }

    const fetchDefaultFriendsSentYouRequest = async() => {
         try {
            const res = await getfriendRequest(1, 12);
            if (res.status < 400) {
              
                setDefaultCountFriendRequest(res.data.count);
               setDefaultFriendRequest(res.data.friendRequests);
              setNoFriendRequest(false);
              setTotalFriendRequest(res.data.totalFriendRequest);
              
              
            }
        }
        catch (err) {
            
            if (err.response.data.message === 'you not have friend request yet') {
                setNoFriendRequest(true);
            }else{
                setGlobalError(true)
            }

        } 
    }

    const getFetchNotifications = (page) => {
        return  privateAxiosInstance.get(`/notification/notifications?page=${page}`);
    }

     const fetchNotifications = async() => {
            try{
            const res = await getFetchNotifications(1, 30);
            if(res.status < 400){
               setDefaultNotifications(res.data.notifications);
               setNotificationCount(res.data.count); 
            }
          }
          catch(err){
            if(err){
                setGlobalError(true)
            }
            
          }
        }

    
  const fetchAllData = async() => {
    setLoading(true)
       await Promise.all([
            fetchProfilePicture(),
            fetchCoverPhoto(),
            fetchLogginUser(),
            fetchDefaultFriendsToAdd(),
            fetchDefaultFriendsSentYouRequest(),
            fetAllFriends(),
            fetchNotifications()
       ]);
       setLoading(false);
  }

  const navigateToProfile = (user) => {
        navigate(`/profile/${user.id}`, {state: {user}});
  };
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if(accessToken){
            
            fetchAllData();
    } 
             
    }, [accessToken]);

    useEffect(() => {
        if(profilePictureFetched === true && (coverPhotoFetched === true || noCoverPhoto === true)){
        setLoading(false);
    }
    }, [profilePictureFetched, coverPhotoFetched, noCoverPhoto])

      useEffect(() => {
       
     const newSocket = io(import.meta.env.VITE_BASE_SOCKET_URL, {
        query: {
            userId: logginUser.id
        }
      });
    
    setSocket(newSocket);

    return () => {
        newSocket.disconnect();
    }
    }, [logginUser.id]);

    
//    useEffect(() => {
//   if (!logginUser?.id) return; // wait until we have the user

//   const newSocket = io(import.meta.env.VITE_BASE_SOCKET_URL, {
//     query: { userId: logginUser.id },
//     transports: ['websocket', 'polling'] // ensures compatibility with Render
//   });

//   setSocket(newSocket);

//   return () => {
//     newSocket.disconnect();
//   }
// }, [logginUser?.id]);


    return (
        <UserContext.Provider value={
            {profilePicture, setProfilePicture, fetchProfilePicture, coverPhoto, fetchCoverPhoto, noCoverPhoto, loading, 
                fetchAllData, navigateToProfile, logginUser, getUsers, defaultFriendsToAdd, defaultCount, sendFriendRequest,
                sendAcceptRequest, sendCancelFriendRequest, noFriendRequest, defaultFriendRequest, sendDeleteFriendRequest, 
                defaultCountFriendRequest, getfriendRequest, getfriends, totalFriendRequest, userFriends, userFriendsCount, totalUserFriends,
                 noFriends, socket, getFetchNotifications, defaultNotifications, notificationCount, posts, setPosts, openPostComment, setOpenPostComment,
                 commentObject, setCommentObject, likeObject, setLikeObject, openPostLike, setOpenPostLike, allowChatOpen, setAllowChartOpen,
                  runOpenChart, setRunOpenChart, postIsOpen, setPostIsOpen, leftSideBarOpen, setLeftSideBarOpen, RightSideBarOpen, 
                  setRightSideBarOpen, fetchDefaultFriendsSentYouRequest, globalerror, setGlobalError, newUser, setNewUser, newMessageArrieve, 
                  setNewmessageArrieve
            }
        }>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    return useContext(UserContext)
}