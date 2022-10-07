import React,{useEffect, useState} from 'react';
import { store } from '../../app/store'
import { selectPackage } from '../../features/User/userSlice'

export default function Package(props){
    const [ AlreadyBuyed, setAlreadyBuyed ] = useState(props.alreadybuyed);
    const [ Buyable, setBuyable ] = useState(props.buyable);

    const detectBG = () => { 
        if(typeof(window.ethereum)!==undefined&&!AlreadyBuyed){
            if(store.getState().packages[props.id]=='active'){ return 'bg-yellow-300' } 
            else{ return 'bg-yellow-400' }
        } else { return 'bg-gray-400' }
    }
    const [ Background, setBackground ] = useState(detectBG);
    const detectHBG = () => {
        if(AlreadyBuyed){
            return("hover:bg-gray-500")
        } else return("hover:bg-yellow-500")
    }
    const [ HoverBackground, setHoverBackground ] = useState(detectHBG);
    const detectLabel = () => {
        if(AlreadyBuyed){
            return("Already Buyed.");
        } else if(!AlreadyBuyed&&!Buyable){ return("Locked!") }
        else if(Buyable){return("Buy me!")}
    }
    const [ Label, setLabel ] = useState(detectLabel);

    useEffect(() => {
        setAlreadyBuyed(props.alreadybuyed)
        setBuyable(props.buyable)
        setBackground(detectBG)
        setHoverBackground(detectHBG)
        setLabel(detectLabel)
    });
    store.subscribe(() =>{
        if(store.getState().user.message.package_message=='added'&&store.getState().user.packages[store.getState().user.packages.length-1].id==props.id){
            setBackground('bg-yellow-300')
        }
        if(store.getState().user.message.package_message=='subadded'&&store.getState().user.packages[store.getState().user.packages.length-1].id+1==props.id&&!props.alreadybuyed){
            setBackground('bg-yellow-400')
        }
    })


    return(
        <button 
            onClick={()=>{
                if(typeof(window.ethereum)!==undefined&&(store.getState().user.message.status=='login'||store.getState().user.message.status=='pending')){
                    store.dispatch(selectPackage({id:props.id, price:props.price}))
                    console.log(store.getState().user)
                } else { alert('Install Wallet Please or Connect It.') }
            }}
            className={Background+" "+HoverBackground+" h-32 inline-block rounded-md text-red-700 font-bold text-xl border-2 border-solid border-green-500 xl:mr-2 p-2 w-1/2 inline-block xl:w-2/12 Package"}>
                <div className=""> Package N.{props.id}</div>
                <div className="text-green-600 font-bold text-sm">{Label}</div>
                <div className="text-black text-sm"><span className="text-red-600">Value:</span> {props.price}BNB</div>
        </button>
    );
}