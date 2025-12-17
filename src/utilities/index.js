function generateReferralCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const codeLength = 5;
  let referralCode = '';

  for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      referralCode += characters.charAt(randomIndex);
  }

  return referralCode;
}


// generate otp
const generateOTP = (min, max) => {
    let randomNum = Math.random() * (max - min) + min;
    // return 123456;
    return Math.floor(randomNum);
  };
  
const Code = (baseInt) => {
    const radm =
      baseInt +
      "00938475846653425463775645246475993746738746738767387467389123214536765342435475867463544879800498700938475846653425463775645246475993746738746738767387467389123214536765342435475867463544879800498769938576368599474896094836352425364758696907006" +
      baseInt.shuffle();
    const radm2 = radm.shuffle() + baseInt;
    const newRnd = generateOTP(1000101, 9999191) + radm2 + radm.shuffle();
  
    let radm3 = newRnd.substring(3, 400).shuffle();
    const radm4 = radm3.shuffle().substring(3, 300).shuffle();
  
    const radm5 = radm4.shuffle().substring(3, 200).shuffle();
  
    const radm6 = radm5.shuffle().substring(3, 100).shuffle();
    const radm7 = radm6.shuffle().substring(3, 50).shuffle();
    const radm8 = radm7.shuffle().substring(3, 25).shuffle();
    const radm9 = radm8.shuffle().substring(3, 15).shuffle();
    const radm10 =
      newRnd.substring(3, 400) +
      new Date().getTime() +
      radm9.shuffle().substring(3, 13).shuffle();
    const challengeCode = radm10.substring(3, 11).shuffle();
    return baseInt[7] + baseInt[8] + challengeCode;
  };


  function UUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


   const NumberWithCommas = (x) => {
    // return 4000;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function ErrorObject(message, data) {
    return {
      success: false,
      message: message,
      data: data ? data : null
    }
  }
  
  function SuccessObject(message, data) {
    return {
      success: true,
      message: message,
      data: data
    }
  }

  
  module.exports = {
    generateOTP,
    ErrorObject,
    SuccessObject,
    generateReferralCode,
    NumberWithCommas,
    UUID
}