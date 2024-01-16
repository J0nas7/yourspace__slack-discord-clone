// External
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDot, faMagnifyingGlass, faPeopleGroup, faRocket, faUser } from '@fortawesome/free-solid-svg-icons'
import { hasFlag } from 'country-flag-icons'
import * as allFlags from 'country-flag-icons/react/3x2'

// Internal
import { ProfileDTO, SpaceDTO } from '@/types/'
import { Block, Text, Profile as ProfileCard, FlexibleBox } from '@/components'
import styles from '@/core-ui/styles/modules/FullProfile.module.scss'

type Props = {
    theProfile: ProfileDTO,
    profileID?: number,
    className?: string
}

export const FullProfile = ({
    theProfile, profileID, className
}: Props) => {
    const profileNationality = "DK"
    const Flag = hasFlag(profileNationality) ? allFlags[profileNationality] : allFlags['DK']

    return (
        <Block className={"full-pages-wrapper " + className}>
            <Block className={"w-full !grid grid-wrapper max-cols-4 float-left " + styles["profile-wrapper"] + " " + styles["profile-page"]}>
                <FlexibleBox numberOfColumns={4} className='no-box'>
                    <Block>
                        <Block className={"relative overflow-hidden rounded-t-lg " + styles["profile-cover"]}>
                            <Image
                                src={"https://miro.medium.com/v2/resize:fit:1000/1*v3XndYeIsBtk4CkpMf7vmA.jpeg"}
                                className="absolute top-0 left-0 w-full h-full object-cover"
                                alt="Profile banner picture"
                                fill={true}
                            />
                            <Block className={"absolute w-full h-full z-20 top-0 left-0 " + styles["protect-layer"]}></Block>
                        </Block>
                        <Block className={"h-16 px-4 mb-6 rounded-b-lg relative z-30 flex items-center "+styles["bottom-banner"]}>
                            <Block className={"ml-5 absolute -top-20 z-30 "+styles["profile-picture-wrapper"]}>
                                <ProfileCard
                                    variant="profile-picture"
                                    profile={theProfile}
                                    profileID={profileID}
                                    hook1={112}
                                    hook2={112}
                                    className={styles["profile-picture"]}
                                />
                            </Block>
                            <Block className="mx-5 pl-36 absolute -top-11 w-[calc(100%-2.5rem)]">
                                <Text variant="p" className="w-full text-white">
                                    <Text variant="span" className="text-xl font-bold float-left">Jonas Sørensen</Text>
                                    <Text variant="span" className="ml-1 float-left">({theProfile.Profile_DisplayName})</Text>
                                    <Text variant="span" className="ml-1 float-left">
                                        <FontAwesomeIcon icon={faRocket} className="w-6 h-5" />
                                    </Text>
                                    <Text variant="span" className="clear-both"></Text>
                                </Text>

                                <Block className="w-full flex items-center gap-4">
                                    <Block className="order-1">
                                        <Block variant="p" className="my-1">
                                            <Text variant="span" className="flex items-center">
                                                <FontAwesomeIcon icon={faCircleDot} className="text-green-300 w-4 h-3 mr-1 rounded-full float-left" />
                                                <Text variant="span" className="text-sm">Online: a moment ago</Text>
                                            </Text>
                                            <Text variant="span" className="clear-both"></Text>
                                        </Block>
                                        <Block variant="p" className="my-1">
                                            <Text variant="span" className="flex items-center">
                                                <FontAwesomeIcon icon={faUser} className="w-4 h-3 mr-1 rounded-full float-left" />
                                                <Text variant="span" className="text-sm">Created: nov. 2024</Text>
                                            </Text>
                                            <Text variant="span" className="clear-both"></Text>
                                        </Block>
                                    </Block>

                                    <Block className="order-2 hidden">
                                        <Block variant="p" className="my-1">
                                            <Text variant="span" className="flex items-center">
                                                <FontAwesomeIcon icon={faUser} className="w-4 h-3 mr-1 rounded-full float-left" />
                                                <Text variant="span" className="text-sm mr-1">
                                                    <Text variant="span"><strong>Male </strong> 30 years old</Text>
                                                </Text>
                                            </Text>
                                            <Text variant="span" className="clear-both"></Text>
                                        </Block>
                                        <Block variant="p" className="my-1">
                                            <Text variant="span" className="flex items-center">
                                                <Flag className="w-4 h-3 mr-1" />
                                                <Text variant="span" className="text-sm">Denmark / Danish</Text>
                                            </Text>
                                            <Text variant="span" className="clear-both"></Text>
                                        </Block>
                                    </Block>

                                    <Block className="order-3 hidden ml-auto uppercase">
                                        <Block className="flex items-center gap-8">
                                            <Block className="order-1">
                                                <Text variant="span" className="font-semibold text-2xl">35</Text>
                                                <Text variant="span" className={"font-extralight "+styles["spaces-joined"]}>Spaces joined</Text>
                                            </Block>
                                            <Block className="order-2">
                                                <Text variant="span" className="font-semibold text-2xl">3040</Text>
                                                <Text variant="span" className="font-extralight">Friends</Text>
                                            </Block>
                                        </Block>
                                    </Block>
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                </FlexibleBox>
            </Block>
        </Block>
    )
}