import { normalizeA2ARequest } from '../../utils/normalize-request';

/**
 * Express-style middleware to normalize A2A requests
 * This should be applied before Mastra processes the request
 */
export function normalizeRequestMiddleware(req: any, res: any, next: any) {
  try {
    // Normalize the request body if it exists
    if (req.body) {
      req.body = normalizeA2ARequest(req.body);
    }
    next();
  } catch (error) {
    console.error('Error normalizing A2A request:', error);
    next(error);
  }
}

/**
 * Hono-style middleware for request normalization
 */
export function normalizeRequestHonoMiddleware(c: any, next: any) {
  try {
    // Get the request body
    const body = c.req.valid('json') || c.req.json();
    
    if (body) {
      // Normalize the body
      const normalized = normalizeA2ARequest(body);
      // Update the context with normalized body
      c.req.addValidatedData('json', normalized);
    }
    
    return next();
  } catch (error) {
    console.error('Error normalizing A2A request:', error);
    return c.json({ error: 'Failed to normalize request' }, 500);
  }
}

