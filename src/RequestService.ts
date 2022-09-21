import { AxiosResponse } from 'axios'

import { axiosInstance } from './axiosInstance'
import { TGetRunnersResponse } from './types'

const runnersDataUrl = 'repos/CommunityCapitalSrc/Noumena-App/actions/runners'

export class RequestService {
  static readonly getRunnersData = async (): Promise<AxiosResponse<TGetRunnersResponse>> =>
    axiosInstance.get(runnersDataUrl)
}
