import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Trigger Button */}
            <button
                className="chatbot-toggle-btn"
                onClick={() => setIsOpen(true)}
            >
                Open Chatbot
            </button>

            {/* Chatbot Window */}
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <span>Chatbot</span>
                        <button
                            className="close-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            ✖
                        </button>
                    </div>
                    <div className="chatbot-body">
                        <iframe
                            src="https://share.chatling.ai/s/9m61mBduau8cgUd"
                            title="Embedded Chatbot"
                            style={{
                                width: "100%",
                                height: "100%",
                                border: "none",
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
