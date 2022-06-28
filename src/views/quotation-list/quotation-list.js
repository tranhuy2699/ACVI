import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom'
import axios from "axios";
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
import { Button, Col, Form, Input, Row, Select, DatePicker, Table, Dropdown, Menu, Space } from 'antd';
import { SettingOutlined, UserOutlined } from '@ant-design/icons';

import { DocsCallout, DocsExample } from 'src/components'
const Tables = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const { Option } = Select;
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
                //   this.setState({
                //     repos: result.data,
                //     isLoading: false
                //   });
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
            navigate('/list-quotation/edit');
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
        },
        {
            title: 'Xử lý',
            dataIndex: 'active',
            render: () => (
                <Space size="middle">
                    <Dropdown overlay={menu}>
                        <a>
                            <SettingOutlined />
                        </a>
                    </Dropdown>
                </Space>
            ),
        },
        {
            title: 'Trạng thái YCBG',
            dataIndex: 'address',
        },
        {
            title: 'Ngày  mong muốn báo giá',
            dataIndex: 'address',
        },
        {
            title: 'Ngày báo giá',
            dataIndex: 'address',
        },
        {
            title: 'Mã YCBG',
            dataIndex: 'address',
        },
        {
            title: 'Nhóm hàng hóa',
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
            title: 'Người nhận',
            dataIndex: 'address',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'address',
        },
    ];
    const data = [
        {
            key: '1',
            name: 'Chưa gửi TP duyệt ycbg',
            age: 32,
            address: 'Đồ dùng nhà bếp',
        },
        {
            key: '2',
            name: '01/06/2022',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
    ];
    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: 'Xem chi tiết',
                    key: '1',
                },
                {
                    label: 'Chỉnh sửa',
                    key: '2',
                },
                {
                    label: 'Xóa',
                    key: '3',
                },
            ]}
        />
    );

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
                        <p className="text-medium-emphasis">
                            Tìm kiếm
                        </p>
                        <Form
                            form={form}
                            name="advanced_search"
                            className="ant-advanced-search-form"
                            onFinish={onClickSearch}
                            labelAlign="left"
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
                                            <Option value="Zhejiang">Zhejiang</Option>
                                            <Option value="Jiangsu">Jiangsu</Option>
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
                                            name="year"
                                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                        >
                                            <Input placeholder="Nhập nguời nhận" />
                                        </Form.Item>
                                        <Form.Item
                                            name="month"
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
                            <Col span={12} style={{ textAlign: 'left', }}>
                                <p>Danh sách yêu cầu báo giá</p>
                                <p>500 YCBG</p>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right', }}>
                                <Button style={{ margin: '0 8px', }} className='btn-creatd' onClick={() => { handleMenuClick() }} >
                                    Tạo YCBG
                                </Button>

                                <Button className='btn-excel' htmlType="submit">
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

export default Tables
