// Import csv parser
import Papa from 'papaparse';

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
  // Parse
  const { data: allRows } = Papa.parse(
    csvString.trim(),
    {
      header: false, // We want to treat the first row as headers
      skipEmptyLines: true, // Skip empty lines
      dynamicTyping: false, // Don't automatically convert types
      delimiter: ',', // Specify the delimiter if needed
    },
  );

  // Extract headers and rows
  const headers: string[] = (allRows as string[][])[0] || [];
  const rows: string[][] = (allRows as string[][]).slice(1);

  // Return the headers and rows
  return {
    headers,
    rows,
  };
};

export default parseCSV;
