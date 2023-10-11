// External
import { Dispatch } from 'redux'

// Internal
import { useAxios } from '@/hooks'

export const useSpaceActions = () => {
    const { httpGetRequest, httpPostWithData } = useAxios()
    
    return {
        
    }
}