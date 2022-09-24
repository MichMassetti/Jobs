import React from 'react';
import BtnConnect from './BtnConnect'
import logo from "../../public/logo.png";

export default function Header(){
    return (
        <div className='Header w-full bg-yellow-300'>
            <div className="xl:w-1/12 inline-block"></div>
            <div className="w-3/12 xl:w-5/12 inline-block">
                <div className="inline-block">
                    <img 
                        src={logo}
                        className="h-20 xl:h-24 ml-8 xl:ml-0">    
                    </img>
                </div>
                <div className="inline-block font-6xl font-bold mt-3 xl:mt-0  relative bottom-8 ml-4"><span className="text-red-600">Shib</span>Africa</div>
            </div>
            <div className="w-9/12 xl:w-5/12 inline-block text-right">
                <BtnConnect />
            </div>
            <div className="xl:w-1/12 inline-block"></div>
        </div>
    )
}
