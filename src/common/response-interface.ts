export interface ApiRresponse<T>{
    status: number;
    message: string;
    data?:T;
}