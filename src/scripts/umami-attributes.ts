// Umami events declared by attributes on elements, so tracking an element needs no code of its own.
// Each family has its own label prefix, so it never mixes with Umami's data-umami-event-* or the
// Meta helper's data-track-* attributes on the same element:
// - seen: data-umami-seen="Name" plus data-umami-seen-<label>="value". Reports once per element per
//   page load when at least half of it is on screen, then stops watching it.
// - click: data-umami-click="Name" plus data-umami-click-<label>="value". Reports the click and leaves
//   the element's own behaviour alone (Umami's data-umami-event makes same-tab links wait for its answer).
// - interest: data-umami-interest. The first click on any such element in a page load reports
//   "Interest shown" with the page and its language; later ones report nothing.
// Labels are read when the event is sent. Nothing is kept beyond the page load.

type EventData = Record<string, string>;

const SEEN = 'data-umami-seen';
const CLICK = 'data-umami-click';
const INTEREST = 'data-umami-interest';
const INTEREST_EVENT = 'Interest shown';
// Share of the element that must be on screen to count as seen.
const SEEN_SHARE = 0.5;

/** Sends one event if Umami is on the page (it may be blocked or not loaded yet); returns whether it was sent. */
function track(name: string, data: EventData): boolean {
  const u = window as unknown as { umami?: { track: (name: string, data?: EventData) => void } };
  if (!u.umami || typeof u.umami.track !== 'function') return false;
  if (Object.keys(data).length > 0) u.umami.track(name, data);
  else u.umami.track(name);
  return true;
}

/** Sends the event named by the element's attribute, with its `<attribute>-<label>` attributes as labels. */
function trackElement(element: Element, attribute: string): boolean {
  const name = element.getAttribute(attribute);
  if (!name) return false;
  const prefix = `${attribute}-`;
  const data: EventData = {};
  for (const { name: key, value } of Array.from(element.attributes)) {
    if (key.startsWith(prefix)) data[key.slice(prefix.length)] = value;
  }
  return track(name, data);
}

/** The page's language from its address: pages under /en/ are English, the rest Polish. */
function pageLanguage(): string {
  return location.pathname.split('/')[1] === 'en' ? 'en' : 'pl';
}

let interestSent = false;

document.addEventListener(
  'click',
  (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const clicked = target.closest(`[${CLICK}]`);
    if (clicked) trackElement(clicked, CLICK);
    if (!interestSent && target.closest(`[${INTEREST}]`)) {
      interestSent = track(INTEREST_EVENT, { page: location.pathname, language: pageLanguage() });
    }
  },
  // Capture runs before the element's own handlers, so a handler that stops the click cannot hide it;
  // passive, so this listener can never cancel the click.
  { capture: true, passive: true },
);

const seenElements = document.querySelectorAll(`[${SEEN}]`);
if (seenElements.length > 0) {
  // One batch of entries can hold the same element twice; this keeps it to one report.
  const reported = new WeakSet<Element>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (reported.has(entry.target)) continue;
        if (!entry.isIntersecting || entry.intersectionRatio < SEEN_SHARE) continue;
        // If Umami was not there yet, the element stays watched and reports the next time it comes into view.
        if (trackElement(entry.target, SEEN)) {
          reported.add(entry.target);
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: SEEN_SHARE },
  );
  seenElements.forEach((element) => observer.observe(element));
}
