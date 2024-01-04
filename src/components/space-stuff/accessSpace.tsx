// External
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"

// Internal
import { Block, Heading } from '@/components'
import { ProfileDTO } from "@/types"
import { useAxios } from '@/hooks'

export default function AccessSpace({ membersList, access, children }: { membersList?: ProfileDTO[] | undefined, access?: number, children: React.ReactNode }) {
    // Hooks
    const router = useRouter()
    const { httpGetRequest } = useAxios()

    // Internal variables
    const tempSpaceName: string = router.query.spaceName?.toString()!
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
                if (access == 4 && iAm?.Member_Role == "OWNER") {
                    return true
                }

                router.push("/space/" + tempSpaceName)
                return false
            })
        }
    }, [iAm])

    if (!canAccess) return (
        <Block className="other-pages-wrapper">
            <Block className={"other-pages-inner "}>
                <Heading title={"Space members: "} />
                <Block className={"page-section "}>
                    Validating your access...
                </Block>
            </Block>
        </Block>
    )

    return (
        <>{children}</>
    )
}
