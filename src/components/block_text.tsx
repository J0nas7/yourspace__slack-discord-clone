import { CSSProperties } from "react"

type Variant = 'h1' | 'h2' | 'p' | 'span' | 'small' | 'div'
type ReturnElement = 'h1' | 'h2' | 'p' | 'span' | 'small' | 'div'

const elements: Record<Variant, ReturnElement> = {
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    span: 'span',
    small: 'small',
    div: 'div'
}

const classes: Record<Variant, string> = {
    h1: 'page-title w-full md:w-[50%]',
    h2: 'block',
    p: 'block w-full float-left my-2',
    span: 'block',
    small: 'text-xs',
    div: 'block'
}

type Props = {
    variant?: Variant
    className?: string
    theId?: string
    style?: CSSProperties,
    onClick?: Function
    children?: any
}

const theElement = ({
    variant = 'div', className, theId, style, onClick, children
} : Props) => {
    const Element = elements[variant]
    className = className ? className+' ' : ''

    return (
        <Element 
            className={`${className+classes[variant]}`} 
            id={theId} 
            style={style}
            onClick={onClick ?
                (event) => onClick!(event) : 
                undefined}
        >
            {children}
        </Element>
    )
}

export const Text = theElement
export const Block = theElement