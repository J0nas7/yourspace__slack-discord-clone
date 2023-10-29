// External
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

// Internal
import { useAxios } from '@/hooks'
import { Block, Text, Modal, Field, Profile as ProfileCard } from '@/components'
import styles from '@/core-ui/styles/modules/Message.module.scss'
import { MessageDTO, ProfileDTO } from '@/types'
import { MemberRole } from "@prisma/client"

type Variant = 'in-channel'
type Props = {
    variant: Variant
    message: MessageDTO
    className?: string
    currentProfile: ProfileDTO
    membersList?: ProfileDTO[]
    theId?: string
}

const Message = ({
    variant = 'in-channel', message, className, currentProfile, membersList, theId
}: Props) => {
    // Hooks
    const router = useRouter()
    const { httpGetRequest } = useAxios()

    // Internal variables
    const theMessage: MessageDTO = message
    const [editMsg, setEditMsg] = useState<string>(theMessage.Message_Content)
    const [editModal, setEditModal] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [theDay, setTheDay] = useState<string>('')
    const [timestamp, setTimestamp] = useState<string>('')
    const fileType = theMessage.Message_FileUrl?.split(".").pop()
    const theMember: ProfileDTO = membersList?.filter((member) => member.Profile_ID == theMessage.Message_MemberID).pop()!

    // Channel priviligies
    const isAdmin = currentProfile.Member_Role === MemberRole.ADMIN
    const isModerator = currentProfile.Member_Role === MemberRole.MODERATOR
    const isOwner = currentProfile.Profile_ID == theMessage.Message_MemberID
    const canDelete = !theMessage.deleted && (isAdmin || isModerator || isOwner)
    const canEdit = !theMessage.deleted && isOwner && !theMessage.Message_FileUrl
    const isPDF = fileType === "pdf" && theMessage.Message_FileUrl
    const isImage = !isPDF && theMessage.Message_FileUrl

    // Methods
    const editMessage = () => canEdit ? setEditModal(true) : false
    const deleteMessage = () => canDelete ? setDeleteModal(true) : false

    const setDateAndTime = () => {
        const now = new Date()
        const msgCreated = new Date(theMessage.Message_CreatedAt)
        let timeAgo = Math.floor((now.getTime() - msgCreated.getTime()) / 1000)
        setTheDay("today at ")
        if (timeAgo > 86399 || msgCreated.getDate() !== now.getDate()) setTheDay("yesterday at ")
        if (timeAgo > 172799) setTheDay(msgCreated.getDate() + "/" + (msgCreated.getMonth() + 1) + ", ")
        setTimestamp(msgCreated.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' }))
    }

    useEffect(() => {
        setDateAndTime()
    }, [theMessage.Message_CreatedAt])

    if (variant == "in-channel") {
        return (
            <Block className={styles["message-item"]}>
                {theMember && <ProfileCard variant="profile-picture" className="profile-picture" profile={theMember} />}
                <Block className={styles["message-details"]}>
                    <Block className={styles["message-top"]}>
                        <Block className="left-side">
                            {theMember && <ProfileCard variant="in-channel" className={styles["message-username"]} profile={theMember} />}
                            {theDay && timestamp && (
                                <Text variant="span" className={styles["message-datestamp"]}>
                                    {theDay + timestamp} ({theMessage.Message_ID})
                                </Text>
                            )}
                        </Block>
                        <Block className={"right-side " + styles["message-actions"]}>
                            {canEdit && (<FontAwesomeIcon icon={faPen} className={styles["message-action"]} onClick={() => editMessage()} />)}
                            {canDelete && (<FontAwesomeIcon icon={faTrashCan} className={styles["message-action"]} onClick={() => deleteMessage()} />)}
                        </Block>
                    </Block>
                    <Block className={styles["message-content"]}>
                        {theMessage.Message_Content}
                    </Block>
                </Block>

                {canEdit && (
                    <Modal
                        openModal={editModal}
                        closeModal={() => setEditModal(false)}
                        title="Edit the message"
                        className={styles["edit-message-dialog"] + " m" + theMessage.Message_MemberID}
                    >
                        <Field
                            type="text"
                            lbl="Edit the message:"
                            value={editMsg}
                            onChange={(e: string) => setEditMsg(e)}
                            disabled={false}
                            grow={true}
                            growMin={3}
                            className="message-field"
                        />
                        <Button className="button button-green dialog-edit-message-submit" onClick={() => alert('hej')} disabled={false}>
                            <Text variant="span" className="button button-text">Save changes</Text>
                        </Button>
                    </Modal>
                )}

                {canDelete && (
                    <Modal
                        openModal={deleteModal}
                        closeModal={() => setDeleteModal(false)}
                        title="Delete the message"
                        className={styles["delete-message-dialog"] + " m" + theMessage.Message_MemberID}
                    >
                        Are you sure you want to delete this message?
                        <Button className="button button-red dialog-edit-message-submit" onClick={() => alert('hej')} disabled={false}>
                            <Text variant="span" className="button button-text">Yes, delete it</Text>
                        </Button>
                    </Modal>
                )}
            </Block>
        )
    }

    return (
        <></>
    )
}

export default Message