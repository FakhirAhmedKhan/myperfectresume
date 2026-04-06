import React from "react";

const ContactItem = ({ icon, text }) => (
    <div className="flex items-center gap-2">
        <span className="text-gray-900 shrink-0">{icon}</span>
        <span>{text}</span>
    </div>
);

export default ContactItem;
