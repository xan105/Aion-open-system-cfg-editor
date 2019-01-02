# Async Hooks

An Async Hooks polyfill for Node < 8, written in TypeScript.

The idea is to provide an interface identical to the native Async Hooks implementation in older versions of Node. If you `import` the library in Node 8+ it will return the native Async Hooks, otherwise it will return the polyfill.

The docs for Async Hooks [here](https://nodejs.org/api/async_hooks.html).

This implementation is based largely on the work of [Andreas Madsen](https://github.com/AndreasMadsen/async-hook)

## Install

```sh
$ npm install --save @creditkarma/async-hooks
```

## Usage

### `createHook`

Creates a new `AsyncHook` object with the supplied callbacks

```typescript
import * as AsyncHooks from '@creditkarma/async-hooks'

AsyncHooks.createHook({
    init(asyncId: number, type: string, triggerAsyncId: number, resource: object): void {
        // A new async resouce was created
    },
    before(asyncId: number): void {
        // The callback for async resource will be called
    },
    after(asyncId: number): void {
        // The callback for async resource was called
    },
    destroy(asyncId: number): void {
        // The async resource will be garbage collected
    }
}).enable()
```

In the native implementation of Async Hooks the `resource` received by the `init` method is the async object that was created. In the polyfill this `resource` is likely to not useful and is here for completeness. Usually this will be an empty wrapper object.

### `executionAsyncId`

Returns the unique ID of the currently executing async context.

```typescript
import * as AsyncHooks from '@creditkarma/async-hooks'

const currentAsyncId: number = AsyncHooks.executionAsyncId()
```

### `triggerAsyncId`

Returns the unique ID of the parent context for the currently executing async context.

```typescript
import * as AsyncHooks from '@creditkarma/async-hooks'

const parentAsyncId: number = AsyncHooks.triggerAsyncId()
```