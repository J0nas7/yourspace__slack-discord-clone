type Status = 1 | 0

export type MessageDTO = {
    // Required
    Message_ID: number,
    Message_Content: string,
    Message_MemberID: number,
    Message_ChannelID: number,
    Message_CreatedAt: Date,
    Message_UpdatedAt: Date,
    
    // Optional
    Message_FileUrl?: string,
    Profile_DisplayName?: string,
    Profile_ImageUrl?: string,
    Channel_Name?: string,
    deleted?: Status
}