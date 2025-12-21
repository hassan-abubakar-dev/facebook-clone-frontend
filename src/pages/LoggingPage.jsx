import { useState } from "react";
import { useNavigate } from "react-router-dom";
import publicAxiosInstance from "../api/publicAxiosInstance.js";
import { useUserContext } from "../context/UserContext.jsx";
const LoggingPage = () => {

    const { fetchAllData } = useUserContext();
    const [invalidCredentials, setInvalidCredentials] = useState(false)
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const createAccount = () => {
        navigate('/register')
    }

    const getInputValue = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    const logging = async (e) => {
        e.preventDefault();

        if (formData.email && formData.password) {


            const body = {
                email: formData.email,
                password: formData.password
            };
            setLoading(true);

            try {
                const res = await publicAxiosInstance.post('/auths/logging', body, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }

                );

                if (res.status < 400) {
                    const accessToken = res.data.accessToken;
                    fetchAllData();
                    setLoading(false);
                    localStorage.setItem('accessToken', accessToken);
                    navigate('/home', { replace: true })

                }

            } catch (error) {
                console.log(error.response);
                setLoading(false);
                if (error) {
                    setInvalidCredentials(true)
                }

            }
        }

    };

    const forgetAccount = () => {
        navigate('/password/find-account');
    }
    return (

        <div className="bg-gray-100 w-full  absolute overflow-x-hidden  inset-0 overflow-y-scroll">

            <h2 className="text-[42px] text-blue-600 font-bold pt-7 mb-2">
                facebook
            </h2>
            <form className="md:w-[430px] w-full bg-white justify-self-center rounded-md shadow-xl pb-5 mb-14">
                <h3 className="text-gray-600 pt-5 pb-5 text-xl ml-4">Log in to Facebook</h3>

                <p className={`text-red-600 ml-4 ${invalidCredentials === false && 'hidden'}`}>invalid email or password</p>
                <input type="text" name="email" required placeholder="Mobile number or email address"
                    className="email-password mb-3" onChange={getInputValue} />
                <input type="password" name="password" required onChange={getInputValue} placeholder="password"
                    className="email-password"
                />


                <div className="flex flex-col gap-2 items-start mt-5">
                    <button
                        type="submit" className="bg-blue-600 email-password text-white cursor-pointer font-bold text-xl " disabled={loading} onClick={logging}>
                        Log in
                    </button>
                    {loading && <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto "></div>}
                </div>
                <p className="pt-4 text-blue-600 text-[13px] hover:underline cursor-pointer ml-4" onClick={forgetAccount}>
                    Forgotten account?
                </p>
                <div className="flex mt-4 mb-3">
                    <div className="bg-gray-400 h-[1px] w-[50%] ml-3"></div>
                    <p className="text-gray-500 text-[13px] -mt-2 ml-4 mr-4">or</p>
                    <div className="bg-gray-400 h-[1px] w-[50%] mr-3"></div>
                </div>

                <div className="flex justify-self-center">
                    <button
                        type="button" className="bg-green-500 text-white py-3  px-5 font-bold text-[18px] rounded-md cursor-pointer mt-5" onClick={createAccount}>
                        Create new account
                    </button>
                </div>
            </form>
            <div className="bg-white md:pl-[184px] pl-[20px] pt-7 pr-40">
                <div className="text-left text-[13px] text-blue-800">
                    English (UK) <a href="" className="hover:underline ml-2 mr-2">Hausa</a><a href="" className="hover:underline">Français (France)</a> <a href="" className="hover:underline ml-2">Português (Brasil)</a> <a href="" className="hover:underline ml-2">Español</a> <a href="" className="hover:underline ml-2">العربية</a> <a href="" className="hover:underline ml-2">Bahasa Indonesia</a>
                    <a href="" className="hover:underline ml-2">Deutsch</a> <a href="" className="hover:underline ml-2">日本語</a> <a href="" className="hover:underline ml-2">Italiano</a> <a href="" className="hover:underline ml-2">हिन्दी</a>
                    <div className="inline text-xl ml-2 bg-gray-300 text-black  px-3">+</div>
                </div>

                <hr className="text-gray-300 mt-2 mb-2" />

                <div className="text-left  text-[13px] text-wrap text-blue-800">
                    <a href="#" className="ml-3 hover:underline">Sign Up</a>
                    <a href="#" className="ml-3 hover:underline">Log in</a>
                    <a href="#" className="ml-3 hover:underline">Messenger</a>
                    <a href="#" className="ml-3 hover:underline">Facebook Lite</a>
                    <a href="#" className="ml-3 hover:underline">Video</a>
                    <a href="#" className="ml-3 hover:underline">Meta Pay</a>
                    <a href="#" className="ml-3 hover:underline">Meta Store</a>
                    <a href="#" className="ml-3 hover:underline">Meta Quest</a>
                    <a href="#" className="ml-3 hover:underline">Ray-Ban</a>
                    <a href="#" className="ml-3 hover:underline">Meta</a>
                    <a href="#" className="ml-3 hover:underline">Meta AI</a>
                    <a href="#" className="ml-3 hover:underline">Meta AI more content</a>
                    <a href="#" className="ml-3 hover:underline">Instagram</a>
                    <a href="#" className="ml-3 hover:underline">Threads</a>
                    <a href="#" className="ml-3 hover:underline">Voting Information Centre</a>
                    <a href="#" className="ml-3 hover:underline">Privacy Policy</a>
                    <a href="#" className="ml-3 hover:underline">Privacy Centre</a>
                    <a href="#" className="ml-3 hover:underline">About</a>
                    <a href="#" className="ml-3 hover:underline">Create ad</a>
                    <a href="#" className="ml-3 hover:underline">Create Page</a>
                    <a href="#" className="ml-3 hover:underline">Developers</a>
                    <a href="#" className="ml-3 hover:underline">Careers</a>
                    <a href="#" className="ml-3 hover:underline">Cookies</a>
                    <a href="#" className="ml-3 hover:underline">AdChoices</a>
                    <a href="#" className="ml-3 hover:underline">Terms</a>
                    <a href="#" className="ml-3 hover:underline hidden md:inline">Help</a>
                    <a href="#" className="ml-3 hover:underline hidden md:inline">Contact uploading and non-users</a>
                </div>

            
            </div>
        </div>

    );
}

export default LoggingPage;