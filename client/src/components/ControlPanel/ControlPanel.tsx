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
                    // TODO: figure out way to make burger button go away when clicked, and other buttons show up on the left ???
                    // TODO: figure out how to display burger button again once button functionality is complete ... 
                    // will most likely need to have button functionality coded in order for this to work ... 
                    // could make it so "account" button goes back to homepage?
                ) : null
            }
        </>
    )
}


export default ControlPanel;