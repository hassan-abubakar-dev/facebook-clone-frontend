import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { SendHorizonal } from "lucide-react";
import { Header } from "../components/Header";
import privateAxiosInstance from "../api/privateAxiosInstance";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const [loading, setLoading] = useState(false);
  const {logginUser} = useUserContext();
  const [comment, setComment] = useState('');
  const [error, setError] = useState(false)
  const navigate = useNavigate();
  const getComment = (e) => {
    setComment(e.target.value.trim());
  }

  const send = async() => {
    setLoading(true)
    try{
      setLoading(false);
      const res = await privateAxiosInstance.post('/feedback', {message: comment});
      if(res.status < 400){
        setLoading(false);
        navigate('/home');
      }
    }
    catch(err){
      if(err){
       setError(true);
      }
      
    }
  }
    return (
          <div>
            <Header />

            <p className="justify-self-center mt-20 font-bold text-[20px]">send your Feedback</p>
    <div className="relative">

      {loading && (
        <div className="w-20 h-20 border-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      )}
       {error && <Toast message="something went wrong  try again" />}

     <div className="relative w-full">
  {/* Cover photo */}
  <div className="w-full md:w-[85%] mx-auto h-[200px] md:h-[340px] mt-5 rounded-md bg-gray-200 overflow-hidden">
    {logginUser.coverPhoto && (
      <img
        src={logginUser.coverPhoto.image}
        alt=""
        className="h-full w-full object-cover"
      />
    )}
  </div>

  {/* Profile photo */}
  <div className="
    w-[120px] h-[120px] md:w-[165px] md:h-[165px]
    rounded-full absolute
    left-1/2 transform -translate-x-1/2
    bottom-[-60px] md:bottom-[-80px]
    border-4 border-white shadow-xl
  ">
    {logginUser.profile && (
      <img
        src={logginUser?.profile?.image}
        alt=""
        className="w-full h-full object-cover rounded-full"
      />
    )}
  </div>
</div>

{/* User name */}
<div className="mt-20 md:mt-24 text-center">
  <p className="text-[22px] md:text-[30px] font-bold">
    {logginUser.firstName} {logginUser.surName}
  </p>
</div>

    

      
                     <div className="flex gap-2  items-start mt-52 ml-3 sticky bottom-0 border-t-gray-300 border-t bg-white py-4 w-full md:w-[80%] mr-3 md:mr-0 z-50">
                            <img src={logginUser?.profile?.image} alt="" className="rounded-full w-12 h-12" />
                            <div className=" rounded-xl py-1 px-2 w-[96%] text-wrap bg-gray-200">
                                <input type="text" name="" id="" className="w-full border-none focus:outline-none" onChange={getComment} />
                               
                               <div className={`justify-self-end mb-3  p-2 mr-3
                                    ${comment ? 'cursor-pointer hover:bg-gray-400 rounded-full text-blue-600': 'cursor-not-allowed '}`}
                                    onClick={send}
                               >
                                 <SendHorizonal className="w-4 h-4" />
                               </div>
                            </div>
                        </div>

    </div>
  </div>
    );
};

export default Feedback;