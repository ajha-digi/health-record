"use client"
import { useState } from 'react';
import {
    Button,
    Form,
    DatePicker,
    Row,
    Col,
    InputNumber
} from 'antd';
import axios from 'axios';


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Home = () => {
    const [form] = Form.useForm();
    const [createdAt, setCreatedAt] = useState(new Date());
    const onFinish = (values) => {
        const body = {
            "createdAt": new Date(createdAt).toISOString(),
            "bp":`${values.systolic}/${values.diastolic}`,
            "weight":values.weight,
            "pulse": values.pulse,
            "spo2": values.spo2
        }
        try {
            axios.post('/api/report',body)
        } catch (error) {
            console.log(error)
        }
    };
    const onChange = (value, dateString) => {
        setCreatedAt(dateString);
    };
    const onOk = (value) => {
        setCreatedAt(value.$d);
    };
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="health-record"
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
        >
            <Row>
                <Col span={12}>
                    <Form.Item
                        name="systolic"
                        label="Systolic"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Systolic!',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="Sys" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="diastolic"
                        label="Diastolic"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Diastolic!',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="Dia" />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                name="pulse"
                label="Pulse"
                rules={[
                    {
                        required: true,
                        message: 'Please input your pulse!',
                    },
                ]}
            >
                <InputNumber style={{width:"100%"}}/>
            </Form.Item>

            <Form.Item
                name="spo2"
                label="Spo2"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Spo2!'
                    },
                ]}
            >
                <InputNumber style={{width:"100%"}}/>
            </Form.Item>

            <Form.Item
                name="weight"
                label="Weight"
                rules={[
                    {
                        required: true,
                        message: 'Please select your habitual weight!',
                    },
                ]}
            >
               <InputNumber style={{width:"100%"}} addonAfter="Kg"/>
            </Form.Item>

            <Form.Item
                name="createdAt"
                label="Date"
                rules={[
                    {
                        required: true,
                        message: 'Please select createdAt!',
                    },
                ]}
            >
                <DatePicker
                    allowClear
                    style={{ width: "100%" }}
                    showTime onChange={onChange} onOk={onOk}
                />
            </Form.Item>


            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Save Record
                </Button>
            </Form.Item>
        </Form>
    );
};
export default Home;
