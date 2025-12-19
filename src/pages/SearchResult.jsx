import { BoomBox, CalendarX, Columns2, Flag, Menu, Store, UserRound, Users, UsersRound, X, Youtube } from "lucide-react";
import { Header } from "../components/Header";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Toast from "../components/Toast";
const SearcResult = () => {
    const location = useLocation()

const {sendFriendRequest, sendCancelFriendRequest, navigateToProfile} = useUserContext();

    const [filtersValue, setFilterValue] = useState('all');
     const usersSearch = location.state?.usersSearch || [];
    const firstUser = location.state?.firstUser || {};
    const [addedUserIds, setAddedeUserIds] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const users = usersSearch.filter(user => user.id !== firstUser.id);
       const [error, setError] = useState(false);
   
    const updateFilterValue = (value) => {
        setFilterValue(value)
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
    }

    return (
       <div className="bg-gray-200 min-h-screen">
  <Header />
{error && <Toast message="something went wrong  try again" />}
  {/* Sidebar */}
  <div className={`bg-white fixed top-0 left-0 bottom-0 w-full md:w-[360px] shadow-xl md:pt-20 pt-6  pl-4 overflow-y-auto z-50 md:z-0
    ${sidebarOpen ? 'block':'md:block hidden'}`}
>
    
    {/* Close button for mobile */}
    <div className="md:hidden flex justify-end absolute pr-3 pt-2 right-2 top-4">
      <button className="p-2 rounded-full hover:bg-gray-200" onClick={() => setSidebarOpen(false)}>
        <X />
      </button>
    </div>

    <p className="text-[25px] font-bold mb-2">Search results</p>
    <hr className="text-gray-300" />
    <p className="font-medium mt-3">Filters</p>

    {[
      { value: 'all', Icon: Columns2, label: 'All' },
      { value: 'posts', Icon: BoomBox, label: 'Posts' },
      { value: 'peoples', Icon: UsersRound, label: 'Peoples' },
      { value: 'reels', Icon: Youtube, label: 'Reels' },
      { value: 'market-place', Icon: Store, label: 'Market place' },
      { value: 'pages', Icon: Flag, label: 'Pages' },
      { value: 'groups', Icon: UserRound, label: 'Groups' },
      { value: 'events', Icon: CalendarX, label: 'Events' },
    ].map((filter) => (
      <div
        key={filter.value}
        className={`flex py-2 mx-2 pl-2 rounded-xl cursor-pointer -ml-2 ${
          filtersValue === filter.value ? 'bg-gray-100' : 'hover:bg-gray-100'
        }`}
        onClick={() => updateFilterValue(filter.value)}
      >
        <div
          className={`p-2 rounded-full ${
            filtersValue === filter.value ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}
        >
          <filter.Icon className="w-5 h-5" />
        </div>
        <p className="text-[15px] mt-2 ml-2 font-medium">{filter.label}</p>
      </div>
    ))}
  </div>

  {/* Main content */}
  <div className="md:ml-[360px] w-full md:w-auto px-4 md:pt-28 pt-20 pb-10">
    <Menu className="mb-4 md:hidden block"  onClick={() => setSidebarOpen(true)} />
    <div className="flex flex-col gap-4">
      
      {/* First suggested user */}
      <div className="flex flex-col md:flex-row gap-4 ">
        <div className="flex items-start bg-white rounded-xl p-3 w-full md:w-full">
          <img src={firstUser?.profile?.image} className="w-12 h-12 rounded-full cursor-pointer" alt="" onClick={() => {navigateToProfile(firstUser)}} />
          <p className="font-medium mt-3 ml-3">{firstUser.firstName} {firstUser.surName}</p>
          {!addedUserIds.includes(firstUser.id) && (
            <button
              className="ml-auto text-blue-700 bg-green-100 rounded-md font-medium px-4 py-1 mt-2.5 cursor-pointer"
              onClick={() => addFriend(firstUser.id)}
            >
              Add friend
            </button>
          )}
          {addedUserIds.includes(firstUser.id) && (
            <button
              className="ml-auto text-black bg-gray-200 rounded-md font-medium px-4 py-1 mt-2.5  cursor-pointer"
              onClick={() => cancelRequest(firstUser.id)}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* More people */}
      <div className="bg-white rounded-xl p-3">
        <p className="text-left text-[17px] font-bold mb-2">More people</p>
        <div className="flex flex-col">
          {users.map((user) => (
            <div key={user.id} className="flex items-start gap-3 bg-white rounded-xl p-3">
              <img src={user?.profile?.image} className="w-12 h-12 rounded-full cursor-pointer" alt=""  onClick={() => {navigateToProfile(user)}} />
              <p className="font-medium mt-2.5 ml-3">{user.firstName} {user.surName}</p>
              {!addedUserIds.includes(user.id) && (
                <button
                  onClick={() => addFriend(user.id)}
                  className="ml-auto text-blue-700 bg-green-100 rounded-md font-medium px-4 py-1 cursor-pointer"
                >
                  Add friend
                </button>
              )}
              {addedUserIds.includes(user.id) && (
                <button
                  onClick={() => cancelRequest(user.id)}
                  className="ml-auto text-black bg-gray-200 rounded-md font-medium px-4 py-1 cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
</div>


    );
};

export default SearcResult;