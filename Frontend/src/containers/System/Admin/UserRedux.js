import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,


            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }

        // } catch (e) {
        //     console.log(e);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //gender
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }
        //position
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }

        // role
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length ? arrRoles[0].key : ''
            })
        }
        if (prevProps.listUser !== this.props.listUser) {
            let arrGenders = this.props.genderRedux;
            let arrPositions = this.props.positionRedux;
            let arrRoles = this.props.roleRedux;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : '',
                role: arrRoles && arrRoles.length ? arrRoles[0].key : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL:'',
            })
        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log('check', base64)
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        })
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return;

        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {

            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar:this.state.avatar
            })
        }
        // setTimeout(()=> {

        //     this.props.fetchUserRedux();
        // },1000)
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                break;
            }
        }
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        })
    }

    handleEditUserfromParent = (user) => {
        let imageBase64 = '';
        if(user.image){
            imageBase64 = new Buffer(user.image,'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
        })
    }

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;

        return (
            <div className="users-container" >
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="title text-center">Quản lý Redux</div>
                            <div className="col-12"> {isLoadingGender === true ? 'Loading genders' : ''}</div>
                            <div className="col-12"><FormattedMessage id="manage-user.add"></FormattedMessage></div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.email"></FormattedMessage></label>
                                <input type="email" className="form-control"
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                ></input>
                            </div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.password"></FormattedMessage></label>
                                <input type="password" className="form-control"
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                ></input>
                            </div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.firstname"></FormattedMessage></label>
                                <input type="text" className="form-control"
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                ></input>
                            </div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.lastname"></FormattedMessage></label>
                                <input type="text" className="form-control"
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                ></input>
                            </div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.phone"></FormattedMessage></label>
                                <input type="text" className="form-control"
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                ></input>
                            </div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.address"></FormattedMessage></label>
                                <input type="text" className="form-control"
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }}
                                ></input>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputState"><FormattedMessage id="manage-user.gender"></FormattedMessage></label>
                                <select class="form-select" aria-label="Large select example"
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                    value={gender}
                                >
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (

                                            <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>)
                                    })}

                                </select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputState"><FormattedMessage id="manage-user.position"></FormattedMessage></label>
                                <select class="form-select" aria-label="Large select example"
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                    value={position}
                                >
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (

                                            <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>)
                                    })}
                                </select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputState"><FormattedMessage id="manage-user.role"></FormattedMessage></label>
                                <select class="form-select" aria-label="Large select example"
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                    value={role}
                                >
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (

                                            <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>)
                                    })}
                                </select>
                            </div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.image"></FormattedMessage></label>
                                <div className="preview-img-container">
                                    <input id="previewImg" type="file" hidden onChange={(event) => this.handleOnchangeImage(event)}></input>
                                    <label className="label-upload" htmlFor="previewImg">Up file<i class="bi bi-file-earmark-arrow-up-fill"></i></label>
                                    <div className="preview-image" style={{ backgroundImage: `url(${this.state.previewImgURL})` }} onClick={() => this.openPreviewImage()}></div>
                                </div>
                            </div>
                            <div class="col-12 my-3">
                                <button type="submit" class={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => this.handleSaveUser()}

                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit" /> :
                                        <FormattedMessage id="manage-user.save" />
                                    }

                                </button>
                            </div>
                            <div class="col-12 mb-5">
                                <TableManageUser
                                    handleEditUserfromParent={this.handleEditUserfromParent}
                                    action={this.state.action}
                                />
                            </div>

                            {this.state.isOpen === true &&
                                <Lightbox
                                    mainSrc={this.state.previewImgURL}
                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUser: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data)),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
