import { ChevronDown, ChevronRight, ChevronUp, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";

export function SideBarContent({ sideBarInformations }) {
  const { logginUser, navigateToProfile, setLeftSideBarOpen } = useUserContext();
  const navigate = useNavigate();
  const [seeMore, setSeeMore] = useState(true);


  function seeMoreSeeLess() {
    setSeeMore(!seeMore)
  }

  const navigateTo = (clickedName) => {
    if(clickedName === 'Friends'){
      setLeftSideBarOpen(false)
      navigate('/friends')
    }else if(clickedName === 'Meta AI'){
      window.open("https://statuesque-phoenix-a0bd18.netlify.app/", "_blank", "noopener noreferrer")
      
    }else if(clickedName === 'Feedback'){
      navigate('/feedback')
    }
  } 


  return (
    <div className="mt-18 overflow-x-hidden">
     
      {logginUser && (<div className="flex gap-3 hover:bg-gray-200  py-2 mt-2 ml-12 pl-2 rounded-xl cursor-pointer" 
         onClick={() => {navigateToProfile(logginUser); setLeftSideBarOpen(false)}}
      >
        <img src={logginUser?.profile?.image} className="inline-block w-8 h-8 object-cover  rounded-full" alt="" />
        <p className='inline-block  text-[15px] text-black mt-2 font-medium'>
          {logginUser.firstName} {logginUser.surName}
        </p>
      </div>)}
      {sideBarInformations.filter((items) => {

        if (seeMore === true) {
          return !items.more
        } else if (seeMore === false) {
          return true;
        }

      })
        .map((sideBarInformation) => {

          return (
            <div className='ml-12 -mt-1' key={sideBarInformation.id}>

              <div className="flex hover:bg-gray-200  py-2 mt-2 pl-2 rounded-xl cursor-pointer" onClick={() => { navigateTo(sideBarInformation.text); }}>

                {sideBarInformation.profile === 'icon' && (
                  <button><sideBarInformation.Image className={`inline-block w-7 h-7 cursor-pointer text-blue-600
          `} /></button>
                )}

                {sideBarInformation.profile === 'image' && <button >
                  <img src={sideBarInformation.Image} className='inline-block w-8 h-8 rounded-3xl' alt="User" />
                </button>
                }


                <p
                  className='inline-block ml-3 text-[15px] text-black mt-2 font-medium'
                >
                  {sideBarInformation.text}


                </p>
              </div>
            </div>
          );
        })}

      {seeMore === true ?

        <button onClick={seeMoreSeeLess} className="see-more-less-button">
          <ChevronDown
            className="arror-shere"
          />
          <p
            className="inline-block"
        
          >See more
          </p>

        </button>

        : <button onClick={seeMoreSeeLess} className='see-more-less-button'>
          <ChevronUp
            className="arror-shere"
          />
          <p
            className="inline-block"
          >See Less
          </p>
        </button>

      }
      <div className="ml-4 leading-3 mt-3">
        <p className="shered-paragraph-style"><a href="#">Privacy &#183;</a></p>
        <p className="shered-paragraph-style"><a href="#">Terms &#183;</a></p>
        <p className="shered-paragraph-style"><a href="#">Advertising &#183;</a></p>
        <p className="shered-paragraph-style"><a href="#">Add Choices &#183;</a> <ChevronRight className="inline-block -ml-2" /></p>
        <p className="shered-paragraph-style"><a href="#">Cookies &#183;</a></p>
        <p className="shered-paragraph-style"><a href="#">more &#183;</a></p>
      </div>
    </div>
  );
}

