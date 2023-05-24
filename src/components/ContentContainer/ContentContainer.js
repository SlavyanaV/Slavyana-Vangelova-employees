import { Button, Upload, Row, Col } from 'antd';
import { EmployeeTable } from './EmployeeTable/EmployeeTable';
import { useState } from 'react';
import { fileParser } from './helpers';
const dayjs = require('dayjs');

export const ContentContainer = () => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  const handleOnRemoveFile = () => {
    setRows([]);
    setError('');
  };

  const handleOnUpload = (file) => {
    setError('');
    if (file.type !== 'text/csv') {
      setError('Unsupported file format');
      return false;
    }
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result.split('\n');
      const filteredData = data.filter((item) => item !== '');
      const rowsData = filteredData.map((row) => row.split(','));

      let hasError = false;

      if (!rowsData.length) {
        setError('Empty file');
        hasError = true;
      }

      rowsData.forEach((row) => {
        const isRowInvalid =
          isNaN(+row[0]) ||
          isNaN(+row[1]) ||
          !dayjs(row[2]).isValid() ||
          (!dayjs(row[3]).isValid() && row[3] !== 'NULL');

        const hasEmptyRow = !row[0] || !row[1] || !row[2];

        if (isRowInvalid || hasEmptyRow) {
          setError('File contains unsupported cells');
          hasError = true;
        }
      });

      if (hasError) {
        return false;
      }

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
            onRemove={handleOnRemoveFile}
            accept=".csv"
          >
            <Button>Upload file</Button>
          </Upload>
        </Row>
        <Row justify={'center'} style={{ marginTop: '2em' }}>
          <EmployeeTable rows={rows} error={error} />
        </Row>
      </Col>
    </Row>
  );
};
