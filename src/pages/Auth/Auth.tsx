import {
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBoolean,
} from '@chakra-ui/react';
import React from 'react';
import Card from '../../components/Card';
import Login from './Login';
import Register from './Register';

export interface AuthProps {}

const Auth: React.FC<AuthProps> = (props) => {
  const [isRegister, setIsRegister] = useBoolean();

  return (
    <Container height="100%">
      <Card>
        <Tabs
          isFitted
          flexGrow={1}
          display="flex"
          flexDirection="column"
          index={isRegister ? 1 : 0}
        >
          <TabList>
            <Tab
              onClick={() => {
                setIsRegister.off();
              }}
            >
              Login
            </Tab>
            <Tab
              onClick={() => {
                setIsRegister.on();
              }}
            >
              Register
            </Tab>
          </TabList>
          <TabPanels mt={8} minHeight="450px">
            <TabPanel>
              <Heading textAlign="center">Login</Heading>
              <Login />
            </TabPanel>
            <TabPanel>
              <Heading textAlign="center">Register</Heading>
              <Register
                onSuccess={() => {
                  setIsRegister.off();
                }}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Container>
  );
};

export default Auth;
