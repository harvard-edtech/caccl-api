// Import CSV parser
import csv from '@fast-csv/parse';

/**
 * Parse a CSV string
 * @author Gabe Abrams
 * @param csvString The CSV string to parse
 * @returns an array of objects representing the parsed CSV data
 */
const parseCSV = async (csvString: string): Promise<{
  headers: string[],
  rows: string[][],
}> => {
  const allRows: string[][] = await (new Promise((resolve, reject) => {
    const rows: string[][] = [];
    csv
      .parseString(csvString, { headers: false })
      .on('error', (error) => {
        reject(new Error(`Failed to parse CSV: ${error.message}`));
      })
      .on('data', (singleRow) => {
        rows.push(singleRow);
      })
      .on('end', () => {
        resolve(rows);
      });
  }));

  if (allRows.length === 0) {
    return {
      headers: [],
      rows: [],
    };
  }
  if (allRows.length === 1) {
    return {
      headers: allRows[0],
      rows: [],
    };
  }
  const [headers, ...rows] = allRows;
  return {
    headers,
    rows,
  };
};

export default parseCSV;
