// External
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { clsx } from 'clsx'
import { CSSProperties } from "react"

// Internal
import { Block, Heading } from '..'

type Variant = 'h1' | 'h2' | 'h3'
/**
 * Renders a form field.
 *
 * @param {string} props.title Text for heading.
 * @param {string} props.icon FontAwesomeIcon.
 * @param {string} props.className Custom classname for content-box.
 * @param {string} props.numberOfColumnns Number of columns to span. Defaults to 1.
 */

export const FlexibleBox = ({
    title,
    icon = undefined,
    className = '',
    numberOfColumns = 1,
    children
}: {
    title?: string,
    icon?: IconDefinition
    className?: string,
    numberOfColumns?: number,
    children?: React.ReactNode
}) => {
    const gridSize: CSSProperties = {
        gridColumn: "span " + numberOfColumns + " / span " + numberOfColumns
    }
    let colSpanClasses = 
        "col-span-1" + 
        (numberOfColumns > 1 ? " md:col-span-2" : "") + 
        (numberOfColumns > 2 ? " lg:col-span-3" : "") + 
        (numberOfColumns > 3 ? " xl:col-span-4" : "")

    return (
        <Block className={clsx("content-box-flexible", colSpanClasses, className)}>
            {title && (
                <Block className="box-title-with-icon">
                    {icon && (<FontAwesomeIcon icon={icon} className="box-title-icon" />)}
                    <Heading title={title} variant="h3" className="box-title" />
                </Block>
            )}
            <Block className="flexible-box-content">
                {children}
            </Block>
            <Block className="clear-both"></Block>
        </Block>
    )
}