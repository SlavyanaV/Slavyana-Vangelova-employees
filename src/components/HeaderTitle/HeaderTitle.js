import { Typography } from 'antd';
import { Fragment } from 'react';
const { Title } = Typography;

export const HeaderTitle = () => {
  return (
    <Fragment>
      <Title level={2}>Pairs of employees</Title>
    </Fragment>
  );
};
