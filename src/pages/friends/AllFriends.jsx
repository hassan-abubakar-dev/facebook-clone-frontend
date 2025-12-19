import { Header } from "../../components/Header";
import FaceBookImage from '../../assets/facebook-2.png'
import { Ellipsis, Search } from "lucide-react";
import { useEffect, useState } from "react";
import ShareProfile from "./ShareProfile";
import { useUserContext } from "../../context/UserContext";

const AllFriends = () => {
    const {
        getfriends,
        userFriends,
        userFriendsCount,
        totalUserFriends,
        noFriends,
        navigateToProfile
    } = useUserContext();

    const [friends, setFriends] = useState([]);
    const [noUserFriends, setNoUserFriends] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [user, setUser] = useState({});
    const [count, setCount] = useState(0);
    const limit = 20;
    const [page, setPage] = useState(2);
    const [end, setEnd] = useState(false);
    const [noSearchFriend, setNoSearchFriend] = useState(false);
    const [totalFriends, setTotalFriends] = useState(0);

    const [isDesktop, setIsDesktop] = useState(
        window.matchMedia("(min-width: 768px)").matches
    );

    useEffect(() => {
        const media = window.matchMedia("(min-width: 768px)");
        const handler = () => setIsDesktop(media.matches);

        media.addEventListener("change", handler);
        return () => media.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        setFriends(userFriends);
        setCount(userFriendsCount);
        setTotalFriends(totalUserFriends);
        setNoUserFriends(noFriends);
    }, [userFriends, userFriendsCount, totalUserFriends, noFriends]);

    const viewProfile = (userInfo) => {
        if (isDesktop) {
            setOpenProfile(true);
            setUser(userInfo);
        } else {
            navigateToProfile(userInfo);
        }
    };

    const loadMore = async () => {
        try {
            const res = await getfriends(page, limit);
            if (res.status < 400) {
                setFriends(prev => [...prev, ...res.data.friends]);
                setPage(page + 1);
                setCount(res.data.count);
            }
        } catch (err) {
            if (err.response?.data?.message === 'you not have friend yet') {
                setEnd(true);
            }
        }
    };

    const search = async (e) => {
        try {
            const searchValue = e.target.value;
            const res = await getfriends(1, 40, searchValue.trim());
            if (res.status < 400) {
                setFriends(res.data.friends);
                setNoSearchFriend(false);
            }
        } catch (err) {
            if (err.response?.data?.message === 'you not have friend yet') {
                setNoSearchFriend(true);
            }
        }
    };

    return (
        <div className="bg-gray-100 w-screen h-screen">
            <Header />

            <div className="bg-white fixed top-0 bottom-0 left-0 md:w-[326px] w-full shadow-xl z-20 pl-3 pt-20 overflow-y-scroll">
                <p className="text-left text-[13px] text-gray-600 ml-4">
                    Friends
                </p>
                <p className="text-left text-[22px] font-bold ml-4">
                    All friends
                </p>

                <div className="text-left flex ml-2 mb-4 mt-1 md:mr-0 mr-28">
                    <div className="bg-gray-200 rounded-full p-2 z-10">
                        <Search className="w-4 h-4 text-gray-500" />
                    </div>
                    <input
                        type="text"
                        className="bg-gray-200 rounded-full h-8 -ml-6 w-[285px] outline-none pl-7"
                        onChange={search}
                        placeholder="Search friend"
                    />
                </div>

                <hr className="text-gray-300 w-[95%] mb-4" />

                <p className="text-left text-[15px] font-medium text-gray-800">
                    {friends.length > 0 && totalFriends} Friends
                </p>

                {(noFriends || friends.length === 0 || noSearchFriend) && (
                    <p className="text-left text-[13px] text-gray-600">
                        No friends to show
                    </p>
                )}

                {friends.length > 0 && friends.map(friend => (
                    <div
                        key={friend.sender.id}
                        className={`flex gap-3 items-start hover:bg-gray-300 p-2 -ml-1 rounded-md cursor-pointer ${noSearchFriend && 'hidden'}`}
                        onClick={() => viewProfile(friend.sender)}
                    >
                        <div className="w-13 h-13 rounded-full overflow-hidden mt-1">
                            <img
                                src={friend.sender?.profile?.image}
                                className="w-full h-full rounded-full"
                                alt=""
                            />
                        </div>

                        <div>
                            <p className="text-[15px] text-left font-medium mb-1 mt-4 text-nowrap">
                                {friend.sender.firstName} {friend.sender.surName}
                            </p>
                        </div>

                        <div className="w-6 pl-1 h-6 rounded-full hover:bg-gray-400 ml-auto mt-5 cursor-pointer">
                            <Ellipsis className="w-4" />
                        </div>
                    </div>
                ))}

                {!end && friends.length > 0 && (
                    <div
                        className="hover:bg-gray-300 mt-4 rounded-md font-medium text-blue-600 cursor-pointer py-1 mb-3"
                        onClick={loadMore}
                    >
                        See more
                    </div>
                )}
            </div>

            {!openProfile && (
                <div className="hidden md:block">
                    <div className="flex justify-center pt-52">
                        <img src={FaceBookImage} alt="" className="bg-gray-100 ml-32" />
                    </div>

                    {friends.length < 1 && (
                        <p className="ml-[620px] font-bold text-[18px] text-gray-500 mt-6">
                            When you have friend requests or suggestions, you'll see them here.
                        </p>
                    )}
                </div>
            )}

            <ShareProfile openProfile={openProfile} user={user} />
        </div>
    );
};

export default AllFriends;
