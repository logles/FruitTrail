import "./ControlPanel.css"
import { useState } from "react";


function ControlPanel() {
    const [showControlMobile, setShowControlMobile] = useState(false)
    const [showBurgerButton, setshowBurgerButton] = useState(true)

    function showControlPanelMobile() {
        setShowControlMobile(!showControlMobile)
        setshowBurgerButton(showControlMobile)
    }

    return (
        <>
            {
                showBurgerButton ? (
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
                ) : null
            }
            {
                showControlMobile ? (
                    <div id="control-panel-mobile">
                        <button onClick = {
                            ()=>{
                                showControlPanelMobile()
                            }
                        } className="control-button">
                            <i className="fa-solid fa-plus"></i>
                        </button>
                        <button onClick = {
                            ()=>{
                                showControlPanelMobile()
                            }
                        } className="control-button">
                            <i className="fa-solid fa-user"></i>
                        </button>
                        <button onClick = {
                            ()=>{
                                showControlPanelMobile()
                            }
                        } className="control-button">
                            <i className="fa-solid fa-magnifying-glass-location"></i>
                        </button>
                        <button onClick = {
                            ()=>{
                                showControlPanelMobile()
                            }
                        } className="control-button">
                            <i className="fa-solid fa-star"></i>
                        </button>
                    </div>
                ) : null
            }
        </>
    )
}


export default ControlPanel;