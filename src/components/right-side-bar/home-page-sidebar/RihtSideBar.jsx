import {Ellipsis, Search, X } from "lucide-react";
import { MetaAi } from './MetaAi';
import { Contacts } from './Contacts';
import { useEffect, useState } from "react";
import { useUserContext } from "../../../context/UserContext";

export function RightSideBar(){
    const {userFriends, userFriendsCount, totalUserFriends, getfriends, postIsOpen, RightSideBarOpen, setRightSideBarOpen} = useUserContext();

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        setContacts(userFriends);
    }, [userFriends]);

    return (
     <div className="relative">
          {contacts.length > 0 && ( <div className={`md:w-[300px] w-full pl-2 md:pl-0 pt-20 md:z-0 z-50 md-z-0 md:mt-0 -mt-7 fixed top-0 bottom-0 right-0 overflow-y-hidden bg-gray-100 
            ${postIsOpen && 'opacity-35'}  ${RightSideBarOpen ? 'block': 'hidden md:block'}`}
        >
             <X className="absolute right-4  bg-gray-300 p-1 rounded-full top-12 md:hidden block hover:bg-gray-400" onClick={() => {setRightSideBarOpen(false)}} />
            <div className="flex">
                <p>Contacts</p>
                {<Search className='ml-auto mr-5 w-5' />}
                {<Ellipsis className='mr-3'  />}
            </div>

        <MetaAi />
        
        <Contacts 
            userContacts={contacts}
            userFriendsCount={userFriendsCount}
            totalUserFriends={totalUserFriends}
            getfriends={getfriends}
        />
        </div>)}
     </div>
 );
}