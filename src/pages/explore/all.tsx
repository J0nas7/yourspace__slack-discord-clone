// External
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGavel, faStar, faKey, faCheck } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

// Internal
import { Block, Text, Heading, Field, Profile as ProfileCard } from '@/components'
import { ProfileDTO, SpaceDTO } from '@/types'
import styles from '@/core-ui/styles/modules/Explore.module.scss'
import { useSpaces } from '@/hooks'
import {
    useTypedSelector,
    selectTheSpace,
    selectMembersList
} from '@/redux'

export default function ExploreAll() {
    // Hooks
    const { highlightedSpacesList, getHighlightedSpacesList } = useSpaces()

    // Internal variables

    // Redux

    // Methods
    useEffect(() => {
        getHighlightedSpacesList()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Block className="second-wrapper">
                <Block className="second-header">
                    <Text variant="span" className="title-only">
                        Explore
                    </Text>
                </Block>
            </Block>
            <Block className={"other-pages-wrapper " + styles["explore-wrapper"]}>
                <Block className={"other-pages-inner " + styles["explore"]}>
                    <Block className={styles["explore-jumbotron"]}>
                        <Block className={styles["explore-jumbotron-inner"]}>
                            <Heading variant="h1" title="Der findes et space hvor du hører til" />
                            <Text className="jumbotron-teaser">Alt imellem gaming og sport, eller kunst og læring. Der er et space til dig.</Text>
                        </Block>
                    </Block>
                    <Block className={"page-section " + styles["highlighted-section"]}>
                        <Heading variant="h2" title="Fremhævede communities" />
                        {highlightedSpacesList?.length && highlightedSpacesList.map((space, key) =>
                            <Block key={key}>
                                <Link href={"/space/" + space.Space_Name}>{space.Space_Name}</Link>
                            </Block>
                        )}
                    </Block>
                </Block>
            </Block>
        </>
    )
}