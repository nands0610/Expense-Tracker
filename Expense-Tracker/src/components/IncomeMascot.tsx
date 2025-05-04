import React, { useState, useEffect } from "react";
import "./Mascot.css";

const IncomeMascot = () => {
    const [showBubble, setShowBubble] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBubble(false); // Hide after 7 seconds
        }, 7000);

<<<<<<< HEAD
        return () => clearTimeout(timer); // Cleanup when unmounted
=======
        return () => clearTimeout(timer);
>>>>>>> 08fa801 (Backend + Frontend: Linking of backend with frontend with additional functionalities to frontend)
    }, []);

    return (
        <div className="mascot-container">
            {showBubble && (
                <div className="speech-bubble">
                    More money, more power! You just leveled up <br />
                    your finances. Now, let’s put that cash to <br />
                    good use—saving, investing, or maybe a little treat?
                </div>
            )}
            <img src="/happy_cash.png" alt="Mascot" className="mascot-image" />
        </div>
    );
};

<<<<<<< HEAD
export default IncomeMascot;
=======
export default IncomeMascot;
>>>>>>> 08fa801 (Backend + Frontend: Linking of backend with frontend with additional functionalities to frontend)
