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

export const EmployeeTable = ({ rows }) => {
  return (
    <Table
      columns={columns}
      dataSource={rows}
      pagination={false}
      rowKey={'id'}
    />
  );
};
