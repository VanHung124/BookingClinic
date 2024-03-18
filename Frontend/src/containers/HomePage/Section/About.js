import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói về BookingClinic
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="100%" height="450" src="https://www.youtube.com/embed/X8ZCFpxiIjk?list=RDT1D4-t-59V4" title="[Vietsub + Lyrics] Attention - Charlie Puth" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <div className="content-right">
                        <p>Để hợp pháp số tiền "thu phế" của 2 công ty mở sòng bạc trái phép trên, Lin Yi Huang (Chủ tịch HĐQT, Công ty Hoàng Gia) đã bàn bạc và chỉ đạo soạn thảo 2 hợp đồng, gồm hợp đồng bí mật nội dung Công ty Hoàng Gia sẽ thu tiền 2 công ty trên các khoản đã họp bàn thống nhất. Hợp đồng thứ hai có nội dung dưới dạng hợp đồng thuê mặt bằng.

                            Công ty TNHH IGT Hạ Long và Công ty TNHH Tân Thế Giới nộp tiền "thu phế" thông qua bộ phận kế toán của Công ty Hoàng Gia.

                            Theo đó, Kế toán trưởng Công ty Hoàng Gia Cao Thị Huyên chỉ đạo nhân viên kế toán Đặng Cao Mai Liên viết phiếu thu tiền theo nội dung hợp đồng bí mật.

                            Tiền thu được của Công ty TNHH Tân Thế Giới và Công ty TNHH IGT Hạ Long sẽ được nộp vào quỹ của Công ty Hoàng Gia.

                            Căn cứ tài liệu thu thập được, Công an tỉnh Quảng Ninh xác định, để hoạt động đường dây đánh bạc trái phép, Công ty TNHH IGT Hạ Long đã nộp cho Công ty Hoàng Gia hơn 28 tỷ đồng. Trong khi đó, Công ty TNHH Tân Thế Giới đã nộp cho Công ty Hoàng Gia hơn 5,7 tỉ đồng và 203.000 USD.

                            Cũng theo điều tra của Công an tỉnh Quảng Ninh, trong khoảng 1 năm trà trộn hoạt động tại casino của Công ty Hoàng Gia, Công ty TNHH Tân Thế Giới đã thu của người chơi hơn 103 tỷ đồng tiền mua chip đánh bạc và hơn 55.000 USD của người chơi. Trong khi đó, Công ty TNHH IGT Hạ Long thu lợi hơn 172 tỷ đồng, trên 434.000 USD và gần 21.000 NDT.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
