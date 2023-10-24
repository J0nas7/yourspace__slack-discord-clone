export type ProfileDTO = {
    // Required
    Profile_ID: number,
    Profile_DisplayName: string,
    Profile_ImageUrl: string,
    
    // Optional
    Profile_RealName?: string,
    Profile_Email?: string,
    Profile_Birthday?: Date
    
    // Only with messages
    Member_Role?: string
}