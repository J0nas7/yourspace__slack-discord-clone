import { useSocket } from "@/components/providers/socket-provider"
import { Block } from "@/components"

export const SocketIndicator = () => {
    const { isConnected } = useSocket()

    if (!isConnected) {
        return (
            <Block className="connection connection-error">
                Fallback: Polling every 1s
            </Block>
        )
    }

    return (
        <Block className="connection connection-live">
            Live: Real-time updates
        </Block>
    )
}