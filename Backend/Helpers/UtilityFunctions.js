const stringsToJsonArray=(stringsArray,key)=> {
    return stringsArray.map(str => ({ [key]: str }));
}

function generate12ByteHexString() {
    let hexString = '';
    while (hexString.length < 12 * 2) { 
        hexString += Math.floor(Math.random() * 16).toString(16);
    }
    return '777' + hexString.substring(3);
}


export{
    stringsToJsonArray,
    generate12ByteHexString
}