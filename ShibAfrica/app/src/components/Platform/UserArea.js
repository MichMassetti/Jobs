import React from 'react';
import { store } from './../../app/store';
import {formatAddress} from '../../fun/formatter'

export default function UserArea(){

    return(
        <div className="UserArea">
            <div className="w-1/2 text-left text-white text-2xl font-bold ">My Referral: <span className="ml-2 border-2 border-solid border-green-600 rounded-lg p-2">{formatAddress(store.getState().user.address)}</span></div>
        </div>
    );
}