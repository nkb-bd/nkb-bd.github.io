import { defineComponent, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { I as InlineCode } from "./chunk-81ee7706.js";
import "./chunk-de093346.js";
const title = "Example";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index.page",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><p>Welcome to a small example project showcasing of some of `);
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
      _push(`&#39;s rendering modes. Press any one of them above to see it in action.</p><p>You can also explore this example to learn about rendering modes in general.</p><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default,
  title
};
