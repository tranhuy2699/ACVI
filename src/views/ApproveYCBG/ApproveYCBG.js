import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import moment from "moment"
import { ReactComponent as Edit } from '../../assets/svg/edit.svg';
import { ReactComponent as Delete } from '../../assets/svg/delete.svg';
import { ReactComponent as Eye } from '../../assets/svg/eys.svg';
import * as constants from "../../services/ApiYCBG.js";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import { useState } from 'react';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { Button, Col, Form, Input, Row, Select, DatePicker, Table, Dropdown, Menu, Tabs } from 'antd';
import { SettingOutlined, UserOutlined, EyeOutlined, EditOutlined, DeleteFilled } from '@ant-design/icons';
import { DocsCallout, DocsExample } from 'src/components'
const { TabPane } = Tabs;
const Tables = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const { Option } = Select;
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [listGroupProduct, setlistGroupProduct] = useState([]);
    useEffect(() => {
        console.log(form)
        callSearchApi({});
        getAllGroupProduct();
    }, [visible]);
    // const get
    const onClickSearch = (value) => {
        let query = getQueryToFrom(value);
        callSearchApi(query);
    }
    const callSearchApi = (value) => {
        axios.post(constants.searchYCBG, value)
            .then(result => {
                console.log(result);
                if (result.data.data.content) {
                    setData(result.data.data.content)
                }
                else setData([])
            })
            .catch(error =>
                console.log('loi api')
            );
    }
    const getAllGroupProduct = () => {
        axios.post(constants.getAllGroupProduct, {})
            .then(result => {
                console.log(result);
                setlistGroupProduct(result.data);
                //   this.setState({
                //     repos: result.data,
                //     isLoading: false
                //   });
            })
            .catch(error =>
                console.log('loi api')
            );
    }

    const getQueryToFrom = (formquery) => {
        let query = {};
        if (formquery.companyName != null && formquery.companyName != '') {
            query.companyName = {
                pattern: formquery.companyName,
                value: formquery.companyName,
                values: [formquery.companyName]
            }
        }

        if (formquery.dateReponse && formquery.dateReponse.length > 1) {
            query.dateReponse = {
                from: moment(formquery.dateReponse[0]).format("YYYY-MM-DD"),
                to: moment(formquery.dateReponse[1]).format("YYYY-MM-DD"),
            }
        }

        if (formquery.phoneNumber != null && formquery.phoneNumber != '') {
            query.phoneNumber = {
                pattern: formquery.phoneNumber,
                value: formquery.phoneNumber,
                values: [formquery.phoneNumber]
            }
        }

        // if(formquery.productGroupId != null && formquery.productGroupId !=''){
        //     query.productGroupId = {
        //         pattern: formquery.companyName,
        //         value: formquery.companyName,
        //         values: [formquery.companyName]
        //     }
        // }

        if (formquery.productName != null && formquery.productName != '') {
            query.productName = {
                pattern: formquery.productName,
                value: formquery.productName,
                values: [formquery.productName]
            }
        }

        if (formquery.receiver != null && formquery.receiver != '') {
            query.receiver = {
                pattern: formquery.receiver,
                value: formquery.receiver,
                values: [formquery.receiver]
            }
        }

        if (formquery.requestCode != null && formquery.requestCode != '') {
            query.requestCode = {
                pattern: formquery.requestCode,
                value: formquery.requestCode,
                values: [formquery.requestCode]
            }
        }

        return query;
    }
    const handleMenuClick = (e) => {
        console.log('click icon', e)
        if (!e) {
            navigate('/list-quotation/create');
        }
        if (e.key == 1) {
            navigate('/list-quotation/view');
        }
    };
    const handleVisibleChange = (flag) => {
        setVisible(flag);
    };
    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            render: (value, item, index) => (
                <span>{(page - 1) * 10 + index + 1}</span>
            )
        },
        {
            title: 'Xử lý',
            dataIndex: 'active',
            render: ((text, record) => (
                <Dropdown overlay={getContent(text, record)}>
                    <SettingOutlined />
                </Dropdown>
            )),
        },
        {
            title: 'Trạng thái YCBG',
            dataIndex: 'address',
        },
        {
            title: 'Ngày mong muốn báo giá',
            dataIndex: 'dateReponse',
            render: (dateReponse) =>
                <span>{(moment(new Date(dateReponse)).format("DD/MM/YYYY"))}</span>
        },
        {
            title: 'Ngày báo giá',
            dataIndex: 'modifiedDate',
            render: (modifiedDate) =>
                <span>{(moment(new Date(modifiedDate)).format("DD/MM/YYYY"))}</span>
        },
        {
            title: 'Mã YCBG',
            dataIndex: 'requestCode',
        },
        {
            title: 'Nhóm hàng hóa',
            dataIndex: 'address',
        },
        {
            title: 'Tên hàng hóa',
            dataIndex: 'productNames',
        },
        {
            title: 'Tên công ty',
            dataIndex: 'companyName',
        },
        {
            title: 'Người nhận',
            dataIndex: 'receiver',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
        },
    ];
    // const data = [
    //     {
    //         key: '1',
    //         name: 'Chưa gửi TP duyệt ycbg',
    //         age: 32,
    //         address: 'Đồ dùng nhà bếp',
    //     },
    //     {
    //         key: '2',
    //         name: '01/06/2022',
    //         age: 42,
    //         address: 'London No. 1 Lake Park',
    //     },
    //     {
    //         key: '3',
    //         name: 'Joe Black',
    //         age: 32,
    //         address: 'Sidney No. 1 Lake Park',
    //     },
    // ];
    const getContent = (text, record) => {
        return (
            <Menu>
                <Menu.Item key="detail">
                    <Link to={`/approve-list/${record.requestId}/view`}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Eye style={{ width: 24, height: 24, marginRight: 10 }} />Xem chi tiết
                        </div>
                    </Link>
                </Menu.Item>
            </Menu >
        )
    }

    const { RangePicker } = DatePicker;

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <CRow>
            {' '}
            {/* <CCol xs={12}>
                            <DocsCallout name="Table" href="components/table" />
                        </CCol> */}{' '}
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardBody>
                        <p className="text-medium-emphasis" style={{ fontSize: '20px', color: '#262626 !important', fontWeight: 500 }}>
                            Tìm kiếm
                        </p>
                        <Form
                            form={form}
                            name="advanced_search"
                            className="ant-advanced-search-form"
                            labelAlign="left"
                            onFinish={onClickSearch}
                            labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}
                        >
                            <Row gutter={24}>
                                <Col span={12} >
                                    <Form.Item name="requestCode" label="Mẫ YCBG" >
                                        <Input placeholder="Nhập mã YCBG" />
                                    </Form.Item>
                                </Col>
                                <Col span={12} >
                                    <Form.Item name="productGroupId" label="Nhóm hàng hóa" >
                                        <Select placeholder="Chọn nhóm hàng hóa">
                                            <Option key={1} value="Zhejiang">Zhejiang</Option>
                                            <Option key={2} value="Jiangsu">Jiangsu</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12} >
                                    <Form.Item name="productName" label="Tên hàng hóa" >
                                        <Input placeholder="Nhập tên hàng hóa" />
                                    </Form.Item>
                                </Col>
                                <Col span={12} >
                                    <Form.Item name="companyName" label="Tên công ty" >
                                        <Input placeholder="Nhập tên công ty" />
                                    </Form.Item>
                                </Col>

                                <Col span={12} >
                                    <Form.Item name="dateReponse" label="Ngày mong muốn báo giá" className={'two-rows-label'}>
                                        <RangePicker locale={locale} format="DD/MM/YYYY" />
                                    </Form.Item>
                                </Col>

                                <Col span={12} >
                                    <Form.Item label="Người nhận/SĐT" >
                                        <Form.Item
                                            name="receiver"
                                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                        >
                                            <Input placeholder="Nhập nguời nhận" />
                                        </Form.Item>
                                        <Form.Item
                                            name="phoneNumber"
                                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: '16px' }}
                                        >
                                            <Input placeholder="Nhập số diện thoại" />
                                        </Form.Item>
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row>
                                <Col
                                    span={24}
                                    style={{
                                        textAlign: 'right',
                                    }}
                                >
                                    <Button
                                        style={{
                                            margin: '0 8px',
                                        }}
                                        onClick={() => {
                                            form.resetFields();
                                        }}
                                    >
                                        Xoá điều kiện
                                    </Button>

                                    <Button className='btn-search' htmlType="submit">
                                        Tìm kiếm
                                    </Button>

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
                            <Tabs defaultActiveKey="1" type="card" size="middle">
                                <TabPane tab="Chờ phê duyệt (10)" key="1">
                                    <CCard style={{ border: 'none' }}>
                                        <CCardBody >
                                            <CRow gutter={24}>
                                                <Col span={12} style={{ textAlign: 'left', }}>
                                                    <p style={{ fontSize: '20px', color: '#262626 !important', fontWeight: 500 }}>Danh sách yêu cầu báo giá chờ phê duyệt</p>
                                                    <p>500 YCBG</p>
                                                </Col>
                                                <Col span={12} style={{ textAlign: 'right', }}>
                                                    <Button className='btn-excel' style={{ background: '#B1B0B8', color: '#FFFFFF' }} >
                                                        Xuất excel
                                                    </Button>
                                                </Col>
                                            </CRow>
                                            <CRow gutter={24}>
                                                <Table columns={columns} dataSource={data} size="middle"></Table>
                                            </CRow>
                                        </CCardBody>
                                    </CCard>

                                </TabPane>
                                <TabPane tab="Chờ báo giá (05)" key="2">
                                    <CCard style={{ border: 'none' }}>
                                        <CCardBody >
                                            <CRow gutter={24}>
                                                <Col span={12} style={{ textAlign: 'left', }}>
                                                    <p style={{ fontSize: '20px', color: '#262626 !important', fontWeight: 500 }}>Danh sách yêu cầu báo giá chờ báo giá</p>
                                                    <p>500 YCBG</p>
                                                </Col>
                                                <Col span={12} style={{ textAlign: 'right', }}>
                                                    <Button className='btn-excel' style={{ background: '#B1B0B8', color: '#FFFFFF' }} >
                                                        Xuất excel
                                                    </Button>
                                                </Col>
                                            </CRow>
                                            <CRow gutter={24}>
                                                <Table columns={columns} dataSource={data} size="middle"></Table>
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                </TabPane>
                            </Tabs>

                        </CRow>


                    </CCardBody>
                </CCard>
            </CCol>



        </CRow>
    )
}

export default Tables
