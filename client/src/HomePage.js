import React, { useState } from 'react';
import { Layout, Button, Upload, Table, Select, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import columnMappingWithBe from './columnMappingWithBe.json';

const { Content } = Layout;
const { Option } = Select;

function HomePage() {
  const [fileUploadResult, setFileUploadResult] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState([]);

  const handlePlatformChange = (selectedValue) => {
    // Update selected option state when selectbox values change
    setSelectedPlatform(selectedValue);
  };

  const platforms = ['PingPong', 'LianLian'];

  const customRequest = ({ file, onSuccess }) => {
    // Send the file to the backend at http://localhost:8888
    const formData = new FormData();

    // Prepare the data to send
    formData.append('file', file);
    formData.append('platform', selectedPlatform);


    // Send the data and handle the response
    axios
      .post('http://localhost:8888/upload', formData)
      .then((response) => {
        onSuccess();
        console.log('File uploaded successfully');
        setFileUploadResult(response.data);
      })
      .catch((error) => {
        console.error('File upload error:', error);
      });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ padding: '24px' }}>
          {/* Content of the main area */}
          <h1>Transaction Processing</h1>
          <Row gutter={8}>
            <Col>
            <Select
              value={selectedPlatform}
              style={{ width: 180, marginBottom: 16 }}
              onChange={handlePlatformChange}
              placeholder="Select a platform"
            >
              {platforms.map((platform) => (
                <Option key={platform} value={platform}>
                  {platform}
                </Option>
              ))}
            </Select>
            </Col>
            <Col>
            <Upload
              customRequest={customRequest}
              showUploadList={true}
              accept=".xls, .xlsx" // Specify accepted file types
            >
              <Button icon={<UploadOutlined />}>Upload File</Button>
            </Upload>
            </Col>
          </Row>
          {fileUploadResult.length > 0 && (
            <Table
              dataSource={fileUploadResult} // Provide your data array here
              columns={columnMappingWithBe}
              pagination={false}
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default HomePage;