import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../../app/store';
import { logIn, logOut, BuyPackages, setUserArea } from './userAPI'
const initialState = {
    user:{ 
        address:'',
        token_balance:0,
        funds:'',
        level:0,
        rewards:0,
        price:'',
        bnbprice:'',
        packages:[{id:0,price:0,burned:0}],
        totalPackageCart:0,
        totalUsdCart:0,
        totalTokenCart:0,
        totalTokenBurned:0,
        totalRefTokenAmount:0,
        totalRefAmount:0,
        totalRefLevels:0,
        totalSpendedAmount:0,
        totalTokenAmount:0,
        refCounter:0,
        refData:[],
        packagesAmounts:['0','0','0','0','0','0','0','0','0','0'],
        message:{status:'logout', error:'', vendor_status:'',package_message:'',buy_status:'',user_area:false   }
    },
    packages:{
        1:'disabled',
        2:'disabled',
        3:'disabled',
        4:'disabled',
        5:'disabled',
        6:'disabled',
        7:'disabled',
        8:'disabled',
        9:'disabled',
        10:'disabled'
    }
}

export const userSlice = createSlice({
    name:'menu',
    initialState,
    reducers:{ 
        selectPackage:(state, action)=>{
            if(action.payload.id-1==state.user.level&&state.packages[action.payload.id]=='disabled'){
                state.user.message.package_message='added'
                state.user.message.vendor_status=''
                state.user.totalPackageCart+=action.payload.price

                state.user.totalUsdCart+=(state.user.bnbprice*action.payload.price)
                state.user.totalTokenCart=(state.user.totalUsdCart*30/100)/state.user.price
                state.user.totalTokenBurned=(state.user.totalUsdCart*15/100)/state.user.price

                state.packages[action.payload.id]='active'
                state.user.packages.push(action.payload)
            } else if(action.payload.id-1==state.user.level&&state.packages[action.payload.id]=='active'){
                state.user.message.package_message='subadded'
                state.user.message.vendor_status=''

                if(action.payload.id==1) state.user.totalPackageCart=0
                else{state.user.totalPackageCart-=action.payload.price}

                if(action.payload.id==1) state.user.totalUsdCart=0
                else {state.user.totalUsdCart-=(state.user.bnbprice*action.payload.price)}
                
                state.user.totalTokenCart=(state.user.totalUsdCart*30/100)/state.user.price
                state.user.totalTokenBurned=(state.user.totalUsdCart*15/100)/state.user.price
                
                state.packages[action.payload.id]='disabled'
                state.user.packages.pop()
            } else{
                state.user.message.package_message='notadded'
            }
        },
        setErrorNull: (state, action) => { 
            state.user.message.buyed='';
        }
    },
    extraReducers:{
        [logOut.pending]:state=>{ 
            state.user.message.status='pending'
        },
        [logOut.rejected]:(state,action)=>{ 
            state.user.message.status='rejected'
            state.user.message.error = action.error
        },
        [logOut.fulfilled]:(state,action)=>{ 
            state.user.message.status='logout'
            state.user.message.package_messages='';
            state.user.message.buyed="notbuyed"
            state.user.address=''
            state.user.token_balance=''
            state.user.balance=''
            state.user.funds=''
            state.user.price=''
            state.user.packages=[{id:0,price:0}]
            state.user.totalPackageCart=0
            state.user.totalUsdCart=0
            state.user.totalTokenCart=0
            state.user.totalTokenBurned=0
            state.packages[1]='disabled'
            state.packages[2]='disabled'
            state.packages[3]='disabled'
            state.packages[4]='disabled'
            state.packages[5]='disabled'
            state.packages[6]='disabled'
            state.packages[7]='disabled'
            state.packages[8]='disabled'
            state.packages[9]='disabled'
            state.packages[10]='disabled'
            state.user.message.user_area=false;
            state.user.level=0;
            state.user.refData=[];
            state.user.packagesAmounts=['0','0','0','0','0','0','0','0','0','0'];
            state.user.packagesTokenAmounts=[0];
            state.user.totalRefAmount=0;
            state.user.totalTokenAmount=0;
            state.user.totalRefLevels=0;
            state.user.totalSpendedAmount=0;
            state.user.refCounter=0;
            state.user.totalReferral=0;
        },
        [logIn.pending]:state=>{ 
            state.user.message.status='pending'
        },
        [logIn.rejected]:(state,action)=>{ 
            state.user.message.status='rejected'
            state.user.message.error=action.error
        },
        [logIn.fulfilled]:(state,action)=>{ 
            state.user.message.status='login'
            state.user.address=action.payload.address
            state.user.token_balance=action.payload.balance
            state.user.balance=action.payload.balance;
            state.user.funds=action.payload.funds;
            state.user.price=action.payload.price;
            state.user.bnbprice=action.payload.bnbprice;
            state.user.level=action.payload.level;
            state.user.rewards=action.payload.rewards;
        },
        [BuyPackages.pending]:state=>{ 
            state.user.message.status='pending'
            state.user.message.buyed="notbuyed"
        },
        [BuyPackages.rejected]:(state, action)=>{ 
            state.user.message.buy_status='rejected'
            console.log(action.error)
        },
        [BuyPackages.fulfilled]:(state,action)=>{ 
            if(action.payload.status=='buyed'){
                state.user.message.vendor_status=action.payload.status;
                state.user.message.buyed="buyed"
                state.user.level++;
            } else {
                state.user.message.buyed="notbuyeds"
            }
            state.user.totalPackageCart=0
            state.user.totalUsdCart=0
            state.user.totalTokenCart=0
            state.user.totalTokenBurned=0
            state.packages[1]='disabled'
            state.packages[2]='disabled'
            state.packages[3]='disabled'
            state.packages[4]='disabled'
            state.packages[5]='disabled'
            state.packages[6]='disabled'
            state.packages[7]='disabled'
            state.packages[8]='disabled'
            state.packages[9]='disabled'
            state.packages[10]='disabled'
            state.user.packages=[{id:0,price:0,burned:0}]
        },
        [setUserArea.pending]:state=>{ 
            state.user.message.user_area='pending'
        },
        [setUserArea.rejected]:(state, action)=>{ 
            state.user.message.user_area='rejected'
            console.log(action.error)
        },
        [setUserArea.fulfilled]:(state,action)=>{ 
            state.user.message.user_area=action.payload.user_area;
            state.user.level=action.payload.level;
            state.user.refData=action.payload.refData;
            state.user.packagesTokenAmounts=action.payload.packagesTokenAmounts;
            state.user.totalRefAmount=action.payload.totalRefAmount;
            state.user.totalTokenAmount=action.payload.totalTokenAmount;
            state.user.totalRefLevels=action.payload.totalRefLevels;
            state.user.totalSpendedAmount=action.payload.totalSpendedAmount;
            state.user.refCounter=action.payload.refCounter;
        },
    }
})

export const { selectPackage, setErrorNull } = userSlice.actions;
export const userReducer = userSlice.reducer;