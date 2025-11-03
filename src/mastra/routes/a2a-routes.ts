import { normalizeA2ARequest } from '../../utils/normalize-request';
import { mastra } from '../index';

/**
 * Custom A2A route handler that normalizes requests before processing
 * 
 * This file creates a wrapper around Mastra's A2A handler that:
 * 1. Intercepts incoming JSON-RPC requests
 * 2. Normalizes message parts with nested data arrays
 * 3. Passes the normalized request to Mastra
 * 
 * Note: This may need to be adjusted based on how Mastra exposes its route handlers.
 */

/**
 * Handle A2A message/send requests with normalization
 */
export async function handleMessageSend(req: any, res: any) {
  try {
    // Normalize the request body
    const normalizedBody = normalizeA2ARequest(req.body || {});
    
    // Update the request with normalized body
    req.body = normalizedBody;
    
    // Log normalization for debugging
    if (normalizedBody !== req.body) {
      console.log('Request normalized:', {
        originalParts: req.body?.params?.message?.parts?.length,
        normalizedParts: normalizedBody?.params?.message?.parts?.length,
      });
    }
    
    // Let Mastra handle the normalized request
    // Note: You'll need to call Mastra's actual handler here
    // This is a placeholder - adjust based on Mastra's API
    
    // For now, return an error indicating the handler needs Mastra integration
    return res.status(500).json({
      error: 'A2A handler needs to be integrated with Mastra\'s actual route handler',
      message: 'See Mastra documentation for how to create custom route handlers',
    });
    
  } catch (error) {
    console.error('Error in A2A message/send handler:', error);
    return res.status(500).json({
      jsonrpc: '2.0',
      id: req.body?.id || null,
      error: {
        code: -32603,
        message: 'Internal error processing request',
        data: { error: String(error) },
      },
    });
  }
}

export default {
  handleMessageSend,
};

