import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import privateAxiosInstance from "../api/privateAxiosInstance";
import { Header } from "../components/Header";
import Toast from "../components/Toast";

const AdminFeedback = () => {

const {logginUser} = useUserContext();
const [feedbacks, setFeedbacks] = useState([]);
const [error, setError] = useState(false);

useEffect(() => {
 const fetchFeedbacks = async() => {
    try{
    const res = await privateAxiosInstance.get('/feedback');
    if(res.status < 400){
      setFeedbacks(res.data.feedbacks);
      
    }
}
catch(err){
 
  if(err){
    setError(true);
  }
}
  };


  fetchFeedbacks();
}, [])

if(logginUser.role !== 'admin'){
  return (
    <div className="font-bold text-[35px] mt-10 text-red-500 justify-self-center">
      403 
    </div>
  )
}else{
  return (
    <div className="h-screen flex bg-gray-100 justify-self-center w-screen pt-25">
      {error && <Toast message="something went wrong  try again" />}
      {/* LEFT: Feedback List */}
      <Header />
         {feedbacks.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No feedback yet
          </p>
        )}
        <div className="p-4 text-xl font-bold border-b block justify-self-center text-center">Feedbacks</div>

    

        {feedbacks.length > 0 && (
        <div className="flex flex-col gap-2 mx-3 mt-20">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="flex gap-2 items-start flex-wrap">
              <img src={feedback.User?.profile?.image} alt="" className="rounded-full h-12 w-12" />
             <div className="grid">
              <p className="text-[14px]">{feedback.User.firstName} {feedback.User.surName}</p>
               <div className="bg-gray-300 rounded-xl py-1 px-2 break-words flex-1">
                {feedback.message}
              </div>
             </div>
            </div>
          ))}
        </div>
      )}
    </div>

  );
}};

export default AdminFeedback;
