import React from "react";
import {
  Collapse,
  ClassTable,
  SketchClassTable,
  ResultsCard,
  useSketchProperties,
  ToolbarCard,
  LayerToggle,
} from "@seasketch/geoprocessing/client-ui";
import {
  ReportResult,
  toNullSketchArray,
  flattenBySketchAllClass,
  metricsWithSketchId,
  squareMeterToKilometer,
  valueFormatter,
  Metric,
  MetricGroup,
  toPercentMetric,
} from "@seasketch/geoprocessing/client-core";

import project from "../../project";
import Translator from "./TranslatorAsync";
import { Trans, useTranslation } from "react-i18next";

const Number = new Intl.NumberFormat("en", { style: "decimal" });

export const GravelBeds: React.FunctionComponent = () => {
  const [{ isCollection }] = useSketchProperties();
  const { t } = useTranslation();

  const metricGroup = project.getMetricGroup("gravelBedsAreaOverlap", t);
  const precalcMetrics = project.getPrecalcMetrics(metricGroup, "area");

  const mapLabel = t("Map");
  const benthicLabel = t("Habitat Type");
  const areaWithin = t("Area Within Plan");
  const percAreaWithin = t("% Area Within Plan");
  const sqKmLabel = t("km²");
  const reportTitleLabel = t("Gravel Beds");

  return (
    <>
      <ResultsCard
        title={reportTitleLabel}
        functionName="gravelBedsAreaOverlap"
        useChildCard
      >
        {(data: ReportResult) => {
          let singleMetrics = data.metrics.filter(
            (m) => m.sketchId === data.sketch.properties.id
          );

          const finalMetrics = [
            ...singleMetrics,
            ...toPercentMetric(
              singleMetrics,
              precalcMetrics,
              project.getMetricGroupPercId(metricGroup)
            ),
          ];

          return (
            <ToolbarCard
              title={reportTitleLabel}
              items={
                <LayerToggle
                  label={mapLabel}
                  layerId={metricGroup.layerId}
                  simple
                />
              }
            >
              <Trans i18nKey="Gravel Beds Card">
                <p>
                  Gravel beds are valuable habitats in the mainly sandy
                  sediments of the southern North Sea. To assist in a recovery
                  of their natural benthic communities, plans should consider
                  the protection of gravel beds.{" "}
                </p>
              </Trans>
              <Translator>
                <ClassTable
                  rows={finalMetrics}
                  metricGroup={metricGroup}
                  columnConfig={[
                    {
                      columnLabel: benthicLabel,
                      type: "class",
                      width: 30,
                    },
                    {
                      columnLabel: areaWithin,
                      type: "metricValue",
                      metricId: metricGroup.metricId,
                      valueFormatter: (val: string | number) =>
                        Number.format(
                          Math.round(
                            squareMeterToKilometer(
                              typeof val === "string" ? parseInt(val) : val
                            )
                          )
                        ),
                      valueLabel: sqKmLabel,
                      width: 30,
                    },
                    {
                      columnLabel: percAreaWithin,
                      type: "metricChart",
                      metricId: project.getMetricGroupPercId(metricGroup),
                      valueFormatter: "percent",
                      chartOptions: {
                        showTitle: true,
                        targetLabelPosition: "bottom",
                        targetLabelStyle: "tight",
                        barHeight: 11,
                      },
                      width: 30,
                      targetValueFormatter: (
                        value: number,
                        row: number,
                        numRows: number
                      ) => {
                        if (row === 0) {
                          return (value: number) =>
                            `${valueFormatter(value / 100, "percent0dig")} ${t(
                              "Target"
                            )}`;
                        } else {
                          return (value: number) =>
                            `${valueFormatter(value / 100, "percent0dig")}`;
                        }
                      },
                    },
                    {
                      columnLabel: mapLabel,
                      type: "layerToggle",
                      width: 10,
                    },
                  ]}
                />
              </Translator>

              {isCollection && (
                <Collapse title={t("Show by MPA")}>
                  {genSketchTable(data, precalcMetrics, metricGroup)}
                </Collapse>
              )}

              <Collapse title={t("Learn more")}>
                <Trans i18nKey="Gravel Beds Card - learn more">
                  <p>
                    ℹ️ Overview: Until the early 20th century, gravel beds
                    supported a rich fauna including sponges, bryozoa, hydrozoa,
                    and flat oysters. Increased human pressure from bottom
                    trawling and fishing have impacted the once-rich habitat.
                    Gravel beds are classified as highly sensitive to
                    degradation from human disturbance, as overturning or
                    removal of stones often destroys fragile hard substrate
                    fauna.
                  </p>
                  <p>
                    🎯 Planning Objective: No identified planning objectives for
                    gravel beds.
                  </p>
                  <p>
                    🗺️ Source Data:{" "}
                    <a
                      href="https://ilvo.vlaanderen.be/uploads/documents/Mededelingen/Fishery-measures-report-ILVO-mededeling-277-final.pdf"
                      target="_blank"
                    >
                      Fishery Measures Report
                    </a>
                  </p>
                  <p>
                    📈 Report: The percentage of each feature type within this
                    plan is calculated by finding the overlap of each feature
                    type with the plan, summing its area, then dividing it by
                    the total area of each feature type found within the
                    planning area. If the plan includes multiple areas that
                    overlap, the overlap is only counted once.
                  </p>
                </Trans>
              </Collapse>
            </ToolbarCard>
          );
        }}
      </ResultsCard>
    </>
  );
};

const genSketchTable = (
  data: ReportResult,
  precalcMetrics: Metric[],
  metricGroup: MetricGroup
) => {
  // Build agg metric objects for each child sketch in collection with percValue for each class
  const childSketches = toNullSketchArray(data.sketch);
  const childSketchIds = childSketches.map((sk) => sk.properties.id);
  const childSketchMetrics = toPercentMetric(
    metricsWithSketchId(
      data.metrics.filter((m) => m.metricId === metricGroup.metricId),
      childSketchIds
    ),
    precalcMetrics
  );
  const sketchRows = flattenBySketchAllClass(
    childSketchMetrics,
    metricGroup.classes,
    childSketches
  );
  return (
    <SketchClassTable rows={sketchRows} metricGroup={metricGroup} formatPerc />
  );
};
