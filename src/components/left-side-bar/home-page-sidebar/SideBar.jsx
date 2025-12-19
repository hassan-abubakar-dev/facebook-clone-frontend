import { SideBarContent } from "./SideBarContent";
import Meta from '../../../assets/meta.png'
import Feeds from '../../../assets/feeds.png'
// import profileImage from '../../../assets/profile.jpg'
import { Bookmark, CalendarPlus2, ChartNoAxesColumnIncreasing, Clock, Store, TvMinimalPlay, UsersRound, Flag, Gamepad2, Gift, MessageCircleMore, SquarePlay, X, MessageSquare  } from "lucide-react";
import ChatWithAi from '../../../assets/chat-ai.png'
import GamingVidio from '../../../assets/gaming-vidio.png'
import OrdersAndPayments from '../../../assets/order-payment.png'
import RecentActivities from '../../../assets/recent-activities.png'
import { useUserContext } from "../../../context/UserContext";



export function SideBar(){
  const {postIsOpen, leftSideBarOpen, setLeftSideBarOpen} = useUserContext();
  const sideBarInformations = [
    {
      id: '536e72c2-7a2e-47cb-b0b9-57b490271a3e',
      Image: Meta,
      text: 'Meta AI',
      profile: 'image'
    },
    {
      id: 'd0190e7c-570b-45dd-acd0-69a6a5d8ecb2',
      Image: UsersRound,
      text: 'Friends', 
      profile: 'icon'
    },
    {
      id: '69f672c-ca40-445d-8a1e-babf15dd7b6f',
      Image: MessageSquare,
      text: 'Feedback',
      profile: 'icon'
    },
     {
      id: '1ae723dc-8ff8-4b91-8b74-729053248134',
      Image: Bookmark,
      text: 'Saved',
      profile: 'icon'
    },
    {
      id: '23f9b597-1f0b-4ac3-944b-2ebd60a1d118',
      Image: UsersRound,
      text: 'Groups',
      profile: 'icon'
    },
    {
      id: '3c474488-75ec-4c69-82e3-4ef2d055815b',
      Image: TvMinimalPlay,
      text: 'Vidio',
      profile: 'icon'
    },
    {
      id: '05b34115-0bba-40bf-9928-9d5b27388b0f',
      Image: Store,
      text: 'Marketplace',
      profile: 'icon'
    },
     {
      id: 'b3121f3f-c92a-4022-b088-6a64b84b80dc',
      Image: Feeds,
      text: 'Feeds',
      profile: 'image'
    },
    {
      id: '129d674a-af7f-4130-9e82-274c1d8fb350',
      Image: CalendarPlus2,
      text: 'Events',
      profile: 'icon'
    },
    {
      id: '1d92dd3d-f131-4ec4-9e6d-2c44223271f9',
      Image: ChartNoAxesColumnIncreasing,
      text: 'Ads Manager',
      profile: 'icon'
    },
    {
          id: '0ce6da5c-1bdf-4105-a111-8f9f1dea220a',
          Image: Gift,
          text: 'Birthdays',
          profile: 'icon',
          more:true
        },
        {
          id: '0ce6da5c-1bdf-8k05-a277-8f9f1dea220a',
          Image: ChatWithAi,
          text: 'Chat with AIs',
          profile: 'image',
           more:true

        },
        {
          id: '0ce6da5c-1bdf-4105-a876-8f9f1dea220a',
          Image: GamingVidio,
          text: 'Gaming Vidio',
          profile: 'image',
           more:true

        },
        {
          id: '0ce6da5c-1bdf-9432-a277-8f9f1dea220a',
          Image: MessageCircleMore,
          text: 'Messanger',
          profile: 'icon',
           more:true
        },
        {
          id: '0ce6da5c-1bdf-8760-a277-8f9f1dea220a',
          Image: MessageCircleMore,
          text: 'Messanger Kids',
          profile: 'icon',
           more:true
        },
         {
          id: '0ce6da5c-1bdf-g430-a277-8f9f1dea220a',
          Image: OrdersAndPayments,
          text: 'Orders and Payments',
          profile: 'image',
           more:true
        },
        {
          id: '0ce6da5c-1bdf-0987-a277-8f9f1dea220a',
          Image: Flag,
          text: 'Pages',
          profile: 'icon',
           more:true
        },
         {
          id: '0ce6da5c-1bdf-0tg4-a277-8f9f1dea220a',
          Image: Gamepad2,
          text: 'play games',
          profile: 'icon',
           more:true
        },
         {
          id: '0ce6da5c-1bdf-65fg-a277-8f9f1dea220a',
          Image: RecentActivities,
          text: 'Recent ad activity',
          profile: 'images',
           more:true
        },
         {
          id: '0ce6da5c-1bdf-65dr-a277-8f9f1dea220a',
          Image: SquarePlay,
          text: 'Reels',
          profile: 'icon',
           more:true
        },
         
    
  ]


  
    return (
      <div className={`md:w-[300px] w-full bg-gray-100   fixed top-0 bottom-0 overflow-y-auto md:z-0 -ml-10 z-50 -mt-14 md:mt-0
         ${leftSideBarOpen ? 'block': 'hidden md:block'} ${postIsOpen && 'opacity-35'}
      `} >
        <X className="absolute right-8  bg-gray-300 p-1 rounded-full top-18 md:hidden block hover:bg-gray-400" onClick={() => {setLeftSideBarOpen(false)}} />
        <SideBarContent 
          sideBarInformations={sideBarInformations}
       />
        
      </div>
    );
}