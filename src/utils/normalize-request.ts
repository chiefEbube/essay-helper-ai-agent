/**
 * Normalizes message parts by flattening nested data arrays
 * Converts parts like {kind: "data", data: [...]} into simple text parts
 * 
 * This handles the case where Telex sends nested data structures:
 * {
 *   "kind": "data",
 *   "data": [{"kind": "text", "text": "..."}, ...]
 * }
 * 
 * And converts them to the format Mastra expects:
 * {
 *   "kind": "text",
 *   "text": "..."
 * }
 */
export function normalizeMessageParts(parts: any[]): any[] {
  if (!Array.isArray(parts)) {
    return [];
  }

  const normalizedParts: any[] = [];
  
  for (const part of parts) {
    if (!part || typeof part !== 'object') {
      continue;
    }

    // Simple text part - keep as is
    if (part.kind === 'text' && typeof part.text === 'string') {
      normalizedParts.push({
        kind: 'text',
        text: part.text,
      });
    } 
    // Nested data array - extract text from each item
    else if (part.kind === 'data' && Array.isArray(part.data)) {
      for (const dataItem of part.data) {
        if (dataItem && typeof dataItem === 'object') {
          // If the data item has text directly
          if (typeof dataItem.text === 'string') {
            normalizedParts.push({
              kind: 'text',
              text: dataItem.text,
            });
          }
          // If the data item has nested structure with kind: "text"
          else if (dataItem.kind === 'text' && typeof dataItem.text === 'string') {
            normalizedParts.push({
              kind: 'text',
              text: dataItem.text,
            });
          }
        }
      }
    } 
    // Fallback: if it has text property, create a text part
    else if (typeof part.text === 'string' && part.text.trim()) {
      normalizedParts.push({
        kind: 'text',
        text: part.text,
      });
    }
  }
  
  return normalizedParts;
}

/**
 * Normalizes the entire message object
 */
export function normalizeMessage(message: any): any {
  if (!message || typeof message !== 'object') {
    return message;
  }
  
  // If message has parts, normalize them
  if (Array.isArray(message.parts)) {
    return {
      ...message,
      parts: normalizeMessageParts(message.parts),
    };
  }
  
  return message;
}

/**
 * Normalizes a JSON-RPC request body
 * Handles requests with nested data structures in message parts
 */
export function normalizeA2ARequest(body: any): any {
  if (!body || typeof body !== 'object') {
    return body;
  }

  // Normalize the message if it exists in params
  if (body.params?.message) {
    return {
      ...body,
      params: {
        ...body.params,
        message: normalizeMessage(body.params.message),
      },
    };
  }

  return body;
}

