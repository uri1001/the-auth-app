import { type NextFunction, type Request, type Response } from 'express'
import { validationResult } from 'express-validator'

const validate = (req: Request, res: Response, _next: NextFunction): void => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() })
}

export default validate
