import request from '@/utils/request';
// import request from '../utils/request';
// import { request } from 'umi';

export const backend = ''; // learning

// eslint-disable-next-line no-return-await
export const fetchGql = async (data: any) => await request(backend, { method: 'post', data });
// export const fetchGql = (data: any) => commonFetch.fetchtData(data);

