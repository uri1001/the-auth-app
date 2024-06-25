import axios from 'axios'

import { getEnv } from '../../system.js'

import { logRequest } from '../log.js'

export const reqIssueDataVc = async (info: any): Promise<any> => {
    const url = getEnv('VC_PROVIDER_ISSUE_URL')

    const id = getEnv('VC_PROVIDER_ENDPOINT_AUTH_ID')
    const pwd = getEnv('VC_PROVIDER_ENDPOINT_AUTH_PWD')

    const authHeaders = 'Basic ' + Buffer.from(`${id}:${pwd}`).toString('base64')

    const data = {
        username: info.username,
        firstName: info.first_name,
        lastName: info.last_name,
        email: info.email,
        companyId: info.company_id,
        companyName: info.company_name,
        companyWorkplace: info.company_workplace,
        employeeId: info.employee_id,
        employeeRole: info.employee_role,
    }

    const res = await axios.post(url, data, {
        headers: { Authorization: authHeaders, 'Content-Type': 'application/json' },
    })

    logRequest(true, url, data, res.data)

    return res.data
}
