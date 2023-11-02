type Channel = 'TEXT' | 'AUDIO' | 'VIDEO'

export type ChannelDTO = {
    // Required
    Channel_ID: number,
    Channel_Name: string,
    Channel_Type: Channel,

    // Optional
    Channel_Access?: string
    Channel_SpaceID?: number
}