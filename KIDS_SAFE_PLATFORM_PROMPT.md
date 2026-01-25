# Master Prompt — Kids-Safe Video Platform (Pro Standard)

You are improving an existing kids-focused video platform.

Your task is to refactor UI, UX, security, and video player behavior to meet modern professional standards (YouTube Kids / Netflix Kids level), without removing existing functionality.

## Security & Safety (Mandatory)

1. Child safety first
   - No external links inside video UI
   - No comments or chat unless explicitly enabled
   - Disable autoplay chains by default (parent-controlled)
   - Prevent keyboard shortcuts that can escape fullscreen

2. Content safety
   - Video metadata must be sanitized (titles, descriptions)
   - Never render raw HTML from video data
   - Strict CSP headers (no inline scripts)
   - Prevent iframe click-through abuse

3. Account & session safety
   - Protect admin actions behind role checks
   - Rate-limit video interactions (likes, reports)
   - Ensure video URLs are validated and whitelisted

## Visual & UX Standards (For Kids)

- Soft colors, rounded corners, large spacing
- No sharp contrasts or aggressive animations
- Clear hierarchy: Video → Controls → Extras
- One main action per screen

Forbidden:
- UI clutter
- Overlapping cards
- Controls covering important video content
- Repeating the same card blocks unnecessarily

## Video Page — Modern Functionality

Required layout structure:
1. Video container (centered, responsive)
2. Minimal control bar (primary actions only)
3. Expandable advanced controls (secondary)
4. Related videos (below, never beside video)

### Video Controls — Rules

Primary controls (always visible):
- Play / Pause
- Progress bar (large & touch-friendly)
- Time (current / total)
- Volume slider (simple)

Secondary controls (grouped, collapsible):
- Mini player
- Theater mode
- Fullscreen
- Playback speed
- Resolution selector
- Language selector

Do NOT:
- Show all controls at once
- Use small icon-only buttons without labels

## Usability Improvements

- Buttons must have text + icon
- Controls must work with mouse, touch, keyboard
- All sliders large enough for kids’ fingers
- Avoid long horizontal control rows (wrap logically)

## Ads — Safe & Professional Handling

- Ads must exist, but:
  - Never inside the video frame
  - Never between control buttons
  - Never interrupt playback
- One ad slot per screen
- Ads visually quieter than content
- Ads must never look clickable to kids

## Responsive Behavior

Desktop:
- Centered video
- Related videos below
- Optional right sidebar (non-essential only)

Mobile:
- Video first
- Controls stacked vertically
- No sidebars
- No hover-dependent UI

## Code & Architecture Expectations

- Do NOT remove existing logic
- Refactor instead of delete
- Separate: video logic, UI layout, control logic
- Use semantic HTML
- Use ARIA labels for accessibility

## Quality Checks (Must Pass)

- No overlapping UI
- No duplicated sections
- Video usable by a 6-year-old
- Parent can understand controls instantly
- Platform looks trustworthy and calm

## Final Goal

Create a professional, safe, calm, and intuitive kids video experience that parents trust, kids understand instantly, and scales without UI chaos.
