import express, { type Request, type Response } from 'express'
import fs from 'fs'
import passport from 'passport'
import path from 'path'

import { accountModel, contractModel, networkModel, userModel, walletModel } from '../../db/index.js'
import { queryDb } from '../../services/index.js'

import { root } from '../../system.js'

const router = express.Router()

const jsonToHtml = (jsonString: string): string =>
    jsonString.replace(/\n/g, '<br>').replace(/ {2}/g, '&nbsp;&nbsp;')

router.get('/', passport.authenticate('jwt', { session: false }), (_req: Request, res: Response) => {
    // load the HTML template
    let html = fs.readFileSync(path.join(root, 'db.html'), 'utf-8')

    // replace the placeholder with the JSON data
    html = html.replace('{{account-model}}', jsonToHtml(JSON.stringify(accountModel, null, 4)))
    html = html.replace('{{contract-model}}', jsonToHtml(JSON.stringify(contractModel, null, 4)))
    html = html.replace('{{network-model}}', jsonToHtml(JSON.stringify(networkModel, null, 4)))
    html = html.replace('{{wallet-model}}', jsonToHtml(JSON.stringify(walletModel, null, 4)))
    html = html.replace('{{user-model}}', jsonToHtml(JSON.stringify(userModel, null, 4)))

    // send the HTML content
    res.set('Content-Type', 'text/html').send(html)
})

router.post('/', passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
    // query database data
    const data = queryDb(req.body)

    if (data == null) throw new Error('query not successful')

    // update query response
    const msg = { result: 'successful database query' }

    // load the HTML template
    let html = fs.readFileSync(path.join(root, 'db.html'), 'utf-8')

    // replace the placeholder with the JSON data
    html = html.replace('{{response-msg}}', JSON.stringify(msg, null, 2))
    html = html.replace('{{response-data}}', jsonToHtml(JSON.stringify(data, null, 4)))

    // send the HTML content
    res.set('Content-Type', 'text/html').send(html)
})

export default router
