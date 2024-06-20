import axios from 'axios'

import { logRequest } from '../log.js'

export const reqIssueDataVc = async (
    url: string,
    id: string,
    key: string,
    _data: any,
): Promise<any> => {
    const data = {
        client_id: id,
        client_secret: key,
    }

    const res = await axios.post(url, data)
    logRequest(true, url, data, res.data)

    return res.data
}
