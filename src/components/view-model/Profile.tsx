// External
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

// Internal
import { env, paths } from '@/env.local'
import { useAxios, useAuthContext } from '@/hooks'
import { Block, Text, Profile as ProfileCard } from '@/components'
import { ProfileDTO } from '@/types/'

type Variant = 'in-channel' | 'space-settings-member' | 'space-bottom' | 'profile-picture'
type Props = {
    variant: Variant
    profile?: ProfileDTO
    profileID?: number
    className?: string
}

const Profile = ({
    variant = 'in-channel', profile, profileID, className
}: Props) => {
    // Hooks
    const router = useRouter()
    const { httpGetRequest } = useAxios()
    const { doLogout } = useAuthContext()

    // Internal variables
    const now = new Date()
    const [theProfile, setTheProfile] = useState<ProfileDTO>()

    const demoImg = "/member-icon.png"
    const imgFolder = env.url.API_URL + "/profile_images/"
    const [imgSrc, setImgSrc] = useState<string>('')

    // Methods
    const profileMyself = async () => {
        //console.log(variant + " myself", profile, profileID, theProfile)
        const profileData = await httpGetRequest("userData")
        if (profileData.data) setTheProfile(profileData.data)
    }

    useEffect(() => {
        if (profile) setTheProfile(profile)
        // Set profile to logged-in user, if none is provided from props
        if (!profile && !profileID) {
            profileMyself()
        }
    }, [])

    useEffect(() => {
        const profileImage = theProfile?.Profile_ImageUrl
        if (theProfile && profileImage) {
            setImgSrc(profileImage)
        } else {
            setImgSrc(demoImg)
        }
    }, [theProfile])

    if (variant == "in-channel") {
        return (
            <>
                {theProfile && <Text variant="span" className={className}>{theProfile?.Profile_DisplayName}</Text>}
            </>
        )
    } else if (variant == "space-settings-member") {
        return (
            <>
                {theProfile && (
                    <Block className={className}>
                        <ProfileCard variant="profile-picture" className="profile-picture h25" profile={theProfile} />
                        <Text variant="span">{theProfile.Profile_DisplayName}</Text>
                    </Block>
                )}
            </>
        )
    } else if (variant == "space-bottom") {
        return (
            <>
                {theProfile && (
                    <Block className={"yourprofile-global " + className}>
                        <ProfileCard variant="profile-picture" className="profile-picture" profile={theProfile} />
                        <Block className="profile-info">
                            {theProfile?.Profile_DisplayName}
                        </Block>
                        <Block className="profile-actions">
                            <FontAwesomeIcon icon={faArrowRightFromBracket} className="profile-logout" onClick={() => doLogout()} />
                            <FontAwesomeIcon icon={faGear} className="profile-settings" />
                        </Block>
                    </Block>
                )}
            </>
        )
    } else if (variant == "profile-picture") {
        return (
            <>
                {theProfile && imgSrc && (
                    <Image
                        alt=""
                        width={40}
                        height={40}
                        className={className}
                        src={imgSrc}
                        priority={false}
                        onError={() => {
                            setImgSrc(demoImg)
                        }}
                    />
                )}
            </>
        )
    }

    return (
        <></>
    )
}

export default Profile