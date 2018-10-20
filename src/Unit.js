import v8n from "v8n";

v8n.extend({
  function: () => value => typeof value === "function"
});

export function validateUnit(unit) {
  v8n()
    .schema({
      save: v8n().function(),
      delete: v8n().function(),
      find: v8n().function(),
      update: v8n().function()
    })
    .check(unit);
}
