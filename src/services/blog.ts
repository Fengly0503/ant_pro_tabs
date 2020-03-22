import request from "@/utils/request";

export async function blogList(): Promise<any> {
  return request('/api/blogs');
}

export async function blogDetail(params: string): Promise<any> {
  return request(`/api/login/captcha?id=${params}`);
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

// export default blogApi;
