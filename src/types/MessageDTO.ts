type Status = 'visible' | 'hidden'

export type MessageDTO = {
    // Required
    messageID: number,
    userID: number,
    userName: string,
    messageContent: string,
    messageDate: Date,

    // Optional
    status?: Status
}