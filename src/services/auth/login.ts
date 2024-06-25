import jwt from 'jsonwebtoken'

import { type Response } from 'express'

import { logJwt } from '../log.js'

import { type Account } from '../../db/index.js'

import { getEnv } from '../../system.js'
import { type AuthStrategies } from './strategies.js'

import registeredAccount from './registered.js'

const issueJwt = (auth: AuthStrategies, account: Account, res: Response): void => {
    const jwtClaims = {
        // id
        jti: account.id,
        // user
        sub: account.username,
        first_name: account.firstName,
        last_name: account.lastName,
        email: account.email,
        email_verified: account.emailVerified,
        // company
        company_id: account.companyId,
        company_name: account.companyName,
        company_workplace: account.companyWorkplace,
        employee_id: account.employeeId,
        employee_role: account.employeeRole,
        // json web token
        iss: auth,
        aud: 'localhost',
        exp: Math.floor(Date.now() / 1000) + Number(getEnv('JWT_SESSION_LENGTH_SECONDS')),
    }

    const token = jwt.sign(jwtClaims, getEnv('JWT_PRIVATE_KEY'))

    res.cookie('auth-jwt', token, {
        httpOnly: true,
        secure: true,
    })

    logJwt(token, getEnv('JWT_PRIVATE_KEY'))
}

const loginAccount = (auth: AuthStrategies, req: any, res?: Response): void => {
    // ensure account is registered in database
    const account: Account | undefined = registeredAccount(auth, req)
    if (account == null) throw new Error('account not registered in database')

    // issue jwt if response is provided - start jwt session
    if (res != null) issueJwt(auth, account, res)
}

export default loginAccount

/*
const jwtClaims = {
    jti: id,
    sub: username,
    role,
    email,
    name: givenName,
    fam: familyName,
    iss: 'google',
    aud: 'localhost:3000',
    exp: Math.floor(Date.now() / 1000) + Number(getEnv('JWT_SESSION_LENGTH_SECONDS')),
}
*/
