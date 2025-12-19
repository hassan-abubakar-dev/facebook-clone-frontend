import { BadgeCheck, ChevronDown, Minus, Phone, RectangleVertical, SunDim, Video, X } from "lucide-react";
import Meta from '../../../assets/meta.png'
// import { useState } from "react";

export function MetaAi(){

    // const [inputText, setInputText] = useState('')

    // const [messages, setMessages] = useState([])

//    function saveInputText(e){
//     setInputText(e.target.value)
//    }

//    function send(){
//         setMessages([
//             ...messages,
//             {
//                 id: crypto.randomUUID(),
//                 text: inputText
//             }
//         ])
//    }
    return (

        <div>
                <div className='flex mt-4  p-2 mb-4 cursor-pointer hover:bg-gray-200 hover:p-2 hover:rounded-xl' 
                    onClick={() => { window.open("https://statuesque-phoenix-a0bd18.netlify.app/", "_blank", "noopener noreferrer")}}
                >
                    <img src={Meta} alt="" />
                    <p className='mt-2 ml-4 mr-1'>Meta AI</p>
                    {<BadgeCheck className='mt-2 w-4 text-blue-700'/>}
                </div>

         
                </div>
    );
}