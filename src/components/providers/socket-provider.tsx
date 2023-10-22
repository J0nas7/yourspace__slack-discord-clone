import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react"
import { io as ClientIO } from "socket.io-client"

type SocketContextType = {
    socket: any | null
    isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
})

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [data,setData] = useState('hej')
    const [socket, setSocket] = useState<any>(null)
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        const socketInstance = new (ClientIO as any)("http://localhost:5000")
        console.log("SocketProvider", socketInstance)
        
        socketInstance.on("connect", () => {
            console.log("socketInst 'connection'", socketInstance.id)
            setIsConnected(true)
        })
        
        socketInstance.on("disconnect", () => {
            console.log("socketInst 'disconnect'")
            setIsConnected(false)
        })

        setSocket(socketInstance)

        return () => {
            socketInstance.disconnect()
        }
    }, [])

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}