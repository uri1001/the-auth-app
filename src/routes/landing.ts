import express from 'express'
import path from 'path'

const router = express.Router()

router.get('/', (_req, res) => {
    res.sendFile('landing.html', {
        root: path.join(__dirname, '../..', 'public'),
    })
})

export default router
