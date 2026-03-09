import React from "react";
import LuxuryFlipBook from "../ui/LuxuryFlipBook";

export default function BookReader({ bookId, language }) {

  const pages = [

    () => <img src={`/ebooks/${bookId}/${language}/cover.jpg`} className="w-full h-full object-contain" />,
    () => <img src={`/ebooks/${bookId}/${language}/index.jpg`} className="w-full h-full object-contain" />,

    () => <img src={`/ebooks/${bookId}/${language}/chapter-1.jpg`} className="w-full h-full object-contain" />,
    () => <img src={`/ebooks/${bookId}/${language}/chapter-2.jpg`} className="w-full h-full object-contain" />,
    () => <img src={`/ebooks/${bookId}/${language}/chapter-3.jpg`} className="w-full h-full object-contain" />,
    () => <img src={`/ebooks/${bookId}/${language}/chapter-4.jpg`} className="w-full h-full object-contain" />,
    () => <img src={`/ebooks/${bookId}/${language}/chapter-5.jpg`} className="w-full h-full object-contain" />,
    () => <img src={`/ebooks/${bookId}/${language}/chapter-6.jpg`} className="w-full h-full object-contain" />,
    () => <img src={`/ebooks/${bookId}/${language}/chapter-7.jpg`} className="w-full h-full object-contain" />,
    () => <img src={`/ebooks/${bookId}/${language}/chapter-8.jpg`} className="w-full h-full object-contain" />,
    () => <img src={`/ebooks/${bookId}/${language}/chapter-9.jpg`} className="w-full h-full object-contain" />,
    () => <img src={`/ebooks/${bookId}/${language}/chapter-10.jpg`} className="w-full h-full object-contain" />,
    () => <img src={`/ebooks/${bookId}/${language}/chapter-11.jpg`} className="w-full h-full object-contain" />

  ];

  return <LuxuryFlipBook pages={pages} />;

}