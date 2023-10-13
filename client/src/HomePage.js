import React, { useState, useEffect } from 'react';
import { Layout, Button, Upload, Table, Select, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import columnMappingWithBe from './columnMappingWithBe.json';

const { Content } = Layout;
const { Option } = Select;

function HomePage() {
  const [selectedPlatform, setSelectedPlatform] = useState([]);
  const [oldTransactions, setOldTransactions] = useState([]); // New state for old transactions

  useEffect(() => {
    // Fetch old transactions when the component mounts
    axios.get('http://localhost:8888/transactions') // Replace with your API endpoint
      .then((response) => {
        setOldTransactions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching old transactions:', error);
      });
  }, []);

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
    axios.post('http://localhost:8888/upload', formData)
      .then((response) => {
        onSuccess();
        console.log('File uploaded successfully');

        // Fetch old transactions again to refresh the table
        axios.get('http://localhost:8888/transactions')
          .then((response) => {
            setOldTransactions(response.data);
          })
          .catch((error) => {
            console.error('Error fetching old transactions:', error);
          });
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
          <h2>Transactions</h2>
          <Table
            dataSource={oldTransactions} // Provide data for old transactions
            columns={columnMappingWithBe} // Define columns for old transactions
            pagination={false}
          />
        </Content>
      </Layout>
    </Layout>
  );
}

export default HomePage;