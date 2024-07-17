import express, { type Request, type Response } from 'express'
import fs from 'fs'
import { type JwtPayload } from 'jsonwebtoken'
import passport from 'passport'
import path from 'path'

import { fetchDb } from '../../db/index.js'

import { rootPublic } from '../../system.js'

const router = express.Router()

const jsonToHtml = (jsonString: string): string =>
    jsonString.replace(/\n/g, '<br>').replace(/ {2}/g, '&nbsp;&nbsp;')

router.get('/', passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
    const jwt = req.user as JwtPayload

    if (jwt.sub == null) throw new Error('jwt subject undefined')

    // fetch db user information
    const user = fetchDb('users', 'user', jwt.sub)

    // load the HTML template
    const template = fs.readFileSync(path.join(rootPublic, 'user.html'), 'utf-8')

    // replace the placeholder with the JSON data
    let html
    html = template.replace('{{user-info}}', jsonToHtml(JSON.stringify(user, null, 2)))
    html = html.replace('{{user-jwt}}', jsonToHtml(JSON.stringify(req.user, null, 2)))

    // send the HTML content
    res.set('Content-Type', 'text/html').send(html)
})

export default router
