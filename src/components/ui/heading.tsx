// Internal
import { Text } from '..'

type Variant = 'h1' | 'h2' | 'h3'
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
    variant?: Variant
    className?: string,
}) => {
	return (
        <Text variant={variant} className={className}>{title}</Text>
    )
}