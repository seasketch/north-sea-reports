import React from "react";
import { SizeCard } from "./SizeCard";
import { SketchAttributesCard } from "@seasketch/geoprocessing/client-ui";
import { GravelBeds } from "./GravelBeds";
import { Lanice } from "./Lanice";

const ReportPage = () => {
  return (
    <>
      <SizeCard />
      <GravelBeds />
      <Lanice />
      <SketchAttributesCard autoHide />
    </>
  );
};

export default ReportPage;
