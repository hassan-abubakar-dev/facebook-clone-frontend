import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FacebookLoading from '../../assets/facebook-loading.gif'
import publicAxiosInstance from "../../api/publicAxiosInstance";

const SignUpForm = () => {
    const [genderDetail, setGenderDetail] = useState(false)
    const [dateOfBirthDetail, setDateOfBirthDetail] = useState(false)
    const [allowPronoun, setAllowPronoun] = useState(false)
    const [showWrongDateSelect, setShowWrongDateSelect] = useState(false);
    const [emailUsedProblem, setEmailUsedProblem] = useState(false);
    const [enteredSomeWrongCredentials, setEnteredSomeWrongCredentials] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  


    const currentYear = new Date().getFullYear();
    const endYear = currentYear - 120;

    const navigate = useNavigate();

    const days = [];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const years = [];

    for (let i = 1; i <= 12; i++) {
        days.push(i)
    }


    for (let i = currentYear; i >= endYear; i--) {
        years.push(i)
    }

    const [formData, setFormData] = useState({
        firstName: '',
        surName: '',
        day: days[0],
        month: months[0],
        year: years[0],
        gender: '',
        pronoun: '',
        opGender: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (formData.gender === 'custom') {
            setAllowPronoun(true)
        } else {
            setAllowPronoun(false)
        }
    }, [formData.gender])

    const gender = () => {
        setGenderDetail(!genderDetail)
    }

    const dateOfBirth = () => {
        setDateOfBirthDetail(!dateOfBirthDetail)
    }

    const getFormValues = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }



  const signup = async (e) => {
    e.preventDefault();

    const monthIndex = months.indexOf(formData.month) + 1; // 1–12
    const monthString = monthIndex <= 9 ? `0${monthIndex}` : `${monthIndex}`;
    const dayString = formData.day <= 9 ? `0${formData.day}` : `${formData.day}`;

    const dateOfBirth = `${formData.year}-${monthString}-${dayString}`;

    let realGender = null;

    if (formData.gender && formData.gender !== 'custom') {
        realGender = formData.gender.toLowerCase();
    }

    if (formData.opGender) {
        const op = formData.opGender.toLowerCase();
        if (op === 'male' || op === 'female') {
            realGender = op;
        }
    }

    if (formData.year < 1900 || formData.year > 2011) {
        setShowWrongDateSelect(true);
        return;
    } else {
        setShowWrongDateSelect(false);
    }

    const body = {
        firstName: formData.firstName,
        surName: formData.surName,
        dateOfBirth,
        gender: realGender,
        pronoun: formData.pronoun?.trim() || null,
        email: formData.email,
        password: formData.password
    };

    if (formData.password.trim() !== '' && emailUsedProblem === false) {
        setIsLoading(true);
        try {
            const res = await publicAxiosInstance.post('/auths/register', body, {
                headers: { "Content-Type": "application/json" }
            });

            if (res.status === 200) {
                navigate('/verify', { state: { registeredEmail: body.email } });
            }
        } catch (err) {
            // console.log(err.response.data);
            
            if (err.response) {
                if (err.response.data.message === 'sorry this email is in use try different email') {
                    setEmailUsedProblem(true);
                    setEnteredSomeWrongCredentials(false);
                } else {
                    setEmailUsedProblem(false);
                    setEnteredSomeWrongCredentials(true);
                }
            }
        } finally {
            setIsLoading(false);
        }
    }
};




    return (
        <form onSubmit={signup} className="md:w-[430px] w-[340px]  bg-white justify-self-center rounded-md shadow-2xl pb-5 mb-14">
           
            <div className="justify-self-center pt-3">
                <h3 className="text-black font-bold text-2xl ">Create a new account</h3>
                <p className="text-gray-500 text-[15px] mb-2 ml-12 ">It's quick and easy.</p>
            </div>
            <hr className="text-gray-300" />

            <div className={`border border-red-500 ml-4 mr-4 text-[12px] bg-red-50 py-1 mt-6 ${emailUsedProblem === false && 'hidden'}`}>
                The email address you're trying to verify was recently used to verify a different account.
                Please try a different email.
            </div>

            <div className={`border border-red-200 ml-4 mr-4 text-gray-600 text-[12px] bg-red-50 py-1 mt-6 ${enteredSomeWrongCredentials === false && 'hidden'}`}>
                it look's like you are not connected to internet or yo'uve enter a wrong credential please check your credentials and try again
            </div>

            <div className="flex mt-4 gap-4">
                <input type="text" name="firstName" placeholder="First name" onChange={getFormValues} required
                    className="firstName-secondName ml-4"
                />
                <input type="text" name="surName" placeholder="Surname" onChange={getFormValues} required
                    className="firstName-secondName mr-4"
                />
            </div>
            <div className="text-left mt-3 ml-4 text-gray-500 text-[13px] relative">
                Date of birth
                <div className="inline bg-gray-500 px-1 text-white rounded-full cursor-pointer ml-1"
                    title="click for more information" onClick={dateOfBirth}
                >
                    ?
                </div>
                <div className={`absolute bg-white text-black py-2 pl-2 pr-1 -left-[310px] top-0 right-[360px] shadow-md 
                           ${dateOfBirthDetail === false && 'hidden'}
                        `}>
                    Providing your birthday helps make sure that you get the right Facebook experience for your age. If you want to change who sees this, go to the About section of your profile. For more details, please visit our Privacy Policy.
                </div>
            </div>
            <div className="text-left flex gap-4 relative">
                <div
                    className=
                    {`absolute bg-red-700 text-white text-[13px] py-2 pl-2 pr-1 -left-[310px] top-0 right-[430px]
                         ${showWrongDateSelect === false && 'hidden'}`}>
                    it looks like you've entered the wrong info. please make sure that you use your
                    your real date of birth
                </div>
                {/**/}
                <select name="day" className="dateOfBirth ml-4" onChange={getFormValues}>
                    {days.map(day => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </select>

                <select name="month" className="dateOfBirth" onChange={getFormValues}>
                    {months.map(month => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>

                <select name="year" className="dateOfBirth mr-4" onChange={getFormValues}>
                    {years.map(year => (
                        <option value={year} key={year}>{year}</option>
                    ))}
                </select>
            </div>

            <div className="text-left mt-2 ml-4 text-gray-500 text-[13px] mb-1 relative">
                Gender
                <div className="inline bg-gray-500 px-1 text-white rounded-full cursor-pointer ml-1"
                    title="click for more information" onClick={gender}
                >
                    ?
                </div>

                <div className={`absolute bg-white text-black py-2 pl-2 pr-1 -left-[330px] top-0 right-[380px] shadow-md
                        ${genderDetail === false && 'hidden'}
                        `}>
                    Providing your birthday helps make sure that you get the right Facebook experience for your age. If you want to change who sees this, go to the About section of your profile. For more details, please visit our Privacy Policy.
                </div>
            </div>

            <div className="flex mb-2 gap-4">
                <div className="gender ml-4">
                    <label htmlFor="female" className="ml-2">Female</label>
                    <input type="radio" id="female" name="gender" value="female" className="ml-auto mr-2" onChange={getFormValues} required />
                </div>
                <div className="gender">
                    <label htmlFor="male" className="ml-2">Male</label>
                    <input type="radio" id="male" name="gender" value="male" className="ml-auto mr-2" onChange={getFormValues} required />
                </div>
                <div className="gender mr-4">
                    <label htmlFor="custom" className="ml-2">Custom</label>
                    <input type="radio" id="custom" name="gender" value="custom" className="ml-auto mr-2" onChange={getFormValues} required />
                </div>

            </div>

            <div className={`${allowPronoun === false && 'hidden'}`}>
                <select name="pronoun" onChange={getFormValues} className="email-password text-[15px] text-gray-700 mb-2" required >
                    <option disabled selected>select your pronoun</option>
                    <option value="She: Whish her a happy birthday!">She: "Whish her a happy birthday!</option>
                    <option value="Hi: Whish him a happy birthday!">Hi: "Whish him a happy birthday!</option>
                    <option value="They: Whish them a happy birthday!">They: "Whish them a happy birthday!</option>

                </select>
                <p className="text-left text-[13px] ml-4 mb-1 text-gray-500">Your pronoun is visible to everyone.</p>
                <input type="text" name="opGender" placeholder="Gender (optional)" onChange={getFormValues}
                    className="email-password mb-3"
                />
            </div>

            <input type="text" name="email" placeholder="Mobile number or email address" onChange={getFormValues}
                className="email-password mb-3" />
            <input type="text" name="password" placeholder="New password" onChange={getFormValues}
                className="email-password -mt-1"
            />

            <p className="text-left mt-3 ml-4 text-gray-600 text-[11px]">
                People who use our service may have uploaded your contact information to Facebook.
                <a className="text-blue-700 hover:underline ml-1" href="#">Learn more.</a>
            </p>

            <p className="text-left mt-3 ml-4 text-gray-600 text-[11px] mr-4">
                By clicking Sign Up, you agree to our <a className="text-blue-700 hover:underline ml-1"
                    href="#">Terms</a>, <a className="text-blue-700 hover:underline ml-1"
                        href="#"> Privacy Policy </a> and <a className="text-blue-700 hover:underline ml-1"
                            href="#">Cookies Policy.</a> You may receive SMS notifications from us and can opt out at any time
            </p>
            <div className="flex items-center">
                <button
                    className="bg-green-600 md:ml-25 ml-12 text-white text-nowrap py-1 px-18 font-bold text-[18px] inline-block rounded-md cursor-pointer mt-5">
                    Sign Up
                </button>

                <img src={FacebookLoading} alt="" className={`ml-2 mt-5 ${!isLoading && 'hidden'}`} />
            </div>

            <p className="pt-4 text-blue-600 ml-4">
                <Link to='/logging'>Already have and account?</Link>
            </p>
        </form>
    );
};

export default SignUpForm;