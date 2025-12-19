import SignUpFooter from "./SignUpFooter";
import SignUpForm from "./SignUpForm";


const SignUpPage = () => {

    return (

        <div className="bg-gray-100 w-full absolute  inset-0 overflow-y-scroll overflow-x-hidden ">
            <h2 className="text-[55px] sticky top-0 left-0 text-blue-600 font-bold md:pt-5 pt-3 mb-5 ">
                facebook
            </h2>

            <SignUpForm />
         
            <SignUpFooter />
        </div>

    );
}

export default SignUpPage;