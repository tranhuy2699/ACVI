import React, { useContext, useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CCol,
    CRow,

} from '@coreui/react'
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
import { SettingOutlined, UserOutlined } from '@ant-design/icons'

import { DocsCallout, DocsExample } from 'src/components'
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} className="test" />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};
const Tables = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false)
    const { Option } = Select
    const handleMenuClick = (e) => {
        console.log('click icon', e)
        if (e.key == 1) {
            navigate('')
        }
    }
    const handleVisibleChange = (flag) => {
        setVisible(flag)
    }
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
    };
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    const [dataSource, setDataSource] = useState([
        {
            key: '0',
            name: 'Edward King 0',
            age: '32',
            address: 'London, Park Lane no. 0',
        },
        {
            key: '1',
            name: 'Edward King 1',
            age: '32',
            address: 'London, Park Lane no. 1',
        },
    ]);
    const defaultColumns = [
        {
            title: 'STT',
            dataIndex: 'key',
        },
        {
            title: 'Tên hàng hóa',
            dataIndex: 'name',
            width: '200',
        },
        {
            title: 'Số Lượng',
            dataIndex: 'age',
        },
        {
            title: 'Đơn vị hàng hóa',
            dataIndex: 'address',
        },
        {
            title: 'Mô tả(từ KH)',
            dataIndex: 'address',
        },
        {
            title: 'Hình ảnh(từ KH)',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <a href='#' >anh_Vải Polyester kẻ caro F29.jpg</a>
                ) : null,
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
                handleSave,
            }),
        };
    });
    const { RangePicker } = DatePicker

    const onFinish = (values) => {
        console.log('Received values of form: ', values)
    }
    const onChange = (date, dateString) => {
        console.log(date, dateString);
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
                        <p className="text-medium-emphasis">Thông tin chung</p>
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
                                    <Form.Item name="requestCode" label="Mẫ YCBG:*">
                                        <span>YC0001</span>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="productGroupId" label="Ngày mong muốn báo giá" className={'two-rows-label'}>
                                        <span>YC0001</span>
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name="productGroupId" label="Người nhận YCBG:" className={'two-rows-label'}>
                                        <span>Nguyễn Văn B</span>
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name="productGroupId" label="Trạng thái YCBG:" className={'two-rows-label'}>
                                        <span>Chờ báo giá</span>
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
                        <p className="text-medium-emphasis">Thông tin coong ty YCBG</p>
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
                                        <span>Công ty ABC</span>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="requestCode" label="Nơi nhận hàng: ">
                                        <span>Số 01 Duy Tân Dịch Vọng Hậu Cầu Giấy, Hà Nội</span>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="requestCode" label="Địa chỉ công ty: ">
                                        <span>âs</span>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="requestCode" label="Người nhận hàng: *">
                                        <span>âs</span>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="requestCode" label="Địa chỉ chi tiết: ">
                                        <span>âs</span>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="requestCode" label="Số điện thoại: *">
                                        <span>âs</span>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="requestCode" label="">
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="productGroupId" label="Email: *">
                                        <span>âs</span>
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
                                <p>Thông tin hàng hóa</p>
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
                                dataSource={dataSource}
                                columns={columns}
                            />
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol xs={12} style={{ textAlign: 'center', padding: '20px' }}>
                <Button style={{ margin: '0 8px', }} className='btn-creatd' onClick={() => { handleMenuClick({ key: 1 }) }} >
                    Quay lại
                </Button>

                <Button type='danger' className='btn-excel' htmlType="submit">
                    Cancel
                </Button>
            </CCol>


        </CRow>
    )
}

export default Tables
