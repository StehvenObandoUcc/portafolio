/**
 * Holds the intro curtain until the page has loaded: <html data-loading> is
 * set before first paint and removed once the load event has fired and the
 * fonts are ready, so the curtain lifts onto a finished page. Only JavaScript
 * sets it, so without JavaScript nothing waits; a cap releases a slow network.
 */
const MAX_WAIT_MS = 8000;

export const loadGateBootScript = `(function(){var d=document.documentElement;d.dataset.loading="";var done=false;function go(){if(done)return;done=true;requestAnimationFrame(function(){delete d.dataset.loading})}var cap=setTimeout(go,${MAX_WAIT_MS});function ready(){var f=document.fonts&&document.fonts.ready;(f||Promise.resolve()).then(function(){clearTimeout(cap);go()})}if(document.readyState==="complete")ready();else window.addEventListener("load",ready)})();`;
