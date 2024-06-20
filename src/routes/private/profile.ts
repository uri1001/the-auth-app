import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user == null) throw new Error('user undefined')
    res.json(req.user)
})

export default router
