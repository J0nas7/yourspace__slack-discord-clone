export type DirectMessageDTO = {
    // Required
    DM_ID: number,
    DM_Content: string,
    DM_MemberID: number,
    DM_ConversationID: number,
    DM_CreatedAt: Date,
    DM_UpdatedAt: Date,
    
    // Optional
    DM_FileUrl?: string,
    Profile_DisplayName?: string,
    Profile_ImageUrl?: string,
}