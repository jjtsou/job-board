# Job Board Stress Testing

This directory contains k6 performance and stress testing scripts for the job board application.

## Prerequisites

1. Install k6:

   ```bash
   # macOS
   brew install k6
   
   # Or download from https://k6.io/docs/get-started/installation/
   ```

2. Start the job board application:

   ```bash
   cd ../
   npm run dev
   ```

## Test Scripts

### 1. Stress Test (`stress-test.js`)

Tests application under heavy load:

- Ramps up to 100 users over 2 minutes
- Maintains load for 5 minutes
- Ramps down over 2 minutes

### 2. Spike Test (`spike-test.js`)

Tests sudden traffic spikes:

- Sudden spike to 200 users
- Tests system recovery

## Running Tests

```bash
# Using k6 directly
k6 run stress-test.js
k6 run spike-test.js

# Using npm scripts
npm run test:stress
npm run test:spike
```

## Test Configuration

All tests are configured to run against `http://localhost:3000` by default

## Performance Thresholds

Tests focus on application stability rather than response times (since API is external):

- Error rate should be less than 1-5% depending on test type
- Application should handle concurrent users without crashes
- All functional checks should pass (homepage, search, pagination)

## Interpreting Results

k6 will provide detailed metrics including:

- Request rate (requests/second)
- Response times (for monitoring only - not performance criteria)
- Error rate (main success metric)
- Data transfer rates

Look for:

- ✅ All thresholds passed (error rates within limits)
- 📊 Low error rates across all scenarios
- ⚠️ Application crashes or failed requests
- 📈 Consistent functionality under load

Response times will vary based on external API performance.
