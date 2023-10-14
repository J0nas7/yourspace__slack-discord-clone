type Status = 'visible' | 'hidden'

export type SpaceDTO = {
    // Required
    Space_ID: number,
    Space_Name: string

    // Optional
    Space_Status?: Status
}