import React from 'react'
import { Button, Modal } from 'react-bootstrap';

export default function ModalSiteCont(props) {

    const {showModal, setShowModal, titleModal, childrens, modalSize } = props

    return (<Modal
        //animate__animated animate__fadeInDown animate__faster
        className={'modalSite'}
        //animation={false}
        onHide={() => setShowModal(false)}
        /* size="sm" // בגודל קטן!!! */
        size={ modalSize ? modalSize : "lg" }
        //size="xl" 
        // backdrop="static" // חייב ללחוץ על כפתור!
        /* centered // VERTICA CENTER */
        show={showModal}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        >

        <Modal.Body>

            <Button className="closeBtn" onClick={() => setShowModal(false)} variant="secondary" >X</Button>

            <div className='modalMain'>

                <h2>{titleModal}</h2>

                {childrens}

                {/* <div className="btnCont">
                    <Button variant="success" size="" onClick={saveNewTime} >שמירה</Button>
                    <Button variant="secondary" size="" onClick={() => setShowModal(false)} >סגירה</Button>
                </div> */}

            </div>
            

        </Modal.Body>

    </Modal>)
}
