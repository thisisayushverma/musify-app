const generateOtpHandler = ()=>{
    let str = "";
    for(let i=0; i<6; i++){
        const num = Math.floor(Math.random() * 10)
        str += num.toString();
    }
    console.log("Generated OTP: ", str);
    return str;
}


export default generateOtpHandler