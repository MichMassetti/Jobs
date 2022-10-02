import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signer } from '../../fun/ethers';
import { ethers } from 'ethers'
import { store } from '../../app/store'
import { ShibafricaAbi } from '../../abi/ShibafricaAbi.js'

export const setUserArea = createAsyncThunk(
    'user/setUserArea',
    async(data) =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
        const signer = provider.getSigner();
        const Shibafrica = new ethers.Contract(process.env.REACT_APP_SHIBAFRICA_ADDRESS, ShibafricaAbi, signer);

        return await Shibafrica.levels(store.getState().user.address)
            .then((level)=>{console.log(level);return {user_area:data.user_area, level:level}});
    }
)
export const BuyPackages = createAsyncThunk(
    "user/BuyPackages",
    async (data) => {     
        let price_amount = new Number;   
        let packages = new Array;
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
        const signer = provider.getSigner()

        const Shibafrica = new ethers.Contract(process.env.REACT_APP_SHIBAFRICA_ADDRESS, ShibafricaAbi, signer);
        console.log(Shibafrica)
        console.log(packages)

        for(let i=1;i<store.getState().user.packages.length;i++){
            price_amount+=Number(ethers.utils.parseUnits(String(store.getState().user.packages[i].price),'ether'))
            packages.push(store.getState().user.packages[i].id-1)
        }/*
        for(let i=packages.length;i<10;i++){
            packages.unshift(10);
        }*/
        console.log(String(price_amount))
        console.log(packages)

        return await Shibafrica.buyPackages(data.referral,
            packages,
            {value:String(price_amount), gasLimit:1500000})
            .then((res)=>{
                console.log(res)
                return { status:'buyed' }
            })
    }
)

export const logIn = createAsyncThunk(
    "user/logIn",
    async ( data )=>{
        const { authenticate, Web3Api } = data;
        return await authenticate({signingMessage:'Welcome to ShibAfrica.'})
            .then(async (user)=>{
                const Balances = await Web3Api.account.getTokenBalances({address:user.get('ethAddress'), chain:'bsc'});//TOGLIERE ADDRESS
                let balance='';
                Balances.map((token)=>{
                    if(token.symbol==process.env.REACT_APP_TOKEN_SYMBOL){
                        balance=token.balance
                    }
                })
                const price = await Web3Api.token.getTokenPrice({address:process.env.REACT_APP_SHIBAFRICA_TOKEN_ADDRESS, chain:'bsc',exchange:'PancakeSwap2'})
                const bnbprice = await Web3Api.token.getTokenPrice({address:process.env.REACT_APP_WBNB_ADDRESS, chain:'bsc',exchange:'PancakeSwap2'})
                
                const funds = price.usdPrice*balance;
                return {id:user.id, balance:balance, funds:funds, price:price.usdPrice, bnbprice:bnbprice.usdPrice, address:user.get('ethAddress'), message:{}}
            });
    }
)
export const logOut = createAsyncThunk(
    'user/logOut',
    async(data) =>{
        const { logout } = data;
        return await logout()
            .then(()=>{return {id:'', address:'', message:{status:'logout', error:''}}});
    }
)

