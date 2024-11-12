import { Em, Flex, Heading, Link, Text } from '@radix-ui/themes';

export default function Privacy() {
  return (
    <Flex
      direction="column"
      overflow="auto"
      maxHeight="70vh"
      className="space-y-4"
    >
      <Heading size="3">Privacy Policy</Heading>
      <Text size="2">
        We respect your privacy and are committed to protecting it through our
        compliance with this privacy policy (&quot;Policy&quot;). This Policy
        describes the types of information we may collect from you or that you
        may provide (&quot;Personal Information&quot;) in the &quot;Pirate
        Treasure Bot&quot; mobile application (&quot;Mobile Application&quot; or
        &quot;Service&quot;) and any of its related products and services,
        including tg bot (collectively, &quot;Services&quot;), and our practices
        for collecting, using, maintaining, protecting, and disclosing that
        Personal Information. It also describes the choices available to you
        regarding our use of your Personal Information and how you can access
        and update it.
      </Text>
      <Text size="2">
        This Policy is a legally binding agreement between you
        (&quot;User&quot;, &quot;you&quot; or &quot;your&quot;) and Pirate
        Treasure LLC (doing business as &quot;Pirate Treasure&quot;,
        &quot;we&quot;, &quot;us&quot; or &quot;our&quot;). If you are entering
        into this Policy on behalf of a business or other legal entity, you
        represent that you have the authority to bind such an entity to this
        Policy, in which case the terms &quot;User&quot;, &quot;you&quot; or
        &quot;your&quot; shall refer to such entity. If you do not have such
        authority, or if you do not agree with the terms of this Policy, you
        must not accept this Policy and may not access and use the Mobile
        Application and Services. By accessing and using the Mobile Application
        and Services, you acknowledge that you have read, understood, and agree
        to be bound by the terms of this Policy. This Policy does not apply to
        the practices of companies that we do not own or control, or to
        individuals that we do not employ manage.
      </Text>
      <Heading size="3">Collection of information</Heading>
      <Text size="2">
        When you use the Mobile Application, our servers automatically record
        information that your device sends. This data may include information
        such as your device&apos;s IP address and location, device name and
        version, operating system type and version, language preferences,
        information you search for in the Mobile Application, access times and
        dates, and other statistics.
      </Text>
      <Text size="2">
        Information collected automatically is used only to identify potential
        cases of abuse and establish statistical information regarding the usage
        of the Mobile Application and Services. This statistical information is
        not otherwise aggregated in such a way that would identify any
        particular user of the system and we do not collect or store any
        personally identifiable information.
      </Text>
      <Heading size="3">Contacting us</Heading>
      <Text size="2">
        If you have any questions about this Policy or our use of your Personal
        Information, please contact us at
      </Text>
      <Link href="https://t.me/pirate_treasure_channel">
        https://t.me/pirate_treasure_channel
      </Link>
      <Text size="2">
        We will attempt to resolve complaints and disputes and make every
        reasonable effort to honour your wish to exercise your rights as quickly
        as possible and in any event, within the timescales provided by
        applicable data protection laws.
      </Text>
      <Text size="2">
        <Em>This document was last updated on November 11, 2024</Em>
      </Text>
    </Flex>
  );
}
