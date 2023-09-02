/**
 * @jest-environment node
 * @group smoke
 */
import { reefAreaOverlap } from "./reefAreaOverlap";
import {
  getExamplePolygonSketchAll,
  writeResultOutput,
} from "@seasketch/geoprocessing/scripts/testing";

describe("Basic smoke tests", () => {
  test("handler function is present", () => {
    expect(typeof reefAreaOverlap).toBe("function");
  });
  test("reefAreaOverlapSmoke - tests run against all examples", async () => {
    const examples = await getExamplePolygonSketchAll();
    for (const example of examples) {
      const result = await reefAreaOverlap(example);
      expect(result).toBeTruthy();
      writeResultOutput(result, "reefAreaOverlap", example.properties.name);
    }
  }, 120000);
});
