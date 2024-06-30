# 06-Components Deep Dive

This section dives deep into Angular Components.

## ng-content

First, we refactored a dashboard-item component so that it's re-usable as a template.

## attribute selector

In the `button` component, we used the syntax `button[AppButton]`
Then used it like so:

```html
<button appButton>
  Logout
  <span ngProjectAs="icon">→</span>
</button>
```

Result:

- we get to keep the button element, and not nest our button template inside a special element
- we select the html native element with the appButton attribute to render our component

## Host element

The concept of `host element` is used in conjunction with `ng-content`
In the `button` component:

- we change the css to use `:host` instead of `button`
  Result:
  The css will apply to the component specified by the selector.
  Host element is the element defined by the selector.

In the `control` component:

- we change our component scope to global by using `encapsulation: ViewEncapsulation.None`
- the css styles will also be applied globally (whereas before, it would not render properly because the style is scoped to component AND Angular doesn't "precompile" where component is used)
- additionally, we gave it another property

```ts
host: {
    class: 'control',
  },
```

- this applies a class="control" to the component wherever it is used
