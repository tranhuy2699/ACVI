import React from 'react'
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
import locale from 'antd/es/date-picker/locale/vi_VN';
import { Button, Col, Form, Input, Row, Select, DatePicker } from 'antd';
import { DocsCallout, DocsExample } from 'src/components'
const Table = () => {
    const [form] = Form.useForm();
    const { Option } = Select;
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

            </CCol>

            <CCol xs={12}>
                <CCard>
                    <CCardBody>
                        <CRow gutter={24}>
                            <Col span={12} style={{ textAlign: 'left', }}>
                                <p>Danh sách yêu cầu báo giá</p>
                                <p>500 YCBG</p>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right', }}>
                                <Button className='btn-creatd' onClick={() => { form.resetFields(); }} >
                                    Tạo YCBG
                                </Button>

                                <Button className='btn-excel' htmlType="submit">
                                    Xuất excel
                                </Button>
                            </Col>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Table
