import MockProfile from '../../assets/hassan 2.jpg'
import Profile2 from '../../assets/story-2.jpg'
import Profile3 from '../../assets/story-3.jpg'
import Stori1 from '../../assets/story-1.jpg'
import Stori2 from '../../assets/story-2.jpg'
import Stori3 from '../../assets/story-3.jpg'
import Stori4 from '../../assets/story-4.jpg'
import {ChevronLeft, ChevronRight, Ellipsis, MessageCircle, Plus, Share2, ThumbsUp, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react'
import privateAxiosInstance from '../../api/privateAxiosInstance'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'


export function Stories(){

    const [loadingStories, setLoadingStories] = useState(true);
    const {postIsOpen, logginUser, navigateToProfile} = useUserContext();

    const friendsElement = useRef(null);
    const navigate = useNavigate();
const [stories, setSties] = useState([]);
       function scrollLeft(){
        const container = friendsElement.current;

        if(container){
            container.scrollBy({
                left: -200,
                behavior: 'smooth'
            })
        }
    }
    function scrollRight(){

         const container = friendsElement.current;

         if(container){
            container.scrollBy({
                left: 200,
                behavior: 'smooth'
            })
         }

    }

    useEffect(() => {
        const fetchStories = async() => {
            try{
                const res = await privateAxiosInstance.get('/stories');

                if(res.status < 400){
                  
                    setLoadingStories(false);
                    setSties(res.data.stories)
                }
            }
            catch(err){
                if(err){
                    setLoadingStories(false);
                }
            
                
            }
        };

        fetchStories();
    }, []);
   

    const navigateToStory = () => {
        navigate('/story/create')
    }
   

    return (
        	<div className={`md:w-[500px] md:ml-0 ml-20 w-[450px] justify-self-center z-50  ${postIsOpen && 'hidden'} `}>
			<div  className='flex gap-2 mt-4  overflow-x-hidden ' ref={friendsElement}>

				<div className={`w-28 min-w-28 h-48 bg-white shadow-xl rounded-xl  relative cursor-pointer`} onClick={navigateToStory}>
					<img src={logginUser?.profile?.image} alt="" className='w-full ' />
					<div className={`absolute bg-blue-700 p-1 rounded-full text-white left-10 bottom-2`}>
						{<Plus />}
					</div>
					<p className='pt-4 text-center'>Create Story</p>
				</div>

  {loadingStories && [1,2,3].map((i) => (
      <div
        key={i}
        className="w-28 min-w-28 h-48 rounded-2xl shadow-md bg-gray-800 overflow-hidden relative animate-pulse"
      >
        {/* Story image placeholder */}
        <div className="w-full h-full bg-gray-500"></div>

        {/* Profile image circle */}
        <div className="w-12 h-12 bg-gray-500 rounded-full border-4 border-gray-600 absolute top-4 left-3"></div>

        {/* User name placeholder */}
        <div className="absolute bottom-2 left-2 w-20 h-3 bg-gray-500 rounded"></div>
      </div>
    ))}
				{stories.map((story) => {
					return (
						
				<div key={story.id} className={`w-28 min-w-28   bg-white  h-48 rounded-2x relative shadow-md overflow-y-hidden`}>
					{story.image && (<img src={story.image} alt="" className='w-full h-full object-cover position-top '/>)}
                   {story.text &&  <p className='mt-17 mx-2 text-sm wrap-break-word leading-4 h-[200px] overflow-hidden'>{story.text}</p>}
					<div className='w-10 h-10 border-4 border-blue-700 rounded-full absolute top-4 left-3 cursor-pointer' onClick={() => {navigateToProfile(story.User)}}>
						<img src={story.User?.profile?.image} alt="" className='w-full h-full rounded-full'/>
					</div>
					<p className='absolute -top-0.5 leading-[19px] ml-1    font-bold'>
                        {story.User.firstName}
                    </p>
				</div>
					);
				})}
                 <div className="flex gap-3">
  
  </div>

				
			</div>
			
		{stories.length > 2 && (
            	<div className='absolute flex top-[250px] md:gap-[370px] gap-[300px] ml-4 '>

			<div className='bg-white rounded-full p-3  cursor-pointer left-3 '
                 onClick={scrollLeft}
			
			>
					{<ChevronLeft />}
				</div>

				<div className='bg-white rounded-full p-3  right-10 cursor-pointer '
                    onClick={scrollRight}

				>
					{<ChevronRight />}
				</div>
				</div>
        )}
				</div>
    );
}