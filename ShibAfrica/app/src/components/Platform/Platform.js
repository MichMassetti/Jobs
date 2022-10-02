import React, {useState} from 'react';
import Package from './Package';
import Packages from './Packages';
import UserArea from './UserArea';
import {store} from '../../app/store'
import {BuyPackages,setUserArea} from '../../features/User/userAPI'
import {formatPrice} from '../../fun/formatter'
import {authAddress} from '../../fun/authinput'
import logo from '../../public/logo.png'

export default function Platform(){
    const [ userArea, setUserArea_ ] = useState(false);
    const [ userAreaLabel, setUserAreaLabel ] = useState('User Area');
    const [ Header, setHeader ] = useState("Select Package's");

    store.subscribe(async()=>{
        setUserArea_(store.getState().user.message.user_area);
        if(store.getState().user.message.user_area){setUserAreaLabel('Buy Packages');setHeader("User Area")}
        else{setUserAreaLabel('User Area');setHeader("Select Package's")}

    });

    return(
        <div className="Platform">
            <div className="xl:w-1/12 inline-block"></div>
            <div className="xl:w-10/12 inline-block mb-2 text-2xl text-center font-bold">
                <span className="text-green-500">Select <span className="text-yellow-500">Package's</span></span>
                <span className="text-3xl mx-2 text-white">&gt;</span> 
                <span className="text-green-500">Insert Referral <span className="text-yellow-500">Address</span></span>
                <span className="text-3xl mx-2 text-white">&gt;</span> 
                <span className="text-green-500">Buy <span className="text-yellow-500">Package's</span></span>
                <span className="text-3xl mx-2 text-white">&gt;</span> 
                <span className="text-green-500">Invite <span className="text-yellow-500">Whoever</span></span> 
            </div>
            <div className="xl:w-1/12 inline-block"></div>
            <div className="inline-block xl:w-1/12"></div>
            <div className="inline-block p-2 xl:p-6 w-full xl:w-10/12 text-center mb-10 p-3 rounded-lg bg-gray-500-op-20 border-2 border-solid border-red-200">
            <div className="w-full text-center xl:text-left text-red-800 font-bold text-4xl xl:ml-4">
                 <div className="w-full xl:w-1/2 inline-block">{Header}</div>
                 <div className="w-full xl:w-1/2 inline-block text-right">
                    <button 
                        onClick={()=>{
                            if(typeof(window.ethereum)!==undefined&&(store.getState().user.message.status=='login'||store.getState().user.message.status=='pending')){
                                store.dispatch(setUserArea({user_area:!userArea}))
                            } else { alert('Install Wallet or Connect it.') }
                        }}
                        className="text-xl border-2 border-solid border-red-600 hover:border-red-500 bg-yellow-500 hover:bg-yellow-400 rounded-md p-2">{userAreaLabel}
                    </button>
                 </div>
            </div>
            {(userArea)?<Packages />:<UserArea />}
            </div>
            <div className="inline-block xl:w-1/12"></div>
        </div>
    )
}