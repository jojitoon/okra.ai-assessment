import { readString } from 'react-papaparse';

export const parseCsv = async (csvFile: string, cb: (data: any) => void) => {
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

export const generateColor = () => {
  var rgb = [];

  for (var i = 0; i < 3; i++) rgb.push(Math.floor(Math.random() * 255));

  return 'rgb(' + rgb.join(',') + ')';
};
