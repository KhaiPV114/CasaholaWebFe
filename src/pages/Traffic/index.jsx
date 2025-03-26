import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, Row, Col, Statistic } from "antd";

const data = [
  { date: "2024-03-2", visits: 2, avgTime: 5 },
  { date: "2024-03-3", visits: 1, avgTime: 4 },
  { date: "2024-03-4", visits: 3, avgTime: 6 },
  { date: "2024-03-5", visits: 4, avgTime: 7 },
  { date: "2024-03-6", visits: 5, avgTime: 6 },
  { date: "2024-03-7", visits: 10, avgTime: 8 },
  { date: "2024-03-8", visits: 8, avgTime: 9 },
  { date: "2024-03-9", visits: 10, avgTime: 6 },
  { date: "2024-03-10", visits: 10, avgTime: 3 },
  { date: "2024-03-11", visits: 14, avgTime: 4 },
  { date: "2024-03-12", visits: 23, avgTime: 5 },
  { date: "2024-03-13", visits: 15, avgTime: 6 },
  { date: "2024-03-14", visits: 26, avgTime: 4 },
  { date: "2024-03-15", visits: 20, avgTime: 3 },
  { date: "2024-03-16", visits: 22, avgTime: 2 },
  { date: "2024-03-17", visits: 26, avgTime: 5 },
  { date: "2024-03-18", visits: 19, avgTime: 7 },
  { date: "2024-03-19", visits: 22, avgTime: 8 },
  { date: "2024-03-20", visits: 28, avgTime: 9 },
  { date: "2024-03-21", visits: 23, avgTime: 7 },
  { date: "2024-03-22", visits: 33, avgTime: 9 },
  { date: "2024-03-23", visits: 28, avgTime: 5 },
  { date: "2024-03-24", visits: 25, avgTime: 6 },
  { date: "2024-03-25", visits: 23, avgTime: 4 },
  { date: "2024-03-26", visits: 26, avgTime: 7 },
  { date: "2024-03-27", visits: 23, avgTime: 5 },

];

const totalVisits = data.reduce((sum, item) => sum + item.visits, 0);
const totalDays = data.length;
const totalVisitTime = data.reduce((sum, item) => sum + item.avgTime * item.visits, 0);
const avgVisitTimePerDay = Math.round(totalVisitTime / totalDays);
const avgVisitTimeOverall = Math.round(totalVisitTime / totalVisits);
const totalRegistrations = 99;

const TrafficChart = () => {
  return (
    <div className="p-6 bg-white min-h-screen" style={{ margin: "20px", width:"100%" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 className="text-2xl font-bold text-[#F95B01] mb-4">Biểu đồ thống kê</h1>
      </div>

      <Row gutter={16} className="mb-4" style={{ marginBottom: "10px" }}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="Tổng số tài khoản đăng ký" value={totalRegistrations} valueStyle={{ color: "#FFA401" }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="Tổng lượng truy cập" value={totalVisits} valueStyle={{ color: "#F95B01" }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="Thời gian truy cập trung bình/ngày" value={`${avgVisitTimePerDay} phút`} valueStyle={{ color: "#0088FE" }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="Thời gian truy cập trung bình/giờ" value={`${avgVisitTimeOverall} phút`} valueStyle={{ color: "#00C49F" }} />
          </Card>
        </Col>
      </Row>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Card className="shadow-lg rounded-2xl mb-6" bordered={false} style={{ padding: "20px", width: "100%" }}>
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
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Card className="shadow-lg rounded-2xl mb-6" bordered={false} style={{ padding: "20px", width: "100%" }}>
          <h2 className="text-xl font-semibold text-[#F95B01] mb-4">Số lượng người dùng tăng theo ngày</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#FFA401" />
              <YAxis stroke="#FFA401" />
              <Tooltip />
              <Line type="monotone" dataKey="avgTime" stroke="#0088FE" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default TrafficChart;
