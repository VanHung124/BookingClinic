import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './UserManage.scss';
import { emitter } from "../../utils/emitter";
import _, { isEmpty } from 'lodash';
class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',

        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phonenumber: user.phonenumber,
            })
        }
        console.log('123', this.props.currentUser)
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

    handleSaveUser = () => {
        let isValid = this.checkvalideInput();
        if (isValid === true) {
            this.props.editUser(this.state);

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

                <ModalHeader class='close' toggle={() => this.toggle()}>Edit a new user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container ">
                            <label>Email</label>
                            <input className="input" type="email" onChange={(event) => { this.handleOnchangrInput(event, "email") }} value={this.state.email} disabled />
                        </div>
                        <div className="input-container ">
                            <label>Password</label>
                            <input className="input" type="password" onChange={(event) => { this.handleOnchangrInput(event, "password") }} value={this.state.password} disabled />
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
                    <Button color="primary" className="px-3" onClick={() => this.handleSaveUser()}>Save</Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => this.toggle()}>Close</Button>

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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
