import React, {useState} from 'react';
import Package from './Package'
import {store} from '../../app/store'
import {BuyPackages} from '../../features/User/userAPI'
import {formatPrice} from '../../fun/formatter'
import {authAddress} from '../../fun/authinput'
import logo from '../../public/logo.png'

export default function Platform(){
    const [PackageCart, setPackageCart] = useState(store.getState().user.totalPackageCart)
    const [UsdCart, setUsdCart] = useState(store.getState().user.totalUsdCart)
    const [TokenCart, setTokenCart] = useState(store.getState().user.totalTokenCart)
    const [TokenBurned, setTokenBurned] = useState(store.getState().user.totalTokenBurned)


    const Packages = {
        first:[
            {id:1,price:0.05},
            {id:2,price:0.1},
            {id:3,price:0.25},
            {id:4,price:0.5},
            {id:5,price:1},
        ],
        second:[
            {id:6,price:2},
            {id:7,price:5},
            {id:8,price:10},
            {id:9,price:20},
            {id:10,price:40},
        ],
    }
    store.subscribe(()=>{
        if(store.getState().user.message.package_message=='added'||store.getState().user.message.package_message=='subadded'||store.getState().user.message.vendor_status=='buyed'){
            setPackageCart(store.getState().user.totalPackageCart)
            setUsdCart(store.getState().user.totalUsdCart)
            setTokenCart(store.getState().user.totalTokenCart)
            setTokenBurned(store.getState().user.totalTokenBurned)
        }
    })

    return(
        <div className="">
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
             <div className="w-full text-center xl:text-left text-red-800 font-bold text-4xl xl:ml-4">Select Package's</div>
             <div className="w-full mt-4">
                <div className="inline-block mr-1 xl:w-1/12"></div>
                    {Packages.first.map((p)=>{
                        return <Package key={p.id} id={p.id} price={p.price}/>
                    })}
                <div className="inline-block mr-1 xl:w-1/12"></div>   
             </div>
             <div className="w-full">
                <div className="inline-block mr-1 xl:w-1/12"></div>
                    {Packages.second.map((p)=>{
                        return <Package key={p.id} id={p.id} price={p.price}/>
                    })}
                <div className="inline-block mr-1 xl:w-1/12"></div>   
             </div>
             <div className="text-center mt-8 mr-3 font-6xl font-bold text-red-600 inline-block">
                    <span className="bg-yellow-400-op-60 p-3 rounded-md">{Number(PackageCart).toFixed(2)} BNB</span>
             </div>
             <div className="text-center mt-8 mr-3 font-6xl font-bold text-red-600 inline-block">
                    <span className="bg-yellow-400-op-60 p-3 rounded-md">{Number(UsdCart).toFixed(2)} $</span>
             </div>
             <div className="w-full">
                <div className="text-center mt-8 font-4xl txl:font-6xl font-bold text-red-600 inline-block mr-3 xl:mr-4">
                        <div className="text-center font-2xl text-red-600 font-bold mb-1">Token Received</div> 
                        <span className="bg-yellow-400-op-60 p-3 rounded-md">{Number(TokenCart).toFixed(2)} <img src={logo} className="w-8 h-8 inline-block"></img></span>
                </div>
                {/*<div className="text-center mt-8 font-4xl txl:font-6xl font-bold text-red-600 inline-block">
                        <div className="text-center font-2xl text-red-600 font-bold mb-1">Token Burned</div> 
                        <span className="bg-yellow-400-op-60 p-3 rounded-md">{Number(TokenBurned).toFixed(2)} <img src={logo} className="w-8 h-8 inline-block"></img></span>
                </div>*/}
             </div>
             <div className="w-full text-center mt-8">
                 <input 
                    type="text"
                    id="referral_address"
                    defaultValue=""   
                    className="mr-2 bg-yellow-300 rounded-md p-4 w-2/3 xl:w-2/6 xl:pr-12 border-4 border-solid border-green-500 placeholder:text-2xl placeholder:font-bold placeholder:text-red-500 text-2xl font-bold text-red-600"
                    placeholder="Referral Address"
                />
                {
                    (typeof(window.ethereum)!==undefined) ?
                    <div className="inline-block">
                        <button
                            onClick={
                                ()=>{
                                    if((store.getState().user.message.status=='login'||store.getState().user.message.status=='pending')&&typeof(window.ethereum)!==undefined){
                                        if(store.getState().user.packages.length>=2&&authAddress(document.getElementById('referral_address').value)){
                                            store.dispatch(BuyPackages({referral:document.getElementById('referral_address').value}))
                                        } else {alert('Invalid Address or Select Packages.')}
                                    } else { alert('Install Wallet Please or Connect It.') }
                                }
                            }
                            className="p-4 mr-2 font-4xl text-white font-bold bg-green-600 hover:bg-green-700 rounded-md border-4 border-solid border-red-400"
                            >Buy Package's
                        </button>
                        <button
                            onClick={
                                ()=>{
                                    if((store.getState().user.message.status=='login'||store.getState().user.message.status=='pending')&&typeof(window.ethereum)!==undefined){
                                        if(store.getState().user.packages.length>=2){
                                            store.dispatch(BuyPackages({referral:process.env.REACT_APP_WALLET_ADDRESS}))
                                        } else {alert('Select Packages')}
                                    } else { alert('Install Wallet Please or Connect It.') }
                                }
                            }
                            className="p-4 font-4xl text-white font-bold bg-red-300 hover:bg-red-400 rounded-md border-4 border-solid border-red-400"
                            >I don't have a Referral
                        </button>
                    </div>
                    :
                    <button
                    className="p-4 font-4xl text-black font-bold bg-gray-200 hover:bg-green-700 rounded-md border-4 border-solid border-red-400"
                    >Install Wallet
                </button>
                }
             </div>
            </div>
            <div className="inline-block xl:w-1/12"></div>
        </div>
    )
}