
import React, { useState, useEffect } from 'react';
import { Table, Button,  Input, Space,  Popconfirm, Modal, Form, Select, Card, Tag, Typography, Row, Col} from 'antd';
import { SearchOutlined, UserAddOutlined, EditOutlined, DeleteOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [modalTitle, setModalTitle] = useState('Thêm người dùng mới');
  const [editingUserId, setEditingUserId] = useState(null);

  // Fetch users mock data
  useEffect(() => {
    setTimeout(() => {
      const mockData = [
        { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', role: 'admin', status: 'active', lastLogin: '2025-03-02 10:30:00' },
        { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', role: 'user', status: 'active', lastLogin: '2025-03-01 15:45:00' },
        { id: 3, name: 'Lê Văn C', email: 'levanc@example.com', role: 'manager', status: 'inactive', lastLogin: '2025-02-28 09:20:00' },
        { id: 4, name: 'Phạm Thị D', email: 'phamthid@example.com', role: 'user', status: 'blocked', lastLogin: '2025-02-25 11:10:00' },
      ];
      setUsers(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  // Modal handlers
  const showAddModal = () => {
    setModalTitle('Thêm người dùng mới');
    setEditingUserId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (record) => {
    setModalTitle('Chỉnh sửa người dùng');
    setEditingUserId(record.id);
    form.setFieldsValue({
      name: record.name,
      email: record.email,
      role: record.role,
      status: record.status,
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Search filter
  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  // Table columns
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        let color = 'blue';
        if (role === 'admin') color = 'red';
        else if (role === 'manager') color = 'purple';
        return <Tag color={color}>{role.toUpperCase()}</Tag>;
      },
      filters: [
        { text: 'Admin', value: 'admin' },
        { text: 'User', value: 'user' },
        { text: 'manager', value: 'manager' },
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'green';
        if (status === 'inactive') color = 'orange';
        else if (status === 'blocked') color = 'red';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
        { text: 'Blocked', value: 'blocked' },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: 'Đăng nhập gần đây',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      sorter: (a, b) => new Date(a.lastLogin) - new Date(b.lastLogin),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small" 
            onClick={() => showEditModal(record)}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa người dùng này?"
            okText="Có"
            cancelText="Không"
            onConfirm={() => {/* Xử lý xóa */}}
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              size="small" 
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' , width: '100%' }}>
      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Title level={4}>Quản lý người dùng</Title>
          </Col>
          <Col>
            <Button 
              type="primary" 
              icon={<UserAddOutlined />} 
              onClick={showAddModal}
            >
              Thêm người dùng
            </Button>
          </Col>
        </Row>
        
        <Row style={{ marginBottom: 16 }}>
          <Col span={8}>
            <Input
              placeholder="Tìm kiếm theo tên hoặc email"
              prefix={<SearchOutlined />}
              onChange={(e) => handleSearch(e.target.value)}
              allowClear
            />
          </Col>
          <Col span={16} style={{ textAlign: 'right' }}>
            <Space>
              <Button icon={<FilterOutlined />}>Lọc</Button>
              <Button icon={<ReloadOutlined />} onClick={() => setLoading(true)}>Làm mới</Button>
            </Space>
          </Col>
        </Row>
        
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          pagination={{ 
            defaultPageSize: 10, 
            showSizeChanger: true, 
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} người dùng`
          }}
        />
      </Card>

      {/* Modal form */}
      <Modal
        title={modalTitle}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={() => form.submit()}
          >
            {editingUserId ? 'Cập nhật' : 'Thêm mới'}
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Họ tên"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập họ tên người dùng!',
              },
            ]}
          >
            <Input placeholder="Nhập họ tên người dùng" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email!',
              },
              {
                type: 'email',
                message: 'Email không hợp lệ!',
              },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Vai trò"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn vai trò!',
              },
            ]}
          >
            <Select placeholder="Chọn vai trò">
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
              <Option value="manager">Manager</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn trạng thái!',
              },
            ]}
          >
            <Select placeholder="Chọn trạng thái">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="blocked">Blocked</Option>
            </Select>
          </Form.Item>

          {!editingUserId && (
            <>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                ]}
              >
                <Input.Password placeholder="Nhập mật khẩu" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng xác nhận mật khẩu!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Xác nhận mật khẩu" />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;