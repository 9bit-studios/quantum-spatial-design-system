/**
 * Authentication service for the 9Bit Studios Cloudflare Worker
 * Handles JWT verification and API key authentication
 */

/**
 * Verify a JWT token
 * @param {string} token - The JWT token to verify
 * @returns {object|null} - The decoded token payload if valid, null otherwise
 */
async function verifyJWT(token) {
  try {
    // Basic token structure verification
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decode the header and payload
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    
    // Check if the token is expired
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      console.log('Token expired');
      return null;
    }

    // Verify the signature (using Web Crypto API)
    const encoder = new TextEncoder();
    const data = encoder.encode(`${parts[0]}.${parts[1]}`);
    const signature = base64UrlToArrayBuffer(parts[2]);
    
    // Get the JWT secret
    const secret = JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET is not defined');
      return null;
    }
    
    // Create a key from the secret
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    // Verify the signature
    const verified = await crypto.subtle.verify(
      'HMAC',
      key,
      signature,
      data
    );
    
    if (!verified) {
      console.log('Invalid signature');
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

/**
 * Verify admin API key
 * @param {string} apiKey - The API key to verify
 * @returns {boolean} - True if valid, false otherwise
 */
function verifyAdminApiKey(apiKey) {
  // Simple comparison with the stored admin API key
  return apiKey === ADMIN_API_KEY;
}

/**
 * Check authorization header and verify credentials
 * @param {Request} request - The incoming request
 * @returns {object|null} - The user object if authenticated, null otherwise
 */
async function authenticate(request) {
  const authHeader = request.headers.get('Authorization');
  
  // Check for Framer-specific headers first
  const framerProjectId = request.headers.get('X-Framer-Project-ID');
  if (framerProjectId) {
    return authenticateFramer(framerProjectId);
  }
  
  // No auth header
  if (!authHeader) {
    return null;
  }
  
  // Check for Bearer token (JWT)
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const payload = await verifyJWT(token);
    
    if (payload) {
      return {
        userId: payload.sub,
        role: payload.role || 'user',
        isAdmin: payload.role === 'admin',
        ...payload
      };
    }
  }
  
  // Check for API key
  if (authHeader.startsWith('ApiKey ')) {
    const apiKey = authHeader.substring(7);
    
    if (verifyAdminApiKey(apiKey)) {
      return {
        role: 'admin',
        isAdmin: true,
        isApiKey: true
      };
    }
  }
  
  return null;
}

/**
 * Authenticate Framer requests
 * @param {string} projectId - Framer project ID
 * @returns {object|null} - The user object if authenticated, null otherwise
 */
function authenticateFramer(projectId) {
  // List of allowed Framer project IDs
  const allowedProjectIds = [
    '2zdSRIm4V5ndhHJ2IUDw' // 9Bit Quantum-Spatial Design System
  ];
  
  if (allowedProjectIds.includes(projectId)) {
    return {
      userId: 'framer-integration',
      role: 'framer',
      isAdmin: false,
      projectId: projectId,
      permissions: ['read:design-system', 'read:components']
    };
  }
  
  return null;
}

/**
 * Generate unauthorized response
 * @returns {Response} - 401 Unauthorized response
 */
function unauthorized() {
  return new Response(
    JSON.stringify({ error: 'Unauthorized' }),
    {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    }
  );
}

/**
 * Generate forbidden response
 * @returns {Response} - 403 Forbidden response
 */
function forbidden() {
  return new Response(
    JSON.stringify({ error: 'Forbidden' }),
    {
      status: 403,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    }
  );
}

/**
 * Check if the request requires authentication
 * @param {string} path - The request path
 * @returns {boolean} - True if authentication is required
 */
function requiresAuth(path) {
  // Public endpoints that don't require authentication
  const publicEndpoints = [
    '/design-system/framer-fetch',
    '/design-system/tokens',
    '/design-system/tokens/public',
    '/health',
    '/quantum-pixel',
    '/dimensional-grid',
    '/framer-components',
    '/pixel-viewer'
  ];
  
  // Public endpoint prefixes
  const publicPrefixes = [
    '/design-system/view/',
    '/design-system/components/'
  ];
  
  // Check if the path matches a public endpoint
  if (publicEndpoints.includes(path)) {
    return false;
  }
  
  // Check if the path starts with a public prefix
  for (const prefix of publicPrefixes) {
    if (path.startsWith(prefix)) {
      return false;
    }
  }
  
  // All other endpoints require authentication
  return true;
}

/**
 * Utility: Convert base64url to ArrayBuffer
 * @param {string} base64url - Base64URL encoded string
 * @returns {ArrayBuffer} - Decoded array buffer
 */
function base64UrlToArrayBuffer(base64url) {
  // Replace URL-safe characters and add padding
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const padLen = 4 - (base64.length % 4);
  const padded = padLen < 4 ? base64 + '='.repeat(padLen) : base64;
  
  // Convert to binary string
  const binary = atob(padded);
  
  // Convert to ArrayBuffer
  const buffer = new ArrayBuffer(binary.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    view[i] = binary.charCodeAt(i);
  }
  
  return buffer;
}

module.exports = {
  authenticate,
  unauthorized,
  forbidden,
  requiresAuth
};