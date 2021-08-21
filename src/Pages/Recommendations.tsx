import * as React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Heading,
  Flex,
  HStack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { readString } from 'react-papaparse';
import { ArrowUpDownIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import recommendationsMichealPath from '../assets/data/recommendationsMichael.csv';
export interface RecommendationsProps {}

const parseCsv = async (csvFile: string, cb: (data: any) => void) => {
  const papaConfig = {
    complete: (data: any) => {
      cb(data.data);
    },
    download: true,
    header: true,
    error: (error: any) => {
      console.log(error);
      cb(null);
    },
  };
  readString(csvFile, papaConfig);
};

const parseData = async (cb: (data: any) => void) => {
  parseCsv(recommendationsMichealPath, cb);
};

interface RecomDataProps {
  Priority: string;
  Contact: string;
  Postcode: string;
  Messaging: string;
  Suggestion: string;
  Reason: string;
  'Target?': string;
  Access: string;
  'Potential revenue': string;
}

const tableKeys = [
  'Priority',
  'Contact',
  'Postcode',
  'Messaging',
  'Suggestion',
  'Reason',
  'Target?',
  'Access',
  'Potential revenue',
];

const sortableKeys = [
  'Priority',
  'Contact',
  'Target?',
  'Access',
  'Potential revenue',
];

const priorityKeys = ['high', 'mid', 'low'];
const targetKeys = ['yes', 'no'];
const accessKeys = ['easy', 'mid', 'hard'];

const sortArrayMap: { [key: string]: string[] } = {
  Priority: priorityKeys,
  'Target?': targetKeys,
  Access: accessKeys,
};
const sortArray = (arr: any[], keys: { [key: string]: any }) => {
  let newArray = [...arr];
  Object.entries(keys).forEach(([key, value]) => {
    if (value === true) {
      newArray.sort((a, b) => {
        const arrForSort = sortArrayMap[key];
        if (arrForSort && arrForSort.includes(a[key].toLowerCase())) {
          return (
            arrForSort.indexOf(a[key].toLowerCase()) -
            arrForSort.indexOf(b[key].toLowerCase())
          );
        }

        if (!isNaN(a[key])) {
          return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
        }
        return a[key].toLowerCase().localeCompare(b[key].toLowerCase());
      });
    } else if (value === false) {
      newArray.sort((a, b) => {
        const arrForSort = sortArrayMap[key];
        if (arrForSort && arrForSort.includes(a[key].toLowerCase())) {
          return (
            arrForSort.indexOf(b[key].toLowerCase()) -
            arrForSort.indexOf(a[key].toLowerCase())
          );
        }

        if (!isNaN(a[key])) {
          return b[key] < a[key] ? -1 : b[key] > a[key] ? 1 : 0;
        }
        return b[key].toLowerCase().localeCompare(a[key].toLowerCase());
      });
    }
  });
  return newArray;
};

const Recommendations: React.FC<RecommendationsProps> = () => {
  const [data, setData] = useState<RecomDataProps[]>([]);
  const [sortKeys, setSortKeys] = useState<{
    [key: string]: boolean | null | undefined;
  }>({});

  useEffect(() => {
    parseData((data) => {
      setData(data);
    });
  }, []);

  const setSortKey = (key: string) => {
    setSortKeys((prev) => {
      let value = prev[key];
      if (value === null || value === undefined) {
        value = true;
      } else if (value === true) {
        value = false;
      } else if (value === false) {
        value = null;
      }
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const getIcon = (value: boolean | null | undefined) => {
    if (value === null || value === undefined) {
      return <ArrowUpDownIcon m={0} />;
    }
    return value ? <ArrowUpIcon /> : <ArrowDownIcon />;
  };

  return (
    <Box>
      <Heading textAlign='center' my={8}>
        Recommendations
      </Heading>

      <Table variant='striped' colorScheme='gray'>
        <TableCaption>Recommendations</TableCaption>
        <Thead>
          <Tr>
            {tableKeys.map((key) => (
              <Th cursor='pointer' onClick={() => setSortKey(key)}>
                <Flex m={0}>
                  <Text userSelect='none' mr='5px'>
                    {key}
                  </Text>
                  {sortableKeys.includes(key) && getIcon(sortKeys[key])}
                </Flex>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {sortArray(data, sortKeys).map((datum) => (
            <Tr>
              <Td textTransform='capitalize'>{datum.Priority}</Td>
              <Td textTransform='capitalize'>{datum.Contact}</Td>
              <Td textTransform='capitalize'>{datum.Postcode}</Td>
              <Td textTransform='capitalize'>{datum.Messaging}</Td>
              <Td textTransform='capitalize'>{datum.Suggestion}</Td>
              <Td textTransform='capitalize'>{datum.Reason}</Td>
              <Td textTransform='capitalize'>{datum['Target?']}</Td>
              <Td textTransform='capitalize'>{datum.Access}</Td>
              <Td>${datum['Potential revenue']}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Recommendations;
