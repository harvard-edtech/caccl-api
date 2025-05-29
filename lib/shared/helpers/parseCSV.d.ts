/**
 * Parse a CSV string
 * @author Gabe Abrams
 * @param csvString The CSV string to parse
 * @returns an array of objects representing the parsed CSV data
 */
declare const parseCSV: (csvString: string) => Promise<{
    headers: string[];
    rows: string[][];
}>;
export default parseCSV;
