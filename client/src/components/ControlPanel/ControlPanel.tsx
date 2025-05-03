import "./ControlPanel.css"
import { useState } from "react";


function ControlPanel() {
    const [showControlMobile, setShowControlMobile] = useState(false)

    function showControlPanelMobile() {
        setShowControlMobile(!showControlMobile)
    }

    return (
        <>
            <div id="control-panel">
                <button id="A" className="control-button">
                    <i className="fa-solid fa-plus"></i>
                </button>
                <button id="B" className="control-button">
                    <i className="fa-solid fa-user"></i>
                </button>
                <button id="C" className="control-button">
                    <i className="fa-solid fa-magnifying-glass-location"></i>
                </button>
                <button id="D" className="control-button">
                    <i className="fa-solid fa-star"></i>
                </button>
                <button id="burger-button" className="control-button" onClick={showControlPanelMobile}>
                    <i className="fa-solid fa-bars"></i>
                </button>
            </div>
            {
                showControlMobile ? (
                    <div id="control-panel-mobile">
                        <button className="control-button">
                            <i className="fa-solid fa-plus"></i>
                        </button>
                        <button className="control-button">
                            <i className="fa-solid fa-user"></i>
                        </button>
                        <button className="control-button">
                            <i className="fa-solid fa-magnifying-glass-location"></i>
                        </button>
                        <button className="control-button">
                            <i className="fa-solid fa-star"></i>
                        </button>
                    </div>
                    // TODO: figure out way to make burger button go away when clicked, and other buttons show up on the left ???
                ) : null
            }
        </>
    )
}


export default ControlPanel;