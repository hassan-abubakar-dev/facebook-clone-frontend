import { useNavigate } from "react-router-dom";
import VerificationFooter from "./verification/VerificationFooter";
import publicAxiosInstance from "../api/publicAxiosInstance";
import { useState } from "react";
import Toast from "../components/Toast";


const FindAccount = () => {

    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [networkError, setNetworkError] = useState(false);

    const cancel = () => {
        navigate('/logging')
    }
    const completed = async (e) => {
        e.preventDefault();

        if (inputValue) {
            setLoading(true)
            try {
                const res = await publicAxiosInstance.post('/auths/verify/email-check', { email: inputValue });
                if (res.status < 400) {
                    // console.log(res.data);
                    setError(false);
                    setLoading(false);
                    navigate('/password/verify', { state: { registeredEmail: inputValue } });
                }
            } catch (err) {
                // console.log(err);
              if(err){
                  setError(true);
                setLoading(false);
                setNetworkError(true);
              }
            }
        }
    };

    const getSearchAccount = (e) => {
        setInputValue(e.target.value.trim());
    }

    return (


        <div className="bg-gray-100 w-full absolute  inset-0 overflow-y-scroll overflow-x-hidden">
            <div className="bg-white relative shadow-md">
                <div className="text-[30px] text-blue-600 font-bold py-2  pl-8 mb-20 text-left ">
                    facebook
                </div>
                {networkError && <Toast message="something went wrong  try again" />}
            </div>
            <form onSubmit={completed} className="md:w-[500px] w-[320px] bg-white justify-self-center rounded-md shadow-xl pb-5 mb-14 px-4">
                <h3 className="text-black pt-5 pb-5 text-left text-xl font-medium text-[20px]">Find Your Account</h3>
                <hr className="text-gray-300 -ml-4" />
                {error && (
                    <div className={`border-red-500 border text-left mt-2 p-2 bg-red-50 mb-1 `}>
                        <p className="font-medium text-[15px]">
                            No search results
                        </p>
                        <p className="text-[14px] leading-4 mt-0.5">Your search did not return any results. Please try again with other information.</p>
                    </div>
                )}
                <p className="text-[16px] text-left">
                    Please enter your email address  to search for your account.
                </p>

                <div className="text-left mt-3">
                    <input type="text" id="" placeholder="Email address" className="border border-gray-300 rounded-md h-13 w-full  pl-4"
                        onChange={getSearchAccount}
                    />

                </div>
                {loading && <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mt-2"></div>}
                <hr className=" text-gray-400 my-4" />
                <div className="ml-auto">
                    <button type="button" className={`bg-gray-200  py-2 px-4 rounded-md text-[15px] font-bold cursor-pointer mr-2
                           `} onClick={cancel}>
                        Cancel
                    </button>

                    <button type="submit" className="bg-blue-600 py-2 px-4 rounded-md text-white text-[15px] cursor-pointer font-bold" >
                        Search
                    </button>
                </div>
            </form>

            <VerificationFooter />
        </div>
    );
}

export default FindAccount;