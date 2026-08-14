import { defineComponent, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { I as InlineCode } from "./chunk-81ee7706.js";
import "./chunk-de093346.js";
const title = "SSG";
const doNotPrerender = false;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ssg.page",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><p>This page is rendered only once at <b>build time</b> during a process called <a href="https://vite-plugin-ssr.com/pre-rendering">pre-rendering</a>, also referred to as <a href="https://vite-plugin-ssr.com/render-modes#ssg-aka-pre-rendering"><b>static-site generation</b> (SSG)</a>.</p><p>It is enabled in `);
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
      _push(` for <b>all pages</b> by adding `);
      _push(ssrRenderComponent(InlineCode, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`prerender: true`);
          } else {
            return [
              createTextVNode("prerender: true")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` to your plugin config in `);
      _push(ssrRenderComponent(InlineCode, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`vite.config.[js|ts]`);
          } else {
            return [
              createTextVNode("vite.config.[js|ts]")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`, and then can be disabled on a per-page basis by exporting `);
      _push(ssrRenderComponent(InlineCode, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`doNotPrerender`);
          } else {
            return [
              createTextVNode("doNotPrerender")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` from a page.</p><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/ssg.page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default,
  doNotPrerender,
  title
};
