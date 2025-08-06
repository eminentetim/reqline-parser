const axios = require('axios');
const { parseReqline } = require('../utils/parser');
const { validateReqline } = require('../validators/reqline.validator');

exports.parseAndExecuteReqline = async (reqline) => {
  // Validate and parse
  const parsed = parseReqline(reqline);
  validateReqline(parsed);

  // Prepare request
  const config = {
    method: parsed.method,
    url: parsed.full_url,
    headers: parsed.headers,
    data: parsed.body
  };

  // Execute and time the request
  const startTime = Date.now();
  const response = await axios(config);
  const endTime = Date.now();

  return {
    request: {
      query: parsed.query,
      body: parsed.body,
      headers: parsed.headers,
      full_url: parsed.full_url
    },
    response: {
      http_status: response.status,
      duration: endTime - startTime,
      request_start_timestamp: startTime,
      request_stop_timestamp: endTime,
      response_data: response.data
    }
  };
};