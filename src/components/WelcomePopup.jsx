import { MessageSquare, X } from "lucide-react";
import {  useEffect } from "react";
import { useUserContext } from "../context/UserContext";

const WelcomePopup = ({ userName }) => {
  
const { setNewUser} = useUserContext()

  useEffect(() => {

  }, []);


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative animate-fade-in">
        {/* Close button */}
        <button
        
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg cursor-pointer"
          onClick={() => {localStorage.removeItem('isNewUser'); setNewUser(false)}}
        >
          <X />
        </button>

        {/* Welcome message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Welcome{userName ? `, ${userName}` : ""}!
        </h2>
        <p  className="text-gray-700 text-center text-[25px] font-bold">This is a personal project for learning purposes. Not affiliated with Facebook.</p>
        <p className="text-gray-600 text-center">
          Your account has been successfully created. Enjoy using the app!
        </p>
         <p className="text-gray-700 text-center text-[17px] font-medium">
          Please any Advice, idea to improve, suggestion or recommendations add it in Feedback section <MessageSquare className="inline-block" />
        </p>
         <p className="text-gray-600 text-center">
          if something goes wrong try to resfesh the page
        </p>

        {/* Optional button */}
        <div className="mt-4 flex justify-center">
          <button  onClick={() => {localStorage.removeItem('isNewUser'); setNewUser(false)}}
       
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
