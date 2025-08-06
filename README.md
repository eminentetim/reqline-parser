# ReqLine Parser - HTTP Request Builder

## Overview

ReqLine is a simple parser for a curl-like tool that converts a structured text format into executable HTTP requests. It follows strict syntax rules to ensure consistent request building and provides detailed response metrics.

## Features

- **Simple Syntax**: Easy-to-read pipe-delimited format
- **Flexible Requests**: Supports GET/POST methods with headers, query params, and body
- **Detailed Metrics**: Returns timing information and full request/response data
- **Error Handling**: Comprehensive validation with clear error messages

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/eminentetim/reqline-parser.git
   cd reqline-parser
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

## Syntax

```
HTTP [method] | URL [URL value] | HEADERS [header json value] | QUERY [query value json] | BODY [body value json]
```

### Rules:
- All keywords must be UPPERCASE
- Single pipe (`|`) delimiter with exactly one space on each side
- HTTP methods: Only GET or POST (uppercase)
- HTTP and URL are required and must appear first
- Other sections (HEADERS, QUERY, BODY) are optional and can be in any order

### Examples:

Simple GET request:
```
HTTP GET | URL https://dummyjson.com/quotes/3
```

GET with query parameters:
```
HTTP GET | URL https://dummyjson.com/quotes/3 | QUERY {"refid": 1920933}
```

POST with headers and body:
```
HTTP POST | URL https://dummyjson.com/products/add | HEADERS {"Content-Type": "application/json"} | BODY {"title": "New Product"}
```

## API Usage

Send a POST request to the root endpoint (`/`) with a JSON body containing the reqline string:

```json
{
  "reqline": "HTTP GET | URL https://dummyjson.com/quotes/3 | QUERY {\"refid\": 1920933}"
}
```

### Successful Response (200)

```json
{
  "request": {
    "query": {"refid": 1920933},
    "body": {},
    "headers": {},
    "full_url": "https://dummyjson.com/quotes/3?refid=1920933"
  },
  "response": {
    "http_status": 200,
    "duration": 347,
    "request_start_timestamp": 1691234567890,
    "request_stop_timestamp": 1691234568237,
    "response_data": {
      "id": 3,
      "quote": "Thinking is the capital, Enterprise is the way, Hard Work is the solution.",
      "author": "Abdul Kalam"
    }
  }
}
```

### Error Response (400)

```json
{
  "error": true,
  "message": "Specific reason for the error"
}
```

## Error Messages

The parser provides specific error messages including:
- Missing required HTTP or URL keywords
- Invalid HTTP methods
- Malformed JSON in HEADERS/QUERY/BODY sections
- Incorrect spacing around delimiters
- Uppercase keyword violations
- Invalid URL format

## Project Structure

```
/src
  /controllers        # Route handlers
  /services           # Business logic
  /utils              # Helper functions
  /validators         # Validation logic
app.js                # Main application
package.json
```

## Dependencies

- Express.js (web framework)
- Axios (HTTP client)
- Body-parser (request body parsing)

## Development

To run in development mode with hot-reloading:
```bash
npm run dev
```

To run tests:
```bash
npm test
```

## Deployment

The application is ready to deploy to any Node.js hosting platform Render.



## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
