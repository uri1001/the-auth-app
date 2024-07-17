import { type NextFunction, type Request, type Response } from 'express'
import { checkSchema, validationResult } from 'express-validator'

const validate = (schema: any): any => [
    checkSchema(schema),
    (req: Request, res: Response, next: NextFunction): any => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
        next()
    },
]

export default validate
