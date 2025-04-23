import axios, {AxiosRequestConfig} from 'axios';

interface FetchResponse<T> {
    count: number;
    next: string | null;
    results: T[];
}
const axiosInstanse = axios.create({
    baseURL:'https://localhost:3000'});

class ApiClient<T> {
    endpoint:string;

 constructor(endpoint:string) {
     this.endpoint = endpoint;
 }

 getAll = (config: AxiosRequestConfig) => {
     return axiosInstanse.
         get<FetchResponse<T>>(this.endpoint, config).
         then(res => res.data);
 }
    get = (id: number | string ) => {
        return axiosInstanse.
        get<T>(this.endpoint+'/'+id).
        then(res => res.data);
    }
}

export default ApiClient;
