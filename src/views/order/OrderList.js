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
    CCol,
    CRow,
} from '@coreui/react'
import { useState } from 'react';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { Button, Col, Form, Input, Row, Select, DatePicker, Table, Dropdown, Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import { DocsCallout, DocsExample } from 'src/components'
const OrderList = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const { Option } = Select;
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [listGroupProduct, setlistGroupProduct] = useState([]);
    useEffect(() => {
        console.log(form)
        onClickSearch({});
        getAllGroupProduct();
    }, [visible]);
    // const get
    const onClickSearch = (query) => {
        axios.post(constants.searchYCBG, query)
            .then(result => {
                console.log(result);
                if (result.data.data.content) {
                    setData(result.data.data.content)
                }
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
    const handleMenuClick = (e) => {
        console.log('click icon', e)
        if (!e) {
            navigate('/order-list/create');
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
            title: 'Trạng thái',
            dataIndex: 'address',
        },
        {
            title: 'Mẫ hàng hóa',
            dataIndex: 'address',
        },
        {
            title: 'Tên hàng hóa',
            dataIndex: 'address',
        },
        {
            title: 'Tên công ty',
            dataIndex: 'address',
        },
        {
            title: 'Ngày tạo đơn hàng',
            dataIndex: 'dateReponse',
            render: (dateReponse) =>
                <span>{(moment(new Date(dateReponse)).format("DD/MM/YYYY"))}</span>
        },
        {
            title: 'Ngày cập nhật đơn hàng',
            dataIndex: 'modifiedDate',
            render: (modifiedDate) =>
                <span>{(moment(new Date(modifiedDate)).format("DD/MM/YYYY"))}</span>
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
                    <Link to={`/list-quotation/${record.creatorId}/view`}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Eye style={{ width: 24, height: 24, marginRight: 10 }} />Xem chi tiết
                        </div>
                    </Link>
                </Menu.Item>

                <Menu.Item key="edit">
                    <Link to={`/list-quotation/${record.creatorId}/edit`}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Edit style={{ width: 24, height: 24, marginRight: 10 }} />Chỉnh sửa
                        </div>
                    </Link>
                </Menu.Item>

                <Menu.Item key="delete">
                    <Link to={`/list-quotation/${record.creatorId}/`}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Delete style={{ width: 24, height: 24, marginRight: 10 }} />Xóa
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
                        <p className="text-medium-emphasis titleCart" style={{ fontSize: '20px', color: '#262626 !important', fontWeight: 500 }} >
                            Tìm kiếm
                        </p>
                        <Form
                            form={form}
                            name="advanced_search"
                            className="ant-advanced-search-form"
                            labelAlign="left"
                            onFinish={onClickSearch}
                            labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}
                        >
                            <Row gutter={24}>
                                <Col span={12} >
                                    <Form.Item name="requestCode" label="Mã đơn hàng:" >
                                        <Input placeholder="Nhập Mã YCBG" />
                                    </Form.Item>
                                </Col>
                                <Col span={12} >
                                    <Form.Item name="productGroupId" label="Mã hàng hóa:" >
                                        <Input placeholder="Nhập mã hàng hóa" />
                                    </Form.Item>
                                </Col>
                                <Col span={12} >
                                    <Form.Item name="productName" label="Tên hàng hóa:" >
                                        <Input placeholder="Nhập tên hàng hóa" />
                                    </Form.Item>
                                </Col>
                                <Col span={12} >
                                    <Form.Item name="companyName" label="Trạng thái:" >
                                        <Select placeholder="Tất cả">
                                            <Option value="Zhejiang">Zhejiang</Option>
                                            <Option value="Jiangsu">Jiangsu</Option>
                                        </Select>

                                    </Form.Item>
                                </Col>
                                <Col span={12} >
                                    <Form.Item name="productName" label="Tên công ty:" >
                                        <Input placeholder="Nhập tên công ty" />
                                    </Form.Item>
                                </Col>

                                <Col span={12} >
                                    <Form.Item name="dateReponse" label="Ngày tạo đơn hàng:" className={'two-rows-label'}>
                                        <RangePicker locale={locale} format="DD/MM/YYYY" />
                                    </Form.Item>
                                </Col>

                                <Col span={12} >
                                    <Form.Item label="" >

                                    </Form.Item>
                                </Col>
                                <Col span={12} >
                                    <Form.Item name="dateReponse" label="Ngày cập nhật đơn hàng: " className={'two-rows-label'}>
                                        <RangePicker locale={locale} format="DD/MM/YYYY" />
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
                            <Col span={12} style={{ textAlign: 'left', }}>
                                <p style={{ fontSize: '20px', color: '#262626 !important', fontWeight: 500 }}>Danh sách Đơn hàng mua</p>
                                <p>500 YCBG</p>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right', }}>
                                <Button style={{ margin: '0 8px', background: '#FA8C16', color: '#FFFFFF' }} className='btn-creatd' onClick={() => { handleMenuClick() }} >
                                    Tạo YCBG
                                </Button>

                                <Button className='btn-excel' style={{ background: '#B1B0B8', color: '#FFFFFF' }} >
                                    Xuất excel
                                </Button>
                            </Col>
                        </CRow>

                        <CRow gutter={24}>
                            <Table columns={columns} dataSource={data} size="middle"
                            />
                        </CRow>


                    </CCardBody>
                </CCard>
            </CCol>



        </CRow>
    )
}

export default OrderList
