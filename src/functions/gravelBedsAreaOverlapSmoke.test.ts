/**
 * @jest-environment node
 * @group smoke
 */
import { gravelBedsAreaOverlap } from "./gravelBedsAreaOverlap";
import {
  getExamplePolygonSketchAll,
  writeResultOutput,
} from "@seasketch/geoprocessing/scripts/testing";

describe("Basic smoke tests", () => {
  test("handler function is present", () => {
    expect(typeof gravelBedsAreaOverlap).toBe("function");
  });
  test("gravelBedsAreaOverlapSmoke - tests run against all examples", async () => {
    const examples = await getExamplePolygonSketchAll();
    for (const example of examples) {
      const result = await gravelBedsAreaOverlap(example);
      expect(result).toBeTruthy();
      writeResultOutput(
        result,
        "gravelBedsAreaOverlap",
        example.properties.name
      );
    }
  }, 120000);
});
