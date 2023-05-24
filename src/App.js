import { Layout } from 'antd';
import { HeaderTitle } from './components/HeaderTitle/HeaderTitle';
import { ContentContainer } from './components/ContentContainer/ContentContainer';
import './components/HeaderTitle/headerTitle.css';
import './components/ContentContainer/contentContainer.css';
import './components/ContentContainer/EmployeeTable/employeeTable.css';

const { Header, Content } = Layout;

export const App = () => {
  return (
    <Layout
      style={{
        height: '100vh',
        backgroundColor: 'teal',
      }}
    >
      <Header>
        <HeaderTitle />
      </Header>
      <Content>
        <ContentContainer />
      </Content>
    </Layout>
  );
};
