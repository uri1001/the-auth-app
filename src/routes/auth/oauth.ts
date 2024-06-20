import express, { type Request, type Response } from 'express'

import { reqTokenOauth, reqUserDataOauth } from '../../adapters/index.js'
import { AuthStrategies, loginAccount, registerAccount } from '../../services/index.js'

import { getEnv } from '../../system.js'

const router = express.Router()

// TODO
// COULD BE IMPROVED BY MOVING ALL LOGIC TO THE PASSPORT STRATEGY
// IMPLEMENT LIKE THE OTHERS

// login callback
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/cb', async (req: Request, res: Response): Promise<void> => {
    if (req.query.code == null) throw new Error('no request code provided')

    // request jwt to oauth provider
    const params = await reqTokenOauth(
        getEnv('OAUTH2_TOKEN_URL'),
        getEnv('OAUTH2_CLIENT_ID'),
        getEnv('OAUTH2_CLIENT_SECRET'),
        req.query.code as string,
    )

    // validate oauth token & scope
    const accessToken = params.get('access_token')
    const scope = params.get('scope')

    if (accessToken == null) throw new Error('undefined access token')
    if (scope !== 'user:email') throw new Error('user did not consent to release email')

    // request user data to oauth provider
    const userData = await reqUserDataOauth(getEnv('USER_API'), accessToken)

    // register successful authentication - account could be registered
    registerAccount(AuthStrategies.OAUTH, userData)

    // login successful authentication
    loginAccount(AuthStrategies.OAUTH, userData, res)

    res.redirect('/')
})

export default router
