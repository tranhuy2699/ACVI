import React, { useContext, useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Route, Link, useNavigate, useParams } from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CCol,
    CRow,

} from '@coreui/react'
import ShowMoreText from "react-show-more-text";
import locale from 'antd/es/date-picker/locale/vi_VN'
import {
    Button,
    Col,
    Form,
    Input,
    Row,
    Select,
    DatePicker,
    Table,
    Dropdown,
    Menu,
    Space,
    Popconfirm
} from 'antd'
import axios from "axios";
// import ApproveModal from './approveModal'
import { SettingOutlined, UserOutlined } from '@ant-design/icons'
import * as constants from "../../services/ApiYCBG.js";
import { DocsCallout, DocsExample } from 'src/components'
import moment from 'moment'
const EditableContext = React.createContext(null);
const ViewYCBG = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false)
    const [notSignVisible, setNotSignVisible] = useState(false);
    const [notSignId, setNotSignId] = useState(0);
    const { Option } = Select;
    const [page, setPage] = useState(1);
    const { id } = useParams();
    const [detail, setdetail] = useState({});

    useEffect(() => {
        console.log(id)
        getDetailYcbg();
    }, [])
    const getDetailYcbg = () => {
        axios.get(constants.detailYCBG + `/${id}`)
            .then(result => {
                console.log(result.data.data);
                let object = result.data.data
                setdetail(object)
            })
            .catch(error =>
                console.log('loi api')
            );
    }
    const triggerSearch = () => {
        console.log('click modal')
    }
    const handleMenuClick = (type) => {
        if (type === 'back') {
            navigate('/list-quotation')
        } else if (type === 'delete') { }
        else {
            navigate(`/list-quotation/${id}/edit`)
        }
    }
    const handleVisibleChange = (flag) => {
        setVisible(flag)
    }
    const toggleNotSign = (id) => {
        setNotSignVisible(!notSignVisible);
    }
    const components = {

    };
    const defaultColumns = [
        {
            title: 'STT',
            dataIndex: 'key',
            render: (value, item, index) => (
                <span>{(page - 1) * 10 + index + 1}</span>
            ),
        },
        {
            title: 'Tên hàng hóa',
            dataIndex: 'productNameClient',
            width: '200',
        },
        {
            title: 'Số Lượng',
            dataIndex: 'amount',
        },
        {
            title: 'Đơn vị hàng hóa',
            dataIndex: 'unit',
        },
        {
            title: 'Mô tả(từ KH)',
            dataIndex: 'describes',
            width: '30%',
            render: (_, record) =>
            (
                <ShowMoreText
                    lines={2}
                    more="Xem thêm"
                    less="Rút gọn"
                    anchorClass=""
                    expanded={false}
                    width={320}

                >
                    {record.describes}
                </ShowMoreText>
            )
        },
        {
            title: 'Hình ảnh(từ KH)',
            dataIndex: 'attachIdClients',

        },
    ];
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
            }),
        };
    });
    const { RangePicker } = DatePicker
    const handleApprove = () => {
        setNotSignVisible(true)
    }
    const onFinish = (values) => {
        console.log('Received values of form: ', values)
    }
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    const formatDate = (date) => {
        return (
            moment(new Date(detail.dateReponse)).format('DD/MM/YYYY HH:mm:ss')
        )
    }
    return (
        <CRow>
            {' '}
            {/* <CCol xs={12}>
                            <DocsCallout name="Table" href="components/table" />
                        </CCol> */}{' '}
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardBody>
                        <p className="titleCart">Thông tin chung</p>
                        <Form
                            form={form}
                            name="advanced_search"
                            className="ant-advanced-search-form"
                            onFinish={onFinish}
                            labelAlign="left"
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item name="requestCode" label="Mẫ YCBG:*">
                                        <span>{detail?.requestCode}</span>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="productGroupId" label="Ngày mong muốn báo giá" className={'two-rows-label'}>
                                        <span>{formatDate(detail?.dateReponse)}</span>
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name="productGroupId" label="Người nhận YCBG:" className={'two-rows-label'}>
                                        <span>{detail?.receiver}</span>
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name="productGroupId" label="Trạng thái YCBG:" className={'two-rows-label'}>
                                        <span>{ }</span>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </CCardBody>{' '}
                </CCard>{' '}
            </CCol>{' '}

            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardBody>
                        <p className="titleCart">Thông tin công ty YCBG</p>
                        <Form
                            form={form}
                            name="advanced_search"
                            className="ant-advanced-search-form"
                            onFinish={onFinish}
                            labelAlign="left"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item name="requestCode" label="Tên công ty: ">
                                        <span>{detail?.receiver}</span>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="requestCode" label="Nơi nhận hàng: ">
                                        <span>{detail?.recipients}</span>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="requestCode" label="Địa chỉ công ty: ">
                                        <span>{detail?.address}</span>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="requestCode" label="Người nhận hàng: *">
                                        <span>{detail?.receiver}</span>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="requestCode" label=" ">
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="requestCode" label="Số điện thoại: *">
                                        <span>{detail?.phoneNumber}</span>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="requestCode" label="">
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="productGroupId" label="Email: *">
                                        <span>{detail?.email}</span>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </CCardBody>{' '}
                </CCard>{' '}
            </CCol>{' '}
            <CCol xs={12}>
                <CCard>
                    <CCardBody>
                        <CRow gutter={24}>
                            <Col span={12} style={{ textAlign: 'left' }}>
                                <p className='titleCart'>Thông tin hàng hóa</p>
                                <p>500 YCBG</p>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right' }}>
                                <a href='#'>File_import.xlsx</a>
                            </Col>
                        </CRow>

                        <CRow gutter={24}>
                            <Table
                                components={components}
                                rowClassName={() => 'editable-row'}
                                bordered
                                dataSource={detail.productQuotes}
                                columns={columns}
                            />
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol xs={12} style={{ textAlign: 'center', padding: '20px' }}>
                <Button style={{ margin: '0 4px', }} onClick={() => { handleMenuClick('back') }} >
                    Quay lại
                </Button>
                <Button style={{ margin: '0 4px', background: '#CF1322', color: '#FFFFFF' }} onClick={() => { handleMenuClick('delete') }} >
                    Cancel
                </Button>

                <Button style={{ margin: '0 4px', background: '#FA8C16', color: '#FFFFFF' }} className='btn-creatd' onClick={() => { handleApprove() }} >
                    Phê duyệt và gửi sang PM
                </Button>
            </CCol>
            {/* {notSignVisible ?
                <ApproveModal
                    openPopup={notSignVisible}
                    toggleModal={toggleNotSign}
                    notSignId={notSignId}
                    modalAction={() => triggerSearch()}
                /> : <></>
            }

            {notSignVisible ?
                <ApproveModal
                    openPopup={notSignVisible}
                    toggleModal={toggleNotSign}
                    notSignId={notSignId}
                    modalAction={() => triggerSearch()}
                /> : <></>
            } */}



        </CRow>
    )
}

export default ViewYCBG
