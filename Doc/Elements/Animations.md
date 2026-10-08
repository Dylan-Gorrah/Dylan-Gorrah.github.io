# Animations
**File:** `css/animations.css` (loaded last) · Back to [[Portfolio Site]]

## Keyframes and where they're used
| Name | Used by |
|---|---|
| `tick` | [[Ticker]] scrolling |
| `pulse` | "Available" dot, current-education dot |
| `rise` | cards and tiles fading up on load; view content when a view opens |
| `up` | name letters sliding up in the [[Profile Card]] |
| `bob` | photo gently floating |
| `draw` | tile icons drawing themselves |
| `nudge` | tile icon hop on hover |
| `type` + `blink` | terminal lines "typing" and blinking cursor in [[About]] |
| `pop` | chips in [[Stack]], code languages in [[Languages]] |
| `sweep` | loading-bar shine on [[Freelance]] browser cards |
| `grow` | pass-rate bar in [[Tutoring]] |
| `g1` / `g2` | Hello ↔ Hallo swap in [[Languages]] |
| `leadIn` | [[Profile Card]] intro text blurring in when "…" expands |
| `avatarHint` | [[Profile Popup]] avatar's 3 "tap me" pulses (soft neutral glow) |
| `float` (+ `nudge`) | [[CV Button]] bobbing, arrow hop |

## Replay on open
View content animates only while the view has the class `play`. [[View System]] removes and re-adds it each time a view opens, which restarts the animations. Elements get a stagger delay from `--i` (their position).

JS-driven motion (radar growth, count-ups, the view circle) lives in the JS files, not here.

## Reduced motion
If the visitor's OS asks for reduced motion, the media query at the bottom turns off **all** CSS animation and transitions, and the scripts check `Site.rm` to skip their own motion.
