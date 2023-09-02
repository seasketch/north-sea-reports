import React from "react";
import ViabilityPage from "../components/ViabilityPage";
import { Translator } from "../components/TranslatorAsync";

const MpaTabReport = () => {
  return (
    <>
      <ViabilityPage />
    </>
  );
};

export default function () {
  // Translator must be in parent FunctionComponent in order for ReportClient to use useTranslate hook
  return (
    <Translator>
      <MpaTabReport />
    </Translator>
  );
}
