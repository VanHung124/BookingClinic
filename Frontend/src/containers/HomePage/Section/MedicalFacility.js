import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './MedicalFacility.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {
    render() {
        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cơ sở y tế nổi bật</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div class="section-body">

                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='section-medical-facility'></div>
                                <div>Hệ thống cơ sở 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='section-medical-facility'></div>
                                <div>Hệ thống cơ sở 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='section-medical-facility'></div>
                                <div>Hệ thống cơ sở 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='section-medical-facility'></div>
                                <div>Hệ thống cơ sở 4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='section-medical-facility'></div>
                                <div>Hệ thống cơ sở 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='section-medical-facility'></div>
                                <div>Hệ thống cơ sở 6</div>
                            </div>
                            <div className='section-customize'>
                                <div className='section-medical-facility'></div>
                                <div>Hệ thống cơ sở 7</div>
                            </div>
                            <div className='section-customize'>
                                <div className='section-medical-facility'></div>
                                <div>Hệ thống cơ sở 8</div>
                            </div>

                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
