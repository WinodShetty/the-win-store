import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { BOOK_REGISTRY } from "../modules/ebook-engine/registry/booksRegistry";
import WatermarkOverlay from "../modules/ebook-engine/ui/WatermarkOverlay";

const WORKER_URL = "import.meta.env.VITE_WORKER_URL";

export default function EbookGate() {

  const { productId, language } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [Component, setComponent] = useState(null);

  /* ===============================
     Anti Copy Protection
  =============================== */

  useEffect(() => {

    const prevent = (e) => e.preventDefault();

    document.addEventListener("contextmenu", prevent);
    document.addEventListener("copy", prevent);
    document.addEventListener("cut", prevent);
    document.addEventListener("dragstart", prevent);

    return () => {
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("copy", prevent);
      document.removeEventListener("cut", prevent);
      document.removeEventListener("dragstart", prevent);
    };

  }, []);


  /* ===============================
     Validate Access Token
  =============================== */

  useEffect(() => {

    const validateAccess = async () => {

      const token = searchParams.get("access");

      if (!token) {
        navigate("/");
        return;
      }

      if (
        !BOOK_REGISTRY[productId] ||
        !BOOK_REGISTRY[productId].includes(language)
      ) {
        navigate("/");
        return;
      }

      try {

        const response = await fetch(`${WORKER_URL}/validate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId,
            language,
            token
          })
        });

        const data = await response.json();

        if (!data.valid) {
          navigate("/");
          return;
        }

        const module = await import(
          `../modules/ebook-engine/registry/books/${productId}/${language}.jsx`
        );

        setComponent(() => module.default);

      } catch (error) {

        console.error("Validation Error:", error);
        navigate("/");

      }

    };

    validateAccess();

  }, [productId, language, searchParams, navigate]);


  if (!Component) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading Book...
      </div>
    );

  }

  return (
    <>
      <WatermarkOverlay />
      <Component />
    </>
  );

}