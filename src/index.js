import Model from "./Model";
import ModelInstance from "./ModelInstance";
import { validateUnit } from "./Unit";

export function createPersistence(unit) {
  validateUnit(unit);
  return persistenceFunction(unit);
}

function persistenceFunction(unit) {
  return (name, schema, config) =>
    createModelFunction({ unit, name, schema, config });
}

function createModelFunction({ unit, name, schema, config }) {
  const model = new Model({ unit, name, schema, config });
  const modelFunction = data => ModelInstance({ model, data });
  return prepareModelFunction(modelFunction, model);
}

function prepareModelFunction(modelFunction, model) {
  modelFunction.find = (...args) => model.find(...args);
  return modelFunction;
}
