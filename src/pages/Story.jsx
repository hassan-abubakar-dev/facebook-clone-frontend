import { Settings, Smile, X } from "lucide-react";
import { useRef, useState } from "react";
import FaceBookLogo from '../assets/facebook-logo.png'
import privateAxiosInstance from "../api/privateAxiosInstance";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Toast from "../components/Toast";

export default function StoryCreatePage() {
  const requestIdRef = useRef(null);
  const [text, setText] = useState('');
  const [storyType, setStoryType] = useState('');
  const [storyImage, setStoryImage] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { logginUser } = useUserContext();
  const [error, setError] = useState(false);

  const getStoryType = (type) => {
    setStoryType(type)
  };

  const getStoryImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setStoryImage(fileReader.result);
        setStoryType('image');
        setFileUpload(file);
      };
      fileReader.readAsDataURL(file)
    }
  };

  const postStory = async () => {
    if (loading) return;
    setLoading(true);

    if (!requestIdRef.current) {
      requestIdRef.current = crypto.randomUUID;
    }
    const formData = new FormData();
    formData.append("requestId", requestIdRef.current);

    if (fileUpload) {
      formData.append('story-image', fileUpload);
    } else if (text) {
      formData.append('text', text);
    }

    try {
      const res = await privateAxiosInstance.post('/create-story', formData);
      if (res.status < 400) {
        requestIdRef.current = null;
        setLoading(false);
        navigate('/home');
      }
    } catch (err) {
      setLoading(false);
      if (err.response?.data?.message === 'this type is not allow') {
        alert('Sorry this type is not allowed, choose a different image to create your story.')
      }
     else{
      setError(true)
     }  
      setStoryType(null);
    }
  }

  return (
    <div className="w-full h-screen bg-[#f0f2f5] flex flex-col md:flex-row">
{error && <Toast message="something went wrong  try again" />}
      {/* LEFT SIDEBAR */}
      <div className="w-full md:w-[350px] bg-white border-r border-gray-300 flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-2 p-4 border-b border-gray-300">
          <button className="text-2xl font-bold bg-gray-400 text-white p-2.5 cursor-pointer rounded-full" onClick={() => { window.history.back(); }}>
            <X />
          </button>

          <img onClick={() => { navigate('/home') }}
            src={FaceBookLogo}
            className="w-10 h-10 cursor-pointer"
          />
        </div>

        <div className="flex items-start">
          <h2 className="text-xl font-semibold px-4 py-3">Your story</h2>
          <button className="ml-auto hover:bg-gray-300 p-1 rounded-full mr-3 mt-3 cursor-pointer">
            <Settings />
          </button>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 px-4 pb-4 border-b border-gray-300">
          <img src={logginUser?.profile?.image} className="w-12 h-12 rounded-full" />
          <div className="font-medium text-gray-800">Hassan Scientists</div>
        </div>

        {/* Actions for image/text story */}
        {storyType && (
          <div className="flex flex-col md:flex-row gap-2 ml-4 mt-4 md:mt-[350px]">
            <button className="bg-gray-200 py-1.5 px-10 rounded-md cursor-pointer" onClick={() => { setStoryType('') }}>
              Discard
            </button>
            <button
              className={`bg-gray-200 text-black py-1.5 px-10 rounded-md text-nowrap
                ${text || fileUpload ? 'cursor-pointer text-gray-800' : 'cursor-not-allowed text-gray-400'}`}
              onClick={postStory}
              disabled={loading}
            >
              {loading ? "Sharing..." : "Share to story"}
            </button>
          </div>
        )}

      </div>

      {/* RIGHT MAIN AREA */}
      {!storyType && (
        <div className="flex flex-col md:flex-row flex-1 items-center justify-center gap-4 md:gap-10 p-4">

          <label htmlFor="upload"
            className="w-full md:w-[250px] h-[400px] rounded-xl bg-gradient-to-b from-[#5a57ff] to-[#a0d3ff]
                        flex flex-col justify-center items-center cursor-pointer shadow-lg">
            <div className="bg-white p-4 rounded-full mb-4">📷</div>
            <p className="text-white font-semibold">Create a photo story</p>
          </label>
          <input type="file"  accept="image/*" id="upload"  className="hidden" onChange={getStoryImage}  />

          <div
            className="w-full md:w-[250px] h-[400px] rounded-xl bg-gradient-to-b from-[#b45cff] to-[#ff6a7b]
                        flex flex-col justify-center items-center cursor-pointer shadow-lg"
            onClick={() => getStoryType('text')}>
            <div className="bg-white p-4 rounded-full mb-4">Aa</div>
            <p className="text-white font-semibold">Create a text story</p>
          </div>

        </div>
      )}

      {/* Story Preview */}
      {storyType && (
        <div className="bg-white ml-0 md:ml-6 shadow-xl w-full md:w-[71%] h-[560px] mt-6 md:mt-14 rounded-xl p-4">
          <p className="mb-4">Preview</p>
          <div className="flex items-center justify-center w-full h-[480px] bg-neutral-900 rounded-xl">
            <div className="w-[90%] md:w-[243px] h-[400px] bg-gradient-to-b from-blue-400 to-blue-600 rounded-xl relative overflow-hidden flex items-center justify-center">
              {storyType === 'text' ? (
                <textarea
                  onChange={(e) => setText(e.target.value.trim())}
                  placeholder="START TYPING"
                  className="
                    w-full h-full bg-transparent resize-none outline-none border-none
                    text-white text-center text-xl font-semibold
                    placeholder-white placeholder-opacity-70
                    p-4
                  "
                />
              ) : (
                <img src={storyImage} alt="" className="w-full h-full object-cover" />
              )}

              {storyType === 'text' && (
                <button className="absolute bottom-4 right-4 bg-white/20 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md">
                  <Smile size={22} className="text-white" />
                </button>
              )}
            </div>
          </div>
          {loading && <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mt-4"></div>}
        </div>
      )}

    </div>
  );
}
