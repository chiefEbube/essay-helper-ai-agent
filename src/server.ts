import { mastra } from './mastra/index';
import { normalizeA2ARequest } from './utils/normalize-request';

/**
 * Custom server setup that normalizes requests before Mastra processes them.
 * 
 * Since Mastra handles routing automatically, we need to intercept requests
 * at the server level. This approach uses Mastra's built-in server but adds
 * normalization middleware.
 * 
 * Note: This may need to be adjusted based on Mastra's internal server implementation.
 */

// Get Mastra's server instance (if exposed)
// This is a placeholder - you may need to adjust based on Mastra's API
const server = mastra as any;

// If Mastra uses Hono internally, we can add middleware
// If it uses Express, we'd use Express middleware instead
// This is a conceptual implementation - adjust based on Mastra's actual server type

export function setupNormalization() {
  // This is a conceptual example - the actual implementation depends on
  // how Mastra exposes its server/router
  
  console.log('Request normalization middleware configured');
  
  return {
    normalize: normalizeA2ARequest,
  };
}

export default mastra;

