export const BOOK_REGISTRY = {
  "book-1": ["en", "te", "hi"],
  "book-2": ["en", "te", "hi"],
  "book-3": ["en", "te", "hi"],
  "book-4": ["en", "te", "hi"],
  "book-5": ["en", "te", "hi"],
};

export function isValidBookAccess(productId, language) {
  return (
    BOOK_REGISTRY[productId] &&
    BOOK_REGISTRY[productId].includes(language)
  );
}