import { describe, it, expect, vi } from 'vitest';

// Mock DOMPurify for unit tests
vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn((html) => html), // pass-through in tests
  },
}));

import { sanitizeAIResponse, isNonEmpty, isValidApiKeyFormat } from './sanitize';

describe('sanitizeAIResponse', () => {
  it('converts **bold** markdown to <strong> tags', () => {
    const result = sanitizeAIResponse('This is **bold** text');
    expect(result).toContain('<strong>bold</strong>');
  });

  it('converts *italic* markdown to <em> tags', () => {
    const result = sanitizeAIResponse('This is *italic* text');
    expect(result).toContain('<em>italic</em>');
  });

  it('converts newlines to <br/> tags', () => {
    const result = sanitizeAIResponse('Line one\nLine two');
    expect(result).toContain('<br/>');
  });

  it('returns empty string for null input', () => {
    expect(sanitizeAIResponse(null)).toBe('');
  });

  it('returns empty string for undefined input', () => {
    expect(sanitizeAIResponse(undefined)).toBe('');
  });

  it('returns empty string for non-string input', () => {
    expect(sanitizeAIResponse(123)).toBe('');
  });

  it('handles empty string input', () => {
    expect(sanitizeAIResponse('')).toBe('');
  });

  it('handles plain text without markdown', () => {
    const result = sanitizeAIResponse('Plain text');
    expect(result).toBe('Plain text');
  });
});

describe('isNonEmpty', () => {
  it('returns true for non-empty string', () => {
    expect(isNonEmpty('hello')).toBe(true);
  });

  it('returns false for empty string', () => {
    expect(isNonEmpty('')).toBe(false);
  });

  it('returns false for whitespace-only string', () => {
    expect(isNonEmpty('   ')).toBe(false);
  });

  it('returns false for null', () => {
    expect(isNonEmpty(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isNonEmpty(undefined)).toBe(false);
  });

  it('returns false for number', () => {
    expect(isNonEmpty(42)).toBe(false);
  });
});

describe('isValidApiKeyFormat', () => {
  it('returns true for a valid-length key', () => {
    expect(isValidApiKeyFormat('AIzaSyABCDEFGHIJ')).toBe(true);
  });

  it('returns false for a short key', () => {
    expect(isValidApiKeyFormat('short')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isValidApiKeyFormat('')).toBe(false);
  });

  it('returns false for null', () => {
    expect(isValidApiKeyFormat(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isValidApiKeyFormat(undefined)).toBe(false);
  });

  it('trims whitespace before checking length', () => {
    expect(isValidApiKeyFormat('   short   ')).toBe(false);
  });
});
