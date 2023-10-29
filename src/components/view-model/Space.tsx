// External
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

// Internal
//import { useAxios } from '@/hooks'
import { Block, Text, Heading, Modal, Field } from '@/components'
import { SpaceDTO } from '@/types/'
import styles from '@/core-ui/styles/modules/Sidepanel.module.scss'

type Variant = 'name' | 'sidepanel'
type Props = {
    variant: Variant
    withLabel: boolean
    space: SpaceDTO
    className?: string
    theId?: string
}

const Space = ({
    variant = 'name', withLabel = false, space, className, theId
}: Props) => {
    const router = useRouter()
    const theSpace: SpaceDTO = space
    const logoText = (theSpace?.Space_ImageUrl ? false : theSpace?.Space_Name.slice(0,4))

    if (theSpace && variant === "name") {
        return (
            <Link href={"/space/" + theSpace.Space_Name} className={(withLabel ? 'with-label' : '')}>
                {theSpace.Space_Name}
            </Link>
        )
    } else if (theSpace && variant === "sidepanel") {
        return (
            <Link href={"/space/" + theSpace.Space_Name} className={(withLabel ? 'with-label' : '')}>
                {logoText && (<Text variant="span" className="space-logotext">{logoText}</Text>)}
                <Text variant="span" className="space-label">
                    <Text variant="span" className="inner-label">
                        {theSpace.Space_Name}
                    </Text>
                </Text>
            </Link>
        )
    }

    return (
        <></>
    )
}

export default Space