import { ChevronRight, Menu, Settings, X} from "lucide-react";
import { Header } from "../../components/Header";
import FriendsHome from '../../assets/friens-home.png';
import FriendSuggestion from '../../assets/friend-suggestion.png'
import FriendRequest from '../../assets/friends-request.png'
import AllFriends from '../../assets/all-friends.png';
import Birthday from '../../assets/birthday.png';
import Customlists from '../../assets/custom-lists.png'
import { AddFriends } from "./AddFriends";
import { useNavigate } from "react-router-dom";
import ConfirmFriendRequest from "./ConfirmFriendRequest";
import { useState } from "react";


const Friends = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigateTo = (route) => {
        navigate(`/friends/${route}`);
    } 
    return (
      <div className="bg-gray-100 min-h-screen">
  <Header />

  {/* MOBILE MENU BUTTON */}
  <div className="md:hidden fixed top-20 left-4 z-40">
    <div
      className="bg-white p-2 rounded-full shadow cursor-pointer"
      onClick={() => setSidebarOpen(true)}
    >
      <Menu className="w-6 h-6" />
    </div>
  </div>

  {/* SIDEBAR */}
  <div
    className={`bg-white fixed top-0 bottom-0 left-0 md:z-0 z-50 shadow-xl pt-20
      w-full md:w-[326px]
      ${sidebarOpen ? 'block' : 'hidden md:block'}
    `}
  >
    <div className="flex items-center">
      <p className="text-[22px] font-bold ml-4">Friends</p>

      {/* SETTINGS (DESKTOP) */}
      <div className="ml-auto bg-gray-200 p-2 rounded-full cursor-pointer mr-4 hidden md:block">
        <Settings className="w-6" />
      </div>

      {/* CLOSE (MOBILE) */}
      <div
        className="ml-auto bg-gray-200 p-2 rounded-full cursor-pointer mr-4 md:hidden"
        onClick={() => setSidebarOpen(false)}
      >
        <X className="w-6" />
      </div>
    </div>

    <div className="bg-gray-100 flex mt-2 py-2 mx-2 pl-2 rounded-xl cursor-pointer">
      <img src={FriendsHome} alt="" />
      <p className="text-[16px] mt-1 ml-2">Home</p>
    </div>

    <div
      className="hover:bg-gray-100 flex py-2 mx-2 rounded-xl cursor-pointer"
      onClick={() => navigateTo('requests')}
    >
      <img src={FriendRequest} alt="" />
      <p className="text-[16px] mt-1 ml-2">Friend requests</p>
      <ChevronRight className="ml-auto mt-1 text-gray-500 h-7" />
    </div>

    <div
      className="hover:bg-gray-100 flex py-2 mx-2 pl-2 rounded-xl cursor-pointer"
      onClick={() => navigateTo('suggestions')}
    >
      <img src={FriendSuggestion} alt="" />
      <p className="text-[16px] mt-1 ml-2">Suggestions</p>
      <ChevronRight className="ml-auto mt-1 text-gray-500 h-7" />
    </div>

    <div
      className="hover:bg-gray-100 flex py-2 mx-2 pl-1 rounded-xl cursor-pointer"
      onClick={() => navigateTo('lists')}
    >
      <img src={AllFriends} alt="" />
      <p className="text-[16px] mt-1 ml-2">All friends</p>
      <ChevronRight className="ml-auto mt-1 text-gray-500 h-7" />
    </div>

    <div className="hover:bg-gray-100 flex py-2 mx-2 rounded-xl cursor-pointer">
      <img src={Birthday} alt="" />
      <p className="text-[16px] mt-1 ml-2">Birthday</p>
      <ChevronRight className="ml-auto mt-1 text-gray-500 h-7" />
    </div>

    <div className="hover:bg-gray-100 flex py-2 mx-2 rounded-xl cursor-pointer">
      <img src={Customlists} alt="" />
      <p className="text-[16px] mt-1 ml-2">Custom lists</p>
      <ChevronRight className="ml-auto mt-1 text-gray-500 h-7" />
    </div>
  </div>

  {/* MAIN CONTENT */}
  <div className="pt-10 px-4 md:pl-[350px] md:pr-32">
    <ConfirmFriendRequest />
  </div>

  <div className="pt-10 px-4 md:pl-[350px] md:pr-32">
    <AddFriends />
  </div>
</div>


    );
};

export default Friends;