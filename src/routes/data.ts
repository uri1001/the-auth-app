import { getRandomValues } from 'crypto'
import express from 'express'
import passport from 'passport'

import { networks } from 'evm-networks'

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), (_req, res) => {
    const typedArray = new Uint8Array(1)

    const rnd = getRandomValues(typedArray)
    const randomNum = rnd[0] % networks.length

    res.send(networks[randomNum])
})

export default router
