// Internal
import { Space } from '@/core-ui'

export default function SpaceName(props: any) {
    // Internal variables
    const spaceName: string = props.spaceName

    return (
        <></>
    )
}

export async function getServerSideProps(ctx: any) {
    const spaceName = ctx.query.spaceName

    return {
        props: {
            spaceName
        }
    }
}