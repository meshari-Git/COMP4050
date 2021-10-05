/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import jobService from '../services/job'



function JobModal(job) {
    const [modalDisplay, setModalDisplay] = useState('none')

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true);

    const showEdit = (e) => {
        e.preventDefault()
        console.log('showEdit Click')
        setModalDisplay('block')
    }

    //can be moved elsewhere and redone as a component.
    const closeEdit = (e) => {
        e.preventDefault()
        console.log('closeEdit Click')
        setModalDisplay('none')
    }

    const [updatedJob, setUpdatedJob] = useState({
        title: job.job.title,
        description: job.job.description,
        cost: job.job.cost
      });
    
      const handleChangeUpdate = (name) => (event) => {
        setUpdatedJob({ ...updatedJob, error: false, [name]: event.target.value });
      };
    

    const updateJob = () => {
        job.job.title = updatedJob.title
        job.job.description = updatedJob.description
        job.job.cost = updatedJob.cost
        jobService.editFavour(job.job, job.user.token)
        setShow(false)
    }

    return (
        <div>
            <button className = "edit-job-button" onClick={(e) => handleShow()}>
                Edit Job
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Edit Job</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control type="Title" placeholder="Enter title" value={updatedJob.title} onChange={handleChangeUpdate("title")} />
                            
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="description" placeholder="Enter description" value={updatedJob.description} onChange={handleChangeUpdate("description")} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Cost</Form.Label>
                            <Form.Control type="cost" placeholder="0" value={updatedJob.cost} onChange={handleChangeUpdate("cost")} />
                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={updateJob}>Update</Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default JobModal