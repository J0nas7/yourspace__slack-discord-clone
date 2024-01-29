// External
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faArrowRightFromBracket, faTrash, faFont, faGavel, faStar, faKey, faUser, faCircleDot, faUserPlus, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { hasFlag } from 'country-flag-icons'
import * as allFlags from 'country-flag-icons/react/3x2'
import clsx from 'clsx'

// Internal
import { env, paths } from '@/env.local'
import { useAxios, useAuthContext, useSpaces } from '@/hooks'
import { Block, Text, Profile as ProfileCard } from '@/components'
import { FullProfile } from '@/components/view-model/FullProfile'
import { ProfileDTO, SpaceDTO } from '@/types/'
import styles from '@/core-ui/styles/modules/FullProfile.module.scss'
import yourspace_logo from '@/Assets/Images/headerLogo.png'

type Variant = 'in-channel' | 'in-channel-full-profile' | 'full-profile' | 'space-settings-member' | 'space-bottom' | 'profile-display-name' | 'profile-picture'
type Props = {
    variant: Variant
    condition?: string
    profile?: ProfileDTO
    profileID?: number
    className?: string
    style?: object
    hook1?: any
    hook2?: any
    onClick?: Function
}

const Profile = ({
    variant = 'in-channel', condition, profile, profileID, className, style, hook1, hook2, onClick
}: Props) => {
    // Hooks
    const router = useRouter()
    const { httpPostWithData } = useAxios()
    const { doLogout } = useAuthContext()
    const { deleteMember } = useSpaces()

    // Internal variables
    const now = new Date()
    const tempSpaceName: string = router.query.spaceName?.toString()!
    const [theProfile, setTheProfile] = useState<ProfileDTO>()
    const [spaceBottomActionMenu, setSpaceBottomActionMenu] = useState<boolean>(false)

    // Profile picture
    const demoImg = "/member-icon.png"
    const imgFolder = env.url.API_URL + "/profile_images/"
    const [imgSrc, setImgSrc] = useState<string>('')

    // Country flag
    const profileNationality = theProfile?.Profile_Country || ''
    const Flag: allFlags.FlagComponent = hasFlag(profileNationality) ?
        allFlags[profileNationality as keyof allFlags.FlagComponent] : allFlags['US']

    // Dates
    const profileCreated = theProfile?.Profile_CreatedAt ? new Date(theProfile.Profile_CreatedAt) : new Date()
    const profileCreatedTxt = profileCreated.getDate() + "/" + (profileCreated.getMonth() + 1) + "-" + profileCreated.getFullYear()
    const memberCreated = theProfile?.Member_CreatedAt ? new Date(theProfile.Member_CreatedAt) : new Date()
    const memberCreatedTxt = memberCreated.getDate() + "/" + (memberCreated.getMonth() + 1) + "-" + memberCreated.getFullYear()

    const tempSpace: SpaceDTO = {
        Space_ID: 0,
        Space_Name: tempSpaceName,
    }

    // Methods
    const triggerLeaveSpaceModal = () => {
        setSpaceBottomActionMenu(false)
        if (confirm("Are you sure you want to leave this space?")) {
            if (theProfile) deleteMember(theProfile, "member")
        }
    }

    const getProfileDetails = async (profileID?: number) => {
        const getProfileDetailsVariables = {
            "Profile_ID": profileID
        }
        const profileData = await httpPostWithData("readUser", getProfileDetailsVariables)
        if (profileData.data) setTheProfile(profileData.data)
    }

    useEffect(() => {
        if (profile) {
            setTheProfile(profile)
        } else {
            getProfileDetails(profileID)
        }
    }, [profileID])// eslint-disable-line react-hooks/exhaustive-deps

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
                {theProfile && (
                    <Block
                        className={className}
                        onClick={onClick ? (e: MouseEvent) => onClick(e) : undefined}
                    >
                        <Text variant="span">{theProfile?.Profile_DisplayName}</Text>
                    </Block>
                )}
            </>
        )
    } else if (variant == "in-channel-full-profile") {
        return (
            <>
                {theProfile && (
                    <Block className={clsx(className, styles["in-channel-full-profile"])} style={style}>
                        <Block className={styles["profile-jumbotron"]}>
                            <ProfileCard
                                variant="profile-picture"
                                className={styles["profile-picture"]}
                                profile={theProfile}
                                hook1={112}
                                hook2={112}
                            />
                            <Block className={styles["profile-main-details"]}>
                                <Block className={styles["other-profile-info"]}>
                                    <Block variant="p" className={styles["info-item"]}>
                                        <Text variant="span" className={styles["item-content"]}>
                                            <FontAwesomeIcon icon={faCircleDot} className={clsx(styles["item-icon"], "text-green-300")} />
                                            <Text variant="span" className={styles["item-text"]}>Online: nu</Text>
                                        </Text>
                                        <Text variant="span" className="clear-both"></Text>
                                    </Block>
                                    <Block variant="p" className={styles["info-item"]}>
                                        <Text variant="span" className={styles["item-content"]}>
                                            <Flag className={clsx(styles["item-icon"], styles["flag"])} />
                                            <Text variant="span" className={styles["item-text"]}>{theProfile.Profile_Country}</Text>
                                        </Text>
                                        <Text variant="span" className="clear-both"></Text>
                                    </Block>
                                </Block>
                            </Block>
                        </Block>
                        <Block className={styles["profile-more"]}>
                            <Text className={styles["profile-id"]} variant="span">#{theProfile.Profile_ID}</Text>
                            <Text className={styles["profile-info"]} variant="span">
                                <Text className={styles["profile-info-title"]} variant="span">
                                    Called:
                                </Text>
                                {theProfile.Profile_RealName}<br />
                                &quot;{theProfile.Profile_DisplayName}&quot;
                            </Text>
                            <Text className={styles["profile-info"]} variant="span">
                                <Text className={styles["profile-info-title"]} variant="span">
                                    Member since:
                                </Text>
                                <Block className={styles["member-since-wrapper"]}>
                                    {theProfile.Profile_CreatedAt &&
                                        <>
                                            <Image
                                                id="logo"
                                                width={18}
                                                height={18}
                                                src={yourspace_logo}
                                                alt="YourSpace logo"
                                                className={styles["yourspace-logo"]}
                                                priority={true}
                                            />
                                            <Text className={styles["profile-since"]} variant="span">
                                                {profileCreatedTxt}
                                            </Text>
                                        </>
                                    }
                                    {theProfile.Member_CreatedAt &&
                                        <>
                                            <Text className={styles["space-logo"]} variant="span">
                                                [Brog]
                                            </Text>
                                            <Text className={styles["member-since"]} variant="span">
                                                {memberCreatedTxt}
                                            </Text>
                                        </>
                                    }
                                    <Block className="clear-both"></Block>
                                </Block>
                            </Text>
                            <Text className={styles["profile-info"]} variant="span">
                                <Text className={styles["profile-info-title"]} variant="span">
                                    Role:
                                </Text>
                                <Text className={styles["profile-info-role"]} variant="span">
                                    {theProfile.Member_Role}
                                </Text>
                            </Text>
                            <Text className={styles["profile-info"]} variant="span">
                                <Text className={styles["profile-info-title"]} variant="span">
                                    Connect:
                                </Text>
                                <Text className={styles["profile-info-connect"]} variant="span">
                                    <Button className={clsx("button", "button-green", styles["social-button"])}>
                                        <FontAwesomeIcon icon={faUserPlus} className={styles["social-button-icon"]} />
                                        Add Friend
                                    </Button>
                                    <Button className={clsx("button", "button-green", styles["social-button"])}>
                                        <FontAwesomeIcon icon={faEnvelope} className={styles["social-button-icon"]} />
                                        Send Message
                                    </Button>
                                </Text>
                            </Text>
                        </Block>
                    </Block>
                )}
            </>
        )
    } else if (variant == "full-profile") {
        return (
            <>
                {theProfile &&
                    <>
                        <FullProfile
                            theProfile={theProfile}
                            profileID={profileID}
                        />
                    </>
                }
            </>
        )
    } else if (variant == "space-settings-member") {
        return (
            <>
                {theProfile && (
                    <>
                        <Block className={className + " space-member-wrapper"}>
                            <Block className="space-member space-member-details">
                                <ProfileCard variant="profile-picture" className="profile-picture h25" profile={theProfile} />
                                <Text variant="span" className="display-name">{theProfile.Profile_DisplayName}</Text>
                            </Block>
                            <Block className="space-member-tools">
                                {hook1 && condition == "membership" && (
                                    <FontAwesomeIcon icon={faTrash} className="member-action remove-member" onClick={() => hook1(theProfile)} />
                                )}
                                {hook2 && condition == "membership" && (
                                    <FontAwesomeIcon icon={faGavel} className="member-action make-mod" onClick={() => hook2("Moderator", theProfile)} />
                                )}
                                {hook1 && hook2 && condition == "member-role" && (
                                    <>
                                        <FontAwesomeIcon icon={faUser} className="member-action make-member" onClick={() => hook2("Guest", theProfile)} />
                                        <FontAwesomeIcon icon={faGavel} className="member-action make-mod" onClick={() => hook2("Moderator", theProfile)} />
                                        <FontAwesomeIcon icon={faStar} className="member-action make-admin" onClick={() => hook2("Admin", theProfile)} />
                                        <FontAwesomeIcon icon={faTrash} className="member-action remove-member" onClick={() => hook1(theProfile)} />
                                    </>
                                )}
                            </Block>
                        </Block>
                    </>
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
                            <ProfileCard variant="profile-display-name" className="profile-picture" profile={theProfile} />
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
    } else if (variant == "profile-display-name") {
        return (
            <>
                {theProfile && (
                    <Link
                        href={"/profile/" + theProfile.Profile_DisplayName + "/" + theProfile.Profile_ID}
                        className="profile-displayname-link"
                    >
                        {theProfile.Profile_DisplayName}
                    </Link>
                )}
            </>
        )
    } else if (variant == "profile-picture") {
        const width: number = (hook1 ? hook1 : 40)
        const height: number = (hook2 ? hook2 : 40)
        return (
            <>
                {theProfile && imgSrc && (
                    <Image
                        alt=""
                        width={width}
                        height={height}
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