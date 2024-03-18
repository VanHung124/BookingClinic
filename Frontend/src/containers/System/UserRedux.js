import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../services/userService';
import { LANGUAGES } from '../../utils';
import * as actions from '../../store/actions/';
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
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
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
        //position
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        }

        // role
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
    }

    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl
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

    }
    onChangeInput = () => {
        // email: '',
        //     password: '',
        //         firstName: '',
        //             lastName: '',
        //                 phoneNumber: '',
        //                     address: '',
        //                         gender: '',
        //                             position: '',
        //                                 role: '',
        //                                     avatar: '',
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
                            <div className="col-12"><FormattedMessage id="manage-user.add"></FormattedMessage></div>
                            <div className="col-12"> {isLoadingGender === true ? 'Loading genders' : ''}</div>
                            <div className="title text-center">Quản lý Redux</div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.email"></FormattedMessage></label>
                                <input type="email" className="form-control"></input>
                            </div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.password"></FormattedMessage></label>
                                <input type="password" className="form-control"></input>
                            </div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.firstname"></FormattedMessage></label>
                                <input type="text" className="form-control"></input>
                            </div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.lastname"></FormattedMessage></label>
                                <input type="text" className="form-control"></input>
                            </div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.phone"></FormattedMessage></label>
                                <input type="text" className="form-control"></input>
                            </div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.address"></FormattedMessage></label>
                                <input type="text" className="form-control"></input>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputState"><FormattedMessage id="manage-user.gender"></FormattedMessage></label>
                                <select class="form-select" aria-label="Large select example">
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (

                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>)
                                    })}

                                </select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputState"><FormattedMessage id="manage-user.position"></FormattedMessage></label>
                                <select class="form-select" aria-label="Large select example">
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (

                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>)
                                    })}
                                </select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputState"><FormattedMessage id="manage-user.role"></FormattedMessage></label>
                                <select class="form-select" aria-label="Large select example">
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (

                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>)
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
                            <div class="col-12 mt-3">
                                <button type="submit" class="btn btn-primary"
                                    onClick={() => this.handleSaveUser()}
                                ><FormattedMessage id="manage-user.save"></FormattedMessage></button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
