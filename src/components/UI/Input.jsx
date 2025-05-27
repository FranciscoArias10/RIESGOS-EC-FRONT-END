import React from "react";

export default function Input(props) {
    return (
    <input
    className="rounded-full p-2 bg-gray-200 text-gray-700 placeholder-gray-500"
    {...props}
    />
    );
}
