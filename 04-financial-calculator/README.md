# 4 - Financial Calculator Project

This is a practice project to demo Angular concepts shown earlier.
Different implementations are split out into their respective branches.

### Angular Tips

Angular has a built-in `CurrencyPipe`
Images stored in `/public` folder works differently from `/assets` folder.
Reference images in `/public`, do not include the `/public/` prefix:

```html
<img src="image.png" />
```

### Typescript Tips

Object types are defined:

```ts
type MyObj = {
  someProp1: string;
  someProp2: number;
};
```

Arrays are defined:

```ts
string[];
number[];
MyObj[];
```
