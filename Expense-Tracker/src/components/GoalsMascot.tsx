import React, { useState, useEffect } from "react";
import "./Mascot.css";

const GoalsMascot = () => {
    const [showBubble, setShowBubble] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBubble(false); // Hide after 7 seconds
        }, 7000);

        return () => clearTimeout(timer); // Cleanup when unmounted
    }, []);

    return (
        <div className="mascot-container">
            {showBubble && (
                <div className="speech-bubble">
                    Mission accomplished! Your financial goal is locked in! <br />
                     Keep this momentum going, and your future self <br />
                     will thank you!
                </div>
            )}
            <img src="/happy_cash.png" alt="Mascot" className="mascot-image" />
        </div>
    );
};

export default GoalsMascot;
