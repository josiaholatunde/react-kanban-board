import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import FormInputField from '../form/FormInputField';
import { toast } from 'react-toastify';

type EditCardFormProps = {
    taskTitle: string,
    editCard: (previousTitle: string, currentTitle: string, callBack?: Function) => void
    handleCancelEditCardToStage: () => void
}

export const EditCardForm: React.FC<EditCardFormProps> = ({ editCard, handleCancelEditCardToStage, taskTitle }) => {
    const [title, setTitle] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddCardToStage = (event: any) => {
        event.preventDefault();
        if (isFormInvalid()) {
            toast.error('Fill in the title field')
        } else {
            setIsSubmitting(true);
            editCard(taskTitle, title, () => {
                toast.success('Successfully edited task item');
            })
        }
    }

    useEffect(() => {
        setTitle(taskTitle);
    }, [taskTitle])

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
                    <div className='primary-text' onClick={handleCancelEditCardToStage}>Cancel</div>
                    <Button type="submit" className="custom-btn primary-btn pointer" disabled={isFormInvalid()}>
                        {!isSubmitting ? 'Edit' : <Spinner animation="grow" className="mt-1" /> }
                    </Button>
                </div>
    </Form>
}