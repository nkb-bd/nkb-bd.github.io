import { defineComponent, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { I as InlineCode } from "./chunk-81ee7706.js";
import "./chunk-de093346.js";
const title = "HTML";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "html.page.server",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><p>This page is rendered on the <b>server-side only</b> (the client-side does not hydrate and re-render the page). This technique is essentially using your framework (React, Vue, Svelte, Other) as a templating engine on steriods, and by default it results in your page shipping <b>zero</b> JavaScript to the client-side. `);
      _push(ssrRenderComponent(InlineCode, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`vite-plugin-ssr`);
          } else {
            return [
              createTextVNode("vite-plugin-ssr")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` refers to this technique as <a href="https://vite-plugin-ssr.com/render-modes#html-only"><b>HTML-only</b></a> rendering.</p><p>It is enabled in `);
      _push(ssrRenderComponent(InlineCode, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`vite-plugin-ssr`);
          } else {
            return [
              createTextVNode("vite-plugin-ssr")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` by changing the filename for your page to `);
      _push(ssrRenderComponent(InlineCode, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`[name].page.server.xyz`);
          } else {
            return [
              createTextVNode("[name].page.server.xyz")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`, which causes `);
      _push(ssrRenderComponent(InlineCode, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`pageContext.Page`);
          } else {
            return [
              createTextVNode("pageContext.Page")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` to only be defined on the server-side. You can then optionally add a `);
      _push(ssrRenderComponent(InlineCode, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`[name].page.client.[js|ts]`);
          } else {
            return [
              createTextVNode("[name].page.client.[js|ts]")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` file to add specific bits of JavaScript to your page as necessary.</p><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/html.page.server.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default,
  title
};
