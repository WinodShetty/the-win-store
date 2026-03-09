// 🔒 Secret key
const SECRET_KEY = "THE_WIN_PRIVATE_SECRET_2026";

// 🔐 Simple deterministic token (No crypto.subtle)
function generateSimpleHash(str) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return Math.abs(hash).toString(16);
}

// 🎟 Generate secure token
export async function generateAccessToken(productId, language) {
  const raw = `${productId}::${language}::${SECRET_KEY}`;
  return generateSimpleHash(raw);
}

// ✅ Validate token
export async function validateAccessToken(productId, language, token) {
  if (!productId || !language || !token) return false;

  const expected = await generateAccessToken(productId, language);

  return expected === token;
}