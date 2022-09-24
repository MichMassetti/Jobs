import React,{useEffect, useState} from 'react';
import { store } from '../../app/store'
import { selectPackage } from '../../features/User/userSlice'

export default function Package(props){
    const detectBG = () => { 
        if(typeof(window.ethereum)!==undefined){
            if(store.getState().packages[props.id]=='active'){ return 'bg-yellow-300' } 
            else{ return 'bg-yellow-400' }
        } else { return 'bg-gray-400' }
    }

    const [ Background, setBackground ] = useState(detectBG);

    store.subscribe(() =>{
        if(store.getState().user.message.package_message=='added'&&store.getState().user.packages[store.getState().user.packages.length-1].id==props.id){
            setBackground('bg-yellow-300')
        }
        if(store.getState().user.message.package_message=='subadded'&&store.getState().user.packages[store.getState().user.packages.length-1].id+1==props.id){
            setBackground('bg-yellow-400-op-60')
        }
    })


    return(
        <button 
            onClick={()=>{
                if(typeof(window.ethereum)!==undefined&&store.getState().user.message.status=='login'){
                    store.dispatch(selectPackage({id:props.id, price:props.price}))
                    console.log(store.getState().user)
                } else { alert('Install Wallet Please or Connect It.') }
            }}
            className={Background+" hover:bg-yellow-500 inline-block rounded-md text-red-700 font-bold text-xl border-2 border-solid border-green-500 xl:mr-2 p-2 w-1/2 inline-block xl:w-2/12 Package"}>
                <span className=""> Package N.{props.id}</span>
                <div className="text-black text-sm"><span className="text-red-600">Value:</span> {props.price}BNB</div>
        </button>
    );
}