import axios from "axios";
import { AxiosResponse } from "axios";
import rateLimit from 'axios-rate-limit';

async function getApiCall(url: string, options: any, rateLimitReq: number, rateLimitPerSec: number): Promise<AxiosResponse> {
  const http = rateLimit(axios.create(), { maxRequests: rateLimitReq, perMilliseconds: rateLimitPerSec, maxRPS: rateLimitReq })
  return await http.get(options.url, options);
}

async function postApiCall(url: string, options: any, rateLimitReq: number, rateLimitPerSec: number): Promise<AxiosResponse> {
  const http = rateLimit(axios.create(), { maxRequests: rateLimitReq, perMilliseconds: rateLimitPerSec, maxRPS: rateLimitReq })
  return await http.post(options.url, options);
}

export { getApiCall, postApiCall };