import { Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';

export default function TitleSection() {
  return (
    <Stack
      width="full"
      textAlign="center"
      align="center"
      spacing={{ base: 8, md: 10 }}
      px={{ base: 10, md: 14 }}
      py={{ base: 20, md: 28 }}
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth={2}
      borderBottomColor={useColorModeValue('gray.200', 'gray.900')}
    >
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
        lineHeight={'110%'}
      >
        <Text as={'span'} color={'blue.400'}>
          EE374:
        </Text>{' '}
        Blockchain Foundations
      </Heading>
    </Stack>
  );
}
