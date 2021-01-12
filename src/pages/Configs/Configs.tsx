import {
  Box,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import Card from '../../components/Card';
import { api } from '../../services/api';

interface ConfigOverview {
  config_name: string;
  config_version: string;
}

export interface ConfigsProps {}

const Configs: React.FC<ConfigsProps> = (props) => {
  const toast = useToast();

  const configsQuery = useQuery<Array<ConfigOverview>, Error>(
    '/config',
    api.configGet.bind(api) as () => Promise<ConfigOverview[]>,
    {
      onError: (error) => {
        toast({
          title: 'Failed to load configs',
          description: error.message,
          status: 'error',
          isClosable: true,
        });
      },
    },
  );

  return (
    <Container height="100%">
      <Heading mt={8}>Configs</Heading>
      <Box mt={8} flexGrow={1} overflow="auto">
        {configsQuery.isLoading ? (
          <Box mt={8} display="flex" justifyContent="center">
            <Spinner />
          </Box>
        ) : (
          <List>
            {configsQuery.data?.map((config) => (
              <ListItem
                key={`${config.config_name}${config.config_version}`}
                mb={4}
              >
                <Card>
                  <Flex justifyContent="space-between">
                    <Text>{config.config_name}</Text>
                    <Flex>
                      <Text color="blue.500">v</Text>
                      &nbsp;
                      {config.config_version}
                    </Flex>
                  </Flex>
                </Card>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default Configs;
