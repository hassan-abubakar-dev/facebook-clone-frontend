
import {BellOff, Bookmark, BookMarked, BookX, CalendarDays, Ellipsis, GlobeLock, MessageCircle, Pencil, Plus, Settings, Share2, ThumbsUp, Trash2, X } from 'lucide-react'
import ProfileImage from '../../assets/profile.jpg'


import FriendsImage from '../../assets/friends-image.png'
import { useUserContext } from '../../context/UserContext';


export function Post(){

const {posts, postIsOpen, logginUser} = useUserContext();

    return(
        <div className={`w-full flex mt-4 flex-col gap-5 ${postIsOpen && 'opacity-35'}`}>      
          {posts.length > 0 && posts.map((post) => {

				return (
                    
					<div key={post.id} className='bg-white rounded-xl w-[500px] mx-auto shadow-xl'> 
				<div className='flex gap-3 mt-3 ml-4 mb-5 items-start'>
					<div>
						<img src={logginUser?.profile?.image} alt="user profile"  className='rounded-full w-12 h-12'/>
					</div>
					<div className=''>
						<p className='text-sm font-bold'>{logginUser.firstName} {logginUser.surName}</p>
						
							<p className='inline-block'>Just now  &middot; </p>
							<img src={FriendsImage} alt="" className='self-start mt-1 inline-block pb-1 ml-1' />

							
						
					</div>
					<div className='inline-block hover:bg-gray-200 ml-auto mr-2  p-2 rounded-full cursor-pointer'>
								{<Ellipsis className='inline-block '/>}
							</div>
				</div>

				{post.content && <p className='ml-4 text-[18px] mb-3' style={{backgroundColor: post.postColor}}>
					{post.content}
				</p>}
				{post.postImage && (
					<div className='w-full '>
					<img src={post.postImage} alt="" className='h-full w-full' />
				</div>
				)}
				<hr />

				<div className='flex ml-4 py-1'>
					<div className='flex gap-2   px-9.5 hover:bg-gray-200 py-1 cursor-pointer'>
						{<ThumbsUp />}
						<p>Like</p>
					</div>

					<div className='flex gap-2  px-9.5 hover:bg-gray-200 py-1 cursor-pointer' >
						{<MessageCircle />}
						<p>Comments</p>
					</div>

					<div className='flex gap-2  px-9.5 hover:bg-gray-200 py-1 cursor-pointer'>
						{<Share2 />}
						<p>Share</p>
					</div>
				</div>
				
				<div className={`absolute top-[80px] bg-white h-[390px] w-96 left-[620px] shadow-xl rounded-xl hidden`}>
					<div>
						<div className='hover:bg-gray-200 m-2 py-1 pl-2 rounded-md cursor-pointer'>
							{<Bookmark className='inline-block ' />}
							<p className='inline-block font-bold ml-3'>Save Post</p>
							<p className='ml-9 text-sm'>Add this to your saved items</p>
						</div>
					</div>
					<hr className='w-[92%] ml-auto mr-auto' />

					<div className='hover:bg-gray-200 m-2 py-1 pl-2 rounded-md cursor-pointer'
					>
						{<Pencil className='inline-block ' />}
						<p className='inline-block font-bold ml-3'>Edit Post</p>
					</div>

					<div className='cursor-pointer hover:bg-gray-200 m-2 py-1 pl-2 rounded-md'>
						{<Settings className='inline-block ' />}
						<p className='inline-block font-bold ml-3'>Edit audience</p>
					</div>

					<div className='cursor-pointer hover:bg-gray-200 m-2 py-1 pl-2 rounded-md'>
						{<BellOff className='inline-block ' />}
						<p className='inline-block font-bold ml-3'>
							Turn off notifications for this post
						</p>
					</div>

					<div className='cursor-pointer hover:bg-gray-200 m-2 py-1 pl-2 rounded-md'>
						{<GlobeLock className='inline-block ' />}
						<p className='inline-block font-bold ml-3'>Turn off translations</p>
					</div>

					<div className='cursor-pointer hover:bg-gray-200 m-2 py-1 pl-2 rounded-md'>
						{<CalendarDays className='inline-block ' />}
						<p className='inline-block font-bold ml-3'>Edit Date</p>
					</div>
					<hr className='w-[92%] ml-auto mr-auto' />
					<div className='cursor-pointer hover:bg-gray-200 m-2 py-1 pl-2 rounded-md'>
						{<BookX className='inline-block ' />}
						<p className='inline-block font-bold ml-3'>Edit to Archive</p>
					</div>

					<div className='cursor-pointer hover:bg-gray-200 m-2 py-1 pl-2 rounded-md'>
						{<Trash2 className='inline-block ' />}
						<p className='inline-block font-bold ml-3'>Move to trash</p>
						<p className='ml-9 text-sm'>items in your trash are deleted after 30 days.</p>
					</div>
				</div>
			</div>
            
				);
			})}

    </div>
    )
}
		
			