import { Table } from 'antd';

const columns = [
  {
    title: 'Employee ID #1',
    dataIndex: 'firstEmployeeId',
    key: 'firstEmployeeId',
  },
  {
    title: 'Employee ID #2',
    dataIndex: 'secondEmployeeId',
    key: 'secondEmployeeId',
  },
  {
    title: 'Project ID',
    dataIndex: 'projectId',
    key: 'projectId',
  },
  {
    title: 'Days worked',
    dataIndex: 'daysWorked',
    key: 'daysWorked',
  },
];

const data = [
  {
    key: '1',
    firstEmployeeId: 218,
    secondEmployeeId: 143,
    projectId: 10,
    daysWorked: 8,
  },
];

export const EmployeeTable = () => {
  return <Table columns={columns} dataSource={data} pagination={false} />;
};
