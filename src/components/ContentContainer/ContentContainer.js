import { Button, Upload, Row, Col } from 'antd';
import { EmployeeTable } from './EmployeeTable/EmployeeTable';

export const ContentContainer = () => {
  return (
    <Row justify={'center'}>
      <Col style={{ width: '50%' }}>
        <Row justify={'center'} gutter={24} style={{ marginTop: '2em' }}>
          <Col>
            <Upload>
              <Button>Upload file</Button>
            </Upload>
          </Col>
          <Col>
            <Button>Check file</Button>
          </Col>
        </Row>
        <Row justify={'center'} style={{ marginTop: '2em' }}>
          <EmployeeTable />
        </Row>
      </Col>
    </Row>
  );
};
