import React, { useState, useEffect } from "react";
import "./Mascot.css";

const OBMascot = () => {
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
                    Whoa there, big spender! You've just blown past your budget! <br />
                    Time to slow down or let me fetch you a financial plan before <br />
                     your wallet files for bankruptcy. 
                </div>
            )}
            <img src="/sad_cash.png" alt="Mascot" className="mascot-image" />
        </div>
    );
};

export default OBMascot;
