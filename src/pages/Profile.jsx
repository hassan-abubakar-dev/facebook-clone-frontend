import { Header } from "../components/Header";
import { Camera, ChevronDown, Ellipsis, Globe,  MessageCircle, MessageCircleMore, Pencil, Plus, Settings, Share2,
     SlidersHorizontal, ThumbsUp, Trash, Upload, UserRound, X } from "lucide-react";
import { useUserContext } from "../context/UserContext";
import { useState } from "react";
import privateAxiosInstance from "../api/privateAxiosInstance";
import FacebookImage from '../assets/facebook.png';
import Reposition from '../assets/reposition.png'
import { Posting } from "./home-page/Posting";
import FriendsImage from '../assets/friends-image.png'
import { useLocation, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import Toast from "../components/Toast";
dayjs.extend(relativeTime);
const Profile = () => {


    const { profilePicture, fetchProfilePicture, coverPhoto, fetchCoverPhoto, noCoverPhoto, logginUser, sendFriendRequest, sendCancelFriendRequest } = useUserContext();
    const [openChooseProfilePicture, setOpenChooseProfilePicture] = useState(false);
    const [openUpload, setOpenUpload] = useState(false);
    const [chooseCoverPhotoOpen, setChooseCoverPhotoOpen] = useState(false);
    const [uploadCoverPhotoHeader, setUploadCoverPhotoHeader] = useState(false);
    const [coverPhotoTooSmall, setCoverPhotoTooSmall] = useState(false);
    const [coverPhotoUploaded, setCoverPhotoUploaded] = useState('');
    const [coverPhotoFile, setCoverPhotoFile] = useState('');
    const [editCoverPhotoOptions, setEditCoverPhotoOptions] = useState(false);
    const {userFriends, postIsOpen} = useUserContext();
    const [loading, setLoading] = useState(false);
    const [requestMethod, setRequestMethod] = useState('');
    const [error, setError] = useState(false);

    const location = useLocation();

    const user = location.state?.user;
  
    const navigate = useParams();
    const userId = navigate.id;
    const logginUserId = logginUser.id;
   
    


    const [addedUserIds, setAddedeUserIds] = useState([]);

   
        const addFriend = async(id) => {
           
        try{
            const res = await sendFriendRequest(id);
            if(res.status < 400){
                setAddedeUserIds(prev => [...prev, id]);
                
            }
        }
        catch(err){
            // console.log(err.response);
            
           if(err.response.data.message === 'sorry this request already exist'){
                alert('This user is already added');
                
                setAddedeUserIds(prev => [...prev, id]);
           }else{
            setError(true)
           }
            
        }
    };

      const cancelRequest = async(receiverId) => {
        try{
            const res = await sendCancelFriendRequest(receiverId);
            if(res.status < 400){
                // console.log(res);
                setAddedeUserIds(prev => prev.filter(id => id !== receiverId));
                
            }
        }
        catch(err){
            // console.log(err);
            if(err){
                setError(true);
            }
            
        }
    }

    const openToChoose = () => {
        if(userId === logginUserId){
        setOpenChooseProfilePicture(!openChooseProfilePicture)
        }
    }
    const openUploadProfile = () => {
       if(userId === logginUserId){
             setOpenUpload(!openUpload)
        setOpenChooseProfilePicture(false)
       }
    }
    const closeOpenUpload = () => {
        if(userId === logginUserId){
            setOpenUpload(false)
        }
    }

    const uploadProfile = async (file) => {
        if(userId === logginUserId){
            setOpenUpload(false);
            setLoading(true);
        try {
            const formData = new FormData();
            formData.append('profile-image', file);
            const res = await privateAxiosInstance.patch('/profile', formData);
            if (res.status < 400) {
                setLoading(false);
                fetchProfilePicture();
            }
        }
        catch (err) {
            if (err.response.data.message === 'this type is not allow') {
                alert('this image type is not allow choose png, jpg, jpeg or jfif')
            }

        }
        }
    }
    const getProfile = (e) => {
      if(userId === logginUserId){
          const file = e.target.files[0]
        uploadProfile(file)
      }
    }
    const openChooseCoverPhoto = () => {
        if(userId === logginUserId){
            setChooseCoverPhotoOpen(!chooseCoverPhotoOpen);
        }
    }

    const getCoverPhoto = (e, action) => {

       if(userId === logginUserId){
             const file = e.target.files[0];
        if (file) {
            const fileSizeInKB = file.size / 1024;
            if (fileSizeInKB < 5) {
                setCoverPhotoTooSmall(true)
                 setEditCoverPhotoOptions(false)
                setChooseCoverPhotoOpen(false);
                document.body.classList.add('overflow-hidden');
            }
            else {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    setCoverPhotoUploaded(fileReader.result)
                    setChooseCoverPhotoOpen(false)
                    setUploadCoverPhotoHeader(true)
                    setCoverPhotoFile(file);
                    setRequestMethod(action);
                    setEditCoverPhotoOptions(false)
                }
                fileReader.readAsDataURL(file)
            }
        }
       }
    }

    const closeCoverPhotoTooSmall = () => {
        if(userId === logginUserId){
            setCoverPhotoTooSmall(false);
             document.body.classList.remove('overflow-hidden');
        }
    }

    const cancelUploadCoverPhoto = () => {
       if(userId === logginUserId){
         setCoverPhotoUploaded('');
        setUploadCoverPhotoHeader(false);
       }
    }

    const saveCoverPhotoUpload = async () => {
      if(userId === logginUserId){
          if (coverPhotoFile) {
            setLoading(true);
             const formData = new FormData();
            formData.append('cover-photo', coverPhotoFile);

            if(requestMethod === 'create'){
                try {
               
                const res = await privateAxiosInstance.post('/cover-photo', formData);
                if (res.status < 400) {
                    // console.log('create', res.data);
                    
                    fetchCoverPhoto();
                    setUploadCoverPhotoHeader(false);
                    setCoverPhotoUploaded('');
                    setLoading(false);
                }
            }
            catch (err) {
                // console.log(err.response.data);
                if(err){
                    setLoading(false);
                    setError(true);
                }
            }
            }else if(requestMethod === 'edit'){
                 try {
               
                const res = await privateAxiosInstance.patch('/cover-photo', formData);
                if (res.status < 400) {
                    console.log('edit', res.data);
                    
                    fetchCoverPhoto();
                    setUploadCoverPhotoHeader(false);
                    setCoverPhotoUploaded('');
                    setLoading(false);
                }
            }
            catch (err) {
                // console.log('err.response.data', err.response);
                if(err){
                    setLoading(false);
                    setError(true);
                }
            }
            }
            
        }
      }
    }

    const removedCoverPhoto = async () => {
       if(userId === logginUserId){
        setLoading(true);
             try {
            const res = await privateAxiosInstance.delete('/cover-photo');
            if (res.status < 400) {
                fetchCoverPhoto();
                setEditCoverPhotoOptions(false);
                setLoading(false);
            }
        }
        catch (err) {
            // console.log("err.response.data.message", err.response.data.message);

            if(err){
                setLoading(false);
                setError(true);
            }
        }
       }
    }



    const openEditCoverPhotoOptions = () => {
        if(userId === logginUserId){
            setEditCoverPhotoOptions(!editCoverPhotoOptions)
        }
    };

  
    return (
       <div className={`w-full ${coverPhotoTooSmall && 'opacity-35'} mt-10 overflow-x-hidden`}>
         <div className={`md:w-[90%] w-full  justify-self-center ${openUpload === true && 'bg-white'} ${postIsOpen && 'opacity-35'}`}>
            <Header />
            {error && <Toast message="something went wrong  try again" />}
            <div className={`bg-black/55 absolute left-0 right-0 h-16 text-white flex items-start text-[16px] font-medium 
                ${uploadCoverPhotoHeader === false && 'hidden'}`}>
                <div className="flex gap-3 mt-6">
                    <Globe className="ml-3 w-6 " />
                    <p className="md:block hidden">Your cover photo is public.</p>
                </div>
                <div className="flex gap-2 ml-auto mt-5 mr-5 ">
                    <button className="px-8 py-1.5 bg-black/50 rounded-xl cursor-pointer" onClick={cancelUploadCoverPhoto}>
                        Cancel
                    </button>
                    <button className="px-8 py-1.5 bg-blue-600 rounded-xl cursor-pointer " onClick={saveCoverPhotoUpload}>
                        Save changes
                    </button>
                </div>
            </div>
            <div className="bg-gray-200 md:w-[87%] w-full justify-self-center h-[340px] mt-5 rounded-md hover:bg-gray-300 cursor-pointer" >
                {coverPhoto && !coverPhotoUploaded && <img src={coverPhoto} alt="" className={`h-full w-full   object-cover ${noCoverPhoto === true && 'hidden'}`} />}
                {coverPhotoUploaded && <img src={coverPhotoUploaded} className={`h-full w-full   object-cover`} alt="" />}

            </div>
            <div className="bg-linear-to-t from-gray-500 to-gray-300 md:w-[87%] w-full justify-self-center h-[67px]  rounded-md -mt-5 relative" >
                <div className="w-[190px] h-[190px] rounded-full absolute top-2 md:left-10 left-24 border-4 border-white shadow-xl">
                    {profilePicture && <img src={profilePicture} alt="" className="w-full h-full object-cover rounded-full cursor-pointer"
                        onClick={openToChoose}
                    />}

                </div>

               {userId === logginUserId && ( <div
                    className="absolute -bottom-22 md:left-[205px] left-[260px] bg-gray-300 p-1 rounded-full cursor-pointer hover:bg-gray-400"
                    onClick={openUploadProfile}
                >
                    {<Camera className="w-6 h-6" />}
                </div>)}

                <div
                    className={`bg-white shadow-black shadow-xl absolute -bottom-[200px] rounded-xl md:-left-[30px]  left-8 h-13 w-[315px] top-shadow
                    ${openChooseProfilePicture === false && 'hidden'}`}
                    style={{
                        boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.2), 0px 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <div className='hover:bg-gray-200 h-9 m-2 rounded-md flex gap-3 pt-[6px] cursor-pointer pl-2'
                        onClick={openUploadProfile}
                    >
                        <Camera />
                        <p className="font-medium text-[15px]">Choose profile picture</p>
                    </div>
                </div>

               {userId === logginUserId && ( <div className={`py-2 pr-10 pl-2 bg-white md:ml-[680px] ml-[300px] hover:bg-gray-100 rounded-md cursor-pointer md:w-40 w-8 text-nowrap
                    ${coverPhoto && 'hidden'}`}
                    onClick={openChooseCoverPhoto}
                >
                    {<Camera className="w-6 h-6 inline-block" />} <p className="md:inline-block hidden">Add cover photo</p>
                </div>)}

                {userId === logginUserId && (
                <div className={`py-2 pr-10 pl-2 bg-white  md:ml-[680px] ml-[300px] hover:bg-gray-100 rounded-md cursor-pointer md:w-40 w-8 text-nowrap
                    ${!coverPhoto && 'hidden'}`}
                    onClick={openEditCoverPhotoOptions}
                >
                    {<Camera className="w-6 h-6 inline-block" />} <p className="md:inline-block hidden">Edit cover photo</p>
                </div>)}

                <div
                    className={`bg-white shadow-black shadow-xl justify-self-end pt-1px w-[315px] top-shadow mr-4 pb-2 rounded-xl -mt-42 md:mt-0
                    ${editCoverPhotoOptions === false && 'hidden'}`}
                    style={{
                        boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.2), 0px 4px 6px rgba(0, 0, 0, 0.1)'
                    }} >

                    <div className="flex flex-col justify-center ">
                        <label htmlFor="uploadEditCover" className="flex hover:bg-gray-200 ml-2 cursor-pointer mr-2 p-1 rounded-md gap-2 text-[15px] font-medium cursor-pointer mt-2">
                            <Upload />
                            <p>Upload photo</p>
                        </label>
                        <input type="file" name="" id="uploadEditCover"  accept="image/*" className="hidden" onChange={(e) => getCoverPhoto(e, 'edit')} />
                        <div className="flex hover:bg-gray-200 ml-2 mr-2 p-1 rounded-md gap-2 text-[15px] font-medium cursor-pointer mb-1">
                            <img src={Reposition} alt="" />
                            <p>Reposition</p>
                        </div>
                    </div>
                    <hr className="text-gray-400 w-[90%] justify-self-center mb-1" />
                    <div className="flex hover:bg-gray-200 ml-2 mr-2 p-1 rounded-md gap-2 text-[15px] font-medium cursor-pointer"
                        onClick={removedCoverPhoto}
                    >
                        <Trash />
                        <p>Remove</p>
                    </div>
                </div>

                <div
                    className={`bg-white shadow-black shadow-xl justify-self-end md:-mt-2 pt-[1px] h-13 w-[315px] top-shadow -mt-24
                    ${chooseCoverPhotoOpen === false && 'hidden'}`}
                    style={{
                        boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.2), 0px 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                >

                    <label htmlFor="uploadCoverPhoto" className='hover:bg-gray-200 h-9 m-2 rounded-md flex gap-3 pt-1.5 cursor-pointer pl-2 '>
                        <Upload className="w-5" />
                        <p className="font-medium text-[15px]">Choose cover photo</p>

                    </label>

                    <input type="file" name="" id="uploadCoverPhoto" className="hidden"  accept="image/*" onChange={(e ) => getCoverPhoto(e, 'create')} />

                </div>
 {loading && <div class="w-24 -mt-8 h-24 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto "></div>}
                <div className={`bg-white shadow-2xl md:w-[560px] rounded-xl fixed md:left-[350px] bottom-[200px] pl-4 pr-4 w-full
                ${!coverPhotoTooSmall && 'hidden'}`}>
                    <div className="flex mt-3 mb-2">
                        <p className="font-bold text-[18px]">Please Choose a Different Cover Photo</p>
                        <div className="p-1 rounded-full bg-gray-300 ml-auto cursor-pointer" onClick={closeCoverPhotoTooSmall}>
                            <X />
                        </div>
                    </div>
                    <p className="text-left text-[15px] mb-12">
                        This cover photo is too small. Please choose a larger cover photo.
                    </p>
                    <div className="justify-self-end mb-3">
                        <button className="bg-blue-600 px-9 py-1.5 rounded-md text-white cursor-pointer" onClick={closeCoverPhotoTooSmall}>
                            Close
                        </button>
                    </div>
                </div>

                <div className={`bg-white shadow-2xl md:w-[660px] rounded-xl fixed md:left-[350px] bottom-[130px]  w-full
                    ${openUpload === false && 'hidden'}`}
                >
                    <div className="flex  mt-4 ">
                        <p className="text-[20px] text-black font-bold ml-auto">
                            Choose profile picture
                        </p>
                        <div className="bg-gray-200 cursor-pointer p-2 rounded-full ml-auto mr-3" onClick={closeOpenUpload}>
                            <X />
                        </div>
                    </div>
                    <hr className="text-gray-300 mt-3 mb-3" />



                    <label htmlFor="uploadProfile"
                        className="bg-blue-50 hover:bg-blue-100 text-blue-600 w-[95%] h-8 rounded-md text-[15px] font-medium block pt-1
                             cursor-pointer mb-3"
                    >
                        <Plus className="inline-block w-5 ml-3 " /> Upload Photo
                    </label>

                    <input type="file" id="uploadProfile" accept="image/*" className="hidden" onChange={getProfile} />
                </div>


            </div>
            <div className="justify-self-center w-[300px] mt-36 md:mt-0 md:mb-0 mb-10">
                <p className="mt-5 text-[32px] font-bold leading-none text-left">{user.firstName} {user.surName}</p>
            </div>
            {userId === logginUserId ? (<div className="flex gap-3 justify-self-end md:mr-32 mr-0 -mt-7">
                <button className="bg-blue-600 profile-edit-story text-white text-nowrap">
                    <Plus className="inline-block w-4 h-4" /> Add to story
                </button>
                <button className="bg-gray-300 profile-edit-story text-black">
                    <Pencil className="inline-block w-4 h-4" /> Edit profie
                </button>
                <button className="bg-gray-300 profile-edit-story text-black mr-10">
                    <ChevronDown className="inline-block w-4 h-4" />
                </button>

            </div>) : (<div className="flex gap-3 justify-self-end md:mr-32 -mt-7 md:mr-32 mr-0">
                {!addedUserIds.includes(user.id) && (
                    <button className="bg-blue-600 profile-edit-story text-white " onClick={() => addFriend(user.id)}>
                    <UserRound className="inline-block w-4 h-4" /> Add friend
                </button>
                )}
                {addedUserIds.includes(user.id) && (
                    <button className="bg-gray-200 profile-edit-story  " onClick={() => cancelRequest(user.id)}>
                    <UserRound className="inline-block w-4 h-4" /> Cancel
                </button>
                )}
                <button className="bg-gray-300 profile-edit-story text-black">
                    <MessageCircleMore className="inline-block w-4 h-4" /> message
                </button>
                <button className="bg-gray-300 profile-edit-story text-black mr-10">
                    <ChevronDown className="inline-block w-4 h-4" />
                </button>

            </div>)} 
           {userId === logginUserId && userFriends.length === 0  && (
             <div className="border border-gray-300  w-[80%] justify-self-center mt-14 rounded-xl -mb-6 pl-6">
                <img src={FacebookImage} alt="" className="ml-auto mr-auto mt-8" />
                <p className=" mt-3 text-[22px] font-bold text-gray-500 ">
                    Add more friends to get recommendations
                </p>
                <p className="ml-auto mr-auto -mt-1 mb-4 text-[17px] text-gray-500">
                    When you add some more friends, you'll see a list of people that you may know here.
                </p>
            </div>
           )}
            <hr className="mt-15 text-gray-400 md:w-[80%] w-full mr-auto md:ml-[110px] " />
            <div className="md:flex block">
                <div className="text-left md:ml-[110px] md:block flex gap-0">
                    <button className="profile-sections text-blue-800">Posts</button>
                    <button className="profile-sections">About</button>
                    <button className="profile-sections">Friends</button>
                    <button className="profile-sections">Photos</button>
                    <button className="profile-sections">Reels</button>
                    <button className="profile-sections md:block hidden">Check-ins</button>
                    <button className="profile-sections">More <ChevronDown className="w-3 inline-block" /></button>
                </div>
                <button className="ml-[305px] bg-gray-300 mt-3 px-4 h-8 rounded-md cursor-pointer md:block hidden">
                    <Ellipsis className="w-5" />
                </button>
            </div>

          
        </div>
          <div className="bg-gray-100  w-full md:pl-[220px] pb-10">
                <div className="md:flex grid  pt-4 gap-4">
                    <div>
                        <div className="bg-white md:ml-3 rounded-xl">
                            <p className="text-left text-[21px] font-bold ml-4">Intro</p>
                            <div className="flex flex-col gap-5 pb-5">
                                <button className="shere-intro-buttons">Add Bio</button>
                                <button className="shere-intro-buttons">Edit detais</button>
                                <button className="shere-intro-buttons">Add Feature</button>
                            </div>
                        </div>
                        <div className=" bg-white ml-3 rounded-xl py-4 mt-4">
                           <div className="flex ">
                             <p className="text-left text-[21px] font-bold ml-4 ">Photos</p>
                            <p className="text-left text-[17px] text-blue-600 md:ml-auto ml-28 mr-4 mt-1">See All Photos</p>
                           
                           </div>
                            <div className="flex gap-2 ml-4 mt-1">
                               {user.profile && ( <img src={user?.profile?.image} alt="" className="w-24 h-24" />)}
                                {user.coverPhoto && ( <img src={user.coverPhoto.image} alt="" className="w-24 h-24" />)}
                            </div>
                        </div>
                        {/* <div className="flex  bg-white ml-3 rounded-xl py-4 mt-4">
                            <p className="text-left text-[21px] font-bold ml-4 ">Friends</p>
                            <p className="text-left text-[17px] text-blue-600 ml-auto mr-4 mt-1">See All Friends</p>
                        </div> */}
                    </div>
                    <div>
                        <Posting />
                        <div className="bg-white ml-3 rounded-xl py-4 mt-4 flex">
                            <p className="text-left text-[21px] font-bold ml-4">Posts</p>
                            <div className="ml-auto">
                                <button className="bg-gray-300 py-2 px-4 rounded-xl text-[15px] font-medium mr-2">
                                    <SlidersHorizontal className="inline-block w-4" /> Filters
                                </button>
                               {userId === logginUser.id && (
                                 <button className="bg-gray-300 py-2 px-4 rounded-xl text-[15px] font-medium ml-2 mr-4">
                                    <Settings className="inline-block w-4" /> Manage sosts
                                </button>
                               )}
                            </div>

                        </div>
                        <hr className="mt-3" />
                       {user.Posts.length < 1 && (
                         <p className=" text-gray-600 text-center text-[21px] font-bold mt-5">No posts available</p>
                       )}

                          <div className='w-full flex flex-col gap-5'>      
          {user.Posts.length > 0 && user.Posts.map((post) => {

				return (
                    
					<div key={post.id} className='bg-white rounded-xl w-[500px] mx-auto'> 
				<div className='flex gap-3 mt-3 ml-4 mb-5'>
					<div>
						<img src={user?.profile?.image} alt="user profile"  className='rounded-full min-w-12 min-h-12 max-w-12 max-h-12'/>
					</div>
					<div className="">
						<p className='text-sm font-bold'>Hassan Scientists</p>
						<div className="flex items-startj]">
                            
							<p className='text-nowrap'>{dayjs(post.createdAt).fromNow()} &middot; </p>
							<img src={FriendsImage} alt="" className='self-start  mt-1 inline-block pb-1 ml-1' />

							
                        </div>
						
					</div>
				</div>

				{post.content && <p className='ml-4 text-[18px] mb-3 wrap-break-word'  style={{backgroundColor: post.postColor}}>{post.content}</p>}
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
				
				
			</div>
            
				);
			})}

    </div>
                    </div>
                </div>
            </div>
       </div>
    );
}

export default Profile