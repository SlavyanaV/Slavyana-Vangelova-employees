import { Button, Upload, Row, Col } from 'antd';
import { EmployeeTable } from './EmployeeTable/EmployeeTable';
import { useState } from 'react';
import { fileParser } from './helpers';

export const ContentContainer = () => {
  const [rows, setRows] = useState([]);

  const handleOnUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result.split('\n');
      const filteredData = data.filter((item) => item !== '');
      const rowsData = filteredData.map((row) => row.split(','));

      const parsedRows = fileParser(rowsData);

      setRows(parsedRows);
    };

    reader.readAsText(file);

    return false;
  };

  return (
    <Row justify={'center'}>
      <Col style={{ width: '50%' }}>
        <Row justify={'center'} gutter={24} style={{ marginTop: '2em' }}>
          <Upload
            maxCount={1}
            beforeUpload={handleOnUpload}
            onRemove={() => setRows([])}
          >
            <Button>Upload file</Button>
          </Upload>
        </Row>
        <Row justify={'center'} style={{ marginTop: '2em' }}>
          <EmployeeTable rows={rows} />
        </Row>
      </Col>
    </Row>
  );
};
