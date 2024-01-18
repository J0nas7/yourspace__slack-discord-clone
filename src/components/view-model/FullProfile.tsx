// External
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDot, faEnvelope, faRocket, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGoogle, faInstagram, faReddit } from '@fortawesome/free-brands-svg-icons'
import { Button } from '@mui/material'
import { hasFlag } from 'country-flag-icons'
import * as allFlags from 'country-flag-icons/react/3x2'
import clsx from 'clsx'

// Internal
import { ProfileDTO, SpaceDTO } from '@/types/'
import { Block, Text, Profile as ProfileCard, FlexibleBox, Space } from '@/components'
import styles from '@/core-ui/styles/modules/FullProfile.module.scss'
import { useSpaces } from '@/hooks'

type Props = {
    theProfile: ProfileDTO,
    profileID?: number,
    className?: string
}

export const FullProfile = ({
    theProfile, profileID, className
}: Props) => {
    // Hooks
    const { getMemberOfSpacesList, spacesList } = useSpaces()

    // Internal variables
    const profileNationality = theProfile.Profile_Country!
    const Flag: allFlags.FlagComponent = hasFlag(profileNationality) ?
        allFlags[profileNationality as keyof allFlags.FlagComponent] : allFlags['DK']
    const [profileLastActiveTxt, setProfileLastActiveTxt] = useState<string>('')

    // Time-related stuff
    const now = new Date()
    const profileCreated = new Date(theProfile.Profile_CreatedAt!)
    const profileBirthday: any = new Date(theProfile.Profile_Birthday!)
    const profileLastActive = new Date(theProfile.Profile_LastActive!.toLocaleString())
    const profileCreatedTxt = profileCreated.getDate() + "/" + (profileCreated.getMonth() + 1) + "-" + profileCreated.getFullYear()
    const profileYearsOld = new Date(now as any - profileBirthday).getFullYear() - 1970

    // Methods
    const calculateLastActive = () => {
        const profileLastActive = new Date(theProfile.Profile_LastActive!)
        let timeAgo = Math.floor((now.getTime() - profileLastActive.getTime()) / 1000)

        setProfileLastActiveTxt("active now")
        if (timeAgo > 59) { // minutes ago
            timeAgo = Math.floor(timeAgo / 60)
            setProfileLastActiveTxt(timeAgo + " minutes ago")

            if (timeAgo > 59) { // hours ago
                timeAgo = Math.floor(timeAgo / 60)
                setProfileLastActiveTxt(timeAgo + " hours ago")

                if (timeAgo > 23) { // days ago
                    timeAgo = Math.floor(timeAgo / 24)
                    setProfileLastActiveTxt(timeAgo + " day ago")

                    // more than a week ago
                    if (timeAgo > 6) setProfileLastActiveTxt("more than a week ago")
                }
            }
        }

        /*if (timeAgo > 86399 || msgCreated.getDate() !== now.getDate()) setTheDay("yesterday at ")
        if (timeAgo > 172799) setTheDay(msgCreated.getDate() + "/" + (msgCreated.getMonth() + 1) + ", ")
        setTimestamp(msgCreated.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' }))*/
    }

    useEffect(() => {
        calculateLastActive()
        getMemberOfSpacesList()
    }, [])

    useEffect(() => {
        console.log(spacesList)
    }, [spacesList])

    return (
        <Block className={clsx("full-pages-wrapper", className)}>
            <Block className={clsx("grid-wrapper max-cols-4", styles["profile-wrapper"], styles["profile-page"])}>
                <FlexibleBox numberOfColumns={4} className={clsx(styles["profile-jumbotron"], "no-box")}>
                    <Block>
                        <Block className={styles["profile-cover"]}>
                            <Image
                                src={"https://miro.medium.com/v2/resize:fit:1000/1*v3XndYeIsBtk4CkpMf7vmA.jpeg"}
                                className="absolute top-0 left-0 w-full h-full object-cover"
                                alt="Profile banner picture"
                                priority={true}
                                fill={true}
                            />
                            <Block className={"absolute w-full h-full z-20 top-0 left-0 " + styles["protect-layer"]}></Block>
                        </Block>
                        <Block className={styles["bottom-banner"]}>
                            <Block className={styles["profile-picture-wrapper"]}>
                                <ProfileCard
                                    variant="profile-picture"
                                    profile={theProfile}
                                    profileID={profileID}
                                    hook1={112}
                                    hook2={112}
                                    className={styles["profile-picture"]}
                                />
                            </Block>
                            <Block className={styles["profile-main-details"]}>
                                <Text variant="p" className={styles["name-area"]}>
                                    <Text variant="span" className={styles["full-name"]}>Jonas Sørensen</Text>
                                    <Text variant="span" className={styles["display-name-and-symbol"]}>({theProfile.Profile_DisplayName})</Text>
                                    <Text variant="span" className={styles["display-name-and-symbol"]}>
                                        <FontAwesomeIcon icon={faRocket} className={styles["symbol-size"]} />
                                    </Text>
                                    <Text variant="span" className="clear-both"></Text>
                                </Text>

                                <Block className={styles["other-profile-info"]}>
                                    <Block className="order-1">
                                        <Block className="float-left w-[200px]">
                                            <Block variant="p" className={styles["info-item"]}>
                                                <Text variant="span" className={styles["item-content"]}>
                                                    <FontAwesomeIcon icon={faCircleDot} className={clsx(styles["item-icon"], "text-green-300")} />
                                                    <Text variant="span" className={styles["item-text"]}>Online: {profileLastActiveTxt}</Text>
                                                </Text>
                                                <Text variant="span" className="clear-both"></Text>
                                            </Block>
                                            <Block variant="p" className={styles["info-item"]}>
                                                <Text variant="span" className={styles["item-content"]}>
                                                    <FontAwesomeIcon icon={faUser} className={styles["item-icon"]} />
                                                    <Text variant="span" className={styles["item-text"]}>Created: {profileCreatedTxt}</Text>
                                                </Text>
                                                <Text variant="span" className="clear-both"></Text>
                                            </Block>
                                        </Block>

                                        <Block className="float-left">
                                            <Block variant="p" className={styles["info-item"]}>
                                                <Text variant="span" className={styles["item-content"]}>
                                                    <FontAwesomeIcon icon={faUser} className={styles["item-icon"]} />
                                                    <Text variant="span" className={styles["item-text"]}>
                                                        <Text variant="span"><strong>Male </strong> {profileYearsOld} years old</Text>
                                                    </Text>
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

                                    <Block className={clsx("order-2 ml-auto uppercase", styles["profile-counters-wrap"])}>
                                        <Block className={styles["profile-counters"]}>
                                            <Block className="order-1">
                                                {spacesList && <Text variant="span" className={styles["counter-number"]}>{(spacesList.length).toLocaleString()}</Text>}
                                                <Text variant="span" className={clsx(styles["counter-title"], styles["spaces-joined"])}>Spaces joined</Text>
                                            </Block>
                                            <Block className="order-2">
                                                <Text variant="span" className={styles["counter-number"]}>{(3040).toLocaleString()}</Text>
                                                <Text variant="span" className={styles["counter-title"]}>Friends</Text>
                                            </Block>
                                        </Block>
                                    </Block>
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                </FlexibleBox>
                <FlexibleBox numberOfColumns={3} title="Profile Feed" className={styles["profile-feed"]}>
                    lorem ipsum
                </FlexibleBox>
                <FlexibleBox numberOfColumns={1} className={clsx("no-box", styles["profile-details"])}>
                    <Block className={clsx(styles["details-grid"], "grid-wrapper", "max-cols-2")}>
                        <FlexibleBox className={clsx(styles["details-row"], styles["profile-socials"])}>
                            <Block className={styles["social-icons"]}>
                                <Block className={clsx(styles["social-icon"], styles["reddit"])}>
                                    <FontAwesomeIcon icon={faReddit} className={styles["follow-social-icon"]} />
                                </Block>
                                <Block className={clsx(styles["social-icon"], styles["facebook"])}>
                                    <FontAwesomeIcon icon={faFacebook} className={styles["follow-social-icon"]} />
                                </Block>
                                <Block className={clsx(styles["social-icon"], styles["instagram"])}>
                                    <FontAwesomeIcon icon={faInstagram} className={styles["follow-social-icon"]} />
                                </Block>
                                <Block className={clsx(styles["social-icon"], styles["google"])}>
                                    <FontAwesomeIcon icon={faGoogle} className={styles["follow-social-icon"]} />
                                </Block>
                            </Block>
                            <Block className={styles["social-button-wrap"]}>
                                <Button className={clsx("button", "button-green", styles["social-button"])}>
                                    <FontAwesomeIcon icon={faUserPlus} className={styles["social-button-icon"]} />
                                    Add Friend
                                </Button>
                            </Block>
                            <Block className={styles["social-button-wrap"]}>
                                <Button className={clsx("button", "button-green", styles["social-button"])}>
                                    <FontAwesomeIcon icon={faEnvelope} className={styles["social-button-icon"]} />
                                    Send Message
                                </Button>
                            </Block>
                        </FlexibleBox>
                        <FlexibleBox title="Joined Spaces" className={clsx(styles["details-row"], styles["side-boxes"])}>

                            {spacesList && spacesList.length ? (
                                <>
                                    {
                                        spacesList.map((space: SpaceDTO, i) =>
                                            <Text variant="span" className={styles["space-joined"]} key={i}>
                                                <Space variant='name' withLabel={true} space={space} />
                                            </Text>
                                        )
                                    }
                                </>
                            ) : (
                                <Text variant="span" className={styles["no-spaces-joined"]}>No spaces joined</Text>
                            )}
                        </FlexibleBox>
                    </Block>
                </FlexibleBox>
            </Block>
        </Block>
    )
}