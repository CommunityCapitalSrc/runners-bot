import axios, { AxiosRequestHeaders } from "axios";

const defaultHeaders: AxiosRequestHeaders = {
  Accept: "application/vnd.github+json",
  Authorization: "Bearer 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",
};

export const axiosInstance = axios.create({
  baseURL: "https://api.github.com/",
  headers: defaultHeaders,
});
