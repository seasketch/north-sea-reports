/**
 * @jest-environment node
 * @group smoke
 */
import { suitabilityAreaOverlap } from "./suitabilityAreaOverlap";
import {
  getExamplePolygonSketchAll,
  writeResultOutput,
} from "@seasketch/geoprocessing/scripts/testing";

describe("Basic smoke tests", () => {
  test("handler function is present", () => {
    expect(typeof suitabilityAreaOverlap).toBe("function");
  });
  test("suitabilityAreaOverlapSmoke - tests run against all examples", async () => {
    const examples = await getExamplePolygonSketchAll();
    for (const example of examples) {
      const result = await suitabilityAreaOverlap(example);
      expect(result).toBeTruthy();
      writeResultOutput(
        result,
        "suitabilityAreaOverlap",
        example.properties.name
      );
    }
  }, 120000);
});
