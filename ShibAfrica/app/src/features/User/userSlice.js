import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../../app/store';
import { logIn, logOut, BuyPackages, setUserArea } from './userAPI'
const initialState = {
    user:{ 
        address:'',
        token_balance:0,
        funds:'',
        level:0,
        price:'',
        bnbprice:'',
        packages:[{id:0,price:0}],
        totalPackageCart:0,
        totalUsdCart:0,
        totalTokenCart:0,
        totalTokenBurned:0,
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
            if(state.user.packages[state.user.packages.length-1].id==action.payload.id-1){
                state.user.message.package_message='added'
                state.user.message.vendor_status=''
                state.user.totalPackageCart+=action.payload.price

                state.user.totalUsdCart+=(state.user.bnbprice*action.payload.price)
                state.user.totalTokenCart=(state.user.totalUsdCart*30/100)/state.user.price
                state.user.totalTokenBurned=(state.user.totalUsdCart*15/100)/state.user.price

                state.packages[action.payload.id]='active'
                state.user.packages.push(action.payload)
            } else if(state.user.packages[state.user.packages.length-1].id==action.payload.id){
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
            state.user.address=''
            state.user.token_balance=''
            state.user.balance=''
            state.user.funds=''
            state.user.price=''
            state.user.packages=[{id:0,price:0}]
            state.user.message.package_messages='';
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
        },
        [logIn.pending]:state=>{ 
            state.user.message.status='pending'
        },
        [logIn.rejected]:state=>{ 
            state.user.message.status='rejected'
        },
        [logIn.fulfilled]:(state,action)=>{ 
            state.user.message.status='login'
            state.user.address=action.payload.address
            state.user.token_balance=action.payload.balance
            state.user.balance=action.payload.balance;
            state.user.funds=action.payload.funds;
            state.user.price=action.payload.price;
            state.user.bnbprice=action.payload.bnbprice
        },
        [BuyPackages.pending]:state=>{ 
            state.user.message.status='pending'
        },
        [BuyPackages.rejected]:(state, action)=>{ 
            state.user.message.buy_status='rejected'
            console.log(action.error)
        },
        [BuyPackages.fulfilled]:(state,action)=>{ 
            state.user.message.vendor_status=action.payload.status;
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
        },
        [setUserArea.pending]:state=>{ 
        },
        [setUserArea.rejected]:(state, action)=>{ 
            state.user.message.user_area='rejected'
            console.log(action.error)
        },
        [setUserArea.fulfilled]:(state,action)=>{ 
            state.user.message.user_area=action.payload.user_area;
            state.user.level=action.payload.level;
        },
    }
})

export const { selectPackage } = userSlice.actions;
export const userReducer = userSlice.reducer;