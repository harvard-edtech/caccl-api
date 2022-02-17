import APIConfig from './APIConfig';

/**
 * Visit endpoint function type definition
 * @author Gabe Abrams
 */
type VisitEndpointFunc = (
  (
    opts: {
      // Path of the endpoint
      path: string,
      // Method of the request
      method: ('GET' | 'POST' | 'PUT' | 'DELETE'),
      // Human-readable description of the task
      action: string,
      // Parameters/args/body to send with request
      params?: { [k: string]: any },
      // Opts from API caller
      config?: APIConfig,
      // If included, this function is used on each page before it is added to the
      // list of pages
      pagePostProcessor?: (page: any, pageNumber: number) => any,
    },
  ) => Promise<any>
);

export default VisitEndpointFunc;