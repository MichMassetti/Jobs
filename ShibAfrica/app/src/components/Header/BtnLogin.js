import { useMoralis } from "react-moralis";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../features/User/userAPI';
import { useMoralisWeb3Api } from "react-moralis";

export default function BtnLogin(props){
    const { authenticate } = useMoralis();
    const dispatch = useDispatch();
    const Web3Api = useMoralisWeb3Api();

    return(
        <button
            type="button"
            onClick={()=>{
               dispatch(logIn({authenticate, Web3Api}))
            }}         
            className="p-2 rounded-lg border-4 border-solid border-green-700 hover:border-green-600 bg-yellow-400 hover:bg-yellow-500  relative"
            >Connect <span className="text-red-600">Wallet</span>
        </button>
    );
}