import React, { useEffect } from 'react'
import { Modal, Button, Form, Input, notification, Select, Row, Col } from 'antd'
import { useState } from 'react';

const ApproveModal = ({ openPopup, toggleModal, notSignId, modalAction }) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [maxModalSize, setMaxModalSize] = useState(700);

    useEffect(() => {
        // if (notSignId && openPopup) {
        //     trigger(notSignId)
        // }
    }, [])

    const onFinish = (values) => {
    }

    return (
        <>

            <Modal
                title="Gửi phê duyệt yêu cầu báo giá"
                visible={openPopup}
                onCancel={() => toggleModal(0)}
                footer={[
                    <React.Fragment key="footer">

                    </React.Fragment>
                ]}
                width={1000}
                className='error-1'
            >
                <Form
                    onFinish={onFinish}
                    //   onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="horizontal"
                    form={form}
                    // className="custom-form"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 10 }}
                    labelAlign="left"
                >
                    <Row gutter={24}>
                        <Col span={24} >
                            <Form.Item name="productGroupId" label="Người phê duyệt" >
                                <Select placeholder="- Lựa chọn người phê duyệt -">
                                    <Option value="Zhejiang">Zhejiang</Option>
                                    <Option value="Jiangsu">Jiangsu</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24} style={{ marginTop: '250px' }}>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Button htmlType='button'
                                className='white-red-border-button'
                                onClick={() => toggleModal(0)}
                            >
                                Đóng
                            </Button>
                            <Button
                                htmlType='button'
                                type='primary'
                                style={{ marginLeft: 20 }}
                                onClick={() => form.submit()}
                            >
                                Lưu
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default ApproveModal