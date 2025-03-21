import React, { createContext, useState, useContext } from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const showPopup = (message) => {
    setPopupMessage(message);
    setPopUpVisible(true);
  };

  const hidePopup = () => setPopUpVisible(false);

  return (
    <PopupContext.Provider value={{ popUpVisible, popupMessage, showPopup, hidePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
