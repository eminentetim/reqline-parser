exports.validateReqline = (parsed, originalString) => {
  // Required fields
  if (!parsed.method) {
    throw new Error('Missing required HTTP keyword');
  }
  if (!parsed.url) {
    throw new Error('Missing required URL keyword');
  }

  // HTTP method validation
  if (!['GET', 'POST'].includes(parsed.method)) {
    throw new Error('Invalid HTTP method. Only GET and POST are supported');
  }
  if (parsed.method !== 'GET' && parsed.method !== 'POST') {
    throw new Error('HTTP method must be uppercase');
  }

  // URL validation
  try {
    new URL(parsed.url);
  } catch (e) {
    throw new Error('Invalid URL format');
  }

  // Validate original string format
  if (originalString) {
    // Check pipe delimiter spacing
    if (originalString.includes('|  ') || originalString.includes('  |')) {
      throw new Error('Invalid spacing around pipe delimiter');
    }
    if (!originalString.includes(' | ')) {
      throw new Error('Missing space around pipe delimiter');
    }

    // Check keyword spacing
    const parts = originalString.split(' | ');
    for (const part of parts) {
      const [keyword, ...rest] = part.split(' ');
      
      // Validate keyword case
      if (keyword !== keyword.toUpperCase()) {
        throw new Error('Keywords must be uppercase');
      }
      
      // Validate space after keyword
      if (part !== `${keyword} ${rest.join(' ')}`.trim()) {
        throw new Error('Missing space after keyword');
      }
      
      // Validate no multiple spaces
      if (part.split(' ').some(s => s === '')) {
        throw new Error('Multiple spaces found where single space expected');
      }
    }
  }

  // Validate JSON structures
  if (typeof parsed.headers !== 'object') {
    throw new Error('Invalid JSON format in HEADERS section');
  }
  if (typeof parsed.query !== 'object') {
    throw new Error('Invalid JSON format in QUERY section');
  }
  if (typeof parsed.body !== 'object') {
    throw new Error('Invalid JSON format in BODY section');
  }
};