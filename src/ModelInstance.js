class ModelInstance {
  constructor({ model, data }) {
    this.model = model;
    this.data = data;
  }

  save() {
    this.model.save(this);
  }

  delete() {
    this.model.delete(this);
  }

  setPropertyValue(property, value) {
    this.data[property] = value;
  }

  getPropertyValue(property) {
    return this.data[property];
  }
}

const ModelInstanceProxy = {
  get(instance, property) {
    if (property in instance) return instance[property];
    if (instance.model.hasProperty(property))
      return instance.getPropertyValue(property);
  },

  set(instance, property, value) {
    if (instance.model.hasProperty(property)) {
      instance.setPropertyValue(property, value);
    } else {
      instance[property] = value;
    }
    return true;
  }
};

export default ({ model, data }) => {
  const instance = new ModelInstance({ model, data });
  return new Proxy(instance, ModelInstanceProxy);
};
