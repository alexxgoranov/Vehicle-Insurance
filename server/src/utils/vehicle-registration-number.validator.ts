import isValidPersonalIdentifier from "./person-identifier.validator"

const isValidVehicleRegistrationNumber = (regNumber: string) => {
    return /^([А-Я]{2}|[А-Я]{1})[0-9]{4}[А-Я]{2}$/.test(regNumber)    
}

export default isValidVehicleRegistrationNumber;