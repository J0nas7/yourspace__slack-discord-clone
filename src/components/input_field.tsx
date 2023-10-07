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

//import { IconButton, InputAdornment, TextField } from "@mui/material"
import { Block, Text } from "./block_text"

export const Field = ({
    type, lbl, displayLabel, placeholder, description, value, grow, disabled, className, onChange, onKeyDown, endButton, endContent, error, ...props
} : {
    type: string,
    lbl: string, 
    value: string, 
    onChange: Function, 
    onKeyDown?: Function, 
    endButton?: Function, 
    endContent?: string, 
    disabled: boolean, 
    error?: string,
    displayLabel?: boolean, 
    placeholder?: string, 
    description?: string, 
    grow?: boolean, 
    autoComplete?: string, 
    className?: string
    props?: Object
}) => {
	const inputProps = {
        type,
		value,
        id: `field-${ lbl }`,
		placeholder,
        disabled,
        className,
        ...props,
	}

	return (
		<Block className={'field' + (error ? ' field--error' : '') } theId={className}>
            { (lbl || displayLabel === true) && (
                <label htmlFor={ `field-${ lbl }` }>
                    { lbl }
                </label>
            ) }
			<Block className="field-input">
				{ grow === true ? (
                    <Text variant="span">hej</Text>
					/*<TextareaAutosize
						{ ...inputProps }
						minRows={ 1 }
						onChange={ ( event ) => onChange( event.target.value ) }
					/>*/
				) : (
                    <Text variant="span" className="input-field-wrap">
                        <input  
                            { ...inputProps }
                            onChange={(event) => onChange(event.target.value)}
                            //onKeyDown={(event) => onChange(event)}
                        />
                    </Text>
				) }
			</Block>
			{ description && (
				<Text variant="p" className="field__description">
					{ description }
                </Text>
			) }
			{ error && (
				<Text variant="p" className="field__error">
					{ error }
                </Text>
			) }
		</Block>
	)
}