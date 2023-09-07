/**
 * @jest-environment node
 * @group smoke
 */
import { laniceAreaOverlap } from "./laniceAreaOverlap";
import {
  getExamplePolygonSketchAll,
  writeResultOutput,
} from "@seasketch/geoprocessing/scripts/testing";

describe("Basic smoke tests", () => {
  test("handler function is present", () => {
    expect(typeof laniceAreaOverlap).toBe("function");
  });
  test("laniceAreaOverlapSmoke - tests run against all examples", async () => {
    const examples = await getExamplePolygonSketchAll();
    for (const example of examples) {
      const result = await laniceAreaOverlap(example);
      expect(result).toBeTruthy();
      writeResultOutput(result, "laniceAreaOverlap", example.properties.name);
    }
  }, 120000);
});
