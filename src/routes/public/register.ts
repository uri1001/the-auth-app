import express from 'express'

import root from '../system.js'

const router = express.Router()

router.get('/', (_req, res) => {
    res.sendFile('register.html', { root })
})

export default router
