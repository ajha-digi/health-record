"use client"
import { formatDate } from '@/helper';
import { Form, InputNumber, Popconfirm, Table, Typography, Input } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { ToastContainer } from 'react-toastify';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {

    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default function Dashboard() {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        const getAllRecords = async () => {
            const resp = await axios.get('/api/report')
            setData(resp.data.data)
        }
        getAllRecords();
    }, [])

    const isEditing = (record) => record._id === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            bp: '',
            pulse: '',
            weight: '',
            spo2: '',
            date: '',
            ...record,
        });
        setEditingKey(record._id);
    };

    const deleteRow = async (record) => {
        let newData = [...data];
        newData = newData.filter(row => row._id !== record._id);
        setData(newData);
        await axios.delete(`/api/report?id=${record._id}`)
        toast.error('🦄 Record deleted !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item._id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                await axios.patch(`/api/report?id=${item._id}`, row)
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Bp',
            dataIndex: 'bp',
            width: '25%',
            editable: true,
        },
        {
            title: 'Pulse',
            dataIndex: 'pulse',
            width: '5%',
            editable: true,
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            width: '10%',
            editable: true,
        },
        {
            title: 'Spo2',
            dataIndex: 'spo2',
            width: '10%',
            editable: true,
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            width: '20%',
            render: (_, record) => formatDate(record.createdAt)
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record._id)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <span>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            <EditTwoTone />
                        </Typography.Link>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => deleteRow(record)} style={{ marginLeft: "10px" }}>
                            <DeleteTwoTone twoToneColor="#eb2f96" />
                        </Typography.Link>
                    </span>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'bp' ? 'text' : 'number',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <>
            <ToastContainer />
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    pagination={false}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                />
            </Form>
            <Link href="/user/visual">Visuals</Link>
        </>

    );
};
