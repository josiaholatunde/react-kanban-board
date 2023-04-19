import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import FormInputField from '../form/FormInputField';
import { toast } from 'react-toastify';
import './kanban.css';

type AddCardProps = {
    addStage: (taskItem: any, callBack?: Function) => void
    handleCancelAddStage: () => void,
    doesStageNamePreviouslyExist: (stageName: string) => boolean
}

export const AddStageColumn: React.FC<AddCardProps> = ({ addStage, handleCancelAddStage, doesStageNamePreviouslyExist }) => {
    const [stageName, setStageName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddStage = (event: any) => {
        event.preventDefault();
        if (isFormInvalid()) {
            return toast.error('Fill in the stage name field')
        } else if (doesStageNamePreviouslyExist(stageName)) {
            console.log('i exist oo');
            return toast.error('Stage name has been taken');
        } else {
            setIsSubmitting(true);
            addStage({ name: stageName, taskItems: [] }, () => {
                toast.success('Successfully added card to stage');
            })
        }
    }

    const isFormInvalid = () => {
        return !stageName || !stageName.trim();
    }

    return <Form className="px-0" onSubmit={handleAddStage}>
                <FormInputField
                        label="Name"
                        value={stageName}
                        placeholder="Enter Name"
                        required
                        name="name"
                        onChange={(ev) => setStageName(ev.target.value)}
                />

                <div className='d-flex justify-content-between align-items-center'>
                    <div className='primary-text pointer' onClick={handleCancelAddStage}>Cancel</div>
                    <Button type="submit" className="custom-btn primary-btn" disabled={isFormInvalid()}>
                        {!isSubmitting ? 'Add' : <Spinner animation="grow" className="mt-1" /> }
                    </Button>
                </div>
    </Form>
}