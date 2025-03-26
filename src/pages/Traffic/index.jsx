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
  { date: "2024-03-10", visits: 10, avgTime: 4 },
  { date: "2024-03-11", visits: 14, avgTime: 5 },
  { date: "2024-03-12", visits: 23, avgTime: 2 },
  { date: "2024-03-13", visits: 15, avgTime: 4 },
  { date: "2024-03-14", visits: 26, avgTime: 5 },
  { date: "2024-03-15", visits: 20, avgTime: 3 },
  { date: "2024-03-16", visits: 22, avgTime: 4 },
  { date: "2024-03-17", visits: 26, avgTime: 6 },
  { date: "2024-03-18", visits: 19, avgTime: 7 },
  { date: "2024-03-19", visits: 22, avgTime: 8 },
  { date: "2024-03-20", visits: 28, avgTime: 7 },
  { date: "2024-03-21", visits: 30, avgTime: 4 },
  { date: "2024-03-22", visits: 18, avgTime: 7 },
  { date: "2024-03-23", visits: 33, avgTime: 9 },
  { date: "2024-03-24", visits: 25, avgTime: 4 },
  { date: "2024-03-25", visits: 21, avgTime: 5 },
  { date: "2024-03-26", visits: 23, avgTime: 3 },
  { date: "2024-03-27", visits: 26, avgTime: 6 },
  { date: "2024-03-28", visits: 23, avgTime: 4 },
];

const totalVisits = data.reduce((sum, item) => sum + item.visits, 0);
const totalDays = data.length;
const totalVisitTime = data.reduce((sum, item) => sum + item.avgTime * item.visits, 0);
const avgVisitTimePerDay = Math.round(totalVisitTime / totalDays);
const avgVisitTimeOverall = Math.round(totalVisitTime / totalVisits);
const totalRegistrations = 99;

const TrafficChart = () => {
  return (
    <div className="p-6 bg-white min-h-screen" style={{ margin: "20px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 className="text-2xl font-bold text-[#F95B01] mb-4">Biểu đồ thống kê</h1>
      </div>

      <Row gutter={16} className="mb-4" style={{ marginBottom: "10px" }}>
        <Col span={4}>
          <Card bordered={false}>
            <Statistic title="Tổng số tài khoản đăng ký" value={totalRegistrations} valueStyle={{ color: "#FFA401" }} />
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={false}>
            <Statistic title="Tổng lượng truy cập" value={totalVisits} valueStyle={{ color: "#F95B01" }} />
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={false}>
            <Statistic title="Tổng thời gian truy cập" value={`${totalVisitTime} phút`} valueStyle={{ color: "#FF5733" }} />
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={false}>
            <Statistic title="Thời gian truy cập trung bình theo ngày" value={`${avgVisitTimePerDay} phút`} valueStyle={{ color: "#0088FE" }} />
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={false}>
            <Statistic title="Thời gian truy cập trung bình theo giờ" value={`${avgVisitTimeOverall} phút`} valueStyle={{ color: "#00C49F" }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TrafficChart;
