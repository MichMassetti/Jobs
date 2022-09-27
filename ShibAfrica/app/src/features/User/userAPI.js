import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signer } from '../../fun/ethers';
import { ethers } from 'ethers'
import { store } from '../../app/store'
import { ShibafricaAbi } from '../../abi/ShibafricaAbi.js'

export const BuyPackages = createAsyncThunk(
    "user/BuyPackages",
    async (data) => {     
        let price_amount;   
        let packages = new Array;
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
        const signer = provider.getSigner()

        const Shibafrica = new ethers.Contract(process.env.REACT_APP_SHIBAFRICA_ADDRESS, ShibafricaAbi, signer);
        console.log(Shibafrica)

        for(let i=1;i<store.getState.user.packages.length;i++){
            price_amount+=ethers.utils.parseEther(store.getState().user.packages[i].price)
            packages.push(store.getState().user.packages[i].id-1)
        }

        return await Shibafrica.buyPackages(data.referral,packages,{value:price_amount,gasLimit:1200000})
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
                const price = await Web3Api.token.getTokenPrice({address:process.env.REACT_APP_TOKEN_ADDRESS, chain:'bsc',exchange:'PancakeSwap2'})
                const bnbprice = await Web3Api.token.getTokenPrice({address:"0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", chain:'bsc',exchange:'PancakeSwap2'})
                
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

