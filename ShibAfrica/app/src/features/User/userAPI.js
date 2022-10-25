import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signer } from '../../fun/ethers';
import { ethers } from 'ethers'
import { store } from '../../app/store'
import ShibafricaAbiACTUAL  from '../../abi/ShibAfricaACTUAL.json'
const Packages = [
    {id:1,price:0.05},
    {id:2,price:0.1},
    {id:3,price:0.25},
    {id:4,price:0.5},
    {id:5,price:1},
    {id:6,price:2},
    {id:7,price:5},
    {id:8,price:10},
    {id:9,price:20},
    {id:10,price:40},
]
export const setUserArea = createAsyncThunk(
    'user/setUserArea',
    async(data) =>{
            const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
            const signer = provider.getSigner();
            const Shibafrica = new ethers.Contract(process.env.REACT_APP_SHIBAFRICA_ADDRESS, ShibafricaAbiACTUAL.abi, signer);
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

        const Shibafrica = new ethers.Contract(process.env.REACT_APP_SHIBAFRICA_ADDRESS, ShibafricaAbiACTUAL.abi, signer);
        const mylevel = Number(await Shibafrica.levels(store.getState().user.address))
        if(mylevel>0) {
            data.referral=store.getState().user.address;
            for(let i=1;i<store.getState().user.packages.length;i++){
                price_amount+=Number(ethers.utils.parseUnits(String(store.getState().user.packages[i].price),'ether'))
                packages.push(store.getState().user.packages[i].id-1)
            }
            let package_ = packages[0];
            return await Shibafrica.buyPackages(data.referral,
                package_,
                {value:String(price_amount), gasLimit:1500000})
                .then((res)=>{
                    console.log(res)
                    return { status:'buyed' }
                })

        }
        else if(mylevel==0&&data.referral!='') {
            for(let i=1;i<store.getState().user.packages.length;i++){
                price_amount+=Number(ethers.utils.parseUnits(String(store.getState().user.packages[i].price),'ether'))
                packages.push(store.getState().user.packages[i].id-1)
            }
            const refLevel = Number(await Shibafrica.levels(data.referral))
            console.log(refLevel)
            let package_ = packages[0];
            console.log(packages)
            if(refLevel>0){
                return await Shibafrica.buyPackages(data.referral,
                    package_,
                    {value:String(price_amount), gasLimit:1500000})
                    .then((res)=>{
                        console.log(res)
                        return { status:'buyed' }
                    })
            }else {return { status:'notbuyeds' }}
        } else { return {status:'notbuyed'} }


        
    }
)

export const logIn = createAsyncThunk(
    "user/logIn",
    async ( data )=>{
        const { authenticate, Web3Api } = data;
        const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
        const signer = provider.getSigner();
        const Shibafrica = new ethers.Contract(process.env.REACT_APP_SHIBAFRICA_ADDRESS, ShibafricaAbiACTUAL.abi, signer);
       
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
                const level = await Shibafrica.levels(user.get('ethAddress'));
                
                const funds = price.usdPrice*balance;
                return {id:user.id, balance:balance, funds:funds, price:price.usdPrice, bnbprice:bnbprice.usdPrice, address:user.get('ethAddress'),level:level.toString(), message:{}}
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

