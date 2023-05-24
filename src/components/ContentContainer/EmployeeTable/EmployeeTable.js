import { Table, Row, Result } from 'antd';

const columns = [
  {
    title: 'Employee ID #1',
    dataIndex: 'firstEmployeeId',
    key: 'firstEmployeeId',
    render: (number) => <Row justify={'center'}>{number}</Row>,
  },
  {
    title: 'Employee ID #2',
    dataIndex: 'secondEmployeeId',
    key: 'secondEmployeeId',
    render: (number) => <Row justify={'center'}>{number}</Row>,
  },
  {
    title: 'Project ID',
    dataIndex: 'projectId',
    key: 'projectId',
    render: (number) => <Row justify={'center'}>{number}</Row>,
  },
  {
    title: 'Days worked',
    dataIndex: 'daysWorked',
    key: 'daysWorked',
    render: (number) => <Row justify={'center'}>{number}</Row>,
  },
];

export const EmployeeTable = ({ rows, error }) => {
  if (error) {
    return <Result status="error" title={error} />;
  }

  return (
    <Table
      columns={columns}
      dataSource={rows}
      pagination={false}
      rowKey={'id'}
    />
  );
};
