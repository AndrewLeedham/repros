# rollup-plugin-ts-workspaces

The aim here is replace the react import with vhtml or preact etc, to enable multiple component outputs which support different libraries. Using the `before` transformer hook does not seem to update references properly. The current decleration output is:
```typescript
/**
 * Child.
 */
declare function Child(): JSX.Element;
export { Child as default };

```
If we do not replace the react import with vhtml we get:
```typescript
/// <reference types="react"/>

/**
 * Child.
 */
declare function Child(): JSX.Element;
export { Child as default };
```
Because vhtml does not provide a global JSX namespace (same as preact), the ideal output would be:
```typescript
import createElement from "vhtml";

/**
 * Child.
 */
declare function Child(): createElement.JSX.Element;
export { Child as default };
```

To achieve this I think we need to swap the import before TypeScript procceses it, since the `before` transformer hook fires too late.