import React from "react";

export default function WatermarkOverlay() {

  const watermarkText = `
Purchased Copy
${navigator.userAgent.slice(0,20)}
${new Date().toLocaleString()}
`;

  return (
    <div
      className="
      pointer-events-none
      fixed
      inset-0
      flex
      items-center
      justify-center
      opacity-10
      text-4xl
      font-bold
      text-black
      rotate-[-30deg]
      select-none
      "
    >
      {watermarkText}
    </div>
  );

}