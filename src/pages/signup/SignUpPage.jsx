import SignUpFooter from "./SignUpFooter";
import SignUpForm from "./SignUpForm";


const SignUpPage = () => {

    return (

        <div className="bg-gray-100 w-full absolute  inset-0 overflow-y-scroll overflow-x-hidden ">
            <h2 className="text-[55px] sticky top-0 left-0 text-blue-600 font-bold md:pt-5 pt-3 mb-5 marc">
                facebook
            </h2>
    
 <div className="w-full overflow-hidden bg-gray-100 py-1 flex -mt-5 mb-3">
      <div className="whitespace-nowrap animate-marquee text-lg text-gray-600 mx-auto">
        This is a personal educational project and is not affiliated with Facebook or Meta.
      </div>
    </div>
            <SignUpForm />
         
            <SignUpFooter />
        </div>

    );
}

export default SignUpPage;