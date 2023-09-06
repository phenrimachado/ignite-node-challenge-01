import { parse } from 'csv-parse';

export async function insertTasksBtCsv(request, response) {
  console.log(request);

  return true;
  // const records = [];

  // const parser = parse({
  //   delimiter: ';'
  // });

  // parser.on('readable', () => {
  //   let record;
  //   while((record = parser.read()) !== null) {
  //     console.log(record);
  //   }
  // })
}