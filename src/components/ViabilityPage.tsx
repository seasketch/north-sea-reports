import React from "react";
import { SizeCard } from "./SizeCard";
import { SketchAttributesCard } from "@seasketch/geoprocessing/client-ui";
import { GravelBeds } from "./GravelBeds";
import { Lanice } from "./Lanice";
import { BiologicalValue } from "./BiologicalValue";
import { Suitability } from "./Suitability";

const ReportPage = () => {
  return (
    <>
      <SizeCard />
      <GravelBeds />
      <Lanice />
      <Suitability />
      <BiologicalValue />
      <SketchAttributesCard autoHide />
    </>
  );
};

export default ReportPage;
