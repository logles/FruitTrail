import "./ControlPanel.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom;"


function ControlPanel() {
    const [showControlMobile, setShowControlMobile] = useState(false)
    const [showBurgerButton, setshowBurgerButton] = useState(true)
    const [showSearchBar, setShowSearchBar] = useState(false);
    const navigate = useNavigate();

    function showControlPanelMobile() {
        setShowControlMobile(!showControlMobile)
        setshowBurgerButton(showControlMobile)
    }

    return (
        <>
            {
                showBurgerButton ? (
                    <div id="control-panel">
                    <button 
                        id="A" 
                        className="control-button">
                        <i className="fa-solid fa-plus"></i>
                    </button>

                    <button 
                        id="B" 
                        className="control-button"
                        onClick={() => navigate("/Login")}>
                        <i className="fa-solid fa-user"></i>
                    </button>

                    <button 
                        id="C" 
                        className="control-button"
                        onClick={toggleSearchBar}>
                        <i className="fa-solid fa-magnifying-glass-location"></i>
                    </button>

                    <button 
                        id="D" 
                        className="control-button">
                        <i className="fa-solid fa-star"></i>
                    </button>

                    <button 
                        id="burger-button" 
                        className="control-button" 
                        onClick={showControlPanelMobile}>
                        <i className="fa-solid fa-bars"></i>
                    </button>

                    {showSearchBar && (
                        <div className="search-bar">
                            <input
                            type="text"
                            placeholder="Search..."
                            className="search-input"
                            />
                            </div>
                    )}
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

                        <button onClick = {()=>{
                                showControlPanelMobile()
                                navigate("/Login");
                            }
                        } className="control-button">
                            <i className="fa-solid fa-user"></i>
                        </button>

                        <button onClick={toggleSearchBar} className="control-button">
                            <i className="fa-solid fa-magnifying-glass-location"></i>
                        </button>

                        <button onClick = {
                            ()=>{
                                showControlPanelMobile()
                            }
                        } className="control-button">
                            <i className="fa-solid fa-star"></i>
                        </button>

                        {showSearchBar && (
                            <div className="search-bar">
                                <input 
                                type="text"
                                placeholder="Search..."
                                className="search-input" />
                                </div>
                        )}
                    </div>
                ) : null
            }
        </>
    )
}


export default ControlPanel;