import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';

type NavLinkWrapperProps = React.PropsWithChildren<{
  href: string;
  active: boolean;
}>;

type NavLinkProps = React.PropsWithChildren<{
  href: string;
}>;

const routes = [
  { title: 'Logistics', link: './#logistic' },
  { title: 'Syllabus', link: './#syllabus' },
  { title: 'Team', link: './#team' }
] as const;

function NavLinkWrapper({
  href,
  active,
  children
}: NavLinkWrapperProps): ReactElement {
  if (active) return <>{children}</>;
  return <a href={href}>{children}</a>;
}

function NavLink({ href, children }: NavLinkProps): ReactElement {
  const active = false;

  const activeBgColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <NavLinkWrapper href={href} active={active}>
      <Link
        as="span"
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.200', 'gray.700')
        }}
        background={active ? activeBgColor : 'none'}
      >
        {children}
      </Link>
    </NavLinkWrapper>
  );
}

export default function Navigation(): ReactElement {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      px={4}
      borderBottomWidth={2}
      borderBottomColor={useColorModeValue('gray.200', 'gray.900')}
      position="sticky"
      top={0}
      width="full"
      zIndex={999}
    >
      <HStack h={16} align="center" justify="space-between" spacing={4}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack
          spacing={{ base: 4, lg: 8 }}
          align="center"
          justify="space-between"
          width="full"
        >
          <Text
            fontWeight={600}
            whiteSpace="nowrap"
            fontSize={{ base: 'md', sm: 'lg', md: 'xl', lg: '2xl' }}
          >
            <chakra.span color={'blue.400'}>EE374:</chakra.span> Blockchain
            Foundations{' '}
            <chakra.span display={{ base: 'none', md: 'inline' }}>
              (Winter 2023)
            </chakra.span>
          </Text>
          <Flex alignItems="center" fontSize={{ base: 'sm', md: 'md' }}>
            <HStack spacing={{ base: 2, lg: 4 }}>
              <HStack
                as={'nav'}
                width="full"
                spacing={{ base: 2, lg: 4 }}
                display={{ base: 'none', md: 'flex' }}
              >
                {routes.map(({ title, link }) => (
                  <NavLink key={title} href={link}>
                    {title}
                  </NavLink>
                ))}
              </HStack>
              {/* <Button aria-label="Toggle color mode" onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button> */}
            </HStack>
          </Flex>
        </HStack>
      </HStack>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {routes.map(({ title, link }) => (
              <NavLink key={title} href={link}>
                {title}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
