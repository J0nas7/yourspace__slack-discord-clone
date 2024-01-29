// External
import { useRouter } from 'next/router'

// Internal
import { MediaRoom } from '@/core-ui'

export default function ChannelName() {
    // Hooks
    const router = useRouter()

    // Internal variables
    const channelName: string = router.query.channelName?.toString()!

    return (
        <MediaRoom
            chatId={channelName}
            video={true}
            audio={true}
        />
    )
}