import { defineComponent, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { I as InlineCode } from "./chunk-81ee7706.js";
import "./chunk-de093346.js";
const title = "SSR";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ssr.page",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(_attrs)}>This page is rendered on the <b>server-side</b>, then rendered <i>again</i> on the <b>client-side</b> during <a href="https://vite-plugin-ssr.com/hydration">hydration</a>. This technique is the default behavior for `);
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
      _push(`, commonly referred to as <a href="https://vite-plugin-ssr.com/render-modes#ssr"><b>server-side rendering</b> (SSR)</a>.</p>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/ssr.page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default,
  title
};
