import React from 'react';
import { ChangeEvent, FC } from 'react';
import Form from 'react-bootstrap/esm/Form';

const labelStyle = {
    fontWeight: 600
};

const textAreaStyle = {
    height: 200,
};

interface FormInputFieldProps {
    type?: 'text' | 'number' | 'textarea';
    value?: string | number;
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    disabled?: boolean;
    required?: boolean;
    label?: string;
    placeholder?: string;
    className?: string;
    name: string;
}

const FormInputField: FC<FormInputFieldProps> = (props) => {
    return (
        <Form.Group>
            <Form.Label className="mb-2 d-flex" style={labelStyle}>
                {props.label}
            </Form.Label>
            {props.type !== 'textarea' ? (
                <Form.Control {...props} type={props.type || 'text'} className="mb-3" />
            ) : (
                <Form.Control {...props} as="textarea" style={textAreaStyle} className="mb-3" />
            )}
        </Form.Group>
    );
};

export default FormInputField;
