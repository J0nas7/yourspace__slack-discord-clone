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

import { IconButton, InputAdornment, TextField } from "@mui/material"
import { Block, Text } from "./block_text"
import TextareaAutosize from 'react-textarea-autosize'

export const Field = ({
    type, lbl, displayLabel, innerLabel, hiddenMUILabel, placeholder, description, required, value, grow, growMin, disabled, className, onChange, onKeyDown, endButton, endContent, error, ...props
}: {
    type: string,
    lbl: string,
    value: string,
    onChange: Function,
    onKeyDown?: Function,
    endButton?: Function,
    endContent?: string,
    disabled: boolean,
    error?: string,
    required?: boolean
    displayLabel?: boolean,
    innerLabel?: boolean,
    hiddenMUILabel?: boolean
    placeholder?: string,
    description?: string,
    grow?: boolean,
    growMin?: number,
    autoComplete?: string,
    className?: string
    props?: Object
}) => {
    const inputProps = {
        type,
        value,
        className,
        label: `${(innerLabel ? lbl : '')}`,
        id: `field-${lbl}`,
        placeholder,
        disabled,
        required,
        ...props,
    }

    return (
        <Block className={'custom-field-container field ' + className + (error ? ' field--error' : '')} theId={className}>
            {((lbl || displayLabel === true) && !innerLabel) && (
                <label htmlFor={`field-${lbl}`}>
                    {lbl}
                </label>
            )}
            <Block className="field-input">
                {grow === true ? (
                    <TextareaAutosize
                        {...inputProps}
                        minRows={(growMin ? growMin : 1)}
                        maxRows={10}
                        onChange={(event) => onChange(event.target.value)}
                    />
                ) : (
                    <Text variant="span" className="input-field-wrap">
                        <TextField
                            {...inputProps}
                            onChange={
                                (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => 
                                onChange(event.target.value)
                            }
                            onKeyDown={onKeyDown ?
                                (event) => onKeyDown!(event) :
                                undefined}
                            InputProps={endButton ?
                                {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                onClick={() => endButton()}
                                            >
                                                {endContent}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                                : undefined}
                        />
                    </Text>
                )}
            </Block>
            {description && (
                <Text variant="p" className="field__description">
                    {description}
                </Text>
            )}
            {error && (
                <Text variant="p" className="field__error">
                    {error}
                </Text>
            )}
        </Block>
    )
}