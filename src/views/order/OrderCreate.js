import React, { useContext, useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import moment from 'moment'
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
    Upload,
} from 'antd'
import { SettingOutlined, UserOutlined } from '@ant-design/icons'
import * as constants from "../../services/ApiYCBG.js";

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


const OrderCreate = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false)
    const { Option } = Select;
    const [ListProvince, setListProvince] = useState([]);
    const [ListDistrict, setListListDistrict] = useState([]);
    const [defaultFileList, setDefaultFileList] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isRowIndex, setisRowIndex] = useState(0);
    const [page, setPage] = useState(1);
    useEffect(() => {
        getAllProvince();
    }, [isRowIndex]);
    const getAllProvince = () => {
        axios.get(constants.getAllProvince)
            .then(result => {
                let array = [];
                console.log(result.data.data.provinces);
                if (result.data.data.provinces) {
                    result.data.data.provinces.forEach((item, i) => {
                        array.push(<Option key={i} value={item.provinceId}>{item.provinceName}</Option>);
                    });
                }
                setListProvince(array)
            })
            .catch(error =>
                console.log('loi api')
            );
    }
    const getDistrictByProv = (id) => {
        axios.get(constants.getAllProvince + `?provinceId=${id}`)
            .then(result => {
                let array = [];
                console.log(result.data.data.districts);
                if (result.data.data.districts) {
                    result.data.data.districts.forEach((item, i) => {
                        array.push(<Option key={i} value={item.districtId}>{item.districtName}</Option>);
                    });
                }
                setListListDistrict(array)
            })
            .catch(error =>
                console.log('loi api')
            );
    }
    const handleCreated = (form) => {
        form.productQuotes = [];
        form.productQuotes = dataSource.map(item => {
            if (!item.attachs) item.attachs = []
            return item
        });
        form.dateReponse = moment(form.dateReponse).format('YYYY-MM-DD')
        console.log(form)
        axios.post(constants.CreatedYCBG, form)
            .then(result => {
                return (
                    <Link to={`/list-quotation`}>
                    </Link>
                )
            })
            .catch(error =>
                console.log('loi api')
            );
    }
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
            productNameClient: 'Edward King 0',
            amount: '32',
            unit: 'cái',
            describes: 'London, Park Lane no. 0',
        },
        {
            key: '1',
            productNameClient: 'Edward King 0',
            amount: '32',
            unit: 'cái',
            describes: 'London, Park Lane no. 0',
        },
        {
            key: '2',
            productNameClient: 'Vải Polyester kẻ caro F29',
            amount: '32',
            unit: 'cái',
            describes: 'Vải chống tĩnh điện là một loại vải đặc biệt giúp hạn chế tối đa sự truyền điện tích tĩnh từ cơ thể người sang môi trường tiếp xúc xung quanh, từ đó giúp hạn chế cháy nổ, bảo vệ sản phẩm....',
        },
    ]);
    const defaultColumns = [
        {
            title: 'STT',
            dataIndex: 'key',
            render: (value, item, index) => (
                <span>{(page - 1) * 10 + index + 1}</span>
            )
        },
        {
            title: 'Tên hàng hóa',
            dataIndex: 'productNameClient',
            width: '200',
            editable: true,
        },
        {
            title: 'Số Lượng',
            dataIndex: 'amount',
            editable: true,
        },
        {
            title: 'Đơn vị hàng hóa',
            dataIndex: 'unit',
            editable: true,
        },
        {
            title: 'Mô tả(từ KH)',
            dataIndex: 'describes',
            editable: true,
        },
    ];
    const setIndexRow = (index) => {
        let rowIndex = index
        setisRowIndex(rowIndex);
        console.log(isRowIndex)
    }
    const uploadImage = async options => {
        const { onSuccess, onError, file, onProgress } = options;
        const fmData = new FormData();
        const config = {
            headers: { "content-type": "multipart/form-data" },
            onUploadProgress: event => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                setProgress(percent);
                if (percent === 100) {
                    setTimeout(() => setProgress(0), 1000);
                }
                onProgress({ percent: (event.loaded / event.total) * 100 });
            }
        };
        fmData.append("file", file);
        axios.post(constants.uploadFile, fmData)
            .then(result => {
                console.log(result)
                onSuccess("Ok");
                console.log("server res: ", result);
                let array = dataSource;
                if (!array[isRowIndex].attachs) {
                    array[isRowIndex].attachs = []
                }
                array[isRowIndex].attachs.push(result.data.data.originalId);
                setDataSource(array);
            }).catch(error => {
                onError({ error });
                console.log('loi api')
            }
            );
    };
    const handleOnChange = ({ file, fileList, event }) => {
        console.log(isRowIndex)
        setDefaultFileList(fileList);
    };
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
    return (
        <CRow>
            <p style={{ color: '#096DD9', fontSize: '18px', fontWeight: 600 }}>Tạo mới đơn hàng</p>
            <Form
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
                onFinish={handleCreated}
                labelAlign="left"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 12 }}
            >
                {' '}
                {/* <CCol xs={12}>
                            <DocsCallout name="Table" href="components/table" />
                        </CCol> */}{' '}
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardBody>
                            <p className="text-medium-emphasis titleCart" >Thông tin chung</p>

                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item name="requestCode" label="Mẫ YCBG:*">
                                        <Input placeholder="Nhập mã YCBG" showCount maxLength={10} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="dateReponse" label="Ngày mong muốn báo giá" className={'two-rows-label'}>
                                        <DatePicker />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </CCardBody>{' '}
                    </CCard>{' '}
                </CCol>{' '}

                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardBody>
                            <p className="titleCart">Thông tin coong ty YCBG</p>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item name="companyName" label="Tên công ty: ">
                                        <Input placeholder="Nhập tên công ty" showCount maxLength={100} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="recipients" label="Nơi nhận hàng: ">
                                        <Input placeholder="Nhập địa chỉ nhận hàng" showCount maxLength={200} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Địa chỉ công ty: ">
                                        <Form.Item
                                            name="provinceId"
                                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginBottom: '0px' }}
                                        >
                                            <Select
                                                placeholder="Tỉnh/Thành"
                                                onChange={getDistrictByProv}>
                                                {ListProvince}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            name="districtId"
                                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: '16px', marginBottom: '0px' }}
                                        >
                                            <Select
                                                placeholder="Quận/Huyện"
                                            >
                                                {ListDistrict}
                                            </Select>
                                        </Form.Item>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="receiver" label="Người nhận hàng: *">
                                        <Input placeholder="Nhập tên người nhận hàng" showCount maxLength={100} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="address" label="Địa chỉ chi tiết: ">
                                        <Input placeholder="Nhập địa chỉ chi tiết" showCount maxLength={200} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="phoneNumber" label="Số điện thoại: *">
                                        <Input placeholder="Nhập SĐT người nhận hàng" showCount maxLength={20} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="">
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="email" label="Email: *">
                                        <Input placeholder="Nhập Email người nhận hàng" showCount maxLength={50} />
                                    </Form.Item>
                                </Col>
                            </Row>
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
                                    <Button className="btn-excel" htmlType="submit" style={{ background: '#FA8C16', color: '#FFFFFF' }}>
                                        Import
                                    </Button>
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
                        Hủy bỏ
                    </Button>

                    <Button type='primary' htmlType="submit" className='btn-excel'>
                        Lưu
                    </Button>
                </CCol>

            </Form>
        </CRow>
    )
}

export default OrderCreate
