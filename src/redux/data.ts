// External
import axios from 'axios'

// Internal
import { env, paths } from '@/env.local'

//const { postWithData } = useLaravelAPI()

export const fetchOrders = (url:string) => {
    //return dispatch => {
    return (dispatch:any) => {
        dispatch({type:"FETCH_POST"})
        axios.get(`${env.url.API_URL+paths.API_ROUTE}/${url}`,
            {
                headers: { authorization: localStorage.getItem('token') }
            })
            .then(response =>{
                dispatch(fetchPostSuccess(response));
            })
    }
}

export const readAllOrdersSummary = (pageNr: number, searchterm: string) => {
    /*const postData = {
        "pageNr" : pageNr ? pageNr : 1,
        "searchTerm" : searchterm
    }*/
    //return postWithData("readAllOrdersSummary", postData)
}

export const fetchPostSuccess = (posts:any) => {
    return {
        type:"FETCH_POST_SUCCESS",
        payload:posts
    };
}