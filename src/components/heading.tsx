// Internal
import { Text } from '.'

/**
 * Renders a form field.
 *
 * @param {string} props.title Text for heading.
 */

export const Heading = ({
    title,
    variant = 'h1',
    className = ''
} : {
    title: string,
    variant?: any
    className?: string,
}) => {
	return (
        <Text variant={variant} className={className}>{title}</Text>
    )
}