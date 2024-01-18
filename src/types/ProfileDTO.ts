export type ProfileDTO = {
    // Required
    Profile_ID: number,
    Profile_DisplayName: string,
    
    // Optional
    Profile_ImageUrl?: string,
    Profile_Country?: string,
    Profile_RealName?: string,
    Profile_Email?: string,
    Profile_LastActive?: Date
    Profile_Birthday?: Date
    Profile_CreatedAt?: Date
    Profile_UpdatedAt?: Date
    
    // Only with messages
    Member_Role?: string
}