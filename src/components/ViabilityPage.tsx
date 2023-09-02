import React from "react";
import { SizeCard } from "./SizeCard";
import { SketchAttributesCard } from "@seasketch/geoprocessing/client-ui";
import { GravelBeds } from "./GravelBeds";
import { Reef } from "./Reef";

const ReportPage = () => {
  return (
    <>
      <SizeCard />
      <GravelBeds />
      <Reef />
      <SketchAttributesCard autoHide />
    </>
  );
};

export default ReportPage;
