import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signer } from '../../fun/ethers';
import { ethers } from 'ethers'
import { store } from '../../app/store'
import ShibafricaAbiACTUAL  from '../../abi/ShibAfricaACTUAL.json'
import { ShibafricaAbi } from '../../abi/ShibafricaAbi';
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
export const setUserArea = createAsyncThunk(
    'user/setUserArea',
    async(data) =>{
            const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
            const signer = provider.getSigner();
            const Shibafrica = new ethers.Contract(process.env.REACT_APP_SHIBAFRICA_ADDRESS, ShibafricaAbi, signer);
            console.log(Shibafrica);
            
            let refCounter;
            try{
                refCounter = await Shibafrica.refCounter(store.getState().user.address);
            } catch(err){ refCounter=0 }

            let totalRefAmount = 0;
            let totalRefLevels = 0;
            let referralsData = new Array();
            for(let i=1; i<=refCounter;i++){
                const ref = await Shibafrica.referralsAddress(store.getState().user.address,i);
                const refAmount = await Shibafrica.referralsReferralAmount(store.getState().user.address,i)
                const refLevels = await Shibafrica.referralsLevels(store.getState().user.address,i)
                referralsData.push({
                    ref:ref,
                    refAmount:refAmount.toString(),
                    refLevels:refLevels.toString()
                });
                totalRefAmount+=refAmount.toString()
                totalRefLevels+=Number(refLevels.toString());
            }
            let packagesTokenAmounts = new Array();let totalTokenAmount = 0;
            for(let i=0;i<store.getState().user.level;i++){ 
                const tokenAmount = await Shibafrica.packagesTokenAmount(store.getState().user.address, i);
                packagesTokenAmounts[i]=tokenAmount.toString();
                totalTokenAmount+=tokenAmount.toString();
            }
            let totalSpendedAmount=0;
            for(let i=0;i<store.getState().user.level; i++){ 
                totalSpendedAmount+=Packages[i].price;
            }
 
            console.log(referralsData)
            console.log(packagesTokenAmounts)
            return {user_area:data.user_area, level:store.getState().user.level,refData:referralsData, packagesTokenAmounts:packagesTokenAmounts, totalRefAmount:totalRefAmount, totalTokenAmount:totalTokenAmount, totalRefLevels:totalRefLevels, totalSpendedAmount:totalSpendedAmount,refCounter:Number(refCounter.toString()) }

        //else { return{user_area:data.user_area, level:store.getState().user.level, refData:store.getState().user.refData, packagesTokenAmounts:store.getState().user.packagesTokenAmounts, totalRefAmount:store.getState().user.totalRefAmount, totalTokenAmount:store.getState().user.totalTokenAmount ,totalRefLevels:store.getState().user.totalRefLevels, totalSpendedAmount:store.getState().user.totalSpendedAmount, refCounter:store.getState().user.refCounter} }
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
        const mylevel = Number(await Shibafrica.levels(store.getState().user.address))
        for(let i=1;i<store.getState().user.packages.length;i++){
            price_amount+=Number(ethers.utils.parseUnits(String(store.getState().user.packages[i].price),'ether'))
            packages.push(store.getState().user.packages[i].id)
        }
        let package_ = packages[0];
        console.log(data.referral)
        console.log(package_)
        console.log(price_amount)
        return await Shibafrica.buyPackages(data.referral,
            package_,
            {value:String(price_amount), gasLimit:1700000})
            .then((res)=>{
                console.log(res)
                return { status:'buyed' }
            })
    }
)

export const getClaim = createAsyncThunk(
    "user/getClaim",
    async (data) => {     
        
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
        const signer = provider.getSigner()
        
        const Shibafrica = new ethers.Contract(process.env.REACT_APP_SHIBAFRICA_ADDRESS, ShibafricaAbi, signer);
        const rewards = Number(await Shibafrica.rewards(store.getState().user.address))
        data.setRewards(rewards)
       
        return {status:'getClaimed'} }
)

export const claimRewards = createAsyncThunk(
    "user/claimRewards",
    async () => {     
        
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
        const signer = provider.getSigner()
        
        const Shibafrica = new ethers.Contract(process.env.REACT_APP_SHIBAFRICA_ADDRESS, ShibafricaAbi, signer);
        const rewards = Number(await Shibafrica.rewards(store.getState().user.address))
        if(rewards>0) {
            return await Shibafrica.claimRewards(
                {value:0, gasLimit:300000})
                .then((res)=>{
                    console.log(res)
                    return { status:'claimed', rewards: 0 }
                }).catch((err)=>{
                    console.log(err)
                    return {status:'error'}
                })
        }
         else { return {status:'notclaimed'} }
    }
)
export const logIn = createAsyncThunk(
    "user/logIn",
    async ( data )=>{
        const { authenticate, Web3Api } = data;
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
        const signer = provider.getSigner();
        const Shibafrica = new ethers.Contract(process.env.REACT_APP_SHIBAFRICA_ADDRESS, ShibafricaAbi, signer);
        console.log('log')
        return await authenticate({signingMessage:'Welcome to ShibAfrica.'}).then(async (user)=>{
                console.log("qua")
                const Balances = await Web3Api.account.getTokenBalances({address:user.get('ethAddress'), chain:'bsc'});//TOGLIERE ADDRESS
                let balance='';

                Balances.map((token)=>{
                    if(token.symbol==process.env.REACT_APP_TOKEN_SYMBOL){
                        balance=token.balance
                    }
                })
                const price = await Web3Api.token.getTokenPrice({address:process.env.REACT_APP_SHIBAFRICA_TOKEN_ADDRESS, chain:'bsc',exchange:'PancakeSwap2'})
                const bnbprice = await Web3Api.token.getTokenPrice({address:process.env.REACT_APP_WBNB_ADDRESS, chain:'bsc',exchange:'PancakeSwap2'})
                const level = await Shibafrica.levels(user.get('ethAddress'));
                const rewards = Number(await Shibafrica.rewards(user.get('ethAddress')));
                const holders = await Shibafrica.returnHolders()                
                const funds = price.usdPrice*balance;
                console.log(holders)
                console.log(Number(holders[0]))
                return {id:user.id, balance:balance, funds:funds, price:price.usdPrice, bnbprice:bnbprice.usdPrice, address:user.get('ethAddress'),level:level.toString(), message:{}, rewards: rewards, holders:holders.map(item=>{return Number(item)}),
                        prova: "Ciao"}
            }).catch((e) => console.log(e));
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

