import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML string to prevent XSS attacks.
 * Converts basic markdown (bold, italic, newlines) to safe HTML.
 * @param {string} rawText - Raw text from AI response
 * @returns {string} Sanitized HTML string
 */
export const sanitizeAIResponse = (rawText) => {
  if (!rawText || typeof rawText !== 'string') return '';

  const formatted = rawText
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');

  return DOMPurify.sanitize(formatted, {
    ALLOWED_TAGS: ['strong', 'em', 'br', 'p', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
  });
};

/**
 * Validates that a string is a non-empty, trimmed value.
 * @param {string} value
 * @returns {boolean}
 */
export const isNonEmpty = (value) =>
  typeof value === 'string' && value.trim().length > 0;

/**
 * Validates a basic API key format (starts with letters, min 10 chars).
 * @param {string} key
 * @returns {boolean}
 */
export const isValidApiKeyFormat = (key) =>
  typeof key === 'string' && key.trim().length >= 10;
