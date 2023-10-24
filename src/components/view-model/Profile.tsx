// External
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'

// Internal
import { useAxios } from '@/hooks'
import { Block, Text, Heading, Modal, Field } from '@/components'
import { ProfileDTO } from '@/types/'
import styles from '@/core-ui/styles/modules/Message.module.scss'

type Variant = 'in-channel' | 'space-bottom'
type Props = {
    variant: Variant
    profile?: any
    profileID?: number
    className?: string
}

const Profile = ({
    variant = 'in-channel', profile, profileID, className
}: Props) => {
    // Hooks
    const router = useRouter()
    const { httpGetRequest } = useAxios()

    // Internal variables
    const now = new Date()
    const [theProfile,setTheProfile] = useState<ProfileDTO>(profile)
    const profilePicFolder = ""//apiUrl+"item_images/"
    
    // Methods
    const profileMyself = async () => {
        const profileData = await httpGetRequest("userData")
        if (profileData.data) setTheProfile(profileData.data)
    }

    useEffect(() => {
        // Set profile to logged-in user, if none is provided from props
        if (!profile && !profileID) {
            profileMyself()
        }
    }, [])

    if (variant == "in-channel") {
        return (
            <Block className={className}>hej</Block>
        )
    } else if (variant == "space-bottom") {
        return (
            <Block className={className}>{theProfile?.Profile_DisplayName}</Block>
        )
    }

    return (
        <></>
    )
}

export default Profile