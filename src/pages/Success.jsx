import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export const Success = () => {

const location = useLocation();

const links = location.state?.links || window.history.state?.links || [];

const [showWhatsappInput, setShowWhatsappInput] = useState(false);
const [showEmailInput, setShowEmailInput] = useState(false);

const [whatsappNumber, setWhatsappNumber] = useState("");
const [emailAddress, setEmailAddress] = useState("");

if (!links.length) {
return (
<div className="min-h-screen flex items-center justify-center bg-black text-white">
<h1 className="text-2xl font-bold">No Purchase Found</h1>
</div>
);
}

/* ================================
Build Message Text
================================= */

const messageText = links
.map(
(item) =>
"${item.title} (${item.language})\n${item.url}"
)
.join("\n\n");

/* ================================
WhatsApp Share
================================= */

const sendToWhatsApp = () => {

if (!whatsappNumber) {
  alert("Please enter WhatsApp number");
  return;
}

const encodedMessage = encodeURIComponent(
  `Your purchased book links:\n\n${messageText}`
);

const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

window.open(url, "_blank");

};

/* ================================
Email Share
================================= */

const sendToEmail = () => {

if (!emailAddress) {
  alert("Please enter email address");
  return;
}

const subject = encodeURIComponent("Your Purchased Book Links");

const body = encodeURIComponent(
  `Here are your purchased books:\n\n${messageText}`
);

const mailUrl = `mailto:${emailAddress}?subject=${subject}&body=${body}`;

window.location.href = mailUrl;

};

return (
<div className="min-h-screen bg-black text-white flex items-center justify-center p-6">

  <div className="max-w-2xl w-full bg-[#0A0A0A] p-10 rounded-3xl border border-white/10 space-y-8">

    <h1 className="text-3xl font-black text-emerald-400">
      🎉 Payment Successful
    </h1>

    {/* Purchased Books */}

    {links.map((item, index) => (
      <div
        key={index}
        className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4"
      >

        <h2 className="text-xl font-bold">
          {item.title} ({item.language})
        </h2>

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-500 px-4 py-2 rounded-xl font-bold inline-block"
        >
          Open Book
        </a>

      </div>
    ))}

    {/* Share Section */}

    <div className="pt-6 border-t border-white/10 space-y-4">

      <h3 className="text-lg font-bold">
        Share your book links
      </h3>

      <div className="flex gap-4">

        <button
          onClick={() => {
            setShowWhatsappInput(true);
            setShowEmailInput(false);
          }}
          className="bg-green-500 px-4 py-2 rounded-xl font-bold"
        >
          Share to WhatsApp
        </button>

        <button
          onClick={() => {
            setShowEmailInput(true);
            setShowWhatsappInput(false);
          }}
          className="bg-blue-500 px-4 py-2 rounded-xl font-bold"
        >
          Share to Email
        </button>

      </div>

      {/* WhatsApp Input */}

      {showWhatsappInput && (
        <div className="space-y-3">

          <input
            type="text"
            placeholder="Enter WhatsApp number (91XXXXXXXXXX)"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            className="w-full bg-black border border-white/20 p-3 rounded-xl"
          />

          <button
            onClick={sendToWhatsApp}
            className="bg-green-600 px-4 py-2 rounded-xl font-bold"
          >
            Send to WhatsApp
          </button>

        </div>
      )}

      {/* Email Input */}

      {showEmailInput && (
        <div className="space-y-3">

          <input
            type="email"
            placeholder="Enter email address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="w-full bg-black border border-white/20 p-3 rounded-xl"
          />

          <button
            onClick={sendToEmail}
            className="bg-blue-600 px-4 py-2 rounded-xl font-bold"
          >
            Send Email
          </button>

        </div>
      )}

    </div>

  </div>

</div>

);

};