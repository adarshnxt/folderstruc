import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


// Confirmation Pop-Up Component 

export default class ModalForm extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            isCentered: false,
        };
    }
    componentDidMount() {
        this.setState({ show: this.props.showModalForm, isCentered: this.props.isCentered });
    }

    render() {
        return (
            <>
                <Modal
                    show={this.state.show}
                    onHide={this.props.handleModalClose}
                    backdrop="static"
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered={this.state.isCentered}
                >
                    <Modal.Header closeButton>
                        <Modal.Title><div className="text-l-priamry fw-500">{this.props.modalTitle()}</div></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="fs-18 fw-400">{this.props.modalBody()}</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.props.handleYes()}>
                            Yes
          </Button>
                        <Button variant="secondary" onClick={this.props.handleModalClose}>
                            No
          </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}