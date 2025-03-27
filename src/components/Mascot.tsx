import React, { useEffect, useState } from "react";
import "./Mascot.css";

const Mascot = ({ show }: { show: boolean }) => {
    const [visible, setVisible] = useState(false);
    const [showBubble, setShowBubble] = useState(false);

    useEffect(() => {
        if (show) {
            setVisible(true);
            setShowBubble(true);

            setTimeout(() => {
                setShowBubble(false);
                setTimeout(() => setVisible(false), 1000); // Hide mascot after speech bubble disappears
            }, 5000);
        }
    }, [show]);

    return (
        <div className={`mascot-container ${visible ? "show" : ""}`}>
            {showBubble && <div className="speech-bubble">Hey there! I’m <b>Cash Cardashian</b>, your BudgetBytes sidekick! <br />
            Let’s <b>track your spending</b>, hit those <b>savings goals</b>, <br />
            and keep your wallet happy. <br />
            Let’s make every rupee count!</div>}
            <img src="/mascot.png" alt="Mascot" className="mascot-image" />
        </div>
    );
};

export default Mascot;
