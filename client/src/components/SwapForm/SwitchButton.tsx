import React from "react";
import ThemeContext from "../../context/theme-context";
import SwitchContext from "../../context/switch-context";

const SwitchButton = (): JSX.Element => {
  const { isLight } = React.useContext(ThemeContext);
  const { onSwitch } = React.useContext(SwitchContext);

  return (
    <button
      className={isLight ? styles.lightContainer : styles.darkContainer}
      onClick={onSwitch}
    >
        <div className={isLight ? styles.lightButton : styles.darkButton}>
          {("↕")}
        </div>
    </button>
  );
};

const styles = {
  lightContainer: "border-orange-300 flex justify-center items-center w-14 h-14 rounded-3xl m-1",
  darkContainer: "border-blue-500 flex justify-center items-center w-14 h-14 rounded-3xl m-1",
  lightButton:
    "h-full w-full rounded-3xl flex justify-center items-center bg-orange-500 text-white font-semibold cursor-pointer",
  darkButton:
    "h-full w-full rounded-3xl flex justify-center items-center bg-blue-500 text-white font-semibold cursor-pointer",
};

export default SwitchButton;
