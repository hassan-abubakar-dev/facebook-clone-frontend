import ProfileImage from '../../assets/profile.jpg'
import LiveVidio from '../../assets/live-vidio.png'
import PhotoVidio from '../../assets/photo-vidio.png'
import FeelingActivity from '../../assets/feeling-activity.png'
import ColorPost from '../../assets/color-post.png'
import TargPeople from '../../assets/targ-people.png'
import Location from '../../assets/location.png'
import Gif from '../../assets/gif-image.png'
import FriendsImage from '../../assets/friends-image.png'
import { X,  ChevronDown, Ellipsis, ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import privateAxiosInstance from '../../api/privateAxiosInstance'
import { useUserContext } from '../../context/UserContext'


export function Posting(){
    

    const [onChangeValue, setOnChageValue] = useState('')
    const [colorsOptionsIsOpen, setColorsOptionsIsOpen] = useState(false);
    const [uploadedPostImage, setUploadedPostImage] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(null);
    const [postColor, setPostColor] = useState(null);
    const [postOpen, setPostOpen] = useState(false);
    const {setPosts, logginUser, navigateToProfile, setPostIsOpen, setGlobalError} = useUserContext();
   const [loading, setLoading] = useState(false);

    const getPost = (e) => {
        setOnChageValue(e.target.value.trim());
    };

    const post = async() => {
        const formData = new FormData();
        if(onChangeValue.trim() !== ''){
              formData.append('content', onChangeValue);
        };

        if(fileUploaded){
            formData.append('post-image', fileUploaded);
        };

      if(postColor){
        formData.append('postColor', postColor);
      };
     
setLoading(true);
        
        try{
             formData.append('requestId', crypto.randomUUID());
             
            const res = await privateAxiosInstance.post('/create-post', formData);
            if(res.status < 400){
                setPostOpen(false);
                setPostColor(null);
                setUploadedPostImage(null);
                setOnChageValue('');
                setPostIsOpen(false);
                setLoading(false);
                 document.body.classList.remove('overflow-hidden')
                
      setPosts(prev => [{
        id: crypto.randomUUID(),
        postImage: uploadedPostImage ? uploadedPostImage: null,
        content: onChangeValue.trim() !== '' ? onChangeValue: null,
        postColor: postColor? postColor: null
      }, ...prev]);
            }
        }
        catch(err){
            if(err){
                setGlobalError(true);
                setLoading(false);
                console.log(err);
                
            }
            
        }
    };

    const openColorsOptions = () => {
        setColorsOptionsIsOpen(true);
    };

    const closeColorsOptions = () => {
        setColorsOptionsIsOpen(false);
    };

    const getPostImage = (e) => {
        const file = e.target.files[0];
        setFileUploaded(file);
      if(file){
         const fileReader = new FileReader();
         fileReader.onload = () => {
           setUploadedPostImage(fileReader.result);
            
         }
         fileReader.readAsDataURL(file);
      }
       
        
    };

    const removePostUploadedImage = () => {
        setUploadedPostImage(null);
    };

    const colors = [
    { id: 'id1', color: '#FFB6C1' },
    { id: 'id2', color: '#FFD580' },
    { id: 'id3', color: '#A7FFEB' },
    { id: 'id4', color: '#B39DDB' },
    { id: 'id5', color: '#81C784' },
    { id: 'id6', color: '#FF8A65' },
    { id: 'id7', color: '#E57373' },
    { id: 'id8', color: '#64B5F6' },
    { id: 'id9', color: '#1E88E5' },
    { id: 'id10', color: '#6A1B9A' },
    { id: 'id11', color: '#263238' },
    { id: 'id12', color: '#3949AB' },
    { id: 'id13', color: '#E53935' },
    { id: 'id14', color: '#43A047' }
];

    const getPostColor = (color) => {
        setPostColor(color);
    }
    const openPost = () => {
        setPostOpen(true);
         setPostIsOpen(true);
         document.body.classList.add('overflow-hidden')
    };

    const closePost = () => {
        setPostOpen(false);
        setPostIsOpen(false);
         document.body.classList.remove('overflow-hidden')
    }


    return (
            <div 
                    className='bg-gray-100  mb-2  pt-15 md:w-[500px] w-full overflow-x-hidden justify-self-center relative'
                >
                    <div className='bg-white shadow-xl rounded-xl ml-6 md:ml-0 '>
        
                    <div className={`mt-4 flex pb-3`}>
                        <div className='flex gap-4 ml-4 pt-3 pr-4'>
                        <img src={logginUser?.profile?.image} alt="" className='w-10 h-10 rounded-full cursor-pointer' 
                            onClick={() => navigateToProfile(logginUser)} />
                        <div
                         className='bg-gray-100 text-black flex-1 rounded-full text-[20px] p-2 cursor-pointer'
                            onClick={openPost}
                            
                         >
                            What's on your mind, {logginUser.firstName}?
                            </div>
                        </div>
        
                        <div className='flex mt-5'>
                            <div className='post-attarch  '>
                                <img src={LiveVidio} alt="live-vidio pic" className='inline-block'/>
                            </div>
        
                            <div className='post-attarch'>
                                <img src={PhotoVidio} alt="live-vidio pic" className='inline-block'/>
                            </div>
        
                            <div className='post-attarch'>
                                <img src={FeelingActivity} alt="live-vidio pic" className='inline-block'/>
                            </div>
                        </div>
                        
                    </div>
        
                    {postOpen && (
                        <div className={`bg-white z-50  fixed md:top-14 md:left-80 md:right-80 md:bottom-10 top-0 w-full md:w-auto shadow-2xl 
                            rounded-xl md:h-[540px] h-full overflow-y-scroll overflow-x-hidden 
                        `}>
                        <div className='flex'>
                            <ChevronLeft className='md:hidden block mt-3 w-8 h-8 ml-2'  onClick={closePost} />
                            <p className='mx-auto text-xl font-bold pt-3 pb-4'>Create post</p>
        
                            <div className='absolute right-3 top-3 bg-gray-200 p-1 rounded-full cursor-pointer mt-1'
                            onClick={closePost}
                            >
                                {<X />}
                            </div>
                        </div>
                        <hr />
        
                        <div className='flex gap-3 mt-3 ml-4 mb-5'>
                            <div>
                                <img src={logginUser?.profile?.image} alt="user profile"  className='rounded-full w-12 h-12'/>
                            </div>
                            <div>
                                <p className='text-sm font-bold'>{logginUser.firstName} {logginUser.surName}</p>
                                <button className='bg-gray-200 flex text-sm gap-1 align-bottom py-1 px-3 rounded-md'>
                                    <img src={FriendsImage} alt="" className='self-start mt-1' />Friends {<ChevronDown className='bg-black text-white w-3 h-3 mt-1'/>}
                                </button>
                            </div>
                        </div>
                        <textarea name="" id="" 
                            className='h-1/3  placeholder-gray-500 text-2xl focus:outline-none  pl-2 md:pl-0 md:ml-4 ml-1 w-full overflow-x-hidden overflow-y-auto 
                            border-0 resize-none break-all whitespace-pre-wrap pr-12 md:pr-0'
                            placeholder={`What's on your mind, ${logginUser.firstName}?`}   
                            style={{background: postColor ? postColor : 'white'}}
                         
                            onChange={getPost}
                        >
                            
                        </textarea>

                    {uploadedPostImage && (
                          <div className='md:w-[97%] w-full justify-self-center h-[300px] mb-5 -mt-32 rounded-xl relative '>
                         <div className='absolute right-3 top-3 bg-gray-200 p-1 rounded-full cursor-pointer'
                           onClick={removePostUploadedImage}
                            >
                                {<X className='w-4 h-4' />}
                            </div>
                        <img src={uploadedPostImage} alt="" className='w-full h-full  rounded-xl' />
                      </div>
                    )}
                       <div className={`flex ml-4 mt-6 mb-5 ${uploadedPostImage && 'hidden'}`}>
                        {!colorsOptionsIsOpen && (
                             <div className='cursor-pointer' onClick={openColorsOptions}>
                            <img src={ColorPost} alt="" className='w-10' />
                        </div>
                        )}

                        {colorsOptionsIsOpen && (
                            <div className='flex mt-1.5 gap-2'>
                            <div className='bg-gray-300 h-8 w-8 cursor-pointer rounded-md pt-1 pl-0.5' onClick={closeColorsOptions}>
                                <ChevronLeft />
                            </div>
                            {colors.map((color) => (
                                <div key={color.id} className={`h-8 w-8 cursor-pointer rounded-md`} onClick={() => getPostColor(color.color)}
                                 style={{backgroundColor: color.color}} />
                            ))}
                        
                           
                        </div>
                        )}
                       </div>
                        

                    
        
                        <div className='flex ml-4 border-2 border-gray-200  border-solid mr-4 py-5 rounded-lg pl-4 md:w-[96%] w-[81%]'>
                            <p className='inline-block'>Add to your post</p>
                            <div className='flex gap-4 ml-auto mr-4'>
                                <input type="file" name="" id="imagePost"  className='hidden' onChange={getPostImage} />
                                <label htmlFor="imagePost" className='cursor-pointer'><img src={PhotoVidio} alt="" /></label>
                                <img src={TargPeople} alt="" />
                                <img src={FeelingActivity} alt="" />
                                <img src={Location} alt="" />
                                <img src={Gif} alt="" className='md:block hidden' />
                                {<Ellipsis className='md:block hidden' />}
                            </div>
                        </div>
        {loading && <div class="w-20 z-50 hidden md:block h-20 border-4 absolute bottom-32 left-[280px] border-blue-600 border-t-transparent rounded-full animate-spin mx-auto "></div>}
                        <button
  className={`md:w-[96%] w-[81%] ml-4 mt-4 py-3 rounded-lg text-white text-sm font-medium mb-4
    ${!onChangeValue && !uploadedPostImage 
      ? "bg-gray-200 cursor-not-allowed" 
      : "bg-blue-600 cursor-pointer"
    }
  `}
  disabled={loading}
  onClick={post}
>
  Post
</button>
 {loading && <div class="w-8 h-8 border-4 md:hidden block border-blue-600 border-t-transparent rounded-full animate-spin mx-auto "></div>}
                    </div>
                    )}
        </div>
                </div>
    );
}