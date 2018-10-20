class Model {
  constructor({ unit, name, schema, config = defaultModelConfig }) {
    this.unit = unit;
    this.name = name;
    this.schema = schema;
    this.config = config;
  }

  find(...args) {
    return this.unit.find(...args);
  }

  save(instance) {
    return this.unit.save(instance);
  }

  delete(instance) {
    return this.unit.delete(instance);
  }

  hasProperty(property) {
    return this.schema.hasOwnProperty(property);
  }
}

const defaultModelConfig = {
  autoSave: true
};

export default Model;
