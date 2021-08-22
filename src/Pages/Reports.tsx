import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Select,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';
import * as React from 'react';
import { FiDownload } from 'react-icons/fi';
import {
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
  Sankey,
} from 'recharts';
import salesDataPath from '../assets/data/sales-michael.csv';
import regionalSalesDataPath from '../assets/data/regional-sales.csv';
import adherenceDataPath from '../assets/data/adherence-michael.csv';
import outDataPath from '../assets/data/outstanding-suggestions-michael.csv';
import shareDataPath from '../assets/data/market-share.csv';
import { parseCsv } from '../utils/csv';

const parseData = async (path: string, cb: (data: any) => void) => {
  parseCsv(path, cb);
};

export interface ReportsPageProps {}

const strokeColors = [
  '#8884d8',
  '#82ca9d',
  '#ab1a34',
  '#82caff',
  '#ffa500',
  '#ff00ff',
  '#00ff00',
  '#0000ff',
  '#ff0000',
  '#ff8c00',
  '#ffd700',
  '#ffc0cb',
  '#ff4500',
];

interface salesDataProps {
  Quarter: string;
  'Michael Sales (£)': string;
  'Michael Sales (DoT)': string;
  'Michael Predicted Sales (£)': string;
  'Michael Predicted Sales (DoT)': string;
}
interface regionalSalesDataProps {
  Quarter: string;
  'Total Sales (DoT)': string;
  'Greater London  (DoT)': string;
  'South East (DoT)': string;
  'South West (DoT)': string;
  'West Midlands (DoT)': string;
  'North West (DoT)': string;
  'North East (DoT)': string;
  'Yorkshire and the Humber (DoT)': string;
  'East Midlands (DoT)': string;
  'East of England (DoT)': string;
  'Total Sales (£)': string;
  'Greater London (£)': string;
  'South East (£)': string;
  'South West (£)': string;
  'West Midlands (£)': string;
  'North West (£)': string;
  'North East (£)': string;
  'Yorkshire and the Humber (£)': string;
  'East Midlands (£)': string;
  'East of England (£)': string;
}
interface adherenceDataProps {
  Quarter: string;
  'Michael Adherence- % On target actions': string;
  'Michael Adherence- % Reports viewed': string;
  'Aggregate Rep Adherence (% Actions Taken)': string;
  'Aggregate Rep adherence (% reports opened)': string;
}
interface shareDataProps {
  Quarter: string;
  'Actual Anatoxidone (National) %': string;
  'Predicted Anatoxidone (North West) %': string;
  'Actual Anatoxidone £': string;
  'Actual Dabigoxidone £': string;
  'Actual Roxidone £': string;
  'Actual Edoxidone £': string;
  'Actual Others £': string;
  'Actual Pladicone £': string;
}

interface outDataProps {
  Quarter: string;
  'Outstanding high priority suggestions': string;
  'Outstanding mid priority suggestions': string;
  'Outstanding low priority suggestions': string;
  'Total outstanding (incomplete) suggestions': string;
  'Complete high priority suggestions': string;
  'Complete mid priority suggestions': string;
  'Complete low priority suggestions': string;
  'Total complete suggestions': string;
  'Dismissed high priority suggestions': string;
  'Dismissed mid priority suggestions': string;
  'Dimissed low priority suggestions': string;
  'Dismissed complete suggestions': string;
  '% Calls on Target': string;
  '% Emails on Target': string;
  '% Visits on Target': string;
}

const totalKeys = (data: any[], key: string) => {
  const value = data.reduce((acc, curr) => acc + Number(curr[key]), 0);
  return value;
};

const regionsDoT = [
  //   'Total Sales (DoT)',
  'Greater London  (DoT)',
  'South East (DoT)',
  'South West (DoT)',
  'West Midlands (DoT)',
  'North West (DoT)',
  'North East (DoT)',
  'Yorkshire and the Humber (DoT)',
  'East Midlands (DoT)',
  'East of England (DoT)',
];
const drugsValues = [
  'Actual Anatoxidone £',
  'Actual Dabigoxidone £',
  'Actual Roxidone £',
  'Actual Edoxidone £',
  'Actual Others £',
  'Actual Pladicone £',
];
const adheranceBars = [
  'Michael Adherence- % On target actions',
  'Michael Adherence- % Reports viewed',
  'Aggregate Rep Adherence (% Actions Taken)',
  'Aggregate Rep adherence (% reports opened)',
];

const ReportsPage: React.FC<ReportsPageProps> = () => {
  const [salesData, setSalesData] = React.useState<salesDataProps[]>([]);
  const [outData, setOutData] = React.useState<outDataProps[]>([]);
  const [shareData, setShareData] = React.useState<shareDataProps[]>([]);
  const [adherenceData, setAdherenceData] = React.useState<
    adherenceDataProps[]
  >([]);
  const [regionalSalesData, setRegionalSalesData] = React.useState<
    regionalSalesDataProps[]
  >([]);

  React.useEffect(() => {
    parseData(salesDataPath, (data) => {
      setSalesData(data);
    });
    parseData(regionalSalesDataPath, (data) => {
      setRegionalSalesData(data);
    });
    parseData(adherenceDataPath, (data) => {
      setAdherenceData(data);
    });
    parseData(outDataPath, (data) => {
      setOutData(data);
    });
    parseData(shareDataPath, (data) => {
      setShareData(data);
    });
  }, []);

  return (
    <Box>
      <Center>
        <VStack>
          <Heading textDecoration='underline' py='5'>
            Your Performance
          </Heading>
          <Text align='center'>
            Maximize your revenue from every interaction with machine learning
            insights.
          </Text>
        </VStack>
      </Center>
      <Flex
        my='5'
        align={{ base: 'start', md: 'center' }}
        justifyContent='space-between'
        direction={{ base: 'column', md: 'row' }}>
        <Flex mt='2'>
          <Select variant='outline' placeholder='Period' mr='2' w='40' />
          <Select variant='outline' placeholder='Measure' w='40' />
        </Flex>
        <Flex align='center' mt='2'>
          <Text color='gray.400'>Updated: 12:09</Text>
          <Button variant='ghost' mx='5'>
            <Icon as={FiDownload} color='brand.300' w={6} h={6} />
          </Button>
        </Flex>
      </Flex>

      <Box mt='8'>
        <Heading fontSize='2xl' textTransform='uppercase'>
          Sales performance
        </Heading>
        <Flex
          mt='2'
          borderRadius='lg'
          //   bg='gray.50'
          border='1px solid #ddd'
          p='4'
          w='full'
          overflow='auto'>
          <Box flex='1' minH='300px' mr='2' my='5' bg='white' pt='8'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='Quarter' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type='monotone'
                  dataKey='Michael Sales (£)'
                  stroke={strokeColors[0]}
                />
                <Line
                  type='monotone'
                  dataKey='Michael Sales (DoT)'
                  stroke={strokeColors[1]}
                />
                <Line
                  type='monotone'
                  dataKey='Michael Predicted Sales (£)'
                  stroke={strokeColors[2]}
                />
                <Line
                  type='monotone'
                  dataKey='Michael Predicted Sales (DoT)'
                  stroke={strokeColors[3]}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          <Box flex='1' minH='300px' ml='2' my='5' bg='white' pt='8'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={regionalSalesData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='Quarter' />
                <YAxis />
                <Tooltip />
                <Legend />
                {regionsDoT.map((region, i) => (
                  <Bar dataKey={region} fill={strokeColors[i]} key={region} />
                ))}
                {/* <Line
                  type='monotone'
                  dataKey='Total Sales (DoT)'
                  stroke='#ab1a34'
                />
                <Line
                  type='monotone'
                  dataKey='Total Sales (£)'
                  stroke='#82caff'
                /> */}
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Flex>
      </Box>
      <Box my='8'>
        <Heading fontSize='2xl' textTransform='uppercase'>
          Adherence
        </Heading>
        <Flex
          mt='2'
          borderRadius='lg'
          //   bg='gray.100'
          border='1px solid #ddd'
          p='4'
          w='full'
          overflow='auto'>
          <Box flex='1' minH='300px' mr='2' my='5' bg='white' pt='8'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={adherenceData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='Quarter' />
                <YAxis />
                <Tooltip />
                <Legend />
                {adheranceBars.map((item, i) => (
                  <Bar dataKey={item} fill={strokeColors[i]} key={item} />
                ))}
              </BarChart>
            </ResponsiveContainer>
            <Text color={strokeColors[0]} textAlign='center'>
              Adherence comparism between Micheal and other reps from Q1-2016 to
              Q2-2018
            </Text>
          </Box>
          <Box flex='1' minH='300px' ml='2' my='5' bg='white' pt='8'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={outData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='Quarter' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type='monotone'
                  dataKey='% Calls on Target'
                  stroke={strokeColors[0]}
                />
                <Line
                  type='monotone'
                  dataKey='% Emails on Target'
                  stroke={strokeColors[1]}
                />
                <Line
                  type='monotone'
                  dataKey='% Visits on Target'
                  stroke={strokeColors[2]}
                />
              </LineChart>
            </ResponsiveContainer>
            <Text color={strokeColors[0]} textAlign='center'>
              Distribution of percentage of calls, emails and visits from
              Q1-2016 to Q2-2018
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box my='8'>
        <Heading fontSize='2xl' textTransform='uppercase'>
          suggestions
        </Heading>
        <Flex
          mt='2'
          borderRadius='lg'
          //   bg='gray.100'
          border='1px solid #ddd'
          p='4'
          w='full'
          overflow='auto'>
          <Box flex='1' minH='300px' mr='2' my='5' bg='white' pt='8'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={outData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='Quarter' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='% Calls on Target' fill={strokeColors[0]} />
                <Bar dataKey='% Emails on Target' fill={strokeColors[1]} />
                <Bar dataKey='% Visits on Target' fill={strokeColors[2]} />
              </BarChart>
            </ResponsiveContainer>
            <Text color={strokeColors[0]} textAlign='center'>
              Distribution of percentage of calls, emails and visits from
              Q1-2016 to Q2-2018
            </Text>
          </Box>
          <Box flex='1' minH='300px' ml='2' my='5' bg='white' pt='8'>
            <ResponsiveContainer width='100%' height='100%'>
              <Sankey
                data={{
                  nodes: [
                    {
                      name: 'High',
                    },
                    {
                      name: 'Mid',
                    },
                    {
                      name: 'Low',
                    },
                    {
                      name: 'Complete',
                    },
                    {
                      name: 'Incomplete',
                    },
                    {
                      name: 'Dismissed',
                    },
                  ],

                  links: [
                    {
                      source: 0,
                      target: 3,
                      value: totalKeys(
                        outData,
                        'Complete high priority suggestions'
                      ),
                    },
                    {
                      source: 0,
                      target: 4,
                      value: totalKeys(
                        outData,
                        'Outstanding high priority suggestions'
                      ),
                    },
                    {
                      source: 0,
                      target: 5,
                      value: totalKeys(
                        outData,
                        'Dismissed high priority suggestions'
                      ),
                    },
                    {
                      source: 1,
                      target: 3,
                      value: totalKeys(
                        outData,
                        'Complete mid priority suggestions'
                      ),
                    },
                    {
                      source: 1,
                      target: 4,
                      value: totalKeys(
                        outData,
                        'Outstanding mid priority suggestions'
                      ),
                    },
                    {
                      source: 1,
                      target: 5,
                      value: totalKeys(
                        outData,
                        'Dismissed mid priority suggestions'
                      ),
                    },
                    {
                      source: 2,
                      target: 3,
                      value: totalKeys(
                        outData,
                        'Complete low priority suggestions'
                      ),
                    },
                    {
                      source: 2,
                      target: 4,
                      value: totalKeys(
                        outData,
                        'Outstanding low priority suggestions'
                      ),
                    },
                    {
                      source: 2,
                      target: 5,
                      value: totalKeys(
                        outData,
                        'Dimissed low priority suggestions'
                      ),
                    },
                  ],
                }}
                link={{ stroke: strokeColors[0] }}>
                <Tooltip />
              </Sankey>
            </ResponsiveContainer>
            <Text color={strokeColors[0]} textAlign='center'>
              Sankey representation of priority suggestions from Q1-2016 to
              Q2-2018
            </Text>
          </Box>
        </Flex>
      </Box>

      <Box>
        <Heading fontSize='2xl' textTransform='uppercase'>
          Market share
        </Heading>
        <Flex
          mt='2'
          borderRadius='lg'
          //   bg='gray.100'
          border='1px solid #ddd'
          p='4'
          w='full'
          overflow='auto'>
          <Box flex='1' minH='300px' mr='2' my='5' bg='white' pt='8'>
            <ResponsiveContainer width='100%' height='100%'>
              <ComposedChart data={shareData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='Quarter' />
                <YAxis />
                <Tooltip />
                <Legend />
                {drugsValues.map((item, i) => (
                  <Bar dataKey={item} fill={strokeColors[i]} key={item} />
                ))}
              </ComposedChart>
            </ResponsiveContainer>
            <Text color={strokeColors[0]} textAlign='center'>
              Market share value of Anatoxidone and others drugs from Q1-2016 to
              Q1-2019
            </Text>
          </Box>
          <Box flex='1' minH='300px' ml='2' my='5' bg='white' pt='8'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={shareData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='Quarter' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type='monotone'
                  dataKey='Actual Anatoxidone (National) %'
                  stroke={strokeColors[0]}
                />
                {/* <Line
                  type='monotone'
                  dataKey='Predicted Anatoxidone (North West) %'
                  stroke={strokeColors[1]}
                /> */}
              </LineChart>
            </ResponsiveContainer>
            <Text color={strokeColors[0]} textAlign='center'>
              Market share percentage of Anatoxidone from Q1-2016 to Q1-2019
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default ReportsPage;
