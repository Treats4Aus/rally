export interface Message {
    groupId: string,
    senderId: string,
    senderDisplayName?: string,
    sentTimeStamp: number,
    text: string
}
