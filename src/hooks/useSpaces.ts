// External
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Internal
import { useAxios } from './'
import {
    useAppDispatch,
    useTypedSelector,
    setCreateErrorType,
    selectCreateErrorType
} from '../redux'

export const useSpaces = () => {
    // Instant variables
    const [status, setStatus] = useState<string>('')
    const [errorMsg,setErrorMsg] = useState<string>('')
    
    // Hooks and Redux
    const dispatch = useAppDispatch()
    const createErrorType = useTypedSelector(selectCreateErrorType)
    const { httpPostWithData } = useAxios()
    const router = useRouter()

    const errorCodes: any = {
        wrong_credentials: 'Incorrect credentials. Please try again.'
    }

    const afterSuccess = (theResult: any) => {
        const spaceName = theResult.data.Space_Name
        const spaceID = theResult.data.Space_ID
        router.push('/s/'+spaceName)
    }

    // Handle error dispatch and set state of them correspondingly
    const onError = (fromAction: string, errors?: any) => {
        console.log("onError")
        if (createErrorType) {
            const theErrorMsg = errors?.message || createErrorType
            console.log(theErrorMsg)
            setErrorMsg(
                errorCodes[theErrorMsg] || theErrorMsg
            )
        } else if (errors) {
            dispatch(setCreateErrorType({
                "data": errors.message
            }))
        } else if (createErrorType === "") {
            setErrorMsg('')
        }
    } //);
    useEffect(() => {
        onError('')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createErrorType])

    const processResult = (fromAction: string, theResult: any) => {
        setStatus('resolved')
        console.log("space processResult()", theResult)

        if (theResult.success === true) {
            afterSuccess(theResult)
            return true
        }

        onError(fromAction, theResult)
        return false
    }

    const handleCreateSubmit = async (spaceName: string, spaceImage: string): Promise<boolean> => {
        setStatus('resolving')
        let errorData
        // Resetting the errorType triggers another dispatch that resets the error
        dispatch(setCreateErrorType({ "data": "" }))

        // If credentials are empty
        if (!spaceName) {
            errorData = {
                "success": false,
                "message": "Missing neccesary credentials.",
                "data": false
            }
            processResult('create', errorData)
            return false
        }

        // Variables to send to backend API
        const createVariables = {
            "Space_Name": spaceName,
            "Space_ImageUrl": spaceImage
        }

        // Send create variables to the API for creation
        try {
            const data = await httpPostWithData("createNewSpace", createVariables)
            return processResult('create', data)
        } catch (e) {
            console.log("useAuth create error", e)
        }
        return true
    }

    return {
        handleCreateSubmit,
        errorMsg,
        status
    }
}