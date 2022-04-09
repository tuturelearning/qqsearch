import axios from 'axios';

// api list
export const searchQqApi = 'https://api.uomg.com/api/qq.info';

export const searchQq = (data: string) => {
    return axios.get(`${searchQqApi}?qq=${data}`);
}