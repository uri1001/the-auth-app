export const logRequest = (auth: boolean, url: string, reqData: any, resData: any): void => {
    console.log(`\n--- External API Request ---\n`)
    console.log(`   Request URL - ${url} - Authenticated - ${String(auth)}`)
    console.log('   Request Data - ', reqData)
    console.log('   Response Data - ', resData, `\n`)
}
