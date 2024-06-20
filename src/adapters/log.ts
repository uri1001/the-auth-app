export const logRequest = (auth: boolean, url: string, reqData: any, resData: any): void => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`\nRequest URL - ${url} - Authenticated - ${auth}`)
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`Request Data - ${reqData}`)
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`Response Data - ${resData}\n`)
}
