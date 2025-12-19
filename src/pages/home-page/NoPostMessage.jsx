import { Bug } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NoPostMessage = () => {
const navigate = useNavigate();
    return (
        <div className='bg-white rounded-xl w-[500px] mx-auto shadow-xl p-3 '>
            <div className="flex">
                <div className="ml-auto p-1 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300">
                    <Bug className="w-5 h-5" />
                </div>
            </div>
            <div className="justify-self-center">
                <p className="font-bold text-[20px]">No more posts</p>
                <p className="text-gray-400">Add more friends to see more posts in your feed.</p>
                <button className="bg-blue-500 text-white py-1 px-4 rounded-md cursor-pointer mt-3" onClick={() => {navigate('/friends')}}>
                    Find friends
                </button>
            </div>
        </div>
    );
}

export default NoPostMessage;