exports.parseReqline = (reqline) => {
  const parts = reqline.split(' | ');
  const result = {
    method: null,
    url: null,
    headers: {},
    query: {},
    body: {}
  };

  for (const part of parts) {
    const [keyword, ...valueParts] = part.split(' ');
    const value = valueParts.join(' ');

    switch (keyword) {
      case 'HTTP':
        result.method = value;
        break;
      case 'URL':
        result.url = value;
        break;
      case 'HEADERS':
        result.headers = parseJson(value, 'HEADERS');
        break;
      case 'QUERY':
        result.query = parseJson(value, 'QUERY');
        break;
      case 'BODY':
        result.body = parseJson(value, 'BODY');
        break;
      default:
        throw new Error(`Unknown keyword: ${keyword}`);
    }
  }

  // Build full URL with query params
  result.full_url = result.url;
  if (Object.keys(result.query).length > 0) {
    const queryString = new URLSearchParams(result.query).toString();
    result.full_url += `?${queryString}`;
  }

  return result;
};

function parseJson(jsonString, section) {
  try {
    return jsonString ? JSON.parse(jsonString) : {};
  } catch (e) {
    throw new Error(`Invalid JSON format in ${section} section`);
  }
}