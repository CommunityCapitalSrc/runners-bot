import axios, { AxiosRequestHeaders } from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

const defaultHeaders: AxiosRequestHeaders = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${process.env.GITHUB_AUTH_TOKEN}`,
}

export const axiosInstance = axios.create({
  baseURL: process.env.GITHUB_API,
  headers: defaultHeaders,
})
