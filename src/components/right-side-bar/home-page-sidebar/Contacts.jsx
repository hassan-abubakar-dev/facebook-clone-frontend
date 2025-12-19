
import { ChevronDown, CirclePlus, Images, Lock, Meh, Mic, Minus, Phone, Plus, RectangleVertical, SendHorizonal, Sticker, SunDim, ThumbsUp, Video, X } from 'lucide-react';

import { useEffect, useRef, useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import privateAxiosInstance from '../../../api/privateAxiosInstance';
import Toast from '../../Toast';
export function Contacts({userContacts, userFriendsCount, totalUserFriends, getfriends}){

   const {socket, setNewmessageArrieve} = useUserContext();
   const socketRef = useRef(null);
   const [messageSendersIds, setMessageSendersIds] = useState([])
   

    useEffect(() => {
       
        socketRef.current = socket;

        const handleMessage =  (data) => {
              setChatMessages(prev => [...prev, data]);
             if(data.senderId !== logginUser.id){
                 setNewmessageArrieve(prev => prev + 1);

                 const senderId = data.senderId  

         setMessageSendersIds(prev => {
    if (prev.includes(senderId)) return prev; 
    return [...prev, senderId];
  })
       
             }
            
        
        }
     
      socketRef.current.on('new-message', handleMessage);

     return () => {
        socketRef.current.off('new-message', handleMessage)
     }
    
    }, [socket])

        const {logginUser} = useUserContext();
        const [contacts, setContacts] = useState([]);
        const [totalContact, setTotalContact] = useState(0);
        const [count, setCount] = useState(0);
        const [contact, setContact] = useState(null);
        const [page, setPage] = useState(2);
        const [end, setEnd] = useState(false);
        const limit = 12;
         const [error, setError] = useState(false);
        
        useEffect(() => {
            setContacts(userContacts);
            setTotalContact(userFriendsCount);
            setCount(totalUserFriends);
            
        }, [userContacts,userFriendsCount , totalUserFriends]);
    


    const [textValueLength, setTextValueLength] = useState(0);
    const [inputText, setInputText] = useState('');
    const [opentToChart, setOpenToChart] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);


    function close(){
        setOpenToChart(false);
    }

 const open = async(contact) => {
    let roomId;
    let senderParticipantId;
   
    try{
        const res = await privateAxiosInstance.post('/chat/roomId', {receiverId: contact.id});
        if(res.status < 400){ 
            roomId = res.data.roomId
            senderParticipantId = res.data.senderParticipantId;   
        }
    }
    catch(err){
       if(err){
        setError(true);
       }
        
    }
      try{
            const res = await privateAxiosInstance.post('/chat/chats', {roomId});
            if(res.status < 400){

             setChatMessages(res.data.messages);
             if(messageSendersIds?.includes(contact.id)){
                
             setMessageSendersIds(prev => prev.filter(senderId => senderId !== contact.id)
         );
             }
            }
        }
        catch(err){
            if(err){
        setError(true);
       }
            
        };

        socketRef.current.emit('new-connection', {
            roomId,
            senderParticipantId,
        });
    setOpenToChart(true);
        setContact(contact);
 }
    function hideLeftToMessage(e){

        setInputText(e.target.value);
       
        setTextValueLength((e.target.value).trim().length)
        if(e.target.value === 'Enter'){
            alert('wow')
        }

    }

    function send(){
       
        socketRef.current.emit('new-message', {senderId: logginUser.id, message: inputText});
        setInputText('')
    }

    function autoSend(e){
        if(e.key === 'Enter'){
            send()
        }
    }

    
    const loadMore = async() => {
        try{
            const res = await getfriends(page, limit);
            if(res.status < 400){
                setContacts(prev => [...prev, ...res.data.friends]);
                setPage(page + 1);
                setCount(res.data.count);
            };
        }
        catch(err){
            if(err.response.data.message === 'you not have friend yet'){
                setEnd(true)
            }
            
        }
    }


    return (
         <div className='overflow-x-hidden'>
            {error && <Toast message="something went wrong  try again" />}
            {contacts.length > 0 && contacts.map((contact) => {
                return (
                    <div key={contact.id} className='flex cursor-pointer mb-3 hover:bg-gray-200 hover:p-2 hover:rounded-xl p-2' 
                        onClick={() => open(contact.sender)}
                    > 
            <div className='relative  w-10 h-10 rounded-full'>
                <img src={contact.sender?.profile?.image} alt="" className='rounded-full ' />
                {messageSendersIds?.includes(contact.sender.id) &&  (
                    <div className='absolute w-2 h-2 rounded-full bg-red-500 top-3 right-0 ' />
                )}
            </div>
            <p className='mt-2 ml-4 mr-1 '>{contact.sender.firstName} {contact.sender.surName}</p>
        </div>
                );
            })}
           
           {!count < limit && <div className={`${end && 'hidden'}`}>
                  <div className={`hover:bg-gray-300 mt-4 rounded-md font-medium text-blue-600 cursor-pointer py-1 mb-3 
               `
            } 
                     onClick={loadMore}
                    >
                        See more
                    </div>
          </div>}

          <p className='hidden'>{totalContact}</p>

       {contact && (
             <div 
            className={
                `flex-1 overflow-x-hidden z-50 md:top-[170px] top-0 bg-white fixed bottom-0 w-full pb-20 md:right-[70px] md:w-[311px] shadow-xl pt-6 md:pt-0
                ${opentToChart === false && 'hidden'}` 
            }
        >
            <div className=' fixed z-20 bg-white '>
                   <div className='flex pt-3 mb-2'>
                <div className='flex ml-3 gap-2'>
                    <img src={contact?.profile?.image} alt="" className='rounded-full w-8 h-8' />
                    <div>
                         <p className='text-[14px] font-medium -mt-1 w-29'>{contact.firstName} {contact.surName}</p>
                          <p className='text-sm text-gray-400 -mt-1 text-[13px] '>active now</p>
                    </div>
                   
                   
                    {<ChevronDown className='w-4 text-purple-600 ml-44 md:ml-auto'/>}
                </div>

                <div className='flex md:ml-auto gap-2  md:mr-2'>
                    {<Phone className='text-purple-600 w-5  strokeWidth={3}'/>}
                    {<Video  className='text-purple-600 w-5' />}
                   <div className='w-6 h-6 pl-0.5 cursor-pointer hover:bg-gray-200 rounded-full'  onClick={close}>
                     {<Minus className='text-purple-600 w-5  strokeWidth={3}'  />}
                   </div>
                   <div className='w-6 h-6 pl-0.5 cursor-pointer hover:bg-gray-200 rounded-full' onClick={close}  >
                    {<X className='text-purple-600 w-5'/>}
                   </div>
                    
                </div>

                
            </div>
               <hr className='' />
            </div>
         

         
        <div className=' overflow-x-hidden mt-16'>
            <div>

            <div className='flex flex-col '>
                <img src={contact?.profile?.image} alt="" className='ml-auto mr-auto rounded-full w-15 h-15' />
                <p className='ml-auto mr-auto font-medium text-[15px]'>{contact.firstName} {contact.surName}</p>

                <p className='text-[12px] ml-5 text-gray-500 mt-7 text-center w-[83%] leading-4'>
                   <Lock className='inline-block w-3 text-black font-bold' /> 
                   Messages and calls are secured with end-to-end encryption. Only people in this chat can read, listen to, or share them. Learn More
                </p>
            </div>

            
                {
                chatMessages.map(message => (
                    <div key={message.id} className='flex  items-start px-2.5'>
                       {logginUser.id !== message.senderId && (
                         <div className='h-7 w-7 rounded-full mt-1 mr-1'>
                            <img src={contact?.profile?.image} alt="" className='w-full h-full rounded-full' />
                        </div>
                       )}
                        <p className={` mr-5  mt-1 text-[16px] py-1 px-3 leading-5 rounded-2xl max-w-32
                            ${message.senderId === logginUser.id ? 'bg-blue-600 ml-auto  text-white ': 'bg-gray-200 text-black'}`
                        }>
                            {message.message}
                        </p>
                    </div>
                ))}
            

          
             <p className={`mt-40 mb-20 justify-self-center text-xs ${chatMessages.length !== 0 && 'hidden'}  text-gray-500`}>
                You're now friends with {contact.firstName}.
            </p>

            <div className={`mt-64 ${chatMessages.length === 0 && 'hidden'}`}></div>

            </div>

            <div className=' flex'>
               <div className={`flex ${textValueLength === 0 ? '' : 'hidden'} `}>
                <div className='hover:bg-gray-200 w-8 h-8 pt-1.5 pl-1.5 rounded-full ml-1 cursor-pointer'>
                     {<Mic className='text-blue-500 w-5 h-5' />}
                </div>
               <div className='hover:bg-gray-200 w-8 h-8 pt-1.5 pl-1.5 rounded-full cursor-pointer'>
                     {<Images className='text-blue-500 w-5 h-5' />}
                </div>
                
                <div className='hover:bg-gray-200 w-8 h-8 pt-1.5 pl-1.5 rounded-full cursor-pointer'>
                     {<Sticker className='text-blue-500 w-5 h-5' />}
                </div>
               <div className='hover:bg-gray-200 p-2 rounded-full cursor-pointer'>
                    <div className='bg-blue-500 h-4 w-4 rounded-md text-white text-[12px] font-medium'>Gif</div>
                </div>
                
               </div>

              
                   <div className={`hover:bg-gray-200 min-w-7 h-7 pt-1.5 pl-1.5  rounded-full ml-1 mr-2  cursor-pointer ${textValueLength === 0 && 'hidden'}`}>
                     {<CirclePlus className='text-blue-600 w-4 h-4' />}
                </div>
            

               <div className='flex -mt-1'>
                <input type="text" placeholder='Aa' 
                  className={`h-8.5  bg-gray-200  mb-3  border-none rounded-full pl-2 focus:outline-none ${textValueLength === 0 ? 'md:w-32 w-[220px]' : 'md:w-[220px] w-[400px]'}`}
                  onChange={hideLeftToMessage}
                  value={inputText}
                  onKeyDown={autoSend}
                  
               />

                <div className='bg-gray-200 rounded-full p-2 h-8.5 -ml-9 '>
                    {<Meh  className='text-blue-500 w-5 h-5'/>}
                </div>
                <div className={`hover:bg-gray-200 h-7 w-7 pt-1 pl-1.5 rounded-full ml-1 cursor-pointer ${textValueLength !== 0 && 'hidden'}`}>
                    {<ThumbsUp className='text-blue-800 w-5 h-5' />}
                </div>

                 <div className={`hover:bg-gray-200 w-7 h-7 pt-1 pl-1.5 rounded-full ml-1 cursor-pointer ${textValueLength === 0 && 'hidden'}`}
                  onClick={send}
                 >
                    {<SendHorizonal className='text-blue-800 w-5 h-5' />}
                </div>
               </div>
            </div>
        </div>
   
        </div>
       )}
         </div>
    );
}