import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './UserManage.scss';
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',

        }
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA',() => {
            this.resetFormAddNewUser();
            
        })
    }
    resetFormAddNewUser() {
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
        })
    }
    componentDidMount() {

    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnchangrInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })

    }

    checkvalideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Nhập thiếu : ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkvalideInput();
        if (isValid === true) {
            this.props.createNewUser(this.state);

        }
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-container '}
                size="lg"
            // centered
            >

                <ModalHeader class='close' toggle={() => this.toggle()}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container ">
                            <label>Email</label>
                            <input className="input" type="email" onChange={(event) => { this.handleOnchangrInput(event, "email") }} value={this.state.email} />
                        </div>
                        <div className="input-container ">
                            <label>Password</label>
                            <input className="input" type="password" onChange={(event) => { this.handleOnchangrInput(event, "password") }} value={this.state.password} />
                        </div>
                        <div className="input-container ">
                            <label>First Name</label>
                            <input className="input" type="text" onChange={(event) => { this.handleOnchangrInput(event, "firstName") }} value={this.state.firstName} />
                        </div>
                        <div className="input-container ">
                            <label>Last Name</label>
                            <input className="input" type="text" onChange={(event) => { this.handleOnchangrInput(event, "lastName") }} value={this.state.lastName} />
                        </div>
                        <div className="input-container max-width-input ">
                            <label>Address</label>
                            <input className="input" type="text" onChange={(event) => { this.handleOnchangrInput(event, "address") }} value={this.state.address} />
                        </div>
                        <div className="input-container max-width-input ">
                            <label>PhoneNumber</label>
                            <input className="input" type="text" onChange={(event) => { this.handleOnchangrInput(event, "phonenumber") }} value={this.state.phonenumber} />
                        </div>
                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => this.handleAddNewUser()}>Add new</Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => this.toggle()}>Close</Button>
                    <Button color="secondary" className='px-3' onClick={() => { this.resetFormAddNewUser() }}>Reset
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
