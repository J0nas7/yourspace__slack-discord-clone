// External
import { useRouter } from 'next/navigation'

// Internal
//import { useAxios } from '@/hooks'
import { Block, Text } from '@/components'

const Order = (props : any) => {
    const router = useRouter()
    const Order : any = props.order
    const itemImgFolder = ""//apiUrl+"item_images/"
    //const { httpPostWithData } = useAxios()
    
    const editOrder = (theOrder : any = '') => {
        if (Order.Order_ID) {
            router.push("/editOrder/"+Order.Order_ID)
            /*navigate('/order', {
                orderID: Order.Order_ID,
            })*/
        }
    }

    return (
        <Block className="Order" onClick={(Order:any) => editOrder(Order.Order_ID)}>
            <img className="itemPicture" width="100px" src={itemImgFolder + Order.Item_ImgSrc} />
            <Block className="OrderDetails">
                <Text variant="span" className="Item_Title">{Order.Item_Title}</Text>
                <Text variant="span" className="Item_Price">{Order.Item_Price} kr.</Text>
                <Text variant="span" className="Order_StartTime">{Order.Order_StartTime}</Text>
                { Order.Profile_Name && 
                    ( <Text variant="span" className="Order_Partner">{ Order.Order_PartnerTxt + Order.Profile_Name }</Text> )
                }
            </Block>
            <Block className="clrBth"></Block>
        </Block>
    )
}

export default Order