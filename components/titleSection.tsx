import { Container, Heading, Stack, Text } from '@chakra-ui/react';

export default function TitleSection() {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
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
        <Text
          color={'gray.500'}
          maxW={'3xl'}
          fontSize={{ base: 'lg', sm: 'md', lg: 'xl' }}
        >
          Blockchains are a new field of computer science which combines
          cryptography, distributed systems, and security. In this course, we
          dive deep into the fundamentals: what are blockchains, how do they
          work, and why are they secure?
        </Text>
        <Stack spacing={6} direction={'row'}>
          {/* <Button
            rounded={'full'}
            px={6}
            colorScheme={'red'}
            bg={'red.400'}
            _hover={{ bg: 'red.500' }}
            as="a"
            href=""
            target="_blank"
          >
            Join the Slack
          </Button> */}
          {/* <Button rounded={'full'} px={6}>
            Learn more
          </Button> */}
        </Stack>
      </Stack>
    </Container>
  );
}
