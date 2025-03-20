import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, Row, Col, Statistic } from "antd";

const data = [
  { date: "2024-03-2", visits: 2 },
  { date: "2024-03-3", visits: 1 },
  { date: "2024-03-4", visits: 3 },
  { date: "2024-03-5", visits: 4 },
  { date: "2024-03-6", visits: 5 },
  { date: "2024-03-7", visits: 10 },
  { date: "2024-03-8", visits: 8 },
  { date: "2024-03-9", visits: 10 },
  { date: "2024-03-10", visits: 10 },
  { date: "2024-03-11", visits: 14 },
  { date: "2024-03-12", visits: 23 },
  { date: "2024-03-13", visits: 15 },
  { date: "2024-03-14", visits: 26 },
  { date: "2024-03-15", visits: 20 },
  { date: "2024-03-16", visits: 22 },
];

const userGrowthData = data.map((item, index) => ({
  date: item.date,
  users: Math.floor(73 * (index + 1) / data.length),
}));

const totalRegistrations = 73;

const TrafficChart = () => {
  return (
    <div className="p-6 bg-white min-h-screen" style={{ margin: "20px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 className="text-2xl font-bold text-[#F95B01] mb-4">Biểu đồ thống kê</h1>
      </div>

      <Row gutter={16} className="mb-4" style={{ marginBottom: "10px" }}>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic title="Tổng số tài khoản đăng ký" value={totalRegistrations} valueStyle={{ color: "#FFA401" }} />
          </Card>
        </Col>
      </Row>

      <div style={{display:"flex", justifyContent:"space-between"}}>
      <Card className="shadow-lg rounded-2xl mb-6" bordered={false} style={{ padding: "20px" , width:"100%"}}>
        <h2 className="text-xl font-semibold text-[#F95B01] mb-4">Lượt truy cập theo ngày</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#FFA401" />
            <YAxis stroke="#FFA401" />
            <Tooltip />
            <Line type="monotone" dataKey="visits" stroke="#F95B01" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="shadow-lg rounded-2xl" bordered={false} style={{ padding: "20px" , width:"100%"}}>
        <h2 className="text-xl font-semibold text-[#F95B01] mb-4">Số lượng người dùng tăng theo ngày</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#FFA401" />
            <YAxis stroke="#FFA401" />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#0088FE" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
    </div>
  );
};

export default TrafficChart;
