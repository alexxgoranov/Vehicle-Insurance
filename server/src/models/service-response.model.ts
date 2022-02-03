export interface ServiceResponse<T>{
    dbResult:T | null;
    message:string;
    success: boolean;
}