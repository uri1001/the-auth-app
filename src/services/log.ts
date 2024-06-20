export const logJwt = (token: string, key: string): void => {
    console.log(`\nJWT - issued token`)
    console.log(` - Token sent. Debug at https://jwt.io/?value=${token}`)
    console.log(` - Token secret (to verify signature): ${key}\n`)
}
