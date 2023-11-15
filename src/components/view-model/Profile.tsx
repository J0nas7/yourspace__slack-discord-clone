// External
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faArrowRightFromBracket, faTrash, faFont } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'

// Internal
import { env, paths } from '@/env.local'
import { useAxios, useAuthContext, useSpaces } from '@/hooks'
import { Block, Text, Profile as ProfileCard } from '@/components'
import { ProfileDTO, SpaceDTO } from '@/types/'

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
    const { removeMember } = useSpaces()

    // Internal variables
    const now = new Date()
    const tempSpaceName: string = router.query.spaceName?.toString()!
    const [theProfile, setTheProfile] = useState<ProfileDTO>()
    const [spaceBottomActionMenu, setSpaceBottomActionMenu] = useState<boolean>(false)

    const demoImg = "/member-icon.png"
    const imgFolder = env.url.API_URL + "/profile_images/"
    const [imgSrc, setImgSrc] = useState<string>('')

    const tempSpace: SpaceDTO = {
        Space_ID: 0,
        Space_Name: tempSpaceName,
    }

    // Methods
    const triggerLeaveSpaceModal = () => {
        setSpaceBottomActionMenu(false)
        if (confirm("Are you sure you want to leave this space?")) {
            removeMember()
        }
    }

    const profileMyself = async () => {
        //console.log(variant + " myself", profile, profileID, theProfile)
        const profileData = await httpGetRequest("readUser")
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
                    <Block className={className + " space-member"}>
                        <ProfileCard variant="profile-picture" className="profile-picture h25" profile={theProfile} />
                        <Text variant="span" className="display-name">{theProfile.Profile_DisplayName}</Text>
                        <FontAwesomeIcon icon={faTrash} className="member-action remove-member" />
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
                            <FontAwesomeIcon icon={faGear} className="profile-settings" onClick={() => setSpaceBottomActionMenu(!spaceBottomActionMenu)} />
                        </Block>
                        <Block className={"profile-settings-nav " + (spaceBottomActionMenu ? "visible" : "")}>
                            <nav>
                                <ul>
                                    <li className="profile-settings-nav-item">
                                        <Link
                                            onClick={() => setSpaceBottomActionMenu(false)}
                                            href={"/space/" + tempSpace.Space_Name + "/leave"}
                                            className="profile-settings-nav-item-clickable"
                                        >
                                            <FontAwesomeIcon icon={faFont} />
                                            Change nickname
                                        </Link>
                                    </li>
                                    <li className="profile-settings-nav-item color-red">
                                        <Text
                                            variant="span"
                                            onClick={() => triggerLeaveSpaceModal()}
                                            className="profile-settings-nav-item-clickable"
                                        >
                                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                            Leave space
                                        </Text>
                                    </li>
                                </ul>
                            </nav>
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