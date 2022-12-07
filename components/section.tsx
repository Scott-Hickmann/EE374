import {
  Box,
  chakra,
  Heading,
  Link,
  Stack,
  Text,
  TextProps,
  VStack
} from '@chakra-ui/react';
import Image from 'next/image';

export type SectionsProps = React.PropsWithChildren<unknown>;
export type SectionProps = React.PropsWithChildren<{
  id: string;
  bg?: string;
  color?: string;
}>;
export type SubsectionProps = React.PropsWithChildren<unknown>;
export type SectionTitleProps = React.PropsWithChildren<unknown>;
export type SubsectionTitleProps = React.PropsWithChildren<{
  color?: string;
}>;
export type SubsectionTextProps = React.PropsWithChildren<unknown>;
export interface TeachingTeamMemberProps {
  name: string;
  workRole: string;
  email: string;
  officeHoursDate: string | JSX.Element;
  src: string;
  alt: string;
}

export function Sections({ children }: SectionsProps) {
  return <VStack spacing={0}>{children}</VStack>;
}

export function Section({ id, bg, color, children }: SectionProps) {
  return (
    <Box width="full">
      <chakra.div id={id} height={0} mt={-16} pb={16}>
        &nbsp;
      </chakra.div>
      <VStack bg={bg} color={color} p={{ base: 8, md: 10 }} spacing={6}>
        {children}
      </VStack>
    </Box>
  );
}

export function Subsection({ children }: SubsectionProps) {
  return (
    <Stack width="full" spacing={2}>
      {children}
    </Stack>
  );
}

export function SectionTitle({ children }: SectionTitleProps) {
  return <Heading fontSize="4xl">{children}</Heading>;
}

export function SubsectionTitle({ color, children }: SubsectionTitleProps) {
  return (
    <Heading fontSize={{ base: '2xl', md: '3xl' }} color={color}>
      {children}
    </Heading>
  );
}

export function SubsectionTitleDate(props: TextProps) {
  return (
    <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" {...props} />
  );
}

export function SubectionText({ children }: SubsectionTextProps) {
  return <Text>{children}</Text>;
}

export function TeachingTeamMember({
  name,
  workRole,
  email,
  officeHoursDate,
  src,
  alt
}: TeachingTeamMemberProps) {
  return (
    <VStack textAlign="center">
      <Image
        src={src}
        alt={alt}
        width={250}
        height={250}
        style={{ borderRadius: 25 }}
      />
      <VStack spacing={0}>
        <Text>{name}</Text>
        <Text fontStyle="italic">{workRole}</Text>
        <Link href={`mailto:${email}`}>{email}</Link>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'stretch', md: 'start' }}
          justify="start"
          textAlign={{ base: 'center', md: 'start' }}
          spacing={0}
          fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
        >
          <Text>Office Hours:&nbsp;</Text>
          <Text>{officeHoursDate}</Text>
        </Stack>
      </VStack>
    </VStack>
  );
}
