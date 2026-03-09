// src/modules/ebook-engine/reader/EbookReader.jsx

import React, { useEffect, useState } from "react";

export default function EbookReader({ productId, language }) {
  const [BookComponent, setBookComponent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBook() {
      try {
        const module = await import(
          `../registry/books/${productId}/${language}.jsx`
        );
        setBookComponent(() => module.default);
      } catch (error) {
        console.error("Book not found:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [productId, language]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        Loading Your Private eBook...
      </div>
    );
  }

  if (!BookComponent) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        Book not available.
      </div>
    );
  }

  return <BookComponent />;
}