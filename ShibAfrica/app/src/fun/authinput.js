export function authAddress(address){
    if(typeof(address)=='string'&&address.length>0){
        if(address.slice(0,2)=='0x') return true;
        else return false;
    } else {return false;}
}