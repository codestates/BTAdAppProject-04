import React from "react";
import { useTranslation } from "react-i18next";

const SwapFormHeader = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex justify-center items-center rounded-3xl p-2 text-neutral-50 mb-3">
      <span className="font-semibold text-lg">{t("swap_form.swap")}</span>
    </div>
  );
};

export default SwapFormHeader;
