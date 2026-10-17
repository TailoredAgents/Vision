import assert from "node:assert/strict";
import test from "node:test";
import { insights, team } from "../src/lib/content";
import { propertyFixtures } from "../src/lib/properties";
import { services } from "../src/lib/services";

test("public content slugs are unique", () => {
  for (const collection of [propertyFixtures, team, insights, services]) {
    const slugs = collection.map((item) => item.slug);
    assert.equal(new Set(slugs).size, slugs.length);
  }
});

test("demonstration properties cannot be mistaken for live inventory", () => {
  assert.ok(propertyFixtures.length >= 6);
  for (const property of propertyFixtures) {
    assert.equal(property.illustrative, true);
    assert.ok(property.description.length > 40);
    assert.ok(property.highlights.length >= 3);
  }
});

test("team and insight entries have complete publishable structure", () => {
  for (const member of team) {
    assert.ok(member.bio.length >= 2);
    assert.ok(member.focus.length >= 3);
  }
  for (const insight of insights) {
    assert.match(insight.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(insight.body.length >= 3);
  }
});
