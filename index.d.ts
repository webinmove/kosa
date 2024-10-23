type ErrorMeta = {
    error?: string;
    validations?: Array<Record<string, any>>;
    details?: Record<string, any>;
    context?: string;
    [key: string]: any;
}

declare class Kosa extends Error {
    /**
     * Create a new Kosa error
     * @param scope The error scope/domain
     * @param statusCode HTTP status code
     * @param meta Additional error metadata
     */
    constructor(
        scope: string,
        statusCode?: StatusCode | number,
        meta?: ErrorMeta
    );

    statusCode: number;
    message: string;
    meta: ErrorMeta;
    stack?: string;
}

export = Kosa;