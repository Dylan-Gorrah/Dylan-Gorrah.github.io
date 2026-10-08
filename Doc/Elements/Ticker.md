# Ticker
**Markup:** `.ticker > #tk` · **Script:** `js/ticker.js` · **Data:** `ticker` in [[Site Data]] · **Styles:** `.ticker`, `.tk` in `css/home.css` · Back to [[Home Screen]]

The dark pill strip of technology names that scrolls along the top of home without stopping. Testing tools are green (`.tk.t`); hovering pauses it.

## How it works
- The script repeats the word list until it's more than twice the screen width, then the CSS `tick` animation slides it left by half. That makes a seamless loop.
- Speed is worked out from the list's width, so it always moves at the same pace however many words there are. It rebuilds after a window resize and after the fonts load.
- With reduced motion it doesn't animate. The strip becomes horizontally scrollable instead.

## Edit
- **Words:** add or remove items in `ticker` in `js/data.js`. Add `,1` to make one green.
- **Speed:** `SPEED` at the top of `js/ticker.js`, in pixels per second (currently `35.6`). Lower is slower. It was originally `49.5`.
