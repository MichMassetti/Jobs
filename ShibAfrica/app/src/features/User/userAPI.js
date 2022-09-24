import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signer } from '../../fun/ethers';
import {ethers} from 'ethers'
import { store } from '../../app/store'
import { RouterAbi } from '../../abi/RouterAbi.js'
import { Shiba2RAbi } from '../../abi/Shiba2RAbi.js'
import { Shiba2RBytecode } from '../../abi/Shiba2RAbi'
import Shiba2R from '../../artifacts/Shiba2R'

export const BuyPackages = createAsyncThunk(
    "user/BuyPackages",
    async (data) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
        const signer = provider.getSigner()

        const Router = new ethers.Contract("0xD99D1c33F9fC3444f8101754aBC46c52416550D1", RouterAbi, signer);
        console.log(Router)
        const Shiba = new ethers.ContractFactory(Shiba2R.abi, Shiba2R.bytecode, signer)
        console.log(Shiba)
        return await Shiba.deploy({gasLimit:400000000})
            .then((res)=>{console.log(res)})
        /*return await Router.swapExactETHForTokens(
            0,["0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd","0xe31013216Cdc0cf54A9dA564E69c213a30435f1D"],await signer.getAddress() ,Math.floor(Date.now() / 1000) + 60 * 20,
            {value:ethers.utils.parseUnits("0.05", 'ether'), gasLimit:4000000})
            .then((res)=>{
                console.log(res)
            })*/
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

