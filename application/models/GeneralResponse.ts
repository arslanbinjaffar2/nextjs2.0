export interface HttpResponse {
    data: GeneralResponse,
    status: number,
}

export interface GeneralResponse {
    data?: any,
    meta?: any,
    message?: string,
    error?: string,
    redirect?: string,
    success?: boolean
}