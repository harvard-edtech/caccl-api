/**
 * Configuration for endpoint call
 * @author Gabe Abrams
 */
type APIConfig = {
  // Override for hostname of Canvas
  canvasHost?: string,
  // Override for access token
  accessToken?: string,
  // Override for number of times to retry
  numRetries?: number,
  // Override for number of items per page
  itemsPerPage?: number,
  // Override for maximum number of pages to fetch
  maxPages?: number,
  /**
   * Handler to call when a new page of data returns from Canvas
   * @param page data in the new page
   * @param pageNumber number of the page (starting at 1)
   */
  onNewPage?: (page: any, pageNumber: number) => void,
  // Authenticity token (advanced users only)
  authenticityToken?: string,
  // Path prefix to apply to Canvas API requests
  pathPrefix?: string,
};

export default APIConfig;
