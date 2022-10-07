import React, {useState} from 'react';
import Blockies from 'react-blockies';
import {formatAddress} from '../../fun/formatter'
import {ethers} from 'ethers';
import clipboard from '../../public/clipboard-solid.svg';

export default function Referral(props){
    return(
        <div
            className='Referral mb-2 w-full text-zinc-500 text-2xl border-2 border-solid border-zinc-400 hover:border-zinc-500 rounded-md bg-zinc-200 hover:bg-zinc-300 text-left p-2 font-medium'
        >
            <div className="inline-block rounded-full mr-1"><Blockies seed={props.refAddr} size={10} scale={3}/></div>
            <span>{formatAddress(props.refAddr)} 
                <button 
                onClick={()=>{
                    navigator.clipboard.writeText(props.refAddr)
                    alert('Copied!')
                }}
                className="ml-2 text-white border-2 border-solid border-zinc-300 rounded-full p-1">
                    <img 
                        src={clipboard} 
                        className={"w-6 h-6"}>
                    </img>
                </button>
            </span><br />
            <span className="text-lg inline-block">BNB Arrived : <span className="text-red-600 font-bold">{ethers.utils.formatEther(props.refAmount)} BNB</span></span><br />
            <span className="text-lg inline-block">Packages : <span className="text-red-600 font-bold">{props.refLevels}</span></span><br />
        </div>
    );
}