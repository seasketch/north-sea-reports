/**
 * @jest-environment node
 * @group smoke
 */
import { bvAreaOverlap } from "./bvAreaOverlap";
import {
  getExamplePolygonSketchAll,
  writeResultOutput,
} from "@seasketch/geoprocessing/scripts/testing";

describe("Basic smoke tests", () => {
  test("handler function is present", () => {
    expect(typeof bvAreaOverlap).toBe("function");
  });
  test("bvAreaOverlapSmoke - tests run against all examples", async () => {
    const examples = await getExamplePolygonSketchAll();
    for (const example of examples) {
      const result = await bvAreaOverlap(example);
      expect(result).toBeTruthy();
      writeResultOutput(result, "bvAreaOverlap", example.properties.name);
    }
  }, 120000);
});
