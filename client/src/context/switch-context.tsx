import React from "react";

type SwitchContextProviderProps = {
  children: React.ReactNode;
};

const SwitchContext = React.createContext({
  isSwitch: true,
  onSwitch: (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(e);
  },
});

export const SwitchContextProvider = ({
  children,
}: SwitchContextProviderProps): JSX.Element => {
  const [isSwitch, setIsSwitch] = React.useState(true);

  const changeSwitchHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSwitch(!isSwitch);
  };

  return (
    <SwitchContext.Provider
      value={{ isSwitch: isSwitch, onSwitch: changeSwitchHandler}}
    >
      {children}
    </SwitchContext.Provider>
  );
};

export default SwitchContext;
