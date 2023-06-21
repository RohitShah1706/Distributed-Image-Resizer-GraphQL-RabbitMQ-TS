interface TaskMessage {
    userId: string;
    key: string;
    operations: string[];
}

interface TaskMessageResponse {
    key?: string;
    message: string;
    status: string;
}

export {
    TaskMessage,
    TaskMessageResponse
}