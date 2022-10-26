import React from 'react';
import { store } from './../../app/store';
import {formatAddress} from '../../fun/formatter'
import Referral from './Referral'
import {ethers} from 'ethers'
import clipboard from '../../public/clipboard-solid.svg';

const Packages = [
    {id:1,price:0.025},
    {id:2,price:0.05},
    {id:3,price:0.1},
    {id:4,price:0.25},
    {id:5,price:0.5},
    {id:6,price:1},
    {id:7,price:2},
    {id:8,price:5},
    {id:9,price:10},
    {id:10,price:20},
    {id:11,price:40},
]

export default function UserArea(){
    let level = new Array;
    for(let i=0; i<store.getState().user.level; i++){ level.push(i) }

    return(
        <div className="UserArea">
            <div className="MyReferral text-left text-white text-2xl font-bold mb-4">
                My Referral Link
                <div className="ml-2 w-fit inline-block text-base border-2 border-solid border-green-600 rounded-lg bg-yellow-400-op-60 px-2">
                    {window.location.origin+'?referralLink='+store.getState().user.address}
                </div>
                <button 
                        onClick={()=>{
                            navigator.clipboard.writeText(window.location.origin+'?referralLink='+store.getState().user.address)
                            alert('Copied!')
                        }}
                        className="ml-2 text-white border-2 border-solid border-zinc-300 rounded-full p-1">
                            <img 
                                src={clipboard} 
                                className={"w-6 h-6"}>
                            </img>
                </button>
            </div>
            <div className="MyPackages bg-gray-500-op-20 p-2 rounded-md border-2 border-solid border-green-600 w-full text-left text-white text-2xl font-bold text-center">
                <div className="mb-4 text-left">My Packages</div>
                {
                    level.map((el)=>{
                        console.log(el)
                        return (
                            <div 
                                key={el}
                                onClick={()=>{
                                    
                                }}
                                className={"bg-yellow-400 hover:bg-yellow-500 inline-block rounded-md text-red-700 font-bold text-xl border-2 border-solid border-green-500 xl:mr-2 p-2 w-1/2 inline-block xl:w-2/12 mb-2"}>
                                    <span className=""> Package N.{el+1}</span>
                                    <div className="text-black text-sm"><span className="text-red-600">Value:</span> {Packages[el].price}BNB</div>
                                    <div className="text-black text-sm"><span className="text-red-600">Token Received:</span> {(store.getState().user.packagesTokenAmounts[el]==undefined)?'0':ethers.utils.formatEther(store.getState().user.packagesTokenAmounts[el])}BNB</div>
                            </div>
                        )
                    
                    })
                }
            </div>
            <div className="MyReferralsData inline-block w-1/2 mt-4 border-2 border-solid border-red-500 rounded-md p-2 bg-red-400-op-660 h-96 overflow-y-scroll">
                <div className="Header text-left text-white text-2xl font-bold mb-4">My Referral's Data</div>
                {store.getState().user.refData.map((referral)=>{
                    console.log(referral);
                    return(<Referral key={referral.ref} refAddr={referral.ref} refAmount={referral.refAmount} refTokenAmount={referral.refTokenAmount} refLevels={referral.refLevels} />)
                })}
            </div>
            <div className="MyDataTotal inline-block w-1/2 mt-4 border-2 border-solid border-red-500 rounded-md p-2 bg-red-400-op-660 h-96 overflow-y-scroll">
                <div className="Header text-left text-white text-2xl font-bold mb-4">My Data</div>
                <div className="PackageTotal w-full text-zinc-100 text-left text-2xl border-2 border-solid border-zinc-100 p-2 rounded-md mb-6">
                    <div className="font-bold w-full border-b-2 border-solid border-white mb-2">Packages 's Total</div>
                    <div className="text-xl">Total BNB Spended: <span className="text-red-600 font-bold">{Number(store.getState().user.totalSpendedAmount).toFixed(4)} BNB</span></div>
                    <div className="text-xl">Total SHF Arrived: <span className="text-red-600 font-bold">{ethers.utils.formatEther(store.getState().user.totalTokenAmount)} BNB</span></div>
                </div>
                <div className="PackageTotal w-full text-zinc-100 text-left text-2xl border-2 border-solid border-zinc-100 p-2 rounded-md">
                    <div className="font-bold w-full border-b-2 border-solid border-white mb-2">Referral's Total</div>
                    <div className="text-xl">Total BNB Arrived: <span className="text-red-600 font-bold">{ethers.utils.formatEther(store.getState().user.totalRefAmount)} BNB</span></div>
                    <div className="text-xl">Total Referrals: <span className="text-red-600 font-bold">{store.getState().user.refCounter}</span></div>
                    <div className="text-xl">Total Packages: <span className="text-red-600 font-bold">{store.getState().user.totalRefLevels}</span></div>
                </div>
            </div>
                
        </div>
    );
}