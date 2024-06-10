import express from 'express'

import root from '../system.js'

const router = express.Router()

router.get('/', (_req, res) => {
    res.sendFile('error.html', { root })
})

export default router
