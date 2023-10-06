// Internal
import { Text } from '.'

/**
 * Renders a form field.
 *
 * @param {string} props.title Text for heading.
 */

export const Heading = ({
    title,
    className = ''
} : {
    title: string,
    className?: string
}) => {
	return (
        <Text variant="h1" className={className}>{title}</Text>
    )
}