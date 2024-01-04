// External
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"

// Internal
import { Block, Heading } from '@/components'
import { ProfileDTO } from "@/types"
import { useAxios } from '@/hooks'

export default function AccessSpace({ membersList, access, children }: { membersList: ProfileDTO[] | undefined, access: number, children: React.ReactNode }) {
    // Hooks
    const router = useRouter()
    const { httpGetRequest } = useAxios()

    // Internal variables
    const urlSpaceName: string = router.query.spaceName?.toString()!
    const [canAccess, setCanAccess] = useState<boolean>(false)
    const [iAm, setIAm] = useState<ProfileDTO>()

    // Methods
    useEffect(() => {
        if (membersList) {
            const getIAm = async () => {
                const profileData = await httpGetRequest("readUser")
                if (profileData.data) {
                    setIAm(() => {
                        if (membersList) return membersList.filter((member: ProfileDTO, key) => member.Profile_ID == profileData.data.Profile_ID)[0]
                        return undefined
                    })
                }
            }
            getIAm()
        }
    }, [membersList])

    useEffect(() => {
        if (iAm) {
            setCanAccess(() => {
                if (access <= 4 && iAm?.Member_Role == "OWNER") return true
                if (access <= 3 && iAm?.Member_Role == "ADMIN") return true
                if (access <= 2 && iAm?.Member_Role == "MODERATOR") return true
                if (access <= 1/* && iAm?.Member_Role == "GUEST"*/) return true
                if (access <= 0) return true

                router.push("/space/" + urlSpaceName)
                return false
            })
        }
    }, [iAm])

    if (!canAccess && 1 < access) return (
        <>Validating your access...</>
    )

    return (
        <>{children}</>
    )
}
