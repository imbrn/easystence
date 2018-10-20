import { createPersistence } from ".";

describe("createPersistence", () => {
  it("receives an object that implements persistence unit", () => {
    expect(() => createPersistence()).toThrow();
    expect(() => createPersistence()).toThrow();
    expect(() => createPersistence({})).toThrow();
    expect(() => createPersistence(mockPersistenceUnit())).not.toThrow();
  });

  it("should return a persistence function", () => {
    const persistence = createPersistence(mockPersistenceUnit());
    expect(persistence).toBeDefined();
    expect(typeof persistence).toBe("function");
  });
});

describe("the persistence function", () => {
  let persistence;

  beforeEach(() => {
    persistence = createPersistence(mockPersistenceUnit());
  });

  it("should return a model function", () => {
    const model = persistence("MyModel", { id: 1, name: String });
    expect(model).toBeDefined();
    expect(typeof model).toBe("function");
  });
});

describe("the model function", () => {
  let unit;
  let model;

  beforeEach(() => {
    unit = mockPersistenceUnit();
    const persistence = createPersistence(unit);
    model = persistence("MyModel", {
      id: Number,
      name: String
    });
  });

  it("should construct a model instance object", () => {
    const instance = model();
    expect(instance).toBeDefined();
  });

  it("should accept data as argument", () => {
    const instance = model({
      id: 1,
      name: "One"
    });
    expect(instance.id).toBe(1);
    expect(instance.name).toBe("One");
  });

  it("should have a 'find' function", () => {
    expect(model.find).toBeDefined();
    expect(typeof model.find).toBe("function");
  });

  describe("the 'find' function", () => {
    it("should call the persistence unit find function", async () => {
      expect(unit.find).not.toHaveBeenCalled();
      await unit.find();
      expect(unit.find).toHaveBeenCalled();
    });
  });
});

describe("the model instance object", () => {
  let persistenceUnit;
  let instance;

  beforeEach(() => {
    persistenceUnit = mockPersistenceUnit();
    instance = createPersistence(persistenceUnit)()({});
  });

  it("should have a 'save' function", () => {
    expect(instance.save).toBeDefined();
    expect(typeof instance.save).toBe("function");
  });

  it("should have a 'delete' function", () => {
    expect(instance.delete).toBeDefined();
    expect(typeof instance.delete).toBe("function");
  });
});

describe("the model instance functions", () => {
  let unit;
  let instance;

  beforeEach(() => {
    unit = mockPersistenceUnit();
    instance = createPersistence(unit)("model", {}, { autoSave: false })({});
  });

  describe("the 'save' function", () => {
    it("should call the persistence unit save function", async () => {
      expect(unit.save).not.toHaveBeenCalled();
      await instance.save();
      expect(unit.save).toHaveBeenCalled();
    });
  });

  describe("the 'delete' function", () => {
    it("should call the persistence unit delete function", async () => {
      expect(unit.delete).not.toHaveBeenCalled();
      await instance.delete();
      expect(unit.delete).toHaveBeenCalled();
    });
  });
});

const mockPersistenceUnit = () => ({
  save: jest.fn(),
  delete: jest.fn(),
  find: jest.fn(),
  update: jest.fn()
});
