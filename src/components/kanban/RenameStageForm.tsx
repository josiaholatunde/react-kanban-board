import React, { useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import FormInputField from '../form/FormInputField';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

type AddCardProps = {
    stageName: string,
    renameStage: (taskItem: any, callBack?: Function) => void
    handleCancelRenameStage: () => void
}

export const RenameStageForm: React.FC<AddCardProps> = ({ renameStage, handleCancelRenameStage, stageName }) => {
    const [name, setStageName] = useState(stageName);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRenameStage = (event: any) => {
        event.preventDefault();
        if (isFormInvalid()) {
            toast.error('Fill in the title field')
        } else {
            setIsSubmitting(true);
            renameStage({ name,  previousStageName: stageName }, () => {
                toast.success('Successfully added card to stage');
            })
        }
    }

    const isFormInvalid = () => {
        return !name || !name.trim();
    }

    return <Form className="px-0" onSubmit={handleRenameStage}>
                <FormInputField
                        label="Name"
                        value={name}
                        placeholder="Enter stage name"
                        required
                        name="title"
                        onChange={(ev) => setStageName(ev.target.value)}
                />
                <div className='d-flex justify-content-between align-items-center'>
                    <a className='primary-text' onClick={handleCancelRenameStage}>Cancel</a>
                    <Button type="submit" className="custom-btn primary-btn" disabled={isFormInvalid()}>
                        {!isSubmitting ? 'Rename' : <Spinner animation="grow" className="mt-1" /> }
                    </Button>
                </div>
    </Form>
}