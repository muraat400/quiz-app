export function logError(error: Error, info?: unknown) {
  // In real apps, send to external logging service like Sentry
  console.error('🚨 Error Logged:', { error, info });
}