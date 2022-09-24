import React, { useEffect, useState } from 'react';
import { store } from '../../app/store';
import BtnLogin from './BtnLogin';
import BtnLogMenu from './BtnLogMenu';

export default function BtnConnect() {
    console.log(store.getState())
    const [Auth, setAuth] = useState(store.getState().user.message.status)

    store.subscribe(async()=>{
        if(store.getState().user.message.status=='login'){
            setAuth('login')
        }
        if(store.getState().user.message.status=='logout'){
            setAuth('logout')
        }
    })

    return (
        <div className="mr-2 relative bottom-12 xl:bottom-7 font-bold font-4xl">
            {
                (Auth=='logout'&&Auth!='error') ?//Cambiare
                    <BtnLogin />:
                    <BtnLogMenu />
            }
        </div>
        );
  }