export const formatAddress = function(address){
    let addr='';
    if(address!=''){
        addr = address.slice(0, 6);
        addr=addr+'...'+address.slice(address.length-4, address.length);
    } else {addr='';}
    return addr;
}
export const formatPrice = function(price,i){
    let prc='';
    if(price!=''&&price!=0){
        prc = String(price).slice(0, i);
    } else if(price==0)prc = 0; 
    else {prc='';}
    return prc;
}

export const formatPrice2 = function(price){
    let prc='';
    if(price!=''){
        prc = String(price).slice(0, 8);
    } else {prc='';}
    return prc;
}

export const scientificToDecimal = function (num) {
    var nsign = Math.sign(num);
    //remove the sign
    num = Math.abs(num);
    //if the number is in scientific notation remove it
    if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
        var zero = '0',
                parts = String(num).toLowerCase().split('e'), //split into coeff and exponent
                e = parts.pop(), //store the exponential part
                l = Math.abs(e), //get the number of zeros
                sign = e / l,
                coeff_array = parts[0].split('.');
        if (sign === -1) {
            l = l - coeff_array[0].length;
            if (l < 0) {
              num = coeff_array[0].slice(0, l) + '.' + coeff_array[0].slice(l) + (coeff_array.length === 2 ? coeff_array[1] : '');
            } 
            else {
              num = zero + '.' + new Array(l + 1).join(zero) + coeff_array.join('');
            }
        } 
        else {
            var dec = coeff_array[1];
            if (dec)
                l = l - dec.length;
            if (l < 0) {
              num = coeff_array[0] + dec.slice(0, l) + '.' + dec.slice(l);
            } else {
              num = coeff_array.join('') + new Array(l + 1).join(zero);
            }
        }
    }

    return nsign < 0 ? '-'+num : num;
};