import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import Card from '../../components/Card';
import { InlineResponse2001 } from '../../generated/api';
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

  const [
    configOverview,
    setConfigOverview,
  ] = React.useState<ConfigOverview | null>(null);

  const configQuery = useQuery<InlineResponse2001, Error>(
    `/config/${configOverview?.config_name}`,
    () =>
      api.configNameGet({
        name: configOverview!.config_name,
        version: configOverview!.config_version,
      }),
    {
      enabled: !!configOverview,
      onError: (error) => {
        toast({
          title: `Failed to load config ${configOverview?.config_name}`,
          description: error.message,
          status: 'error',
          isClosable: true,
        });
      },
    },
  );

  const onCloseModal = React.useCallback(() => {
    setConfigOverview(null);
  }, []);

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
            {configsQuery.data?.map((configOverview) => (
              <ListItem
                key={`${configOverview.config_name}${configOverview.config_version}`}
                mb={4}
              >
                <Card>
                  <Flex justifyContent="space-between">
                    <Text>{configOverview.config_name}</Text>
                    <Flex>
                      <Text color="blue.500">v</Text>
                      &nbsp;
                      {configOverview.config_version}
                    </Flex>
                    <Button
                      onClick={() => {
                        setConfigOverview(configOverview);
                      }}
                      isLoading={configQuery.isLoading}
                      loadingText={`Loading`}
                    >
                      Open
                    </Button>
                  </Flex>
                </Card>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <Modal isOpen={!!configQuery.data} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{configQuery.data?.name}</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <Heading size="lg">Version {configQuery.data?.version}</Heading>

            <Box mt={6} height="65vh" overflow="auto">
              <pre>{JSON.stringify(configQuery.data?.data, null, 2)}</pre>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onCloseModal}>
              Close
            </Button>
            <Button colorScheme="blue">Edit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Configs;
