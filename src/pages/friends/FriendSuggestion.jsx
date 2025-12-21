import { Header } from "../../components/Header";
import FaceBookImage from '../../assets/facebook-2.png';
import { useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { ArrowLeft} from "lucide-react";
import ShareProfile from "./ShareProfile";
import Toast from "../../components/Toast";

const FriendSuggestion = () => {
    const {
        defaultFriendsToAdd,
        defaultCount,
        getUsers,
        sendFriendRequest,
        sendCancelFriendRequest,
        navigateToProfile
    } = useUserContext();

    const location = useLocation();

    const [users, setUsers] = useState(location.state?.users || defaultFriendsToAdd);
    const [count, setCount] = useState(location.state?.count || defaultCount);
    const [page, setPage] = useState(location.state?.page || 2);
    const [openProfile, setOpenProfile] = useState(false);
    const [user, setUser] = useState({});
    const [addedUserIds, setAddedeUserIds] = useState([]);
    const [error, setError] = useState(false);

    const [isDesktop, setIsDesktop] = useState(
        window.matchMedia("(min-width: 768px)").matches
    );

    const limit = 12;

    useEffect(() => {
        const media = window.matchMedia("(min-width: 768px)");
        const handler = () => setIsDesktop(media.matches);

        media.addEventListener("change", handler);
        return () => media.removeEventListener("change", handler);
    }, []);

    const loadMore = async() => {
        try{
            const res = await getUsers(page, limit);
            if(res.status < 400){
                setCount(res.data.count);
                setPage(page + 1);
                setUsers([
                    ...users,
                    ...res.data.users
                ]);
            }
        }
        catch(err){
            if(err){
                setError(true);
            }
        }
    }

    const back = () => {
        window.history.back();
    }
    
    const viewProfile = (userInfor) => {
        if(isDesktop){
            setOpenProfile(true);
            setUser(userInfor);
        }else{
            navigateToProfile(userInfor);
        }
    }

    const remove = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

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
    }

    return (
        <div className="h-screen w-screen">
            <Header />
          {error && <Toast message="something went wrong  try again" />}
            <div className="bg-white fixed top-0 bottom-0 left-0 w-[332px] z-20 shadow-xl  pl-3 pt-20 overflow-y-scroll">
                <p className="text-left text-[13px] text-gray-600 ml-10 -mb-3">
                    Friends
                </p>

                <div className="hover:bg-gray-200 w-6 h-6 rounded-full cursor-pointer" onClick={back}>
                    <ArrowLeft className="text-gray-500 h-5 " />
                </div>

                <p className="text-left text-[22px] font-bold  -mt-3 ml-10">
                    Suggestions
                </p>

                <p className="text-left text-[15px] font-medium text-gray-800 mb-2">
                    People you may know
                </p>

                <div className="flex flex-col gap-2">
                    {users.map(user => (
                        <div
                            key={user.id}
                            className="flex gap-3 items-start hover:bg-gray-300 p-2 rounded-md cursor-pointer"
                            onClick={() => viewProfile(user)}
                        >
                            <div className="min-w-13 min-h-13 max-w-13 max-h-13 rounded-full overflow-hidden mt-1">
                                <img src={user?.profile?.image} className="w-full h-full rounded-full" alt="" />
                            </div>

                            <div>
                                <p className="text-[15px] text-left text-nowrap">
                                    {user.firstName} {user.surName}
                                </p>

                                {!addedUserIds.includes(user.id) && (
                                    <button
                                        className="text-white text-[13px] cursor-pointer py-1.5 px-7 rounded-md font-medium text-nowrap mr-3 bg-blue-500"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addFriend(user.id)
                                        }}
                                    >
                                        Add friend
                                    </button>
                                )}

                                {addedUserIds.includes(user.id) && (
                                    <p className="text-[12px] mt-1 text-gray-500">Request sent</p>
                                )}
                            </div>

                            {!addedUserIds.includes(user.id) && (
                                <button
                                    className="text-[13px] cursor-pointer absolute -right-2 py-1.5 px-7 text-nowrap rounded-md font-medium mr-3 bg-gray-200 mt-5.5"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        remove(user.id)
                                    }}
                                >
                                    Remove
                                </button>
                            )}

                            {addedUserIds.includes(user.id) && (
                                <button
                                    className="text-[13px] cursor-pointer ml-auto text-nowrap py-1.5 px-2.5 rounded-md font-medium bg-gray-200"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        cancelRequest(user.id)
                                    }}
                                >
                                    Cancel request
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div
                    className={`hover:bg-gray-300 mt-4 rounded-md font-medium text-blue-600 cursor-pointer py-1 mb-3 ${count < limit && 'hidden'}`}
                    onClick={loadMore}
                >
                    See more
                </div>
            </div>

            {!openProfile && (
                <div className="pt-10 bg-gray-100 h-screen hidden md:block">
                    <div className="flex justify-center pt-52">
                        <img src={FaceBookImage} alt="" className="bg-gray-100 ml-[200px]" />
                    </div>
                    <p className="ml-[620px] font-bold text-[18px] text-gray-500 mt-6">
                        Select people's names to preview their profile.
                    </p>
                </div>
            )}

            <ShareProfile openProfile={openProfile} user={user} add={true} />
        </div>
    );
};

export default FriendSuggestion;
