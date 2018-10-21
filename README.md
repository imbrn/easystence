<h1 align="center">easystence</h1>

<p align="center">
  <b>easystence</b> is a tiny library to help you handle persistent data in a
  very easy. It provides you an incredible API with an incredible intuitive way
  to work.
</p>

**It sounds pretty cool, right? Let's check it out!**

_It provides you useful persistence units ready to use:_

```javascript
import { localStorageUnit } from "easystence";
```

> You can also implement your own persistence unit as a breeze.

_Create models:_

```javascript
import { createPersistence, localStorageUnit } from "easystence";

const persistence = createPersistence(localStorageUnit);

const Product = persistence("Product", {
  id: Number,
  name: String,
  price: Number
});
```

_Create model instances:_

```javascript
const apple = Product({
  id: 1,
  name: "Apple",
  price: 50
});
```

_Persist model instances:_

```javascript
await apple.save();
```

_Search for data:_

```javascript
// Getting one value
const oneApple = await Product.findOne({ id: 1 });

// Getting all values
const allApples = await Product.find();
```

_Delete data:_

```javascript
await oneApple.delete();
```

## Features:

- Very nice API;

- Async support;

- It works with a persistence unit interface, so you can save your data wherever
  you want;

- Well known API to handle data;

- Tiny;

## License

MIT License
