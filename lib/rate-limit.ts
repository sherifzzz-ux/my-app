/**
 * Rate Limiting Utilities
 * Simple in-memory rate limiting for API routes
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

/**
 * Rate limit configuration
 */
export const rateLimitConfig = {
  // Checkout: 5 attempts per minute
  checkout: {
    maxAttempts: 5,
    windowMs: 60 * 1000, // 1 minute
  },
  // Payment session: 10 attempts per minute
  payment: {
    maxAttempts: 10,
    windowMs: 60 * 1000, // 1 minute
  },
  // API calls: 100 requests per minute
  api: {
    maxAttempts: 100,
    windowMs: 60 * 1000, // 1 minute
  },
}

/**
 * Check rate limit
 */
export function checkRateLimit(
  identifier: string,
  maxAttempts: number = 10,
  windowMs: number = 60 * 1000
): { success: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const key = identifier

  // Get or create entry
  let entry = rateLimitMap.get(key)

  // Reset if window expired
  if (!entry || entry.resetAt < now) {
    entry = {
      count: 0,
      resetAt: now + windowMs,
    }
  }

  // Increment count
  entry.count++
  rateLimitMap.set(key, entry)

  // Check limit
  const success = entry.count <= maxAttempts
  const remaining = Math.max(0, maxAttempts - entry.count)

  return {
    success,
    remaining,
    resetAt: entry.resetAt,
  }
}

/**
 * Reset rate limit for an identifier
 */
export function resetRateLimit(identifier: string): void {
  rateLimitMap.delete(identifier)
}

/**
 * Clean up expired entries (call periodically)
 */
export function cleanupRateLimits(): void {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap.entries()) {
    if (entry.resetAt < now) {
      rateLimitMap.delete(key)
    }
  }
}

/**
 * Get rate limit identifier from request
 */
export function getRateLimitIdentifier(req: Request): string {
  // Try to get IP from headers
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
  
  return ip
}

// Cleanup expired entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimits, 5 * 60 * 1000)
}
