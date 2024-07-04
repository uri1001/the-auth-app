import { type Request } from 'express'
import jwt from 'jsonwebtoken'
import { Strategy as CustomStrategy, type VerifiedCallback } from 'passport-custom'

import { fetchDb } from '../../db/index.js'
import { AuthStrategies } from '../../services/index.js'

import { getEnv } from '../../system.js'
import { logAuthentication } from '../log.js'

interface JwtStoredValue {
    pointer: string
    value: any
    index: [number, number | null]
}

const verifyJwt = (token: string): jwt.JwtPayload => {
    const decodedKey = getEnv('VC_PROVIDER_PUBLIC_KEY').replace(/\\n/g, '\n')
    const jwtPayload = jwt.verify(token, decodedKey, {
        algorithms: ['ES256'],
        ignoreNotBefore: true,
    })
    if (typeof jwtPayload === 'string') throw new Error('jwtpayload type not valid')
    return jwtPayload
}

const extractValueJwt = (jwtPayload: jwt.JwtPayload, pointer: string): string => {
    const storedValues: JwtStoredValue[] = JSON.parse(jwtPayload.stored_values)
    for (const storedValue of storedValues)
        if (storedValue.pointer === pointer) return storedValue.value
    throw new Error('undefined jwt payload property')
}

const verifyUser = (req: Request, done: VerifiedCallback): void => {
    try {
        const token = req.query.token as string
        if (token == null) throw new Error('undefined jwt')

        const jwtPayload = verifyJwt(token)

        const payload = {
            email: extractValueJwt(jwtPayload, '/credentialSubject/email'),
        }

        const user = fetchDb('users', 'user', payload.email)

        logAuthentication(AuthStrategies.VC, jwtPayload, user)

        done(null, payload)
    } catch (error) {
        console.error(error)
        done(null, false)
    }
}

const vcStrategy = new CustomStrategy(verifyUser)

export default vcStrategy
