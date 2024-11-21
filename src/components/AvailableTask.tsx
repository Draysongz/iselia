

import {Tabs, TabList, Tab, TabPanels, TabPanel, Image, Flex, Box, Text, Icon} from "@chakra-ui/react"
import { FaAngleRight } from "react-icons/fa6";

const NewList = [
  {
    title: "Connect Venom Wallet (Airdrop)",
  },
  {
    title: "Watch New Youtube Video",
  },
  {
    title: "Play BIRDS",
  },
  {
    title: "Watch Eraldo",
  },
];
const Daily = [
    {
        title: "Daily Reward",
    },
    {
        title: "Like and RT a Daily Post",
    },
    {
        title: "Watch and Earn",
    },
];
const Invites = [
    {
        title: "Invite a Friend",
    },
    {
        title: "Invite a Friend with Telegram Premium",
    },
];
const Others = [
    {
        title: "Watch Youtube Video",
    },
    {
        title: "Follow Telegram Channel",
    },
    {
        title: "Join Discord Server",
    },
    {
        title: "Follow on Twitter",
    },
    {
        title: "Follow on TikTok",
    },
    {
        title: "Follow on YouTube",
    },
    {
        title: "Follow on Instagram",
    },
    {
        title: "Like and RT our Announcement",
    },
    {
        title: "Visit our Website",
    },
];

export default function AvailableTask() {
    return(
        <>
        <Tabs variant={'unstyled'}>
            <TabList justifyContent={'space-between'}>
                <Tab _selected={{borderBottom: '1px solid #35B5FF'}}>New</Tab>
                <Tab _selected={{borderBottom: '1px solid #35B5FF'}}>Daily</Tab>
                <Tab _selected={{borderBottom: '1px solid #35B5FF'}}>Invites</Tab>
                <Tab _selected={{borderBottom: '1px solid #35B5FF'}}>Others</Tab>
            </TabList>
            <TabPanels>
                <TabPanel p={0}>
                    {NewList.map((newlist) => {
                        return (
                          <Flex
                            bg={"#0000004D"}
                            border={"1px solid #35B5FF"}
                            borderRadius={"10px"}
                            h={"68px"}
                            mt={2}
                            alignItems={"center"}
                            gap={2}
                            px={3}
                            // justifyContent={'center'}
                          >
                            <Box
                              w={"41px"}
                              h={"36px"}
                              borderRadius={"10px"}
                              border={"2px solid #59173E"}
                              bg={"#AB6C93"}
                              boxShadow={"0px 0px 10px 1px #000000"}
                            />
                            <Flex justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
                              <Box>
                                <Text fontSize={'12px'}>{newlist.title}</Text>
                                <Flex alignItems={'center'} gap={1}>
                                  <Image src="/Icons/blue.png" w={'16px'} h={'16px'}/>
                                  <Text fontSize={'12px'}>25</Text>
                                </Flex>
                              </Box>
                              <Icon as={FaAngleRight} />
                            </Flex>
                          </Flex>
                        );
                    })}
                </TabPanel>
                <TabPanel p={0}>
                    {Daily.map((daily) => {
                        return (
                          <Flex
                            bg={"#0000004D"}
                            border={"1px solid #35B5FF"}
                            borderRadius={"10px"}
                            h={"68px"}
                            mt={2}
                            alignItems={"center"}
                            gap={2}
                            px={3}
                            // justifyContent={'center'}
                          >
                            <Box
                              w={"41px"}
                              h={"36px"}
                              borderRadius={"10px"}
                              border={"2px solid #59173E"}
                              bg={"#AB6C93"}
                              boxShadow={"0px 0px 10px 1px #000000"}
                            />
                            <Flex justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
                              <Box>
                                <Text fontSize={'12px'}>{daily.title}</Text>
                                <Flex alignItems={'center'} gap={1}>
                                  <Image src="/Icons/blue.png" w={'16px'} h={'16px'}/>
                                  <Text fontSize={'12px'}>25</Text>
                                </Flex>
                              </Box>
                              <Icon as={FaAngleRight} />
                            </Flex>
                          </Flex>
                        );
                    })}
                </TabPanel>
                <TabPanel p={0}>
                    {Invites.map((invite) => {
                        return (
                          <Flex
                            bg={"#0000004D"}
                            border={"1px solid #35B5FF"}
                            borderRadius={"10px"}
                            h={"68px"}
                            mt={2}
                            alignItems={"center"}
                            gap={2}
                            px={3}
                            // justifyContent={'center'}
                          >
                            <Box
                              w={"41px"}
                              h={"36px"}
                              borderRadius={"10px"}
                              border={"2px solid #59173E"}
                              bg={"#AB6C93"}
                              boxShadow={"0px 0px 10px 1px #000000"}
                            />
                            <Flex justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
                              <Box>
                                <Text fontSize={'12px'}>{invite.title}</Text>
                                <Flex alignItems={'center'} gap={1}>
                                  <Image src="/Icons/blue.png" w={'16px'} h={'16px'}/>
                                  <Text fontSize={'12px'}>25</Text>
                                </Flex>
                              </Box>
                              <Icon as={FaAngleRight} />
                            </Flex>
                          </Flex>
                        );
                    })}
                </TabPanel>
                <TabPanel p={0}>
                    {Others.map((other) => {
                        return (
                          <Flex
                            bg={"#0000004D"}
                            border={"1px solid #35B5FF"}
                            borderRadius={"10px"}
                            h={"68px"}
                            mt={2}
                            alignItems={"center"}
                            gap={2}
                            px={3}
                            // justifyContent={'center'}
                          >
                            <Box
                              w={"41px"}
                              h={"36px"}
                              borderRadius={"10px"}
                              border={"2px solid #59173E"}
                              bg={"#AB6C93"}
                              boxShadow={"0px 0px 10px 1px #000000"}
                            />
                            <Flex justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
                              <Box>
                                <Text fontSize={'12px'}>{other.title}</Text>
                                <Flex alignItems={'center'} gap={1}>
                                  <Image src="/Icons/blue.png" w={'16px'} h={'16px'}/>
                                  <Text fontSize={'12px'}>25</Text>
                                </Flex>
                              </Box>
                              <Icon as={FaAngleRight} />
                            </Flex>
                          </Flex>
                        );
                    })}
                </TabPanel>
            </TabPanels>
        </Tabs>
        </>
    )
}