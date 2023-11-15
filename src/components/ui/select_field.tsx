/**
 * Renders a form field.
 *
 * @param {Object} props Incoming props for the component.
 * @param {string} props.lbl Label for field.
 * @param {boolean} props.hideLabel Hide label.
 * @param {string} props.placeholder Placeholder for field.
 * @param {string} props.description Description of field.
 * @param {string} props.value Data to show.
 * @param {boolean} props.grow If true, the field will be a textarea that grows with input.
 * @param {Function} props.onChange Input onChange event.
 * @param {string} props.error Error message.
 * @param {Object} props.props Remaining props.
 */

import { IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { Block, Text } from "./block_text"
import TextareaAutosize from 'react-textarea-autosize'

type SelectElement = {
    value: string,
    title: string
}

type Props = {
    lbl: string,
    title: string
    value: number|string,
    items: Array<SelectElement>,
    onChange: Function,
    disabled: boolean,
    error?: string,
    required?: boolean
    displayLabel?: boolean,
    innerLabel?: boolean,
    hiddenMUILabel?: boolean
    className?: string
    props?: Object
}

export const SelectField = ({
    lbl, title, value, items, displayLabel, innerLabel, hiddenMUILabel, className, onChange, disabled, error, required, ...props
}: Props) => {
    const inputProps = {
        className,
        label: `${(innerLabel ? lbl : '')}`,
        id: `field-${lbl}`,
        disabled,
        required,
        ...props,
    }

    return (
        <Block className={'custom-select-field-container select-field ' + className + (error ? ' select-field--error' : '')} theId={className}>
            <Block className="select-field-input">
                <Text variant="span" className="select-field-wrap">
                    {((lbl || displayLabel === true) && !innerLabel) && (
                        <InputLabel id={lbl + "-label"}>{title}</InputLabel>
                    )}
                    <Select
                        labelId={lbl + "-label"}
                        id={lbl}
                        value={value}
                        displayEmpty
                        label="Admin-only text channel"
                        onChange={onChange()}
                    >
                        {items && items!.map((item: SelectElement, key: number) =>
                            <MenuItem value={item.value} key={key}>{item.title}</MenuItem>
                        )}
                    </Select>
                </Text>
            </Block>
            {error && (
                <Text variant="p" className="field__error">
                    {error}
                </Text>
            )}
        </Block>
    )
}