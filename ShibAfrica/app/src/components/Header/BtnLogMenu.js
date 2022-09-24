import { useMoralis } from "react-moralis";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../app/store';
import { logOut } from '../../features/User/userAPI';
import { formatAddress, formatPrice, formatPrice2,scientificToDecimal } from "../../fun/formatter";
import off from '../../public/off.png'
import logo from '../../public/logo.png'

export default function BtnLogMenu(props){
    const { logout } = useMoralis();
    const dispatch = useDispatch();
    
    return(
            <div className="LogMenu font-3xl">
                <div className="LogTokens inline-block p-3 font-semibold  mr-4 text-red-600 border-b-2 border-solid border-green-700">
                    Total Funds: {store.getState().user.funds.toFixed(5)}$
                </div>
                <div className="LogPrice inline-block p-3 font-semibold  mr-4 text-red-600 border-b-2 border-solid border-green-700">
                    {formatPrice2(scientificToDecimal(store.getState().user.price))}$
                </div>
                <div className="LogTokens inline-block p-3 font-semibold  mr-4 text-red-600 border-b-2 border-solid border-green-700">
                    {store.getState().user.token_balance}
                    <img src={logo} className="ml-1 w-5 h-5 inline-block"></img>
                </div>
                <div 
                    className="font-bold p-3 rounded-lg font-bold  text-red-600 border-4 border-solid border-green-700 bg-yellow-400 inline-block"
                    >
                    {formatAddress(store.getState().user.address)}
                </div>
                <button
                    className=""
                    onClick={()=>{
                        dispatch(logOut({logout}));
                    }} >
                    <img src={off} className="w-6 h-6 hover:w-7 hover:h-7 ml-4 relative top-2"></img>
                </button>
            </div>
    );
}