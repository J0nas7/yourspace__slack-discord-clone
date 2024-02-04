// External
import { useRouter } from 'next/navigation'
import { CSSProperties, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import clsx from 'clsx'

// Internal
import { useAxios, useMessages } from '@/hooks'
import { Block, Text, Modal, Profile as ProfileCard, ChatInput } from '@/components'
import styles from '@/core-ui/styles/modules/Message.module.scss'
import { DirectMessageDTO, MessageDTO, ProfileDTO } from '@/types'
import { MemberRole } from "@prisma/client"

type Variant = 'in-channel' | 'in-conversation'
type Props = {
    variant: Variant
    message?: MessageDTO
    dm?: DirectMessageDTO
    openProfile: number
    setOpenProfile: Function
    className?: string
    currentProfile: ProfileDTO
    membersList?: ProfileDTO[]
    theId?: string
}

const Message = ({
    variant = 'in-channel', message, dm, openProfile, setOpenProfile, className, currentProfile, membersList, theId
}: Props) => {
    // Hooks
    const router = useRouter()
    const { httpGetRequest } = useAxios()
    const { updateExistingMessage, deleteMessage } = useMessages()

    // Internal variables
    const theMessage: MessageDTO | boolean = message ? message : false
    const theDM: DirectMessageDTO | boolean = dm ? dm : false
    const [editMsg, setEditMsg] = useState<string>('')
    const [editModal, setEditModal] = useState<boolean>(false)
    const [newContent, setNewContent] = useState<string>('')
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [theDay, setTheDay] = useState<string>('')
    const [timestamp, setTimestamp] = useState<string>('')
    const [fileType, setFileType] = useState<any>('')
    const [theMember, setTheMember] = useState<ProfileDTO>()

    // Channel priviligies
    const isAdmin = currentProfile.Member_Role === MemberRole.ADMIN
    const isModerator = currentProfile.Member_Role === MemberRole.MODERATOR
    const [isOwner, setIsOwner] = useState<boolean>(false)
    const [canDelete, setCanDelete] = useState<boolean>(false)
    const [canEdit, setCanEdit] = useState<boolean>(false)
    const [isPDF, setIsPDF] = useState<boolean>(false)
    const [isImage, setIsImage] = useState<boolean>(false)

    // Methods
    const editMessage = () => canEdit ? setEditModal(true) : false

    const saveChanges = (e?: FormEvent) => {
        e?.preventDefault()
        if (canEdit && theMessage) {
            setEditModal(false)
            updateExistingMessage(theMessage, newContent)
        }
    }

    const setDateAndTime = (createdObj: Date) => {
        const now = new Date()
        const msgCreated = new Date(createdObj)
        let timeAgo = Math.floor((now.getTime() - msgCreated.getTime()) / 1000)
        setTheDay("today at ")
        if (timeAgo > 86399 || msgCreated.getDate() !== now.getDate()) setTheDay("yesterday at ")
        if (timeAgo > 172799) setTheDay(msgCreated.getDate() + "/" + (msgCreated.getMonth() + 1) + ", ")
        setTimestamp(msgCreated.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' }))
    }

    const openThisProfile = (event: MouseEvent) => {
        /*console.log("event", event.clientY)
        console.log("window", window.innerHeight)
        console.log("stream", ((window.innerHeight) - 60 - 100))
        console.log("modal", ((event.clientY) + 550) - 60)
        const streamHeight = ((window.innerHeight) - 60 - 100)
        const modalHeight = (((event.clientY) + 550) - 60)
        if (modalHeight > streamHeight) {
            setProfileModalCSS({
                top: "-" + (modalHeight - streamHeight) + "px"
            })
        }*/

        setOpenProfile(theMember)
    }

    // Initiate message vs dm
    useEffect(() => {
        if (theMessage) {
            setEditMsg(theMessage.Message_Content)
            setNewContent(theMessage.Message_Content)
            setIsOwner(currentProfile.Profile_ID == theMessage.Message_MemberID)
            setCanDelete((isAdmin || isModerator || isOwner))
            setCanEdit(isOwner && !theMessage.Message_FileUrl)
            setDateAndTime(theMessage.Message_CreatedAt)

            if (theMessage.Message_FileUrl) {
                setFileType(theMessage.Message_FileUrl.split(".").pop())
                setIsPDF(fileType === "pdf")
                setIsImage(!isPDF)
            }
            if (membersList) setTheMember(membersList.filter((member) => member.Profile_ID == theMessage.Message_MemberID).pop()!)
        }
    }, [theMessage])

    useEffect(() => {
        if (theDM) {
            setDateAndTime(theDM.DM_CreatedAt)
        }
    }, [theDM])

    if ((variant == "in-channel" && theMessage) ||
        (variant == "in-conversation" && theDM)) {
        return (
            <Block className={styles["message-item"]}>
                {theMember && <ProfileCard variant="profile-picture" className="profile-picture" profile={theMember} />}
                <Block className={styles["message-details"]}>
                    <Block className={styles["message-top"]}>
                        <Block className="left-side">
                            {theMember && (
                                <ProfileCard
                                    variant="in-channel"
                                    className={styles["message-username"]}
                                    profile={theMember}
                                    onClick={(e: MouseEvent) => openThisProfile(e)}
                                />
                            )}
                            {theDay && timestamp && (
                                <Text variant="span" className={styles["message-datestamp"]}>
                                    {theDay + timestamp} ({
                                        theMessage && theMessage.Message_ID || 
                                        theDM && theDM.DM_ID
                                    })
                                </Text>
                            )}
                        </Block>
                        <Block className={"right-side " + styles["message-actions"]}>
                            {canEdit && (<FontAwesomeIcon icon={faPen} className={styles["message-action"]} onClick={() => editMessage()} />)}
                            {canDelete && (<FontAwesomeIcon icon={faTrashCan} className={styles["message-action"]} onClick={() => theMessage ? deleteMessage(theMessage) : undefined} />)}
                        </Block>
                    </Block>
                    <Block className={styles["message-content"]}>
                        {
                            theMessage && theMessage.Message_Content ||
                            theDM && theDM.DM_Content
                        }
                    </Block>
                </Block>

                {canEdit && (
                    <Modal
                        openModal={editModal}
                        closeModal={() => setEditModal(false)}
                        title="Edit the message"
                        className={styles["edit-message-dialog"] + " m" + (theMessage && theMessage.Message_MemberID)}
                    >
                        <ChatInput
                            name={""}
                            type="channel"
                            className="edit-message"
                            value={newContent}
                            setChanges={setNewContent}
                            saveChanges={saveChanges}
                        />
                        <Button className="button button-blue dialog-edit-message-submit" onClick={() => setEditModal(false)} disabled={false}>
                            <Text variant="span" className="button button-text">Cancel</Text>
                        </Button>
                    </Modal>
                )}
            </Block>
        )
    }

    return (
        <>tester</>
    )
}

export default Message