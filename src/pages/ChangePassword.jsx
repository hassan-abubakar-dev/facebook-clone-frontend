import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import publicAxiosInstance from "../api/publicAxiosInstance";
import Toast from "../components/Toast";

export default function ResetNewPasswordPage() {
  const location = useLocation();
  const changePasswordToken = location.state?.changePasswordToken || '';
  const [loading, setLoading] = useState(false);
  const [mismatchPasswordError, setMismatchPasswordError] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const cancel = () => {
    navigate('/logging');
  };

  const changePassword = async () => {
    setLoading(true);

    try {
      const body = {
        password: passwordRef.current.value,
        comfirmPassword: confirmPasswordRef.current.value,
        changePasswordToken
      }
      const res = await publicAxiosInstance.post('/auths/verify/change-password', body);
      if (res.status < 400) {
        setLoading(false)
        navigate('/logging', { replace: true });
      }
    }
    catch (err) {
      // console.log(err.response.data);
      setLoading(false);
      if(err.response.data.message === 'first and second password mismatch'){
        setMismatchPasswordError(true)
      }else {
        setError(true);
        
      }

    }

  }

  return (
    <div className="w-full h-screen bg-[#f0f2f5] flex flex-col items-center pt-10 overflow-hidden">

      {/* FB Logo */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
        className="w-12 h-12 mb-6"
        alt="Facebook"
      />

      {/* Card */}
      <div className="w-[400px] bg-white shadow-lg rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-2">Choose a new password</h2>
        <p className="text-sm text-gray-600 mb-5">
          Create a new password that is strong and secure.
        </p>
      {error && <Toast message="something went wrong  try again" />}
        {/* NEW PASSWORD */}
       {mismatchPasswordError &&  <p className="text-red-400 text-[14px]">first and second passwords are not match try again</p>}
        <div className="mb-4">
          <label className="text-sm font-medium">New password</label>
          <input ref={passwordRef}
            type="password"
            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-blue-500"
            placeholder="Enter new password"
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-5">
          <label className="text-sm font-medium">Confirm password</label>
          <input ref={confirmPasswordRef}
            type="password"
            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-blue-500"
            placeholder="Re-enter new password"
          />
        </div>

        {/* BUTTON */}
        <button className="w-full bg-[#1877F2] text-white py-2 rounded-lg font-semibold hover:bg-[#166fe0] cursor-pointer" onClick={changePassword}>
          Continue
        </button>
        {loading && <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mt-2"></div>}

        {/* CANCEL */}
        <div className="text-center mt-4">
          <button className="text-blue-600 text-sm hover:underline cursor-pointer" onClick={cancel}>Cancel</button>
        </div>

      </div>
    </div>
  );
}
