import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import FormInputField from '../form/FormInputField';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

type AddCardProps = {
    stageName: string,
    addCardToStage: (taskItem: any, callBack?: Function) => void
    handleCancelAddCardToStage: () => void
}

export const AddCard: React.FC<AddCardProps> = ({ addCardToStage, handleCancelAddCardToStage, stageName }) => {
    const [title, setTitle] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddCardToStage = (event: any) => {
        event.preventDefault();
        if (isFormInvalid()) {
            toast.error('Fill in the title field')
        } else {
            setIsSubmitting(true);
            addCardToStage({ title, id:  uuid(), currentStage: stageName }, () => {
                toast.success('Successfully added card to stage');
            })
        }
    }

    const isFormInvalid = () => {
        return !title || !title.trim();
    }

    return <Form className="px-0" onSubmit={handleAddCardToStage}>
                <FormInputField
                        label="Title"
                        value={title}
                        placeholder="Enter title"
                        required
                        name="title"
                        onChange={(ev) => setTitle(ev.target.value)}
                />
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='primary-text' onClick={handleCancelAddCardToStage}>Cancel</div>
                    <Button type="submit" className="custom-btn primary-btn" disabled={isFormInvalid()}>
                        {!isSubmitting ? 'Add' : <Spinner animation="grow" className="mt-1" /> }
                    </Button>
                </div>
    </Form>
}