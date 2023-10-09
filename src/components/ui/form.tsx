/**
 * Renders a form.
 *
 * @param {string} props.onSubmit Text for heading.
 */

import { FormEventHandler, ReactNode } from "react"

export const Form = ({
    onSubmit,
    className = '',
    children
} : {
    onSubmit: FormEventHandler,
    className?: string,
    children: ReactNode
}) => {
	return (
        <form onSubmit={onSubmit} className={className}>
            {children}
        </form>
    )
}