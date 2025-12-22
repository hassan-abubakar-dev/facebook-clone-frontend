import { useLocation, useNavigate } from "react-router-dom";
import VerificationFooter from "./VerificationFooter";
import publicAxiosInstance from "../../api/publicAxiosInstance";
import { useRef, useState } from "react";
import Toast from "../../components/Toast";

const VerificationPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [invalidToken, setInvalidToken] = useState(false)
    const [gettedNewCode, setGettedNewCode] = useState(false)
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const registeredEmail = location.state?.registeredEmail;

    const inputRef = useRef(null);

    const completed = async (e) => {
        e.preventDefault()
        const verificationCode = inputRef.current.value;
        setLoading(true);
        const body = {
            verificationCode
        }

        if (verificationCode.trim() !== '') {
            try {
                const res = await publicAxiosInstance.post('/auths/verify', body, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });

                if (res.status < 400) {
            
                    const accessToken = res.data.accessToken;
                    localStorage.setItem('accessToken', accessToken)
                    setLoading(false);
                    localStorage.setItem('isNewUser', true);
                    navigate('/home', { replace: true })
                }

            }
            catch (err) {
                if (err.response.data.message === 'you was not get verification code try requeting verification code or expire'
                    || err.response.data.message === 'sorry your verification code was expire try requesting new one'
                ) {
                    // console.log('its request problem', err.response.data.message);
                    setInvalidToken(true)
                    setLoading(false);
                } else  {
                setLoading(false)
                    setError(true)
                }
            }
        }
    }
    const getNewCode = async () => {
        setLoading(true);
        try {
            const body = {
                email: registeredEmail
            }
            const res = await publicAxiosInstance.post('/auths/request-new-code', body);
            if (res.status < 400) {
                setGettedNewCode(true);
                setLoading(false);
            }
        }
        catch (err) {
          if(err){
             setError(true);
             setLoading(false);
             setError(true);
          }

        }
    }
    const cancel = () => {
        navigate('/register')
    }

    const tryAnotherWay = () => {
        alert('sorry currently we only have verification via email');
    }

    return (


        <div className="bg-gray-100 w-full absolute  inset-0 overflow-y-scroll overflow-x-hidden">
            <div className="bg-white relative shadow-md">
                <div className="md:text-[30px] text-[20px] text-blue-600 font-bold py-2  pl-8 mb-20 text-left ">
                    facebook
                </div>
            </div>
            <form onSubmit={completed} className="md:w-[500px] w-[320px] bg-white justify-self-center rounded-md shadow-xl pb-5 mb-14 px-4">
                <h3 className="text-black pt-5 pb-5 text-left text-xl font-medium text-[20px]">Enter security code</h3>
                <hr className="text-gray-300 -ml-4" />
                <p className="text-[16px] text-left">
                    Please check your emails for a message with your code. Your code is 6 numbers long.
                </p>
                <p className="text-[16px] text-left mt-1">
                    If you don't see it, please check your spam or junk folder
                </p>
                <p className={`text-red-500 text-left mt-2 -mb-4 ${invalidToken === false && 'hidden'}`}>
                    invaid or expire code
                </p>
              {error &&  <Toast message="Something went wrong!" />}
                <div className="text-left grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                    <input type="text" ref={inputRef} id="" placeholder="Enter code" className="border border-gray-300 rounded-md h-13 md:w-56 w-full pl-4" />
                    <div className="mr-4">
                        <p className="text-[16px] text-gray-800">We sent your code to:</p>
                        <p className="text-[13px] text-gray-800 mt-3">{registeredEmail}</p>
                    </div>
                </div>

                <hr className="text-gray-300 -ml-4 mt-4 -mr-4" />

                <div className="text-left flex mt-6">
                    <p onClick={getNewCode} className="text-left cursor-pointer text-blue-600 text-[13px] hover:underline">
                        Didn't get a code?
                    </p>
                    <div className="ml-auto -mt-3">
                        <button type="button" onClick={cancel} className={`bg-gray-200  py-2 px-4 rounded-md text-[15px] font-bold cursor-pointer mr-2
                            ${gettedNewCode === true && 'hidden'}`}>
                            Cancel
                        </button>
                        <button type="button" onClick={tryAnotherWay} className={`bg-gray-200 py-2 px-4 rounded-md text-[15px] font-bold cursor-pointer mr-2
                             ${gettedNewCode === false && 'hidden'}`}>
                            Try another way
                        </button>
                        <button type="submit" className="bg-blue-600 py-2 px-4 rounded-md text-white text-[15px] cursor-pointer font-bold" >Continue</button>
                    </div>
                </div>
 {loading && <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto "></div>}
            </form>

            <VerificationFooter />
        </div>
    );
}

export default VerificationPage;