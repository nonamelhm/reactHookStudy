# react Hooks 学习巩固

> 为了更好的理解 Hooks 原理，学习了下 react 源码，对 Hooks 有了更深入的理解。

* [hook官方参考](https://zh-hans.react.dev/reference/react/useActionState)

## useActionState
> useActionState 用于缓存表单提交的状态。[官方参考](https://zh-hans.react.dev/reference/react/useActionState#usage)
* state 包含提交操作的结果（成功消息或错误信息）。
* formAction 是一个函数，用于触发表单提交。
* isPending 是一个布尔值，表示提交操作是否正在进行中。

## useCallback
> 在 React 中，useCallback 的第二个参数是一个依赖数组，它决定了何时重新创建回调函数。如果不传依赖数组，或者传一个空数组，useCallback 的行为会有显著差异。以下是两种情况的详细说明：


1. 不传依赖数组
> 如果你不传依赖数组，useCallback 会默认将所有在回调函数中使用的变量视为依赖项。这意味着，只要这些变量的值发生变化，useCallback 就会重新创建回调函数。

这种情况下，useCallback 会自动捕获回调函数中使用的变量（如 a 和 b）。如果这些变量的值发生变化，useCallback 会重新创建回调函数。
问题：这种方式可能会导致意外的行为，因为 React 的依赖推导机制并不总是能完美工作。例如，如果某些变量是对象或数组，它们的引用可能会频繁变化，导致回调函数被频繁重新创建。
```jsx
const memoizedCallback = useCallback(() => {
  console.log(a, b);
}, []); // 不传依赖数组
```


2. 传空数组
> 这意味着 useCallback 永远不会重新创建回调函数，因为它的依赖项是空的，永远不会变化。回调函数会在组件首次渲染时创建一次，之后一直使用同一个引用。
优点：
如果回调函数的逻辑不需要依赖外部变量，传空数组可以避免不必要的重新创建，减少内存消耗。
缺点：
如果回调函数内部依赖了外部变量（如 a 和 b），这些变量的值在组件重新渲染时不会更新。这可能导致回调函数使用的是旧的变量值，从而引发错误或意外行为。

```jsx
const memoizedCallback = useCallback(() => {
  console.log(a, b);
}, []);
```


