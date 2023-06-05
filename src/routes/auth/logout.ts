import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => {
    res.clearCookie('auth-jwt').status(200).send('Log Out Successful')
})

export default router
