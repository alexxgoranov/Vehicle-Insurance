const isValidPersonalIdentifier = (personalIdentifier: string) => {
  let isOnlyDigits = /^\d+$/.test(personalIdentifier);
  if (personalIdentifier.length == 10 || isOnlyDigits) {
    let sum = 0;
    let multipliers = [2, 4, 8, 5, 10, 9, 7, 3, 6];
    for (let index = 0; index < personalIdentifier.length; index++) {
      if (index < multipliers.length) {
        // console.log(personalIdentifier[index], multipliers[index]);
        sum = sum + (parseInt(personalIdentifier[index]) * multipliers[index]);
      }
    }
    let lastNumber = sum - (Math.floor(sum / 11) * 11);
    if (+personalIdentifier[personalIdentifier.length - 1] == lastNumber) {
      return true
    }
  }
  return false
}


export default isValidPersonalIdentifier;