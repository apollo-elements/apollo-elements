var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// node_modules/tslib/tslib.js
var require_tslib = __commonJS({
  "node_modules/tslib/tslib.js"(exports, module) {
    var __extends2;
    var __assign2;
    var __rest2;
    var __decorate2;
    var __param2;
    var __metadata2;
    var __awaiter2;
    var __generator2;
    var __exportStar2;
    var __values2;
    var __read2;
    var __spread2;
    var __spreadArrays2;
    var __spreadArray2;
    var __await2;
    var __asyncGenerator2;
    var __asyncDelegator2;
    var __asyncValues2;
    var __makeTemplateObject2;
    var __importStar2;
    var __importDefault2;
    var __classPrivateFieldGet2;
    var __classPrivateFieldSet2;
    var __createBinding2;
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", { value: true });
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id, v) {
          return exports2[id] = previous ? previous(id, v) : v;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      __extends2 = function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
      __assign2 = Object.assign || function(t2) {
        for (var s, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
          s = arguments[i2];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t2[p] = s[p];
        }
        return t2;
      };
      __rest2 = function(s, e2) {
        var t2 = {};
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0)
            t2[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i2 = 0, p = Object.getOwnPropertySymbols(s); i2 < p.length; i2++) {
            if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i2]))
              t2[p[i2]] = s[p[i2]];
          }
        return t2;
      };
      __decorate2 = function(decorators, target, key, desc) {
        var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r2 = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i2 = decorators.length - 1; i2 >= 0; i2--)
            if (d = decorators[i2])
              r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
        return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
      };
      __param2 = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata2 = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter2 = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e2) {
              reject(e2);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e2) {
              reject(e2);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator2 = function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t2[0] & 1)
            throw t2[1];
          return t2[1];
        }, trys: [], ops: [] }, f, y, t2, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n2) {
          return function(v) {
            return step([n2, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f = 1, y && (t2 = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t2 = y["return"]) && t2.call(y), 0) : y.next) && !(t2 = t2.call(y, op[1])).done)
                return t2;
              if (y = 0, t2)
                op = [op[0] & 2, t2.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t2 = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t2[1]) {
                    _.label = t2[1];
                    t2 = op;
                    break;
                  }
                  if (t2 && _.label < t2[2]) {
                    _.label = t2[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t2[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e2) {
              op = [6, e2];
              y = 0;
            } finally {
              f = t2 = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __exportStar2 = function(m, o) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
            __createBinding2(o, m, p);
      };
      __createBinding2 = Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      };
      __values2 = function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i2 = 0;
        if (m)
          return m.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i2 >= o.length)
                o = void 0;
              return { value: o && o[i2++], done: !o };
            }
          };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read2 = function(o, n2) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i2 = m.call(o), r2, ar = [], e2;
        try {
          while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done)
            ar.push(r2.value);
        } catch (error) {
          e2 = { error };
        } finally {
          try {
            if (r2 && !r2.done && (m = i2["return"]))
              m.call(i2);
          } finally {
            if (e2)
              throw e2.error;
          }
        }
        return ar;
      };
      __spread2 = function() {
        for (var ar = [], i2 = 0; i2 < arguments.length; i2++)
          ar = ar.concat(__read2(arguments[i2]));
        return ar;
      };
      __spreadArrays2 = function() {
        for (var s = 0, i2 = 0, il = arguments.length; i2 < il; i2++)
          s += arguments[i2].length;
        for (var r2 = Array(s), k = 0, i2 = 0; i2 < il; i2++)
          for (var a = arguments[i2], j = 0, jl = a.length; j < jl; j++, k++)
            r2[k] = a[j];
        return r2;
      };
      __spreadArray2 = function(to, from) {
        for (var i2 = 0, il = from.length, j = to.length; i2 < il; i2++, j++)
          to[j] = from[i2];
        return to;
      };
      __await2 = function(v) {
        return this instanceof __await2 ? (this.v = v, this) : new __await2(v);
      };
      __asyncGenerator2 = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i2, q = [];
        return i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
          return this;
        }, i2;
        function verb(n2) {
          if (g[n2])
            i2[n2] = function(v) {
              return new Promise(function(a, b) {
                q.push([n2, v, a, b]) > 1 || resume(n2, v);
              });
            };
        }
        function resume(n2, v) {
          try {
            step(g[n2](v));
          } catch (e2) {
            settle(q[0][3], e2);
          }
        }
        function step(r2) {
          r2.value instanceof __await2 ? Promise.resolve(r2.value.v).then(fulfill, reject) : settle(q[0][2], r2);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f, v) {
          if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator2 = function(o) {
        var i2, p;
        return i2 = {}, verb("next"), verb("throw", function(e2) {
          throw e2;
        }), verb("return"), i2[Symbol.iterator] = function() {
          return this;
        }, i2;
        function verb(n2, f) {
          i2[n2] = o[n2] ? function(v) {
            return (p = !p) ? { value: __await2(o[n2](v)), done: n2 === "return" } : f ? f(v) : v;
          } : f;
        }
      };
      __asyncValues2 = function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i2;
        return m ? m.call(o) : (o = typeof __values2 === "function" ? __values2(o) : o[Symbol.iterator](), i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
          return this;
        }, i2);
        function verb(n2) {
          i2[n2] = o[n2] && function(v) {
            return new Promise(function(resolve, reject) {
              v = o[n2](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve({ value: v2, done: d });
          }, reject);
        }
      };
      __makeTemplateObject2 = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      };
      __importStar2 = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding2(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      __importDefault2 = function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      __classPrivateFieldGet2 = function(receiver, state, kind, f) {
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };
      __classPrivateFieldSet2 = function(receiver, state, value, kind, f) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };
      exporter("__extends", __extends2);
      exporter("__assign", __assign2);
      exporter("__rest", __rest2);
      exporter("__decorate", __decorate2);
      exporter("__param", __param2);
      exporter("__metadata", __metadata2);
      exporter("__awaiter", __awaiter2);
      exporter("__generator", __generator2);
      exporter("__exportStar", __exportStar2);
      exporter("__createBinding", __createBinding2);
      exporter("__values", __values2);
      exporter("__read", __read2);
      exporter("__spread", __spread2);
      exporter("__spreadArrays", __spreadArrays2);
      exporter("__spreadArray", __spreadArray2);
      exporter("__await", __await2);
      exporter("__asyncGenerator", __asyncGenerator2);
      exporter("__asyncDelegator", __asyncDelegator2);
      exporter("__asyncValues", __asyncValues2);
      exporter("__makeTemplateObject", __makeTemplateObject2);
      exporter("__importStar", __importStar2);
      exporter("__importDefault", __importDefault2);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet2);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet2);
    });
  }
});

// node_modules/tslib/modules/index.js
var import_tslib = __toModule(require_tslib());
var {
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __exportStar,
  __createBinding,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet
} = import_tslib.default;

// node_modules/lit-html/lib/dom.js
var isCEPolyfill = typeof window !== "undefined" && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== void 0;
var removeNodes = (container, start, end = null) => {
  while (start !== end) {
    const n2 = start.nextSibling;
    container.removeChild(start);
    start = n2;
  }
};

// node_modules/lit-html/lib/template.js
var marker = `{{lit-${String(Math.random()).slice(2)}}}`;
var nodeMarker = `<!--${marker}-->`;
var markerRegex = new RegExp(`${marker}|${nodeMarker}`);
var boundAttributeSuffix = "$lit$";
var Template = class {
  constructor(result, element) {
    this.parts = [];
    this.element = element;
    const nodesToRemove = [];
    const stack = [];
    const walker = document.createTreeWalker(element.content, 133, null, false);
    let lastPartIndex = 0;
    let index = -1;
    let partIndex = 0;
    const { strings: strings10, values: { length } } = result;
    while (partIndex < length) {
      const node = walker.nextNode();
      if (node === null) {
        walker.currentNode = stack.pop();
        continue;
      }
      index++;
      if (node.nodeType === 1) {
        if (node.hasAttributes()) {
          const attributes = node.attributes;
          const { length: length2 } = attributes;
          let count = 0;
          for (let i2 = 0; i2 < length2; i2++) {
            if (endsWith(attributes[i2].name, boundAttributeSuffix)) {
              count++;
            }
          }
          while (count-- > 0) {
            const stringForPart = strings10[partIndex];
            const name = lastAttributeNameRegex.exec(stringForPart)[2];
            const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
            const attributeValue = node.getAttribute(attributeLookupName);
            node.removeAttribute(attributeLookupName);
            const statics = attributeValue.split(markerRegex);
            this.parts.push({ type: "attribute", index, name, strings: statics });
            partIndex += statics.length - 1;
          }
        }
        if (node.tagName === "TEMPLATE") {
          stack.push(node);
          walker.currentNode = node.content;
        }
      } else if (node.nodeType === 3) {
        const data = node.data;
        if (data.indexOf(marker) >= 0) {
          const parent = node.parentNode;
          const strings11 = data.split(markerRegex);
          const lastIndex = strings11.length - 1;
          for (let i2 = 0; i2 < lastIndex; i2++) {
            let insert;
            let s = strings11[i2];
            if (s === "") {
              insert = createMarker();
            } else {
              const match = lastAttributeNameRegex.exec(s);
              if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                s = s.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
              }
              insert = document.createTextNode(s);
            }
            parent.insertBefore(insert, node);
            this.parts.push({ type: "node", index: ++index });
          }
          if (strings11[lastIndex] === "") {
            parent.insertBefore(createMarker(), node);
            nodesToRemove.push(node);
          } else {
            node.data = strings11[lastIndex];
          }
          partIndex += lastIndex;
        }
      } else if (node.nodeType === 8) {
        if (node.data === marker) {
          const parent = node.parentNode;
          if (node.previousSibling === null || index === lastPartIndex) {
            index++;
            parent.insertBefore(createMarker(), node);
          }
          lastPartIndex = index;
          this.parts.push({ type: "node", index });
          if (node.nextSibling === null) {
            node.data = "";
          } else {
            nodesToRemove.push(node);
            index--;
          }
          partIndex++;
        } else {
          let i2 = -1;
          while ((i2 = node.data.indexOf(marker, i2 + 1)) !== -1) {
            this.parts.push({ type: "node", index: -1 });
            partIndex++;
          }
        }
      }
    }
    for (const n2 of nodesToRemove) {
      n2.parentNode.removeChild(n2);
    }
  }
};
var endsWith = (str, suffix) => {
  const index = str.length - suffix.length;
  return index >= 0 && str.slice(index) === suffix;
};
var isTemplatePartActive = (part) => part.index !== -1;
var createMarker = () => document.createComment("");
var lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

// node_modules/lit-html/lib/modify-template.js
var walkerNodeFilter = 133;
function removeNodesFromTemplate(template, nodesToRemove) {
  const { element: { content }, parts: parts2 } = template;
  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts2);
  let part = parts2[partIndex];
  let nodeIndex = -1;
  let removeCount = 0;
  const nodesToRemoveInTemplate = [];
  let currentRemovingNode = null;
  while (walker.nextNode()) {
    nodeIndex++;
    const node = walker.currentNode;
    if (node.previousSibling === currentRemovingNode) {
      currentRemovingNode = null;
    }
    if (nodesToRemove.has(node)) {
      nodesToRemoveInTemplate.push(node);
      if (currentRemovingNode === null) {
        currentRemovingNode = node;
      }
    }
    if (currentRemovingNode !== null) {
      removeCount++;
    }
    while (part !== void 0 && part.index === nodeIndex) {
      part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
      partIndex = nextActiveIndexInTemplateParts(parts2, partIndex);
      part = parts2[partIndex];
    }
  }
  nodesToRemoveInTemplate.forEach((n2) => n2.parentNode.removeChild(n2));
}
var countNodes = (node) => {
  let count = node.nodeType === 11 ? 0 : 1;
  const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);
  while (walker.nextNode()) {
    count++;
  }
  return count;
};
var nextActiveIndexInTemplateParts = (parts2, startIndex = -1) => {
  for (let i2 = startIndex + 1; i2 < parts2.length; i2++) {
    const part = parts2[i2];
    if (isTemplatePartActive(part)) {
      return i2;
    }
  }
  return -1;
};
function insertNodeIntoTemplate(template, node, refNode = null) {
  const { element: { content }, parts: parts2 } = template;
  if (refNode === null || refNode === void 0) {
    content.appendChild(node);
    return;
  }
  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts2);
  let insertCount = 0;
  let walkerIndex = -1;
  while (walker.nextNode()) {
    walkerIndex++;
    const walkerNode = walker.currentNode;
    if (walkerNode === refNode) {
      insertCount = countNodes(node);
      refNode.parentNode.insertBefore(node, refNode);
    }
    while (partIndex !== -1 && parts2[partIndex].index === walkerIndex) {
      if (insertCount > 0) {
        while (partIndex !== -1) {
          parts2[partIndex].index += insertCount;
          partIndex = nextActiveIndexInTemplateParts(parts2, partIndex);
        }
        return;
      }
      partIndex = nextActiveIndexInTemplateParts(parts2, partIndex);
    }
  }
}

// node_modules/lit-html/lib/directive.js
var directives = new WeakMap();
var directive = (f) => (...args) => {
  const d = f(...args);
  directives.set(d, true);
  return d;
};
var isDirective = (o) => {
  return typeof o === "function" && directives.has(o);
};

// node_modules/lit-html/lib/part.js
var noChange = {};
var nothing = {};

// node_modules/lit-html/lib/template-instance.js
var TemplateInstance = class {
  constructor(template, processor, options) {
    this.__parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }
  update(values) {
    let i2 = 0;
    for (const part of this.__parts) {
      if (part !== void 0) {
        part.setValue(values[i2]);
      }
      i2++;
    }
    for (const part of this.__parts) {
      if (part !== void 0) {
        part.commit();
      }
    }
  }
  _clone() {
    const fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const stack = [];
    const parts2 = this.template.parts;
    const walker = document.createTreeWalker(fragment, 133, null, false);
    let partIndex = 0;
    let nodeIndex = 0;
    let part;
    let node = walker.nextNode();
    while (partIndex < parts2.length) {
      part = parts2[partIndex];
      if (!isTemplatePartActive(part)) {
        this.__parts.push(void 0);
        partIndex++;
        continue;
      }
      while (nodeIndex < part.index) {
        nodeIndex++;
        if (node.nodeName === "TEMPLATE") {
          stack.push(node);
          walker.currentNode = node.content;
        }
        if ((node = walker.nextNode()) === null) {
          walker.currentNode = stack.pop();
          node = walker.nextNode();
        }
      }
      if (part.type === "node") {
        const part2 = this.processor.handleTextExpression(this.options);
        part2.insertAfterNode(node.previousSibling);
        this.__parts.push(part2);
      } else {
        this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
      }
      partIndex++;
    }
    if (isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }
    return fragment;
  }
};

// node_modules/lit-html/lib/template-result.js
var policy = window.trustedTypes && trustedTypes.createPolicy("lit-html", { createHTML: (s) => s });
var commentMarker = ` ${marker} `;
var TemplateResult = class {
  constructor(strings10, values, type, processor) {
    this.strings = strings10;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  getHTML() {
    const l = this.strings.length - 1;
    let html2 = "";
    let isCommentBinding = false;
    for (let i2 = 0; i2 < l; i2++) {
      const s = this.strings[i2];
      const commentOpen = s.lastIndexOf("<!--");
      isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf("-->", commentOpen + 1) === -1;
      const attributeMatch = lastAttributeNameRegex.exec(s);
      if (attributeMatch === null) {
        html2 += s + (isCommentBinding ? commentMarker : nodeMarker);
      } else {
        html2 += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] + marker;
      }
    }
    html2 += this.strings[l];
    return html2;
  }
  getTemplateElement() {
    const template = document.createElement("template");
    let value = this.getHTML();
    if (policy !== void 0) {
      value = policy.createHTML(value);
    }
    template.innerHTML = value;
    return template;
  }
};

// node_modules/lit-html/lib/parts.js
var isPrimitive = (value) => {
  return value === null || !(typeof value === "object" || typeof value === "function");
};
var isIterable = (value) => {
  return Array.isArray(value) || !!(value && value[Symbol.iterator]);
};
var AttributeCommitter = class {
  constructor(element, name, strings10) {
    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings10;
    this.parts = [];
    for (let i2 = 0; i2 < strings10.length - 1; i2++) {
      this.parts[i2] = this._createPart();
    }
  }
  _createPart() {
    return new AttributePart(this);
  }
  _getValue() {
    const strings10 = this.strings;
    const l = strings10.length - 1;
    const parts2 = this.parts;
    if (l === 1 && strings10[0] === "" && strings10[1] === "") {
      const v = parts2[0].value;
      if (typeof v === "symbol") {
        return String(v);
      }
      if (typeof v === "string" || !isIterable(v)) {
        return v;
      }
    }
    let text = "";
    for (let i2 = 0; i2 < l; i2++) {
      text += strings10[i2];
      const part = parts2[i2];
      if (part !== void 0) {
        const v = part.value;
        if (isPrimitive(v) || !isIterable(v)) {
          text += typeof v === "string" ? v : String(v);
        } else {
          for (const t2 of v) {
            text += typeof t2 === "string" ? t2 : String(t2);
          }
        }
      }
    }
    text += strings10[l];
    return text;
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }
};
var AttributePart = class {
  constructor(committer) {
    this.value = void 0;
    this.committer = committer;
  }
  setValue(value) {
    if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
      this.value = value;
      if (!isDirective(value)) {
        this.committer.dirty = true;
      }
    }
  }
  commit() {
    while (isDirective(this.value)) {
      const directive2 = this.value;
      this.value = noChange;
      directive2(this);
    }
    if (this.value === noChange) {
      return;
    }
    this.committer.commit();
  }
};
var NodePart = class {
  constructor(options) {
    this.value = void 0;
    this.__pendingValue = void 0;
    this.options = options;
  }
  appendInto(container) {
    this.startNode = container.appendChild(createMarker());
    this.endNode = container.appendChild(createMarker());
  }
  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  appendIntoPart(part) {
    part.__insert(this.startNode = createMarker());
    part.__insert(this.endNode = createMarker());
  }
  insertAfterPart(ref) {
    ref.__insert(this.startNode = createMarker());
    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    if (this.startNode.parentNode === null) {
      return;
    }
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    const value = this.__pendingValue;
    if (value === noChange) {
      return;
    }
    if (isPrimitive(value)) {
      if (value !== this.value) {
        this.__commitText(value);
      }
    } else if (value instanceof TemplateResult) {
      this.__commitTemplateResult(value);
    } else if (value instanceof Node) {
      this.__commitNode(value);
    } else if (isIterable(value)) {
      this.__commitIterable(value);
    } else if (value === nothing) {
      this.value = nothing;
      this.clear();
    } else {
      this.__commitText(value);
    }
  }
  __insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }
  __commitNode(value) {
    if (this.value === value) {
      return;
    }
    this.clear();
    this.__insert(value);
    this.value = value;
  }
  __commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? "" : value;
    const valueAsString = typeof value === "string" ? value : String(value);
    if (node === this.endNode.previousSibling && node.nodeType === 3) {
      node.data = valueAsString;
    } else {
      this.__commitNode(document.createTextNode(valueAsString));
    }
    this.value = value;
  }
  __commitTemplateResult(value) {
    const template = this.options.templateFactory(value);
    if (this.value instanceof TemplateInstance && this.value.template === template) {
      this.value.update(value.values);
    } else {
      const instance = new TemplateInstance(template, value.processor, this.options);
      const fragment = instance._clone();
      instance.update(value.values);
      this.__commitNode(fragment);
      this.value = instance;
    }
  }
  __commitIterable(value) {
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    }
    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;
    for (const item of value) {
      itemPart = itemParts[partIndex];
      if (itemPart === void 0) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);
        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }
      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }
    if (partIndex < itemParts.length) {
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }
  clear(startNode = this.startNode) {
    removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }
};
var BooleanAttributePart = class {
  constructor(element, name, strings10) {
    this.value = void 0;
    this.__pendingValue = void 0;
    if (strings10.length !== 2 || strings10[0] !== "" || strings10[1] !== "") {
      throw new Error("Boolean attributes can only contain a single expression");
    }
    this.element = element;
    this.name = name;
    this.strings = strings10;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    if (this.__pendingValue === noChange) {
      return;
    }
    const value = !!this.__pendingValue;
    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, "");
      } else {
        this.element.removeAttribute(this.name);
      }
      this.value = value;
    }
    this.__pendingValue = noChange;
  }
};
var PropertyCommitter = class extends AttributeCommitter {
  constructor(element, name, strings10) {
    super(element, name, strings10);
    this.single = strings10.length === 2 && strings10[0] === "" && strings10[1] === "";
  }
  _createPart() {
    return new PropertyPart(this);
  }
  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }
    return super._getValue();
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element[this.name] = this._getValue();
    }
  }
};
var PropertyPart = class extends AttributePart {
};
var eventOptionsSupported = false;
(() => {
  try {
    const options = {
      get capture() {
        eventOptionsSupported = true;
        return false;
      }
    };
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (_e) {
  }
})();
var EventPart = class {
  constructor(element, eventName, eventContext) {
    this.value = void 0;
    this.__pendingValue = void 0;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;
    this.__boundHandleEvent = (e2) => this.handleEvent(e2);
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    if (this.__pendingValue === noChange) {
      return;
    }
    const newListener = this.__pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    if (shouldAddListener) {
      this.__options = getOptions(newListener);
      this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    this.value = newListener;
    this.__pendingValue = noChange;
  }
  handleEvent(event) {
    if (typeof this.value === "function") {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }
};
var getOptions = (o) => o && (eventOptionsSupported ? { capture: o.capture, passive: o.passive, once: o.once } : o.capture);

// node_modules/lit-html/lib/template-factory.js
function templateFactory(result) {
  let templateCache = templateCaches.get(result.type);
  if (templateCache === void 0) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    templateCaches.set(result.type, templateCache);
  }
  let template = templateCache.stringsArray.get(result.strings);
  if (template !== void 0) {
    return template;
  }
  const key = result.strings.join(marker);
  template = templateCache.keyString.get(key);
  if (template === void 0) {
    template = new Template(result, result.getTemplateElement());
    templateCache.keyString.set(key, template);
  }
  templateCache.stringsArray.set(result.strings, template);
  return template;
}
var templateCaches = new Map();

// node_modules/lit-html/lib/render.js
var parts = new WeakMap();
var render = (result, container, options) => {
  let part = parts.get(container);
  if (part === void 0) {
    removeNodes(container, container.firstChild);
    parts.set(container, part = new NodePart(Object.assign({ templateFactory }, options)));
    part.appendInto(container);
  }
  part.setValue(result);
  part.commit();
};

// node_modules/lit-html/lib/default-template-processor.js
var DefaultTemplateProcessor = class {
  handleAttributeExpressions(element, name, strings10, options) {
    const prefix = name[0];
    if (prefix === ".") {
      const committer2 = new PropertyCommitter(element, name.slice(1), strings10);
      return committer2.parts;
    }
    if (prefix === "@") {
      return [new EventPart(element, name.slice(1), options.eventContext)];
    }
    if (prefix === "?") {
      return [new BooleanAttributePart(element, name.slice(1), strings10)];
    }
    const committer = new AttributeCommitter(element, name, strings10);
    return committer.parts;
  }
  handleTextExpression(options) {
    return new NodePart(options);
  }
};
var defaultTemplateProcessor = new DefaultTemplateProcessor();

// node_modules/lit-html/lit-html.js
if (typeof window !== "undefined") {
  (window["litHtmlVersions"] || (window["litHtmlVersions"] = [])).push("1.4.1");
}
var html = (strings10, ...values) => new TemplateResult(strings10, values, "html", defaultTemplateProcessor);

// node_modules/lit-html/lib/shady-render.js
var getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;
var compatibleShadyCSSVersion = true;
if (typeof window.ShadyCSS === "undefined") {
  compatibleShadyCSSVersion = false;
} else if (typeof window.ShadyCSS.prepareTemplateDom === "undefined") {
  console.warn(`Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1.`);
  compatibleShadyCSSVersion = false;
}
var shadyTemplateFactory = (scopeName) => (result) => {
  const cacheKey = getTemplateCacheKey(result.type, scopeName);
  let templateCache = templateCaches.get(cacheKey);
  if (templateCache === void 0) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    templateCaches.set(cacheKey, templateCache);
  }
  let template = templateCache.stringsArray.get(result.strings);
  if (template !== void 0) {
    return template;
  }
  const key = result.strings.join(marker);
  template = templateCache.keyString.get(key);
  if (template === void 0) {
    const element = result.getTemplateElement();
    if (compatibleShadyCSSVersion) {
      window.ShadyCSS.prepareTemplateDom(element, scopeName);
    }
    template = new Template(result, element);
    templateCache.keyString.set(key, template);
  }
  templateCache.stringsArray.set(result.strings, template);
  return template;
};
var TEMPLATE_TYPES = ["html", "svg"];
var removeStylesFromLitTemplates = (scopeName) => {
  TEMPLATE_TYPES.forEach((type) => {
    const templates = templateCaches.get(getTemplateCacheKey(type, scopeName));
    if (templates !== void 0) {
      templates.keyString.forEach((template) => {
        const { element: { content } } = template;
        const styles = new Set();
        Array.from(content.querySelectorAll("style")).forEach((s) => {
          styles.add(s);
        });
        removeNodesFromTemplate(template, styles);
      });
    }
  });
};
var shadyRenderSet = new Set();
var prepareTemplateStyles = (scopeName, renderedDOM, template) => {
  shadyRenderSet.add(scopeName);
  const templateElement = !!template ? template.element : document.createElement("template");
  const styles = renderedDOM.querySelectorAll("style");
  const { length } = styles;
  if (length === 0) {
    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    return;
  }
  const condensedStyle = document.createElement("style");
  for (let i2 = 0; i2 < length; i2++) {
    const style16 = styles[i2];
    style16.parentNode.removeChild(style16);
    condensedStyle.textContent += style16.textContent;
  }
  removeStylesFromLitTemplates(scopeName);
  const content = templateElement.content;
  if (!!template) {
    insertNodeIntoTemplate(template, condensedStyle, content.firstChild);
  } else {
    content.insertBefore(condensedStyle, content.firstChild);
  }
  window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
  const style15 = content.querySelector("style");
  if (window.ShadyCSS.nativeShadow && style15 !== null) {
    renderedDOM.insertBefore(style15.cloneNode(true), renderedDOM.firstChild);
  } else if (!!template) {
    content.insertBefore(condensedStyle, content.firstChild);
    const removes = new Set();
    removes.add(condensedStyle);
    removeNodesFromTemplate(template, removes);
  }
};
var render2 = (result, container, options) => {
  if (!options || typeof options !== "object" || !options.scopeName) {
    throw new Error("The `scopeName` option is required.");
  }
  const scopeName = options.scopeName;
  const hasRendered = parts.has(container);
  const needsScoping = compatibleShadyCSSVersion && container.nodeType === 11 && !!container.host;
  const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
  const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
  render(result, renderContainer, Object.assign({ templateFactory: shadyTemplateFactory(scopeName) }, options));
  if (firstScopeRender) {
    const part = parts.get(renderContainer);
    parts.delete(renderContainer);
    const template = part.value instanceof TemplateInstance ? part.value.template : void 0;
    prepareTemplateStyles(scopeName, renderContainer, template);
    removeNodes(container, container.firstChild);
    container.appendChild(renderContainer);
    parts.set(container, part);
  }
  if (!hasRendered && needsScoping) {
    window.ShadyCSS.styleElement(container.host);
  }
};

// node_modules/playground-elements/node_modules/lit-element/lib/updating-element.js
var _a;
window.JSCompiler_renameProperty = (prop, _obj) => prop;
var defaultConverter = {
  toAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value ? "" : null;
      case Object:
      case Array:
        return value == null ? value : JSON.stringify(value);
    }
    return value;
  },
  fromAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value !== null;
      case Number:
        return value === null ? null : Number(value);
      case Object:
      case Array:
        return JSON.parse(value);
    }
    return value;
  }
};
var notEqual = (value, old) => {
  return old !== value && (old === old || value === value);
};
var defaultPropertyDeclaration = {
  attribute: true,
  type: String,
  converter: defaultConverter,
  reflect: false,
  hasChanged: notEqual
};
var STATE_HAS_UPDATED = 1;
var STATE_UPDATE_REQUESTED = 1 << 2;
var STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
var STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
var finalized = "finalized";
var UpdatingElement = class extends HTMLElement {
  constructor() {
    super();
    this.initialize();
  }
  static get observedAttributes() {
    this.finalize();
    const attributes = [];
    this._classProperties.forEach((v, p) => {
      const attr = this._attributeNameForProperty(p, v);
      if (attr !== void 0) {
        this._attributeToPropertyMap.set(attr, p);
        attributes.push(attr);
      }
    });
    return attributes;
  }
  static _ensureClassProperties() {
    if (!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties", this))) {
      this._classProperties = new Map();
      const superProperties = Object.getPrototypeOf(this)._classProperties;
      if (superProperties !== void 0) {
        superProperties.forEach((v, k) => this._classProperties.set(k, v));
      }
    }
  }
  static createProperty(name, options = defaultPropertyDeclaration) {
    this._ensureClassProperties();
    this._classProperties.set(name, options);
    if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
      return;
    }
    const key = typeof name === "symbol" ? Symbol() : `__${name}`;
    const descriptor = this.getPropertyDescriptor(name, key, options);
    if (descriptor !== void 0) {
      Object.defineProperty(this.prototype, name, descriptor);
    }
  }
  static getPropertyDescriptor(name, key, options) {
    return {
      get() {
        return this[key];
      },
      set(value) {
        const oldValue = this[name];
        this[key] = value;
        this.requestUpdateInternal(name, oldValue, options);
      },
      configurable: true,
      enumerable: true
    };
  }
  static getPropertyOptions(name) {
    return this._classProperties && this._classProperties.get(name) || defaultPropertyDeclaration;
  }
  static finalize() {
    const superCtor = Object.getPrototypeOf(this);
    if (!superCtor.hasOwnProperty(finalized)) {
      superCtor.finalize();
    }
    this[finalized] = true;
    this._ensureClassProperties();
    this._attributeToPropertyMap = new Map();
    if (this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
      const props = this.properties;
      const propKeys = [
        ...Object.getOwnPropertyNames(props),
        ...typeof Object.getOwnPropertySymbols === "function" ? Object.getOwnPropertySymbols(props) : []
      ];
      for (const p of propKeys) {
        this.createProperty(p, props[p]);
      }
    }
  }
  static _attributeNameForProperty(name, options) {
    const attribute = options.attribute;
    return attribute === false ? void 0 : typeof attribute === "string" ? attribute : typeof name === "string" ? name.toLowerCase() : void 0;
  }
  static _valueHasChanged(value, old, hasChanged = notEqual) {
    return hasChanged(value, old);
  }
  static _propertyValueFromAttribute(value, options) {
    const type = options.type;
    const converter = options.converter || defaultConverter;
    const fromAttribute = typeof converter === "function" ? converter : converter.fromAttribute;
    return fromAttribute ? fromAttribute(value, type) : value;
  }
  static _propertyValueToAttribute(value, options) {
    if (options.reflect === void 0) {
      return;
    }
    const type = options.type;
    const converter = options.converter;
    const toAttribute = converter && converter.toAttribute || defaultConverter.toAttribute;
    return toAttribute(value, type);
  }
  initialize() {
    this._updateState = 0;
    this._updatePromise = new Promise((res) => this._enableUpdatingResolver = res);
    this._changedProperties = new Map();
    this._saveInstanceProperties();
    this.requestUpdateInternal();
  }
  _saveInstanceProperties() {
    this.constructor._classProperties.forEach((_v, p) => {
      if (this.hasOwnProperty(p)) {
        const value = this[p];
        delete this[p];
        if (!this._instanceProperties) {
          this._instanceProperties = new Map();
        }
        this._instanceProperties.set(p, value);
      }
    });
  }
  _applyInstanceProperties() {
    this._instanceProperties.forEach((v, p) => this[p] = v);
    this._instanceProperties = void 0;
  }
  connectedCallback() {
    this.enableUpdating();
  }
  enableUpdating() {
    if (this._enableUpdatingResolver !== void 0) {
      this._enableUpdatingResolver();
      this._enableUpdatingResolver = void 0;
    }
  }
  disconnectedCallback() {
  }
  attributeChangedCallback(name, old, value) {
    if (old !== value) {
      this._attributeToProperty(name, value);
    }
  }
  _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
    const ctor = this.constructor;
    const attr = ctor._attributeNameForProperty(name, options);
    if (attr !== void 0) {
      const attrValue = ctor._propertyValueToAttribute(value, options);
      if (attrValue === void 0) {
        return;
      }
      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;
      if (attrValue == null) {
        this.removeAttribute(attr);
      } else {
        this.setAttribute(attr, attrValue);
      }
      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
    }
  }
  _attributeToProperty(name, value) {
    if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
      return;
    }
    const ctor = this.constructor;
    const propName = ctor._attributeToPropertyMap.get(name);
    if (propName !== void 0) {
      const options = ctor.getPropertyOptions(propName);
      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
      this[propName] = ctor._propertyValueFromAttribute(value, options);
      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
    }
  }
  requestUpdateInternal(name, oldValue, options) {
    let shouldRequestUpdate = true;
    if (name !== void 0) {
      const ctor = this.constructor;
      options = options || ctor.getPropertyOptions(name);
      if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
        if (!this._changedProperties.has(name)) {
          this._changedProperties.set(name, oldValue);
        }
        if (options.reflect === true && !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
          if (this._reflectingProperties === void 0) {
            this._reflectingProperties = new Map();
          }
          this._reflectingProperties.set(name, options);
        }
      } else {
        shouldRequestUpdate = false;
      }
    }
    if (!this._hasRequestedUpdate && shouldRequestUpdate) {
      this._updatePromise = this._enqueueUpdate();
    }
  }
  requestUpdate(name, oldValue) {
    this.requestUpdateInternal(name, oldValue);
    return this.updateComplete;
  }
  async _enqueueUpdate() {
    this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
    try {
      await this._updatePromise;
    } catch (e2) {
    }
    const result = this.performUpdate();
    if (result != null) {
      await result;
    }
    return !this._hasRequestedUpdate;
  }
  get _hasRequestedUpdate() {
    return this._updateState & STATE_UPDATE_REQUESTED;
  }
  get hasUpdated() {
    return this._updateState & STATE_HAS_UPDATED;
  }
  performUpdate() {
    if (!this._hasRequestedUpdate) {
      return;
    }
    if (this._instanceProperties) {
      this._applyInstanceProperties();
    }
    let shouldUpdate = false;
    const changedProperties = this._changedProperties;
    try {
      shouldUpdate = this.shouldUpdate(changedProperties);
      if (shouldUpdate) {
        this.update(changedProperties);
      } else {
        this._markUpdated();
      }
    } catch (e2) {
      shouldUpdate = false;
      this._markUpdated();
      throw e2;
    }
    if (shouldUpdate) {
      if (!(this._updateState & STATE_HAS_UPDATED)) {
        this._updateState = this._updateState | STATE_HAS_UPDATED;
        this.firstUpdated(changedProperties);
      }
      this.updated(changedProperties);
    }
  }
  _markUpdated() {
    this._changedProperties = new Map();
    this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
  }
  get updateComplete() {
    return this._getUpdateComplete();
  }
  _getUpdateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._updatePromise;
  }
  shouldUpdate(_changedProperties) {
    return true;
  }
  update(_changedProperties) {
    if (this._reflectingProperties !== void 0 && this._reflectingProperties.size > 0) {
      this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));
      this._reflectingProperties = void 0;
    }
    this._markUpdated();
  }
  updated(_changedProperties) {
  }
  firstUpdated(_changedProperties) {
  }
};
_a = finalized;
UpdatingElement[_a] = true;

// node_modules/playground-elements/node_modules/lit-element/lib/decorators.js
var legacyCustomElement = (tagName, clazz) => {
  window.customElements.define(tagName, clazz);
  return clazz;
};
var standardCustomElement = (tagName, descriptor) => {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    finisher(clazz) {
      window.customElements.define(tagName, clazz);
    }
  };
};
var customElement = (tagName) => (classOrDescriptor) => typeof classOrDescriptor === "function" ? legacyCustomElement(tagName, classOrDescriptor) : standardCustomElement(tagName, classOrDescriptor);
var standardProperty = (options, element) => {
  if (element.kind === "method" && element.descriptor && !("value" in element.descriptor)) {
    return Object.assign(Object.assign({}, element), { finisher(clazz) {
      clazz.createProperty(element.key, options);
    } });
  } else {
    return {
      kind: "field",
      key: Symbol(),
      placement: "own",
      descriptor: {},
      initializer() {
        if (typeof element.initializer === "function") {
          this[element.key] = element.initializer.call(this);
        }
      },
      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }
    };
  }
};
var legacyProperty = (options, proto, name) => {
  proto.constructor.createProperty(name, options);
};
function property(options) {
  return (protoOrDescriptor, name) => name !== void 0 ? legacyProperty(options, protoOrDescriptor, name) : standardProperty(options, protoOrDescriptor);
}
function internalProperty(options) {
  return property({ attribute: false, hasChanged: options === null || options === void 0 ? void 0 : options.hasChanged });
}
function query(selector, cache) {
  return (protoOrDescriptor, name) => {
    const descriptor = {
      get() {
        return this.renderRoot.querySelector(selector);
      },
      enumerable: true,
      configurable: true
    };
    if (cache) {
      const prop = name !== void 0 ? name : protoOrDescriptor.key;
      const key = typeof prop === "symbol" ? Symbol() : `__${prop}`;
      descriptor.get = function() {
        if (this[key] === void 0) {
          this[key] = this.renderRoot.querySelector(selector);
        }
        return this[key];
      };
    }
    return name !== void 0 ? legacyQuery(descriptor, protoOrDescriptor, name) : standardQuery(descriptor, protoOrDescriptor);
  };
}
var legacyQuery = (descriptor, proto, name) => {
  Object.defineProperty(proto, name, descriptor);
};
var standardQuery = (descriptor, element) => ({
  kind: "method",
  placement: "prototype",
  key: element.key,
  descriptor
});
var ElementProto = Element.prototype;
var legacyMatches = ElementProto.msMatchesSelector || ElementProto.webkitMatchesSelector;

// node_modules/playground-elements/node_modules/lit-element/lib/css-tag.js
var supportsAdoptingStyleSheets = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var constructionToken = Symbol();
var CSSResult = class {
  constructor(cssText, safeToken) {
    if (safeToken !== constructionToken) {
      throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    }
    this.cssText = cssText;
  }
  get styleSheet() {
    if (this._styleSheet === void 0) {
      if (supportsAdoptingStyleSheets) {
        this._styleSheet = new CSSStyleSheet();
        this._styleSheet.replaceSync(this.cssText);
      } else {
        this._styleSheet = null;
      }
    }
    return this._styleSheet;
  }
  toString() {
    return this.cssText;
  }
};
var unsafeCSS = (value) => {
  return new CSSResult(String(value), constructionToken);
};
var textFromCSSResult = (value) => {
  if (value instanceof CSSResult) {
    return value.cssText;
  } else if (typeof value === "number") {
    return value;
  } else {
    throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
  }
};
var css = (strings10, ...values) => {
  const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings10[idx + 1], strings10[0]);
  return new CSSResult(cssText, constructionToken);
};

// node_modules/playground-elements/node_modules/lit-element/lit-element.js
(window["litElementVersions"] || (window["litElementVersions"] = [])).push("2.5.1");
var renderNotImplemented = {};
var LitElement = class extends UpdatingElement {
  static getStyles() {
    return this.styles;
  }
  static _getUniqueStyles() {
    if (this.hasOwnProperty(JSCompiler_renameProperty("_styles", this))) {
      return;
    }
    const userStyles = this.getStyles();
    if (Array.isArray(userStyles)) {
      const addStyles = (styles2, set2) => styles2.reduceRight((set3, s) => Array.isArray(s) ? addStyles(s, set3) : (set3.add(s), set3), set2);
      const set = addStyles(userStyles, new Set());
      const styles = [];
      set.forEach((v) => styles.unshift(v));
      this._styles = styles;
    } else {
      this._styles = userStyles === void 0 ? [] : [userStyles];
    }
    this._styles = this._styles.map((s) => {
      if (s instanceof CSSStyleSheet && !supportsAdoptingStyleSheets) {
        const cssText = Array.prototype.slice.call(s.cssRules).reduce((css3, rule) => css3 + rule.cssText, "");
        return unsafeCSS(cssText);
      }
      return s;
    });
  }
  initialize() {
    super.initialize();
    this.constructor._getUniqueStyles();
    this.renderRoot = this.createRenderRoot();
    if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
      this.adoptStyles();
    }
  }
  createRenderRoot() {
    return this.attachShadow(this.constructor.shadowRootOptions);
  }
  adoptStyles() {
    const styles = this.constructor._styles;
    if (styles.length === 0) {
      return;
    }
    if (window.ShadyCSS !== void 0 && !window.ShadyCSS.nativeShadow) {
      window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map((s) => s.cssText), this.localName);
    } else if (supportsAdoptingStyleSheets) {
      this.renderRoot.adoptedStyleSheets = styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
    } else {
      this._needsShimAdoptedStyleSheets = true;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.hasUpdated && window.ShadyCSS !== void 0) {
      window.ShadyCSS.styleElement(this);
    }
  }
  update(changedProperties) {
    const templateResult = this.render();
    super.update(changedProperties);
    if (templateResult !== renderNotImplemented) {
      this.constructor.render(templateResult, this.renderRoot, { scopeName: this.localName, eventContext: this });
    }
    if (this._needsShimAdoptedStyleSheets) {
      this._needsShimAdoptedStyleSheets = false;
      this.constructor._styles.forEach((s) => {
        const style15 = document.createElement("style");
        style15.textContent = s.cssText;
        this.renderRoot.appendChild(style15);
      });
    }
  }
  render() {
    return renderNotImplemented;
  }
};
LitElement["finalized"] = true;
LitElement.render = render2;
LitElement.shadowRootOptions = { mode: "open" };

// node_modules/comlink/dist/esm/comlink.mjs
var proxyMarker = Symbol("Comlink.proxy");
var createEndpoint = Symbol("Comlink.endpoint");
var releaseProxy = Symbol("Comlink.releaseProxy");
var throwMarker = Symbol("Comlink.thrown");
var isObject = (val) => typeof val === "object" && val !== null || typeof val === "function";
var proxyTransferHandler = {
  canHandle: (val) => isObject(val) && val[proxyMarker],
  serialize(obj) {
    const { port1, port2 } = new MessageChannel();
    expose(obj, port1);
    return [port2, [port2]];
  },
  deserialize(port) {
    port.start();
    return wrap(port);
  }
};
var throwTransferHandler = {
  canHandle: (value) => isObject(value) && throwMarker in value,
  serialize({ value }) {
    let serialized;
    if (value instanceof Error) {
      serialized = {
        isError: true,
        value: {
          message: value.message,
          name: value.name,
          stack: value.stack
        }
      };
    } else {
      serialized = { isError: false, value };
    }
    return [serialized, []];
  },
  deserialize(serialized) {
    if (serialized.isError) {
      throw Object.assign(new Error(serialized.value.message), serialized.value);
    }
    throw serialized.value;
  }
};
var transferHandlers = new Map([
  ["proxy", proxyTransferHandler],
  ["throw", throwTransferHandler]
]);
function expose(obj, ep = self) {
  ep.addEventListener("message", function callback(ev) {
    if (!ev || !ev.data) {
      return;
    }
    const { id, type, path } = Object.assign({ path: [] }, ev.data);
    const argumentList = (ev.data.argumentList || []).map(fromWireValue);
    let returnValue;
    try {
      const parent = path.slice(0, -1).reduce((obj2, prop) => obj2[prop], obj);
      const rawValue = path.reduce((obj2, prop) => obj2[prop], obj);
      switch (type) {
        case "GET":
          {
            returnValue = rawValue;
          }
          break;
        case "SET":
          {
            parent[path.slice(-1)[0]] = fromWireValue(ev.data.value);
            returnValue = true;
          }
          break;
        case "APPLY":
          {
            returnValue = rawValue.apply(parent, argumentList);
          }
          break;
        case "CONSTRUCT":
          {
            const value = new rawValue(...argumentList);
            returnValue = proxy(value);
          }
          break;
        case "ENDPOINT":
          {
            const { port1, port2 } = new MessageChannel();
            expose(obj, port2);
            returnValue = transfer(port1, [port1]);
          }
          break;
        case "RELEASE":
          {
            returnValue = void 0;
          }
          break;
        default:
          return;
      }
    } catch (value) {
      returnValue = { value, [throwMarker]: 0 };
    }
    Promise.resolve(returnValue).catch((value) => {
      return { value, [throwMarker]: 0 };
    }).then((returnValue2) => {
      const [wireValue, transferables] = toWireValue(returnValue2);
      ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
      if (type === "RELEASE") {
        ep.removeEventListener("message", callback);
        closeEndPoint(ep);
      }
    });
  });
  if (ep.start) {
    ep.start();
  }
}
function isMessagePort(endpoint) {
  return endpoint.constructor.name === "MessagePort";
}
function closeEndPoint(endpoint) {
  if (isMessagePort(endpoint))
    endpoint.close();
}
function wrap(ep, target) {
  return createProxy(ep, [], target);
}
function throwIfProxyReleased(isReleased) {
  if (isReleased) {
    throw new Error("Proxy has been released and is not useable");
  }
}
function createProxy(ep, path = [], target = function() {
}) {
  let isProxyReleased = false;
  const proxy2 = new Proxy(target, {
    get(_target, prop) {
      throwIfProxyReleased(isProxyReleased);
      if (prop === releaseProxy) {
        return () => {
          return requestResponseMessage(ep, {
            type: "RELEASE",
            path: path.map((p) => p.toString())
          }).then(() => {
            closeEndPoint(ep);
            isProxyReleased = true;
          });
        };
      }
      if (prop === "then") {
        if (path.length === 0) {
          return { then: () => proxy2 };
        }
        const r2 = requestResponseMessage(ep, {
          type: "GET",
          path: path.map((p) => p.toString())
        }).then(fromWireValue);
        return r2.then.bind(r2);
      }
      return createProxy(ep, [...path, prop]);
    },
    set(_target, prop, rawValue) {
      throwIfProxyReleased(isProxyReleased);
      const [value, transferables] = toWireValue(rawValue);
      return requestResponseMessage(ep, {
        type: "SET",
        path: [...path, prop].map((p) => p.toString()),
        value
      }, transferables).then(fromWireValue);
    },
    apply(_target, _thisArg, rawArgumentList) {
      throwIfProxyReleased(isProxyReleased);
      const last = path[path.length - 1];
      if (last === createEndpoint) {
        return requestResponseMessage(ep, {
          type: "ENDPOINT"
        }).then(fromWireValue);
      }
      if (last === "bind") {
        return createProxy(ep, path.slice(0, -1));
      }
      const [argumentList, transferables] = processArguments(rawArgumentList);
      return requestResponseMessage(ep, {
        type: "APPLY",
        path: path.map((p) => p.toString()),
        argumentList
      }, transferables).then(fromWireValue);
    },
    construct(_target, rawArgumentList) {
      throwIfProxyReleased(isProxyReleased);
      const [argumentList, transferables] = processArguments(rawArgumentList);
      return requestResponseMessage(ep, {
        type: "CONSTRUCT",
        path: path.map((p) => p.toString()),
        argumentList
      }, transferables).then(fromWireValue);
    }
  });
  return proxy2;
}
function myFlat(arr) {
  return Array.prototype.concat.apply([], arr);
}
function processArguments(argumentList) {
  const processed = argumentList.map(toWireValue);
  return [processed.map((v) => v[0]), myFlat(processed.map((v) => v[1]))];
}
var transferCache = new WeakMap();
function transfer(obj, transfers) {
  transferCache.set(obj, transfers);
  return obj;
}
function proxy(obj) {
  return Object.assign(obj, { [proxyMarker]: true });
}
function toWireValue(value) {
  for (const [name, handler] of transferHandlers) {
    if (handler.canHandle(value)) {
      const [serializedValue, transferables] = handler.serialize(value);
      return [
        {
          type: "HANDLER",
          name,
          value: serializedValue
        },
        transferables
      ];
    }
  }
  return [
    {
      type: "RAW",
      value
    },
    transferCache.get(value) || []
  ];
}
function fromWireValue(value) {
  switch (value.type) {
    case "HANDLER":
      return transferHandlers.get(value.name).deserialize(value.value);
    case "RAW":
      return value.value;
  }
}
function requestResponseMessage(ep, msg, transfers) {
  return new Promise((resolve) => {
    const id = generateUUID();
    ep.addEventListener("message", function l(ev) {
      if (!ev.data || !ev.data.id || ev.data.id !== id) {
        return;
      }
      ep.removeEventListener("message", l);
      resolve(ev.data);
    });
    if (ep.start) {
      ep.start();
    }
    ep.postMessage(Object.assign({ id }, msg), transfers);
  });
}
function generateUUID() {
  return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
}

// node_modules/playground-elements/shared/worker-api.js
var CONFIGURE_PROXY = 1;
var CONNECT_PROJECT_TO_SW = 3;
var ACKNOWLEDGE_SW_CONNECTION = 4;

// node_modules/playground-elements/shared/util.js
var endWithSlash = (s) => s.endsWith("/") ? s : s + "/";
var getRandomString = () => crypto.getRandomValues(new Uint32Array(1))[0].toString(32);
var forceSkypackRawMode = (url) => {
  if (url.hostname === "cdn.skypack.dev") {
    url.pathname = url.pathname.replace(/mode=imports\/(un)?optimized/, "mode=raw");
  }
  return url;
};

// node_modules/playground-elements/lib/version.js
var version = "0.9.4";

// node_modules/playground-elements/shared/deferred.js
var Deferred = class {
  constructor() {
    this.resolved = false;
    this.promise = new Promise((resolve) => {
      this._resolve = resolve;
    });
  }
  resolve(value) {
    this.resolved = true;
    this._resolve(value);
  }
};

// node_modules/playground-elements/playground-project.js
var sessions = new Set();
var generateUniqueSessionId = () => {
  let sessionId;
  do {
    sessionId = getRandomString();
  } while (sessions.has(sessionId));
  sessions.add(sessionId);
  return sessionId;
};
var nextCompileId = 0;
var PlaygroundProject = class PlaygroundProject2 extends LitElement {
  constructor() {
    super(...arguments);
    this._source = { type: "none" };
    this.sandboxBaseUrl = `https://unpkg.com/playground-elements@${version}/`;
    this.sandboxScope = "playground-projects/";
    this._sessionId = generateUniqueSessionId();
    this._deferredTypeScriptWorkerApi = new Deferred();
    this._compileResultPromise = Promise.resolve(void 0);
    this._validImportMap = {};
    this._compileId = nextCompileId++;
    this._saveTimeoutId = void 0;
    this.lastSave = Promise.resolve();
    this.savePending = false;
  }
  get projectSrc() {
    if (this._source.type === "url") {
      return this._source.url;
    }
    return void 0;
  }
  set projectSrc(url) {
    if (url) {
      if (this._source.type !== "url" || this._source.url !== url) {
        this._source = { type: "url", url };
      }
    } else if (this._source.type === "url") {
      this._source = { type: "none" };
    }
  }
  get config() {
    var _a4;
    return {
      files: Object.fromEntries(((_a4 = this._files) !== null && _a4 !== void 0 ? _a4 : []).map((file) => [
        file.name,
        {
          ...file,
          name: void 0
        }
      ])),
      importMap: this._validImportMap
    };
  }
  set config(config) {
    if (config) {
      this._source = { type: "direct", config };
    } else if (this._source.type === "direct") {
      this._source = { type: "none" };
    }
  }
  get files() {
    return this._files;
  }
  get diagnostics() {
    return this._diagnostics;
  }
  set _importMap(importMap) {
    const errors = validateImportMap(importMap);
    if (errors.length > 0) {
      for (const error of errors) {
        console.error(error);
      }
      this._validImportMap = {};
    } else {
      this._validImportMap = importMap;
    }
  }
  get _importMap() {
    return this._validImportMap;
  }
  get _normalizedSandboxBaseUrl() {
    const url = new URL(this.sandboxBaseUrl, document.location.href);
    url.pathname = endWithSlash(url.pathname);
    return url;
  }
  get baseUrl() {
    if (this._serviceWorkerAPI === void 0 || this._files === void 0) {
      return void 0;
    }
    const indexUrl = new URL(`${endWithSlash(this.sandboxScope)}${this._sessionId}/`, this._normalizedSandboxBaseUrl);
    return indexUrl.href;
  }
  get _serviceWorkerProxyIframeUrl() {
    return new URL(`playground-service-worker-proxy.html#playground-session-id=${this._sessionId}`, this._normalizedSandboxBaseUrl).href;
  }
  async update(changedProperties) {
    if (changedProperties.has("_source")) {
      this._loadProjectFromSource();
    }
    if (changedProperties.has("sandboxScope") || changedProperties.has("sandboxBaseUrl") || changedProperties.has("_serviceWorkerAPI")) {
      this.dispatchEvent(new CustomEvent("urlChanged"));
    }
    super.update(changedProperties);
  }
  async _loadProjectFromSource() {
    const source = this._source;
    switch (source.type) {
      case "none":
        this._files = void 0;
        this._importMap = {};
        break;
      case "direct":
        {
          const { files, importMap } = await expandProjectConfig(source.config, document.baseURI);
          if (source !== this._source) {
            return;
          }
          this._files = files;
          this._importMap = importMap;
        }
        break;
      case "slot":
        this._files = source.files;
        this._importMap = source.importMap;
        break;
      case "url":
        {
          const { files, importMap } = await fetchProjectConfig(new URL(source.url, document.baseURI).href);
          if (source !== this._source) {
            return;
          }
          this._files = files;
          this._importMap = importMap;
        }
        break;
      default:
        source;
        break;
    }
    this.dispatchEvent(new CustomEvent("filesChanged"));
    this.save();
  }
  render() {
    return html`
      <slot @slotchange=${this._slotChange}></slot>
      <iframe
        src=${this._serviceWorkerProxyIframeUrl}
        @load=${this._onServiceWorkerProxyIframeLoad}
      ></iframe>
    `;
  }
  _slotChange(_e) {
    const { type } = this._source;
    if (type !== "none" && type !== "slot") {
      return;
    }
    const files = [];
    let importMap = void 0;
    for (const s of this._slot.assignedElements({ flatten: true })) {
      const typeAttr = s.getAttribute("type");
      if (!(typeAttr === null || typeAttr === void 0 ? void 0 : typeAttr.startsWith("sample/"))) {
        continue;
      }
      const fileType = typeAttr.substring("sample/".length);
      let content = s.textContent.replace("&lt;", "<");
      if (!s.hasAttribute("preserve-whitespace")) {
        content = outdent(content);
      }
      if (fileType === "importmap") {
        try {
          importMap = JSON.parse(content);
        } catch {
          console.error("Invalid import map JSON", s);
        }
      } else {
        const name = s.getAttribute("filename");
        if (!name) {
          continue;
        }
        const label = s.getAttribute("label") || void 0;
        const contentType = typeEnumToMimeType(fileType);
        files.push({
          name,
          label,
          hidden: s.hasAttribute("hidden"),
          content,
          contentType
        });
      }
    }
    if (files.length > 0 || importMap !== void 0) {
      this._source = { type: "slot", files, importMap: importMap !== null && importMap !== void 0 ? importMap : {} };
    }
  }
  async firstUpdated() {
    const typescriptWorkerScriptUrl = forceSkypackRawMode(new URL("./playground-typescript-worker.js", import.meta.url));
    let worker;
    if (typescriptWorkerScriptUrl.origin === window.location.origin) {
      worker = new Worker(typescriptWorkerScriptUrl);
    } else {
      const resp = await fetch(typescriptWorkerScriptUrl.href);
      const text = await resp.text();
      const blobUrl = URL.createObjectURL(new Blob([text], { type: "application/javascript" }));
      worker = new Worker(blobUrl);
      URL.revokeObjectURL(blobUrl);
    }
    this._deferredTypeScriptWorkerApi.resolve(wrap(worker));
  }
  _onServiceWorkerProxyIframeLoad() {
    const iframeWindow = this._iframe.contentWindow;
    if (!iframeWindow) {
      throw new Error("Unexpected internal error: <playground-project> service worker proxy iframe had no contentWindow");
    }
    const { port1, port2 } = new MessageChannel();
    port1.addEventListener("message", (event) => {
      if (event.data.type === CONNECT_PROJECT_TO_SW) {
        this._onNewServiceWorkerPort(event.data.port);
      }
    });
    port1.start();
    const configureMessage = {
      type: CONFIGURE_PROXY,
      url: "playground-service-worker.js",
      scope: this.sandboxScope,
      port: port2
    };
    iframeWindow.postMessage(configureMessage, "*", [configureMessage.port]);
  }
  _onNewServiceWorkerPort(port) {
    const onMessage = (e2) => {
      if (e2.data.type === ACKNOWLEDGE_SW_CONNECTION) {
        port.removeEventListener("message", onMessage);
        this._serviceWorkerAPI = wrap(port);
        this._serviceWorkerAPI.setFileAPI(proxy({
          getFile: (name) => this._getFile(name)
        }), this._sessionId);
      }
    };
    port.addEventListener("message", onMessage);
    port.start();
  }
  async _getFile(name) {
    var _a4, _b2, _c, _d;
    await this._compileResultPromise;
    const compiledUrl = new URL(name, window.origin).href;
    const compiledContent = (_a4 = this._compiledFiles) === null || _a4 === void 0 ? void 0 : _a4.get(compiledUrl);
    if (compiledContent !== void 0) {
      return {
        name,
        label: (_c = (_b2 = this._files) === null || _b2 === void 0 ? void 0 : _b2.find((f) => f.name === name)) === null || _c === void 0 ? void 0 : _c.label,
        content: compiledContent,
        contentType: "application/javascript"
      };
    } else {
      return (_d = this._files) === null || _d === void 0 ? void 0 : _d.find((f) => f.name === name);
    }
  }
  async save() {
    const compileId = nextCompileId++;
    this._compileId = compileId;
    const compileStale = () => compileId !== this._compileId;
    this._clearSaveTimeout();
    this._compiledFiles = void 0;
    this.dispatchEvent(new CustomEvent("compileStart"));
    if (this._files !== void 0) {
      const workerApi = await this._deferredTypeScriptWorkerApi.promise;
      if (compileStale()) {
        return;
      }
      this._compileResultPromise = workerApi.compileProject(this._files, this._importMap, proxy((slowDiagnostics) => {
        if (compileStale() || slowDiagnostics.size === 0) {
          return;
        }
        this._diagnostics = this._diagnostics !== void 0 ? mergeArrayMaps(this._diagnostics, slowDiagnostics) : slowDiagnostics;
        this.dispatchEvent(new CustomEvent("diagnosticsChanged"));
      }));
      const result = await this._compileResultPromise;
      if (compileStale()) {
        return;
      }
      this._compiledFiles = result === null || result === void 0 ? void 0 : result.files;
      this._diagnostics = result === null || result === void 0 ? void 0 : result.diagnostics;
    } else {
      this._compileResultPromise = Promise.resolve(void 0);
    }
    this.dispatchEvent(new CustomEvent("compileDone"));
    this.dispatchEvent(new CustomEvent("diagnosticsChanged"));
  }
  _clearSaveTimeout() {
    if (this._saveTimeoutId !== void 0) {
      clearTimeout(this._saveTimeoutId);
      this._saveTimeoutId = void 0;
    }
  }
  async saveDebounced() {
    if (this.savePending) {
      return;
    }
    this.savePending = true;
    await this.lastSave;
    this.savePending = false;
    this.lastSave = this.save();
  }
  isValidNewFilename(name) {
    return !!name && !!this._files && !this._files.some((file) => file.name === name);
  }
  addFile(name) {
    if (!this._files) {
      return;
    }
    if (!this.isValidNewFilename(name)) {
      return;
    }
    this._files = [
      ...this._files,
      { name, content: "", contentType: typeFromFilename(name) }
    ];
    this.dispatchEvent(new CustomEvent("filesChanged"));
    this.save();
  }
  deleteFile(filename) {
    var _a4;
    this._files = (_a4 = this._files) === null || _a4 === void 0 ? void 0 : _a4.filter((file) => file.name !== filename);
    this.dispatchEvent(new CustomEvent("filesChanged"));
    this.save();
  }
  renameFile(oldName, newName) {
    if (!oldName || !this._files) {
      return;
    }
    if (!this.isValidNewFilename(newName)) {
      return;
    }
    const file = this._files.find((file2) => file2.name === oldName);
    if (!file) {
      return;
    }
    file.name = newName;
    file.contentType = typeFromFilename(newName);
    this._files = [...this._files];
    this.dispatchEvent(new CustomEvent("filesChanged"));
    this.save();
  }
};
PlaygroundProject.styles = css`
    iframe {
      display: none;
    }
  `;
__decorate([
  property({ attribute: "project-src", hasChanged: () => false })
], PlaygroundProject.prototype, "projectSrc", null);
__decorate([
  property({ attribute: false, hasChanged: () => false })
], PlaygroundProject.prototype, "config", null);
__decorate([
  internalProperty()
], PlaygroundProject.prototype, "_source", void 0);
__decorate([
  property({ attribute: "sandbox-base-url" })
], PlaygroundProject.prototype, "sandboxBaseUrl", void 0);
__decorate([
  property({ attribute: "sandbox-scope" })
], PlaygroundProject.prototype, "sandboxScope", void 0);
__decorate([
  internalProperty()
], PlaygroundProject.prototype, "_serviceWorkerAPI", void 0);
__decorate([
  query("slot")
], PlaygroundProject.prototype, "_slot", void 0);
__decorate([
  query("iframe")
], PlaygroundProject.prototype, "_iframe", void 0);
PlaygroundProject = __decorate([
  customElement("playground-project")
], PlaygroundProject);
var fetchProjectConfig = async (url, alreadyFetchedFilenames = new Set(), alreadyFetchedConfigUrls = new Set()) => {
  if (alreadyFetchedConfigUrls.has(url)) {
    throw new Error(`Circular project config extends: ${[
      ...alreadyFetchedConfigUrls.values(),
      url
    ].join(" extends ")}`);
  }
  alreadyFetchedConfigUrls.add(url);
  const resp = await fetch(url);
  if (resp.status !== 200) {
    throw new Error(`Error ${resp.status} fetching project config from ${url}: ${await resp.text()}`);
  }
  let config;
  try {
    config = await resp.json();
  } catch (e2) {
    throw new Error(`Error parsing project config JSON from ${url}: ${e2.message}`);
  }
  return await expandProjectConfig(config, url, alreadyFetchedFilenames, alreadyFetchedConfigUrls);
};
var expandProjectConfig = async (config, baseUrl, alreadyFetchedFilenames = new Set(), alreadyFetchedConfigUrls = new Set()) => {
  var _a4, _b2, _c, _d, _f;
  const filePromises = [];
  for (const [filename, info] of Object.entries((_a4 = config.files) !== null && _a4 !== void 0 ? _a4 : {})) {
    if (alreadyFetchedFilenames.has(filename)) {
      continue;
    }
    alreadyFetchedFilenames.add(filename);
    if (info.content === void 0) {
      filePromises.push((async () => {
        var _a5;
        const resp = await fetch(new URL(filename, baseUrl).href);
        return {
          ...info,
          name: filename,
          content: await resp.text(),
          contentType: (_a5 = resp.headers.get("Content-Type")) !== null && _a5 !== void 0 ? _a5 : "text/plain"
        };
      })());
    } else {
      filePromises.push(Promise.resolve({
        ...info,
        name: filename,
        content: (_b2 = info.content) !== null && _b2 !== void 0 ? _b2 : "",
        contentType: (_c = typeFromFilename(filename)) !== null && _c !== void 0 ? _c : "text/plain"
      }));
    }
  }
  const extendsConfigPromise = config.extends ? fetchProjectConfig(new URL(config.extends, baseUrl).href, alreadyFetchedFilenames, alreadyFetchedConfigUrls) : void 0;
  const files = await Promise.all(filePromises);
  const importMap = (_d = config.importMap) !== null && _d !== void 0 ? _d : {};
  if (extendsConfigPromise) {
    const extendsConfig = await extendsConfigPromise;
    files.push(...extendsConfig.files);
    importMap.imports = {
      ...(_f = extendsConfig.importMap) === null || _f === void 0 ? void 0 : _f.imports,
      ...importMap.imports
    };
  }
  return { files, importMap };
};
var typeFromFilename = (filename) => {
  const idx = filename.lastIndexOf(".");
  if (idx === -1 || idx === filename.length - 1) {
    return void 0;
  }
  const extension = filename.slice(idx + 1);
  return typeEnumToMimeType(extension);
};
var typeEnumToMimeType = (type) => {
  if (type === void 0) {
    return;
  }
  switch (type) {
    case "ts":
      return "video/mp2t";
    case "js":
      return "application/javascript; charset=utf-8";
    case "json":
      return "application/json; charset=utf-8";
    case "html":
      return "text/html; charset=utf-8";
    case "css":
      return "text/css; charset=utf-8";
  }
  return void 0;
};
var validateImportMap = (importMap) => {
  const errors = [];
  if (typeof importMap !== "object" || importMap === null) {
    errors.push(`Import map is invalid because it must be an object, but it was ${importMap === null ? "null" : typeof importMap}.`);
    return errors;
  }
  const invalidKeys = Object.keys(importMap).filter((key) => key !== "imports");
  if (invalidKeys.length > 0) {
    errors.push(`Invalid import map properties: ${[...invalidKeys].join(", ")}. Only "imports" are currently supported.`);
  }
  const imports = importMap.imports;
  if (imports === void 0) {
    return errors;
  }
  if (typeof imports !== "object" || imports === null) {
    errors.push(`Import map "imports" property is invalid because it must be an object, but it was ${imports === null ? "null" : typeof imports}.`);
    return errors;
  }
  for (const [specifierKey, resolutionResult] of Object.entries(imports)) {
    if (typeof resolutionResult !== "string") {
      errors.push(`Import map key "${specifierKey}" is invalid because address must be a string, but was ${resolutionResult === null ? "null" : typeof resolutionResult}`);
      continue;
    }
    if (specifierKey.endsWith("/") && !resolutionResult.endsWith("/")) {
      errors.push(`Import map key "${specifierKey}" is invalid because address "${resolutionResult}" must end in a forward-slash.`);
    }
    try {
      new URL(resolutionResult, import.meta.url);
    } catch {
      errors.push(`Import map key "${specifierKey}" is invalid because address "${resolutionResult}" is not a valid URL.`);
    }
  }
  return errors;
};
var outdent = (str) => {
  str = str.replace(/(^[\n\s]*\n)|(\n[\n\s]*$)/g, "");
  let shortestIndent;
  for (const line of str.split(/\n/g)) {
    const indent = line.match(/^\s*/)[0].length;
    if (shortestIndent === void 0 || indent < shortestIndent) {
      shortestIndent = indent;
    }
  }
  return str.replace(RegExp(`^\\s{${shortestIndent !== null && shortestIndent !== void 0 ? shortestIndent : 0}}`, "gm"), "");
};
var mergeArrayMaps = (...sources) => {
  const target = new Map();
  for (const source of sources) {
    for (const [key, vals] of source) {
      let arr = target.get(key);
      if (arr === void 0) {
        arr = [];
        target.set(key, arr);
      }
      arr.push(...vals);
    }
  }
  return target;
};

// node_modules/lit-element/lib/updating-element.js
var _a2;
window.JSCompiler_renameProperty = (prop, _obj) => prop;
var defaultConverter2 = {
  toAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value ? "" : null;
      case Object:
      case Array:
        return value == null ? value : JSON.stringify(value);
    }
    return value;
  },
  fromAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value !== null;
      case Number:
        return value === null ? null : Number(value);
      case Object:
      case Array:
        return JSON.parse(value);
    }
    return value;
  }
};
var notEqual2 = (value, old) => {
  return old !== value && (old === old || value === value);
};
var defaultPropertyDeclaration2 = {
  attribute: true,
  type: String,
  converter: defaultConverter2,
  reflect: false,
  hasChanged: notEqual2
};
var STATE_HAS_UPDATED2 = 1;
var STATE_UPDATE_REQUESTED2 = 1 << 2;
var STATE_IS_REFLECTING_TO_ATTRIBUTE2 = 1 << 3;
var STATE_IS_REFLECTING_TO_PROPERTY2 = 1 << 4;
var finalized2 = "finalized";
var UpdatingElement2 = class extends HTMLElement {
  constructor() {
    super();
    this.initialize();
  }
  static get observedAttributes() {
    this.finalize();
    const attributes = [];
    this._classProperties.forEach((v, p) => {
      const attr = this._attributeNameForProperty(p, v);
      if (attr !== void 0) {
        this._attributeToPropertyMap.set(attr, p);
        attributes.push(attr);
      }
    });
    return attributes;
  }
  static _ensureClassProperties() {
    if (!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties", this))) {
      this._classProperties = new Map();
      const superProperties = Object.getPrototypeOf(this)._classProperties;
      if (superProperties !== void 0) {
        superProperties.forEach((v, k) => this._classProperties.set(k, v));
      }
    }
  }
  static createProperty(name, options = defaultPropertyDeclaration2) {
    this._ensureClassProperties();
    this._classProperties.set(name, options);
    if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
      return;
    }
    const key = typeof name === "symbol" ? Symbol() : `__${name}`;
    const descriptor = this.getPropertyDescriptor(name, key, options);
    if (descriptor !== void 0) {
      Object.defineProperty(this.prototype, name, descriptor);
    }
  }
  static getPropertyDescriptor(name, key, options) {
    return {
      get() {
        return this[key];
      },
      set(value) {
        const oldValue = this[name];
        this[key] = value;
        this.requestUpdateInternal(name, oldValue, options);
      },
      configurable: true,
      enumerable: true
    };
  }
  static getPropertyOptions(name) {
    return this._classProperties && this._classProperties.get(name) || defaultPropertyDeclaration2;
  }
  static finalize() {
    const superCtor = Object.getPrototypeOf(this);
    if (!superCtor.hasOwnProperty(finalized2)) {
      superCtor.finalize();
    }
    this[finalized2] = true;
    this._ensureClassProperties();
    this._attributeToPropertyMap = new Map();
    if (this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
      const props = this.properties;
      const propKeys = [
        ...Object.getOwnPropertyNames(props),
        ...typeof Object.getOwnPropertySymbols === "function" ? Object.getOwnPropertySymbols(props) : []
      ];
      for (const p of propKeys) {
        this.createProperty(p, props[p]);
      }
    }
  }
  static _attributeNameForProperty(name, options) {
    const attribute = options.attribute;
    return attribute === false ? void 0 : typeof attribute === "string" ? attribute : typeof name === "string" ? name.toLowerCase() : void 0;
  }
  static _valueHasChanged(value, old, hasChanged = notEqual2) {
    return hasChanged(value, old);
  }
  static _propertyValueFromAttribute(value, options) {
    const type = options.type;
    const converter = options.converter || defaultConverter2;
    const fromAttribute = typeof converter === "function" ? converter : converter.fromAttribute;
    return fromAttribute ? fromAttribute(value, type) : value;
  }
  static _propertyValueToAttribute(value, options) {
    if (options.reflect === void 0) {
      return;
    }
    const type = options.type;
    const converter = options.converter;
    const toAttribute = converter && converter.toAttribute || defaultConverter2.toAttribute;
    return toAttribute(value, type);
  }
  initialize() {
    this._updateState = 0;
    this._updatePromise = new Promise((res) => this._enableUpdatingResolver = res);
    this._changedProperties = new Map();
    this._saveInstanceProperties();
    this.requestUpdateInternal();
  }
  _saveInstanceProperties() {
    this.constructor._classProperties.forEach((_v, p) => {
      if (this.hasOwnProperty(p)) {
        const value = this[p];
        delete this[p];
        if (!this._instanceProperties) {
          this._instanceProperties = new Map();
        }
        this._instanceProperties.set(p, value);
      }
    });
  }
  _applyInstanceProperties() {
    this._instanceProperties.forEach((v, p) => this[p] = v);
    this._instanceProperties = void 0;
  }
  connectedCallback() {
    this.enableUpdating();
  }
  enableUpdating() {
    if (this._enableUpdatingResolver !== void 0) {
      this._enableUpdatingResolver();
      this._enableUpdatingResolver = void 0;
    }
  }
  disconnectedCallback() {
  }
  attributeChangedCallback(name, old, value) {
    if (old !== value) {
      this._attributeToProperty(name, value);
    }
  }
  _propertyToAttribute(name, value, options = defaultPropertyDeclaration2) {
    const ctor = this.constructor;
    const attr = ctor._attributeNameForProperty(name, options);
    if (attr !== void 0) {
      const attrValue = ctor._propertyValueToAttribute(value, options);
      if (attrValue === void 0) {
        return;
      }
      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE2;
      if (attrValue == null) {
        this.removeAttribute(attr);
      } else {
        this.setAttribute(attr, attrValue);
      }
      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE2;
    }
  }
  _attributeToProperty(name, value) {
    if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE2) {
      return;
    }
    const ctor = this.constructor;
    const propName = ctor._attributeToPropertyMap.get(name);
    if (propName !== void 0) {
      const options = ctor.getPropertyOptions(propName);
      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY2;
      this[propName] = ctor._propertyValueFromAttribute(value, options);
      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY2;
    }
  }
  requestUpdateInternal(name, oldValue, options) {
    let shouldRequestUpdate = true;
    if (name !== void 0) {
      const ctor = this.constructor;
      options = options || ctor.getPropertyOptions(name);
      if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
        if (!this._changedProperties.has(name)) {
          this._changedProperties.set(name, oldValue);
        }
        if (options.reflect === true && !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY2)) {
          if (this._reflectingProperties === void 0) {
            this._reflectingProperties = new Map();
          }
          this._reflectingProperties.set(name, options);
        }
      } else {
        shouldRequestUpdate = false;
      }
    }
    if (!this._hasRequestedUpdate && shouldRequestUpdate) {
      this._updatePromise = this._enqueueUpdate();
    }
  }
  requestUpdate(name, oldValue) {
    this.requestUpdateInternal(name, oldValue);
    return this.updateComplete;
  }
  async _enqueueUpdate() {
    this._updateState = this._updateState | STATE_UPDATE_REQUESTED2;
    try {
      await this._updatePromise;
    } catch (e2) {
    }
    const result = this.performUpdate();
    if (result != null) {
      await result;
    }
    return !this._hasRequestedUpdate;
  }
  get _hasRequestedUpdate() {
    return this._updateState & STATE_UPDATE_REQUESTED2;
  }
  get hasUpdated() {
    return this._updateState & STATE_HAS_UPDATED2;
  }
  performUpdate() {
    if (!this._hasRequestedUpdate) {
      return;
    }
    if (this._instanceProperties) {
      this._applyInstanceProperties();
    }
    let shouldUpdate = false;
    const changedProperties = this._changedProperties;
    try {
      shouldUpdate = this.shouldUpdate(changedProperties);
      if (shouldUpdate) {
        this.update(changedProperties);
      } else {
        this._markUpdated();
      }
    } catch (e2) {
      shouldUpdate = false;
      this._markUpdated();
      throw e2;
    }
    if (shouldUpdate) {
      if (!(this._updateState & STATE_HAS_UPDATED2)) {
        this._updateState = this._updateState | STATE_HAS_UPDATED2;
        this.firstUpdated(changedProperties);
      }
      this.updated(changedProperties);
    }
  }
  _markUpdated() {
    this._changedProperties = new Map();
    this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED2;
  }
  get updateComplete() {
    return this._getUpdateComplete();
  }
  _getUpdateComplete() {
    return this._updatePromise;
  }
  shouldUpdate(_changedProperties) {
    return true;
  }
  update(_changedProperties) {
    if (this._reflectingProperties !== void 0 && this._reflectingProperties.size > 0) {
      this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));
      this._reflectingProperties = void 0;
    }
    this._markUpdated();
  }
  updated(_changedProperties) {
  }
  firstUpdated(_changedProperties) {
  }
};
_a2 = finalized2;
UpdatingElement2[_a2] = true;

// node_modules/lit-element/lib/decorators.js
var legacyCustomElement2 = (tagName, clazz) => {
  window.customElements.define(tagName, clazz);
  return clazz;
};
var standardCustomElement2 = (tagName, descriptor) => {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    finisher(clazz) {
      window.customElements.define(tagName, clazz);
    }
  };
};
var customElement2 = (tagName) => (classOrDescriptor) => typeof classOrDescriptor === "function" ? legacyCustomElement2(tagName, classOrDescriptor) : standardCustomElement2(tagName, classOrDescriptor);
var standardProperty2 = (options, element) => {
  if (element.kind === "method" && element.descriptor && !("value" in element.descriptor)) {
    return Object.assign(Object.assign({}, element), { finisher(clazz) {
      clazz.createProperty(element.key, options);
    } });
  } else {
    return {
      kind: "field",
      key: Symbol(),
      placement: "own",
      descriptor: {},
      initializer() {
        if (typeof element.initializer === "function") {
          this[element.key] = element.initializer.call(this);
        }
      },
      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }
    };
  }
};
var legacyProperty2 = (options, proto, name) => {
  proto.constructor.createProperty(name, options);
};
function property2(options) {
  return (protoOrDescriptor, name) => name !== void 0 ? legacyProperty2(options, protoOrDescriptor, name) : standardProperty2(options, protoOrDescriptor);
}
function internalProperty2(options) {
  return property2({ attribute: false, hasChanged: options === null || options === void 0 ? void 0 : options.hasChanged });
}
function query2(selector, cache) {
  return (protoOrDescriptor, name) => {
    const descriptor = {
      get() {
        return this.renderRoot.querySelector(selector);
      },
      enumerable: true,
      configurable: true
    };
    if (cache) {
      const key = typeof name === "symbol" ? Symbol() : `__${name}`;
      descriptor.get = function() {
        if (this[key] === void 0) {
          this[key] = this.renderRoot.querySelector(selector);
        }
        return this[key];
      };
    }
    return name !== void 0 ? legacyQuery2(descriptor, protoOrDescriptor, name) : standardQuery2(descriptor, protoOrDescriptor);
  };
}
function queryAsync(selector) {
  return (protoOrDescriptor, name) => {
    const descriptor = {
      async get() {
        await this.updateComplete;
        return this.renderRoot.querySelector(selector);
      },
      enumerable: true,
      configurable: true
    };
    return name !== void 0 ? legacyQuery2(descriptor, protoOrDescriptor, name) : standardQuery2(descriptor, protoOrDescriptor);
  };
}
var legacyQuery2 = (descriptor, proto, name) => {
  Object.defineProperty(proto, name, descriptor);
};
var standardQuery2 = (descriptor, element) => ({
  kind: "method",
  placement: "prototype",
  key: element.key,
  descriptor
});
var standardEventOptions = (options, element) => {
  return Object.assign(Object.assign({}, element), { finisher(clazz) {
    Object.assign(clazz.prototype[element.key], options);
  } });
};
var legacyEventOptions = (options, proto, name) => {
  Object.assign(proto[name], options);
};
function eventOptions(options) {
  return (protoOrDescriptor, name) => name !== void 0 ? legacyEventOptions(options, protoOrDescriptor, name) : standardEventOptions(options, protoOrDescriptor);
}
var ElementProto2 = Element.prototype;
var legacyMatches2 = ElementProto2.msMatchesSelector || ElementProto2.webkitMatchesSelector;

// node_modules/lit-element/lib/css-tag.js
var supportsAdoptingStyleSheets2 = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var constructionToken2 = Symbol();
var CSSResult2 = class {
  constructor(cssText, safeToken) {
    if (safeToken !== constructionToken2) {
      throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    }
    this.cssText = cssText;
  }
  get styleSheet() {
    if (this._styleSheet === void 0) {
      if (supportsAdoptingStyleSheets2) {
        this._styleSheet = new CSSStyleSheet();
        this._styleSheet.replaceSync(this.cssText);
      } else {
        this._styleSheet = null;
      }
    }
    return this._styleSheet;
  }
  toString() {
    return this.cssText;
  }
};
var unsafeCSS2 = (value) => {
  return new CSSResult2(String(value), constructionToken2);
};
var textFromCSSResult2 = (value) => {
  if (value instanceof CSSResult2) {
    return value.cssText;
  } else if (typeof value === "number") {
    return value;
  } else {
    throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
  }
};
var css2 = (strings10, ...values) => {
  const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult2(v) + strings10[idx + 1], strings10[0]);
  return new CSSResult2(cssText, constructionToken2);
};

// node_modules/lit-element/lit-element.js
(window["litElementVersions"] || (window["litElementVersions"] = [])).push("2.4.0");
var renderNotImplemented2 = {};
var LitElement2 = class extends UpdatingElement2 {
  static getStyles() {
    return this.styles;
  }
  static _getUniqueStyles() {
    if (this.hasOwnProperty(JSCompiler_renameProperty("_styles", this))) {
      return;
    }
    const userStyles = this.getStyles();
    if (Array.isArray(userStyles)) {
      const addStyles = (styles2, set2) => styles2.reduceRight((set3, s) => Array.isArray(s) ? addStyles(s, set3) : (set3.add(s), set3), set2);
      const set = addStyles(userStyles, new Set());
      const styles = [];
      set.forEach((v) => styles.unshift(v));
      this._styles = styles;
    } else {
      this._styles = userStyles === void 0 ? [] : [userStyles];
    }
    this._styles = this._styles.map((s) => {
      if (s instanceof CSSStyleSheet && !supportsAdoptingStyleSheets2) {
        const cssText = Array.prototype.slice.call(s.cssRules).reduce((css3, rule) => css3 + rule.cssText, "");
        return unsafeCSS2(cssText);
      }
      return s;
    });
  }
  initialize() {
    super.initialize();
    this.constructor._getUniqueStyles();
    this.renderRoot = this.createRenderRoot();
    if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
      this.adoptStyles();
    }
  }
  createRenderRoot() {
    return this.attachShadow({ mode: "open" });
  }
  adoptStyles() {
    const styles = this.constructor._styles;
    if (styles.length === 0) {
      return;
    }
    if (window.ShadyCSS !== void 0 && !window.ShadyCSS.nativeShadow) {
      window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map((s) => s.cssText), this.localName);
    } else if (supportsAdoptingStyleSheets2) {
      this.renderRoot.adoptedStyleSheets = styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
    } else {
      this._needsShimAdoptedStyleSheets = true;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.hasUpdated && window.ShadyCSS !== void 0) {
      window.ShadyCSS.styleElement(this);
    }
  }
  update(changedProperties) {
    const templateResult = this.render();
    super.update(changedProperties);
    if (templateResult !== renderNotImplemented2) {
      this.constructor.render(templateResult, this.renderRoot, { scopeName: this.localName, eventContext: this });
    }
    if (this._needsShimAdoptedStyleSheets) {
      this._needsShimAdoptedStyleSheets = false;
      this.constructor._styles.forEach((s) => {
        const style15 = document.createElement("style");
        style15.textContent = s.cssText;
        this.renderRoot.appendChild(style15);
      });
    }
  }
  render() {
    return renderNotImplemented2;
  }
};
LitElement2["finalized"] = true;
LitElement2.render = render2;

// node_modules/@material/dom/ponyfill.js
function matches(element, selector) {
  var nativeMatches = element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
  return nativeMatches.call(element, selector);
}

// node_modules/@material/mwc-base/utils.js
var isNodeElement = (node) => {
  return node.nodeType === Node.ELEMENT_NODE;
};
function findAssignedElement(slot, selector) {
  for (const node of slot.assignedNodes({ flatten: true })) {
    if (isNodeElement(node)) {
      const el = node;
      if (matches(el, selector)) {
        return el;
      }
    }
  }
  return null;
}
function addHasRemoveClass(element) {
  return {
    addClass: (className) => {
      element.classList.add(className);
    },
    removeClass: (className) => {
      element.classList.remove(className);
    },
    hasClass: (className) => element.classList.contains(className)
  };
}
var supportsPassive = false;
var fn = () => {
};
var optionsBlock = {
  get passive() {
    supportsPassive = true;
    return false;
  }
};
document.addEventListener("x", fn, optionsBlock);
document.removeEventListener("x", fn);
var deepActiveElementPath = (doc = window.document) => {
  let activeElement = doc.activeElement;
  const path = [];
  if (!activeElement) {
    return path;
  }
  while (activeElement) {
    path.push(activeElement);
    if (activeElement.shadowRoot) {
      activeElement = activeElement.shadowRoot.activeElement;
    } else {
      break;
    }
  }
  return path;
};
var doesElementContainFocus = (element) => {
  const activePath = deepActiveElementPath();
  if (!activePath.length) {
    return false;
  }
  const deepActiveElement = activePath[activePath.length - 1];
  const focusEv = new Event("check-if-focused", { bubbles: true, composed: true });
  let composedPath = [];
  const listener = (ev) => {
    composedPath = ev.composedPath();
  };
  document.body.addEventListener("check-if-focused", listener);
  deepActiveElement.dispatchEvent(focusEv);
  document.body.removeEventListener("check-if-focused", listener);
  return composedPath.indexOf(element) !== -1;
};

// node_modules/@material/mwc-base/base-element.js
var BaseElement = class extends LitElement2 {
  click() {
    if (this.mdcRoot) {
      this.mdcRoot.focus();
      this.mdcRoot.click();
      return;
    }
    super.click();
  }
  createFoundation() {
    if (this.mdcFoundation !== void 0) {
      this.mdcFoundation.destroy();
    }
    if (this.mdcFoundationClass) {
      this.mdcFoundation = new this.mdcFoundationClass(this.createAdapter());
      this.mdcFoundation.init();
    }
  }
  firstUpdated() {
    this.createFoundation();
  }
};

// node_modules/@material/base/foundation.js
var MDCFoundation = function() {
  function MDCFoundation2(adapter) {
    if (adapter === void 0) {
      adapter = {};
    }
    this.adapter = adapter;
  }
  Object.defineProperty(MDCFoundation2, "cssClasses", {
    get: function() {
      return {};
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCFoundation2, "strings", {
    get: function() {
      return {};
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCFoundation2, "numbers", {
    get: function() {
      return {};
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCFoundation2, "defaultAdapter", {
    get: function() {
      return {};
    },
    enumerable: false,
    configurable: true
  });
  MDCFoundation2.prototype.init = function() {
  };
  MDCFoundation2.prototype.destroy = function() {
  };
  return MDCFoundation2;
}();

// node_modules/@material/tab-indicator/constants.js
var cssClasses = {
  ACTIVE: "mdc-tab-indicator--active",
  FADE: "mdc-tab-indicator--fade",
  NO_TRANSITION: "mdc-tab-indicator--no-transition"
};
var strings = {
  CONTENT_SELECTOR: ".mdc-tab-indicator__content"
};

// node_modules/@material/tab-indicator/foundation.js
var MDCTabIndicatorFoundation = function(_super) {
  __extends(MDCTabIndicatorFoundation2, _super);
  function MDCTabIndicatorFoundation2(adapter) {
    return _super.call(this, __assign(__assign({}, MDCTabIndicatorFoundation2.defaultAdapter), adapter)) || this;
  }
  Object.defineProperty(MDCTabIndicatorFoundation2, "cssClasses", {
    get: function() {
      return cssClasses;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTabIndicatorFoundation2, "strings", {
    get: function() {
      return strings;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTabIndicatorFoundation2, "defaultAdapter", {
    get: function() {
      return {
        addClass: function() {
          return void 0;
        },
        removeClass: function() {
          return void 0;
        },
        computeContentClientRect: function() {
          return { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
        },
        setContentStyleProperty: function() {
          return void 0;
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  MDCTabIndicatorFoundation2.prototype.computeContentClientRect = function() {
    return this.adapter.computeContentClientRect();
  };
  return MDCTabIndicatorFoundation2;
}(MDCFoundation);

// node_modules/@material/tab-indicator/fading-foundation.js
var MDCFadingTabIndicatorFoundation = function(_super) {
  __extends(MDCFadingTabIndicatorFoundation2, _super);
  function MDCFadingTabIndicatorFoundation2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  MDCFadingTabIndicatorFoundation2.prototype.activate = function() {
    this.adapter.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
  };
  MDCFadingTabIndicatorFoundation2.prototype.deactivate = function() {
    this.adapter.removeClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
  };
  return MDCFadingTabIndicatorFoundation2;
}(MDCTabIndicatorFoundation);
var fading_foundation_default = MDCFadingTabIndicatorFoundation;

// node_modules/@material/tab-indicator/sliding-foundation.js
var MDCSlidingTabIndicatorFoundation = function(_super) {
  __extends(MDCSlidingTabIndicatorFoundation2, _super);
  function MDCSlidingTabIndicatorFoundation2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  MDCSlidingTabIndicatorFoundation2.prototype.activate = function(previousIndicatorClientRect) {
    if (!previousIndicatorClientRect) {
      this.adapter.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
      return;
    }
    var currentClientRect = this.computeContentClientRect();
    var widthDelta = previousIndicatorClientRect.width / currentClientRect.width;
    var xPosition = previousIndicatorClientRect.left - currentClientRect.left;
    this.adapter.addClass(MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION);
    this.adapter.setContentStyleProperty("transform", "translateX(" + xPosition + "px) scaleX(" + widthDelta + ")");
    this.computeContentClientRect();
    this.adapter.removeClass(MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION);
    this.adapter.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
    this.adapter.setContentStyleProperty("transform", "");
  };
  MDCSlidingTabIndicatorFoundation2.prototype.deactivate = function() {
    this.adapter.removeClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
  };
  return MDCSlidingTabIndicatorFoundation2;
}(MDCTabIndicatorFoundation);
var sliding_foundation_default = MDCSlidingTabIndicatorFoundation;

// node_modules/lit-html/directives/class-map.js
var ClassList = class {
  constructor(element) {
    this.classes = new Set();
    this.changed = false;
    this.element = element;
    const classList = (element.getAttribute("class") || "").split(/\s+/);
    for (const cls of classList) {
      this.classes.add(cls);
    }
  }
  add(cls) {
    this.classes.add(cls);
    this.changed = true;
  }
  remove(cls) {
    this.classes.delete(cls);
    this.changed = true;
  }
  commit() {
    if (this.changed) {
      let classString = "";
      this.classes.forEach((cls) => classString += cls + " ");
      this.element.setAttribute("class", classString);
    }
  }
};
var previousClassesCache = new WeakMap();
var classMap = directive((classInfo) => (part) => {
  if (!(part instanceof AttributePart) || part instanceof PropertyPart || part.committer.name !== "class" || part.committer.parts.length > 1) {
    throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");
  }
  const { committer } = part;
  const { element } = committer;
  let previousClasses = previousClassesCache.get(part);
  if (previousClasses === void 0) {
    element.setAttribute("class", committer.strings.join(" "));
    previousClassesCache.set(part, previousClasses = new Set());
  }
  const classList = element.classList || new ClassList(element);
  previousClasses.forEach((name) => {
    if (!(name in classInfo)) {
      classList.remove(name);
      previousClasses.delete(name);
    }
  });
  for (const name in classInfo) {
    const value = classInfo[name];
    if (value != previousClasses.has(name)) {
      if (value) {
        classList.add(name);
        previousClasses.add(name);
      } else {
        classList.remove(name);
        previousClasses.delete(name);
      }
    }
  }
  if (typeof classList.commit === "function") {
    classList.commit();
  }
});

// node_modules/@material/mwc-tab-indicator/mwc-tab-indicator-base.js
var TabIndicatorBase = class extends BaseElement {
  constructor() {
    super(...arguments);
    this.icon = "";
    this.fade = false;
  }
  get mdcFoundationClass() {
    return this.fade ? fading_foundation_default : sliding_foundation_default;
  }
  render() {
    const contentClasses = {
      "mdc-tab-indicator__content--icon": this.icon,
      "material-icons": this.icon,
      "mdc-tab-indicator__content--underline": !this.icon
    };
    return html`
      <span class="mdc-tab-indicator ${classMap({
      "mdc-tab-indicator--fade": this.fade
    })}">
        <span class="mdc-tab-indicator__content ${classMap(contentClasses)}">${this.icon}</span>
      </span>
      `;
  }
  updated(changedProperties) {
    if (changedProperties.has("fade")) {
      this.createFoundation();
    }
  }
  createAdapter() {
    return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), { computeContentClientRect: () => this.contentElement.getBoundingClientRect(), setContentStyleProperty: (prop, value) => this.contentElement.style.setProperty(prop, value) });
  }
  computeContentClientRect() {
    return this.mdcFoundation.computeContentClientRect();
  }
  activate(previousIndicatorClientRect) {
    this.mdcFoundation.activate(previousIndicatorClientRect);
  }
  deactivate() {
    this.mdcFoundation.deactivate();
  }
};
__decorate([
  query2(".mdc-tab-indicator")
], TabIndicatorBase.prototype, "mdcRoot", void 0);
__decorate([
  query2(".mdc-tab-indicator__content")
], TabIndicatorBase.prototype, "contentElement", void 0);
__decorate([
  property2()
], TabIndicatorBase.prototype, "icon", void 0);
__decorate([
  property2({ type: Boolean })
], TabIndicatorBase.prototype, "fade", void 0);

// node_modules/@material/mwc-tab-indicator/mwc-tab-indicator-css.js
var style = css2`.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator .mdc-tab-indicator__content--underline{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-tab-indicator .mdc-tab-indicator__content--icon{color:#018786;color:var(--mdc-theme-secondary, #018786)}.mdc-tab-indicator .mdc-tab-indicator__content--underline{border-top-width:2px}.mdc-tab-indicator .mdc-tab-indicator__content--icon{height:34px;font-size:34px}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}`;

// node_modules/@material/mwc-tab-indicator/mwc-tab-indicator.js
var TabIndicator = class TabIndicator2 extends TabIndicatorBase {
};
TabIndicator.styles = style;
TabIndicator = __decorate([
  customElement2("mwc-tab-indicator")
], TabIndicator);

// node_modules/@material/ripple/constants.js
var cssClasses2 = {
  BG_FOCUSED: "mdc-ripple-upgraded--background-focused",
  FG_ACTIVATION: "mdc-ripple-upgraded--foreground-activation",
  FG_DEACTIVATION: "mdc-ripple-upgraded--foreground-deactivation",
  ROOT: "mdc-ripple-upgraded",
  UNBOUNDED: "mdc-ripple-upgraded--unbounded"
};
var strings2 = {
  VAR_FG_SCALE: "--mdc-ripple-fg-scale",
  VAR_FG_SIZE: "--mdc-ripple-fg-size",
  VAR_FG_TRANSLATE_END: "--mdc-ripple-fg-translate-end",
  VAR_FG_TRANSLATE_START: "--mdc-ripple-fg-translate-start",
  VAR_LEFT: "--mdc-ripple-left",
  VAR_TOP: "--mdc-ripple-top"
};
var numbers = {
  DEACTIVATION_TIMEOUT_MS: 225,
  FG_DEACTIVATION_MS: 150,
  INITIAL_ORIGIN_SCALE: 0.6,
  PADDING: 10,
  TAP_DELAY_MS: 300
};

// node_modules/@material/ripple/util.js
function getNormalizedEventCoords(evt, pageOffset, clientRect) {
  if (!evt) {
    return { x: 0, y: 0 };
  }
  var x = pageOffset.x, y = pageOffset.y;
  var documentX = x + clientRect.left;
  var documentY = y + clientRect.top;
  var normalizedX;
  var normalizedY;
  if (evt.type === "touchstart") {
    var touchEvent = evt;
    normalizedX = touchEvent.changedTouches[0].pageX - documentX;
    normalizedY = touchEvent.changedTouches[0].pageY - documentY;
  } else {
    var mouseEvent = evt;
    normalizedX = mouseEvent.pageX - documentX;
    normalizedY = mouseEvent.pageY - documentY;
  }
  return { x: normalizedX, y: normalizedY };
}

// node_modules/@material/ripple/foundation.js
var ACTIVATION_EVENT_TYPES = [
  "touchstart",
  "pointerdown",
  "mousedown",
  "keydown"
];
var POINTER_DEACTIVATION_EVENT_TYPES = [
  "touchend",
  "pointerup",
  "mouseup",
  "contextmenu"
];
var activatedTargets = [];
var MDCRippleFoundation = function(_super) {
  __extends(MDCRippleFoundation2, _super);
  function MDCRippleFoundation2(adapter) {
    var _this = _super.call(this, __assign(__assign({}, MDCRippleFoundation2.defaultAdapter), adapter)) || this;
    _this.activationAnimationHasEnded_ = false;
    _this.activationTimer_ = 0;
    _this.fgDeactivationRemovalTimer_ = 0;
    _this.fgScale_ = "0";
    _this.frame_ = { width: 0, height: 0 };
    _this.initialSize_ = 0;
    _this.layoutFrame_ = 0;
    _this.maxRadius_ = 0;
    _this.unboundedCoords_ = { left: 0, top: 0 };
    _this.activationState_ = _this.defaultActivationState_();
    _this.activationTimerCallback_ = function() {
      _this.activationAnimationHasEnded_ = true;
      _this.runDeactivationUXLogicIfReady_();
    };
    _this.activateHandler_ = function(e2) {
      return _this.activate_(e2);
    };
    _this.deactivateHandler_ = function() {
      return _this.deactivate_();
    };
    _this.focusHandler_ = function() {
      return _this.handleFocus();
    };
    _this.blurHandler_ = function() {
      return _this.handleBlur();
    };
    _this.resizeHandler_ = function() {
      return _this.layout();
    };
    return _this;
  }
  Object.defineProperty(MDCRippleFoundation2, "cssClasses", {
    get: function() {
      return cssClasses2;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation2, "strings", {
    get: function() {
      return strings2;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation2, "numbers", {
    get: function() {
      return numbers;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation2, "defaultAdapter", {
    get: function() {
      return {
        addClass: function() {
          return void 0;
        },
        browserSupportsCssVars: function() {
          return true;
        },
        computeBoundingRect: function() {
          return { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
        },
        containsEventTarget: function() {
          return true;
        },
        deregisterDocumentInteractionHandler: function() {
          return void 0;
        },
        deregisterInteractionHandler: function() {
          return void 0;
        },
        deregisterResizeHandler: function() {
          return void 0;
        },
        getWindowPageOffset: function() {
          return { x: 0, y: 0 };
        },
        isSurfaceActive: function() {
          return true;
        },
        isSurfaceDisabled: function() {
          return true;
        },
        isUnbounded: function() {
          return true;
        },
        registerDocumentInteractionHandler: function() {
          return void 0;
        },
        registerInteractionHandler: function() {
          return void 0;
        },
        registerResizeHandler: function() {
          return void 0;
        },
        removeClass: function() {
          return void 0;
        },
        updateCssVariable: function() {
          return void 0;
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  MDCRippleFoundation2.prototype.init = function() {
    var _this = this;
    var supportsPressRipple = this.supportsPressRipple_();
    this.registerRootHandlers_(supportsPressRipple);
    if (supportsPressRipple) {
      var _a4 = MDCRippleFoundation2.cssClasses, ROOT_1 = _a4.ROOT, UNBOUNDED_1 = _a4.UNBOUNDED;
      requestAnimationFrame(function() {
        _this.adapter.addClass(ROOT_1);
        if (_this.adapter.isUnbounded()) {
          _this.adapter.addClass(UNBOUNDED_1);
          _this.layoutInternal_();
        }
      });
    }
  };
  MDCRippleFoundation2.prototype.destroy = function() {
    var _this = this;
    if (this.supportsPressRipple_()) {
      if (this.activationTimer_) {
        clearTimeout(this.activationTimer_);
        this.activationTimer_ = 0;
        this.adapter.removeClass(MDCRippleFoundation2.cssClasses.FG_ACTIVATION);
      }
      if (this.fgDeactivationRemovalTimer_) {
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.fgDeactivationRemovalTimer_ = 0;
        this.adapter.removeClass(MDCRippleFoundation2.cssClasses.FG_DEACTIVATION);
      }
      var _a4 = MDCRippleFoundation2.cssClasses, ROOT_2 = _a4.ROOT, UNBOUNDED_2 = _a4.UNBOUNDED;
      requestAnimationFrame(function() {
        _this.adapter.removeClass(ROOT_2);
        _this.adapter.removeClass(UNBOUNDED_2);
        _this.removeCssVars_();
      });
    }
    this.deregisterRootHandlers_();
    this.deregisterDeactivationHandlers_();
  };
  MDCRippleFoundation2.prototype.activate = function(evt) {
    this.activate_(evt);
  };
  MDCRippleFoundation2.prototype.deactivate = function() {
    this.deactivate_();
  };
  MDCRippleFoundation2.prototype.layout = function() {
    var _this = this;
    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }
    this.layoutFrame_ = requestAnimationFrame(function() {
      _this.layoutInternal_();
      _this.layoutFrame_ = 0;
    });
  };
  MDCRippleFoundation2.prototype.setUnbounded = function(unbounded) {
    var UNBOUNDED = MDCRippleFoundation2.cssClasses.UNBOUNDED;
    if (unbounded) {
      this.adapter.addClass(UNBOUNDED);
    } else {
      this.adapter.removeClass(UNBOUNDED);
    }
  };
  MDCRippleFoundation2.prototype.handleFocus = function() {
    var _this = this;
    requestAnimationFrame(function() {
      return _this.adapter.addClass(MDCRippleFoundation2.cssClasses.BG_FOCUSED);
    });
  };
  MDCRippleFoundation2.prototype.handleBlur = function() {
    var _this = this;
    requestAnimationFrame(function() {
      return _this.adapter.removeClass(MDCRippleFoundation2.cssClasses.BG_FOCUSED);
    });
  };
  MDCRippleFoundation2.prototype.supportsPressRipple_ = function() {
    return this.adapter.browserSupportsCssVars();
  };
  MDCRippleFoundation2.prototype.defaultActivationState_ = function() {
    return {
      activationEvent: void 0,
      hasDeactivationUXRun: false,
      isActivated: false,
      isProgrammatic: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false
    };
  };
  MDCRippleFoundation2.prototype.registerRootHandlers_ = function(supportsPressRipple) {
    var _this = this;
    if (supportsPressRipple) {
      ACTIVATION_EVENT_TYPES.forEach(function(evtType) {
        _this.adapter.registerInteractionHandler(evtType, _this.activateHandler_);
      });
      if (this.adapter.isUnbounded()) {
        this.adapter.registerResizeHandler(this.resizeHandler_);
      }
    }
    this.adapter.registerInteractionHandler("focus", this.focusHandler_);
    this.adapter.registerInteractionHandler("blur", this.blurHandler_);
  };
  MDCRippleFoundation2.prototype.registerDeactivationHandlers_ = function(evt) {
    var _this = this;
    if (evt.type === "keydown") {
      this.adapter.registerInteractionHandler("keyup", this.deactivateHandler_);
    } else {
      POINTER_DEACTIVATION_EVENT_TYPES.forEach(function(evtType) {
        _this.adapter.registerDocumentInteractionHandler(evtType, _this.deactivateHandler_);
      });
    }
  };
  MDCRippleFoundation2.prototype.deregisterRootHandlers_ = function() {
    var _this = this;
    ACTIVATION_EVENT_TYPES.forEach(function(evtType) {
      _this.adapter.deregisterInteractionHandler(evtType, _this.activateHandler_);
    });
    this.adapter.deregisterInteractionHandler("focus", this.focusHandler_);
    this.adapter.deregisterInteractionHandler("blur", this.blurHandler_);
    if (this.adapter.isUnbounded()) {
      this.adapter.deregisterResizeHandler(this.resizeHandler_);
    }
  };
  MDCRippleFoundation2.prototype.deregisterDeactivationHandlers_ = function() {
    var _this = this;
    this.adapter.deregisterInteractionHandler("keyup", this.deactivateHandler_);
    POINTER_DEACTIVATION_EVENT_TYPES.forEach(function(evtType) {
      _this.adapter.deregisterDocumentInteractionHandler(evtType, _this.deactivateHandler_);
    });
  };
  MDCRippleFoundation2.prototype.removeCssVars_ = function() {
    var _this = this;
    var rippleStrings = MDCRippleFoundation2.strings;
    var keys = Object.keys(rippleStrings);
    keys.forEach(function(key) {
      if (key.indexOf("VAR_") === 0) {
        _this.adapter.updateCssVariable(rippleStrings[key], null);
      }
    });
  };
  MDCRippleFoundation2.prototype.activate_ = function(evt) {
    var _this = this;
    if (this.adapter.isSurfaceDisabled()) {
      return;
    }
    var activationState = this.activationState_;
    if (activationState.isActivated) {
      return;
    }
    var previousActivationEvent = this.previousActivationEvent_;
    var isSameInteraction = previousActivationEvent && evt !== void 0 && previousActivationEvent.type !== evt.type;
    if (isSameInteraction) {
      return;
    }
    activationState.isActivated = true;
    activationState.isProgrammatic = evt === void 0;
    activationState.activationEvent = evt;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== void 0 && (evt.type === "mousedown" || evt.type === "touchstart" || evt.type === "pointerdown");
    var hasActivatedChild = evt !== void 0 && activatedTargets.length > 0 && activatedTargets.some(function(target) {
      return _this.adapter.containsEventTarget(target);
    });
    if (hasActivatedChild) {
      this.resetActivationState_();
      return;
    }
    if (evt !== void 0) {
      activatedTargets.push(evt.target);
      this.registerDeactivationHandlers_(evt);
    }
    activationState.wasElementMadeActive = this.checkElementMadeActive_(evt);
    if (activationState.wasElementMadeActive) {
      this.animateActivation_();
    }
    requestAnimationFrame(function() {
      activatedTargets = [];
      if (!activationState.wasElementMadeActive && evt !== void 0 && (evt.key === " " || evt.keyCode === 32)) {
        activationState.wasElementMadeActive = _this.checkElementMadeActive_(evt);
        if (activationState.wasElementMadeActive) {
          _this.animateActivation_();
        }
      }
      if (!activationState.wasElementMadeActive) {
        _this.activationState_ = _this.defaultActivationState_();
      }
    });
  };
  MDCRippleFoundation2.prototype.checkElementMadeActive_ = function(evt) {
    return evt !== void 0 && evt.type === "keydown" ? this.adapter.isSurfaceActive() : true;
  };
  MDCRippleFoundation2.prototype.animateActivation_ = function() {
    var _this = this;
    var _a4 = MDCRippleFoundation2.strings, VAR_FG_TRANSLATE_START = _a4.VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END = _a4.VAR_FG_TRANSLATE_END;
    var _b2 = MDCRippleFoundation2.cssClasses, FG_DEACTIVATION = _b2.FG_DEACTIVATION, FG_ACTIVATION = _b2.FG_ACTIVATION;
    var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation2.numbers.DEACTIVATION_TIMEOUT_MS;
    this.layoutInternal_();
    var translateStart = "";
    var translateEnd = "";
    if (!this.adapter.isUnbounded()) {
      var _c = this.getFgTranslationCoordinates_(), startPoint = _c.startPoint, endPoint = _c.endPoint;
      translateStart = startPoint.x + "px, " + startPoint.y + "px";
      translateEnd = endPoint.x + "px, " + endPoint.y + "px";
    }
    this.adapter.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter.removeClass(FG_DEACTIVATION);
    this.adapter.computeBoundingRect();
    this.adapter.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(function() {
      return _this.activationTimerCallback_();
    }, DEACTIVATION_TIMEOUT_MS);
  };
  MDCRippleFoundation2.prototype.getFgTranslationCoordinates_ = function() {
    var _a4 = this.activationState_, activationEvent = _a4.activationEvent, wasActivatedByPointer = _a4.wasActivatedByPointer;
    var startPoint;
    if (wasActivatedByPointer) {
      startPoint = getNormalizedEventCoords(activationEvent, this.adapter.getWindowPageOffset(), this.adapter.computeBoundingRect());
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2
      };
    }
    startPoint = {
      x: startPoint.x - this.initialSize_ / 2,
      y: startPoint.y - this.initialSize_ / 2
    };
    var endPoint = {
      x: this.frame_.width / 2 - this.initialSize_ / 2,
      y: this.frame_.height / 2 - this.initialSize_ / 2
    };
    return { startPoint, endPoint };
  };
  MDCRippleFoundation2.prototype.runDeactivationUXLogicIfReady_ = function() {
    var _this = this;
    var FG_DEACTIVATION = MDCRippleFoundation2.cssClasses.FG_DEACTIVATION;
    var _a4 = this.activationState_, hasDeactivationUXRun = _a4.hasDeactivationUXRun, isActivated = _a4.isActivated;
    var activationHasEnded = hasDeactivationUXRun || !isActivated;
    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(function() {
        _this.adapter.removeClass(FG_DEACTIVATION);
      }, numbers.FG_DEACTIVATION_MS);
    }
  };
  MDCRippleFoundation2.prototype.rmBoundedActivationClasses_ = function() {
    var FG_ACTIVATION = MDCRippleFoundation2.cssClasses.FG_ACTIVATION;
    this.adapter.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter.computeBoundingRect();
  };
  MDCRippleFoundation2.prototype.resetActivationState_ = function() {
    var _this = this;
    this.previousActivationEvent_ = this.activationState_.activationEvent;
    this.activationState_ = this.defaultActivationState_();
    setTimeout(function() {
      return _this.previousActivationEvent_ = void 0;
    }, MDCRippleFoundation2.numbers.TAP_DELAY_MS);
  };
  MDCRippleFoundation2.prototype.deactivate_ = function() {
    var _this = this;
    var activationState = this.activationState_;
    if (!activationState.isActivated) {
      return;
    }
    var state = __assign({}, activationState);
    if (activationState.isProgrammatic) {
      requestAnimationFrame(function() {
        return _this.animateDeactivation_(state);
      });
      this.resetActivationState_();
    } else {
      this.deregisterDeactivationHandlers_();
      requestAnimationFrame(function() {
        _this.activationState_.hasDeactivationUXRun = true;
        _this.animateDeactivation_(state);
        _this.resetActivationState_();
      });
    }
  };
  MDCRippleFoundation2.prototype.animateDeactivation_ = function(_a4) {
    var wasActivatedByPointer = _a4.wasActivatedByPointer, wasElementMadeActive = _a4.wasElementMadeActive;
    if (wasActivatedByPointer || wasElementMadeActive) {
      this.runDeactivationUXLogicIfReady_();
    }
  };
  MDCRippleFoundation2.prototype.layoutInternal_ = function() {
    var _this = this;
    this.frame_ = this.adapter.computeBoundingRect();
    var maxDim = Math.max(this.frame_.height, this.frame_.width);
    var getBoundedRadius = function() {
      var hypotenuse = Math.sqrt(Math.pow(_this.frame_.width, 2) + Math.pow(_this.frame_.height, 2));
      return hypotenuse + MDCRippleFoundation2.numbers.PADDING;
    };
    this.maxRadius_ = this.adapter.isUnbounded() ? maxDim : getBoundedRadius();
    var initialSize = Math.floor(maxDim * MDCRippleFoundation2.numbers.INITIAL_ORIGIN_SCALE);
    if (this.adapter.isUnbounded() && initialSize % 2 !== 0) {
      this.initialSize_ = initialSize - 1;
    } else {
      this.initialSize_ = initialSize;
    }
    this.fgScale_ = "" + this.maxRadius_ / this.initialSize_;
    this.updateLayoutCssVars_();
  };
  MDCRippleFoundation2.prototype.updateLayoutCssVars_ = function() {
    var _a4 = MDCRippleFoundation2.strings, VAR_FG_SIZE = _a4.VAR_FG_SIZE, VAR_LEFT = _a4.VAR_LEFT, VAR_TOP = _a4.VAR_TOP, VAR_FG_SCALE = _a4.VAR_FG_SCALE;
    this.adapter.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + "px");
    this.adapter.updateCssVariable(VAR_FG_SCALE, this.fgScale_);
    if (this.adapter.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
        top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
      };
      this.adapter.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + "px");
      this.adapter.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + "px");
    }
  };
  return MDCRippleFoundation2;
}(MDCFoundation);
var foundation_default = MDCRippleFoundation;

// node_modules/lit-html/directives/style-map.js
var previousStylePropertyCache = new WeakMap();
var styleMap = directive((styleInfo) => (part) => {
  if (!(part instanceof AttributePart) || part instanceof PropertyPart || part.committer.name !== "style" || part.committer.parts.length > 1) {
    throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");
  }
  const { committer } = part;
  const { style: style15 } = committer.element;
  let previousStyleProperties = previousStylePropertyCache.get(part);
  if (previousStyleProperties === void 0) {
    style15.cssText = committer.strings.join(" ");
    previousStylePropertyCache.set(part, previousStyleProperties = new Set());
  }
  previousStyleProperties.forEach((name) => {
    if (!(name in styleInfo)) {
      previousStyleProperties.delete(name);
      if (name.indexOf("-") === -1) {
        style15[name] = null;
      } else {
        style15.removeProperty(name);
      }
    }
  });
  for (const name in styleInfo) {
    previousStyleProperties.add(name);
    if (name.indexOf("-") === -1) {
      style15[name] = styleInfo[name];
    } else {
      style15.setProperty(name, styleInfo[name]);
    }
  }
});

// node_modules/@material/mwc-ripple/mwc-ripple-base.js
var RippleBase = class extends BaseElement {
  constructor() {
    super(...arguments);
    this.primary = false;
    this.accent = false;
    this.unbounded = false;
    this.disabled = false;
    this.activated = false;
    this.selected = false;
    this.hovering = false;
    this.bgFocused = false;
    this.fgActivation = false;
    this.fgDeactivation = false;
    this.fgScale = "";
    this.fgSize = "";
    this.translateStart = "";
    this.translateEnd = "";
    this.leftPos = "";
    this.topPos = "";
    this.mdcFoundationClass = foundation_default;
  }
  get isActive() {
    return matches(this.parentElement || this, ":active");
  }
  createAdapter() {
    return {
      browserSupportsCssVars: () => true,
      isUnbounded: () => this.unbounded,
      isSurfaceActive: () => this.isActive,
      isSurfaceDisabled: () => this.disabled,
      addClass: (className) => {
        switch (className) {
          case "mdc-ripple-upgraded--background-focused":
            this.bgFocused = true;
            break;
          case "mdc-ripple-upgraded--foreground-activation":
            this.fgActivation = true;
            break;
          case "mdc-ripple-upgraded--foreground-deactivation":
            this.fgDeactivation = true;
            break;
          default:
            break;
        }
      },
      removeClass: (className) => {
        switch (className) {
          case "mdc-ripple-upgraded--background-focused":
            this.bgFocused = false;
            break;
          case "mdc-ripple-upgraded--foreground-activation":
            this.fgActivation = false;
            break;
          case "mdc-ripple-upgraded--foreground-deactivation":
            this.fgDeactivation = false;
            break;
          default:
            break;
        }
      },
      containsEventTarget: () => true,
      registerInteractionHandler: () => void 0,
      deregisterInteractionHandler: () => void 0,
      registerDocumentInteractionHandler: () => void 0,
      deregisterDocumentInteractionHandler: () => void 0,
      registerResizeHandler: () => void 0,
      deregisterResizeHandler: () => void 0,
      updateCssVariable: (varName, value) => {
        switch (varName) {
          case "--mdc-ripple-fg-scale":
            this.fgScale = value;
            break;
          case "--mdc-ripple-fg-size":
            this.fgSize = value;
            break;
          case "--mdc-ripple-fg-translate-end":
            this.translateEnd = value;
            break;
          case "--mdc-ripple-fg-translate-start":
            this.translateStart = value;
            break;
          case "--mdc-ripple-left":
            this.leftPos = value;
            break;
          case "--mdc-ripple-top":
            this.topPos = value;
            break;
          default:
            break;
        }
      },
      computeBoundingRect: () => (this.parentElement || this).getBoundingClientRect(),
      getWindowPageOffset: () => ({ x: window.pageXOffset, y: window.pageYOffset })
    };
  }
  startPress(ev) {
    this.waitForFoundation(() => {
      this.mdcFoundation.activate(ev);
    });
  }
  endPress() {
    this.waitForFoundation(() => {
      this.mdcFoundation.deactivate();
    });
  }
  startFocus() {
    this.waitForFoundation(() => {
      this.mdcFoundation.handleFocus();
    });
  }
  endFocus() {
    this.waitForFoundation(() => {
      this.mdcFoundation.handleBlur();
    });
  }
  startHover() {
    this.hovering = true;
  }
  endHover() {
    this.hovering = false;
  }
  waitForFoundation(fn2) {
    if (this.mdcFoundation) {
      fn2();
    } else {
      this.updateComplete.then(fn2);
    }
  }
  update(changedProperties) {
    if (changedProperties.has("disabled")) {
      if (this.disabled) {
        this.endHover();
      }
    }
    super.update(changedProperties);
  }
  render() {
    const shouldActivateInPrimary = this.activated && (this.primary || !this.accent);
    const shouldSelectInPrimary = this.selected && (this.primary || !this.accent);
    const classes = {
      "mdc-ripple-surface--accent": this.accent,
      "mdc-ripple-surface--primary--activated": shouldActivateInPrimary,
      "mdc-ripple-surface--accent--activated": this.accent && this.activated,
      "mdc-ripple-surface--primary--selected": shouldSelectInPrimary,
      "mdc-ripple-surface--accent--selected": this.accent && this.selected,
      "mdc-ripple-surface--disabled": this.disabled,
      "mdc-ripple-surface--hover": this.hovering,
      "mdc-ripple-surface--primary": this.primary,
      "mdc-ripple-surface--selected": this.selected,
      "mdc-ripple-upgraded--background-focused": this.bgFocused,
      "mdc-ripple-upgraded--foreground-activation": this.fgActivation,
      "mdc-ripple-upgraded--foreground-deactivation": this.fgDeactivation,
      "mdc-ripple-upgraded--unbounded": this.unbounded
    };
    return html`
        <div class="mdc-ripple-surface mdc-ripple-upgraded ${classMap(classes)}"
          style="${styleMap({
      "--mdc-ripple-fg-scale": this.fgScale,
      "--mdc-ripple-fg-size": this.fgSize,
      "--mdc-ripple-fg-translate-end": this.translateEnd,
      "--mdc-ripple-fg-translate-start": this.translateStart,
      "--mdc-ripple-left": this.leftPos,
      "--mdc-ripple-top": this.topPos
    })}"></div>`;
  }
};
__decorate([
  query2(".mdc-ripple-surface")
], RippleBase.prototype, "mdcRoot", void 0);
__decorate([
  property2({ type: Boolean })
], RippleBase.prototype, "primary", void 0);
__decorate([
  property2({ type: Boolean })
], RippleBase.prototype, "accent", void 0);
__decorate([
  property2({ type: Boolean })
], RippleBase.prototype, "unbounded", void 0);
__decorate([
  property2({ type: Boolean })
], RippleBase.prototype, "disabled", void 0);
__decorate([
  property2({ type: Boolean })
], RippleBase.prototype, "activated", void 0);
__decorate([
  property2({ type: Boolean })
], RippleBase.prototype, "selected", void 0);
__decorate([
  internalProperty2()
], RippleBase.prototype, "hovering", void 0);
__decorate([
  internalProperty2()
], RippleBase.prototype, "bgFocused", void 0);
__decorate([
  internalProperty2()
], RippleBase.prototype, "fgActivation", void 0);
__decorate([
  internalProperty2()
], RippleBase.prototype, "fgDeactivation", void 0);
__decorate([
  internalProperty2()
], RippleBase.prototype, "fgScale", void 0);
__decorate([
  internalProperty2()
], RippleBase.prototype, "fgSize", void 0);
__decorate([
  internalProperty2()
], RippleBase.prototype, "translateStart", void 0);
__decorate([
  internalProperty2()
], RippleBase.prototype, "translateEnd", void 0);
__decorate([
  internalProperty2()
], RippleBase.prototype, "leftPos", void 0);
__decorate([
  internalProperty2()
], RippleBase.prototype, "topPos", void 0);

// node_modules/@material/mwc-ripple/mwc-ripple-css.js
var style2 = css2`.mdc-ripple-surface{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;position:relative;outline:none;overflow:hidden}.mdc-ripple-surface::before,.mdc-ripple-surface::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-ripple-surface::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-ripple-surface::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-ripple-surface.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface::before,.mdc-ripple-surface::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-ripple-surface:hover::before,.mdc-ripple-surface.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface::before,.mdc-ripple-surface::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded],.mdc-ripple-upgraded--unbounded{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::after,.mdc-ripple-upgraded--unbounded::before,.mdc-ripple-upgraded--unbounded::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::before,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;display:block}:host .mdc-ripple-surface{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;will-change:unset}.mdc-ripple-surface--primary::before,.mdc-ripple-surface--primary::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary:hover::before,.mdc-ripple-surface--primary.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--primary--activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface--primary--activated::before,.mdc-ripple-surface--primary--activated::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary--activated:hover::before,.mdc-ripple-surface--primary--activated.mdc-ripple-surface--hover::before{opacity:0.16;opacity:var(--mdc-ripple-hover-opacity, 0.16)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary--selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface--primary--selected::before,.mdc-ripple-surface--primary--selected::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary--selected:hover::before,.mdc-ripple-surface--primary--selected.mdc-ripple-surface--hover::before{opacity:0.12;opacity:var(--mdc-ripple-hover-opacity, 0.12)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-focus-opacity, 0.2)}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--accent::before,.mdc-ripple-surface--accent::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent:hover::before,.mdc-ripple-surface--accent.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--accent--activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface--accent--activated::before,.mdc-ripple-surface--accent--activated::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent--activated:hover::before,.mdc-ripple-surface--accent--activated.mdc-ripple-surface--hover::before{opacity:0.16;opacity:var(--mdc-ripple-hover-opacity, 0.16)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--accent--selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface--accent--selected::before,.mdc-ripple-surface--accent--selected::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent--selected:hover::before,.mdc-ripple-surface--accent--selected.mdc-ripple-surface--hover::before{opacity:0.12;opacity:var(--mdc-ripple-hover-opacity, 0.12)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-focus-opacity, 0.2)}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--disabled{opacity:0}`;

// node_modules/@material/mwc-ripple/mwc-ripple.js
var Ripple = class Ripple2 extends RippleBase {
};
Ripple.styles = style2;
Ripple = __decorate([
  customElement2("mwc-ripple")
], Ripple);

// node_modules/@material/mwc-base/observer.js
var observer = (observer2) => (proto, propName) => {
  if (!proto.constructor._observers) {
    proto.constructor._observers = new Map();
    const userUpdated = proto.updated;
    proto.updated = function(changedProperties) {
      userUpdated.call(this, changedProperties);
      changedProperties.forEach((v, k) => {
        const observers = this.constructor._observers;
        const observer3 = observers.get(k);
        if (observer3 !== void 0) {
          observer3.call(this, this[k], v);
        }
      });
    };
  } else if (!proto.constructor.hasOwnProperty("_observers")) {
    const observers = proto.constructor._observers;
    proto.constructor._observers = new Map();
    observers.forEach((v, k) => proto.constructor._observers.set(k, v));
  }
  proto.constructor._observers.set(propName, observer2);
};

// node_modules/@material/mwc-ripple/ripple-handlers.js
var RippleHandlers = class {
  constructor(rippleFn) {
    this.startPress = (ev) => {
      rippleFn().then((r2) => {
        r2 && r2.startPress(ev);
      });
    };
    this.endPress = () => {
      rippleFn().then((r2) => {
        r2 && r2.endPress();
      });
    };
    this.startFocus = () => {
      rippleFn().then((r2) => {
        r2 && r2.startFocus();
      });
    };
    this.endFocus = () => {
      rippleFn().then((r2) => {
        r2 && r2.endFocus();
      });
    };
    this.startHover = () => {
      rippleFn().then((r2) => {
        r2 && r2.startHover();
      });
    };
    this.endHover = () => {
      rippleFn().then((r2) => {
        r2 && r2.endHover();
      });
    };
  }
};

// node_modules/@material/tab/constants.js
var cssClasses3 = {
  ACTIVE: "mdc-tab--active"
};
var strings3 = {
  ARIA_SELECTED: "aria-selected",
  CONTENT_SELECTOR: ".mdc-tab__content",
  INTERACTED_EVENT: "MDCTab:interacted",
  RIPPLE_SELECTOR: ".mdc-tab__ripple",
  TABINDEX: "tabIndex",
  TAB_INDICATOR_SELECTOR: ".mdc-tab-indicator"
};

// node_modules/@material/tab/foundation.js
var MDCTabFoundation = function(_super) {
  __extends(MDCTabFoundation2, _super);
  function MDCTabFoundation2(adapter) {
    var _this = _super.call(this, __assign(__assign({}, MDCTabFoundation2.defaultAdapter), adapter)) || this;
    _this.focusOnActivate_ = true;
    return _this;
  }
  Object.defineProperty(MDCTabFoundation2, "cssClasses", {
    get: function() {
      return cssClasses3;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTabFoundation2, "strings", {
    get: function() {
      return strings3;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTabFoundation2, "defaultAdapter", {
    get: function() {
      return {
        addClass: function() {
          return void 0;
        },
        removeClass: function() {
          return void 0;
        },
        hasClass: function() {
          return false;
        },
        setAttr: function() {
          return void 0;
        },
        activateIndicator: function() {
          return void 0;
        },
        deactivateIndicator: function() {
          return void 0;
        },
        notifyInteracted: function() {
          return void 0;
        },
        getOffsetLeft: function() {
          return 0;
        },
        getOffsetWidth: function() {
          return 0;
        },
        getContentOffsetLeft: function() {
          return 0;
        },
        getContentOffsetWidth: function() {
          return 0;
        },
        focus: function() {
          return void 0;
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  MDCTabFoundation2.prototype.handleClick = function() {
    this.adapter.notifyInteracted();
  };
  MDCTabFoundation2.prototype.isActive = function() {
    return this.adapter.hasClass(cssClasses3.ACTIVE);
  };
  MDCTabFoundation2.prototype.setFocusOnActivate = function(focusOnActivate) {
    this.focusOnActivate_ = focusOnActivate;
  };
  MDCTabFoundation2.prototype.activate = function(previousIndicatorClientRect) {
    this.adapter.addClass(cssClasses3.ACTIVE);
    this.adapter.setAttr(strings3.ARIA_SELECTED, "true");
    this.adapter.setAttr(strings3.TABINDEX, "0");
    this.adapter.activateIndicator(previousIndicatorClientRect);
    if (this.focusOnActivate_) {
      this.adapter.focus();
    }
  };
  MDCTabFoundation2.prototype.deactivate = function() {
    if (!this.isActive()) {
      return;
    }
    this.adapter.removeClass(cssClasses3.ACTIVE);
    this.adapter.setAttr(strings3.ARIA_SELECTED, "false");
    this.adapter.setAttr(strings3.TABINDEX, "-1");
    this.adapter.deactivateIndicator();
  };
  MDCTabFoundation2.prototype.computeDimensions = function() {
    var rootWidth = this.adapter.getOffsetWidth();
    var rootLeft = this.adapter.getOffsetLeft();
    var contentWidth = this.adapter.getContentOffsetWidth();
    var contentLeft = this.adapter.getContentOffsetLeft();
    return {
      contentLeft: rootLeft + contentLeft,
      contentRight: rootLeft + contentLeft + contentWidth,
      rootLeft,
      rootRight: rootLeft + rootWidth
    };
  };
  return MDCTabFoundation2;
}(MDCFoundation);
var foundation_default2 = MDCTabFoundation;

// node_modules/@material/mwc-tab/mwc-tab-base.js
var tabIdCounter = 0;
var TabBase = class extends BaseElement {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = foundation_default2;
    this.label = "";
    this.icon = "";
    this.hasImageIcon = false;
    this.isFadingIndicator = false;
    this.minWidth = false;
    this.isMinWidthIndicator = false;
    this.indicatorIcon = "";
    this.stacked = false;
    this.focusOnActivate = true;
    this._active = false;
    this.initFocus = false;
    this.shouldRenderRipple = false;
    this.rippleElement = null;
    this.rippleHandlers = new RippleHandlers(() => {
      this.shouldRenderRipple = true;
      this.ripple.then((v) => this.rippleElement = v);
      return this.ripple;
    });
  }
  get active() {
    return this._active;
  }
  createRenderRoot() {
    return this.attachShadow({ mode: "open", delegatesFocus: true });
  }
  connectedCallback() {
    this.dir = document.dir;
    super.connectedCallback();
  }
  firstUpdated() {
    super.firstUpdated();
    this.id = this.id || `mdc-tab-${++tabIdCounter}`;
  }
  render() {
    const classes = {
      "mdc-tab--min-width": this.minWidth,
      "mdc-tab--stacked": this.stacked
    };
    let iconTemplate = html``;
    if (this.hasImageIcon || this.icon) {
      iconTemplate = html`
        <span class="mdc-tab__icon material-icons"><slot name="icon">${this.icon}</slot></span>`;
    }
    let labelTemplate = html``;
    if (this.label) {
      labelTemplate = html`
        <span class="mdc-tab__text-label">${this.label}</span>`;
    }
    return html`
      <button
        @click="${this.handleClick}"
        class="mdc-tab ${classMap(classes)}"
        role="tab"
        aria-selected="false"
        tabindex="-1"
        @focus="${this.focus}"
        @blur="${this.handleBlur}"
        @mousedown="${this.handleRippleMouseDown}"
        @mouseenter="${this.handleRippleMouseEnter}"
        @mouseleave="${this.handleRippleMouseLeave}"
        @touchstart="${this.handleRippleTouchStart}"
        @touchend="${this.handleRippleDeactivate}"
        @touchcancel="${this.handleRippleDeactivate}">
        <span class="mdc-tab__content">
          ${iconTemplate}
          ${labelTemplate}
          ${this.isMinWidthIndicator ? this.renderIndicator() : ""}
        </span>
        ${this.isMinWidthIndicator ? "" : this.renderIndicator()}
        ${this.renderRipple()}
      </button>`;
  }
  renderIndicator() {
    return html`<mwc-tab-indicator
        .icon="${this.indicatorIcon}"
        .fade="${this.isFadingIndicator}"></mwc-tab-indicator>`;
  }
  renderRipple() {
    return this.shouldRenderRipple ? html`
          <mwc-ripple primary></mwc-ripple>
        ` : "";
  }
  createAdapter() {
    return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), { setAttr: (attr, value) => this.mdcRoot.setAttribute(attr, value), activateIndicator: async (previousIndicatorClientRect) => {
      await this.tabIndicator.updateComplete;
      this.tabIndicator.activate(previousIndicatorClientRect);
    }, deactivateIndicator: async () => {
      await this.tabIndicator.updateComplete;
      this.tabIndicator.deactivate();
    }, notifyInteracted: () => this.dispatchEvent(new CustomEvent(foundation_default2.strings.INTERACTED_EVENT, {
      detail: { tabId: this.id },
      bubbles: true,
      composed: true,
      cancelable: true
    })), getOffsetLeft: () => this.offsetLeft, getOffsetWidth: () => this.mdcRoot.offsetWidth, getContentOffsetLeft: () => this._contentElement.offsetLeft, getContentOffsetWidth: () => this._contentElement.offsetWidth, focus: () => {
      if (this.initFocus) {
        this.initFocus = false;
      } else {
        this.mdcRoot.focus();
      }
    } });
  }
  activate(clientRect) {
    if (!clientRect) {
      this.initFocus = true;
    }
    if (this.mdcFoundation) {
      this.mdcFoundation.activate(clientRect);
      this.setActive(this.mdcFoundation.isActive());
    } else {
      this.updateComplete.then(() => {
        this.mdcFoundation.activate(clientRect);
        this.setActive(this.mdcFoundation.isActive());
      });
    }
  }
  deactivate() {
    this.mdcFoundation.deactivate();
    this.setActive(this.mdcFoundation.isActive());
  }
  setActive(newValue) {
    const oldValue = this.active;
    if (oldValue !== newValue) {
      this._active = newValue;
      this.requestUpdate("active", oldValue);
    }
  }
  computeDimensions() {
    return this.mdcFoundation.computeDimensions();
  }
  computeIndicatorClientRect() {
    return this.tabIndicator.computeContentClientRect();
  }
  focus() {
    this.mdcRoot.focus();
    this.handleFocus();
  }
  handleClick() {
    this.handleFocus();
    this.mdcFoundation.handleClick();
  }
  handleFocus() {
    this.handleRippleFocus();
  }
  handleBlur() {
    this.handleRippleBlur();
  }
  handleRippleMouseDown(event) {
    const onUp = () => {
      window.removeEventListener("mouseup", onUp);
      this.handleRippleDeactivate();
    };
    window.addEventListener("mouseup", onUp);
    this.rippleHandlers.startPress(event);
  }
  handleRippleTouchStart(event) {
    this.rippleHandlers.startPress(event);
  }
  handleRippleDeactivate() {
    this.rippleHandlers.endPress();
  }
  handleRippleMouseEnter() {
    this.rippleHandlers.startHover();
  }
  handleRippleMouseLeave() {
    this.rippleHandlers.endHover();
  }
  handleRippleFocus() {
    this.rippleHandlers.startFocus();
  }
  handleRippleBlur() {
    this.rippleHandlers.endFocus();
  }
  get isRippleActive() {
    var _a4;
    return ((_a4 = this.rippleElement) === null || _a4 === void 0 ? void 0 : _a4.isActive) || false;
  }
};
__decorate([
  query2(".mdc-tab")
], TabBase.prototype, "mdcRoot", void 0);
__decorate([
  query2("mwc-tab-indicator")
], TabBase.prototype, "tabIndicator", void 0);
__decorate([
  property2()
], TabBase.prototype, "label", void 0);
__decorate([
  property2()
], TabBase.prototype, "icon", void 0);
__decorate([
  property2({ type: Boolean })
], TabBase.prototype, "hasImageIcon", void 0);
__decorate([
  property2({ type: Boolean })
], TabBase.prototype, "isFadingIndicator", void 0);
__decorate([
  property2({ type: Boolean })
], TabBase.prototype, "minWidth", void 0);
__decorate([
  property2({ type: Boolean })
], TabBase.prototype, "isMinWidthIndicator", void 0);
__decorate([
  property2({ type: Boolean, reflect: true, attribute: "active" })
], TabBase.prototype, "active", null);
__decorate([
  property2()
], TabBase.prototype, "indicatorIcon", void 0);
__decorate([
  property2({ type: Boolean })
], TabBase.prototype, "stacked", void 0);
__decorate([
  observer(async function(value) {
    await this.updateComplete;
    this.mdcFoundation.setFocusOnActivate(value);
  }),
  property2({ type: Boolean })
], TabBase.prototype, "focusOnActivate", void 0);
__decorate([
  query2(".mdc-tab__content")
], TabBase.prototype, "_contentElement", void 0);
__decorate([
  internalProperty2()
], TabBase.prototype, "shouldRenderRipple", void 0);
__decorate([
  queryAsync("mwc-ripple")
], TabBase.prototype, "ripple", void 0);
__decorate([
  eventOptions({ passive: true })
], TabBase.prototype, "handleRippleTouchStart", null);

// node_modules/@material/mwc-tab/mwc-tab-css.js
var style3 = css2`.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.mdc-tab{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform, uppercase);padding-right:24px;padding-left:24px;min-width:90px;position:relative;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;background:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab .mdc-tab__text-label{color:rgba(0, 0, 0, 0.6)}.mdc-tab .mdc-tab__icon{color:rgba(0, 0, 0, 0.54);fill:currentColor}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{position:relative;display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;width:24px;height:24px;font-size:24px;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-tab--active .mdc-tab__icon{color:#6200ee;color:var(--mdc-theme-primary, #6200ee);fill:currentColor}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-tab{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-tab .mdc-tab__ripple::before,.mdc-tab .mdc-tab__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-tab .mdc-tab__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-tab .mdc-tab__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-tab.mdc-ripple-upgraded .mdc-tab__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-tab.mdc-ripple-upgraded .mdc-tab__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-tab.mdc-ripple-upgraded--unbounded .mdc-tab__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-tab.mdc-ripple-upgraded--foreground-activation .mdc-tab__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-tab.mdc-ripple-upgraded--foreground-deactivation .mdc-tab__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-tab .mdc-tab__ripple::before,.mdc-tab .mdc-tab__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-tab.mdc-ripple-upgraded .mdc-tab__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-tab .mdc-tab__ripple::before,.mdc-tab .mdc-tab__ripple::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-tab:hover .mdc-tab__ripple::before,.mdc-tab.mdc-ripple-surface--hover .mdc-tab__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-tab.mdc-ripple-upgraded--background-focused .mdc-tab__ripple::before,.mdc-tab:not(.mdc-ripple-upgraded):focus .mdc-tab__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-tab:not(.mdc-ripple-upgraded) .mdc-tab__ripple::after{transition:opacity 150ms linear}.mdc-tab:not(.mdc-ripple-upgraded):active .mdc-tab__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-tab.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.12)}.mdc-tab__ripple{position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;will-change:transform,opacity}:host{outline:none;flex:1 0 auto;display:flex;justify-content:center;-webkit-tap-highlight-color:transparent}.mdc-tab{height:var(--mdc-tab-height, 48px);margin-left:0;margin-right:0;padding-right:var(--mdc-tab-horizontal-padding, 24px);padding-left:var(--mdc-tab-horizontal-padding, 24px)}.mdc-tab--stacked{height:var(--mdc-tab-stacked-height, 72px)}.mdc-tab::-moz-focus-inner{border:0}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mdc-tab-text-label-color-default, rgba(0, 0, 0, 0.6))}.mdc-tab:not(.mdc-tab--active) .mdc-tab__icon{color:var(--mdc-tab-color-default, rgba(0, 0, 0, 0.54))}`;

// node_modules/@material/mwc-tab/mwc-tab.js
var Tab = class Tab2 extends TabBase {
};
Tab.styles = style3;
Tab = __decorate([
  customElement2("mwc-tab")
], Tab);

// node_modules/@material/tab-scroller/constants.js
var cssClasses4 = {
  ANIMATING: "mdc-tab-scroller--animating",
  SCROLL_AREA_SCROLL: "mdc-tab-scroller__scroll-area--scroll",
  SCROLL_TEST: "mdc-tab-scroller__test"
};
var strings4 = {
  AREA_SELECTOR: ".mdc-tab-scroller__scroll-area",
  CONTENT_SELECTOR: ".mdc-tab-scroller__scroll-content"
};

// node_modules/@material/tab-scroller/rtl-scroller.js
var MDCTabScrollerRTL = function() {
  function MDCTabScrollerRTL2(adapter) {
    this.adapter = adapter;
  }
  return MDCTabScrollerRTL2;
}();

// node_modules/@material/tab-scroller/rtl-default-scroller.js
var MDCTabScrollerRTLDefault = function(_super) {
  __extends(MDCTabScrollerRTLDefault2, _super);
  function MDCTabScrollerRTLDefault2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  MDCTabScrollerRTLDefault2.prototype.getScrollPositionRTL = function() {
    var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
    var right = this.calculateScrollEdges_().right;
    return Math.round(right - currentScrollLeft);
  };
  MDCTabScrollerRTLDefault2.prototype.scrollToRTL = function(scrollX) {
    var edges = this.calculateScrollEdges_();
    var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
    var clampedScrollLeft = this.clampScrollValue_(edges.right - scrollX);
    return {
      finalScrollPosition: clampedScrollLeft,
      scrollDelta: clampedScrollLeft - currentScrollLeft
    };
  };
  MDCTabScrollerRTLDefault2.prototype.incrementScrollRTL = function(scrollX) {
    var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
    var clampedScrollLeft = this.clampScrollValue_(currentScrollLeft - scrollX);
    return {
      finalScrollPosition: clampedScrollLeft,
      scrollDelta: clampedScrollLeft - currentScrollLeft
    };
  };
  MDCTabScrollerRTLDefault2.prototype.getAnimatingScrollPosition = function(scrollX) {
    return scrollX;
  };
  MDCTabScrollerRTLDefault2.prototype.calculateScrollEdges_ = function() {
    var contentWidth = this.adapter.getScrollContentOffsetWidth();
    var rootWidth = this.adapter.getScrollAreaOffsetWidth();
    return {
      left: 0,
      right: contentWidth - rootWidth
    };
  };
  MDCTabScrollerRTLDefault2.prototype.clampScrollValue_ = function(scrollX) {
    var edges = this.calculateScrollEdges_();
    return Math.min(Math.max(edges.left, scrollX), edges.right);
  };
  return MDCTabScrollerRTLDefault2;
}(MDCTabScrollerRTL);

// node_modules/@material/tab-scroller/rtl-negative-scroller.js
var MDCTabScrollerRTLNegative = function(_super) {
  __extends(MDCTabScrollerRTLNegative2, _super);
  function MDCTabScrollerRTLNegative2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  MDCTabScrollerRTLNegative2.prototype.getScrollPositionRTL = function(translateX) {
    var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
    return Math.round(translateX - currentScrollLeft);
  };
  MDCTabScrollerRTLNegative2.prototype.scrollToRTL = function(scrollX) {
    var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
    var clampedScrollLeft = this.clampScrollValue_(-scrollX);
    return {
      finalScrollPosition: clampedScrollLeft,
      scrollDelta: clampedScrollLeft - currentScrollLeft
    };
  };
  MDCTabScrollerRTLNegative2.prototype.incrementScrollRTL = function(scrollX) {
    var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
    var clampedScrollLeft = this.clampScrollValue_(currentScrollLeft - scrollX);
    return {
      finalScrollPosition: clampedScrollLeft,
      scrollDelta: clampedScrollLeft - currentScrollLeft
    };
  };
  MDCTabScrollerRTLNegative2.prototype.getAnimatingScrollPosition = function(scrollX, translateX) {
    return scrollX - translateX;
  };
  MDCTabScrollerRTLNegative2.prototype.calculateScrollEdges_ = function() {
    var contentWidth = this.adapter.getScrollContentOffsetWidth();
    var rootWidth = this.adapter.getScrollAreaOffsetWidth();
    return {
      left: rootWidth - contentWidth,
      right: 0
    };
  };
  MDCTabScrollerRTLNegative2.prototype.clampScrollValue_ = function(scrollX) {
    var edges = this.calculateScrollEdges_();
    return Math.max(Math.min(edges.right, scrollX), edges.left);
  };
  return MDCTabScrollerRTLNegative2;
}(MDCTabScrollerRTL);

// node_modules/@material/tab-scroller/rtl-reverse-scroller.js
var MDCTabScrollerRTLReverse = function(_super) {
  __extends(MDCTabScrollerRTLReverse2, _super);
  function MDCTabScrollerRTLReverse2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  MDCTabScrollerRTLReverse2.prototype.getScrollPositionRTL = function(translateX) {
    var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
    return Math.round(currentScrollLeft - translateX);
  };
  MDCTabScrollerRTLReverse2.prototype.scrollToRTL = function(scrollX) {
    var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
    var clampedScrollLeft = this.clampScrollValue_(scrollX);
    return {
      finalScrollPosition: clampedScrollLeft,
      scrollDelta: currentScrollLeft - clampedScrollLeft
    };
  };
  MDCTabScrollerRTLReverse2.prototype.incrementScrollRTL = function(scrollX) {
    var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
    var clampedScrollLeft = this.clampScrollValue_(currentScrollLeft + scrollX);
    return {
      finalScrollPosition: clampedScrollLeft,
      scrollDelta: currentScrollLeft - clampedScrollLeft
    };
  };
  MDCTabScrollerRTLReverse2.prototype.getAnimatingScrollPosition = function(scrollX, translateX) {
    return scrollX + translateX;
  };
  MDCTabScrollerRTLReverse2.prototype.calculateScrollEdges_ = function() {
    var contentWidth = this.adapter.getScrollContentOffsetWidth();
    var rootWidth = this.adapter.getScrollAreaOffsetWidth();
    return {
      left: contentWidth - rootWidth,
      right: 0
    };
  };
  MDCTabScrollerRTLReverse2.prototype.clampScrollValue_ = function(scrollX) {
    var edges = this.calculateScrollEdges_();
    return Math.min(Math.max(edges.right, scrollX), edges.left);
  };
  return MDCTabScrollerRTLReverse2;
}(MDCTabScrollerRTL);

// node_modules/@material/tab-scroller/foundation.js
var MDCTabScrollerFoundation = function(_super) {
  __extends(MDCTabScrollerFoundation2, _super);
  function MDCTabScrollerFoundation2(adapter) {
    var _this = _super.call(this, __assign(__assign({}, MDCTabScrollerFoundation2.defaultAdapter), adapter)) || this;
    _this.isAnimating_ = false;
    return _this;
  }
  Object.defineProperty(MDCTabScrollerFoundation2, "cssClasses", {
    get: function() {
      return cssClasses4;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTabScrollerFoundation2, "strings", {
    get: function() {
      return strings4;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTabScrollerFoundation2, "defaultAdapter", {
    get: function() {
      return {
        eventTargetMatchesSelector: function() {
          return false;
        },
        addClass: function() {
          return void 0;
        },
        removeClass: function() {
          return void 0;
        },
        addScrollAreaClass: function() {
          return void 0;
        },
        setScrollAreaStyleProperty: function() {
          return void 0;
        },
        setScrollContentStyleProperty: function() {
          return void 0;
        },
        getScrollContentStyleValue: function() {
          return "";
        },
        setScrollAreaScrollLeft: function() {
          return void 0;
        },
        getScrollAreaScrollLeft: function() {
          return 0;
        },
        getScrollContentOffsetWidth: function() {
          return 0;
        },
        getScrollAreaOffsetWidth: function() {
          return 0;
        },
        computeScrollAreaClientRect: function() {
          return { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
        },
        computeScrollContentClientRect: function() {
          return { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
        },
        computeHorizontalScrollbarHeight: function() {
          return 0;
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  MDCTabScrollerFoundation2.prototype.init = function() {
    var horizontalScrollbarHeight = this.adapter.computeHorizontalScrollbarHeight();
    this.adapter.setScrollAreaStyleProperty("margin-bottom", -horizontalScrollbarHeight + "px");
    this.adapter.addScrollAreaClass(MDCTabScrollerFoundation2.cssClasses.SCROLL_AREA_SCROLL);
  };
  MDCTabScrollerFoundation2.prototype.getScrollPosition = function() {
    if (this.isRTL_()) {
      return this.computeCurrentScrollPositionRTL_();
    }
    var currentTranslateX = this.calculateCurrentTranslateX_();
    var scrollLeft = this.adapter.getScrollAreaScrollLeft();
    return scrollLeft - currentTranslateX;
  };
  MDCTabScrollerFoundation2.prototype.handleInteraction = function() {
    if (!this.isAnimating_) {
      return;
    }
    this.stopScrollAnimation_();
  };
  MDCTabScrollerFoundation2.prototype.handleTransitionEnd = function(evt) {
    var evtTarget = evt.target;
    if (!this.isAnimating_ || !this.adapter.eventTargetMatchesSelector(evtTarget, MDCTabScrollerFoundation2.strings.CONTENT_SELECTOR)) {
      return;
    }
    this.isAnimating_ = false;
    this.adapter.removeClass(MDCTabScrollerFoundation2.cssClasses.ANIMATING);
  };
  MDCTabScrollerFoundation2.prototype.incrementScroll = function(scrollXIncrement) {
    if (scrollXIncrement === 0) {
      return;
    }
    this.animate_(this.getIncrementScrollOperation_(scrollXIncrement));
  };
  MDCTabScrollerFoundation2.prototype.incrementScrollImmediate = function(scrollXIncrement) {
    if (scrollXIncrement === 0) {
      return;
    }
    var operation = this.getIncrementScrollOperation_(scrollXIncrement);
    if (operation.scrollDelta === 0) {
      return;
    }
    this.stopScrollAnimation_();
    this.adapter.setScrollAreaScrollLeft(operation.finalScrollPosition);
  };
  MDCTabScrollerFoundation2.prototype.scrollTo = function(scrollX) {
    if (this.isRTL_()) {
      return this.scrollToRTL_(scrollX);
    }
    this.scrollTo_(scrollX);
  };
  MDCTabScrollerFoundation2.prototype.getRTLScroller = function() {
    if (!this.rtlScrollerInstance_) {
      this.rtlScrollerInstance_ = this.rtlScrollerFactory_();
    }
    return this.rtlScrollerInstance_;
  };
  MDCTabScrollerFoundation2.prototype.calculateCurrentTranslateX_ = function() {
    var transformValue = this.adapter.getScrollContentStyleValue("transform");
    if (transformValue === "none") {
      return 0;
    }
    var match = /\((.+?)\)/.exec(transformValue);
    if (!match) {
      return 0;
    }
    var matrixParams = match[1];
    var _a4 = __read(matrixParams.split(","), 6), a = _a4[0], b = _a4[1], c = _a4[2], d = _a4[3], tx = _a4[4], ty = _a4[5];
    return parseFloat(tx);
  };
  MDCTabScrollerFoundation2.prototype.clampScrollValue_ = function(scrollX) {
    var edges = this.calculateScrollEdges_();
    return Math.min(Math.max(edges.left, scrollX), edges.right);
  };
  MDCTabScrollerFoundation2.prototype.computeCurrentScrollPositionRTL_ = function() {
    var translateX = this.calculateCurrentTranslateX_();
    return this.getRTLScroller().getScrollPositionRTL(translateX);
  };
  MDCTabScrollerFoundation2.prototype.calculateScrollEdges_ = function() {
    var contentWidth = this.adapter.getScrollContentOffsetWidth();
    var rootWidth = this.adapter.getScrollAreaOffsetWidth();
    return {
      left: 0,
      right: contentWidth - rootWidth
    };
  };
  MDCTabScrollerFoundation2.prototype.scrollTo_ = function(scrollX) {
    var currentScrollX = this.getScrollPosition();
    var safeScrollX = this.clampScrollValue_(scrollX);
    var scrollDelta = safeScrollX - currentScrollX;
    this.animate_({
      finalScrollPosition: safeScrollX,
      scrollDelta
    });
  };
  MDCTabScrollerFoundation2.prototype.scrollToRTL_ = function(scrollX) {
    var animation = this.getRTLScroller().scrollToRTL(scrollX);
    this.animate_(animation);
  };
  MDCTabScrollerFoundation2.prototype.getIncrementScrollOperation_ = function(scrollX) {
    if (this.isRTL_()) {
      return this.getRTLScroller().incrementScrollRTL(scrollX);
    }
    var currentScrollX = this.getScrollPosition();
    var targetScrollX = scrollX + currentScrollX;
    var safeScrollX = this.clampScrollValue_(targetScrollX);
    var scrollDelta = safeScrollX - currentScrollX;
    return {
      finalScrollPosition: safeScrollX,
      scrollDelta
    };
  };
  MDCTabScrollerFoundation2.prototype.animate_ = function(animation) {
    var _this = this;
    if (animation.scrollDelta === 0) {
      return;
    }
    this.stopScrollAnimation_();
    this.adapter.setScrollAreaScrollLeft(animation.finalScrollPosition);
    this.adapter.setScrollContentStyleProperty("transform", "translateX(" + animation.scrollDelta + "px)");
    this.adapter.computeScrollAreaClientRect();
    requestAnimationFrame(function() {
      _this.adapter.addClass(MDCTabScrollerFoundation2.cssClasses.ANIMATING);
      _this.adapter.setScrollContentStyleProperty("transform", "none");
    });
    this.isAnimating_ = true;
  };
  MDCTabScrollerFoundation2.prototype.stopScrollAnimation_ = function() {
    this.isAnimating_ = false;
    var currentScrollPosition = this.getAnimatingScrollPosition_();
    this.adapter.removeClass(MDCTabScrollerFoundation2.cssClasses.ANIMATING);
    this.adapter.setScrollContentStyleProperty("transform", "translateX(0px)");
    this.adapter.setScrollAreaScrollLeft(currentScrollPosition);
  };
  MDCTabScrollerFoundation2.prototype.getAnimatingScrollPosition_ = function() {
    var currentTranslateX = this.calculateCurrentTranslateX_();
    var scrollLeft = this.adapter.getScrollAreaScrollLeft();
    if (this.isRTL_()) {
      return this.getRTLScroller().getAnimatingScrollPosition(scrollLeft, currentTranslateX);
    }
    return scrollLeft - currentTranslateX;
  };
  MDCTabScrollerFoundation2.prototype.rtlScrollerFactory_ = function() {
    var initialScrollLeft = this.adapter.getScrollAreaScrollLeft();
    this.adapter.setScrollAreaScrollLeft(initialScrollLeft - 1);
    var newScrollLeft = this.adapter.getScrollAreaScrollLeft();
    if (newScrollLeft < 0) {
      this.adapter.setScrollAreaScrollLeft(initialScrollLeft);
      return new MDCTabScrollerRTLNegative(this.adapter);
    }
    var rootClientRect = this.adapter.computeScrollAreaClientRect();
    var contentClientRect = this.adapter.computeScrollContentClientRect();
    var rightEdgeDelta = Math.round(contentClientRect.right - rootClientRect.right);
    this.adapter.setScrollAreaScrollLeft(initialScrollLeft);
    if (rightEdgeDelta === newScrollLeft) {
      return new MDCTabScrollerRTLReverse(this.adapter);
    }
    return new MDCTabScrollerRTLDefault(this.adapter);
  };
  MDCTabScrollerFoundation2.prototype.isRTL_ = function() {
    return this.adapter.getScrollContentStyleValue("direction") === "rtl";
  };
  return MDCTabScrollerFoundation2;
}(MDCFoundation);
var foundation_default3 = MDCTabScrollerFoundation;

// node_modules/@material/mwc-tab-scroller/mwc-tab-scroller-base.js
var TabScrollerBase = class extends BaseElement {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = foundation_default3;
    this._scrollbarHeight = -1;
  }
  _handleInteraction() {
    this.mdcFoundation.handleInteraction();
  }
  _handleTransitionEnd(e2) {
    this.mdcFoundation.handleTransitionEnd(e2);
  }
  render() {
    return html`
      <div class="mdc-tab-scroller">
        <div class="mdc-tab-scroller__scroll-area"
            @wheel="${this._handleInteraction}"
            @touchstart="${this._handleInteraction}"
            @pointerdown="${this._handleInteraction}"
            @mousedown="${this._handleInteraction}"
            @keydown="${this._handleInteraction}"
            @transitionend="${this._handleTransitionEnd}">
          <div class="mdc-tab-scroller__scroll-content"><slot></slot></div>
        </div>
      </div>
      `;
  }
  createAdapter() {
    return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), { eventTargetMatchesSelector: (evtTarget, selector) => matches(evtTarget, selector), addScrollAreaClass: (className) => this.scrollAreaElement.classList.add(className), setScrollAreaStyleProperty: (prop, value) => this.scrollAreaElement.style.setProperty(prop, value), setScrollContentStyleProperty: (prop, value) => this.scrollContentElement.style.setProperty(prop, value), getScrollContentStyleValue: (propName) => window.getComputedStyle(this.scrollContentElement).getPropertyValue(propName), setScrollAreaScrollLeft: (scrollX) => this.scrollAreaElement.scrollLeft = scrollX, getScrollAreaScrollLeft: () => this.scrollAreaElement.scrollLeft, getScrollContentOffsetWidth: () => this.scrollContentElement.offsetWidth, getScrollAreaOffsetWidth: () => this.scrollAreaElement.offsetWidth, computeScrollAreaClientRect: () => this.scrollAreaElement.getBoundingClientRect(), computeScrollContentClientRect: () => this.scrollContentElement.getBoundingClientRect(), computeHorizontalScrollbarHeight: () => {
      if (this._scrollbarHeight === -1) {
        this.scrollAreaElement.style.overflowX = "scroll";
        this._scrollbarHeight = this.scrollAreaElement.offsetHeight - this.scrollAreaElement.clientHeight;
        this.scrollAreaElement.style.overflowX = "";
      }
      return this._scrollbarHeight;
    } });
  }
  getScrollPosition() {
    return this.mdcFoundation.getScrollPosition();
  }
  getScrollContentWidth() {
    return this.scrollContentElement.offsetWidth;
  }
  incrementScrollPosition(scrollXIncrement) {
    this.mdcFoundation.incrementScroll(scrollXIncrement);
  }
  scrollToPosition(scrollX) {
    this.mdcFoundation.scrollTo(scrollX);
  }
};
__decorate([
  query2(".mdc-tab-scroller")
], TabScrollerBase.prototype, "mdcRoot", void 0);
__decorate([
  query2(".mdc-tab-scroller__scroll-area")
], TabScrollerBase.prototype, "scrollAreaElement", void 0);
__decorate([
  query2(".mdc-tab-scroller__scroll-content")
], TabScrollerBase.prototype, "scrollContentElement", void 0);
__decorate([
  eventOptions({ passive: true })
], TabScrollerBase.prototype, "_handleInteraction", null);

// node_modules/@material/mwc-tab-scroller/mwc-tab-scroller-css.js
var style4 = css2`.mdc-tab-scroller{overflow-y:hidden}.mdc-tab-scroller.mdc-tab-scroller--animating .mdc-tab-scroller__scroll-content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-scroller__test{position:absolute;top:-9999px;width:100px;height:100px;overflow-x:scroll}.mdc-tab-scroller__scroll-area{-webkit-overflow-scrolling:touch;display:flex;overflow-x:hidden}.mdc-tab-scroller__scroll-area::-webkit-scrollbar,.mdc-tab-scroller__test::-webkit-scrollbar{display:none}.mdc-tab-scroller__scroll-area--scroll{overflow-x:scroll}.mdc-tab-scroller__scroll-content{position:relative;display:flex;flex:1 0 auto;transform:none;will-change:transform}.mdc-tab-scroller--align-start .mdc-tab-scroller__scroll-content{justify-content:flex-start}.mdc-tab-scroller--align-end .mdc-tab-scroller__scroll-content{justify-content:flex-end}.mdc-tab-scroller--align-center .mdc-tab-scroller__scroll-content{justify-content:center}.mdc-tab-scroller--animating .mdc-tab-scroller__scroll-area{-webkit-overflow-scrolling:auto}:host{display:flex}.mdc-tab-scroller{flex:1}`;

// node_modules/@material/mwc-tab-scroller/mwc-tab-scroller.js
var TabScroller = class TabScroller2 extends TabScrollerBase {
};
TabScroller.styles = style4;
TabScroller = __decorate([
  customElement2("mwc-tab-scroller")
], TabScroller);

// node_modules/@material/tab-bar/constants.js
var strings5 = {
  ARROW_LEFT_KEY: "ArrowLeft",
  ARROW_RIGHT_KEY: "ArrowRight",
  END_KEY: "End",
  ENTER_KEY: "Enter",
  HOME_KEY: "Home",
  SPACE_KEY: "Space",
  TAB_ACTIVATED_EVENT: "MDCTabBar:activated",
  TAB_SCROLLER_SELECTOR: ".mdc-tab-scroller",
  TAB_SELECTOR: ".mdc-tab"
};
var numbers2 = {
  ARROW_LEFT_KEYCODE: 37,
  ARROW_RIGHT_KEYCODE: 39,
  END_KEYCODE: 35,
  ENTER_KEYCODE: 13,
  EXTRA_SCROLL_AMOUNT: 20,
  HOME_KEYCODE: 36,
  SPACE_KEYCODE: 32
};

// node_modules/@material/tab-bar/foundation.js
var ACCEPTABLE_KEYS = new Set();
ACCEPTABLE_KEYS.add(strings5.ARROW_LEFT_KEY);
ACCEPTABLE_KEYS.add(strings5.ARROW_RIGHT_KEY);
ACCEPTABLE_KEYS.add(strings5.END_KEY);
ACCEPTABLE_KEYS.add(strings5.HOME_KEY);
ACCEPTABLE_KEYS.add(strings5.ENTER_KEY);
ACCEPTABLE_KEYS.add(strings5.SPACE_KEY);
var KEYCODE_MAP = new Map();
KEYCODE_MAP.set(numbers2.ARROW_LEFT_KEYCODE, strings5.ARROW_LEFT_KEY);
KEYCODE_MAP.set(numbers2.ARROW_RIGHT_KEYCODE, strings5.ARROW_RIGHT_KEY);
KEYCODE_MAP.set(numbers2.END_KEYCODE, strings5.END_KEY);
KEYCODE_MAP.set(numbers2.HOME_KEYCODE, strings5.HOME_KEY);
KEYCODE_MAP.set(numbers2.ENTER_KEYCODE, strings5.ENTER_KEY);
KEYCODE_MAP.set(numbers2.SPACE_KEYCODE, strings5.SPACE_KEY);
var MDCTabBarFoundation = function(_super) {
  __extends(MDCTabBarFoundation2, _super);
  function MDCTabBarFoundation2(adapter) {
    var _this = _super.call(this, __assign(__assign({}, MDCTabBarFoundation2.defaultAdapter), adapter)) || this;
    _this.useAutomaticActivation_ = false;
    return _this;
  }
  Object.defineProperty(MDCTabBarFoundation2, "strings", {
    get: function() {
      return strings5;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTabBarFoundation2, "numbers", {
    get: function() {
      return numbers2;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTabBarFoundation2, "defaultAdapter", {
    get: function() {
      return {
        scrollTo: function() {
          return void 0;
        },
        incrementScroll: function() {
          return void 0;
        },
        getScrollPosition: function() {
          return 0;
        },
        getScrollContentWidth: function() {
          return 0;
        },
        getOffsetWidth: function() {
          return 0;
        },
        isRTL: function() {
          return false;
        },
        setActiveTab: function() {
          return void 0;
        },
        activateTabAtIndex: function() {
          return void 0;
        },
        deactivateTabAtIndex: function() {
          return void 0;
        },
        focusTabAtIndex: function() {
          return void 0;
        },
        getTabIndicatorClientRectAtIndex: function() {
          return { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
        },
        getTabDimensionsAtIndex: function() {
          return { rootLeft: 0, rootRight: 0, contentLeft: 0, contentRight: 0 };
        },
        getPreviousActiveTabIndex: function() {
          return -1;
        },
        getFocusedTabIndex: function() {
          return -1;
        },
        getIndexOfTabById: function() {
          return -1;
        },
        getTabListLength: function() {
          return 0;
        },
        notifyTabActivated: function() {
          return void 0;
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  MDCTabBarFoundation2.prototype.setUseAutomaticActivation = function(useAutomaticActivation) {
    this.useAutomaticActivation_ = useAutomaticActivation;
  };
  MDCTabBarFoundation2.prototype.activateTab = function(index) {
    var previousActiveIndex = this.adapter.getPreviousActiveTabIndex();
    if (!this.indexIsInRange_(index) || index === previousActiveIndex) {
      return;
    }
    var previousClientRect;
    if (previousActiveIndex !== -1) {
      this.adapter.deactivateTabAtIndex(previousActiveIndex);
      previousClientRect = this.adapter.getTabIndicatorClientRectAtIndex(previousActiveIndex);
    }
    this.adapter.activateTabAtIndex(index, previousClientRect);
    this.scrollIntoView(index);
    this.adapter.notifyTabActivated(index);
  };
  MDCTabBarFoundation2.prototype.handleKeyDown = function(evt) {
    var key = this.getKeyFromEvent_(evt);
    if (key === void 0) {
      return;
    }
    if (!this.isActivationKey_(key)) {
      evt.preventDefault();
    }
    if (this.useAutomaticActivation_) {
      if (this.isActivationKey_(key)) {
        return;
      }
      var index = this.determineTargetFromKey_(this.adapter.getPreviousActiveTabIndex(), key);
      this.adapter.setActiveTab(index);
      this.scrollIntoView(index);
    } else {
      var focusedTabIndex = this.adapter.getFocusedTabIndex();
      if (this.isActivationKey_(key)) {
        this.adapter.setActiveTab(focusedTabIndex);
      } else {
        var index = this.determineTargetFromKey_(focusedTabIndex, key);
        this.adapter.focusTabAtIndex(index);
        this.scrollIntoView(index);
      }
    }
  };
  MDCTabBarFoundation2.prototype.handleTabInteraction = function(evt) {
    this.adapter.setActiveTab(this.adapter.getIndexOfTabById(evt.detail.tabId));
  };
  MDCTabBarFoundation2.prototype.scrollIntoView = function(index) {
    if (!this.indexIsInRange_(index)) {
      return;
    }
    if (index === 0) {
      return this.adapter.scrollTo(0);
    }
    if (index === this.adapter.getTabListLength() - 1) {
      return this.adapter.scrollTo(this.adapter.getScrollContentWidth());
    }
    if (this.isRTL_()) {
      return this.scrollIntoViewRTL_(index);
    }
    this.scrollIntoView_(index);
  };
  MDCTabBarFoundation2.prototype.determineTargetFromKey_ = function(origin, key) {
    var isRTL = this.isRTL_();
    var maxIndex = this.adapter.getTabListLength() - 1;
    var shouldGoToEnd = key === strings5.END_KEY;
    var shouldDecrement = key === strings5.ARROW_LEFT_KEY && !isRTL || key === strings5.ARROW_RIGHT_KEY && isRTL;
    var shouldIncrement = key === strings5.ARROW_RIGHT_KEY && !isRTL || key === strings5.ARROW_LEFT_KEY && isRTL;
    var index = origin;
    if (shouldGoToEnd) {
      index = maxIndex;
    } else if (shouldDecrement) {
      index -= 1;
    } else if (shouldIncrement) {
      index += 1;
    } else {
      index = 0;
    }
    if (index < 0) {
      index = maxIndex;
    } else if (index > maxIndex) {
      index = 0;
    }
    return index;
  };
  MDCTabBarFoundation2.prototype.calculateScrollIncrement_ = function(index, nextIndex, scrollPosition, barWidth) {
    var nextTabDimensions = this.adapter.getTabDimensionsAtIndex(nextIndex);
    var relativeContentLeft = nextTabDimensions.contentLeft - scrollPosition - barWidth;
    var relativeContentRight = nextTabDimensions.contentRight - scrollPosition;
    var leftIncrement = relativeContentRight - numbers2.EXTRA_SCROLL_AMOUNT;
    var rightIncrement = relativeContentLeft + numbers2.EXTRA_SCROLL_AMOUNT;
    if (nextIndex < index) {
      return Math.min(leftIncrement, 0);
    }
    return Math.max(rightIncrement, 0);
  };
  MDCTabBarFoundation2.prototype.calculateScrollIncrementRTL_ = function(index, nextIndex, scrollPosition, barWidth, scrollContentWidth) {
    var nextTabDimensions = this.adapter.getTabDimensionsAtIndex(nextIndex);
    var relativeContentLeft = scrollContentWidth - nextTabDimensions.contentLeft - scrollPosition;
    var relativeContentRight = scrollContentWidth - nextTabDimensions.contentRight - scrollPosition - barWidth;
    var leftIncrement = relativeContentRight + numbers2.EXTRA_SCROLL_AMOUNT;
    var rightIncrement = relativeContentLeft - numbers2.EXTRA_SCROLL_AMOUNT;
    if (nextIndex > index) {
      return Math.max(leftIncrement, 0);
    }
    return Math.min(rightIncrement, 0);
  };
  MDCTabBarFoundation2.prototype.findAdjacentTabIndexClosestToEdge_ = function(index, tabDimensions, scrollPosition, barWidth) {
    var relativeRootLeft = tabDimensions.rootLeft - scrollPosition;
    var relativeRootRight = tabDimensions.rootRight - scrollPosition - barWidth;
    var relativeRootDelta = relativeRootLeft + relativeRootRight;
    var leftEdgeIsCloser = relativeRootLeft < 0 || relativeRootDelta < 0;
    var rightEdgeIsCloser = relativeRootRight > 0 || relativeRootDelta > 0;
    if (leftEdgeIsCloser) {
      return index - 1;
    }
    if (rightEdgeIsCloser) {
      return index + 1;
    }
    return -1;
  };
  MDCTabBarFoundation2.prototype.findAdjacentTabIndexClosestToEdgeRTL_ = function(index, tabDimensions, scrollPosition, barWidth, scrollContentWidth) {
    var rootLeft = scrollContentWidth - tabDimensions.rootLeft - barWidth - scrollPosition;
    var rootRight = scrollContentWidth - tabDimensions.rootRight - scrollPosition;
    var rootDelta = rootLeft + rootRight;
    var leftEdgeIsCloser = rootLeft > 0 || rootDelta > 0;
    var rightEdgeIsCloser = rootRight < 0 || rootDelta < 0;
    if (leftEdgeIsCloser) {
      return index + 1;
    }
    if (rightEdgeIsCloser) {
      return index - 1;
    }
    return -1;
  };
  MDCTabBarFoundation2.prototype.getKeyFromEvent_ = function(evt) {
    if (ACCEPTABLE_KEYS.has(evt.key)) {
      return evt.key;
    }
    return KEYCODE_MAP.get(evt.keyCode);
  };
  MDCTabBarFoundation2.prototype.isActivationKey_ = function(key) {
    return key === strings5.SPACE_KEY || key === strings5.ENTER_KEY;
  };
  MDCTabBarFoundation2.prototype.indexIsInRange_ = function(index) {
    return index >= 0 && index < this.adapter.getTabListLength();
  };
  MDCTabBarFoundation2.prototype.isRTL_ = function() {
    return this.adapter.isRTL();
  };
  MDCTabBarFoundation2.prototype.scrollIntoView_ = function(index) {
    var scrollPosition = this.adapter.getScrollPosition();
    var barWidth = this.adapter.getOffsetWidth();
    var tabDimensions = this.adapter.getTabDimensionsAtIndex(index);
    var nextIndex = this.findAdjacentTabIndexClosestToEdge_(index, tabDimensions, scrollPosition, barWidth);
    if (!this.indexIsInRange_(nextIndex)) {
      return;
    }
    var scrollIncrement = this.calculateScrollIncrement_(index, nextIndex, scrollPosition, barWidth);
    this.adapter.incrementScroll(scrollIncrement);
  };
  MDCTabBarFoundation2.prototype.scrollIntoViewRTL_ = function(index) {
    var scrollPosition = this.adapter.getScrollPosition();
    var barWidth = this.adapter.getOffsetWidth();
    var tabDimensions = this.adapter.getTabDimensionsAtIndex(index);
    var scrollWidth = this.adapter.getScrollContentWidth();
    var nextIndex = this.findAdjacentTabIndexClosestToEdgeRTL_(index, tabDimensions, scrollPosition, barWidth, scrollWidth);
    if (!this.indexIsInRange_(nextIndex)) {
      return;
    }
    var scrollIncrement = this.calculateScrollIncrementRTL_(index, nextIndex, scrollPosition, barWidth, scrollWidth);
    this.adapter.incrementScroll(scrollIncrement);
  };
  return MDCTabBarFoundation2;
}(MDCFoundation);
var foundation_default4 = MDCTabBarFoundation;

// node_modules/@material/mwc-tab-bar/mwc-tab-bar-base.js
var TabBarBase = class extends BaseElement {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = foundation_default4;
    this.activeIndex = 0;
    this._previousActiveIndex = -1;
  }
  _handleTabInteraction(e2) {
    this.mdcFoundation.handleTabInteraction(e2);
  }
  _handleKeydown(e2) {
    this.mdcFoundation.handleKeyDown(e2);
  }
  render() {
    return html`
      <div class="mdc-tab-bar" role="tablist"
          @MDCTab:interacted="${this._handleTabInteraction}"
          @keydown="${this._handleKeydown}">
        <mwc-tab-scroller><slot></slot></mwc-tab-scroller>
      </div>
      `;
  }
  _getTabs() {
    return this.tabsSlot.assignedNodes({ flatten: true }).filter((e2) => e2 instanceof Tab);
  }
  _getTab(index) {
    return this._getTabs()[index];
  }
  createAdapter() {
    return {
      scrollTo: (scrollX) => this.scrollerElement.scrollToPosition(scrollX),
      incrementScroll: (scrollXIncrement) => this.scrollerElement.incrementScrollPosition(scrollXIncrement),
      getScrollPosition: () => this.scrollerElement.getScrollPosition(),
      getScrollContentWidth: () => this.scrollerElement.getScrollContentWidth(),
      getOffsetWidth: () => this.mdcRoot.offsetWidth,
      isRTL: () => window.getComputedStyle(this.mdcRoot).getPropertyValue("direction") === "rtl",
      setActiveTab: (index) => this.mdcFoundation.activateTab(index),
      activateTabAtIndex: (index, clientRect) => {
        const tab = this._getTab(index);
        if (tab !== void 0) {
          tab.activate(clientRect);
        }
        this._previousActiveIndex = index;
      },
      deactivateTabAtIndex: (index) => {
        const tab = this._getTab(index);
        if (tab !== void 0) {
          tab.deactivate();
        }
      },
      focusTabAtIndex: (index) => {
        const tab = this._getTab(index);
        if (tab !== void 0) {
          tab.focus();
        }
      },
      getTabIndicatorClientRectAtIndex: (index) => {
        const tab = this._getTab(index);
        return tab !== void 0 ? tab.computeIndicatorClientRect() : new DOMRect();
      },
      getTabDimensionsAtIndex: (index) => {
        const tab = this._getTab(index);
        return tab !== void 0 ? tab.computeDimensions() : { rootLeft: 0, rootRight: 0, contentLeft: 0, contentRight: 0 };
      },
      getPreviousActiveTabIndex: () => {
        return this._previousActiveIndex;
      },
      getFocusedTabIndex: () => {
        const tabElements = this._getTabs();
        const activeElement = this.getRootNode().activeElement;
        return tabElements.indexOf(activeElement);
      },
      getIndexOfTabById: (id) => {
        const tabElements = this._getTabs();
        for (let i2 = 0; i2 < tabElements.length; i2++) {
          if (tabElements[i2].id === id) {
            return i2;
          }
        }
        return -1;
      },
      getTabListLength: () => this._getTabs().length,
      notifyTabActivated: (index) => {
        this.activeIndex = index;
        this.dispatchEvent(new CustomEvent(foundation_default4.strings.TAB_ACTIVATED_EVENT, { detail: { index }, bubbles: true, cancelable: true }));
      }
    };
  }
  firstUpdated() {
  }
  _getUpdateComplete() {
    let superPromise;
    if (super._getUpdateComplete) {
      superPromise = super._getUpdateComplete();
    } else {
      superPromise = super.getUpdateComplete();
    }
    return superPromise.then(() => this.scrollerElement.updateComplete).then(() => {
      if (this.mdcFoundation === void 0) {
        this.createFoundation();
      }
    });
  }
  getUpdateComplete() {
    return this._getUpdateComplete();
  }
  scrollIndexIntoView(index) {
    this.mdcFoundation.scrollIntoView(index);
  }
};
__decorate([
  query2(".mdc-tab-bar")
], TabBarBase.prototype, "mdcRoot", void 0);
__decorate([
  query2("mwc-tab-scroller")
], TabBarBase.prototype, "scrollerElement", void 0);
__decorate([
  query2("slot")
], TabBarBase.prototype, "tabsSlot", void 0);
__decorate([
  observer(async function() {
    await this.updateComplete;
    if (this.activeIndex !== this._previousActiveIndex) {
      this.mdcFoundation.activateTab(this.activeIndex);
    }
  }),
  property2({ type: Number })
], TabBarBase.prototype, "activeIndex", void 0);

// node_modules/@material/mwc-tab-bar/mwc-tab-bar-css.js
var style5 = css2`.mdc-tab-bar{width:100%}.mdc-tab{height:48px}.mdc-tab--stacked{height:72px}:host{display:block}.mdc-tab-bar{flex:1}mwc-tab{--mdc-tab-height: 48px;--mdc-tab-stacked-height: 72px}`;

// node_modules/@material/mwc-tab-bar/mwc-tab-bar.js
var TabBar = class TabBar2 extends TabBarBase {
};
TabBar.styles = style5;
TabBar = __decorate([
  customElement2("mwc-tab-bar")
], TabBar);

// node_modules/@material/mwc-base/aria-property.js
function tsDecorator(prototype, name, descriptor) {
  const constructor = prototype.constructor;
  if (!descriptor) {
    const litInternalPropertyKey = `__${name}`;
    descriptor = constructor.getPropertyDescriptor(name, litInternalPropertyKey);
    if (!descriptor) {
      throw new Error("@ariaProperty must be used after a @property decorator");
    }
  }
  const propDescriptor = descriptor;
  let attribute = "";
  if (!propDescriptor.set) {
    throw new Error(`@ariaProperty requires a setter for ${name}`);
  }
  const wrappedDescriptor = {
    configurable: true,
    enumerable: true,
    set(value) {
      if (attribute === "") {
        const options = constructor.getPropertyOptions(name);
        attribute = options.attribute;
      }
      if (this.hasAttribute(attribute)) {
        this.removeAttribute(attribute);
      }
      propDescriptor.set.call(this, value);
    }
  };
  if (propDescriptor.get) {
    wrappedDescriptor.get = function() {
      return propDescriptor.get.call(this);
    };
  }
  return wrappedDescriptor;
}
function ariaProperty(protoOrDescriptor, name, descriptor) {
  if (name !== void 0) {
    return tsDecorator(protoOrDescriptor, name, descriptor);
  } else {
    throw new Error("@ariaProperty only supports TypeScript Decorators");
  }
}

// node_modules/@material/mwc-icon-button/mwc-icon-button-base.js
var IconButtonBase = class extends LitElement2 {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.icon = "";
    this.shouldRenderRipple = false;
    this.rippleHandlers = new RippleHandlers(() => {
      this.shouldRenderRipple = true;
      return this.ripple;
    });
  }
  renderRipple() {
    return this.shouldRenderRipple ? html`
            <mwc-ripple
                .disabled="${this.disabled}"
                unbounded>
            </mwc-ripple>` : "";
  }
  focus() {
    const buttonElement = this.buttonElement;
    if (buttonElement) {
      this.rippleHandlers.startFocus();
      buttonElement.focus();
    }
  }
  blur() {
    const buttonElement = this.buttonElement;
    if (buttonElement) {
      this.rippleHandlers.endFocus();
      buttonElement.blur();
    }
  }
  render() {
    return html`<button
        class="mdc-icon-button"
        aria-label="${this.ariaLabel || this.icon}"
        ?disabled="${this.disabled}"
        @focus="${this.handleRippleFocus}"
        @blur="${this.handleRippleBlur}"
        @mousedown="${this.handleRippleMouseDown}"
        @mouseenter="${this.handleRippleMouseEnter}"
        @mouseleave="${this.handleRippleMouseLeave}"
        @touchstart="${this.handleRippleTouchStart}"
        @touchend="${this.handleRippleDeactivate}"
        @touchcancel="${this.handleRippleDeactivate}"
    >${this.renderRipple()}
    <i class="material-icons">${this.icon}</i>
    <span
      ><slot></slot
    ></span>
  </button>`;
  }
  handleRippleMouseDown(event) {
    const onUp = () => {
      window.removeEventListener("mouseup", onUp);
      this.handleRippleDeactivate();
    };
    window.addEventListener("mouseup", onUp);
    this.rippleHandlers.startPress(event);
  }
  handleRippleTouchStart(event) {
    this.rippleHandlers.startPress(event);
  }
  handleRippleDeactivate() {
    this.rippleHandlers.endPress();
  }
  handleRippleMouseEnter() {
    this.rippleHandlers.startHover();
  }
  handleRippleMouseLeave() {
    this.rippleHandlers.endHover();
  }
  handleRippleFocus() {
    this.rippleHandlers.startFocus();
  }
  handleRippleBlur() {
    this.rippleHandlers.endFocus();
  }
};
__decorate([
  property2({ type: Boolean, reflect: true })
], IconButtonBase.prototype, "disabled", void 0);
__decorate([
  property2({ type: String })
], IconButtonBase.prototype, "icon", void 0);
__decorate([
  ariaProperty,
  property2({ type: String, attribute: "aria-label" })
], IconButtonBase.prototype, "ariaLabel", void 0);
__decorate([
  query2("button")
], IconButtonBase.prototype, "buttonElement", void 0);
__decorate([
  queryAsync("mwc-ripple")
], IconButtonBase.prototype, "ripple", void 0);
__decorate([
  internalProperty2()
], IconButtonBase.prototype, "shouldRenderRipple", void 0);
__decorate([
  eventOptions({ passive: true })
], IconButtonBase.prototype, "handleRippleMouseDown", null);
__decorate([
  eventOptions({ passive: true })
], IconButtonBase.prototype, "handleRippleTouchStart", null);

// node_modules/@material/mwc-icon-button/mwc-icon-button-css.js
var style6 = css2`.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;font-size:24px;text-decoration:none;cursor:pointer;user-select:none;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button:disabled{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38))}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}:host{display:inline-block;outline:none;--mdc-ripple-color: currentcolor;-webkit-tap-highlight-color:transparent}:host([disabled]){pointer-events:none}:host,.mdc-icon-button{vertical-align:top}.mdc-icon-button{width:var(--mdc-icon-button-size, 48px);height:var(--mdc-icon-button-size, 48px);padding:calc( (var(--mdc-icon-button-size, 48px) - var(--mdc-icon-size, 24px)) / 2 )}.mdc-icon-button>i{position:absolute;top:0;padding-top:inherit}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block;width:var(--mdc-icon-size, 24px);height:var(--mdc-icon-size, 24px)}`;

// node_modules/@material/mwc-icon-button/mwc-icon-button.js
var IconButton = class IconButton2 extends IconButtonBase {
};
IconButton.styles = style6;
IconButton = __decorate([
  customElement2("mwc-icon-button")
], IconButton);

// node_modules/lit-html/directives/if-defined.js
var previousValues = new WeakMap();
var ifDefined = directive((value) => (part) => {
  const previousValue = previousValues.get(part);
  if (value === void 0 && part instanceof AttributePart) {
    if (previousValue !== void 0 || !previousValues.has(part)) {
      const name = part.committer.name;
      part.committer.element.removeAttribute(name);
    }
  } else if (value !== previousValue) {
    part.setValue(value);
  }
  previousValues.set(part, value);
});

// node_modules/playground-elements/_codemirror/codemirror-bundle.js
var e;
function t(e2, t2, r2, n2, i2, o) {
  this.name = e2, this.tokenType = t2, this.depth = r2, this.parent = n2, this.startLine = i2, this.startPos = o;
}
function r() {
  this.stream = null, this.line = this.startPos = 0, this.string = this.startLine = "", this.copyInstance = null;
}
e = function() {
  var e2 = navigator.userAgent, t2 = navigator.platform, r2 = /gecko\/\d/i.test(e2), n2 = /MSIE \d/.test(e2), i2 = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(e2), o = /Edge\/(\d+)/.exec(e2), a = n2 || i2 || o, l = a && (n2 ? document.documentMode || 6 : +(o || i2)[1]), s = !o && /WebKit\//.test(e2), c = s && /Qt\/\d+\.\d+/.test(e2), u = !o && /Chrome\//.test(e2), d = /Opera\//.test(e2), f = /Apple Computer/.test(navigator.vendor), h = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(e2), p = /PhantomJS/.test(e2), m = f && (/Mobile\/\w+/.test(e2) || navigator.maxTouchPoints > 2), g = /Android/.test(e2), v = m || g || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(e2), y = m || /Mac/.test(t2), b = /\bCrOS\b/.test(e2), w = /win/i.test(t2), k = d && e2.match(/Version\/(\d*\.\d*)/);
  k && (k = Number(k[1])), k && k >= 15 && (d = false, s = true);
  var x = y && (c || d && (k == null || k < 12.11)), C = r2 || a && l >= 9;
  function S(e3) {
    return RegExp("(^|\\s)" + e3 + "(?:$|\\s)\\s*");
  }
  var L, T = function(e3, t3) {
    var r3 = e3.className, n3 = S(t3).exec(r3);
    if (n3) {
      var i3 = r3.slice(n3.index + n3[0].length);
      e3.className = r3.slice(0, n3.index) + (i3 ? n3[1] + i3 : "");
    }
  };
  function A(e3) {
    for (var t3 = e3.childNodes.length; t3 > 0; --t3)
      e3.removeChild(e3.firstChild);
    return e3;
  }
  function M(e3, t3) {
    return A(e3).appendChild(t3);
  }
  function z(e3, t3, r3, n3) {
    var i3 = document.createElement(e3);
    if (r3 && (i3.className = r3), n3 && (i3.style.cssText = n3), typeof t3 == "string")
      i3.appendChild(document.createTextNode(t3));
    else if (t3)
      for (var o2 = 0; o2 < t3.length; ++o2)
        i3.appendChild(t3[o2]);
    return i3;
  }
  function O(e3, t3, r3, n3) {
    var i3 = z(e3, t3, r3, n3);
    return i3.setAttribute("role", "presentation"), i3;
  }
  function _(e3, t3) {
    if (t3.nodeType == 3 && (t3 = t3.parentNode), e3.contains)
      return e3.contains(t3);
    do {
      if (t3.nodeType == 11 && (t3 = t3.host), t3 == e3)
        return true;
    } while (t3 = t3.parentNode);
  }
  function N() {
    var e3;
    try {
      e3 = document.activeElement;
    } catch (t3) {
      e3 = document.body || null;
    }
    for (; e3 && e3.shadowRoot && e3.shadowRoot.activeElement; )
      e3 = e3.shadowRoot.activeElement;
    return e3;
  }
  function P(e3, t3) {
    var r3 = e3.className;
    S(t3).test(r3) || (e3.className += (r3 ? " " : "") + t3);
  }
  function D(e3, t3) {
    for (var r3 = e3.split(" "), n3 = 0; n3 < r3.length; n3++)
      r3[n3] && !S(r3[n3]).test(t3) && (t3 += " " + r3[n3]);
    return t3;
  }
  L = document.createRange ? function(e3, t3, r3, n3) {
    var i3 = document.createRange();
    return i3.setEnd(n3 || e3, r3), i3.setStart(e3, t3), i3;
  } : function(e3, t3, r3) {
    var n3 = document.body.createTextRange();
    try {
      n3.moveToElementText(e3.parentNode);
    } catch (e4) {
      return n3;
    }
    return n3.collapse(true), n3.moveEnd("character", r3), n3.moveStart("character", t3), n3;
  };
  var W = function(e3) {
    e3.select();
  };
  function E(e3) {
    var t3 = Array.prototype.slice.call(arguments, 1);
    return function() {
      return e3.apply(null, t3);
    };
  }
  function F(e3, t3, r3) {
    for (var n3 in t3 || (t3 = {}), e3)
      !e3.hasOwnProperty(n3) || r3 === false && t3.hasOwnProperty(n3) || (t3[n3] = e3[n3]);
    return t3;
  }
  function B(e3, t3, r3, n3, i3) {
    t3 == null && (t3 = e3.search(/[^\s\u00a0]/)) == -1 && (t3 = e3.length);
    for (var o2 = n3 || 0, a2 = i3 || 0; ; ) {
      var l2 = e3.indexOf("	", o2);
      if (l2 < 0 || l2 >= t3)
        return a2 + (t3 - o2);
      a2 += l2 - o2, a2 += r3 - a2 % r3, o2 = l2 + 1;
    }
  }
  m ? W = function(e3) {
    e3.selectionStart = 0, e3.selectionEnd = e3.value.length;
  } : a && (W = function(e3) {
    try {
      e3.select();
    } catch (e4) {
    }
  });
  var H = function() {
    this.id = null, this.f = null, this.time = 0, this.handler = E(this.onTimeout, this);
  };
  function I(e3, t3) {
    for (var r3 = 0; r3 < e3.length; ++r3)
      if (e3[r3] == t3)
        return r3;
    return -1;
  }
  H.prototype.onTimeout = function(e3) {
    e3.id = 0, e3.time <= +new Date() ? e3.f() : setTimeout(e3.handler, e3.time - +new Date());
  }, H.prototype.set = function(e3, t3) {
    this.f = t3;
    var r3 = +new Date() + e3;
    (!this.id || r3 < this.time) && (clearTimeout(this.id), this.id = setTimeout(this.handler, e3), this.time = r3);
  };
  var $ = { toString: function() {
    return "CodeMirror.Pass";
  } }, Z = { scroll: false }, R = { origin: "*mouse" }, U = { origin: "+move" };
  function j(e3, t3, r3) {
    for (var n3 = 0, i3 = 0; ; ) {
      var o2 = e3.indexOf("	", n3);
      o2 == -1 && (o2 = e3.length);
      var a2 = o2 - n3;
      if (o2 == e3.length || i3 + a2 >= t3)
        return n3 + Math.min(a2, t3 - i3);
      if (i3 += o2 - n3, n3 = o2 + 1, (i3 += r3 - i3 % r3) >= t3)
        return n3;
    }
  }
  var K = [""];
  function G(e3) {
    for (; K.length <= e3; )
      K.push(V(K) + " ");
    return K[e3];
  }
  function V(e3) {
    return e3[e3.length - 1];
  }
  function q(e3, t3) {
    for (var r3 = [], n3 = 0; n3 < e3.length; n3++)
      r3[n3] = t3(e3[n3], n3);
    return r3;
  }
  function X() {
  }
  function Y(e3, t3) {
    var r3;
    return Object.create ? r3 = Object.create(e3) : (X.prototype = e3, r3 = new X()), t3 && F(t3, r3), r3;
  }
  var Q = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
  function J(e3) {
    return /\w/.test(e3) || e3 > "\x80" && (e3.toUpperCase() != e3.toLowerCase() || Q.test(e3));
  }
  function ee(e3, t3) {
    return t3 ? !!(t3.source.indexOf("\\w") > -1 && J(e3)) || t3.test(e3) : J(e3);
  }
  function te(e3) {
    for (var t3 in e3)
      if (e3.hasOwnProperty(t3) && e3[t3])
        return false;
    return true;
  }
  var re = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
  function ne(e3) {
    return e3.charCodeAt(0) >= 768 && re.test(e3);
  }
  function ie(e3, t3, r3) {
    for (; (r3 < 0 ? t3 > 0 : t3 < e3.length) && ne(e3.charAt(t3)); )
      t3 += r3;
    return t3;
  }
  function oe(e3, t3, r3) {
    for (var n3 = t3 > r3 ? -1 : 1; ; ) {
      if (t3 == r3)
        return t3;
      var i3 = (t3 + r3) / 2, o2 = n3 < 0 ? Math.ceil(i3) : Math.floor(i3);
      if (o2 == t3)
        return e3(o2) ? t3 : r3;
      e3(o2) ? r3 = o2 : t3 = o2 + n3;
    }
  }
  var ae = null;
  function le(e3, t3, r3) {
    var n3;
    ae = null;
    for (var i3 = 0; i3 < e3.length; ++i3) {
      var o2 = e3[i3];
      if (o2.from < t3 && o2.to > t3)
        return i3;
      o2.to == t3 && (o2.from != o2.to && r3 == "before" ? n3 = i3 : ae = i3), o2.from == t3 && (o2.from != o2.to && r3 != "before" ? n3 = i3 : ae = i3);
    }
    return n3 != null ? n3 : ae;
  }
  var se = function() {
    var e3 = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, t3 = /[stwN]/, r3 = /[LRr]/, n3 = /[Lb1n]/, i3 = /[1n]/;
    function o2(e4, t4, r4) {
      this.level = e4, this.from = t4, this.to = r4;
    }
    return function(a2, l2) {
      var s2 = l2 == "ltr" ? "L" : "R";
      if (a2.length == 0 || l2 == "ltr" && !e3.test(a2))
        return false;
      for (var c2, u2 = a2.length, d2 = [], f2 = 0; f2 < u2; ++f2)
        d2.push((c2 = a2.charCodeAt(f2)) <= 247 ? "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN".charAt(c2) : 1424 <= c2 && c2 <= 1524 ? "R" : 1536 <= c2 && c2 <= 1785 ? "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111".charAt(c2 - 1536) : 1774 <= c2 && c2 <= 2220 ? "r" : 8192 <= c2 && c2 <= 8203 ? "w" : c2 == 8204 ? "b" : "L");
      for (var h2 = 0, p2 = s2; h2 < u2; ++h2) {
        var m2 = d2[h2];
        m2 == "m" ? d2[h2] = p2 : p2 = m2;
      }
      for (var g2 = 0, v2 = s2; g2 < u2; ++g2) {
        var y2 = d2[g2];
        y2 == "1" && v2 == "r" ? d2[g2] = "n" : r3.test(y2) && (v2 = y2, y2 == "r" && (d2[g2] = "R"));
      }
      for (var b2 = 1, w2 = d2[0]; b2 < u2 - 1; ++b2) {
        var k2 = d2[b2];
        k2 == "+" && w2 == "1" && d2[b2 + 1] == "1" ? d2[b2] = "1" : k2 != "," || w2 != d2[b2 + 1] || w2 != "1" && w2 != "n" || (d2[b2] = w2), w2 = k2;
      }
      for (var x2 = 0; x2 < u2; ++x2) {
        var C2 = d2[x2];
        if (C2 == ",")
          d2[x2] = "N";
        else if (C2 == "%") {
          var S2 = void 0;
          for (S2 = x2 + 1; S2 < u2 && d2[S2] == "%"; ++S2)
            ;
          for (var L2 = x2 && d2[x2 - 1] == "!" || S2 < u2 && d2[S2] == "1" ? "1" : "N", T2 = x2; T2 < S2; ++T2)
            d2[T2] = L2;
          x2 = S2 - 1;
        }
      }
      for (var A2 = 0, M2 = s2; A2 < u2; ++A2) {
        var z2 = d2[A2];
        M2 == "L" && z2 == "1" ? d2[A2] = "L" : r3.test(z2) && (M2 = z2);
      }
      for (var O2 = 0; O2 < u2; ++O2)
        if (t3.test(d2[O2])) {
          var _2 = void 0;
          for (_2 = O2 + 1; _2 < u2 && t3.test(d2[_2]); ++_2)
            ;
          for (var N2 = (O2 ? d2[O2 - 1] : s2) == "L", P2 = N2 == ((_2 < u2 ? d2[_2] : s2) == "L") ? N2 ? "L" : "R" : s2, D2 = O2; D2 < _2; ++D2)
            d2[D2] = P2;
          O2 = _2 - 1;
        }
      for (var W2, E2 = [], F2 = 0; F2 < u2; )
        if (n3.test(d2[F2])) {
          var B2 = F2;
          for (++F2; F2 < u2 && n3.test(d2[F2]); ++F2)
            ;
          E2.push(new o2(0, B2, F2));
        } else {
          var H2 = F2, I2 = E2.length, $2 = l2 == "rtl" ? 1 : 0;
          for (++F2; F2 < u2 && d2[F2] != "L"; ++F2)
            ;
          for (var Z2 = H2; Z2 < F2; )
            if (i3.test(d2[Z2])) {
              H2 < Z2 && (E2.splice(I2, 0, new o2(1, H2, Z2)), I2 += $2);
              var R2 = Z2;
              for (++Z2; Z2 < F2 && i3.test(d2[Z2]); ++Z2)
                ;
              E2.splice(I2, 0, new o2(2, R2, Z2)), I2 += $2, H2 = Z2;
            } else
              ++Z2;
          H2 < F2 && E2.splice(I2, 0, new o2(1, H2, F2));
        }
      return l2 == "ltr" && (E2[0].level == 1 && (W2 = a2.match(/^\s+/)) && (E2[0].from = W2[0].length, E2.unshift(new o2(0, 0, W2[0].length))), V(E2).level == 1 && (W2 = a2.match(/\s+$/)) && (V(E2).to -= W2[0].length, E2.push(new o2(0, u2 - W2[0].length, u2)))), l2 == "rtl" ? E2.reverse() : E2;
    };
  }();
  function ce(e3, t3) {
    var r3 = e3.order;
    return r3 == null && (r3 = e3.order = se(e3.text, t3)), r3;
  }
  var ue = [], de = function(e3, t3, r3) {
    if (e3.addEventListener)
      e3.addEventListener(t3, r3, false);
    else if (e3.attachEvent)
      e3.attachEvent("on" + t3, r3);
    else {
      var n3 = e3._handlers || (e3._handlers = {});
      n3[t3] = (n3[t3] || ue).concat(r3);
    }
  };
  function fe(e3, t3) {
    return e3._handlers && e3._handlers[t3] || ue;
  }
  function he(e3, t3, r3) {
    if (e3.removeEventListener)
      e3.removeEventListener(t3, r3, false);
    else if (e3.detachEvent)
      e3.detachEvent("on" + t3, r3);
    else {
      var n3 = e3._handlers, i3 = n3 && n3[t3];
      if (i3) {
        var o2 = I(i3, r3);
        o2 > -1 && (n3[t3] = i3.slice(0, o2).concat(i3.slice(o2 + 1)));
      }
    }
  }
  function pe(e3, t3) {
    var r3 = fe(e3, t3);
    if (r3.length)
      for (var n3 = Array.prototype.slice.call(arguments, 2), i3 = 0; i3 < r3.length; ++i3)
        r3[i3].apply(null, n3);
  }
  function me(e3, t3, r3) {
    return typeof t3 == "string" && (t3 = { type: t3, preventDefault: function() {
      this.defaultPrevented = true;
    } }), pe(e3, r3 || t3.type, e3, t3), ke(t3) || t3.codemirrorIgnore;
  }
  function ge(e3) {
    var t3 = e3._handlers && e3._handlers.cursorActivity;
    if (t3)
      for (var r3 = e3.curOp.cursorActivityHandlers || (e3.curOp.cursorActivityHandlers = []), n3 = 0; n3 < t3.length; ++n3)
        I(r3, t3[n3]) == -1 && r3.push(t3[n3]);
  }
  function ve(e3, t3) {
    return fe(e3, t3).length > 0;
  }
  function ye(e3) {
    e3.prototype.on = function(e4, t3) {
      de(this, e4, t3);
    }, e3.prototype.off = function(e4, t3) {
      he(this, e4, t3);
    };
  }
  function be(e3) {
    e3.preventDefault ? e3.preventDefault() : e3.returnValue = false;
  }
  function we(e3) {
    e3.stopPropagation ? e3.stopPropagation() : e3.cancelBubble = true;
  }
  function ke(e3) {
    return e3.defaultPrevented != null ? e3.defaultPrevented : e3.returnValue == 0;
  }
  function xe(e3) {
    be(e3), we(e3);
  }
  function Ce(e3) {
    return e3.target || e3.srcElement;
  }
  function Se(e3) {
    var t3 = e3.which;
    return t3 == null && (1 & e3.button ? t3 = 1 : 2 & e3.button ? t3 = 3 : 4 & e3.button && (t3 = 2)), y && e3.ctrlKey && t3 == 1 && (t3 = 3), t3;
  }
  var Le, Te, Ae = function() {
    if (a && l < 9)
      return false;
    var e3 = z("div");
    return "draggable" in e3 || "dragDrop" in e3;
  }();
  function Me(e3) {
    if (Le == null) {
      var t3 = z("span", "\u200B");
      M(e3, z("span", [t3, document.createTextNode("x")])), e3.firstChild.offsetHeight != 0 && (Le = t3.offsetWidth <= 1 && t3.offsetHeight > 2 && !(a && l < 8));
    }
    var r3 = Le ? z("span", "\u200B") : z("span", "\xA0", null, "display: inline-block; width: 1px; margin-right: -1px");
    return r3.setAttribute("cm-text", ""), r3;
  }
  function ze(e3) {
    if (Te != null)
      return Te;
    var t3 = M(e3, document.createTextNode("A\u062EA")), r3 = L(t3, 0, 1).getBoundingClientRect(), n3 = L(t3, 1, 2).getBoundingClientRect();
    return A(e3), !(!r3 || r3.left == r3.right) && (Te = n3.right - r3.right < 3);
  }
  var Oe, _e = function(e3) {
    return e3.split(/\r\n?|\n/);
  }, Ne = window.getSelection ? function(e3) {
    try {
      return e3.selectionStart != e3.selectionEnd;
    } catch (e4) {
      return false;
    }
  } : function(e3) {
    var t3;
    try {
      t3 = e3.ownerDocument.selection.createRange();
    } catch (e4) {
    }
    return !(!t3 || t3.parentElement() != e3) && t3.compareEndPoints("StartToEnd", t3) != 0;
  }, Pe = "oncopy" in (Oe = z("div")) || (Oe.setAttribute("oncopy", "return;"), typeof Oe.oncopy == "function"), De = null, We = {}, Ee = {};
  function Fe(e3, t3) {
    arguments.length > 2 && (t3.dependencies = Array.prototype.slice.call(arguments, 2)), We[e3] = t3;
  }
  function Be(e3) {
    if (typeof e3 == "string" && Ee.hasOwnProperty(e3))
      e3 = Ee[e3];
    else if (e3 && typeof e3.name == "string" && Ee.hasOwnProperty(e3.name)) {
      var t3 = Ee[e3.name];
      typeof t3 == "string" && (t3 = { name: t3 }), (e3 = Y(t3, e3)).name = t3.name;
    } else {
      if (typeof e3 == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(e3))
        return Be("application/xml");
      if (typeof e3 == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(e3))
        return Be("application/json");
    }
    return typeof e3 == "string" ? { name: e3 } : e3 || { name: "null" };
  }
  function He(e3, t3) {
    t3 = Be(t3);
    var r3 = We[t3.name];
    if (!r3)
      return He(e3, "text/plain");
    var n3 = r3(e3, t3);
    if (Ie.hasOwnProperty(t3.name)) {
      var i3 = Ie[t3.name];
      for (var o2 in i3)
        i3.hasOwnProperty(o2) && (n3.hasOwnProperty(o2) && (n3["_" + o2] = n3[o2]), n3[o2] = i3[o2]);
    }
    if (n3.name = t3.name, t3.helperType && (n3.helperType = t3.helperType), t3.modeProps)
      for (var a2 in t3.modeProps)
        n3[a2] = t3.modeProps[a2];
    return n3;
  }
  var Ie = {};
  function $e(e3, t3) {
    F(t3, Ie.hasOwnProperty(e3) ? Ie[e3] : Ie[e3] = {});
  }
  function Ze(e3, t3) {
    if (t3 === true)
      return t3;
    if (e3.copyState)
      return e3.copyState(t3);
    var r3 = {};
    for (var n3 in t3) {
      var i3 = t3[n3];
      i3 instanceof Array && (i3 = i3.concat([])), r3[n3] = i3;
    }
    return r3;
  }
  function Re(e3, t3) {
    for (var r3; e3.innerMode && (r3 = e3.innerMode(t3)) && r3.mode != e3; )
      t3 = r3.state, e3 = r3.mode;
    return r3 || { mode: e3, state: t3 };
  }
  function Ue(e3, t3, r3) {
    return !e3.startState || e3.startState(t3, r3);
  }
  var je = function(e3, t3, r3) {
    this.pos = this.start = 0, this.string = e3, this.tabSize = t3 || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0, this.lineOracle = r3;
  };
  function Ke(e3, t3) {
    if ((t3 -= e3.first) < 0 || t3 >= e3.size)
      throw Error("There is no line " + (t3 + e3.first) + " in the document.");
    for (var r3 = e3; !r3.lines; )
      for (var n3 = 0; ; ++n3) {
        var i3 = r3.children[n3], o2 = i3.chunkSize();
        if (t3 < o2) {
          r3 = i3;
          break;
        }
        t3 -= o2;
      }
    return r3.lines[t3];
  }
  function Ge(e3, t3, r3) {
    var n3 = [], i3 = t3.line;
    return e3.iter(t3.line, r3.line + 1, function(e4) {
      var o2 = e4.text;
      i3 == r3.line && (o2 = o2.slice(0, r3.ch)), i3 == t3.line && (o2 = o2.slice(t3.ch)), n3.push(o2), ++i3;
    }), n3;
  }
  function Ve(e3, t3, r3) {
    var n3 = [];
    return e3.iter(t3, r3, function(e4) {
      n3.push(e4.text);
    }), n3;
  }
  function qe(e3, t3) {
    var r3 = t3 - e3.height;
    if (r3)
      for (var n3 = e3; n3; n3 = n3.parent)
        n3.height += r3;
  }
  function Xe(e3) {
    if (e3.parent == null)
      return null;
    for (var t3 = e3.parent, r3 = I(t3.lines, e3), n3 = t3.parent; n3; t3 = n3, n3 = n3.parent)
      for (var i3 = 0; n3.children[i3] != t3; ++i3)
        r3 += n3.children[i3].chunkSize();
    return r3 + t3.first;
  }
  function Ye(e3, t3) {
    var r3 = e3.first;
    e:
      do {
        for (var n3 = 0; n3 < e3.children.length; ++n3) {
          var i3 = e3.children[n3], o2 = i3.height;
          if (t3 < o2) {
            e3 = i3;
            continue e;
          }
          t3 -= o2, r3 += i3.chunkSize();
        }
        return r3;
      } while (!e3.lines);
    for (var a2 = 0; a2 < e3.lines.length; ++a2) {
      var l2 = e3.lines[a2].height;
      if (t3 < l2)
        break;
      t3 -= l2;
    }
    return r3 + a2;
  }
  function Qe(e3, t3) {
    return t3 >= e3.first && t3 < e3.first + e3.size;
  }
  function Je(e3, t3) {
    return e3.lineNumberFormatter(t3 + e3.firstLineNumber) + "";
  }
  function et(e3, t3, r3) {
    if (r3 === void 0 && (r3 = null), !(this instanceof et))
      return new et(e3, t3, r3);
    this.line = e3, this.ch = t3, this.sticky = r3;
  }
  function tt(e3, t3) {
    return e3.line - t3.line || e3.ch - t3.ch;
  }
  function rt(e3, t3) {
    return e3.sticky == t3.sticky && tt(e3, t3) == 0;
  }
  function nt(e3) {
    return et(e3.line, e3.ch);
  }
  function it(e3, t3) {
    return tt(e3, t3) < 0 ? t3 : e3;
  }
  function ot(e3, t3) {
    return tt(e3, t3) < 0 ? e3 : t3;
  }
  function at(e3, t3) {
    return Math.max(e3.first, Math.min(t3, e3.first + e3.size - 1));
  }
  function lt(e3, t3) {
    if (t3.line < e3.first)
      return et(e3.first, 0);
    var r3 = e3.first + e3.size - 1;
    return t3.line > r3 ? et(r3, Ke(e3, r3).text.length) : function(e4, t4) {
      var r4 = e4.ch;
      return r4 == null || r4 > t4 ? et(e4.line, t4) : r4 < 0 ? et(e4.line, 0) : e4;
    }(t3, Ke(e3, t3.line).text.length);
  }
  function st(e3, t3) {
    for (var r3 = [], n3 = 0; n3 < t3.length; n3++)
      r3[n3] = lt(e3, t3[n3]);
    return r3;
  }
  je.prototype.eol = function() {
    return this.pos >= this.string.length;
  }, je.prototype.sol = function() {
    return this.pos == this.lineStart;
  }, je.prototype.peek = function() {
    return this.string.charAt(this.pos) || void 0;
  }, je.prototype.next = function() {
    if (this.pos < this.string.length)
      return this.string.charAt(this.pos++);
  }, je.prototype.eat = function(e3) {
    var t3 = this.string.charAt(this.pos);
    if (typeof e3 == "string" ? t3 == e3 : t3 && (e3.test ? e3.test(t3) : e3(t3)))
      return ++this.pos, t3;
  }, je.prototype.eatWhile = function(e3) {
    for (var t3 = this.pos; this.eat(e3); )
      ;
    return this.pos > t3;
  }, je.prototype.eatSpace = function() {
    for (var e3 = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); )
      ++this.pos;
    return this.pos > e3;
  }, je.prototype.skipToEnd = function() {
    this.pos = this.string.length;
  }, je.prototype.skipTo = function(e3) {
    var t3 = this.string.indexOf(e3, this.pos);
    if (t3 > -1)
      return this.pos = t3, true;
  }, je.prototype.backUp = function(e3) {
    this.pos -= e3;
  }, je.prototype.column = function() {
    return this.lastColumnPos < this.start && (this.lastColumnValue = B(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? B(this.string, this.lineStart, this.tabSize) : 0);
  }, je.prototype.indentation = function() {
    return B(this.string, null, this.tabSize) - (this.lineStart ? B(this.string, this.lineStart, this.tabSize) : 0);
  }, je.prototype.match = function(e3, t3, r3) {
    if (typeof e3 != "string") {
      var n3 = this.string.slice(this.pos).match(e3);
      return n3 && n3.index > 0 ? null : (n3 && t3 !== false && (this.pos += n3[0].length), n3);
    }
    var i3 = function(e4) {
      return r3 ? e4.toLowerCase() : e4;
    };
    if (i3(this.string.substr(this.pos, e3.length)) == i3(e3))
      return t3 !== false && (this.pos += e3.length), true;
  }, je.prototype.current = function() {
    return this.string.slice(this.start, this.pos);
  }, je.prototype.hideFirstChars = function(e3, t3) {
    this.lineStart += e3;
    try {
      return t3();
    } finally {
      this.lineStart -= e3;
    }
  }, je.prototype.lookAhead = function(e3) {
    var t3 = this.lineOracle;
    return t3 && t3.lookAhead(e3);
  }, je.prototype.baseToken = function() {
    var e3 = this.lineOracle;
    return e3 && e3.baseToken(this.pos);
  };
  var ct = function(e3, t3) {
    this.state = e3, this.lookAhead = t3;
  }, ut = function(e3, t3, r3, n3) {
    this.state = t3, this.doc = e3, this.line = r3, this.maxLookAhead = n3 || 0, this.baseTokens = null, this.baseTokenPos = 1;
  };
  function dt(e3, t3, r3, n3) {
    var i3 = [e3.state.modeGen], o2 = {};
    wt(e3, t3.text, e3.doc.mode, r3, function(e4, t4) {
      return i3.push(e4, t4);
    }, o2, n3);
    for (var a2 = r3.state, l2 = function(n4) {
      r3.baseTokens = i3;
      var l3 = e3.state.overlays[n4], s3 = 1, c2 = 0;
      r3.state = true, wt(e3, t3.text, l3.mode, r3, function(e4, t4) {
        for (var r4 = s3; c2 < e4; ) {
          var n5 = i3[s3];
          n5 > e4 && i3.splice(s3, 1, e4, i3[s3 + 1], n5), s3 += 2, c2 = Math.min(e4, n5);
        }
        if (t4)
          if (l3.opaque)
            i3.splice(r4, s3 - r4, e4, "overlay " + t4), s3 = r4 + 2;
          else
            for (; r4 < s3; r4 += 2) {
              var o3 = i3[r4 + 1];
              i3[r4 + 1] = (o3 ? o3 + " " : "") + "overlay " + t4;
            }
      }, o2), r3.state = a2, r3.baseTokens = null, r3.baseTokenPos = 1;
    }, s2 = 0; s2 < e3.state.overlays.length; ++s2)
      l2(s2);
    return { styles: i3, classes: o2.bgClass || o2.textClass ? o2 : null };
  }
  function ft(e3, t3, r3) {
    if (!t3.styles || t3.styles[0] != e3.state.modeGen) {
      var n3 = ht(e3, Xe(t3)), i3 = t3.text.length > e3.options.maxHighlightLength && Ze(e3.doc.mode, n3.state), o2 = dt(e3, t3, n3);
      i3 && (n3.state = i3), t3.stateAfter = n3.save(!i3), t3.styles = o2.styles, o2.classes ? t3.styleClasses = o2.classes : t3.styleClasses && (t3.styleClasses = null), r3 === e3.doc.highlightFrontier && (e3.doc.modeFrontier = Math.max(e3.doc.modeFrontier, ++e3.doc.highlightFrontier));
    }
    return t3.styles;
  }
  function ht(e3, t3, r3) {
    var n3 = e3.doc, i3 = e3.display;
    if (!n3.mode.startState)
      return new ut(n3, true, t3);
    var o2 = function(e4, t4, r4) {
      for (var n4, i4, o3 = e4.doc, a3 = r4 ? -1 : t4 - (e4.doc.mode.innerMode ? 1e3 : 100), l3 = t4; l3 > a3; --l3) {
        if (l3 <= o3.first)
          return o3.first;
        var s2 = Ke(o3, l3 - 1), c2 = s2.stateAfter;
        if (c2 && (!r4 || l3 + (c2 instanceof ct ? c2.lookAhead : 0) <= o3.modeFrontier))
          return l3;
        var u2 = B(s2.text, null, e4.options.tabSize);
        (i4 == null || n4 > u2) && (i4 = l3 - 1, n4 = u2);
      }
      return i4;
    }(e3, t3, r3), a2 = o2 > n3.first && Ke(n3, o2 - 1).stateAfter, l2 = a2 ? ut.fromSaved(n3, a2, o2) : new ut(n3, Ue(n3.mode), o2);
    return n3.iter(o2, t3, function(r4) {
      pt(e3, r4.text, l2);
      var n4 = l2.line;
      r4.stateAfter = n4 == t3 - 1 || n4 % 5 == 0 || n4 >= i3.viewFrom && n4 < i3.viewTo ? l2.save() : null, l2.nextLine();
    }), r3 && (n3.modeFrontier = l2.line), l2;
  }
  function pt(e3, t3, r3, n3) {
    var i3 = e3.doc.mode, o2 = new je(t3, e3.options.tabSize, r3);
    for (o2.start = o2.pos = n3 || 0, t3 == "" && mt(i3, r3.state); !o2.eol(); )
      gt(i3, o2, r3.state), o2.start = o2.pos;
  }
  function mt(e3, t3) {
    if (e3.blankLine)
      return e3.blankLine(t3);
    if (e3.innerMode) {
      var r3 = Re(e3, t3);
      return r3.mode.blankLine ? r3.mode.blankLine(r3.state) : void 0;
    }
  }
  function gt(e3, t3, r3, n3) {
    for (var i3 = 0; i3 < 10; i3++) {
      n3 && (n3[0] = Re(e3, r3).mode);
      var o2 = e3.token(t3, r3);
      if (t3.pos > t3.start)
        return o2;
    }
    throw Error("Mode " + e3.name + " failed to advance stream.");
  }
  ut.prototype.lookAhead = function(e3) {
    var t3 = this.doc.getLine(this.line + e3);
    return t3 != null && e3 > this.maxLookAhead && (this.maxLookAhead = e3), t3;
  }, ut.prototype.baseToken = function(e3) {
    if (!this.baseTokens)
      return null;
    for (; this.baseTokens[this.baseTokenPos] <= e3; )
      this.baseTokenPos += 2;
    var t3 = this.baseTokens[this.baseTokenPos + 1];
    return { type: t3 && t3.replace(/( |^)overlay .*/, ""), size: this.baseTokens[this.baseTokenPos] - e3 };
  }, ut.prototype.nextLine = function() {
    this.line++, this.maxLookAhead > 0 && this.maxLookAhead--;
  }, ut.fromSaved = function(e3, t3, r3) {
    return t3 instanceof ct ? new ut(e3, Ze(e3.mode, t3.state), r3, t3.lookAhead) : new ut(e3, Ze(e3.mode, t3), r3);
  }, ut.prototype.save = function(e3) {
    var t3 = e3 !== false ? Ze(this.doc.mode, this.state) : this.state;
    return this.maxLookAhead > 0 ? new ct(t3, this.maxLookAhead) : t3;
  };
  var vt = function(e3, t3, r3) {
    this.start = e3.start, this.end = e3.pos, this.string = e3.current(), this.type = t3 || null, this.state = r3;
  };
  function yt(e3, t3, r3, n3) {
    var i3, o2, a2 = e3.doc, l2 = a2.mode, s2 = Ke(a2, (t3 = lt(a2, t3)).line), c2 = ht(e3, t3.line, r3), u2 = new je(s2.text, e3.options.tabSize, c2);
    for (n3 && (o2 = []); (n3 || u2.pos < t3.ch) && !u2.eol(); )
      u2.start = u2.pos, i3 = gt(l2, u2, c2.state), n3 && o2.push(new vt(u2, i3, Ze(a2.mode, c2.state)));
    return n3 ? o2 : new vt(u2, i3, c2.state);
  }
  function bt(e3, t3) {
    if (e3)
      for (; ; ) {
        var r3 = e3.match(/(?:^|\s+)line-(background-)?(\S+)/);
        if (!r3)
          break;
        e3 = e3.slice(0, r3.index) + e3.slice(r3.index + r3[0].length);
        var n3 = r3[1] ? "bgClass" : "textClass";
        t3[n3] == null ? t3[n3] = r3[2] : RegExp("(?:^|\\s)" + r3[2] + "(?:$|\\s)").test(t3[n3]) || (t3[n3] += " " + r3[2]);
      }
    return e3;
  }
  function wt(e3, t3, r3, n3, i3, o2, a2) {
    var l2 = r3.flattenSpans;
    l2 == null && (l2 = e3.options.flattenSpans);
    var s2, c2 = 0, u2 = null, d2 = new je(t3, e3.options.tabSize, n3), f2 = e3.options.addModeClass && [null];
    for (t3 == "" && bt(mt(r3, n3.state), o2); !d2.eol(); ) {
      if (d2.pos > e3.options.maxHighlightLength ? (l2 = false, a2 && pt(e3, t3, n3, d2.pos), d2.pos = t3.length, s2 = null) : s2 = bt(gt(r3, d2, n3.state, f2), o2), f2) {
        var h2 = f2[0].name;
        h2 && (s2 = "m-" + (s2 ? h2 + " " + s2 : h2));
      }
      if (!l2 || u2 != s2) {
        for (; c2 < d2.start; )
          i3(c2 = Math.min(d2.start, c2 + 5e3), u2);
        u2 = s2;
      }
      d2.start = d2.pos;
    }
    for (; c2 < d2.pos; ) {
      var p2 = Math.min(d2.pos, c2 + 5e3);
      i3(p2, u2), c2 = p2;
    }
  }
  var kt = false, xt = false;
  function Ct(e3, t3, r3) {
    this.marker = e3, this.from = t3, this.to = r3;
  }
  function St(e3, t3) {
    if (e3)
      for (var r3 = 0; r3 < e3.length; ++r3) {
        var n3 = e3[r3];
        if (n3.marker == t3)
          return n3;
      }
  }
  function Lt(e3, t3) {
    for (var r3, n3 = 0; n3 < e3.length; ++n3)
      e3[n3] != t3 && (r3 || (r3 = [])).push(e3[n3]);
    return r3;
  }
  function Tt(e3, t3) {
    if (t3.full)
      return null;
    var r3 = Qe(e3, t3.from.line) && Ke(e3, t3.from.line).markedSpans, n3 = Qe(e3, t3.to.line) && Ke(e3, t3.to.line).markedSpans;
    if (!r3 && !n3)
      return null;
    var i3 = t3.from.ch, o2 = t3.to.ch, a2 = tt(t3.from, t3.to) == 0, l2 = function(e4, t4, r4) {
      var n4;
      if (e4)
        for (var i4 = 0; i4 < e4.length; ++i4) {
          var o3 = e4[i4], a3 = o3.marker;
          if (o3.from == null || (a3.inclusiveLeft ? o3.from <= t4 : o3.from < t4) || o3.from == t4 && a3.type == "bookmark" && (!r4 || !o3.marker.insertLeft)) {
            var l3 = o3.to == null || (a3.inclusiveRight ? o3.to >= t4 : o3.to > t4);
            (n4 || (n4 = [])).push(new Ct(a3, o3.from, l3 ? null : o3.to));
          }
        }
      return n4;
    }(r3, i3, a2), s2 = function(e4, t4, r4) {
      var n4;
      if (e4)
        for (var i4 = 0; i4 < e4.length; ++i4) {
          var o3 = e4[i4], a3 = o3.marker;
          if (o3.to == null || (a3.inclusiveRight ? o3.to >= t4 : o3.to > t4) || o3.from == t4 && a3.type == "bookmark" && (!r4 || o3.marker.insertLeft)) {
            var l3 = o3.from == null || (a3.inclusiveLeft ? o3.from <= t4 : o3.from < t4);
            (n4 || (n4 = [])).push(new Ct(a3, l3 ? null : o3.from - t4, o3.to == null ? null : o3.to - t4));
          }
        }
      return n4;
    }(n3, o2, a2), c2 = t3.text.length == 1, u2 = V(t3.text).length + (c2 ? i3 : 0);
    if (l2)
      for (var d2 = 0; d2 < l2.length; ++d2) {
        var f2 = l2[d2];
        if (f2.to == null) {
          var h2 = St(s2, f2.marker);
          h2 ? c2 && (f2.to = h2.to == null ? null : h2.to + u2) : f2.to = i3;
        }
      }
    if (s2)
      for (var p2 = 0; p2 < s2.length; ++p2) {
        var m2 = s2[p2];
        m2.to != null && (m2.to += u2), m2.from == null ? St(l2, m2.marker) || (m2.from = u2, c2 && (l2 || (l2 = [])).push(m2)) : (m2.from += u2, c2 && (l2 || (l2 = [])).push(m2));
      }
    l2 && (l2 = At(l2)), s2 && s2 != l2 && (s2 = At(s2));
    var g2 = [l2];
    if (!c2) {
      var v2, y2 = t3.text.length - 2;
      if (y2 > 0 && l2)
        for (var b2 = 0; b2 < l2.length; ++b2)
          l2[b2].to == null && (v2 || (v2 = [])).push(new Ct(l2[b2].marker, null, null));
      for (var w2 = 0; w2 < y2; ++w2)
        g2.push(v2);
      g2.push(s2);
    }
    return g2;
  }
  function At(e3) {
    for (var t3 = 0; t3 < e3.length; ++t3) {
      var r3 = e3[t3];
      r3.from != null && r3.from == r3.to && r3.marker.clearWhenEmpty !== false && e3.splice(t3--, 1);
    }
    return e3.length ? e3 : null;
  }
  function Mt(e3) {
    var t3 = e3.markedSpans;
    if (t3) {
      for (var r3 = 0; r3 < t3.length; ++r3)
        t3[r3].marker.detachLine(e3);
      e3.markedSpans = null;
    }
  }
  function zt(e3, t3) {
    if (t3) {
      for (var r3 = 0; r3 < t3.length; ++r3)
        t3[r3].marker.attachLine(e3);
      e3.markedSpans = t3;
    }
  }
  function Ot(e3) {
    return e3.inclusiveLeft ? -1 : 0;
  }
  function _t(e3) {
    return e3.inclusiveRight ? 1 : 0;
  }
  function Nt(e3, t3) {
    var r3 = e3.lines.length - t3.lines.length;
    if (r3 != 0)
      return r3;
    var n3 = e3.find(), i3 = t3.find(), o2 = tt(n3.from, i3.from) || Ot(e3) - Ot(t3);
    return o2 ? -o2 : tt(n3.to, i3.to) || _t(e3) - _t(t3) || t3.id - e3.id;
  }
  function Pt(e3, t3) {
    var r3, n3 = xt && e3.markedSpans;
    if (n3)
      for (var i3 = void 0, o2 = 0; o2 < n3.length; ++o2)
        (i3 = n3[o2]).marker.collapsed && (t3 ? i3.from : i3.to) == null && (!r3 || Nt(r3, i3.marker) < 0) && (r3 = i3.marker);
    return r3;
  }
  function Dt(e3) {
    return Pt(e3, true);
  }
  function Wt(e3) {
    return Pt(e3, false);
  }
  function Et(e3, t3) {
    var r3, n3 = xt && e3.markedSpans;
    if (n3)
      for (var i3 = 0; i3 < n3.length; ++i3) {
        var o2 = n3[i3];
        o2.marker.collapsed && (o2.from == null || o2.from < t3) && (o2.to == null || o2.to > t3) && (!r3 || Nt(r3, o2.marker) < 0) && (r3 = o2.marker);
      }
    return r3;
  }
  function Ft(e3, t3, r3, n3, i3) {
    var o2 = Ke(e3, t3), a2 = xt && o2.markedSpans;
    if (a2)
      for (var l2 = 0; l2 < a2.length; ++l2) {
        var s2 = a2[l2];
        if (s2.marker.collapsed) {
          var c2 = s2.marker.find(0), u2 = tt(c2.from, r3) || Ot(s2.marker) - Ot(i3), d2 = tt(c2.to, n3) || _t(s2.marker) - _t(i3);
          if (!(u2 >= 0 && d2 <= 0 || u2 <= 0 && d2 >= 0) && (u2 <= 0 && (s2.marker.inclusiveRight && i3.inclusiveLeft ? tt(c2.to, r3) >= 0 : tt(c2.to, r3) > 0) || u2 >= 0 && (s2.marker.inclusiveRight && i3.inclusiveLeft ? tt(c2.from, n3) <= 0 : tt(c2.from, n3) < 0)))
            return true;
        }
      }
  }
  function Bt(e3) {
    for (var t3; t3 = Dt(e3); )
      e3 = t3.find(-1, true).line;
    return e3;
  }
  function Ht(e3, t3) {
    var r3 = Ke(e3, t3), n3 = Bt(r3);
    return r3 == n3 ? t3 : Xe(n3);
  }
  function It(e3, t3) {
    if (t3 > e3.lastLine())
      return t3;
    var r3, n3 = Ke(e3, t3);
    if (!$t(e3, n3))
      return t3;
    for (; r3 = Wt(n3); )
      n3 = r3.find(1, true).line;
    return Xe(n3) + 1;
  }
  function $t(e3, t3) {
    var r3 = xt && t3.markedSpans;
    if (r3) {
      for (var n3 = void 0, i3 = 0; i3 < r3.length; ++i3)
        if ((n3 = r3[i3]).marker.collapsed) {
          if (n3.from == null)
            return true;
          if (!n3.marker.widgetNode && n3.from == 0 && n3.marker.inclusiveLeft && Zt(e3, t3, n3))
            return true;
        }
    }
  }
  function Zt(e3, t3, r3) {
    if (r3.to == null) {
      var n3 = r3.marker.find(1, true);
      return Zt(e3, n3.line, St(n3.line.markedSpans, r3.marker));
    }
    if (r3.marker.inclusiveRight && r3.to == t3.text.length)
      return true;
    for (var i3 = void 0, o2 = 0; o2 < t3.markedSpans.length; ++o2)
      if ((i3 = t3.markedSpans[o2]).marker.collapsed && !i3.marker.widgetNode && i3.from == r3.to && (i3.to == null || i3.to != r3.from) && (i3.marker.inclusiveLeft || r3.marker.inclusiveRight) && Zt(e3, t3, i3))
        return true;
  }
  function Rt(e3) {
    for (var t3 = 0, r3 = (e3 = Bt(e3)).parent, n3 = 0; n3 < r3.lines.length; ++n3) {
      var i3 = r3.lines[n3];
      if (i3 == e3)
        break;
      t3 += i3.height;
    }
    for (var o2 = r3.parent; o2; o2 = (r3 = o2).parent)
      for (var a2 = 0; a2 < o2.children.length; ++a2) {
        var l2 = o2.children[a2];
        if (l2 == r3)
          break;
        t3 += l2.height;
      }
    return t3;
  }
  function Ut(e3) {
    if (e3.height == 0)
      return 0;
    for (var t3, r3 = e3.text.length, n3 = e3; t3 = Dt(n3); ) {
      var i3 = t3.find(0, true);
      n3 = i3.from.line, r3 += i3.from.ch - i3.to.ch;
    }
    for (n3 = e3; t3 = Wt(n3); ) {
      var o2 = t3.find(0, true);
      r3 -= n3.text.length - o2.from.ch, r3 += (n3 = o2.to.line).text.length - o2.to.ch;
    }
    return r3;
  }
  function jt(e3) {
    var t3 = e3.display, r3 = e3.doc;
    t3.maxLine = Ke(r3, r3.first), t3.maxLineLength = Ut(t3.maxLine), t3.maxLineChanged = true, r3.iter(function(e4) {
      var r4 = Ut(e4);
      r4 > t3.maxLineLength && (t3.maxLineLength = r4, t3.maxLine = e4);
    });
  }
  var Kt = function(e3, t3, r3) {
    this.text = e3, zt(this, t3), this.height = r3 ? r3(this) : 1;
  };
  function Gt(e3) {
    e3.parent = null, Mt(e3);
  }
  Kt.prototype.lineNo = function() {
    return Xe(this);
  }, ye(Kt);
  var Vt = {}, qt = {};
  function Xt(e3, t3) {
    if (!e3 || /^\s*$/.test(e3))
      return null;
    var r3 = t3.addModeClass ? qt : Vt;
    return r3[e3] || (r3[e3] = e3.replace(/\S+/g, "cm-$&"));
  }
  function Yt(e3, t3) {
    var r3 = O("span", null, null, s ? "padding-right: .1px" : null), n3 = { pre: O("pre", [r3], "CodeMirror-line"), content: r3, col: 0, pos: 0, cm: e3, trailingSpace: false, splitSpaces: e3.getOption("lineWrapping") };
    t3.measure = {};
    for (var i3 = 0; i3 <= (t3.rest ? t3.rest.length : 0); i3++) {
      var o2 = i3 ? t3.rest[i3 - 1] : t3.line, a2 = void 0;
      n3.pos = 0, n3.addToken = Jt, ze(e3.display.measure) && (a2 = ce(o2, e3.doc.direction)) && (n3.addToken = er(n3.addToken, a2)), n3.map = [], rr(o2, n3, ft(e3, o2, t3 != e3.display.externalMeasured && Xe(o2))), o2.styleClasses && (o2.styleClasses.bgClass && (n3.bgClass = D(o2.styleClasses.bgClass, n3.bgClass || "")), o2.styleClasses.textClass && (n3.textClass = D(o2.styleClasses.textClass, n3.textClass || ""))), n3.map.length == 0 && n3.map.push(0, 0, n3.content.appendChild(Me(e3.display.measure))), i3 == 0 ? (t3.measure.map = n3.map, t3.measure.cache = {}) : ((t3.measure.maps || (t3.measure.maps = [])).push(n3.map), (t3.measure.caches || (t3.measure.caches = [])).push({}));
    }
    if (s) {
      var l2 = n3.content.lastChild;
      (/\bcm-tab\b/.test(l2.className) || l2.querySelector && l2.querySelector(".cm-tab")) && (n3.content.className = "cm-tab-wrap-hack");
    }
    return pe(e3, "renderLine", e3, t3.line, n3.pre), n3.pre.className && (n3.textClass = D(n3.pre.className, n3.textClass || "")), n3;
  }
  function Qt(e3) {
    var t3 = z("span", "\u2022", "cm-invalidchar");
    return t3.title = "\\u" + e3.charCodeAt(0).toString(16), t3.setAttribute("aria-label", t3.title), t3;
  }
  function Jt(e3, t3, r3, n3, i3, o2, s2) {
    if (t3) {
      var c2, u2 = e3.splitSpaces ? function(e4, t4) {
        if (e4.length > 1 && !/  /.test(e4))
          return e4;
        for (var r4 = t4, n4 = "", i4 = 0; i4 < e4.length; i4++) {
          var o3 = e4.charAt(i4);
          o3 != " " || !r4 || i4 != e4.length - 1 && e4.charCodeAt(i4 + 1) != 32 || (o3 = "\xA0"), n4 += o3, r4 = o3 == " ";
        }
        return n4;
      }(t3, e3.trailingSpace) : t3, d2 = e3.cm.state.specialChars, f2 = false;
      if (d2.test(t3)) {
        c2 = document.createDocumentFragment();
        for (var h2 = 0; ; ) {
          d2.lastIndex = h2;
          var p2 = d2.exec(t3), m2 = p2 ? p2.index - h2 : t3.length - h2;
          if (m2) {
            var g2 = document.createTextNode(u2.slice(h2, h2 + m2));
            a && l < 9 ? c2.appendChild(z("span", [g2])) : c2.appendChild(g2), e3.map.push(e3.pos, e3.pos + m2, g2), e3.col += m2, e3.pos += m2;
          }
          if (!p2)
            break;
          h2 += m2 + 1;
          var v2 = void 0;
          if (p2[0] == "	") {
            var y2 = e3.cm.options.tabSize, b2 = y2 - e3.col % y2;
            (v2 = c2.appendChild(z("span", G(b2), "cm-tab"))).setAttribute("role", "presentation"), v2.setAttribute("cm-text", "	"), e3.col += b2;
          } else
            p2[0] == "\r" || p2[0] == "\n" ? ((v2 = c2.appendChild(z("span", p2[0] == "\r" ? "\u240D" : "\u2424", "cm-invalidchar"))).setAttribute("cm-text", p2[0]), e3.col += 1) : ((v2 = e3.cm.options.specialCharPlaceholder(p2[0])).setAttribute("cm-text", p2[0]), a && l < 9 ? c2.appendChild(z("span", [v2])) : c2.appendChild(v2), e3.col += 1);
          e3.map.push(e3.pos, e3.pos + 1, v2), e3.pos++;
        }
      } else
        e3.col += t3.length, c2 = document.createTextNode(u2), e3.map.push(e3.pos, e3.pos + t3.length, c2), a && l < 9 && (f2 = true), e3.pos += t3.length;
      if (e3.trailingSpace = u2.charCodeAt(t3.length - 1) == 32, r3 || n3 || i3 || f2 || o2 || s2) {
        var w2 = r3 || "";
        n3 && (w2 += n3), i3 && (w2 += i3);
        var k2 = z("span", [c2], w2, o2);
        if (s2)
          for (var x2 in s2)
            s2.hasOwnProperty(x2) && x2 != "style" && x2 != "class" && k2.setAttribute(x2, s2[x2]);
        return e3.content.appendChild(k2);
      }
      e3.content.appendChild(c2);
    }
  }
  function er(e3, t3) {
    return function(r3, n3, i3, o2, a2, l2, s2) {
      i3 = i3 ? i3 + " cm-force-border" : "cm-force-border";
      for (var c2 = r3.pos, u2 = c2 + n3.length; ; ) {
        for (var d2 = void 0, f2 = 0; f2 < t3.length && !((d2 = t3[f2]).to > c2 && d2.from <= c2); f2++)
          ;
        if (d2.to >= u2)
          return e3(r3, n3, i3, o2, a2, l2, s2);
        e3(r3, n3.slice(0, d2.to - c2), i3, o2, null, l2, s2), o2 = null, n3 = n3.slice(d2.to - c2), c2 = d2.to;
      }
    };
  }
  function tr(e3, t3, r3, n3) {
    var i3 = !n3 && r3.widgetNode;
    i3 && e3.map.push(e3.pos, e3.pos + t3, i3), !n3 && e3.cm.display.input.needsContentAttribute && (i3 || (i3 = e3.content.appendChild(document.createElement("span"))), i3.setAttribute("cm-marker", r3.id)), i3 && (e3.cm.display.input.setUneditable(i3), e3.content.appendChild(i3)), e3.pos += t3, e3.trailingSpace = false;
  }
  function rr(e3, t3, r3) {
    var n3 = e3.markedSpans, i3 = e3.text, o2 = 0;
    if (n3)
      for (var a2, l2, s2, c2, u2, d2, f2, h2 = i3.length, p2 = 0, m2 = 1, g2 = "", v2 = 0; ; ) {
        if (v2 == p2) {
          s2 = c2 = u2 = l2 = "", f2 = null, d2 = null, v2 = 1 / 0;
          for (var y2 = [], b2 = void 0, w2 = 0; w2 < n3.length; ++w2) {
            var k2 = n3[w2], x2 = k2.marker;
            if (x2.type == "bookmark" && k2.from == p2 && x2.widgetNode)
              y2.push(x2);
            else if (k2.from <= p2 && (k2.to == null || k2.to > p2 || x2.collapsed && k2.to == p2 && k2.from == p2)) {
              if (k2.to != null && k2.to != p2 && v2 > k2.to && (v2 = k2.to, c2 = ""), x2.className && (s2 += " " + x2.className), x2.css && (l2 = (l2 ? l2 + ";" : "") + x2.css), x2.startStyle && k2.from == p2 && (u2 += " " + x2.startStyle), x2.endStyle && k2.to == v2 && (b2 || (b2 = [])).push(x2.endStyle, k2.to), x2.title && ((f2 || (f2 = {})).title = x2.title), x2.attributes)
                for (var C2 in x2.attributes)
                  (f2 || (f2 = {}))[C2] = x2.attributes[C2];
              x2.collapsed && (!d2 || Nt(d2.marker, x2) < 0) && (d2 = k2);
            } else
              k2.from > p2 && v2 > k2.from && (v2 = k2.from);
          }
          if (b2)
            for (var S2 = 0; S2 < b2.length; S2 += 2)
              b2[S2 + 1] == v2 && (c2 += " " + b2[S2]);
          if (!d2 || d2.from == p2)
            for (var L2 = 0; L2 < y2.length; ++L2)
              tr(t3, 0, y2[L2]);
          if (d2 && (d2.from || 0) == p2) {
            if (tr(t3, (d2.to == null ? h2 + 1 : d2.to) - p2, d2.marker, d2.from == null), d2.to == null)
              return;
            d2.to == p2 && (d2 = false);
          }
        }
        if (p2 >= h2)
          break;
        for (var T2 = Math.min(h2, v2); ; ) {
          if (g2) {
            var A2 = p2 + g2.length;
            if (!d2) {
              var M2 = A2 > T2 ? g2.slice(0, T2 - p2) : g2;
              t3.addToken(t3, M2, a2 ? a2 + s2 : s2, u2, p2 + M2.length == v2 ? c2 : "", l2, f2);
            }
            if (A2 >= T2) {
              g2 = g2.slice(T2 - p2), p2 = T2;
              break;
            }
            p2 = A2, u2 = "";
          }
          g2 = i3.slice(o2, o2 = r3[m2++]), a2 = Xt(r3[m2++], t3.cm.options);
        }
      }
    else
      for (var z2 = 1; z2 < r3.length; z2 += 2)
        t3.addToken(t3, i3.slice(o2, o2 = r3[z2]), Xt(r3[z2 + 1], t3.cm.options));
  }
  function nr(e3, t3, r3) {
    this.line = t3, this.rest = function(e4) {
      for (var t4, r4; t4 = Wt(e4); )
        e4 = t4.find(1, true).line, (r4 || (r4 = [])).push(e4);
      return r4;
    }(t3), this.size = this.rest ? Xe(V(this.rest)) - r3 + 1 : 1, this.node = this.text = null, this.hidden = $t(e3, t3);
  }
  function ir(e3, t3, r3) {
    for (var n3, i3 = [], o2 = t3; o2 < r3; o2 = n3) {
      var a2 = new nr(e3.doc, Ke(e3.doc, o2), o2);
      n3 = o2 + a2.size, i3.push(a2);
    }
    return i3;
  }
  var or = null, ar = null;
  function lr(e3, t3) {
    var r3 = fe(e3, t3);
    if (r3.length) {
      var n3, i3 = Array.prototype.slice.call(arguments, 2);
      or ? n3 = or.delayedCallbacks : ar ? n3 = ar : (n3 = ar = [], setTimeout(sr, 0));
      for (var o2 = function(e4) {
        n3.push(function() {
          return r3[e4].apply(null, i3);
        });
      }, a2 = 0; a2 < r3.length; ++a2)
        o2(a2);
    }
  }
  function sr() {
    var e3 = ar;
    ar = null;
    for (var t3 = 0; t3 < e3.length; ++t3)
      e3[t3]();
  }
  function cr(e3, t3, r3, n3) {
    for (var i3 = 0; i3 < t3.changes.length; i3++) {
      var o2 = t3.changes[i3];
      o2 == "text" ? fr(e3, t3) : o2 == "gutter" ? pr(e3, t3, r3, n3) : o2 == "class" ? hr(e3, t3) : o2 == "widget" && mr(e3, t3, n3);
    }
    t3.changes = null;
  }
  function ur(e3) {
    return e3.node == e3.text && (e3.node = z("div", null, null, "position: relative"), e3.text.parentNode && e3.text.parentNode.replaceChild(e3.node, e3.text), e3.node.appendChild(e3.text), a && l < 8 && (e3.node.style.zIndex = 2)), e3.node;
  }
  function dr(e3, t3) {
    var r3 = e3.display.externalMeasured;
    return r3 && r3.line == t3.line ? (e3.display.externalMeasured = null, t3.measure = r3.measure, r3.built) : Yt(e3, t3);
  }
  function fr(e3, t3) {
    var r3 = t3.text.className, n3 = dr(e3, t3);
    t3.text == t3.node && (t3.node = n3.pre), t3.text.parentNode.replaceChild(n3.pre, t3.text), t3.text = n3.pre, n3.bgClass != t3.bgClass || n3.textClass != t3.textClass ? (t3.bgClass = n3.bgClass, t3.textClass = n3.textClass, hr(e3, t3)) : r3 && (t3.text.className = r3);
  }
  function hr(e3, t3) {
    !function(e4, t4) {
      var r4 = t4.bgClass ? t4.bgClass + " " + (t4.line.bgClass || "") : t4.line.bgClass;
      if (r4 && (r4 += " CodeMirror-linebackground"), t4.background)
        r4 ? t4.background.className = r4 : (t4.background.parentNode.removeChild(t4.background), t4.background = null);
      else if (r4) {
        var n3 = ur(t4);
        t4.background = n3.insertBefore(z("div", null, r4), n3.firstChild), e4.display.input.setUneditable(t4.background);
      }
    }(e3, t3), t3.line.wrapClass ? ur(t3).className = t3.line.wrapClass : t3.node != t3.text && (t3.node.className = "");
    var r3 = t3.textClass ? t3.textClass + " " + (t3.line.textClass || "") : t3.line.textClass;
    t3.text.className = r3 || "";
  }
  function pr(e3, t3, r3, n3) {
    if (t3.gutter && (t3.node.removeChild(t3.gutter), t3.gutter = null), t3.gutterBackground && (t3.node.removeChild(t3.gutterBackground), t3.gutterBackground = null), t3.line.gutterClass) {
      var i3 = ur(t3);
      t3.gutterBackground = z("div", null, "CodeMirror-gutter-background " + t3.line.gutterClass, "left: " + (e3.options.fixedGutter ? n3.fixedPos : -n3.gutterTotalWidth) + "px; width: " + n3.gutterTotalWidth + "px"), e3.display.input.setUneditable(t3.gutterBackground), i3.insertBefore(t3.gutterBackground, t3.text);
    }
    var o2 = t3.line.gutterMarkers;
    if (e3.options.lineNumbers || o2) {
      var a2 = ur(t3), l2 = t3.gutter = z("div", null, "CodeMirror-gutter-wrapper", "left: " + (e3.options.fixedGutter ? n3.fixedPos : -n3.gutterTotalWidth) + "px");
      if (l2.setAttribute("aria-hidden", "true"), e3.display.input.setUneditable(l2), a2.insertBefore(l2, t3.text), t3.line.gutterClass && (l2.className += " " + t3.line.gutterClass), !e3.options.lineNumbers || o2 && o2["CodeMirror-linenumbers"] || (t3.lineNumber = l2.appendChild(z("div", Je(e3.options, r3), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + n3.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e3.display.lineNumInnerWidth + "px"))), o2)
        for (var s2 = 0; s2 < e3.display.gutterSpecs.length; ++s2) {
          var c2 = e3.display.gutterSpecs[s2].className, u2 = o2.hasOwnProperty(c2) && o2[c2];
          u2 && l2.appendChild(z("div", [u2], "CodeMirror-gutter-elt", "left: " + n3.gutterLeft[c2] + "px; width: " + n3.gutterWidth[c2] + "px"));
        }
    }
  }
  function mr(e3, t3, r3) {
    t3.alignable && (t3.alignable = null);
    for (var n3 = S("CodeMirror-linewidget"), i3 = t3.node.firstChild, o2 = void 0; i3; i3 = o2)
      o2 = i3.nextSibling, n3.test(i3.className) && t3.node.removeChild(i3);
    vr(e3, t3, r3);
  }
  function gr(e3, t3, r3, n3) {
    var i3 = dr(e3, t3);
    return t3.text = t3.node = i3.pre, i3.bgClass && (t3.bgClass = i3.bgClass), i3.textClass && (t3.textClass = i3.textClass), hr(e3, t3), pr(e3, t3, r3, n3), vr(e3, t3, n3), t3.node;
  }
  function vr(e3, t3, r3) {
    if (yr(e3, t3.line, t3, r3, true), t3.rest)
      for (var n3 = 0; n3 < t3.rest.length; n3++)
        yr(e3, t3.rest[n3], t3, r3, false);
  }
  function yr(e3, t3, r3, n3, i3) {
    if (t3.widgets)
      for (var o2 = ur(r3), a2 = 0, l2 = t3.widgets; a2 < l2.length; ++a2) {
        var s2 = l2[a2], c2 = z("div", [s2.node], "CodeMirror-linewidget" + (s2.className ? " " + s2.className : ""));
        s2.handleMouseEvents || c2.setAttribute("cm-ignore-events", "true"), br(s2, c2, r3, n3), e3.display.input.setUneditable(c2), i3 && s2.above ? o2.insertBefore(c2, r3.gutter || r3.text) : o2.appendChild(c2), lr(s2, "redraw");
      }
  }
  function br(e3, t3, r3, n3) {
    if (e3.noHScroll) {
      (r3.alignable || (r3.alignable = [])).push(t3);
      var i3 = n3.wrapperWidth;
      t3.style.left = n3.fixedPos + "px", e3.coverGutter || (i3 -= n3.gutterTotalWidth, t3.style.paddingLeft = n3.gutterTotalWidth + "px"), t3.style.width = i3 + "px";
    }
    e3.coverGutter && (t3.style.zIndex = 5, t3.style.position = "relative", e3.noHScroll || (t3.style.marginLeft = -n3.gutterTotalWidth + "px"));
  }
  function wr(e3) {
    if (e3.height != null)
      return e3.height;
    var t3 = e3.doc.cm;
    if (!t3)
      return 0;
    if (!_(document.body, e3.node)) {
      var r3 = "position: relative;";
      e3.coverGutter && (r3 += "margin-left: -" + t3.display.gutters.offsetWidth + "px;"), e3.noHScroll && (r3 += "width: " + t3.display.wrapper.clientWidth + "px;"), M(t3.display.measure, z("div", [e3.node], null, r3));
    }
    return e3.height = e3.node.parentNode.offsetHeight;
  }
  function kr(e3, t3) {
    for (var r3 = Ce(t3); r3 != e3.wrapper; r3 = r3.parentNode)
      if (!r3 || r3.nodeType == 1 && r3.getAttribute("cm-ignore-events") == "true" || r3.parentNode == e3.sizer && r3 != e3.mover)
        return true;
  }
  function xr(e3) {
    return e3.lineSpace.offsetTop;
  }
  function Cr(e3) {
    return e3.mover.offsetHeight - e3.lineSpace.offsetHeight;
  }
  function Sr(e3) {
    if (e3.cachedPaddingH)
      return e3.cachedPaddingH;
    var t3 = M(e3.measure, z("pre", "x", "CodeMirror-line-like")), r3 = window.getComputedStyle ? window.getComputedStyle(t3) : t3.currentStyle, n3 = { left: parseInt(r3.paddingLeft), right: parseInt(r3.paddingRight) };
    return isNaN(n3.left) || isNaN(n3.right) || (e3.cachedPaddingH = n3), n3;
  }
  function Lr(e3) {
    return 50 - e3.display.nativeBarWidth;
  }
  function Tr(e3) {
    return e3.display.scroller.clientWidth - Lr(e3) - e3.display.barWidth;
  }
  function Ar(e3) {
    return e3.display.scroller.clientHeight - Lr(e3) - e3.display.barHeight;
  }
  function Mr(e3, t3, r3) {
    if (e3.line == t3)
      return { map: e3.measure.map, cache: e3.measure.cache };
    for (var n3 = 0; n3 < e3.rest.length; n3++)
      if (e3.rest[n3] == t3)
        return { map: e3.measure.maps[n3], cache: e3.measure.caches[n3] };
    for (var i3 = 0; i3 < e3.rest.length; i3++)
      if (Xe(e3.rest[i3]) > r3)
        return { map: e3.measure.maps[i3], cache: e3.measure.caches[i3], before: true };
  }
  function zr(e3, t3, r3, n3) {
    return Nr(e3, _r(e3, t3), r3, n3);
  }
  function Or(e3, t3) {
    if (t3 >= e3.display.viewFrom && t3 < e3.display.viewTo)
      return e3.display.view[un(e3, t3)];
    var r3 = e3.display.externalMeasured;
    return r3 && t3 >= r3.lineN && t3 < r3.lineN + r3.size ? r3 : void 0;
  }
  function _r(e3, t3) {
    var r3 = Xe(t3), n3 = Or(e3, r3);
    n3 && !n3.text ? n3 = null : n3 && n3.changes && (cr(e3, n3, r3, on(e3)), e3.curOp.forceUpdate = true), n3 || (n3 = function(e4, t4) {
      var r4 = Xe(t4 = Bt(t4)), n4 = e4.display.externalMeasured = new nr(e4.doc, t4, r4);
      n4.lineN = r4;
      var i4 = n4.built = Yt(e4, n4);
      return n4.text = i4.pre, M(e4.display.lineMeasure, i4.pre), n4;
    }(e3, t3));
    var i3 = Mr(n3, t3, r3);
    return { line: t3, view: n3, rect: null, map: i3.map, cache: i3.cache, before: i3.before, hasHeights: false };
  }
  function Nr(e3, t3, r3, n3, i3) {
    t3.before && (r3 = -1);
    var o2, s2 = r3 + (n3 || "");
    return t3.cache.hasOwnProperty(s2) ? o2 = t3.cache[s2] : (t3.rect || (t3.rect = t3.view.text.getBoundingClientRect()), t3.hasHeights || (function(e4, t4, r4) {
      var n4 = e4.options.lineWrapping, i4 = n4 && Tr(e4);
      if (!t4.measure.heights || n4 && t4.measure.width != i4) {
        var o3 = t4.measure.heights = [];
        if (n4) {
          t4.measure.width = i4;
          for (var a2 = t4.text.firstChild.getClientRects(), l2 = 0; l2 < a2.length - 1; l2++) {
            var s3 = a2[l2], c2 = a2[l2 + 1];
            Math.abs(s3.bottom - c2.bottom) > 2 && o3.push((s3.bottom + c2.top) / 2 - r4.top);
          }
        }
        o3.push(r4.bottom - r4.top);
      }
    }(e3, t3.view, t3.rect), t3.hasHeights = true), (o2 = function(e4, t4, r4, n4) {
      var i4, o3 = Wr(t4.map, r4, n4), s3 = o3.node, c2 = o3.start, u2 = o3.end, d2 = o3.collapse;
      if (s3.nodeType == 3) {
        for (var f2 = 0; f2 < 4; f2++) {
          for (; c2 && ne(t4.line.text.charAt(o3.coverStart + c2)); )
            --c2;
          for (; o3.coverStart + u2 < o3.coverEnd && ne(t4.line.text.charAt(o3.coverStart + u2)); )
            ++u2;
          if ((i4 = a && l < 9 && c2 == 0 && u2 == o3.coverEnd - o3.coverStart ? s3.parentNode.getBoundingClientRect() : Er(L(s3, c2, u2).getClientRects(), n4)).left || i4.right || c2 == 0)
            break;
          u2 = c2, c2 -= 1, d2 = "right";
        }
        a && l < 11 && (i4 = function(e5, t5) {
          if (!window.screen || screen.logicalXDPI == null || screen.logicalXDPI == screen.deviceXDPI || !function(e6) {
            if (De != null)
              return De;
            var t6 = M(e6, z("span", "x")), r6 = t6.getBoundingClientRect(), n6 = L(t6, 0, 1).getBoundingClientRect();
            return De = Math.abs(r6.left - n6.left) > 1;
          }(e5))
            return t5;
          var r5 = screen.logicalXDPI / screen.deviceXDPI, n5 = screen.logicalYDPI / screen.deviceYDPI;
          return { left: t5.left * r5, right: t5.right * r5, top: t5.top * n5, bottom: t5.bottom * n5 };
        }(e4.display.measure, i4));
      } else {
        var h2;
        c2 > 0 && (d2 = n4 = "right"), i4 = e4.options.lineWrapping && (h2 = s3.getClientRects()).length > 1 ? h2[n4 == "right" ? h2.length - 1 : 0] : s3.getBoundingClientRect();
      }
      if (a && l < 9 && !c2 && (!i4 || !i4.left && !i4.right)) {
        var p2 = s3.parentNode.getClientRects()[0];
        i4 = p2 ? { left: p2.left, right: p2.left + nn(e4.display), top: p2.top, bottom: p2.bottom } : Dr;
      }
      for (var m2 = i4.top - t4.rect.top, g2 = i4.bottom - t4.rect.top, v2 = (m2 + g2) / 2, y2 = t4.view.measure.heights, b2 = 0; b2 < y2.length - 1 && !(v2 < y2[b2]); b2++)
        ;
      var w2 = b2 ? y2[b2 - 1] : 0, k2 = y2[b2], x2 = { left: (d2 == "right" ? i4.right : i4.left) - t4.rect.left, right: (d2 == "left" ? i4.left : i4.right) - t4.rect.left, top: w2, bottom: k2 };
      return i4.left || i4.right || (x2.bogus = true), e4.options.singleCursorHeightPerLine || (x2.rtop = m2, x2.rbottom = g2), x2;
    }(e3, t3, r3, n3)).bogus || (t3.cache[s2] = o2)), { left: o2.left, right: o2.right, top: i3 ? o2.rtop : o2.top, bottom: i3 ? o2.rbottom : o2.bottom };
  }
  var Pr, Dr = { left: 0, right: 0, top: 0, bottom: 0 };
  function Wr(e3, t3, r3) {
    for (var n3, i3, o2, a2, l2, s2, c2 = 0; c2 < e3.length; c2 += 3)
      if (l2 = e3[c2], s2 = e3[c2 + 1], t3 < l2 ? (i3 = 0, o2 = 1, a2 = "left") : t3 < s2 ? o2 = 1 + (i3 = t3 - l2) : (c2 == e3.length - 3 || t3 == s2 && e3[c2 + 3] > t3) && (i3 = (o2 = s2 - l2) - 1, t3 >= s2 && (a2 = "right")), i3 != null) {
        if (n3 = e3[c2 + 2], l2 == s2 && r3 == (n3.insertLeft ? "left" : "right") && (a2 = r3), r3 == "left" && i3 == 0)
          for (; c2 && e3[c2 - 2] == e3[c2 - 3] && e3[c2 - 1].insertLeft; )
            n3 = e3[2 + (c2 -= 3)], a2 = "left";
        if (r3 == "right" && i3 == s2 - l2)
          for (; c2 < e3.length - 3 && e3[c2 + 3] == e3[c2 + 4] && !e3[c2 + 5].insertLeft; )
            n3 = e3[(c2 += 3) + 2], a2 = "right";
        break;
      }
    return { node: n3, start: i3, end: o2, collapse: a2, coverStart: l2, coverEnd: s2 };
  }
  function Er(e3, t3) {
    var r3 = Dr;
    if (t3 == "left")
      for (var n3 = 0; n3 < e3.length && (r3 = e3[n3]).left == r3.right; n3++)
        ;
    else
      for (var i3 = e3.length - 1; i3 >= 0 && (r3 = e3[i3]).left == r3.right; i3--)
        ;
    return r3;
  }
  function Fr(e3) {
    if (e3.measure && (e3.measure.cache = {}, e3.measure.heights = null, e3.rest))
      for (var t3 = 0; t3 < e3.rest.length; t3++)
        e3.measure.caches[t3] = {};
  }
  function Br(e3) {
    e3.display.externalMeasure = null, A(e3.display.lineMeasure);
    for (var t3 = 0; t3 < e3.display.view.length; t3++)
      Fr(e3.display.view[t3]);
  }
  function Hr(e3) {
    Br(e3), e3.display.cachedCharWidth = e3.display.cachedTextHeight = e3.display.cachedPaddingH = null, e3.options.lineWrapping || (e3.display.maxLineChanged = true), e3.display.lineNumChars = null;
  }
  function Ir() {
    return u && g ? -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft)) : window.pageXOffset || (document.documentElement || document.body).scrollLeft;
  }
  function $r() {
    return u && g ? -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop)) : window.pageYOffset || (document.documentElement || document.body).scrollTop;
  }
  function Zr(e3) {
    var t3 = 0;
    if (e3.widgets)
      for (var r3 = 0; r3 < e3.widgets.length; ++r3)
        e3.widgets[r3].above && (t3 += wr(e3.widgets[r3]));
    return t3;
  }
  function Rr(e3, t3, r3, n3, i3) {
    if (!i3) {
      var o2 = Zr(t3);
      r3.top += o2, r3.bottom += o2;
    }
    if (n3 == "line")
      return r3;
    n3 || (n3 = "local");
    var a2 = Rt(t3);
    if (n3 == "local" ? a2 += xr(e3.display) : a2 -= e3.display.viewOffset, n3 == "page" || n3 == "window") {
      var l2 = e3.display.lineSpace.getBoundingClientRect();
      a2 += l2.top + (n3 == "window" ? 0 : $r());
      var s2 = l2.left + (n3 == "window" ? 0 : Ir());
      r3.left += s2, r3.right += s2;
    }
    return r3.top += a2, r3.bottom += a2, r3;
  }
  function Ur(e3, t3, r3) {
    if (r3 == "div")
      return t3;
    var n3 = t3.left, i3 = t3.top;
    if (r3 == "page")
      n3 -= Ir(), i3 -= $r();
    else if (r3 == "local" || !r3) {
      var o2 = e3.display.sizer.getBoundingClientRect();
      n3 += o2.left, i3 += o2.top;
    }
    var a2 = e3.display.lineSpace.getBoundingClientRect();
    return { left: n3 - a2.left, top: i3 - a2.top };
  }
  function jr(e3, t3, r3, n3, i3) {
    return n3 || (n3 = Ke(e3.doc, t3.line)), Rr(e3, n3, zr(e3, n3, t3.ch, i3), r3);
  }
  function Kr(e3, t3, r3, n3, i3, o2) {
    function a2(t4, a3) {
      var l3 = Nr(e3, i3, t4, a3 ? "right" : "left", o2);
      return a3 ? l3.left = l3.right : l3.right = l3.left, Rr(e3, n3, l3, r3);
    }
    n3 = n3 || Ke(e3.doc, t3.line), i3 || (i3 = _r(e3, n3));
    var l2 = ce(n3, e3.doc.direction), s2 = t3.ch, c2 = t3.sticky;
    if (s2 >= n3.text.length ? (s2 = n3.text.length, c2 = "before") : s2 <= 0 && (s2 = 0, c2 = "after"), !l2)
      return a2(c2 == "before" ? s2 - 1 : s2, c2 == "before");
    function u2(e4, t4, r4) {
      return a2(r4 ? e4 - 1 : e4, l2[t4].level == 1 != r4);
    }
    var d2 = le(l2, s2, c2), f2 = ae, h2 = u2(s2, d2, c2 == "before");
    return f2 != null && (h2.other = u2(s2, f2, c2 != "before")), h2;
  }
  function Gr(e3, t3) {
    var r3 = 0;
    t3 = lt(e3.doc, t3), e3.options.lineWrapping || (r3 = nn(e3.display) * t3.ch);
    var n3 = Ke(e3.doc, t3.line), i3 = Rt(n3) + xr(e3.display);
    return { left: r3, right: r3, top: i3, bottom: i3 + n3.height };
  }
  function Vr(e3, t3, r3, n3, i3) {
    var o2 = et(e3, t3, r3);
    return o2.xRel = i3, n3 && (o2.outside = n3), o2;
  }
  function qr(e3, t3, r3) {
    var n3 = e3.doc;
    if ((r3 += e3.display.viewOffset) < 0)
      return Vr(n3.first, 0, null, -1, -1);
    var i3 = Ye(n3, r3), o2 = n3.first + n3.size - 1;
    if (i3 > o2)
      return Vr(n3.first + n3.size - 1, Ke(n3, o2).text.length, null, 1, 1);
    t3 < 0 && (t3 = 0);
    for (var a2 = Ke(n3, i3); ; ) {
      var l2 = Jr(e3, a2, i3, t3, r3), s2 = Et(a2, l2.ch + (l2.xRel > 0 || l2.outside > 0 ? 1 : 0));
      if (!s2)
        return l2;
      var c2 = s2.find(1);
      if (c2.line == i3)
        return c2;
      a2 = Ke(n3, i3 = c2.line);
    }
  }
  function Xr(e3, t3, r3, n3) {
    n3 -= Zr(t3);
    var i3 = t3.text.length, o2 = oe(function(t4) {
      return Nr(e3, r3, t4 - 1).bottom <= n3;
    }, i3, 0);
    return { begin: o2, end: i3 = oe(function(t4) {
      return Nr(e3, r3, t4).top > n3;
    }, o2, i3) };
  }
  function Yr(e3, t3, r3, n3) {
    return r3 || (r3 = _r(e3, t3)), Xr(e3, t3, r3, Rr(e3, t3, Nr(e3, r3, n3), "line").top);
  }
  function Qr(e3, t3, r3, n3) {
    return !(e3.bottom <= r3) && (e3.top > r3 || (n3 ? e3.left : e3.right) > t3);
  }
  function Jr(e3, t3, r3, n3, i3) {
    i3 -= Rt(t3);
    var o2 = _r(e3, t3), a2 = Zr(t3), l2 = 0, s2 = t3.text.length, c2 = true, u2 = ce(t3, e3.doc.direction);
    if (u2) {
      var d2 = (e3.options.lineWrapping ? tn : en)(e3, t3, r3, o2, u2, n3, i3);
      l2 = (c2 = d2.level != 1) ? d2.from : d2.to - 1, s2 = c2 ? d2.to : d2.from - 1;
    }
    var f2, h2, p2 = null, m2 = null, g2 = oe(function(t4) {
      var r4 = Nr(e3, o2, t4);
      return r4.top += a2, r4.bottom += a2, !!Qr(r4, n3, i3, false) && (r4.top <= i3 && r4.left <= n3 && (p2 = t4, m2 = r4), true);
    }, l2, s2), v2 = false;
    if (m2) {
      var y2 = n3 - m2.left < m2.right - n3, b2 = y2 == c2;
      g2 = p2 + (b2 ? 0 : 1), h2 = b2 ? "after" : "before", f2 = y2 ? m2.left : m2.right;
    } else {
      c2 || g2 != s2 && g2 != l2 || g2++, h2 = g2 == 0 ? "after" : g2 == t3.text.length ? "before" : Nr(e3, o2, g2 - (c2 ? 1 : 0)).bottom + a2 <= i3 == c2 ? "after" : "before";
      var w2 = Kr(e3, et(r3, g2, h2), "line", t3, o2);
      f2 = w2.left, v2 = i3 < w2.top ? -1 : i3 >= w2.bottom ? 1 : 0;
    }
    return Vr(r3, g2 = ie(t3.text, g2, 1), h2, v2, n3 - f2);
  }
  function en(e3, t3, r3, n3, i3, o2, a2) {
    var l2 = oe(function(l3) {
      var s3 = i3[l3], c3 = s3.level != 1;
      return Qr(Kr(e3, et(r3, c3 ? s3.to : s3.from, c3 ? "before" : "after"), "line", t3, n3), o2, a2, true);
    }, 0, i3.length - 1), s2 = i3[l2];
    if (l2 > 0) {
      var c2 = s2.level != 1, u2 = Kr(e3, et(r3, c2 ? s2.from : s2.to, c2 ? "after" : "before"), "line", t3, n3);
      Qr(u2, o2, a2, true) && u2.top > a2 && (s2 = i3[l2 - 1]);
    }
    return s2;
  }
  function tn(e3, t3, r3, n3, i3, o2, a2) {
    var l2 = Xr(e3, t3, n3, a2), s2 = l2.begin, c2 = l2.end;
    /\s/.test(t3.text.charAt(c2 - 1)) && c2--;
    for (var u2 = null, d2 = null, f2 = 0; f2 < i3.length; f2++) {
      var h2 = i3[f2];
      if (!(h2.from >= c2 || h2.to <= s2)) {
        var p2 = Nr(e3, n3, h2.level != 1 ? Math.min(c2, h2.to) - 1 : Math.max(s2, h2.from)).right, m2 = p2 < o2 ? o2 - p2 + 1e9 : p2 - o2;
        (!u2 || d2 > m2) && (u2 = h2, d2 = m2);
      }
    }
    return u2 || (u2 = i3[i3.length - 1]), u2.from < s2 && (u2 = { from: s2, to: u2.to, level: u2.level }), u2.to > c2 && (u2 = { from: u2.from, to: c2, level: u2.level }), u2;
  }
  function rn(e3) {
    if (e3.cachedTextHeight != null)
      return e3.cachedTextHeight;
    if (Pr == null) {
      Pr = z("pre", null, "CodeMirror-line-like");
      for (var t3 = 0; t3 < 49; ++t3)
        Pr.appendChild(document.createTextNode("x")), Pr.appendChild(z("br"));
      Pr.appendChild(document.createTextNode("x"));
    }
    M(e3.measure, Pr);
    var r3 = Pr.offsetHeight / 50;
    return r3 > 3 && (e3.cachedTextHeight = r3), A(e3.measure), r3 || 1;
  }
  function nn(e3) {
    if (e3.cachedCharWidth != null)
      return e3.cachedCharWidth;
    var t3 = z("span", "xxxxxxxxxx"), r3 = z("pre", [t3], "CodeMirror-line-like");
    M(e3.measure, r3);
    var n3 = t3.getBoundingClientRect(), i3 = (n3.right - n3.left) / 10;
    return i3 > 2 && (e3.cachedCharWidth = i3), i3 || 10;
  }
  function on(e3) {
    for (var t3 = e3.display, r3 = {}, n3 = {}, i3 = t3.gutters.clientLeft, o2 = t3.gutters.firstChild, a2 = 0; o2; o2 = o2.nextSibling, ++a2) {
      var l2 = e3.display.gutterSpecs[a2].className;
      r3[l2] = o2.offsetLeft + o2.clientLeft + i3, n3[l2] = o2.clientWidth;
    }
    return { fixedPos: an(t3), gutterTotalWidth: t3.gutters.offsetWidth, gutterLeft: r3, gutterWidth: n3, wrapperWidth: t3.wrapper.clientWidth };
  }
  function an(e3) {
    return e3.scroller.getBoundingClientRect().left - e3.sizer.getBoundingClientRect().left;
  }
  function ln(e3) {
    var t3 = rn(e3.display), r3 = e3.options.lineWrapping, n3 = r3 && Math.max(5, e3.display.scroller.clientWidth / nn(e3.display) - 3);
    return function(i3) {
      if ($t(e3.doc, i3))
        return 0;
      var o2 = 0;
      if (i3.widgets)
        for (var a2 = 0; a2 < i3.widgets.length; a2++)
          i3.widgets[a2].height && (o2 += i3.widgets[a2].height);
      return r3 ? o2 + (Math.ceil(i3.text.length / n3) || 1) * t3 : o2 + t3;
    };
  }
  function sn(e3) {
    var t3 = e3.doc, r3 = ln(e3);
    t3.iter(function(e4) {
      var t4 = r3(e4);
      t4 != e4.height && qe(e4, t4);
    });
  }
  function cn(e3, t3, r3, n3) {
    var i3 = e3.display;
    if (!r3 && Ce(t3).getAttribute("cm-not-content") == "true")
      return null;
    var o2, a2, l2 = i3.lineSpace.getBoundingClientRect();
    try {
      o2 = t3.clientX - l2.left, a2 = t3.clientY - l2.top;
    } catch (e4) {
      return null;
    }
    var s2, c2 = qr(e3, o2, a2);
    if (n3 && c2.xRel > 0 && (s2 = Ke(e3.doc, c2.line).text).length == c2.ch) {
      var u2 = B(s2, s2.length, e3.options.tabSize) - s2.length;
      c2 = et(c2.line, Math.max(0, Math.round((o2 - Sr(e3.display).left) / nn(e3.display)) - u2));
    }
    return c2;
  }
  function un(e3, t3) {
    if (t3 >= e3.display.viewTo)
      return null;
    if ((t3 -= e3.display.viewFrom) < 0)
      return null;
    for (var r3 = e3.display.view, n3 = 0; n3 < r3.length; n3++)
      if ((t3 -= r3[n3].size) < 0)
        return n3;
  }
  function dn(e3, t3, r3, n3) {
    t3 == null && (t3 = e3.doc.first), r3 == null && (r3 = e3.doc.first + e3.doc.size), n3 || (n3 = 0);
    var i3 = e3.display;
    if (n3 && r3 < i3.viewTo && (i3.updateLineNumbers == null || i3.updateLineNumbers > t3) && (i3.updateLineNumbers = t3), e3.curOp.viewChanged = true, t3 >= i3.viewTo)
      xt && Ht(e3.doc, t3) < i3.viewTo && hn(e3);
    else if (r3 <= i3.viewFrom)
      xt && It(e3.doc, r3 + n3) > i3.viewFrom ? hn(e3) : (i3.viewFrom += n3, i3.viewTo += n3);
    else if (t3 <= i3.viewFrom && r3 >= i3.viewTo)
      hn(e3);
    else if (t3 <= i3.viewFrom) {
      var o2 = pn(e3, r3, r3 + n3, 1);
      o2 ? (i3.view = i3.view.slice(o2.index), i3.viewFrom = o2.lineN, i3.viewTo += n3) : hn(e3);
    } else if (r3 >= i3.viewTo) {
      var a2 = pn(e3, t3, t3, -1);
      a2 ? (i3.view = i3.view.slice(0, a2.index), i3.viewTo = a2.lineN) : hn(e3);
    } else {
      var l2 = pn(e3, t3, t3, -1), s2 = pn(e3, r3, r3 + n3, 1);
      l2 && s2 ? (i3.view = i3.view.slice(0, l2.index).concat(ir(e3, l2.lineN, s2.lineN)).concat(i3.view.slice(s2.index)), i3.viewTo += n3) : hn(e3);
    }
    var c2 = i3.externalMeasured;
    c2 && (r3 < c2.lineN ? c2.lineN += n3 : t3 < c2.lineN + c2.size && (i3.externalMeasured = null));
  }
  function fn2(e3, t3, r3) {
    e3.curOp.viewChanged = true;
    var n3 = e3.display, i3 = e3.display.externalMeasured;
    if (i3 && t3 >= i3.lineN && t3 < i3.lineN + i3.size && (n3.externalMeasured = null), !(t3 < n3.viewFrom || t3 >= n3.viewTo)) {
      var o2 = n3.view[un(e3, t3)];
      if (o2.node != null) {
        var a2 = o2.changes || (o2.changes = []);
        I(a2, r3) == -1 && a2.push(r3);
      }
    }
  }
  function hn(e3) {
    e3.display.viewFrom = e3.display.viewTo = e3.doc.first, e3.display.view = [], e3.display.viewOffset = 0;
  }
  function pn(e3, t3, r3, n3) {
    var i3, o2 = un(e3, t3), a2 = e3.display.view;
    if (!xt || r3 == e3.doc.first + e3.doc.size)
      return { index: o2, lineN: r3 };
    for (var l2 = e3.display.viewFrom, s2 = 0; s2 < o2; s2++)
      l2 += a2[s2].size;
    if (l2 != t3) {
      if (n3 > 0) {
        if (o2 == a2.length - 1)
          return null;
        i3 = l2 + a2[o2].size - t3, o2++;
      } else
        i3 = l2 - t3;
      t3 += i3, r3 += i3;
    }
    for (; Ht(e3.doc, r3) != r3; ) {
      if (o2 == (n3 < 0 ? 0 : a2.length - 1))
        return null;
      r3 += n3 * a2[o2 - (n3 < 0 ? 1 : 0)].size, o2 += n3;
    }
    return { index: o2, lineN: r3 };
  }
  function mn(e3) {
    for (var t3 = e3.display.view, r3 = 0, n3 = 0; n3 < t3.length; n3++) {
      var i3 = t3[n3];
      i3.hidden || i3.node && !i3.changes || ++r3;
    }
    return r3;
  }
  function gn(e3) {
    e3.display.input.showSelection(e3.display.input.prepareSelection());
  }
  function vn(e3, t3) {
    t3 === void 0 && (t3 = true);
    for (var r3 = e3.doc, n3 = {}, i3 = n3.cursors = document.createDocumentFragment(), o2 = n3.selection = document.createDocumentFragment(), a2 = 0; a2 < r3.sel.ranges.length; a2++)
      if (t3 || a2 != r3.sel.primIndex) {
        var l2 = r3.sel.ranges[a2];
        if (!(l2.from().line >= e3.display.viewTo || l2.to().line < e3.display.viewFrom)) {
          var s2 = l2.empty();
          (s2 || e3.options.showCursorWhenSelecting) && yn(e3, l2.head, i3), s2 || wn(e3, l2, o2);
        }
      }
    return n3;
  }
  function yn(e3, t3, r3) {
    var n3 = Kr(e3, t3, "div", null, null, !e3.options.singleCursorHeightPerLine), i3 = r3.appendChild(z("div", "\xA0", "CodeMirror-cursor"));
    if (i3.style.left = n3.left + "px", i3.style.top = n3.top + "px", i3.style.height = Math.max(0, n3.bottom - n3.top) * e3.options.cursorHeight + "px", n3.other) {
      var o2 = r3.appendChild(z("div", "\xA0", "CodeMirror-cursor CodeMirror-secondarycursor"));
      o2.style.display = "", o2.style.left = n3.other.left + "px", o2.style.top = n3.other.top + "px", o2.style.height = 0.85 * (n3.other.bottom - n3.other.top) + "px";
    }
  }
  function bn(e3, t3) {
    return e3.top - t3.top || e3.left - t3.left;
  }
  function wn(e3, t3, r3) {
    var n3 = e3.display, i3 = e3.doc, o2 = document.createDocumentFragment(), a2 = Sr(e3.display), l2 = a2.left, s2 = Math.max(n3.sizerWidth, Tr(e3) - n3.sizer.offsetLeft) - a2.right, c2 = i3.direction == "ltr";
    function u2(e4, t4, r4, n4) {
      t4 < 0 && (t4 = 0), t4 = Math.round(t4), n4 = Math.round(n4), o2.appendChild(z("div", null, "CodeMirror-selected", "position: absolute; left: " + e4 + "px;\n                             top: " + t4 + "px; width: " + (r4 == null ? s2 - e4 : r4) + "px;\n                             height: " + (n4 - t4) + "px"));
    }
    function d2(t4, r4, n4) {
      var o3, a3, d3 = Ke(i3, t4), f3 = d3.text.length;
      function h3(r5, n5) {
        return jr(e3, et(t4, r5), "div", d3, n5);
      }
      function p3(t5, r5, n5) {
        var i4 = Yr(e3, d3, null, t5), o4 = r5 == "ltr" == (n5 == "after") ? "left" : "right";
        return h3(n5 == "after" ? i4.begin : i4.end - (/\s/.test(d3.text.charAt(i4.end - 1)) ? 2 : 1), o4)[o4];
      }
      var m3 = ce(d3, i3.direction);
      return function(e4, t5, r5, n5) {
        if (!e4)
          return n5(t5, r5, "ltr", 0);
        for (var i4 = false, o4 = 0; o4 < e4.length; ++o4) {
          var a4 = e4[o4];
          (a4.from < r5 && a4.to > t5 || t5 == r5 && a4.to == t5) && (n5(Math.max(a4.from, t5), Math.min(a4.to, r5), a4.level == 1 ? "rtl" : "ltr", o4), i4 = true);
        }
        i4 || n5(t5, r5, "ltr");
      }(m3, r4 || 0, n4 == null ? f3 : n4, function(e4, t5, i4, d4) {
        var g3 = i4 == "ltr", v3 = h3(e4, g3 ? "left" : "right"), y3 = h3(t5 - 1, g3 ? "right" : "left"), b2 = r4 == null && e4 == 0, w2 = n4 == null && t5 == f3, k2 = d4 == 0, x2 = !m3 || d4 == m3.length - 1;
        if (y3.top - v3.top <= 3) {
          var C2 = (c2 ? w2 : b2) && x2, S2 = (c2 ? b2 : w2) && k2 ? l2 : (g3 ? v3 : y3).left, L2 = C2 ? s2 : (g3 ? y3 : v3).right;
          u2(S2, v3.top, L2 - S2, v3.bottom);
        } else {
          var T2, A2, M2, z2;
          g3 ? (T2 = c2 && b2 && k2 ? l2 : v3.left, A2 = c2 ? s2 : p3(e4, i4, "before"), M2 = c2 ? l2 : p3(t5, i4, "after"), z2 = c2 && w2 && x2 ? s2 : y3.right) : (T2 = c2 ? p3(e4, i4, "before") : l2, A2 = !c2 && b2 && k2 ? s2 : v3.right, M2 = !c2 && w2 && x2 ? l2 : y3.left, z2 = c2 ? p3(t5, i4, "after") : s2), u2(T2, v3.top, A2 - T2, v3.bottom), v3.bottom < y3.top && u2(l2, v3.bottom, null, y3.top), u2(M2, y3.top, z2 - M2, y3.bottom);
        }
        (!o3 || bn(v3, o3) < 0) && (o3 = v3), bn(y3, o3) < 0 && (o3 = y3), (!a3 || bn(v3, a3) < 0) && (a3 = v3), bn(y3, a3) < 0 && (a3 = y3);
      }), { start: o3, end: a3 };
    }
    var f2 = t3.from(), h2 = t3.to();
    if (f2.line == h2.line)
      d2(f2.line, f2.ch, h2.ch);
    else {
      var p2 = Ke(i3, f2.line), m2 = Ke(i3, h2.line), g2 = Bt(p2) == Bt(m2), v2 = d2(f2.line, f2.ch, g2 ? p2.text.length + 1 : null).end, y2 = d2(h2.line, g2 ? 0 : null, h2.ch).start;
      g2 && (v2.top < y2.top - 2 ? (u2(v2.right, v2.top, null, v2.bottom), u2(l2, y2.top, y2.left, y2.bottom)) : u2(v2.right, v2.top, y2.left - v2.right, v2.bottom)), v2.bottom < y2.top && u2(l2, v2.bottom, null, y2.top);
    }
    r3.appendChild(o2);
  }
  function kn(e3) {
    if (e3.state.focused) {
      var t3 = e3.display;
      clearInterval(t3.blinker);
      var r3 = true;
      t3.cursorDiv.style.visibility = "", e3.options.cursorBlinkRate > 0 ? t3.blinker = setInterval(function() {
        e3.hasFocus() || Ln(e3), t3.cursorDiv.style.visibility = (r3 = !r3) ? "" : "hidden";
      }, e3.options.cursorBlinkRate) : e3.options.cursorBlinkRate < 0 && (t3.cursorDiv.style.visibility = "hidden");
    }
  }
  function xn(e3) {
    e3.hasFocus() || (e3.display.input.focus(), e3.state.focused || Sn(e3));
  }
  function Cn(e3) {
    e3.state.delayingBlurEvent = true, setTimeout(function() {
      e3.state.delayingBlurEvent && (e3.state.delayingBlurEvent = false, e3.state.focused && Ln(e3));
    }, 100);
  }
  function Sn(e3, t3) {
    e3.state.delayingBlurEvent && !e3.state.draggingText && (e3.state.delayingBlurEvent = false), e3.options.readOnly != "nocursor" && (e3.state.focused || (pe(e3, "focus", e3, t3), e3.state.focused = true, P(e3.display.wrapper, "CodeMirror-focused"), e3.curOp || e3.display.selForContextMenu == e3.doc.sel || (e3.display.input.reset(), s && setTimeout(function() {
      return e3.display.input.reset(true);
    }, 20)), e3.display.input.receivedFocus()), kn(e3));
  }
  function Ln(e3, t3) {
    e3.state.delayingBlurEvent || (e3.state.focused && (pe(e3, "blur", e3, t3), e3.state.focused = false, T(e3.display.wrapper, "CodeMirror-focused")), clearInterval(e3.display.blinker), setTimeout(function() {
      e3.state.focused || (e3.display.shift = false);
    }, 150));
  }
  function Tn(e3) {
    for (var t3 = e3.display, r3 = t3.lineDiv.offsetTop, n3 = 0; n3 < t3.view.length; n3++) {
      var i3 = t3.view[n3], o2 = e3.options.lineWrapping, s2 = void 0, c2 = 0;
      if (!i3.hidden) {
        if (a && l < 8) {
          var u2 = i3.node.offsetTop + i3.node.offsetHeight;
          s2 = u2 - r3, r3 = u2;
        } else {
          var d2 = i3.node.getBoundingClientRect();
          s2 = d2.bottom - d2.top, !o2 && i3.text.firstChild && (c2 = i3.text.firstChild.getBoundingClientRect().right - d2.left - 1);
        }
        var f2 = i3.line.height - s2;
        if ((f2 > 5e-3 || f2 < -5e-3) && (qe(i3.line, s2), An(i3.line), i3.rest))
          for (var h2 = 0; h2 < i3.rest.length; h2++)
            An(i3.rest[h2]);
        if (c2 > e3.display.sizerWidth) {
          var p2 = Math.ceil(c2 / nn(e3.display));
          p2 > e3.display.maxLineLength && (e3.display.maxLineLength = p2, e3.display.maxLine = i3.line, e3.display.maxLineChanged = true);
        }
      }
    }
  }
  function An(e3) {
    if (e3.widgets)
      for (var t3 = 0; t3 < e3.widgets.length; ++t3) {
        var r3 = e3.widgets[t3], n3 = r3.node.parentNode;
        n3 && (r3.height = n3.offsetHeight);
      }
  }
  function Mn(e3, t3, r3) {
    var n3 = r3 && r3.top != null ? Math.max(0, r3.top) : e3.scroller.scrollTop;
    n3 = Math.floor(n3 - xr(e3));
    var i3 = r3 && r3.bottom != null ? r3.bottom : n3 + e3.wrapper.clientHeight, o2 = Ye(t3, n3), a2 = Ye(t3, i3);
    if (r3 && r3.ensure) {
      var l2 = r3.ensure.from.line, s2 = r3.ensure.to.line;
      l2 < o2 ? (o2 = l2, a2 = Ye(t3, Rt(Ke(t3, l2)) + e3.wrapper.clientHeight)) : Math.min(s2, t3.lastLine()) >= a2 && (o2 = Ye(t3, Rt(Ke(t3, s2)) - e3.wrapper.clientHeight), a2 = s2);
    }
    return { from: o2, to: Math.max(a2, o2 + 1) };
  }
  function zn(e3, t3) {
    var r3 = e3.display, n3 = rn(e3.display);
    t3.top < 0 && (t3.top = 0);
    var i3 = e3.curOp && e3.curOp.scrollTop != null ? e3.curOp.scrollTop : r3.scroller.scrollTop, o2 = Ar(e3), a2 = {};
    t3.bottom - t3.top > o2 && (t3.bottom = t3.top + o2);
    var l2 = e3.doc.height + Cr(r3), s2 = t3.top < n3, c2 = t3.bottom > l2 - n3;
    if (t3.top < i3)
      a2.scrollTop = s2 ? 0 : t3.top;
    else if (t3.bottom > i3 + o2) {
      var u2 = Math.min(t3.top, (c2 ? l2 : t3.bottom) - o2);
      u2 != i3 && (a2.scrollTop = u2);
    }
    var d2 = e3.options.fixedGutter ? 0 : r3.gutters.offsetWidth, f2 = e3.curOp && e3.curOp.scrollLeft != null ? e3.curOp.scrollLeft : r3.scroller.scrollLeft - d2, h2 = Tr(e3) - r3.gutters.offsetWidth, p2 = t3.right - t3.left > h2;
    return p2 && (t3.right = t3.left + h2), t3.left < 10 ? a2.scrollLeft = 0 : t3.left < f2 ? a2.scrollLeft = Math.max(0, t3.left + d2 - (p2 ? 0 : 10)) : t3.right > h2 + f2 - 3 && (a2.scrollLeft = t3.right + (p2 ? 0 : 10) - h2), a2;
  }
  function On(e3, t3) {
    t3 != null && (Pn(e3), e3.curOp.scrollTop = (e3.curOp.scrollTop == null ? e3.doc.scrollTop : e3.curOp.scrollTop) + t3);
  }
  function _n(e3) {
    Pn(e3);
    var t3 = e3.getCursor();
    e3.curOp.scrollToPos = { from: t3, to: t3, margin: e3.options.cursorScrollMargin };
  }
  function Nn(e3, t3, r3) {
    t3 == null && r3 == null || Pn(e3), t3 != null && (e3.curOp.scrollLeft = t3), r3 != null && (e3.curOp.scrollTop = r3);
  }
  function Pn(e3) {
    var t3 = e3.curOp.scrollToPos;
    t3 && (e3.curOp.scrollToPos = null, Dn(e3, Gr(e3, t3.from), Gr(e3, t3.to), t3.margin));
  }
  function Dn(e3, t3, r3, n3) {
    var i3 = zn(e3, { left: Math.min(t3.left, r3.left), top: Math.min(t3.top, r3.top) - n3, right: Math.max(t3.right, r3.right), bottom: Math.max(t3.bottom, r3.bottom) + n3 });
    Nn(e3, i3.scrollLeft, i3.scrollTop);
  }
  function Wn(e3, t3) {
    Math.abs(e3.doc.scrollTop - t3) < 2 || (r2 || si(e3, { top: t3 }), En(e3, t3, true), r2 && si(e3), ni(e3, 100));
  }
  function En(e3, t3, r3) {
    t3 = Math.max(0, Math.min(e3.display.scroller.scrollHeight - e3.display.scroller.clientHeight, t3)), (e3.display.scroller.scrollTop != t3 || r3) && (e3.doc.scrollTop = t3, e3.display.scrollbars.setScrollTop(t3), e3.display.scroller.scrollTop != t3 && (e3.display.scroller.scrollTop = t3));
  }
  function Fn(e3, t3, r3, n3) {
    t3 = Math.max(0, Math.min(t3, e3.display.scroller.scrollWidth - e3.display.scroller.clientWidth)), (r3 ? t3 == e3.doc.scrollLeft : Math.abs(e3.doc.scrollLeft - t3) < 2) && !n3 || (e3.doc.scrollLeft = t3, di(e3), e3.display.scroller.scrollLeft != t3 && (e3.display.scroller.scrollLeft = t3), e3.display.scrollbars.setScrollLeft(t3));
  }
  function Bn(e3) {
    var t3 = e3.display, r3 = t3.gutters.offsetWidth, n3 = Math.round(e3.doc.height + Cr(e3.display));
    return { clientHeight: t3.scroller.clientHeight, viewHeight: t3.wrapper.clientHeight, scrollWidth: t3.scroller.scrollWidth, clientWidth: t3.scroller.clientWidth, viewWidth: t3.wrapper.clientWidth, barLeft: e3.options.fixedGutter ? r3 : 0, docHeight: n3, scrollHeight: n3 + Lr(e3) + t3.barHeight, nativeBarWidth: t3.nativeBarWidth, gutterWidth: r3 };
  }
  var Hn = function(e3, t3, r3) {
    this.cm = r3;
    var n3 = this.vert = z("div", [z("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"), i3 = this.horiz = z("div", [z("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
    n3.tabIndex = i3.tabIndex = -1, e3(n3), e3(i3), de(n3, "scroll", function() {
      n3.clientHeight && t3(n3.scrollTop, "vertical");
    }), de(i3, "scroll", function() {
      i3.clientWidth && t3(i3.scrollLeft, "horizontal");
    }), this.checkedZeroWidth = false, a && l < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
  };
  Hn.prototype.update = function(e3) {
    var t3 = e3.scrollWidth > e3.clientWidth + 1, r3 = e3.scrollHeight > e3.clientHeight + 1, n3 = e3.nativeBarWidth;
    if (r3) {
      this.vert.style.display = "block", this.vert.style.bottom = t3 ? n3 + "px" : "0";
      var i3 = e3.viewHeight - (t3 ? n3 : 0);
      this.vert.firstChild.style.height = Math.max(0, e3.scrollHeight - e3.clientHeight + i3) + "px";
    } else
      this.vert.style.display = "", this.vert.firstChild.style.height = "0";
    if (t3) {
      this.horiz.style.display = "block", this.horiz.style.right = r3 ? n3 + "px" : "0", this.horiz.style.left = e3.barLeft + "px";
      var o2 = e3.viewWidth - e3.barLeft - (r3 ? n3 : 0);
      this.horiz.firstChild.style.width = Math.max(0, e3.scrollWidth - e3.clientWidth + o2) + "px";
    } else
      this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
    return !this.checkedZeroWidth && e3.clientHeight > 0 && (n3 == 0 && this.zeroWidthHack(), this.checkedZeroWidth = true), { right: r3 ? n3 : 0, bottom: t3 ? n3 : 0 };
  }, Hn.prototype.setScrollLeft = function(e3) {
    this.horiz.scrollLeft != e3 && (this.horiz.scrollLeft = e3), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
  }, Hn.prototype.setScrollTop = function(e3) {
    this.vert.scrollTop != e3 && (this.vert.scrollTop = e3), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
  }, Hn.prototype.zeroWidthHack = function() {
    var e3 = y && !h ? "12px" : "18px";
    this.horiz.style.height = this.vert.style.width = e3, this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none", this.disableHoriz = new H(), this.disableVert = new H();
  }, Hn.prototype.enableZeroWidthBar = function(e3, t3, r3) {
    e3.style.pointerEvents = "auto", t3.set(1e3, function n3() {
      var i3 = e3.getBoundingClientRect();
      (r3 == "vert" ? document.elementFromPoint(i3.right - 1, (i3.top + i3.bottom) / 2) : document.elementFromPoint((i3.right + i3.left) / 2, i3.bottom - 1)) != e3 ? e3.style.pointerEvents = "none" : t3.set(1e3, n3);
    });
  }, Hn.prototype.clear = function() {
    var e3 = this.horiz.parentNode;
    e3.removeChild(this.horiz), e3.removeChild(this.vert);
  };
  var In = function() {
  };
  function $n(e3, t3) {
    t3 || (t3 = Bn(e3));
    var r3 = e3.display.barWidth, n3 = e3.display.barHeight;
    Zn(e3, t3);
    for (var i3 = 0; i3 < 4 && r3 != e3.display.barWidth || n3 != e3.display.barHeight; i3++)
      r3 != e3.display.barWidth && e3.options.lineWrapping && Tn(e3), Zn(e3, Bn(e3)), r3 = e3.display.barWidth, n3 = e3.display.barHeight;
  }
  function Zn(e3, t3) {
    var r3 = e3.display, n3 = r3.scrollbars.update(t3);
    r3.sizer.style.paddingRight = (r3.barWidth = n3.right) + "px", r3.sizer.style.paddingBottom = (r3.barHeight = n3.bottom) + "px", r3.heightForcer.style.borderBottom = n3.bottom + "px solid transparent", n3.right && n3.bottom ? (r3.scrollbarFiller.style.display = "block", r3.scrollbarFiller.style.height = n3.bottom + "px", r3.scrollbarFiller.style.width = n3.right + "px") : r3.scrollbarFiller.style.display = "", n3.bottom && e3.options.coverGutterNextToScrollbar && e3.options.fixedGutter ? (r3.gutterFiller.style.display = "block", r3.gutterFiller.style.height = n3.bottom + "px", r3.gutterFiller.style.width = t3.gutterWidth + "px") : r3.gutterFiller.style.display = "";
  }
  In.prototype.update = function() {
    return { bottom: 0, right: 0 };
  }, In.prototype.setScrollLeft = function() {
  }, In.prototype.setScrollTop = function() {
  }, In.prototype.clear = function() {
  };
  var Rn = { native: Hn, null: In };
  function Un(e3) {
    e3.display.scrollbars && (e3.display.scrollbars.clear(), e3.display.scrollbars.addClass && T(e3.display.wrapper, e3.display.scrollbars.addClass)), e3.display.scrollbars = new Rn[e3.options.scrollbarStyle](function(t3) {
      e3.display.wrapper.insertBefore(t3, e3.display.scrollbarFiller), de(t3, "mousedown", function() {
        e3.state.focused && setTimeout(function() {
          return e3.display.input.focus();
        }, 0);
      }), t3.setAttribute("cm-not-content", "true");
    }, function(t3, r3) {
      r3 == "horizontal" ? Fn(e3, t3) : Wn(e3, t3);
    }, e3), e3.display.scrollbars.addClass && P(e3.display.wrapper, e3.display.scrollbars.addClass);
  }
  var jn = 0;
  function Kn(e3) {
    var t3;
    e3.curOp = { cm: e3, viewChanged: false, startHeight: e3.doc.height, forceUpdate: false, updateInput: 0, typing: false, changeObjs: null, cursorActivityHandlers: null, cursorActivityCalled: 0, selectionChanged: false, updateMaxLine: false, scrollLeft: null, scrollTop: null, scrollToPos: null, focus: false, id: ++jn }, t3 = e3.curOp, or ? or.ops.push(t3) : t3.ownsGroup = or = { ops: [t3], delayedCallbacks: [] };
  }
  function Gn(e3) {
    var t3 = e3.curOp;
    t3 && function(e4, t4) {
      var r3 = e4.ownsGroup;
      if (r3)
        try {
          !function(e5) {
            var t5 = e5.delayedCallbacks, r4 = 0;
            do {
              for (; r4 < t5.length; r4++)
                t5[r4].call(null);
              for (var n3 = 0; n3 < e5.ops.length; n3++) {
                var i3 = e5.ops[n3];
                if (i3.cursorActivityHandlers)
                  for (; i3.cursorActivityCalled < i3.cursorActivityHandlers.length; )
                    i3.cursorActivityHandlers[i3.cursorActivityCalled++].call(null, i3.cm);
              }
            } while (r4 < t5.length);
          }(r3);
        } finally {
          or = null, function(e5) {
            for (var t5 = 0; t5 < e5.ops.length; t5++)
              e5.ops[t5].cm.curOp = null;
            !function(e6) {
              for (var t6 = e6.ops, r4 = 0; r4 < t6.length; r4++)
                Vn(t6[r4]);
              for (var n3 = 0; n3 < t6.length; n3++)
                qn(t6[n3]);
              for (var i3 = 0; i3 < t6.length; i3++)
                Xn(t6[i3]);
              for (var o2 = 0; o2 < t6.length; o2++)
                Yn(t6[o2]);
              for (var a2 = 0; a2 < t6.length; a2++)
                Qn(t6[a2]);
            }(e5);
          }(r3);
        }
    }(t3);
  }
  function Vn(e3) {
    var t3 = e3.cm, r3 = t3.display;
    !function(e4) {
      var t4 = e4.display;
      !t4.scrollbarsClipped && t4.scroller.offsetWidth && (t4.nativeBarWidth = t4.scroller.offsetWidth - t4.scroller.clientWidth, t4.heightForcer.style.height = Lr(e4) + "px", t4.sizer.style.marginBottom = -t4.nativeBarWidth + "px", t4.sizer.style.borderRightWidth = Lr(e4) + "px", t4.scrollbarsClipped = true);
    }(t3), e3.updateMaxLine && jt(t3), e3.mustUpdate = e3.viewChanged || e3.forceUpdate || e3.scrollTop != null || e3.scrollToPos && (e3.scrollToPos.from.line < r3.viewFrom || e3.scrollToPos.to.line >= r3.viewTo) || r3.maxLineChanged && t3.options.lineWrapping, e3.update = e3.mustUpdate && new oi(t3, e3.mustUpdate && { top: e3.scrollTop, ensure: e3.scrollToPos }, e3.forceUpdate);
  }
  function qn(e3) {
    e3.updatedDisplay = e3.mustUpdate && ai(e3.cm, e3.update);
  }
  function Xn(e3) {
    var t3 = e3.cm, r3 = t3.display;
    e3.updatedDisplay && Tn(t3), e3.barMeasure = Bn(t3), r3.maxLineChanged && !t3.options.lineWrapping && (e3.adjustWidthTo = zr(t3, r3.maxLine, r3.maxLine.text.length).left + 3, t3.display.sizerWidth = e3.adjustWidthTo, e3.barMeasure.scrollWidth = Math.max(r3.scroller.clientWidth, r3.sizer.offsetLeft + e3.adjustWidthTo + Lr(t3) + t3.display.barWidth), e3.maxScrollLeft = Math.max(0, r3.sizer.offsetLeft + e3.adjustWidthTo - Tr(t3))), (e3.updatedDisplay || e3.selectionChanged) && (e3.preparedSelection = r3.input.prepareSelection());
  }
  function Yn(e3) {
    var t3 = e3.cm;
    e3.adjustWidthTo != null && (t3.display.sizer.style.minWidth = e3.adjustWidthTo + "px", e3.maxScrollLeft < t3.doc.scrollLeft && Fn(t3, Math.min(t3.display.scroller.scrollLeft, e3.maxScrollLeft), true), t3.display.maxLineChanged = false);
    var r3 = e3.focus && e3.focus == N();
    e3.preparedSelection && t3.display.input.showSelection(e3.preparedSelection, r3), (e3.updatedDisplay || e3.startHeight != t3.doc.height) && $n(t3, e3.barMeasure), e3.updatedDisplay && ui(t3, e3.barMeasure), e3.selectionChanged && kn(t3), t3.state.focused && e3.updateInput && t3.display.input.reset(e3.typing), r3 && xn(e3.cm);
  }
  function Qn(e3) {
    var t3 = e3.cm, r3 = t3.display, n3 = t3.doc;
    e3.updatedDisplay && li(t3, e3.update), r3.wheelStartX == null || e3.scrollTop == null && e3.scrollLeft == null && !e3.scrollToPos || (r3.wheelStartX = r3.wheelStartY = null), e3.scrollTop != null && En(t3, e3.scrollTop, e3.forceScroll), e3.scrollLeft != null && Fn(t3, e3.scrollLeft, true, true), e3.scrollToPos && function(e4, t4) {
      if (!me(e4, "scrollCursorIntoView")) {
        var r4 = e4.display, n4 = r4.sizer.getBoundingClientRect(), i4 = null;
        if (t4.top + n4.top < 0 ? i4 = true : t4.bottom + n4.top > (window.innerHeight || document.documentElement.clientHeight) && (i4 = false), i4 != null && !p) {
          var o3 = z("div", "\u200B", null, "position: absolute;\n                         top: " + (t4.top - r4.viewOffset - xr(e4.display)) + "px;\n                         height: " + (t4.bottom - t4.top + Lr(e4) + r4.barHeight) + "px;\n                         left: " + t4.left + "px; width: " + Math.max(2, t4.right - t4.left) + "px;");
          e4.display.lineSpace.appendChild(o3), o3.scrollIntoView(i4), e4.display.lineSpace.removeChild(o3);
        }
      }
    }(t3, function(e4, t4, r4, n4) {
      var i4;
      n4 == null && (n4 = 0), e4.options.lineWrapping || t4 != r4 || (r4 = (t4 = t4.ch ? et(t4.line, t4.sticky == "before" ? t4.ch - 1 : t4.ch, "after") : t4).sticky == "before" ? et(t4.line, t4.ch + 1, "before") : t4);
      for (var o3 = 0; o3 < 5; o3++) {
        var a3 = false, l3 = Kr(e4, t4), s2 = r4 && r4 != t4 ? Kr(e4, r4) : l3, c2 = zn(e4, i4 = { left: Math.min(l3.left, s2.left), top: Math.min(l3.top, s2.top) - n4, right: Math.max(l3.left, s2.left), bottom: Math.max(l3.bottom, s2.bottom) + n4 }), u2 = e4.doc.scrollTop, d2 = e4.doc.scrollLeft;
        if (c2.scrollTop != null && (Wn(e4, c2.scrollTop), Math.abs(e4.doc.scrollTop - u2) > 1 && (a3 = true)), c2.scrollLeft != null && (Fn(e4, c2.scrollLeft), Math.abs(e4.doc.scrollLeft - d2) > 1 && (a3 = true)), !a3)
          break;
      }
      return i4;
    }(t3, lt(n3, e3.scrollToPos.from), lt(n3, e3.scrollToPos.to), e3.scrollToPos.margin));
    var i3 = e3.maybeHiddenMarkers, o2 = e3.maybeUnhiddenMarkers;
    if (i3)
      for (var a2 = 0; a2 < i3.length; ++a2)
        i3[a2].lines.length || pe(i3[a2], "hide");
    if (o2)
      for (var l2 = 0; l2 < o2.length; ++l2)
        o2[l2].lines.length && pe(o2[l2], "unhide");
    r3.wrapper.offsetHeight && (n3.scrollTop = t3.display.scroller.scrollTop), e3.changeObjs && pe(t3, "changes", t3, e3.changeObjs), e3.update && e3.update.finish();
  }
  function Jn(e3, t3) {
    if (e3.curOp)
      return t3();
    Kn(e3);
    try {
      return t3();
    } finally {
      Gn(e3);
    }
  }
  function ei(e3, t3) {
    return function() {
      if (e3.curOp)
        return t3.apply(e3, arguments);
      Kn(e3);
      try {
        return t3.apply(e3, arguments);
      } finally {
        Gn(e3);
      }
    };
  }
  function ti(e3) {
    return function() {
      if (this.curOp)
        return e3.apply(this, arguments);
      Kn(this);
      try {
        return e3.apply(this, arguments);
      } finally {
        Gn(this);
      }
    };
  }
  function ri(e3) {
    return function() {
      var t3 = this.cm;
      if (!t3 || t3.curOp)
        return e3.apply(this, arguments);
      Kn(t3);
      try {
        return e3.apply(this, arguments);
      } finally {
        Gn(t3);
      }
    };
  }
  function ni(e3, t3) {
    e3.doc.highlightFrontier < e3.display.viewTo && e3.state.highlight.set(t3, E(ii, e3));
  }
  function ii(e3) {
    var t3 = e3.doc;
    if (!(t3.highlightFrontier >= e3.display.viewTo)) {
      var r3 = +new Date() + e3.options.workTime, n3 = ht(e3, t3.highlightFrontier), i3 = [];
      t3.iter(n3.line, Math.min(t3.first + t3.size, e3.display.viewTo + 500), function(o2) {
        if (n3.line >= e3.display.viewFrom) {
          var a2 = o2.styles, l2 = o2.text.length > e3.options.maxHighlightLength ? Ze(t3.mode, n3.state) : null, s2 = dt(e3, o2, n3, true);
          l2 && (n3.state = l2), o2.styles = s2.styles;
          var c2 = o2.styleClasses, u2 = s2.classes;
          u2 ? o2.styleClasses = u2 : c2 && (o2.styleClasses = null);
          for (var d2 = !a2 || a2.length != o2.styles.length || c2 != u2 && (!c2 || !u2 || c2.bgClass != u2.bgClass || c2.textClass != u2.textClass), f2 = 0; !d2 && f2 < a2.length; ++f2)
            d2 = a2[f2] != o2.styles[f2];
          d2 && i3.push(n3.line), o2.stateAfter = n3.save(), n3.nextLine();
        } else
          o2.text.length <= e3.options.maxHighlightLength && pt(e3, o2.text, n3), o2.stateAfter = n3.line % 5 == 0 ? n3.save() : null, n3.nextLine();
        if (+new Date() > r3)
          return ni(e3, e3.options.workDelay), true;
      }), t3.highlightFrontier = n3.line, t3.modeFrontier = Math.max(t3.modeFrontier, n3.line), i3.length && Jn(e3, function() {
        for (var t4 = 0; t4 < i3.length; t4++)
          fn2(e3, i3[t4], "text");
      });
    }
  }
  var oi = function(e3, t3, r3) {
    var n3 = e3.display;
    this.viewport = t3, this.visible = Mn(n3, e3.doc, t3), this.editorIsHidden = !n3.wrapper.offsetWidth, this.wrapperHeight = n3.wrapper.clientHeight, this.wrapperWidth = n3.wrapper.clientWidth, this.oldDisplayWidth = Tr(e3), this.force = r3, this.dims = on(e3), this.events = [];
  };
  function ai(e3, t3) {
    var r3 = e3.display, n3 = e3.doc;
    if (t3.editorIsHidden)
      return hn(e3), false;
    if (!t3.force && t3.visible.from >= r3.viewFrom && t3.visible.to <= r3.viewTo && (r3.updateLineNumbers == null || r3.updateLineNumbers >= r3.viewTo) && r3.renderedView == r3.view && mn(e3) == 0)
      return false;
    fi(e3) && (hn(e3), t3.dims = on(e3));
    var i3 = n3.first + n3.size, o2 = Math.max(t3.visible.from - e3.options.viewportMargin, n3.first), a2 = Math.min(i3, t3.visible.to + e3.options.viewportMargin);
    r3.viewFrom < o2 && o2 - r3.viewFrom < 20 && (o2 = Math.max(n3.first, r3.viewFrom)), r3.viewTo > a2 && r3.viewTo - a2 < 20 && (a2 = Math.min(i3, r3.viewTo)), xt && (o2 = Ht(e3.doc, o2), a2 = It(e3.doc, a2));
    var l2 = o2 != r3.viewFrom || a2 != r3.viewTo || r3.lastWrapHeight != t3.wrapperHeight || r3.lastWrapWidth != t3.wrapperWidth;
    !function(e4, t4, r4) {
      var n4 = e4.display;
      n4.view.length == 0 || t4 >= n4.viewTo || r4 <= n4.viewFrom ? (n4.view = ir(e4, t4, r4), n4.viewFrom = t4) : (n4.viewFrom > t4 ? n4.view = ir(e4, t4, n4.viewFrom).concat(n4.view) : n4.viewFrom < t4 && (n4.view = n4.view.slice(un(e4, t4))), n4.viewFrom = t4, n4.viewTo < r4 ? n4.view = n4.view.concat(ir(e4, n4.viewTo, r4)) : n4.viewTo > r4 && (n4.view = n4.view.slice(0, un(e4, r4)))), n4.viewTo = r4;
    }(e3, o2, a2), r3.viewOffset = Rt(Ke(e3.doc, r3.viewFrom)), e3.display.mover.style.top = r3.viewOffset + "px";
    var c2 = mn(e3);
    if (!l2 && c2 == 0 && !t3.force && r3.renderedView == r3.view && (r3.updateLineNumbers == null || r3.updateLineNumbers >= r3.viewTo))
      return false;
    var u2 = function(e4) {
      if (e4.hasFocus())
        return null;
      var t4 = N();
      if (!t4 || !_(e4.display.lineDiv, t4))
        return null;
      var r4 = { activeElt: t4 };
      if (window.getSelection) {
        var n4 = window.getSelection();
        n4.anchorNode && n4.extend && _(e4.display.lineDiv, n4.anchorNode) && (r4.anchorNode = n4.anchorNode, r4.anchorOffset = n4.anchorOffset, r4.focusNode = n4.focusNode, r4.focusOffset = n4.focusOffset);
      }
      return r4;
    }(e3);
    return c2 > 4 && (r3.lineDiv.style.display = "none"), function(e4, t4, r4) {
      var n4 = e4.display, i4 = e4.options.lineNumbers, o3 = n4.lineDiv, a3 = o3.firstChild;
      function l3(t5) {
        var r5 = t5.nextSibling;
        return s && y && e4.display.currentWheelTarget == t5 ? t5.style.display = "none" : t5.parentNode.removeChild(t5), r5;
      }
      for (var c3 = n4.view, u3 = n4.viewFrom, d2 = 0; d2 < c3.length; d2++) {
        var f2 = c3[d2];
        if (f2.hidden)
          ;
        else if (f2.node && f2.node.parentNode == o3) {
          for (; a3 != f2.node; )
            a3 = l3(a3);
          var h2 = i4 && t4 != null && t4 <= u3 && f2.lineNumber;
          f2.changes && (I(f2.changes, "gutter") > -1 && (h2 = false), cr(e4, f2, u3, r4)), h2 && (A(f2.lineNumber), f2.lineNumber.appendChild(document.createTextNode(Je(e4.options, u3)))), a3 = f2.node.nextSibling;
        } else {
          var p2 = gr(e4, f2, u3, r4);
          o3.insertBefore(p2, a3);
        }
        u3 += f2.size;
      }
      for (; a3; )
        a3 = l3(a3);
    }(e3, r3.updateLineNumbers, t3.dims), c2 > 4 && (r3.lineDiv.style.display = ""), r3.renderedView = r3.view, function(e4) {
      if (e4 && e4.activeElt && e4.activeElt != N() && (e4.activeElt.focus(), !/^(INPUT|TEXTAREA)$/.test(e4.activeElt.nodeName) && e4.anchorNode && _(document.body, e4.anchorNode) && _(document.body, e4.focusNode))) {
        var t4 = window.getSelection(), r4 = document.createRange();
        r4.setEnd(e4.anchorNode, e4.anchorOffset), r4.collapse(false), t4.removeAllRanges(), t4.addRange(r4), t4.extend(e4.focusNode, e4.focusOffset);
      }
    }(u2), A(r3.cursorDiv), A(r3.selectionDiv), r3.gutters.style.height = r3.sizer.style.minHeight = 0, l2 && (r3.lastWrapHeight = t3.wrapperHeight, r3.lastWrapWidth = t3.wrapperWidth, ni(e3, 400)), r3.updateLineNumbers = null, true;
  }
  function li(e3, t3) {
    for (var r3 = t3.viewport, n3 = true; ; n3 = false) {
      if (n3 && e3.options.lineWrapping && t3.oldDisplayWidth != Tr(e3))
        n3 && (t3.visible = Mn(e3.display, e3.doc, r3));
      else if (r3 && r3.top != null && (r3 = { top: Math.min(e3.doc.height + Cr(e3.display) - Ar(e3), r3.top) }), t3.visible = Mn(e3.display, e3.doc, r3), t3.visible.from >= e3.display.viewFrom && t3.visible.to <= e3.display.viewTo)
        break;
      if (!ai(e3, t3))
        break;
      Tn(e3);
      var i3 = Bn(e3);
      gn(e3), $n(e3, i3), ui(e3, i3), t3.force = false;
    }
    t3.signal(e3, "update", e3), e3.display.viewFrom == e3.display.reportedViewFrom && e3.display.viewTo == e3.display.reportedViewTo || (t3.signal(e3, "viewportChange", e3, e3.display.viewFrom, e3.display.viewTo), e3.display.reportedViewFrom = e3.display.viewFrom, e3.display.reportedViewTo = e3.display.viewTo);
  }
  function si(e3, t3) {
    var r3 = new oi(e3, t3);
    if (ai(e3, r3)) {
      Tn(e3), li(e3, r3);
      var n3 = Bn(e3);
      gn(e3), $n(e3, n3), ui(e3, n3), r3.finish();
    }
  }
  function ci(e3) {
    var t3 = e3.gutters.offsetWidth;
    e3.sizer.style.marginLeft = t3 + "px";
  }
  function ui(e3, t3) {
    e3.display.sizer.style.minHeight = t3.docHeight + "px", e3.display.heightForcer.style.top = t3.docHeight + "px", e3.display.gutters.style.height = t3.docHeight + e3.display.barHeight + Lr(e3) + "px";
  }
  function di(e3) {
    var t3 = e3.display, r3 = t3.view;
    if (t3.alignWidgets || t3.gutters.firstChild && e3.options.fixedGutter) {
      for (var n3 = an(t3) - t3.scroller.scrollLeft + e3.doc.scrollLeft, i3 = t3.gutters.offsetWidth, o2 = n3 + "px", a2 = 0; a2 < r3.length; a2++)
        if (!r3[a2].hidden) {
          e3.options.fixedGutter && (r3[a2].gutter && (r3[a2].gutter.style.left = o2), r3[a2].gutterBackground && (r3[a2].gutterBackground.style.left = o2));
          var l2 = r3[a2].alignable;
          if (l2)
            for (var s2 = 0; s2 < l2.length; s2++)
              l2[s2].style.left = o2;
        }
      e3.options.fixedGutter && (t3.gutters.style.left = n3 + i3 + "px");
    }
  }
  function fi(e3) {
    if (!e3.options.lineNumbers)
      return false;
    var t3 = e3.doc, r3 = Je(e3.options, t3.first + t3.size - 1), n3 = e3.display;
    if (r3.length != n3.lineNumChars) {
      var i3 = n3.measure.appendChild(z("div", [z("div", r3)], "CodeMirror-linenumber CodeMirror-gutter-elt")), o2 = i3.firstChild.offsetWidth, a2 = i3.offsetWidth - o2;
      return n3.lineGutter.style.width = "", n3.lineNumInnerWidth = Math.max(o2, n3.lineGutter.offsetWidth - a2) + 1, n3.lineNumWidth = n3.lineNumInnerWidth + a2, n3.lineNumChars = n3.lineNumInnerWidth ? r3.length : -1, n3.lineGutter.style.width = n3.lineNumWidth + "px", ci(e3.display), true;
    }
    return false;
  }
  function hi(e3, t3) {
    for (var r3 = [], n3 = false, i3 = 0; i3 < e3.length; i3++) {
      var o2 = e3[i3], a2 = null;
      if (typeof o2 != "string" && (a2 = o2.style, o2 = o2.className), o2 == "CodeMirror-linenumbers") {
        if (!t3)
          continue;
        n3 = true;
      }
      r3.push({ className: o2, style: a2 });
    }
    return t3 && !n3 && r3.push({ className: "CodeMirror-linenumbers", style: null }), r3;
  }
  function pi(e3) {
    var t3 = e3.gutters, r3 = e3.gutterSpecs;
    A(t3), e3.lineGutter = null;
    for (var n3 = 0; n3 < r3.length; ++n3) {
      var i3 = r3[n3], o2 = i3.className, a2 = i3.style, l2 = t3.appendChild(z("div", null, "CodeMirror-gutter " + o2));
      a2 && (l2.style.cssText = a2), o2 == "CodeMirror-linenumbers" && (e3.lineGutter = l2, l2.style.width = (e3.lineNumWidth || 1) + "px");
    }
    t3.style.display = r3.length ? "" : "none", ci(e3);
  }
  function mi(e3) {
    pi(e3.display), dn(e3), di(e3);
  }
  function gi(e3, t3, n3, i3) {
    var o2 = this;
    this.input = n3, o2.scrollbarFiller = z("div", null, "CodeMirror-scrollbar-filler"), o2.scrollbarFiller.setAttribute("cm-not-content", "true"), o2.gutterFiller = z("div", null, "CodeMirror-gutter-filler"), o2.gutterFiller.setAttribute("cm-not-content", "true"), o2.lineDiv = O("div", null, "CodeMirror-code"), o2.selectionDiv = z("div", null, null, "position: relative; z-index: 1"), o2.cursorDiv = z("div", null, "CodeMirror-cursors"), o2.measure = z("div", null, "CodeMirror-measure"), o2.lineMeasure = z("div", null, "CodeMirror-measure"), o2.lineSpace = O("div", [o2.measure, o2.lineMeasure, o2.selectionDiv, o2.cursorDiv, o2.lineDiv], null, "position: relative; outline: none");
    var c2 = O("div", [o2.lineSpace], "CodeMirror-lines");
    o2.mover = z("div", [c2], null, "position: relative"), o2.sizer = z("div", [o2.mover], "CodeMirror-sizer"), o2.sizerWidth = null, o2.heightForcer = z("div", null, null, "position: absolute; height: 50px; width: 1px;"), o2.gutters = z("div", null, "CodeMirror-gutters"), o2.lineGutter = null, o2.scroller = z("div", [o2.sizer, o2.heightForcer, o2.gutters], "CodeMirror-scroll"), o2.scroller.setAttribute("tabIndex", "-1"), o2.wrapper = z("div", [o2.scrollbarFiller, o2.gutterFiller, o2.scroller], "CodeMirror"), a && l < 8 && (o2.gutters.style.zIndex = -1, o2.scroller.style.paddingRight = 0), s || r2 && v || (o2.scroller.draggable = true), e3 && (e3.appendChild ? e3.appendChild(o2.wrapper) : e3(o2.wrapper)), o2.viewFrom = o2.viewTo = t3.first, o2.reportedViewFrom = o2.reportedViewTo = t3.first, o2.view = [], o2.renderedView = null, o2.externalMeasured = null, o2.viewOffset = 0, o2.lastWrapHeight = o2.lastWrapWidth = 0, o2.updateLineNumbers = null, o2.nativeBarWidth = o2.barHeight = o2.barWidth = 0, o2.scrollbarsClipped = false, o2.lineNumWidth = o2.lineNumInnerWidth = o2.lineNumChars = null, o2.alignWidgets = false, o2.cachedCharWidth = o2.cachedTextHeight = o2.cachedPaddingH = null, o2.maxLine = null, o2.maxLineLength = 0, o2.maxLineChanged = false, o2.wheelDX = o2.wheelDY = o2.wheelStartX = o2.wheelStartY = null, o2.shift = false, o2.selForContextMenu = null, o2.activeTouch = null, o2.gutterSpecs = hi(i3.gutters, i3.lineNumbers), pi(o2), n3.init(o2);
  }
  oi.prototype.signal = function(e3, t3) {
    ve(e3, t3) && this.events.push(arguments);
  }, oi.prototype.finish = function() {
    for (var e3 = 0; e3 < this.events.length; e3++)
      pe.apply(null, this.events[e3]);
  };
  var vi = 0, yi = null;
  function bi(e3) {
    var t3 = e3.wheelDeltaX, r3 = e3.wheelDeltaY;
    return t3 == null && e3.detail && e3.axis == e3.HORIZONTAL_AXIS && (t3 = e3.detail), r3 == null && e3.detail && e3.axis == e3.VERTICAL_AXIS ? r3 = e3.detail : r3 == null && (r3 = e3.wheelDelta), { x: t3, y: r3 };
  }
  function wi(e3) {
    var t3 = bi(e3);
    return t3.x *= yi, t3.y *= yi, t3;
  }
  function ki(e3, t3) {
    var n3 = bi(t3), i3 = n3.x, o2 = n3.y, a2 = e3.display, l2 = a2.scroller, c2 = l2.scrollWidth > l2.clientWidth, u2 = l2.scrollHeight > l2.clientHeight;
    if (i3 && c2 || o2 && u2) {
      if (o2 && y && s)
        e:
          for (var f2 = t3.target, h2 = a2.view; f2 != l2; f2 = f2.parentNode)
            for (var p2 = 0; p2 < h2.length; p2++)
              if (h2[p2].node == f2) {
                e3.display.currentWheelTarget = f2;
                break e;
              }
      if (i3 && !r2 && !d && yi != null)
        return o2 && u2 && Wn(e3, Math.max(0, l2.scrollTop + o2 * yi)), Fn(e3, Math.max(0, l2.scrollLeft + i3 * yi)), (!o2 || o2 && u2) && be(t3), void (a2.wheelStartX = null);
      if (o2 && yi != null) {
        var m2 = o2 * yi, g2 = e3.doc.scrollTop, v2 = g2 + a2.wrapper.clientHeight;
        m2 < 0 ? g2 = Math.max(0, g2 + m2 - 50) : v2 = Math.min(e3.doc.height, v2 + m2 + 50), si(e3, { top: g2, bottom: v2 });
      }
      vi < 20 && (a2.wheelStartX == null ? (a2.wheelStartX = l2.scrollLeft, a2.wheelStartY = l2.scrollTop, a2.wheelDX = i3, a2.wheelDY = o2, setTimeout(function() {
        if (a2.wheelStartX != null) {
          var e4 = l2.scrollLeft - a2.wheelStartX, t4 = l2.scrollTop - a2.wheelStartY, r3 = t4 && a2.wheelDY && t4 / a2.wheelDY || e4 && a2.wheelDX && e4 / a2.wheelDX;
          a2.wheelStartX = a2.wheelStartY = null, r3 && (yi = (yi * vi + r3) / (vi + 1), ++vi);
        }
      }, 200)) : (a2.wheelDX += i3, a2.wheelDY += o2));
    }
  }
  a ? yi = -0.53 : r2 ? yi = 15 : u ? yi = -0.7 : f && (yi = -1 / 3);
  var xi = function(e3, t3) {
    this.ranges = e3, this.primIndex = t3;
  };
  xi.prototype.primary = function() {
    return this.ranges[this.primIndex];
  }, xi.prototype.equals = function(e3) {
    if (e3 == this)
      return true;
    if (e3.primIndex != this.primIndex || e3.ranges.length != this.ranges.length)
      return false;
    for (var t3 = 0; t3 < this.ranges.length; t3++) {
      var r3 = this.ranges[t3], n3 = e3.ranges[t3];
      if (!rt(r3.anchor, n3.anchor) || !rt(r3.head, n3.head))
        return false;
    }
    return true;
  }, xi.prototype.deepCopy = function() {
    for (var e3 = [], t3 = 0; t3 < this.ranges.length; t3++)
      e3[t3] = new Ci(nt(this.ranges[t3].anchor), nt(this.ranges[t3].head));
    return new xi(e3, this.primIndex);
  }, xi.prototype.somethingSelected = function() {
    for (var e3 = 0; e3 < this.ranges.length; e3++)
      if (!this.ranges[e3].empty())
        return true;
    return false;
  }, xi.prototype.contains = function(e3, t3) {
    t3 || (t3 = e3);
    for (var r3 = 0; r3 < this.ranges.length; r3++) {
      var n3 = this.ranges[r3];
      if (tt(t3, n3.from()) >= 0 && tt(e3, n3.to()) <= 0)
        return r3;
    }
    return -1;
  };
  var Ci = function(e3, t3) {
    this.anchor = e3, this.head = t3;
  };
  function Si(e3, t3, r3) {
    var n3 = e3 && e3.options.selectionsMayTouch, i3 = t3[r3];
    t3.sort(function(e4, t4) {
      return tt(e4.from(), t4.from());
    }), r3 = I(t3, i3);
    for (var o2 = 1; o2 < t3.length; o2++) {
      var a2 = t3[o2], l2 = t3[o2 - 1], s2 = tt(l2.to(), a2.from());
      if (n3 && !a2.empty() ? s2 > 0 : s2 >= 0) {
        var c2 = ot(l2.from(), a2.from()), u2 = it(l2.to(), a2.to()), d2 = l2.empty() ? a2.from() == a2.head : l2.from() == l2.head;
        o2 <= r3 && --r3, t3.splice(--o2, 2, new Ci(d2 ? u2 : c2, d2 ? c2 : u2));
      }
    }
    return new xi(t3, r3);
  }
  function Li(e3, t3) {
    return new xi([new Ci(e3, t3 || e3)], 0);
  }
  function Ti(e3) {
    return e3.text ? et(e3.from.line + e3.text.length - 1, V(e3.text).length + (e3.text.length == 1 ? e3.from.ch : 0)) : e3.to;
  }
  function Ai(e3, t3) {
    if (tt(e3, t3.from) < 0)
      return e3;
    if (tt(e3, t3.to) <= 0)
      return Ti(t3);
    var r3 = e3.line + t3.text.length - (t3.to.line - t3.from.line) - 1, n3 = e3.ch;
    return e3.line == t3.to.line && (n3 += Ti(t3).ch - t3.to.ch), et(r3, n3);
  }
  function Mi(e3, t3) {
    for (var r3 = [], n3 = 0; n3 < e3.sel.ranges.length; n3++) {
      var i3 = e3.sel.ranges[n3];
      r3.push(new Ci(Ai(i3.anchor, t3), Ai(i3.head, t3)));
    }
    return Si(e3.cm, r3, e3.sel.primIndex);
  }
  function zi(e3, t3, r3) {
    return e3.line == t3.line ? et(r3.line, e3.ch - t3.ch + r3.ch) : et(r3.line + (e3.line - t3.line), e3.ch);
  }
  function Oi(e3) {
    e3.doc.mode = He(e3.options, e3.doc.modeOption), _i(e3);
  }
  function _i(e3) {
    e3.doc.iter(function(e4) {
      e4.stateAfter && (e4.stateAfter = null), e4.styles && (e4.styles = null);
    }), e3.doc.modeFrontier = e3.doc.highlightFrontier = e3.doc.first, ni(e3, 100), e3.state.modeGen++, e3.curOp && dn(e3);
  }
  function Ni(e3, t3) {
    return t3.from.ch == 0 && t3.to.ch == 0 && V(t3.text) == "" && (!e3.cm || e3.cm.options.wholeLineUpdateBefore);
  }
  function Pi(e3, t3, r3, n3) {
    function i3(e4) {
      return r3 ? r3[e4] : null;
    }
    function o2(e4, r4, i4) {
      !function(e5, t4, r5, n4) {
        e5.text = t4, e5.stateAfter && (e5.stateAfter = null), e5.styles && (e5.styles = null), e5.order != null && (e5.order = null), Mt(e5), zt(e5, r5);
        var i5 = n4 ? n4(e5) : 1;
        i5 != e5.height && qe(e5, i5);
      }(e4, r4, i4, n3), lr(e4, "change", e4, t3);
    }
    function a2(e4, t4) {
      for (var r4 = [], o3 = e4; o3 < t4; ++o3)
        r4.push(new Kt(c2[o3], i3(o3), n3));
      return r4;
    }
    var l2 = t3.from, s2 = t3.to, c2 = t3.text, u2 = Ke(e3, l2.line), d2 = Ke(e3, s2.line), f2 = V(c2), h2 = i3(c2.length - 1), p2 = s2.line - l2.line;
    if (t3.full)
      e3.insert(0, a2(0, c2.length)), e3.remove(c2.length, e3.size - c2.length);
    else if (Ni(e3, t3)) {
      var m2 = a2(0, c2.length - 1);
      o2(d2, d2.text, h2), p2 && e3.remove(l2.line, p2), m2.length && e3.insert(l2.line, m2);
    } else if (u2 == d2)
      if (c2.length == 1)
        o2(u2, u2.text.slice(0, l2.ch) + f2 + u2.text.slice(s2.ch), h2);
      else {
        var g2 = a2(1, c2.length - 1);
        g2.push(new Kt(f2 + u2.text.slice(s2.ch), h2, n3)), o2(u2, u2.text.slice(0, l2.ch) + c2[0], i3(0)), e3.insert(l2.line + 1, g2);
      }
    else if (c2.length == 1)
      o2(u2, u2.text.slice(0, l2.ch) + c2[0] + d2.text.slice(s2.ch), i3(0)), e3.remove(l2.line + 1, p2);
    else {
      o2(u2, u2.text.slice(0, l2.ch) + c2[0], i3(0)), o2(d2, f2 + d2.text.slice(s2.ch), h2);
      var v2 = a2(1, c2.length - 1);
      p2 > 1 && e3.remove(l2.line + 1, p2 - 1), e3.insert(l2.line + 1, v2);
    }
    lr(e3, "change", e3, t3);
  }
  function Di(e3, t3, r3) {
    !function e4(n3, i3, o2) {
      if (n3.linked)
        for (var a2 = 0; a2 < n3.linked.length; ++a2) {
          var l2 = n3.linked[a2];
          if (l2.doc != i3) {
            var s2 = o2 && l2.sharedHist;
            r3 && !s2 || (t3(l2.doc, s2), e4(l2.doc, n3, s2));
          }
        }
    }(e3, null, true);
  }
  function Wi(e3, t3) {
    if (t3.cm)
      throw Error("This document is already in use.");
    e3.doc = t3, t3.cm = e3, sn(e3), Oi(e3), Ei(e3), e3.options.lineWrapping || jt(e3), e3.options.mode = t3.modeOption, dn(e3);
  }
  function Ei(e3) {
    (e3.doc.direction == "rtl" ? P : T)(e3.display.lineDiv, "CodeMirror-rtl");
  }
  function Fi(e3) {
    this.done = [], this.undone = [], this.undoDepth = e3 ? e3.undoDepth : 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e3 ? e3.maxGeneration : 1;
  }
  function Bi(e3, t3) {
    var r3 = { from: nt(t3.from), to: Ti(t3), text: Ge(e3, t3.from, t3.to) };
    return Zi(e3, r3, t3.from.line, t3.to.line + 1), Di(e3, function(e4) {
      return Zi(e4, r3, t3.from.line, t3.to.line + 1);
    }, true), r3;
  }
  function Hi(e3) {
    for (; e3.length && V(e3).ranges; )
      e3.pop();
  }
  function Ii(e3, t3, r3, n3) {
    var i3 = e3.history;
    i3.undone.length = 0;
    var o2, a2, l2 = +new Date();
    if ((i3.lastOp == n3 || i3.lastOrigin == t3.origin && t3.origin && (t3.origin.charAt(0) == "+" && i3.lastModTime > l2 - (e3.cm ? e3.cm.options.historyEventDelay : 500) || t3.origin.charAt(0) == "*")) && (o2 = function(e4, t4) {
      return t4 ? (Hi(e4.done), V(e4.done)) : e4.done.length && !V(e4.done).ranges ? V(e4.done) : e4.done.length > 1 && !e4.done[e4.done.length - 2].ranges ? (e4.done.pop(), V(e4.done)) : void 0;
    }(i3, i3.lastOp == n3)))
      a2 = V(o2.changes), tt(t3.from, t3.to) == 0 && tt(t3.from, a2.to) == 0 ? a2.to = Ti(t3) : o2.changes.push(Bi(e3, t3));
    else {
      var s2 = V(i3.done);
      for (s2 && s2.ranges || $i(e3.sel, i3.done), o2 = { changes: [Bi(e3, t3)], generation: i3.generation }, i3.done.push(o2); i3.done.length > i3.undoDepth; )
        i3.done.shift(), i3.done[0].ranges || i3.done.shift();
    }
    i3.done.push(r3), i3.generation = ++i3.maxGeneration, i3.lastModTime = i3.lastSelTime = l2, i3.lastOp = i3.lastSelOp = n3, i3.lastOrigin = i3.lastSelOrigin = t3.origin, a2 || pe(e3, "historyAdded");
  }
  function $i(e3, t3) {
    var r3 = V(t3);
    r3 && r3.ranges && r3.equals(e3) || t3.push(e3);
  }
  function Zi(e3, t3, r3, n3) {
    var i3 = t3["spans_" + e3.id], o2 = 0;
    e3.iter(Math.max(e3.first, r3), Math.min(e3.first + e3.size, n3), function(r4) {
      r4.markedSpans && ((i3 || (i3 = t3["spans_" + e3.id] = {}))[o2] = r4.markedSpans), ++o2;
    });
  }
  function Ri(e3) {
    if (!e3)
      return null;
    for (var t3, r3 = 0; r3 < e3.length; ++r3)
      e3[r3].marker.explicitlyCleared ? t3 || (t3 = e3.slice(0, r3)) : t3 && t3.push(e3[r3]);
    return t3 ? t3.length ? t3 : null : e3;
  }
  function Ui(e3, t3) {
    var r3 = function(e4, t4) {
      var r4 = t4["spans_" + e4.id];
      if (!r4)
        return null;
      for (var n4 = [], i4 = 0; i4 < t4.text.length; ++i4)
        n4.push(Ri(r4[i4]));
      return n4;
    }(e3, t3), n3 = Tt(e3, t3);
    if (!r3)
      return n3;
    if (!n3)
      return r3;
    for (var i3 = 0; i3 < r3.length; ++i3) {
      var o2 = r3[i3], a2 = n3[i3];
      if (o2 && a2)
        e:
          for (var l2 = 0; l2 < a2.length; ++l2) {
            for (var s2 = a2[l2], c2 = 0; c2 < o2.length; ++c2)
              if (o2[c2].marker == s2.marker)
                continue e;
            o2.push(s2);
          }
      else
        a2 && (r3[i3] = a2);
    }
    return r3;
  }
  function ji(e3, t3, r3) {
    for (var n3 = [], i3 = 0; i3 < e3.length; ++i3) {
      var o2 = e3[i3];
      if (o2.ranges)
        n3.push(r3 ? xi.prototype.deepCopy.call(o2) : o2);
      else {
        var a2 = o2.changes, l2 = [];
        n3.push({ changes: l2 });
        for (var s2 = 0; s2 < a2.length; ++s2) {
          var c2 = a2[s2], u2 = void 0;
          if (l2.push({ from: c2.from, to: c2.to, text: c2.text }), t3)
            for (var d2 in c2)
              (u2 = d2.match(/^spans_(\d+)$/)) && I(t3, Number(u2[1])) > -1 && (V(l2)[d2] = c2[d2], delete c2[d2]);
        }
      }
    }
    return n3;
  }
  function Ki(e3, t3, r3, n3) {
    if (n3) {
      var i3 = e3.anchor;
      if (r3) {
        var o2 = tt(t3, i3) < 0;
        o2 != tt(r3, i3) < 0 ? (i3 = t3, t3 = r3) : o2 != tt(t3, r3) < 0 && (t3 = r3);
      }
      return new Ci(i3, t3);
    }
    return new Ci(r3 || t3, t3);
  }
  function Gi(e3, t3, r3, n3, i3) {
    i3 == null && (i3 = e3.cm && (e3.cm.display.shift || e3.extend)), Qi(e3, new xi([Ki(e3.sel.primary(), t3, r3, i3)], 0), n3);
  }
  function Vi(e3, t3, r3) {
    for (var n3 = [], i3 = e3.cm && (e3.cm.display.shift || e3.extend), o2 = 0; o2 < e3.sel.ranges.length; o2++)
      n3[o2] = Ki(e3.sel.ranges[o2], t3[o2], null, i3);
    Qi(e3, Si(e3.cm, n3, e3.sel.primIndex), r3);
  }
  function qi(e3, t3, r3, n3) {
    var i3 = e3.sel.ranges.slice(0);
    i3[t3] = r3, Qi(e3, Si(e3.cm, i3, e3.sel.primIndex), n3);
  }
  function Xi(e3, t3, r3, n3) {
    Qi(e3, Li(t3, r3), n3);
  }
  function Yi(e3, t3, r3) {
    var n3 = e3.history.done, i3 = V(n3);
    i3 && i3.ranges ? (n3[n3.length - 1] = t3, Ji(e3, t3, r3)) : Qi(e3, t3, r3);
  }
  function Qi(e3, t3, r3) {
    Ji(e3, t3, r3), function(e4, t4, r4, n3) {
      var i3 = e4.history, o2 = n3 && n3.origin;
      r4 == i3.lastSelOp || o2 && i3.lastSelOrigin == o2 && (i3.lastModTime == i3.lastSelTime && i3.lastOrigin == o2 || function(e5, t5, r5, n4) {
        var i4 = t5.charAt(0);
        return i4 == "*" || i4 == "+" && r5.ranges.length == n4.ranges.length && r5.somethingSelected() == n4.somethingSelected() && new Date() - e5.history.lastSelTime <= (e5.cm ? e5.cm.options.historyEventDelay : 500);
      }(e4, o2, V(i3.done), t4)) ? i3.done[i3.done.length - 1] = t4 : $i(t4, i3.done), i3.lastSelTime = +new Date(), i3.lastSelOrigin = o2, i3.lastSelOp = r4, n3 && n3.clearRedo !== false && Hi(i3.undone);
    }(e3, e3.sel, e3.cm ? e3.cm.curOp.id : NaN, r3);
  }
  function Ji(e3, t3, r3) {
    (ve(e3, "beforeSelectionChange") || e3.cm && ve(e3.cm, "beforeSelectionChange")) && (t3 = function(e4, t4, r4) {
      var n4 = { ranges: t4.ranges, update: function(t5) {
        this.ranges = [];
        for (var r5 = 0; r5 < t5.length; r5++)
          this.ranges[r5] = new Ci(lt(e4, t5[r5].anchor), lt(e4, t5[r5].head));
      }, origin: r4 && r4.origin };
      return pe(e4, "beforeSelectionChange", e4, n4), e4.cm && pe(e4.cm, "beforeSelectionChange", e4.cm, n4), n4.ranges != t4.ranges ? Si(e4.cm, n4.ranges, n4.ranges.length - 1) : t4;
    }(e3, t3, r3));
    var n3 = r3 && r3.bias || (tt(t3.primary().head, e3.sel.primary().head) < 0 ? -1 : 1);
    eo(e3, ro(e3, t3, n3, true)), r3 && r3.scroll === false || !e3.cm || e3.cm.getOption("readOnly") == "nocursor" || _n(e3.cm);
  }
  function eo(e3, t3) {
    t3.equals(e3.sel) || (e3.sel = t3, e3.cm && (e3.cm.curOp.updateInput = 1, e3.cm.curOp.selectionChanged = true, ge(e3.cm)), lr(e3, "cursorActivity", e3));
  }
  function to(e3) {
    eo(e3, ro(e3, e3.sel, null, false));
  }
  function ro(e3, t3, r3, n3) {
    for (var i3, o2 = 0; o2 < t3.ranges.length; o2++) {
      var a2 = t3.ranges[o2], l2 = t3.ranges.length == e3.sel.ranges.length && e3.sel.ranges[o2], s2 = io(e3, a2.anchor, l2 && l2.anchor, r3, n3), c2 = io(e3, a2.head, l2 && l2.head, r3, n3);
      (i3 || s2 != a2.anchor || c2 != a2.head) && (i3 || (i3 = t3.ranges.slice(0, o2)), i3[o2] = new Ci(s2, c2));
    }
    return i3 ? Si(e3.cm, i3, t3.primIndex) : t3;
  }
  function no(e3, t3, r3, n3, i3) {
    var o2 = Ke(e3, t3.line);
    if (o2.markedSpans)
      for (var a2 = 0; a2 < o2.markedSpans.length; ++a2) {
        var l2 = o2.markedSpans[a2], s2 = l2.marker, c2 = "selectLeft" in s2 ? !s2.selectLeft : s2.inclusiveLeft, u2 = "selectRight" in s2 ? !s2.selectRight : s2.inclusiveRight;
        if ((l2.from == null || (c2 ? l2.from <= t3.ch : l2.from < t3.ch)) && (l2.to == null || (u2 ? l2.to >= t3.ch : l2.to > t3.ch))) {
          if (i3 && (pe(s2, "beforeCursorEnter"), s2.explicitlyCleared)) {
            if (o2.markedSpans) {
              --a2;
              continue;
            }
            break;
          }
          if (!s2.atomic)
            continue;
          if (r3) {
            var d2 = s2.find(n3 < 0 ? 1 : -1), f2 = void 0;
            if ((n3 < 0 ? u2 : c2) && (d2 = oo(e3, d2, -n3, d2 && d2.line == t3.line ? o2 : null)), d2 && d2.line == t3.line && (f2 = tt(d2, r3)) && (n3 < 0 ? f2 < 0 : f2 > 0))
              return no(e3, d2, t3, n3, i3);
          }
          var h2 = s2.find(n3 < 0 ? -1 : 1);
          return (n3 < 0 ? c2 : u2) && (h2 = oo(e3, h2, n3, h2.line == t3.line ? o2 : null)), h2 ? no(e3, h2, t3, n3, i3) : null;
        }
      }
    return t3;
  }
  function io(e3, t3, r3, n3, i3) {
    var o2 = n3 || 1;
    return no(e3, t3, r3, o2, i3) || !i3 && no(e3, t3, r3, o2, true) || no(e3, t3, r3, -o2, i3) || !i3 && no(e3, t3, r3, -o2, true) || (e3.cantEdit = true, et(e3.first, 0));
  }
  function oo(e3, t3, r3, n3) {
    return r3 < 0 && t3.ch == 0 ? t3.line > e3.first ? lt(e3, et(t3.line - 1)) : null : r3 > 0 && t3.ch == (n3 || Ke(e3, t3.line)).text.length ? t3.line < e3.first + e3.size - 1 ? et(t3.line + 1, 0) : null : new et(t3.line, t3.ch + r3);
  }
  function ao(e3) {
    e3.setSelection(et(e3.firstLine(), 0), et(e3.lastLine()), Z);
  }
  function lo(e3, t3, r3) {
    var n3 = { canceled: false, from: t3.from, to: t3.to, text: t3.text, origin: t3.origin, cancel: function() {
      return n3.canceled = true;
    } };
    return r3 && (n3.update = function(t4, r4, i3, o2) {
      t4 && (n3.from = lt(e3, t4)), r4 && (n3.to = lt(e3, r4)), i3 && (n3.text = i3), o2 !== void 0 && (n3.origin = o2);
    }), pe(e3, "beforeChange", e3, n3), e3.cm && pe(e3.cm, "beforeChange", e3.cm, n3), n3.canceled ? (e3.cm && (e3.cm.curOp.updateInput = 2), null) : { from: n3.from, to: n3.to, text: n3.text, origin: n3.origin };
  }
  function so(e3, t3, r3) {
    if (e3.cm) {
      if (!e3.cm.curOp)
        return ei(e3.cm, so)(e3, t3, r3);
      if (e3.cm.state.suppressEdits)
        return;
    }
    if (!(ve(e3, "beforeChange") || e3.cm && ve(e3.cm, "beforeChange")) || (t3 = lo(e3, t3, true))) {
      var n3 = kt && !r3 && function(e4, t4, r4) {
        var n4 = null;
        if (e4.iter(t4.line, r4.line + 1, function(e5) {
          if (e5.markedSpans)
            for (var t5 = 0; t5 < e5.markedSpans.length; ++t5) {
              var r5 = e5.markedSpans[t5].marker;
              !r5.readOnly || n4 && I(n4, r5) != -1 || (n4 || (n4 = [])).push(r5);
            }
        }), !n4)
          return null;
        for (var i4 = [{ from: t4, to: r4 }], o2 = 0; o2 < n4.length; ++o2)
          for (var a2 = n4[o2], l2 = a2.find(0), s2 = 0; s2 < i4.length; ++s2) {
            var c2 = i4[s2];
            if (!(tt(c2.to, l2.from) < 0 || tt(c2.from, l2.to) > 0)) {
              var u2 = [s2, 1], d2 = tt(c2.from, l2.from), f2 = tt(c2.to, l2.to);
              (d2 < 0 || !a2.inclusiveLeft && !d2) && u2.push({ from: c2.from, to: l2.from }), (f2 > 0 || !a2.inclusiveRight && !f2) && u2.push({ from: l2.to, to: c2.to }), i4.splice.apply(i4, u2), s2 += u2.length - 3;
            }
          }
        return i4;
      }(e3, t3.from, t3.to);
      if (n3)
        for (var i3 = n3.length - 1; i3 >= 0; --i3)
          co(e3, { from: n3[i3].from, to: n3[i3].to, text: i3 ? [""] : t3.text, origin: t3.origin });
      else
        co(e3, t3);
    }
  }
  function co(e3, t3) {
    if (t3.text.length != 1 || t3.text[0] != "" || tt(t3.from, t3.to) != 0) {
      var r3 = Mi(e3, t3);
      Ii(e3, t3, r3, e3.cm ? e3.cm.curOp.id : NaN), ho(e3, t3, r3, Tt(e3, t3));
      var n3 = [];
      Di(e3, function(e4, r4) {
        r4 || I(n3, e4.history) != -1 || (vo(e4.history, t3), n3.push(e4.history)), ho(e4, t3, null, Tt(e4, t3));
      });
    }
  }
  function uo(e3, t3, r3) {
    var n3 = e3.cm && e3.cm.state.suppressEdits;
    if (!n3 || r3) {
      for (var i3, o2 = e3.history, a2 = e3.sel, l2 = t3 == "undo" ? o2.done : o2.undone, s2 = t3 == "undo" ? o2.undone : o2.done, c2 = 0; c2 < l2.length && (i3 = l2[c2], r3 ? !i3.ranges || i3.equals(e3.sel) : i3.ranges); c2++)
        ;
      if (c2 != l2.length) {
        for (o2.lastOrigin = o2.lastSelOrigin = null; ; ) {
          if (!(i3 = l2.pop()).ranges) {
            if (n3)
              return void l2.push(i3);
            break;
          }
          if ($i(i3, s2), r3 && !i3.equals(e3.sel))
            return void Qi(e3, i3, { clearRedo: false });
          a2 = i3;
        }
        var u2 = [];
        $i(a2, s2), s2.push({ changes: u2, generation: o2.generation }), o2.generation = i3.generation || ++o2.maxGeneration;
        for (var d2 = ve(e3, "beforeChange") || e3.cm && ve(e3.cm, "beforeChange"), f2 = function(r4) {
          var n4 = i3.changes[r4];
          if (n4.origin = t3, d2 && !lo(e3, n4, false))
            return l2.length = 0, {};
          u2.push(Bi(e3, n4));
          var o3 = r4 ? Mi(e3, n4) : V(l2);
          ho(e3, n4, o3, Ui(e3, n4)), !r4 && e3.cm && e3.cm.scrollIntoView({ from: n4.from, to: Ti(n4) });
          var a3 = [];
          Di(e3, function(e4, t4) {
            t4 || I(a3, e4.history) != -1 || (vo(e4.history, n4), a3.push(e4.history)), ho(e4, n4, null, Ui(e4, n4));
          });
        }, h2 = i3.changes.length - 1; h2 >= 0; --h2) {
          var p2 = f2(h2);
          if (p2)
            return p2.v;
        }
      }
    }
  }
  function fo(e3, t3) {
    if (t3 != 0 && (e3.first += t3, e3.sel = new xi(q(e3.sel.ranges, function(e4) {
      return new Ci(et(e4.anchor.line + t3, e4.anchor.ch), et(e4.head.line + t3, e4.head.ch));
    }), e3.sel.primIndex), e3.cm)) {
      dn(e3.cm, e3.first, e3.first - t3, t3);
      for (var r3 = e3.cm.display, n3 = r3.viewFrom; n3 < r3.viewTo; n3++)
        fn2(e3.cm, n3, "gutter");
    }
  }
  function ho(e3, t3, r3, n3) {
    if (e3.cm && !e3.cm.curOp)
      return ei(e3.cm, ho)(e3, t3, r3, n3);
    if (t3.to.line < e3.first)
      fo(e3, t3.text.length - 1 - (t3.to.line - t3.from.line));
    else if (!(t3.from.line > e3.lastLine())) {
      if (t3.from.line < e3.first) {
        var i3 = t3.text.length - 1 - (e3.first - t3.from.line);
        fo(e3, i3), t3 = { from: et(e3.first, 0), to: et(t3.to.line + i3, t3.to.ch), text: [V(t3.text)], origin: t3.origin };
      }
      var o2 = e3.lastLine();
      t3.to.line > o2 && (t3 = { from: t3.from, to: et(o2, Ke(e3, o2).text.length), text: [t3.text[0]], origin: t3.origin }), t3.removed = Ge(e3, t3.from, t3.to), r3 || (r3 = Mi(e3, t3)), e3.cm ? function(e4, t4, r4) {
        var n4 = e4.doc, i4 = e4.display, o3 = t4.from, a2 = t4.to, l2 = false, s2 = o3.line;
        e4.options.lineWrapping || (s2 = Xe(Bt(Ke(n4, o3.line))), n4.iter(s2, a2.line + 1, function(e5) {
          if (e5 == i4.maxLine)
            return l2 = true, true;
        })), n4.sel.contains(t4.from, t4.to) > -1 && ge(e4), Pi(n4, t4, r4, ln(e4)), e4.options.lineWrapping || (n4.iter(s2, o3.line + t4.text.length, function(e5) {
          var t5 = Ut(e5);
          t5 > i4.maxLineLength && (i4.maxLine = e5, i4.maxLineLength = t5, i4.maxLineChanged = true, l2 = false);
        }), l2 && (e4.curOp.updateMaxLine = true)), function(e5, t5) {
          if (e5.modeFrontier = Math.min(e5.modeFrontier, t5), !(e5.highlightFrontier < t5 - 10)) {
            for (var r5 = e5.first, n5 = t5 - 1; n5 > r5; n5--) {
              var i5 = Ke(e5, n5).stateAfter;
              if (i5 && (!(i5 instanceof ct) || n5 + i5.lookAhead < t5)) {
                r5 = n5 + 1;
                break;
              }
            }
            e5.highlightFrontier = Math.min(e5.highlightFrontier, r5);
          }
        }(n4, o3.line), ni(e4, 400);
        var c2 = t4.text.length - (a2.line - o3.line) - 1;
        t4.full ? dn(e4) : o3.line != a2.line || t4.text.length != 1 || Ni(e4.doc, t4) ? dn(e4, o3.line, a2.line + 1, c2) : fn2(e4, o3.line, "text");
        var u2 = ve(e4, "changes"), d2 = ve(e4, "change");
        if (d2 || u2) {
          var f2 = { from: o3, to: a2, text: t4.text, removed: t4.removed, origin: t4.origin };
          d2 && lr(e4, "change", e4, f2), u2 && (e4.curOp.changeObjs || (e4.curOp.changeObjs = [])).push(f2);
        }
        e4.display.selForContextMenu = null;
      }(e3.cm, t3, n3) : Pi(e3, t3, n3), Ji(e3, r3, Z), e3.cantEdit && io(e3, et(e3.firstLine(), 0)) && (e3.cantEdit = false);
    }
  }
  function po(e3, t3, r3, n3, i3) {
    var o2;
    n3 || (n3 = r3), tt(n3, r3) < 0 && (r3 = (o2 = [n3, r3])[0], n3 = o2[1]), typeof t3 == "string" && (t3 = e3.splitLines(t3)), so(e3, { from: r3, to: n3, text: t3, origin: i3 });
  }
  function mo(e3, t3, r3, n3) {
    r3 < e3.line ? e3.line += n3 : t3 < e3.line && (e3.line = t3, e3.ch = 0);
  }
  function go(e3, t3, r3, n3) {
    for (var i3 = 0; i3 < e3.length; ++i3) {
      var o2 = e3[i3], a2 = true;
      if (o2.ranges) {
        o2.copied || ((o2 = e3[i3] = o2.deepCopy()).copied = true);
        for (var l2 = 0; l2 < o2.ranges.length; l2++)
          mo(o2.ranges[l2].anchor, t3, r3, n3), mo(o2.ranges[l2].head, t3, r3, n3);
      } else {
        for (var s2 = 0; s2 < o2.changes.length; ++s2) {
          var c2 = o2.changes[s2];
          if (r3 < c2.from.line)
            c2.from = et(c2.from.line + n3, c2.from.ch), c2.to = et(c2.to.line + n3, c2.to.ch);
          else if (t3 <= c2.to.line) {
            a2 = false;
            break;
          }
        }
        a2 || (e3.splice(0, i3 + 1), i3 = 0);
      }
    }
  }
  function vo(e3, t3) {
    var r3 = t3.from.line, n3 = t3.to.line, i3 = t3.text.length - (n3 - r3) - 1;
    go(e3.done, r3, n3, i3), go(e3.undone, r3, n3, i3);
  }
  function yo(e3, t3, r3, n3) {
    var i3 = t3, o2 = t3;
    return typeof t3 == "number" ? o2 = Ke(e3, at(e3, t3)) : i3 = Xe(t3), i3 == null ? null : (n3(o2, i3) && e3.cm && fn2(e3.cm, i3, r3), o2);
  }
  function bo(e3) {
    this.lines = e3, this.parent = null;
    for (var t3 = 0, r3 = 0; r3 < e3.length; ++r3)
      e3[r3].parent = this, t3 += e3[r3].height;
    this.height = t3;
  }
  function wo(e3) {
    this.children = e3;
    for (var t3 = 0, r3 = 0, n3 = 0; n3 < e3.length; ++n3) {
      var i3 = e3[n3];
      t3 += i3.chunkSize(), r3 += i3.height, i3.parent = this;
    }
    this.size = t3, this.height = r3, this.parent = null;
  }
  Ci.prototype.from = function() {
    return ot(this.anchor, this.head);
  }, Ci.prototype.to = function() {
    return it(this.anchor, this.head);
  }, Ci.prototype.empty = function() {
    return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
  }, bo.prototype = { chunkSize: function() {
    return this.lines.length;
  }, removeInner: function(e3, t3) {
    for (var r3 = e3, n3 = e3 + t3; r3 < n3; ++r3) {
      var i3 = this.lines[r3];
      this.height -= i3.height, Gt(i3), lr(i3, "delete");
    }
    this.lines.splice(e3, t3);
  }, collapse: function(e3) {
    e3.push.apply(e3, this.lines);
  }, insertInner: function(e3, t3, r3) {
    this.height += r3, this.lines = this.lines.slice(0, e3).concat(t3).concat(this.lines.slice(e3));
    for (var n3 = 0; n3 < t3.length; ++n3)
      t3[n3].parent = this;
  }, iterN: function(e3, t3, r3) {
    for (var n3 = e3 + t3; e3 < n3; ++e3)
      if (r3(this.lines[e3]))
        return true;
  } }, wo.prototype = { chunkSize: function() {
    return this.size;
  }, removeInner: function(e3, t3) {
    this.size -= t3;
    for (var r3 = 0; r3 < this.children.length; ++r3) {
      var n3 = this.children[r3], i3 = n3.chunkSize();
      if (e3 < i3) {
        var o2 = Math.min(t3, i3 - e3), a2 = n3.height;
        if (n3.removeInner(e3, o2), this.height -= a2 - n3.height, i3 == o2 && (this.children.splice(r3--, 1), n3.parent = null), (t3 -= o2) == 0)
          break;
        e3 = 0;
      } else
        e3 -= i3;
    }
    if (this.size - t3 < 25 && (this.children.length > 1 || !(this.children[0] instanceof bo))) {
      var l2 = [];
      this.collapse(l2), this.children = [new bo(l2)], this.children[0].parent = this;
    }
  }, collapse: function(e3) {
    for (var t3 = 0; t3 < this.children.length; ++t3)
      this.children[t3].collapse(e3);
  }, insertInner: function(e3, t3, r3) {
    this.size += t3.length, this.height += r3;
    for (var n3 = 0; n3 < this.children.length; ++n3) {
      var i3 = this.children[n3], o2 = i3.chunkSize();
      if (e3 <= o2) {
        if (i3.insertInner(e3, t3, r3), i3.lines && i3.lines.length > 50) {
          for (var a2 = i3.lines.length % 25 + 25, l2 = a2; l2 < i3.lines.length; ) {
            var s2 = new bo(i3.lines.slice(l2, l2 += 25));
            i3.height -= s2.height, this.children.splice(++n3, 0, s2), s2.parent = this;
          }
          i3.lines = i3.lines.slice(0, a2), this.maybeSpill();
        }
        break;
      }
      e3 -= o2;
    }
  }, maybeSpill: function() {
    if (!(this.children.length <= 10)) {
      var e3 = this;
      do {
        var t3 = new wo(e3.children.splice(e3.children.length - 5, 5));
        if (e3.parent) {
          e3.size -= t3.size, e3.height -= t3.height;
          var r3 = I(e3.parent.children, e3);
          e3.parent.children.splice(r3 + 1, 0, t3);
        } else {
          var n3 = new wo(e3.children);
          n3.parent = e3, e3.children = [n3, t3], e3 = n3;
        }
        t3.parent = e3.parent;
      } while (e3.children.length > 10);
      e3.parent.maybeSpill();
    }
  }, iterN: function(e3, t3, r3) {
    for (var n3 = 0; n3 < this.children.length; ++n3) {
      var i3 = this.children[n3], o2 = i3.chunkSize();
      if (e3 < o2) {
        var a2 = Math.min(t3, o2 - e3);
        if (i3.iterN(e3, a2, r3))
          return true;
        if ((t3 -= a2) == 0)
          break;
        e3 = 0;
      } else
        e3 -= o2;
    }
  } };
  var ko = function(e3, t3, r3) {
    if (r3)
      for (var n3 in r3)
        r3.hasOwnProperty(n3) && (this[n3] = r3[n3]);
    this.doc = e3, this.node = t3;
  };
  function xo(e3, t3, r3) {
    Rt(t3) < (e3.curOp && e3.curOp.scrollTop || e3.doc.scrollTop) && On(e3, r3);
  }
  ko.prototype.clear = function() {
    var e3 = this.doc.cm, t3 = this.line.widgets, r3 = this.line, n3 = Xe(r3);
    if (n3 != null && t3) {
      for (var i3 = 0; i3 < t3.length; ++i3)
        t3[i3] == this && t3.splice(i3--, 1);
      t3.length || (r3.widgets = null);
      var o2 = wr(this);
      qe(r3, Math.max(0, r3.height - o2)), e3 && (Jn(e3, function() {
        xo(e3, r3, -o2), fn2(e3, n3, "widget");
      }), lr(e3, "lineWidgetCleared", e3, this, n3));
    }
  }, ko.prototype.changed = function() {
    var e3 = this, t3 = this.height, r3 = this.doc.cm, n3 = this.line;
    this.height = null;
    var i3 = wr(this) - t3;
    i3 && ($t(this.doc, n3) || qe(n3, n3.height + i3), r3 && Jn(r3, function() {
      r3.curOp.forceUpdate = true, xo(r3, n3, i3), lr(r3, "lineWidgetChanged", r3, e3, Xe(n3));
    }));
  }, ye(ko);
  var Co = 0, So = function(e3, t3) {
    this.lines = [], this.type = t3, this.doc = e3, this.id = ++Co;
  };
  function Lo(e3, t3, r3, n3, i3) {
    if (n3 && n3.shared)
      return function(e4, t4, r4, n4, i4) {
        (n4 = F(n4)).shared = false;
        var o3 = [Lo(e4, t4, r4, n4, i4)], a3 = o3[0], l3 = n4.widgetNode;
        return Di(e4, function(e5) {
          l3 && (n4.widgetNode = l3.cloneNode(true)), o3.push(Lo(e5, lt(e5, t4), lt(e5, r4), n4, i4));
          for (var s3 = 0; s3 < e5.linked.length; ++s3)
            if (e5.linked[s3].isParent)
              return;
          a3 = V(o3);
        }), new To(o3, a3);
      }(e3, t3, r3, n3, i3);
    if (e3.cm && !e3.cm.curOp)
      return ei(e3.cm, Lo)(e3, t3, r3, n3, i3);
    var o2 = new So(e3, i3), a2 = tt(t3, r3);
    if (n3 && F(n3, o2, false), a2 > 0 || a2 == 0 && o2.clearWhenEmpty !== false)
      return o2;
    if (o2.replacedWith && (o2.collapsed = true, o2.widgetNode = O("span", [o2.replacedWith], "CodeMirror-widget"), n3.handleMouseEvents || o2.widgetNode.setAttribute("cm-ignore-events", "true"), n3.insertLeft && (o2.widgetNode.insertLeft = true)), o2.collapsed) {
      if (Ft(e3, t3.line, t3, r3, o2) || t3.line != r3.line && Ft(e3, r3.line, t3, r3, o2))
        throw Error("Inserting collapsed marker partially overlapping an existing one");
      xt = true;
    }
    o2.addToHistory && Ii(e3, { from: t3, to: r3, origin: "markText" }, e3.sel, NaN);
    var l2, s2 = t3.line, c2 = e3.cm;
    if (e3.iter(s2, r3.line + 1, function(e4) {
      c2 && o2.collapsed && !c2.options.lineWrapping && Bt(e4) == c2.display.maxLine && (l2 = true), o2.collapsed && s2 != t3.line && qe(e4, 0), function(e5, t4) {
        e5.markedSpans = e5.markedSpans ? e5.markedSpans.concat([t4]) : [t4], t4.marker.attachLine(e5);
      }(e4, new Ct(o2, s2 == t3.line ? t3.ch : null, s2 == r3.line ? r3.ch : null)), ++s2;
    }), o2.collapsed && e3.iter(t3.line, r3.line + 1, function(t4) {
      $t(e3, t4) && qe(t4, 0);
    }), o2.clearOnEnter && de(o2, "beforeCursorEnter", function() {
      return o2.clear();
    }), o2.readOnly && (kt = true, (e3.history.done.length || e3.history.undone.length) && e3.clearHistory()), o2.collapsed && (o2.id = ++Co, o2.atomic = true), c2) {
      if (l2 && (c2.curOp.updateMaxLine = true), o2.collapsed)
        dn(c2, t3.line, r3.line + 1);
      else if (o2.className || o2.startStyle || o2.endStyle || o2.css || o2.attributes || o2.title)
        for (var u2 = t3.line; u2 <= r3.line; u2++)
          fn2(c2, u2, "text");
      o2.atomic && to(c2.doc), lr(c2, "markerAdded", c2, o2);
    }
    return o2;
  }
  So.prototype.clear = function() {
    if (!this.explicitlyCleared) {
      var e3 = this.doc.cm, t3 = e3 && !e3.curOp;
      if (t3 && Kn(e3), ve(this, "clear")) {
        var r3 = this.find();
        r3 && lr(this, "clear", r3.from, r3.to);
      }
      for (var n3 = null, i3 = null, o2 = 0; o2 < this.lines.length; ++o2) {
        var a2 = this.lines[o2], l2 = St(a2.markedSpans, this);
        e3 && !this.collapsed ? fn2(e3, Xe(a2), "text") : e3 && (l2.to != null && (i3 = Xe(a2)), l2.from != null && (n3 = Xe(a2))), a2.markedSpans = Lt(a2.markedSpans, l2), l2.from == null && this.collapsed && !$t(this.doc, a2) && e3 && qe(a2, rn(e3.display));
      }
      if (e3 && this.collapsed && !e3.options.lineWrapping)
        for (var s2 = 0; s2 < this.lines.length; ++s2) {
          var c2 = Bt(this.lines[s2]), u2 = Ut(c2);
          u2 > e3.display.maxLineLength && (e3.display.maxLine = c2, e3.display.maxLineLength = u2, e3.display.maxLineChanged = true);
        }
      n3 != null && e3 && this.collapsed && dn(e3, n3, i3 + 1), this.lines.length = 0, this.explicitlyCleared = true, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = false, e3 && to(e3.doc)), e3 && lr(e3, "markerCleared", e3, this, n3, i3), t3 && Gn(e3), this.parent && this.parent.clear();
    }
  }, So.prototype.find = function(e3, t3) {
    var r3, n3;
    e3 == null && this.type == "bookmark" && (e3 = 1);
    for (var i3 = 0; i3 < this.lines.length; ++i3) {
      var o2 = this.lines[i3], a2 = St(o2.markedSpans, this);
      if (a2.from != null && (r3 = et(t3 ? o2 : Xe(o2), a2.from), e3 == -1))
        return r3;
      if (a2.to != null && (n3 = et(t3 ? o2 : Xe(o2), a2.to), e3 == 1))
        return n3;
    }
    return r3 && { from: r3, to: n3 };
  }, So.prototype.changed = function() {
    var e3 = this, t3 = this.find(-1, true), r3 = this, n3 = this.doc.cm;
    t3 && n3 && Jn(n3, function() {
      var i3 = t3.line, o2 = Xe(t3.line), a2 = Or(n3, o2);
      if (a2 && (Fr(a2), n3.curOp.selectionChanged = n3.curOp.forceUpdate = true), n3.curOp.updateMaxLine = true, !$t(r3.doc, i3) && r3.height != null) {
        var l2 = r3.height;
        r3.height = null;
        var s2 = wr(r3) - l2;
        s2 && qe(i3, i3.height + s2);
      }
      lr(n3, "markerChanged", n3, e3);
    });
  }, So.prototype.attachLine = function(e3) {
    if (!this.lines.length && this.doc.cm) {
      var t3 = this.doc.cm.curOp;
      t3.maybeHiddenMarkers && I(t3.maybeHiddenMarkers, this) != -1 || (t3.maybeUnhiddenMarkers || (t3.maybeUnhiddenMarkers = [])).push(this);
    }
    this.lines.push(e3);
  }, So.prototype.detachLine = function(e3) {
    if (this.lines.splice(I(this.lines, e3), 1), !this.lines.length && this.doc.cm) {
      var t3 = this.doc.cm.curOp;
      (t3.maybeHiddenMarkers || (t3.maybeHiddenMarkers = [])).push(this);
    }
  }, ye(So);
  var To = function(e3, t3) {
    this.markers = e3, this.primary = t3;
    for (var r3 = 0; r3 < e3.length; ++r3)
      e3[r3].parent = this;
  };
  function Ao(e3) {
    return e3.findMarks(et(e3.first, 0), e3.clipPos(et(e3.lastLine())), function(e4) {
      return e4.parent;
    });
  }
  function Mo(e3) {
    for (var t3 = function(t4) {
      var r4 = e3[t4], n3 = [r4.primary.doc];
      Di(r4.primary.doc, function(e4) {
        return n3.push(e4);
      });
      for (var i3 = 0; i3 < r4.markers.length; i3++) {
        var o2 = r4.markers[i3];
        I(n3, o2.doc) == -1 && (o2.parent = null, r4.markers.splice(i3--, 1));
      }
    }, r3 = 0; r3 < e3.length; r3++)
      t3(r3);
  }
  To.prototype.clear = function() {
    if (!this.explicitlyCleared) {
      this.explicitlyCleared = true;
      for (var e3 = 0; e3 < this.markers.length; ++e3)
        this.markers[e3].clear();
      lr(this, "clear");
    }
  }, To.prototype.find = function(e3, t3) {
    return this.primary.find(e3, t3);
  }, ye(To);
  var zo = 0, Oo = function(e3, t3, r3, n3, i3) {
    if (!(this instanceof Oo))
      return new Oo(e3, t3, r3, n3, i3);
    r3 == null && (r3 = 0), wo.call(this, [new bo([new Kt("", null)])]), this.first = r3, this.scrollTop = this.scrollLeft = 0, this.cantEdit = false, this.cleanGeneration = 1, this.modeFrontier = this.highlightFrontier = r3;
    var o2 = et(r3, 0);
    this.sel = Li(o2), this.history = new Fi(null), this.id = ++zo, this.modeOption = t3, this.lineSep = n3, this.direction = i3 == "rtl" ? "rtl" : "ltr", this.extend = false, typeof e3 == "string" && (e3 = this.splitLines(e3)), Pi(this, { from: o2, to: o2, text: e3 }), Qi(this, Li(o2), Z);
  };
  Oo.prototype = Y(wo.prototype, { constructor: Oo, iter: function(e3, t3, r3) {
    r3 ? this.iterN(e3 - this.first, t3 - e3, r3) : this.iterN(this.first, this.first + this.size, e3);
  }, insert: function(e3, t3) {
    for (var r3 = 0, n3 = 0; n3 < t3.length; ++n3)
      r3 += t3[n3].height;
    this.insertInner(e3 - this.first, t3, r3);
  }, remove: function(e3, t3) {
    this.removeInner(e3 - this.first, t3);
  }, getValue: function(e3) {
    var t3 = Ve(this, this.first, this.first + this.size);
    return e3 === false ? t3 : t3.join(e3 || this.lineSeparator());
  }, setValue: ri(function(e3) {
    var t3 = et(this.first, 0), r3 = this.first + this.size - 1;
    so(this, { from: t3, to: et(r3, Ke(this, r3).text.length), text: this.splitLines(e3), origin: "setValue", full: true }, true), this.cm && Nn(this.cm, 0, 0), Qi(this, Li(t3), Z);
  }), replaceRange: function(e3, t3, r3, n3) {
    po(this, e3, t3 = lt(this, t3), r3 = r3 ? lt(this, r3) : t3, n3);
  }, getRange: function(e3, t3, r3) {
    var n3 = Ge(this, lt(this, e3), lt(this, t3));
    return r3 === false ? n3 : n3.join(r3 || this.lineSeparator());
  }, getLine: function(e3) {
    var t3 = this.getLineHandle(e3);
    return t3 && t3.text;
  }, getLineHandle: function(e3) {
    if (Qe(this, e3))
      return Ke(this, e3);
  }, getLineNumber: function(e3) {
    return Xe(e3);
  }, getLineHandleVisualStart: function(e3) {
    return typeof e3 == "number" && (e3 = Ke(this, e3)), Bt(e3);
  }, lineCount: function() {
    return this.size;
  }, firstLine: function() {
    return this.first;
  }, lastLine: function() {
    return this.first + this.size - 1;
  }, clipPos: function(e3) {
    return lt(this, e3);
  }, getCursor: function(e3) {
    var t3 = this.sel.primary();
    return e3 == null || e3 == "head" ? t3.head : e3 == "anchor" ? t3.anchor : e3 == "end" || e3 == "to" || e3 === false ? t3.to() : t3.from();
  }, listSelections: function() {
    return this.sel.ranges;
  }, somethingSelected: function() {
    return this.sel.somethingSelected();
  }, setCursor: ri(function(e3, t3, r3) {
    Xi(this, lt(this, typeof e3 == "number" ? et(e3, t3 || 0) : e3), null, r3);
  }), setSelection: ri(function(e3, t3, r3) {
    Xi(this, lt(this, e3), lt(this, t3 || e3), r3);
  }), extendSelection: ri(function(e3, t3, r3) {
    Gi(this, lt(this, e3), t3 && lt(this, t3), r3);
  }), extendSelections: ri(function(e3, t3) {
    Vi(this, st(this, e3), t3);
  }), extendSelectionsBy: ri(function(e3, t3) {
    Vi(this, st(this, q(this.sel.ranges, e3)), t3);
  }), setSelections: ri(function(e3, t3, r3) {
    if (e3.length) {
      for (var n3 = [], i3 = 0; i3 < e3.length; i3++)
        n3[i3] = new Ci(lt(this, e3[i3].anchor), lt(this, e3[i3].head || e3[i3].anchor));
      t3 == null && (t3 = Math.min(e3.length - 1, this.sel.primIndex)), Qi(this, Si(this.cm, n3, t3), r3);
    }
  }), addSelection: ri(function(e3, t3, r3) {
    var n3 = this.sel.ranges.slice(0);
    n3.push(new Ci(lt(this, e3), lt(this, t3 || e3))), Qi(this, Si(this.cm, n3, n3.length - 1), r3);
  }), getSelection: function(e3) {
    for (var t3, r3 = this.sel.ranges, n3 = 0; n3 < r3.length; n3++) {
      var i3 = Ge(this, r3[n3].from(), r3[n3].to());
      t3 = t3 ? t3.concat(i3) : i3;
    }
    return e3 === false ? t3 : t3.join(e3 || this.lineSeparator());
  }, getSelections: function(e3) {
    for (var t3 = [], r3 = this.sel.ranges, n3 = 0; n3 < r3.length; n3++) {
      var i3 = Ge(this, r3[n3].from(), r3[n3].to());
      e3 !== false && (i3 = i3.join(e3 || this.lineSeparator())), t3[n3] = i3;
    }
    return t3;
  }, replaceSelection: function(e3, t3, r3) {
    for (var n3 = [], i3 = 0; i3 < this.sel.ranges.length; i3++)
      n3[i3] = e3;
    this.replaceSelections(n3, t3, r3 || "+input");
  }, replaceSelections: ri(function(e3, t3, r3) {
    for (var n3 = [], i3 = this.sel, o2 = 0; o2 < i3.ranges.length; o2++) {
      var a2 = i3.ranges[o2];
      n3[o2] = { from: a2.from(), to: a2.to(), text: this.splitLines(e3[o2]), origin: r3 };
    }
    for (var l2 = t3 && t3 != "end" && function(e4, t4, r4) {
      for (var n4 = [], i4 = et(e4.first, 0), o3 = i4, a3 = 0; a3 < t4.length; a3++) {
        var l3 = t4[a3], s3 = zi(l3.from, i4, o3), c2 = zi(Ti(l3), i4, o3);
        if (i4 = l3.to, o3 = c2, r4 == "around") {
          var u2 = e4.sel.ranges[a3], d2 = tt(u2.head, u2.anchor) < 0;
          n4[a3] = new Ci(d2 ? c2 : s3, d2 ? s3 : c2);
        } else
          n4[a3] = new Ci(s3, s3);
      }
      return new xi(n4, e4.sel.primIndex);
    }(this, n3, t3), s2 = n3.length - 1; s2 >= 0; s2--)
      so(this, n3[s2]);
    l2 ? Yi(this, l2) : this.cm && _n(this.cm);
  }), undo: ri(function() {
    uo(this, "undo");
  }), redo: ri(function() {
    uo(this, "redo");
  }), undoSelection: ri(function() {
    uo(this, "undo", true);
  }), redoSelection: ri(function() {
    uo(this, "redo", true);
  }), setExtending: function(e3) {
    this.extend = e3;
  }, getExtending: function() {
    return this.extend;
  }, historySize: function() {
    for (var e3 = this.history, t3 = 0, r3 = 0, n3 = 0; n3 < e3.done.length; n3++)
      e3.done[n3].ranges || ++t3;
    for (var i3 = 0; i3 < e3.undone.length; i3++)
      e3.undone[i3].ranges || ++r3;
    return { undo: t3, redo: r3 };
  }, clearHistory: function() {
    var e3 = this;
    this.history = new Fi(this.history), Di(this, function(t3) {
      return t3.history = e3.history;
    }, true);
  }, markClean: function() {
    this.cleanGeneration = this.changeGeneration(true);
  }, changeGeneration: function(e3) {
    return e3 && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation;
  }, isClean: function(e3) {
    return this.history.generation == (e3 || this.cleanGeneration);
  }, getHistory: function() {
    return { done: ji(this.history.done), undone: ji(this.history.undone) };
  }, setHistory: function(e3) {
    var t3 = this.history = new Fi(this.history);
    t3.done = ji(e3.done.slice(0), null, true), t3.undone = ji(e3.undone.slice(0), null, true);
  }, setGutterMarker: ri(function(e3, t3, r3) {
    return yo(this, e3, "gutter", function(e4) {
      var n3 = e4.gutterMarkers || (e4.gutterMarkers = {});
      return n3[t3] = r3, !r3 && te(n3) && (e4.gutterMarkers = null), true;
    });
  }), clearGutter: ri(function(e3) {
    var t3 = this;
    this.iter(function(r3) {
      r3.gutterMarkers && r3.gutterMarkers[e3] && yo(t3, r3, "gutter", function() {
        return r3.gutterMarkers[e3] = null, te(r3.gutterMarkers) && (r3.gutterMarkers = null), true;
      });
    });
  }), lineInfo: function(e3) {
    var t3;
    if (typeof e3 == "number") {
      if (!Qe(this, e3))
        return null;
      if (t3 = e3, !(e3 = Ke(this, e3)))
        return null;
    } else if ((t3 = Xe(e3)) == null)
      return null;
    return { line: t3, handle: e3, text: e3.text, gutterMarkers: e3.gutterMarkers, textClass: e3.textClass, bgClass: e3.bgClass, wrapClass: e3.wrapClass, widgets: e3.widgets };
  }, addLineClass: ri(function(e3, t3, r3) {
    return yo(this, e3, t3 == "gutter" ? "gutter" : "class", function(e4) {
      var n3 = t3 == "text" ? "textClass" : t3 == "background" ? "bgClass" : t3 == "gutter" ? "gutterClass" : "wrapClass";
      if (e4[n3]) {
        if (S(r3).test(e4[n3]))
          return false;
        e4[n3] += " " + r3;
      } else
        e4[n3] = r3;
      return true;
    });
  }), removeLineClass: ri(function(e3, t3, r3) {
    return yo(this, e3, t3 == "gutter" ? "gutter" : "class", function(e4) {
      var n3 = t3 == "text" ? "textClass" : t3 == "background" ? "bgClass" : t3 == "gutter" ? "gutterClass" : "wrapClass", i3 = e4[n3];
      if (!i3)
        return false;
      if (r3 == null)
        e4[n3] = null;
      else {
        var o2 = i3.match(S(r3));
        if (!o2)
          return false;
        var a2 = o2.index + o2[0].length;
        e4[n3] = i3.slice(0, o2.index) + (o2.index && a2 != i3.length ? " " : "") + i3.slice(a2) || null;
      }
      return true;
    });
  }), addLineWidget: ri(function(e3, t3, r3) {
    return function(e4, t4, r4, n3) {
      var i3 = new ko(e4, r4, n3), o2 = e4.cm;
      return o2 && i3.noHScroll && (o2.display.alignWidgets = true), yo(e4, t4, "widget", function(t5) {
        var r5 = t5.widgets || (t5.widgets = []);
        if (i3.insertAt == null ? r5.push(i3) : r5.splice(Math.min(r5.length, Math.max(0, i3.insertAt)), 0, i3), i3.line = t5, o2 && !$t(e4, t5)) {
          var n4 = Rt(t5) < e4.scrollTop;
          qe(t5, t5.height + wr(i3)), n4 && On(o2, i3.height), o2.curOp.forceUpdate = true;
        }
        return true;
      }), o2 && lr(o2, "lineWidgetAdded", o2, i3, typeof t4 == "number" ? t4 : Xe(t4)), i3;
    }(this, e3, t3, r3);
  }), removeLineWidget: function(e3) {
    e3.clear();
  }, markText: function(e3, t3, r3) {
    return Lo(this, lt(this, e3), lt(this, t3), r3, r3 && r3.type || "range");
  }, setBookmark: function(e3, t3) {
    var r3 = { replacedWith: t3 && (t3.nodeType == null ? t3.widget : t3), insertLeft: t3 && t3.insertLeft, clearWhenEmpty: false, shared: t3 && t3.shared, handleMouseEvents: t3 && t3.handleMouseEvents };
    return Lo(this, e3 = lt(this, e3), e3, r3, "bookmark");
  }, findMarksAt: function(e3) {
    var t3 = [], r3 = Ke(this, (e3 = lt(this, e3)).line).markedSpans;
    if (r3)
      for (var n3 = 0; n3 < r3.length; ++n3) {
        var i3 = r3[n3];
        (i3.from == null || i3.from <= e3.ch) && (i3.to == null || i3.to >= e3.ch) && t3.push(i3.marker.parent || i3.marker);
      }
    return t3;
  }, findMarks: function(e3, t3, r3) {
    e3 = lt(this, e3), t3 = lt(this, t3);
    var n3 = [], i3 = e3.line;
    return this.iter(e3.line, t3.line + 1, function(o2) {
      var a2 = o2.markedSpans;
      if (a2)
        for (var l2 = 0; l2 < a2.length; l2++) {
          var s2 = a2[l2];
          s2.to != null && i3 == e3.line && e3.ch >= s2.to || s2.from == null && i3 != e3.line || s2.from != null && i3 == t3.line && s2.from >= t3.ch || r3 && !r3(s2.marker) || n3.push(s2.marker.parent || s2.marker);
        }
      ++i3;
    }), n3;
  }, getAllMarks: function() {
    var e3 = [];
    return this.iter(function(t3) {
      var r3 = t3.markedSpans;
      if (r3)
        for (var n3 = 0; n3 < r3.length; ++n3)
          r3[n3].from != null && e3.push(r3[n3].marker);
    }), e3;
  }, posFromIndex: function(e3) {
    var t3, r3 = this.first, n3 = this.lineSeparator().length;
    return this.iter(function(i3) {
      var o2 = i3.text.length + n3;
      if (o2 > e3)
        return t3 = e3, true;
      e3 -= o2, ++r3;
    }), lt(this, et(r3, t3));
  }, indexFromPos: function(e3) {
    var t3 = (e3 = lt(this, e3)).ch;
    if (e3.line < this.first || e3.ch < 0)
      return 0;
    var r3 = this.lineSeparator().length;
    return this.iter(this.first, e3.line, function(e4) {
      t3 += e4.text.length + r3;
    }), t3;
  }, copy: function(e3) {
    var t3 = new Oo(Ve(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);
    return t3.scrollTop = this.scrollTop, t3.scrollLeft = this.scrollLeft, t3.sel = this.sel, t3.extend = false, e3 && (t3.history.undoDepth = this.history.undoDepth, t3.setHistory(this.getHistory())), t3;
  }, linkedDoc: function(e3) {
    e3 || (e3 = {});
    var t3 = this.first, r3 = this.first + this.size;
    e3.from != null && e3.from > t3 && (t3 = e3.from), e3.to != null && e3.to < r3 && (r3 = e3.to);
    var n3 = new Oo(Ve(this, t3, r3), e3.mode || this.modeOption, t3, this.lineSep, this.direction);
    return e3.sharedHist && (n3.history = this.history), (this.linked || (this.linked = [])).push({ doc: n3, sharedHist: e3.sharedHist }), n3.linked = [{ doc: this, isParent: true, sharedHist: e3.sharedHist }], function(e4, t4) {
      for (var r4 = 0; r4 < t4.length; r4++) {
        var n4 = t4[r4], i3 = n4.find(), o2 = e4.clipPos(i3.from), a2 = e4.clipPos(i3.to);
        if (tt(o2, a2)) {
          var l2 = Lo(e4, o2, a2, n4.primary, n4.primary.type);
          n4.markers.push(l2), l2.parent = n4;
        }
      }
    }(n3, Ao(this)), n3;
  }, unlinkDoc: function(e3) {
    if (e3 instanceof La && (e3 = e3.doc), this.linked) {
      for (var t3 = 0; t3 < this.linked.length; ++t3)
        if (this.linked[t3].doc == e3) {
          this.linked.splice(t3, 1), e3.unlinkDoc(this), Mo(Ao(this));
          break;
        }
    }
    if (e3.history == this.history) {
      var r3 = [e3.id];
      Di(e3, function(e4) {
        return r3.push(e4.id);
      }, true), e3.history = new Fi(null), e3.history.done = ji(this.history.done, r3), e3.history.undone = ji(this.history.undone, r3);
    }
  }, iterLinkedDocs: function(e3) {
    Di(this, e3);
  }, getMode: function() {
    return this.mode;
  }, getEditor: function() {
    return this.cm;
  }, splitLines: function(e3) {
    return this.lineSep ? e3.split(this.lineSep) : _e(e3);
  }, lineSeparator: function() {
    return this.lineSep || "\n";
  }, setDirection: ri(function(e3) {
    var t3;
    e3 != "rtl" && (e3 = "ltr"), e3 != this.direction && (this.direction = e3, this.iter(function(e4) {
      return e4.order = null;
    }), this.cm && Jn(t3 = this.cm, function() {
      Ei(t3), dn(t3);
    }));
  }) }), Oo.prototype.eachLine = Oo.prototype.iter;
  var _o = 0;
  function No(e3) {
    var t3 = this;
    if (Po(t3), !me(t3, e3) && !kr(t3.display, e3)) {
      be(e3), a && (_o = +new Date());
      var r3 = cn(t3, e3, true), n3 = e3.dataTransfer.files;
      if (r3 && !t3.isReadOnly())
        if (n3 && n3.length && window.FileReader && window.File)
          for (var i3 = n3.length, o2 = Array(i3), l2 = 0, s2 = function() {
            ++l2 == i3 && ei(t3, function() {
              var e4 = { from: r3 = lt(t3.doc, r3), to: r3, text: t3.doc.splitLines(o2.filter(function(e5) {
                return e5 != null;
              }).join(t3.doc.lineSeparator())), origin: "paste" };
              so(t3.doc, e4), Yi(t3.doc, Li(lt(t3.doc, r3), lt(t3.doc, Ti(e4))));
            })();
          }, c2 = function(e4, r4) {
            if (t3.options.allowDropFileTypes && I(t3.options.allowDropFileTypes, e4.type) == -1)
              s2();
            else {
              var n4 = new FileReader();
              n4.onerror = function() {
                return s2();
              }, n4.onload = function() {
                var e5 = n4.result;
                /[\x00-\x08\x0e-\x1f]{2}/.test(e5) || (o2[r4] = e5), s2();
              }, n4.readAsText(e4);
            }
          }, u2 = 0; u2 < n3.length; u2++)
            c2(n3[u2], u2);
        else {
          if (t3.state.draggingText && t3.doc.sel.contains(r3) > -1)
            return t3.state.draggingText(e3), void setTimeout(function() {
              return t3.display.input.focus();
            }, 20);
          try {
            var d2 = e3.dataTransfer.getData("Text");
            if (d2) {
              var f2;
              if (t3.state.draggingText && !t3.state.draggingText.copy && (f2 = t3.listSelections()), Ji(t3.doc, Li(r3, r3)), f2)
                for (var h2 = 0; h2 < f2.length; ++h2)
                  po(t3.doc, "", f2[h2].anchor, f2[h2].head, "drag");
              t3.replaceSelection(d2, "around", "paste"), t3.display.input.focus();
            }
          } catch (e4) {
          }
        }
    }
  }
  function Po(e3) {
    e3.display.dragCursor && (e3.display.lineSpace.removeChild(e3.display.dragCursor), e3.display.dragCursor = null);
  }
  function Do(e3) {
    if (document.getElementsByClassName) {
      for (var t3 = document.getElementsByClassName("CodeMirror"), r3 = [], n3 = 0; n3 < t3.length; n3++) {
        var i3 = t3[n3].CodeMirror;
        i3 && r3.push(i3);
      }
      r3.length && r3[0].operation(function() {
        for (var t4 = 0; t4 < r3.length; t4++)
          e3(r3[t4]);
      });
    }
  }
  var Wo = false;
  function Eo(e3) {
    var t3 = e3.display;
    t3.cachedCharWidth = t3.cachedTextHeight = t3.cachedPaddingH = null, t3.scrollbarsClipped = false, e3.setSize();
  }
  for (var Fo = { 3: "Pause", 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "PrintScrn", 45: "Insert", 46: "Delete", 59: ";", 61: "=", 91: "Mod", 92: "Mod", 93: "Mod", 106: "*", 107: "=", 109: "-", 110: ".", 111: "/", 145: "ScrollLock", 173: "-", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'", 224: "Mod", 63232: "Up", 63233: "Down", 63234: "Left", 63235: "Right", 63272: "Delete", 63273: "Home", 63275: "End", 63276: "PageUp", 63277: "PageDown", 63302: "Insert" }, Bo = 0; Bo < 10; Bo++)
    Fo[Bo + 48] = Fo[Bo + 96] = Bo + "";
  for (var Ho = 65; Ho <= 90; Ho++)
    Fo[Ho] = String.fromCharCode(Ho);
  for (var Io = 1; Io <= 12; Io++)
    Fo[Io + 111] = Fo[Io + 63235] = "F" + Io;
  var $o = {};
  function Zo(e3) {
    var t3, r3, n3, i3, o2 = e3.split(/-(?!$)/);
    e3 = o2[o2.length - 1];
    for (var a2 = 0; a2 < o2.length - 1; a2++) {
      var l2 = o2[a2];
      if (/^(cmd|meta|m)$/i.test(l2))
        i3 = true;
      else if (/^a(lt)?$/i.test(l2))
        t3 = true;
      else if (/^(c|ctrl|control)$/i.test(l2))
        r3 = true;
      else {
        if (!/^s(hift)?$/i.test(l2))
          throw Error("Unrecognized modifier name: " + l2);
        n3 = true;
      }
    }
    return t3 && (e3 = "Alt-" + e3), r3 && (e3 = "Ctrl-" + e3), i3 && (e3 = "Cmd-" + e3), n3 && (e3 = "Shift-" + e3), e3;
  }
  function Ro(e3) {
    var t3 = {};
    for (var r3 in e3)
      if (e3.hasOwnProperty(r3)) {
        var n3 = e3[r3];
        if (/^(name|fallthrough|(de|at)tach)$/.test(r3))
          continue;
        if (n3 == "...") {
          delete e3[r3];
          continue;
        }
        for (var i3 = q(r3.split(" "), Zo), o2 = 0; o2 < i3.length; o2++) {
          var a2 = void 0, l2 = void 0;
          o2 == i3.length - 1 ? (l2 = i3.join(" "), a2 = n3) : (l2 = i3.slice(0, o2 + 1).join(" "), a2 = "...");
          var s2 = t3[l2];
          if (s2) {
            if (s2 != a2)
              throw Error("Inconsistent bindings for " + l2);
          } else
            t3[l2] = a2;
        }
        delete e3[r3];
      }
    for (var c2 in t3)
      e3[c2] = t3[c2];
    return e3;
  }
  function Uo(e3, t3, r3, n3) {
    var i3 = (t3 = Vo(t3)).call ? t3.call(e3, n3) : t3[e3];
    if (i3 === false)
      return "nothing";
    if (i3 === "...")
      return "multi";
    if (i3 != null && r3(i3))
      return "handled";
    if (t3.fallthrough) {
      if (Object.prototype.toString.call(t3.fallthrough) != "[object Array]")
        return Uo(e3, t3.fallthrough, r3, n3);
      for (var o2 = 0; o2 < t3.fallthrough.length; o2++) {
        var a2 = Uo(e3, t3.fallthrough[o2], r3, n3);
        if (a2)
          return a2;
      }
    }
  }
  function jo(e3) {
    var t3 = typeof e3 == "string" ? e3 : Fo[e3.keyCode];
    return t3 == "Ctrl" || t3 == "Alt" || t3 == "Shift" || t3 == "Mod";
  }
  function Ko(e3, t3, r3) {
    var n3 = e3;
    return t3.altKey && n3 != "Alt" && (e3 = "Alt-" + e3), (x ? t3.metaKey : t3.ctrlKey) && n3 != "Ctrl" && (e3 = "Ctrl-" + e3), (x ? t3.ctrlKey : t3.metaKey) && n3 != "Mod" && (e3 = "Cmd-" + e3), !r3 && t3.shiftKey && n3 != "Shift" && (e3 = "Shift-" + e3), e3;
  }
  function Go(e3, t3) {
    if (d && e3.keyCode == 34 && e3.char)
      return false;
    var r3 = Fo[e3.keyCode];
    return r3 != null && !e3.altGraphKey && (e3.keyCode == 3 && e3.code && (r3 = e3.code), Ko(r3, e3, t3));
  }
  function Vo(e3) {
    return typeof e3 == "string" ? $o[e3] : e3;
  }
  function qo(e3, t3) {
    for (var r3 = e3.doc.sel.ranges, n3 = [], i3 = 0; i3 < r3.length; i3++) {
      for (var o2 = t3(r3[i3]); n3.length && tt(o2.from, V(n3).to) <= 0; ) {
        var a2 = n3.pop();
        if (tt(a2.from, o2.from) < 0) {
          o2.from = a2.from;
          break;
        }
      }
      n3.push(o2);
    }
    Jn(e3, function() {
      for (var t4 = n3.length - 1; t4 >= 0; t4--)
        po(e3.doc, "", n3[t4].from, n3[t4].to, "+delete");
      _n(e3);
    });
  }
  function Xo(e3, t3, r3) {
    var n3 = ie(e3.text, t3 + r3, r3);
    return n3 < 0 || n3 > e3.text.length ? null : n3;
  }
  function Yo(e3, t3, r3) {
    var n3 = Xo(e3, t3.ch, r3);
    return n3 == null ? null : new et(t3.line, n3, r3 < 0 ? "after" : "before");
  }
  function Qo(e3, t3, r3, n3, i3) {
    if (e3) {
      t3.doc.direction == "rtl" && (i3 = -i3);
      var o2 = ce(r3, t3.doc.direction);
      if (o2) {
        var a2, l2 = i3 < 0 ? V(o2) : o2[0], s2 = i3 < 0 == (l2.level == 1) ? "after" : "before";
        if (l2.level > 0 || t3.doc.direction == "rtl") {
          var c2 = _r(t3, r3);
          a2 = i3 < 0 ? r3.text.length - 1 : 0;
          var u2 = Nr(t3, c2, a2).top;
          a2 = oe(function(e4) {
            return Nr(t3, c2, e4).top == u2;
          }, i3 < 0 == (l2.level == 1) ? l2.from : l2.to - 1, a2), s2 == "before" && (a2 = Xo(r3, a2, 1));
        } else
          a2 = i3 < 0 ? l2.to : l2.from;
        return new et(n3, a2, s2);
      }
    }
    return new et(n3, i3 < 0 ? r3.text.length : 0, i3 < 0 ? "before" : "after");
  }
  $o.basic = { Left: "goCharLeft", Right: "goCharRight", Up: "goLineUp", Down: "goLineDown", End: "goLineEnd", Home: "goLineStartSmart", PageUp: "goPageUp", PageDown: "goPageDown", Delete: "delCharAfter", Backspace: "delCharBefore", "Shift-Backspace": "delCharBefore", Tab: "defaultTab", "Shift-Tab": "indentAuto", Enter: "newlineAndIndent", Insert: "toggleOverwrite", Esc: "singleSelection" }, $o.pcDefault = { "Ctrl-A": "selectAll", "Ctrl-D": "deleteLine", "Ctrl-Z": "undo", "Shift-Ctrl-Z": "redo", "Ctrl-Y": "redo", "Ctrl-Home": "goDocStart", "Ctrl-End": "goDocEnd", "Ctrl-Up": "goLineUp", "Ctrl-Down": "goLineDown", "Ctrl-Left": "goGroupLeft", "Ctrl-Right": "goGroupRight", "Alt-Left": "goLineStart", "Alt-Right": "goLineEnd", "Ctrl-Backspace": "delGroupBefore", "Ctrl-Delete": "delGroupAfter", "Ctrl-S": "save", "Ctrl-F": "find", "Ctrl-G": "findNext", "Shift-Ctrl-G": "findPrev", "Shift-Ctrl-F": "replace", "Shift-Ctrl-R": "replaceAll", "Ctrl-[": "indentLess", "Ctrl-]": "indentMore", "Ctrl-U": "undoSelection", "Shift-Ctrl-U": "redoSelection", "Alt-U": "redoSelection", fallthrough: "basic" }, $o.emacsy = { "Ctrl-F": "goCharRight", "Ctrl-B": "goCharLeft", "Ctrl-P": "goLineUp", "Ctrl-N": "goLineDown", "Ctrl-A": "goLineStart", "Ctrl-E": "goLineEnd", "Ctrl-V": "goPageDown", "Shift-Ctrl-V": "goPageUp", "Ctrl-D": "delCharAfter", "Ctrl-H": "delCharBefore", "Alt-Backspace": "delWordBefore", "Ctrl-K": "killLine", "Ctrl-T": "transposeChars", "Ctrl-O": "openLine" }, $o.macDefault = { "Cmd-A": "selectAll", "Cmd-D": "deleteLine", "Cmd-Z": "undo", "Shift-Cmd-Z": "redo", "Cmd-Y": "redo", "Cmd-Home": "goDocStart", "Cmd-Up": "goDocStart", "Cmd-End": "goDocEnd", "Cmd-Down": "goDocEnd", "Alt-Left": "goGroupLeft", "Alt-Right": "goGroupRight", "Cmd-Left": "goLineLeft", "Cmd-Right": "goLineRight", "Alt-Backspace": "delGroupBefore", "Ctrl-Alt-Backspace": "delGroupAfter", "Alt-Delete": "delGroupAfter", "Cmd-S": "save", "Cmd-F": "find", "Cmd-G": "findNext", "Shift-Cmd-G": "findPrev", "Cmd-Alt-F": "replace", "Shift-Cmd-Alt-F": "replaceAll", "Cmd-[": "indentLess", "Cmd-]": "indentMore", "Cmd-Backspace": "delWrappedLineLeft", "Cmd-Delete": "delWrappedLineRight", "Cmd-U": "undoSelection", "Shift-Cmd-U": "redoSelection", "Ctrl-Up": "goDocStart", "Ctrl-Down": "goDocEnd", fallthrough: ["basic", "emacsy"] }, $o.default = y ? $o.macDefault : $o.pcDefault;
  var Jo = { selectAll: ao, singleSelection: function(e3) {
    return e3.setSelection(e3.getCursor("anchor"), e3.getCursor("head"), Z);
  }, killLine: function(e3) {
    return qo(e3, function(t3) {
      if (t3.empty()) {
        var r3 = Ke(e3.doc, t3.head.line).text.length;
        return t3.head.ch == r3 && t3.head.line < e3.lastLine() ? { from: t3.head, to: et(t3.head.line + 1, 0) } : { from: t3.head, to: et(t3.head.line, r3) };
      }
      return { from: t3.from(), to: t3.to() };
    });
  }, deleteLine: function(e3) {
    return qo(e3, function(t3) {
      return { from: et(t3.from().line, 0), to: lt(e3.doc, et(t3.to().line + 1, 0)) };
    });
  }, delLineLeft: function(e3) {
    return qo(e3, function(e4) {
      return { from: et(e4.from().line, 0), to: e4.from() };
    });
  }, delWrappedLineLeft: function(e3) {
    return qo(e3, function(t3) {
      var r3 = e3.charCoords(t3.head, "div").top + 5;
      return { from: e3.coordsChar({ left: 0, top: r3 }, "div"), to: t3.from() };
    });
  }, delWrappedLineRight: function(e3) {
    return qo(e3, function(t3) {
      var r3 = e3.charCoords(t3.head, "div").top + 5, n3 = e3.coordsChar({ left: e3.display.lineDiv.offsetWidth + 100, top: r3 }, "div");
      return { from: t3.from(), to: n3 };
    });
  }, undo: function(e3) {
    return e3.undo();
  }, redo: function(e3) {
    return e3.redo();
  }, undoSelection: function(e3) {
    return e3.undoSelection();
  }, redoSelection: function(e3) {
    return e3.redoSelection();
  }, goDocStart: function(e3) {
    return e3.extendSelection(et(e3.firstLine(), 0));
  }, goDocEnd: function(e3) {
    return e3.extendSelection(et(e3.lastLine()));
  }, goLineStart: function(e3) {
    return e3.extendSelectionsBy(function(t3) {
      return ea(e3, t3.head.line);
    }, { origin: "+move", bias: 1 });
  }, goLineStartSmart: function(e3) {
    return e3.extendSelectionsBy(function(t3) {
      return ta(e3, t3.head);
    }, { origin: "+move", bias: 1 });
  }, goLineEnd: function(e3) {
    return e3.extendSelectionsBy(function(t3) {
      return function(e4, t4) {
        var r3 = Ke(e4.doc, t4), n3 = function(e5) {
          for (var t5; t5 = Wt(e5); )
            e5 = t5.find(1, true).line;
          return e5;
        }(r3);
        return n3 != r3 && (t4 = Xe(n3)), Qo(true, e4, r3, t4, -1);
      }(e3, t3.head.line);
    }, { origin: "+move", bias: -1 });
  }, goLineRight: function(e3) {
    return e3.extendSelectionsBy(function(t3) {
      var r3 = e3.cursorCoords(t3.head, "div").top + 5;
      return e3.coordsChar({ left: e3.display.lineDiv.offsetWidth + 100, top: r3 }, "div");
    }, U);
  }, goLineLeft: function(e3) {
    return e3.extendSelectionsBy(function(t3) {
      var r3 = e3.cursorCoords(t3.head, "div").top + 5;
      return e3.coordsChar({ left: 0, top: r3 }, "div");
    }, U);
  }, goLineLeftSmart: function(e3) {
    return e3.extendSelectionsBy(function(t3) {
      var r3 = e3.cursorCoords(t3.head, "div").top + 5, n3 = e3.coordsChar({ left: 0, top: r3 }, "div");
      return n3.ch < e3.getLine(n3.line).search(/\S/) ? ta(e3, t3.head) : n3;
    }, U);
  }, goLineUp: function(e3) {
    return e3.moveV(-1, "line");
  }, goLineDown: function(e3) {
    return e3.moveV(1, "line");
  }, goPageUp: function(e3) {
    return e3.moveV(-1, "page");
  }, goPageDown: function(e3) {
    return e3.moveV(1, "page");
  }, goCharLeft: function(e3) {
    return e3.moveH(-1, "char");
  }, goCharRight: function(e3) {
    return e3.moveH(1, "char");
  }, goColumnLeft: function(e3) {
    return e3.moveH(-1, "column");
  }, goColumnRight: function(e3) {
    return e3.moveH(1, "column");
  }, goWordLeft: function(e3) {
    return e3.moveH(-1, "word");
  }, goGroupRight: function(e3) {
    return e3.moveH(1, "group");
  }, goGroupLeft: function(e3) {
    return e3.moveH(-1, "group");
  }, goWordRight: function(e3) {
    return e3.moveH(1, "word");
  }, delCharBefore: function(e3) {
    return e3.deleteH(-1, "codepoint");
  }, delCharAfter: function(e3) {
    return e3.deleteH(1, "char");
  }, delWordBefore: function(e3) {
    return e3.deleteH(-1, "word");
  }, delWordAfter: function(e3) {
    return e3.deleteH(1, "word");
  }, delGroupBefore: function(e3) {
    return e3.deleteH(-1, "group");
  }, delGroupAfter: function(e3) {
    return e3.deleteH(1, "group");
  }, indentAuto: function(e3) {
    return e3.indentSelection("smart");
  }, indentMore: function(e3) {
    return e3.indentSelection("add");
  }, indentLess: function(e3) {
    return e3.indentSelection("subtract");
  }, insertTab: function(e3) {
    return e3.replaceSelection("	");
  }, insertSoftTab: function(e3) {
    for (var t3 = [], r3 = e3.listSelections(), n3 = e3.options.tabSize, i3 = 0; i3 < r3.length; i3++) {
      var o2 = r3[i3].from(), a2 = B(e3.getLine(o2.line), o2.ch, n3);
      t3.push(G(n3 - a2 % n3));
    }
    e3.replaceSelections(t3);
  }, defaultTab: function(e3) {
    e3.somethingSelected() ? e3.indentSelection("add") : e3.execCommand("insertTab");
  }, transposeChars: function(e3) {
    return Jn(e3, function() {
      for (var t3 = e3.listSelections(), r3 = [], n3 = 0; n3 < t3.length; n3++)
        if (t3[n3].empty()) {
          var i3 = t3[n3].head, o2 = Ke(e3.doc, i3.line).text;
          if (o2) {
            if (i3.ch == o2.length && (i3 = new et(i3.line, i3.ch - 1)), i3.ch > 0)
              i3 = new et(i3.line, i3.ch + 1), e3.replaceRange(o2.charAt(i3.ch - 1) + o2.charAt(i3.ch - 2), et(i3.line, i3.ch - 2), i3, "+transpose");
            else if (i3.line > e3.doc.first) {
              var a2 = Ke(e3.doc, i3.line - 1).text;
              a2 && (i3 = new et(i3.line, 1), e3.replaceRange(o2.charAt(0) + e3.doc.lineSeparator() + a2.charAt(a2.length - 1), et(i3.line - 1, a2.length - 1), i3, "+transpose"));
            }
          }
          r3.push(new Ci(i3, i3));
        }
      e3.setSelections(r3);
    });
  }, newlineAndIndent: function(e3) {
    return Jn(e3, function() {
      for (var t3 = e3.listSelections(), r3 = t3.length - 1; r3 >= 0; r3--)
        e3.replaceRange(e3.doc.lineSeparator(), t3[r3].anchor, t3[r3].head, "+input");
      t3 = e3.listSelections();
      for (var n3 = 0; n3 < t3.length; n3++)
        e3.indentLine(t3[n3].from().line, null, true);
      _n(e3);
    });
  }, openLine: function(e3) {
    return e3.replaceSelection("\n", "start");
  }, toggleOverwrite: function(e3) {
    return e3.toggleOverwrite();
  } };
  function ea(e3, t3) {
    var r3 = Ke(e3.doc, t3), n3 = Bt(r3);
    return n3 != r3 && (t3 = Xe(n3)), Qo(true, e3, n3, t3, 1);
  }
  function ta(e3, t3) {
    var r3 = ea(e3, t3.line), n3 = Ke(e3.doc, r3.line), i3 = ce(n3, e3.doc.direction);
    if (!i3 || i3[0].level == 0) {
      var o2 = Math.max(r3.ch, n3.text.search(/\S/)), a2 = t3.line == r3.line && t3.ch <= o2 && t3.ch;
      return et(r3.line, a2 ? 0 : o2, r3.sticky);
    }
    return r3;
  }
  function ra(e3, t3, r3) {
    if (typeof t3 == "string" && !(t3 = Jo[t3]))
      return false;
    e3.display.input.ensurePolled();
    var n3 = e3.display.shift, i3 = false;
    try {
      e3.isReadOnly() && (e3.state.suppressEdits = true), r3 && (e3.display.shift = false), i3 = t3(e3) != $;
    } finally {
      e3.display.shift = n3, e3.state.suppressEdits = false;
    }
    return i3;
  }
  var na = new H();
  function ia(e3, t3, r3, n3) {
    var i3 = e3.state.keySeq;
    if (i3) {
      if (jo(t3))
        return "handled";
      if (/\'$/.test(t3) ? e3.state.keySeq = null : na.set(50, function() {
        e3.state.keySeq == i3 && (e3.state.keySeq = null, e3.display.input.reset());
      }), oa(e3, i3 + " " + t3, r3, n3))
        return true;
    }
    return oa(e3, t3, r3, n3);
  }
  function oa(e3, t3, r3, n3) {
    var i3 = function(e4, t4, r4) {
      for (var n4 = 0; n4 < e4.state.keyMaps.length; n4++) {
        var i4 = Uo(t4, e4.state.keyMaps[n4], r4, e4);
        if (i4)
          return i4;
      }
      return e4.options.extraKeys && Uo(t4, e4.options.extraKeys, r4, e4) || Uo(t4, e4.options.keyMap, r4, e4);
    }(e3, t3, n3);
    return i3 == "multi" && (e3.state.keySeq = t3), i3 == "handled" && lr(e3, "keyHandled", e3, t3, r3), i3 != "handled" && i3 != "multi" || (be(r3), kn(e3)), !!i3;
  }
  function aa(e3, t3) {
    var r3 = Go(t3, true);
    return !!r3 && (t3.shiftKey && !e3.state.keySeq ? ia(e3, "Shift-" + r3, t3, function(t4) {
      return ra(e3, t4, true);
    }) || ia(e3, r3, t3, function(t4) {
      if (typeof t4 == "string" ? /^go[A-Z]/.test(t4) : t4.motion)
        return ra(e3, t4);
    }) : ia(e3, r3, t3, function(t4) {
      return ra(e3, t4);
    }));
  }
  var la = null;
  function sa(e3) {
    var t3 = this;
    if (!(e3.target && e3.target != t3.display.input.getField() || (t3.curOp.focus = N(), me(t3, e3)))) {
      a && l < 11 && e3.keyCode == 27 && (e3.returnValue = false);
      var n3 = e3.keyCode;
      t3.display.shift = n3 == 16 || e3.shiftKey;
      var i3 = aa(t3, e3);
      d && (la = i3 ? n3 : null, i3 || n3 != 88 || Pe || !(y ? e3.metaKey : e3.ctrlKey) || t3.replaceSelection("", null, "cut")), r2 && !y && !i3 && n3 == 46 && e3.shiftKey && !e3.ctrlKey && document.execCommand && document.execCommand("cut"), n3 != 18 || /\bCodeMirror-crosshair\b/.test(t3.display.lineDiv.className) || function(e4) {
        var t4 = e4.display.lineDiv;
        function r3(e5) {
          e5.keyCode != 18 && e5.altKey || (T(t4, "CodeMirror-crosshair"), he(document, "keyup", r3), he(document, "mouseover", r3));
        }
        P(t4, "CodeMirror-crosshair"), de(document, "keyup", r3), de(document, "mouseover", r3);
      }(t3);
    }
  }
  function ca(e3) {
    e3.keyCode == 16 && (this.doc.sel.shift = false), me(this, e3);
  }
  function ua(e3) {
    var t3 = this;
    if (!(e3.target && e3.target != t3.display.input.getField() || kr(t3.display, e3) || me(t3, e3) || e3.ctrlKey && !e3.altKey || y && e3.metaKey)) {
      var r3 = e3.keyCode, n3 = e3.charCode;
      if (d && r3 == la)
        return la = null, void be(e3);
      if (!d || e3.which && !(e3.which < 10) || !aa(t3, e3)) {
        var i3 = String.fromCharCode(n3 == null ? r3 : n3);
        i3 != "\b" && (function(e4, t4, r4) {
          return ia(e4, "'" + r4 + "'", t4, function(t5) {
            return ra(e4, t5, true);
          });
        }(t3, e3, i3) || t3.display.input.onKeyPress(e3));
      }
    }
  }
  var da, fa, ha = function(e3, t3, r3) {
    this.time = e3, this.pos = t3, this.button = r3;
  };
  function pa(e3) {
    var t3 = this, r3 = t3.display;
    if (!(me(t3, e3) || r3.activeTouch && r3.input.supportsTouch())) {
      if (r3.input.ensurePolled(), r3.shift = e3.shiftKey, kr(r3, e3))
        s || (r3.scroller.draggable = false, setTimeout(function() {
          return r3.scroller.draggable = true;
        }, 100));
      else if (!va(t3, e3)) {
        var n3 = cn(t3, e3), i3 = Se(e3), o2 = n3 ? function(e4, t4) {
          var r4 = +new Date();
          return fa && fa.compare(r4, e4, t4) ? (da = fa = null, "triple") : da && da.compare(r4, e4, t4) ? (fa = new ha(r4, e4, t4), da = null, "double") : (da = new ha(r4, e4, t4), fa = null, "single");
        }(n3, i3) : "single";
        window.focus(), i3 == 1 && t3.state.selectingText && t3.state.selectingText(e3), n3 && function(e4, t4, r4, n4, i4) {
          var o3 = "Click";
          return n4 == "double" ? o3 = "Double" + o3 : n4 == "triple" && (o3 = "Triple" + o3), ia(e4, Ko(o3 = (t4 == 1 ? "Left" : t4 == 2 ? "Middle" : "Right") + o3, i4), i4, function(t5) {
            if (typeof t5 == "string" && (t5 = Jo[t5]), !t5)
              return false;
            var n5 = false;
            try {
              e4.isReadOnly() && (e4.state.suppressEdits = true), n5 = t5(e4, r4) != $;
            } finally {
              e4.state.suppressEdits = false;
            }
            return n5;
          });
        }(t3, i3, n3, o2, e3) || (i3 == 1 ? n3 ? function(e4, t4, r4, n4) {
          a ? setTimeout(E(xn, e4), 0) : e4.curOp.focus = N();
          var i4, o3 = function(e5, t5, r5) {
            var n5 = e5.getOption("configureMouse"), i5 = n5 ? n5(e5, t5, r5) : {};
            if (i5.unit == null) {
              var o4 = b ? r5.shiftKey && r5.metaKey : r5.altKey;
              i5.unit = o4 ? "rectangle" : t5 == "single" ? "char" : t5 == "double" ? "word" : "line";
            }
            return (i5.extend == null || e5.doc.extend) && (i5.extend = e5.doc.extend || r5.shiftKey), i5.addNew == null && (i5.addNew = y ? r5.metaKey : r5.ctrlKey), i5.moveOnDrag == null && (i5.moveOnDrag = !(y ? r5.altKey : r5.ctrlKey)), i5;
          }(e4, r4, n4), c2 = e4.doc.sel;
          e4.options.dragDrop && Ae && !e4.isReadOnly() && r4 == "single" && (i4 = c2.contains(t4)) > -1 && (tt((i4 = c2.ranges[i4]).from(), t4) < 0 || t4.xRel > 0) && (tt(i4.to(), t4) > 0 || t4.xRel < 0) ? function(e5, t5, r5, n5) {
            var i5 = e5.display, o4 = false, c3 = ei(e5, function(t6) {
              s && (i5.scroller.draggable = false), e5.state.draggingText = false, e5.state.delayingBlurEvent && (e5.hasFocus() ? e5.state.delayingBlurEvent = false : Cn(e5)), he(i5.wrapper.ownerDocument, "mouseup", c3), he(i5.wrapper.ownerDocument, "mousemove", u2), he(i5.scroller, "dragstart", d2), he(i5.scroller, "drop", c3), o4 || (be(t6), n5.addNew || Gi(e5.doc, r5, null, null, n5.extend), s && !f || a && l == 9 ? setTimeout(function() {
                i5.wrapper.ownerDocument.body.focus({ preventScroll: true }), i5.input.focus();
              }, 20) : i5.input.focus());
            }), u2 = function(e6) {
              o4 = o4 || Math.abs(t5.clientX - e6.clientX) + Math.abs(t5.clientY - e6.clientY) >= 10;
            }, d2 = function() {
              return o4 = true;
            };
            s && (i5.scroller.draggable = true), e5.state.draggingText = c3, c3.copy = !n5.moveOnDrag, de(i5.wrapper.ownerDocument, "mouseup", c3), de(i5.wrapper.ownerDocument, "mousemove", u2), de(i5.scroller, "dragstart", d2), de(i5.scroller, "drop", c3), e5.state.delayingBlurEvent = true, setTimeout(function() {
              return i5.input.focus();
            }, 20), i5.scroller.dragDrop && i5.scroller.dragDrop();
          }(e4, n4, t4, o3) : function(e5, t5, r5, n5) {
            a && Cn(e5);
            var i5 = e5.display, o4 = e5.doc;
            be(t5);
            var l2, s2, c3 = o4.sel, u2 = c3.ranges;
            if (n5.addNew && !n5.extend ? (s2 = o4.sel.contains(r5), l2 = s2 > -1 ? u2[s2] : new Ci(r5, r5)) : (l2 = o4.sel.primary(), s2 = o4.sel.primIndex), n5.unit == "rectangle")
              n5.addNew || (l2 = new Ci(r5, r5)), r5 = cn(e5, t5, true, true), s2 = -1;
            else {
              var d2 = ma(e5, r5, n5.unit);
              l2 = n5.extend ? Ki(l2, d2.anchor, d2.head, n5.extend) : d2;
            }
            n5.addNew ? s2 == -1 ? (s2 = u2.length, Qi(o4, Si(e5, u2.concat([l2]), s2), { scroll: false, origin: "*mouse" })) : u2.length > 1 && u2[s2].empty() && n5.unit == "char" && !n5.extend ? (Qi(o4, Si(e5, u2.slice(0, s2).concat(u2.slice(s2 + 1)), 0), { scroll: false, origin: "*mouse" }), c3 = o4.sel) : qi(o4, s2, l2, R) : (s2 = 0, Qi(o4, new xi([l2], 0), R), c3 = o4.sel);
            var f2 = r5;
            var h2 = i5.wrapper.getBoundingClientRect(), p2 = 0;
            function m2(t6) {
              var a2 = ++p2, u3 = cn(e5, t6, true, n5.unit == "rectangle");
              if (u3)
                if (tt(u3, f2) != 0) {
                  e5.curOp.focus = N(), function(t7) {
                    if (tt(f2, t7) != 0)
                      if (f2 = t7, n5.unit == "rectangle") {
                        for (var i6 = [], a3 = e5.options.tabSize, u4 = B(Ke(o4, r5.line).text, r5.ch, a3), d4 = B(Ke(o4, t7.line).text, t7.ch, a3), h3 = Math.min(u4, d4), p3 = Math.max(u4, d4), m3 = Math.min(r5.line, t7.line), g4 = Math.min(e5.lastLine(), Math.max(r5.line, t7.line)); m3 <= g4; m3++) {
                          var v3 = Ke(o4, m3).text, y3 = j(v3, h3, a3);
                          h3 == p3 ? i6.push(new Ci(et(m3, y3), et(m3, y3))) : v3.length > y3 && i6.push(new Ci(et(m3, y3), et(m3, j(v3, p3, a3))));
                        }
                        i6.length || i6.push(new Ci(r5, r5)), Qi(o4, Si(e5, c3.ranges.slice(0, s2).concat(i6), s2), { origin: "*mouse", scroll: false }), e5.scrollIntoView(t7);
                      } else {
                        var b2, w2 = l2, k2 = ma(e5, t7, n5.unit), x2 = w2.anchor;
                        tt(k2.anchor, x2) > 0 ? (b2 = k2.head, x2 = ot(w2.from(), k2.anchor)) : (b2 = k2.anchor, x2 = it(w2.to(), k2.head));
                        var C2 = c3.ranges.slice(0);
                        C2[s2] = function(e6, t8) {
                          var r6 = t8.anchor, n6 = t8.head, i7 = Ke(e6.doc, r6.line);
                          if (tt(r6, n6) == 0 && r6.sticky == n6.sticky)
                            return t8;
                          var o5 = ce(i7);
                          if (!o5)
                            return t8;
                          var a4 = le(o5, r6.ch, r6.sticky), l3 = o5[a4];
                          if (l3.from != r6.ch && l3.to != r6.ch)
                            return t8;
                          var s3, c4 = a4 + (l3.from == r6.ch == (l3.level != 1) ? 0 : 1);
                          if (c4 == 0 || c4 == o5.length)
                            return t8;
                          if (n6.line != r6.line)
                            s3 = (n6.line - r6.line) * (e6.doc.direction == "ltr" ? 1 : -1) > 0;
                          else {
                            var u5 = le(o5, n6.ch, n6.sticky), d5 = u5 - a4 || (n6.ch - r6.ch) * (l3.level == 1 ? -1 : 1);
                            s3 = u5 == c4 - 1 || u5 == c4 ? d5 < 0 : d5 > 0;
                          }
                          var f3 = o5[c4 + (s3 ? -1 : 0)], h4 = s3 == (f3.level == 1), p4 = h4 ? f3.from : f3.to, m4 = h4 ? "after" : "before";
                          return r6.ch == p4 && r6.sticky == m4 ? t8 : new Ci(new et(r6.line, p4, m4), n6);
                        }(e5, new Ci(lt(o4, x2), b2)), Qi(o4, Si(e5, C2, s2), R);
                      }
                  }(u3);
                  var d3 = Mn(i5, o4);
                  (u3.line >= d3.to || u3.line < d3.from) && setTimeout(ei(e5, function() {
                    p2 == a2 && m2(t6);
                  }), 150);
                } else {
                  var g3 = t6.clientY < h2.top ? -20 : t6.clientY > h2.bottom ? 20 : 0;
                  g3 && setTimeout(ei(e5, function() {
                    p2 == a2 && (i5.scroller.scrollTop += g3, m2(t6));
                  }), 50);
                }
            }
            function g2(t6) {
              e5.state.selectingText = false, p2 = 1 / 0, t6 && (be(t6), i5.input.focus()), he(i5.wrapper.ownerDocument, "mousemove", v2), he(i5.wrapper.ownerDocument, "mouseup", y2), o4.history.lastSelOrigin = null;
            }
            var v2 = ei(e5, function(e6) {
              e6.buttons !== 0 && Se(e6) ? m2(e6) : g2(e6);
            }), y2 = ei(e5, g2);
            e5.state.selectingText = y2, de(i5.wrapper.ownerDocument, "mousemove", v2), de(i5.wrapper.ownerDocument, "mouseup", y2);
          }(e4, n4, t4, o3);
        }(t3, n3, o2, e3) : Ce(e3) == r3.scroller && be(e3) : i3 == 2 ? (n3 && Gi(t3.doc, n3), setTimeout(function() {
          return r3.input.focus();
        }, 20)) : i3 == 3 && (C ? t3.display.input.onContextMenu(e3) : Cn(t3)));
      }
    }
  }
  function ma(e3, t3, r3) {
    if (r3 == "char")
      return new Ci(t3, t3);
    if (r3 == "word")
      return e3.findWordAt(t3);
    if (r3 == "line")
      return new Ci(et(t3.line, 0), lt(e3.doc, et(t3.line + 1, 0)));
    var n3 = r3(e3, t3);
    return new Ci(n3.from, n3.to);
  }
  function ga(e3, t3, r3, n3) {
    var i3, o2;
    if (t3.touches)
      i3 = t3.touches[0].clientX, o2 = t3.touches[0].clientY;
    else
      try {
        i3 = t3.clientX, o2 = t3.clientY;
      } catch (e4) {
        return false;
      }
    if (i3 >= Math.floor(e3.display.gutters.getBoundingClientRect().right))
      return false;
    n3 && be(t3);
    var a2 = e3.display, l2 = a2.lineDiv.getBoundingClientRect();
    if (o2 > l2.bottom || !ve(e3, r3))
      return ke(t3);
    o2 -= l2.top - a2.viewOffset;
    for (var s2 = 0; s2 < e3.display.gutterSpecs.length; ++s2) {
      var c2 = a2.gutters.childNodes[s2];
      if (c2 && c2.getBoundingClientRect().right >= i3)
        return pe(e3, r3, e3, Ye(e3.doc, o2), e3.display.gutterSpecs[s2].className, t3), ke(t3);
    }
  }
  function va(e3, t3) {
    return ga(e3, t3, "gutterClick", true);
  }
  function ya(e3, t3) {
    kr(e3.display, t3) || function(e4, t4) {
      return !!ve(e4, "gutterContextMenu") && ga(e4, t4, "gutterContextMenu", false);
    }(e3, t3) || me(e3, t3, "contextmenu") || C || e3.display.input.onContextMenu(t3);
  }
  function ba(e3) {
    e3.display.wrapper.className = e3.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e3.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), Hr(e3);
  }
  ha.prototype.compare = function(e3, t3, r3) {
    return this.time + 400 > e3 && tt(t3, this.pos) == 0 && r3 == this.button;
  };
  var wa = { toString: function() {
    return "CodeMirror.Init";
  } }, ka = {}, xa = {};
  function Ca(e3, t3, r3) {
    if (!t3 != !(r3 && r3 != wa)) {
      var n3 = e3.display.dragFunctions, i3 = t3 ? de : he;
      i3(e3.display.scroller, "dragstart", n3.start), i3(e3.display.scroller, "dragenter", n3.enter), i3(e3.display.scroller, "dragover", n3.over), i3(e3.display.scroller, "dragleave", n3.leave), i3(e3.display.scroller, "drop", n3.drop);
    }
  }
  function Sa(e3) {
    e3.options.lineWrapping ? (P(e3.display.wrapper, "CodeMirror-wrap"), e3.display.sizer.style.minWidth = "", e3.display.sizerWidth = null) : (T(e3.display.wrapper, "CodeMirror-wrap"), jt(e3)), sn(e3), dn(e3), Hr(e3), setTimeout(function() {
      return $n(e3);
    }, 100);
  }
  function La(e3, t3) {
    var r3 = this;
    if (!(this instanceof La))
      return new La(e3, t3);
    this.options = t3 = t3 ? F(t3) : {}, F(ka, t3, false);
    var n3 = t3.value;
    typeof n3 == "string" ? n3 = new Oo(n3, t3.mode, null, t3.lineSeparator, t3.direction) : t3.mode && (n3.modeOption = t3.mode), this.doc = n3;
    var i3 = new La.inputStyles[t3.inputStyle](this), o2 = this.display = new gi(e3, n3, i3, t3);
    for (var c2 in o2.wrapper.CodeMirror = this, ba(this), t3.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), Un(this), this.state = { keyMaps: [], overlays: [], modeGen: 0, overwrite: false, delayingBlurEvent: false, focused: false, suppressEdits: false, pasteIncoming: -1, cutIncoming: -1, selectingText: false, draggingText: false, highlight: new H(), keySeq: null, specialChars: null }, t3.autofocus && !v && o2.input.focus(), a && l < 11 && setTimeout(function() {
      return r3.display.input.reset(true);
    }, 20), function(e4) {
      var t4 = e4.display;
      de(t4.scroller, "mousedown", ei(e4, pa)), de(t4.scroller, "dblclick", a && l < 11 ? ei(e4, function(t5) {
        if (!me(e4, t5)) {
          var r5 = cn(e4, t5);
          if (r5 && !va(e4, t5) && !kr(e4.display, t5)) {
            be(t5);
            var n5 = e4.findWordAt(r5);
            Gi(e4.doc, n5.anchor, n5.head);
          }
        }
      }) : function(t5) {
        return me(e4, t5) || be(t5);
      }), de(t4.scroller, "contextmenu", function(t5) {
        return ya(e4, t5);
      }), de(t4.input.getField(), "contextmenu", function(r5) {
        t4.scroller.contains(r5.target) || ya(e4, r5);
      });
      var r4, n4 = { end: 0 };
      function i4() {
        t4.activeTouch && (r4 = setTimeout(function() {
          return t4.activeTouch = null;
        }, 1e3), (n4 = t4.activeTouch).end = +new Date());
      }
      function o3(e5, t5) {
        if (t5.left == null)
          return true;
        var r5 = t5.left - e5.left, n5 = t5.top - e5.top;
        return r5 * r5 + n5 * n5 > 400;
      }
      de(t4.scroller, "touchstart", function(i5) {
        if (!me(e4, i5) && !function(e5) {
          if (e5.touches.length != 1)
            return false;
          var t5 = e5.touches[0];
          return t5.radiusX <= 1 && t5.radiusY <= 1;
        }(i5) && !va(e4, i5)) {
          t4.input.ensurePolled(), clearTimeout(r4);
          var o4 = +new Date();
          t4.activeTouch = { start: o4, moved: false, prev: o4 - n4.end <= 300 ? n4 : null }, i5.touches.length == 1 && (t4.activeTouch.left = i5.touches[0].pageX, t4.activeTouch.top = i5.touches[0].pageY);
        }
      }), de(t4.scroller, "touchmove", function() {
        t4.activeTouch && (t4.activeTouch.moved = true);
      }), de(t4.scroller, "touchend", function(r5) {
        var n5 = t4.activeTouch;
        if (n5 && !kr(t4, r5) && n5.left != null && !n5.moved && new Date() - n5.start < 300) {
          var a2, l2 = e4.coordsChar(t4.activeTouch, "page");
          a2 = !n5.prev || o3(n5, n5.prev) ? new Ci(l2, l2) : !n5.prev.prev || o3(n5, n5.prev.prev) ? e4.findWordAt(l2) : new Ci(et(l2.line, 0), lt(e4.doc, et(l2.line + 1, 0))), e4.setSelection(a2.anchor, a2.head), e4.focus(), be(r5);
        }
        i4();
      }), de(t4.scroller, "touchcancel", i4), de(t4.scroller, "scroll", function() {
        t4.scroller.clientHeight && (Wn(e4, t4.scroller.scrollTop), Fn(e4, t4.scroller.scrollLeft, true), pe(e4, "scroll", e4));
      }), de(t4.scroller, "mousewheel", function(t5) {
        return ki(e4, t5);
      }), de(t4.scroller, "DOMMouseScroll", function(t5) {
        return ki(e4, t5);
      }), de(t4.wrapper, "scroll", function() {
        return t4.wrapper.scrollTop = t4.wrapper.scrollLeft = 0;
      }), t4.dragFunctions = { enter: function(t5) {
        me(e4, t5) || xe(t5);
      }, over: function(t5) {
        me(e4, t5) || (function(e5, t6) {
          var r5 = cn(e5, t6);
          if (r5) {
            var n5 = document.createDocumentFragment();
            yn(e5, r5, n5), e5.display.dragCursor || (e5.display.dragCursor = z("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e5.display.lineSpace.insertBefore(e5.display.dragCursor, e5.display.cursorDiv)), M(e5.display.dragCursor, n5);
          }
        }(e4, t5), xe(t5));
      }, start: function(t5) {
        return function(e5, t6) {
          if (a && (!e5.state.draggingText || +new Date() - _o < 100))
            xe(t6);
          else if (!me(e5, t6) && !kr(e5.display, t6) && (t6.dataTransfer.setData("Text", e5.getSelection()), t6.dataTransfer.effectAllowed = "copyMove", t6.dataTransfer.setDragImage && !f)) {
            var r5 = z("img", null, null, "position: fixed; left: 0; top: 0;");
            r5.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", d && (r5.width = r5.height = 1, e5.display.wrapper.appendChild(r5), r5._top = r5.offsetTop), t6.dataTransfer.setDragImage(r5, 0, 0), d && r5.parentNode.removeChild(r5);
          }
        }(e4, t5);
      }, drop: ei(e4, No), leave: function(t5) {
        me(e4, t5) || Po(e4);
      } };
      var s2 = t4.input.getField();
      de(s2, "keyup", function(t5) {
        return ca.call(e4, t5);
      }), de(s2, "keydown", ei(e4, sa)), de(s2, "keypress", ei(e4, ua)), de(s2, "focus", function(t5) {
        return Sn(e4, t5);
      }), de(s2, "blur", function(t5) {
        return Ln(e4, t5);
      });
    }(this), function() {
      var e4;
      Wo || (de(window, "resize", function() {
        e4 == null && (e4 = setTimeout(function() {
          e4 = null, Do(Eo);
        }, 100));
      }), de(window, "blur", function() {
        return Do(Ln);
      }), Wo = true);
    }(), Kn(this), this.curOp.forceUpdate = true, Wi(this, n3), t3.autofocus && !v || this.hasFocus() ? setTimeout(function() {
      r3.hasFocus() && !r3.state.focused && Sn(r3);
    }, 20) : Ln(this), xa)
      xa.hasOwnProperty(c2) && xa[c2](this, t3[c2], wa);
    fi(this), t3.finishInit && t3.finishInit(this);
    for (var u2 = 0; u2 < Ta.length; ++u2)
      Ta[u2](this);
    Gn(this), s && t3.lineWrapping && getComputedStyle(o2.lineDiv).textRendering == "optimizelegibility" && (o2.lineDiv.style.textRendering = "auto");
  }
  La.defaults = ka, La.optionHandlers = xa;
  var Ta = [];
  function Aa(e3, t3, r3, n3) {
    var i3, o2 = e3.doc;
    r3 == null && (r3 = "add"), r3 == "smart" && (o2.mode.indent ? i3 = ht(e3, t3).state : r3 = "prev");
    var a2 = e3.options.tabSize, l2 = Ke(o2, t3), s2 = B(l2.text, null, a2);
    l2.stateAfter && (l2.stateAfter = null);
    var c2, u2 = l2.text.match(/^\s*/)[0];
    if (n3 || /\S/.test(l2.text)) {
      if (r3 == "smart" && ((c2 = o2.mode.indent(i3, l2.text.slice(u2.length), l2.text)) == $ || c2 > 150)) {
        if (!n3)
          return;
        r3 = "prev";
      }
    } else
      c2 = 0, r3 = "not";
    r3 == "prev" ? c2 = t3 > o2.first ? B(Ke(o2, t3 - 1).text, null, a2) : 0 : r3 == "add" ? c2 = s2 + e3.options.indentUnit : r3 == "subtract" ? c2 = s2 - e3.options.indentUnit : typeof r3 == "number" && (c2 = s2 + r3), c2 = Math.max(0, c2);
    var d2 = "", f2 = 0;
    if (e3.options.indentWithTabs)
      for (var h2 = Math.floor(c2 / a2); h2; --h2)
        f2 += a2, d2 += "	";
    if (f2 < c2 && (d2 += G(c2 - f2)), d2 != u2)
      return po(o2, d2, et(t3, 0), et(t3, u2.length), "+input"), l2.stateAfter = null, true;
    for (var p2 = 0; p2 < o2.sel.ranges.length; p2++) {
      var m2 = o2.sel.ranges[p2];
      if (m2.head.line == t3 && m2.head.ch < u2.length) {
        var g2 = et(t3, u2.length);
        qi(o2, p2, new Ci(g2, g2));
        break;
      }
    }
  }
  La.defineInitHook = function(e3) {
    return Ta.push(e3);
  };
  var Ma = null;
  function za(e3) {
    Ma = e3;
  }
  function Oa(e3, t3, r3, n3, i3) {
    var o2 = e3.doc;
    e3.display.shift = false, n3 || (n3 = o2.sel);
    var a2 = +new Date() - 200, l2 = i3 == "paste" || e3.state.pasteIncoming > a2, s2 = _e(t3), c2 = null;
    if (l2 && n3.ranges.length > 1)
      if (Ma && Ma.text.join("\n") == t3) {
        if (n3.ranges.length % Ma.text.length == 0) {
          c2 = [];
          for (var u2 = 0; u2 < Ma.text.length; u2++)
            c2.push(o2.splitLines(Ma.text[u2]));
        }
      } else
        s2.length == n3.ranges.length && e3.options.pasteLinesPerSelection && (c2 = q(s2, function(e4) {
          return [e4];
        }));
    for (var d2 = e3.curOp.updateInput, f2 = n3.ranges.length - 1; f2 >= 0; f2--) {
      var h2 = n3.ranges[f2], p2 = h2.from(), m2 = h2.to();
      h2.empty() && (r3 && r3 > 0 ? p2 = et(p2.line, p2.ch - r3) : e3.state.overwrite && !l2 ? m2 = et(m2.line, Math.min(Ke(o2, m2.line).text.length, m2.ch + V(s2).length)) : l2 && Ma && Ma.lineWise && Ma.text.join("\n") == s2.join("\n") && (p2 = m2 = et(p2.line, 0)));
      var g2 = { from: p2, to: m2, text: c2 ? c2[f2 % c2.length] : s2, origin: i3 || (l2 ? "paste" : e3.state.cutIncoming > a2 ? "cut" : "+input") };
      so(e3.doc, g2), lr(e3, "inputRead", e3, g2);
    }
    t3 && !l2 && Na(e3, t3), _n(e3), e3.curOp.updateInput < 2 && (e3.curOp.updateInput = d2), e3.curOp.typing = true, e3.state.pasteIncoming = e3.state.cutIncoming = -1;
  }
  function _a4(e3, t3) {
    var r3 = e3.clipboardData && e3.clipboardData.getData("Text");
    if (r3)
      return e3.preventDefault(), t3.isReadOnly() || t3.options.disableInput || Jn(t3, function() {
        return Oa(t3, r3, 0, null, "paste");
      }), true;
  }
  function Na(e3, t3) {
    if (e3.options.electricChars && e3.options.smartIndent)
      for (var r3 = e3.doc.sel, n3 = r3.ranges.length - 1; n3 >= 0; n3--) {
        var i3 = r3.ranges[n3];
        if (!(i3.head.ch > 100 || n3 && r3.ranges[n3 - 1].head.line == i3.head.line)) {
          var o2 = e3.getModeAt(i3.head), a2 = false;
          if (o2.electricChars) {
            for (var l2 = 0; l2 < o2.electricChars.length; l2++)
              if (t3.indexOf(o2.electricChars.charAt(l2)) > -1) {
                a2 = Aa(e3, i3.head.line, "smart");
                break;
              }
          } else
            o2.electricInput && o2.electricInput.test(Ke(e3.doc, i3.head.line).text.slice(0, i3.head.ch)) && (a2 = Aa(e3, i3.head.line, "smart"));
          a2 && lr(e3, "electricInput", e3, i3.head.line);
        }
      }
  }
  function Pa(e3) {
    for (var t3 = [], r3 = [], n3 = 0; n3 < e3.doc.sel.ranges.length; n3++) {
      var i3 = e3.doc.sel.ranges[n3].head.line, o2 = { anchor: et(i3, 0), head: et(i3 + 1, 0) };
      r3.push(o2), t3.push(e3.getRange(o2.anchor, o2.head));
    }
    return { text: t3, ranges: r3 };
  }
  function Da(e3, t3, r3, n3) {
    e3.setAttribute("autocorrect", r3 ? "" : "off"), e3.setAttribute("autocapitalize", n3 ? "" : "off"), e3.setAttribute("spellcheck", !!t3);
  }
  function Wa() {
    var e3 = z("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"), t3 = z("div", [e3], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
    return s ? e3.style.width = "1000px" : e3.setAttribute("wrap", "off"), m && (e3.style.border = "1px solid black"), Da(e3), t3;
  }
  function Ea(e3, t3, r3, n3, i3) {
    var o2 = t3, a2 = r3, l2 = Ke(e3, t3.line), s2 = i3 && e3.direction == "rtl" ? -r3 : r3;
    function c2(o3) {
      var a3, c3;
      if (n3 == "codepoint") {
        var u3 = l2.text.charCodeAt(t3.ch + (r3 > 0 ? 0 : -1));
        if (isNaN(u3))
          a3 = null;
        else {
          var d3 = r3 > 0 ? u3 >= 55296 && u3 < 56320 : u3 >= 56320 && u3 < 57343;
          a3 = new et(t3.line, Math.max(0, Math.min(l2.text.length, t3.ch + r3 * (d3 ? 2 : 1))), -r3);
        }
      } else
        a3 = i3 ? function(e4, t4, r4, n4) {
          var i4 = ce(t4, e4.doc.direction);
          if (!i4)
            return Yo(t4, r4, n4);
          r4.ch >= t4.text.length ? (r4.ch = t4.text.length, r4.sticky = "before") : r4.ch <= 0 && (r4.ch = 0, r4.sticky = "after");
          var o4 = le(i4, r4.ch, r4.sticky), a4 = i4[o4];
          if (e4.doc.direction == "ltr" && a4.level % 2 == 0 && (n4 > 0 ? a4.to > r4.ch : a4.from < r4.ch))
            return Yo(t4, r4, n4);
          var l3, s3 = function(e5, r5) {
            return Xo(t4, e5 instanceof et ? e5.ch : e5, r5);
          }, c4 = function(r5) {
            return e4.options.lineWrapping ? (l3 = l3 || _r(e4, t4), Yr(e4, t4, l3, r5)) : { begin: 0, end: t4.text.length };
          }, u4 = c4(r4.sticky == "before" ? s3(r4, -1) : r4.ch);
          if (e4.doc.direction == "rtl" || a4.level == 1) {
            var d4 = a4.level == 1 == n4 < 0, f3 = s3(r4, d4 ? 1 : -1);
            if (f3 != null && (d4 ? f3 <= a4.to && f3 <= u4.end : f3 >= a4.from && f3 >= u4.begin)) {
              var h3 = d4 ? "before" : "after";
              return new et(r4.line, f3, h3);
            }
          }
          var p3 = function(e5, t5, n5) {
            for (var o5 = function(e6, t6) {
              return t6 ? new et(r4.line, s3(e6, 1), "before") : new et(r4.line, e6, "after");
            }; e5 >= 0 && e5 < i4.length; e5 += t5) {
              var a5 = i4[e5], l4 = t5 > 0 == (a5.level != 1), c5 = l4 ? n5.begin : s3(n5.end, -1);
              if (a5.from <= c5 && c5 < a5.to)
                return o5(c5, l4);
              if (c5 = l4 ? a5.from : s3(a5.to, -1), n5.begin <= c5 && c5 < n5.end)
                return o5(c5, l4);
            }
          }, m3 = p3(o4 + n4, n4, u4);
          if (m3)
            return m3;
          var g3 = n4 > 0 ? u4.end : s3(u4.begin, -1);
          return g3 == null || n4 > 0 && g3 == t4.text.length || !(m3 = p3(n4 > 0 ? 0 : i4.length - 1, n4, c4(g3))) ? null : m3;
        }(e3.cm, l2, t3, r3) : Yo(l2, t3, r3);
      if (a3 == null) {
        if (o3 || (c3 = t3.line + s2) < e3.first || c3 >= e3.first + e3.size || (t3 = new et(c3, t3.ch, t3.sticky), !(l2 = Ke(e3, c3))))
          return false;
        t3 = Qo(i3, e3.cm, l2, t3.line, s2);
      } else
        t3 = a3;
      return true;
    }
    if (n3 == "char" || n3 == "codepoint")
      c2();
    else if (n3 == "column")
      c2(true);
    else if (n3 == "word" || n3 == "group")
      for (var u2 = null, d2 = n3 == "group", f2 = e3.cm && e3.cm.getHelper(t3, "wordChars"), h2 = true; !(r3 < 0) || c2(!h2); h2 = false) {
        var p2 = l2.text.charAt(t3.ch) || "\n", m2 = ee(p2, f2) ? "w" : d2 && p2 == "\n" ? "n" : !d2 || /\s/.test(p2) ? null : "p";
        if (!d2 || h2 || m2 || (m2 = "s"), u2 && u2 != m2) {
          r3 < 0 && (r3 = 1, c2(), t3.sticky = "after");
          break;
        }
        if (m2 && (u2 = m2), r3 > 0 && !c2(!h2))
          break;
      }
    var g2 = io(e3, t3, o2, a2, true);
    return rt(o2, g2) && (g2.hitSide = true), g2;
  }
  function Fa(e3, t3, r3, n3) {
    var i3, o2, a2 = e3.doc, l2 = t3.left;
    if (n3 == "page") {
      var s2 = Math.min(e3.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight), c2 = Math.max(s2 - 0.5 * rn(e3.display), 3);
      i3 = (r3 > 0 ? t3.bottom : t3.top) + r3 * c2;
    } else
      n3 == "line" && (i3 = r3 > 0 ? t3.bottom + 3 : t3.top - 3);
    for (; (o2 = qr(e3, l2, i3)).outside; ) {
      if (r3 < 0 ? i3 <= 0 : i3 >= a2.height) {
        o2.hitSide = true;
        break;
      }
      i3 += 5 * r3;
    }
    return o2;
  }
  var Ba = function(e3) {
    this.cm = e3, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new H(), this.composing = null, this.gracePeriod = false, this.readDOMTimeout = null;
  };
  function Ha(e3, t3) {
    var r3 = Or(e3, t3.line);
    if (!r3 || r3.hidden)
      return null;
    var n3 = Ke(e3.doc, t3.line), i3 = Mr(r3, n3, t3.line), o2 = ce(n3, e3.doc.direction), a2 = "left";
    o2 && (a2 = le(o2, t3.ch) % 2 ? "right" : "left");
    var l2 = Wr(i3.map, t3.ch, a2);
    return l2.offset = l2.collapse == "right" ? l2.end : l2.start, l2;
  }
  function Ia(e3, t3) {
    return t3 && (e3.bad = true), e3;
  }
  function $a(e3, t3, r3) {
    var n3;
    if (t3 == e3.display.lineDiv) {
      if (!(n3 = e3.display.lineDiv.childNodes[r3]))
        return Ia(e3.clipPos(et(e3.display.viewTo - 1)), true);
      t3 = null, r3 = 0;
    } else
      for (n3 = t3; ; n3 = n3.parentNode) {
        if (!n3 || n3 == e3.display.lineDiv)
          return null;
        if (n3.parentNode && n3.parentNode == e3.display.lineDiv)
          break;
      }
    for (var i3 = 0; i3 < e3.display.view.length; i3++) {
      var o2 = e3.display.view[i3];
      if (o2.node == n3)
        return Za(o2, t3, r3);
    }
  }
  function Za(e3, t3, r3) {
    var n3 = e3.text.firstChild, i3 = false;
    if (!t3 || !_(n3, t3))
      return Ia(et(Xe(e3.line), 0), true);
    if (t3 == n3 && (i3 = true, t3 = n3.childNodes[r3], r3 = 0, !t3)) {
      var o2 = e3.rest ? V(e3.rest) : e3.line;
      return Ia(et(Xe(o2), o2.text.length), i3);
    }
    var a2 = t3.nodeType == 3 ? t3 : null, l2 = t3;
    for (a2 || t3.childNodes.length != 1 || t3.firstChild.nodeType != 3 || (a2 = t3.firstChild, r3 && (r3 = a2.nodeValue.length)); l2.parentNode != n3; )
      l2 = l2.parentNode;
    var s2 = e3.measure, c2 = s2.maps;
    function u2(t4, r4, n4) {
      for (var i4 = -1; i4 < (c2 ? c2.length : 0); i4++)
        for (var o3 = i4 < 0 ? s2.map : c2[i4], a3 = 0; a3 < o3.length; a3 += 3) {
          var l3 = o3[a3 + 2];
          if (l3 == t4 || l3 == r4) {
            var u3 = Xe(i4 < 0 ? e3.line : e3.rest[i4]), d3 = o3[a3] + n4;
            return (n4 < 0 || l3 != t4) && (d3 = o3[a3 + (n4 ? 1 : 0)]), et(u3, d3);
          }
        }
    }
    var d2 = u2(a2, l2, r3);
    if (d2)
      return Ia(d2, i3);
    for (var f2 = l2.nextSibling, h2 = a2 ? a2.nodeValue.length - r3 : 0; f2; f2 = f2.nextSibling) {
      if (d2 = u2(f2, f2.firstChild, 0))
        return Ia(et(d2.line, d2.ch - h2), i3);
      h2 += f2.textContent.length;
    }
    for (var p2 = l2.previousSibling, m2 = r3; p2; p2 = p2.previousSibling) {
      if (d2 = u2(p2, p2.firstChild, -1))
        return Ia(et(d2.line, d2.ch + m2), i3);
      m2 += p2.textContent.length;
    }
  }
  Ba.prototype.init = function(e3) {
    var t3 = this, r3 = this, n3 = r3.cm, i3 = r3.div = e3.lineDiv;
    function o2(e4) {
      for (var t4 = e4.target; t4; t4 = t4.parentNode) {
        if (t4 == i3)
          return true;
        if (/\bCodeMirror-(?:line)?widget\b/.test(t4.className))
          break;
      }
      return false;
    }
    function a2(e4) {
      if (o2(e4) && !me(n3, e4)) {
        if (n3.somethingSelected())
          za({ lineWise: false, text: n3.getSelections() }), e4.type == "cut" && n3.replaceSelection("", null, "cut");
        else {
          if (!n3.options.lineWiseCopyCut)
            return;
          var t4 = Pa(n3);
          za({ lineWise: true, text: t4.text }), e4.type == "cut" && n3.operation(function() {
            n3.setSelections(t4.ranges, 0, Z), n3.replaceSelection("", null, "cut");
          });
        }
        if (e4.clipboardData) {
          e4.clipboardData.clearData();
          var a3 = Ma.text.join("\n");
          if (e4.clipboardData.setData("Text", a3), e4.clipboardData.getData("Text") == a3)
            return void e4.preventDefault();
        }
        var l2 = Wa(), s2 = l2.firstChild;
        n3.display.lineSpace.insertBefore(l2, n3.display.lineSpace.firstChild), s2.value = Ma.text.join("\n");
        var c2 = N();
        W(s2), setTimeout(function() {
          n3.display.lineSpace.removeChild(l2), c2.focus(), c2 == i3 && r3.showPrimarySelection();
        }, 50);
      }
    }
    i3.contentEditable = true, Da(i3, n3.options.spellcheck, n3.options.autocorrect, n3.options.autocapitalize), de(i3, "paste", function(e4) {
      !o2(e4) || me(n3, e4) || _a4(e4, n3) || l <= 11 && setTimeout(ei(n3, function() {
        return t3.updateFromDOM();
      }), 20);
    }), de(i3, "compositionstart", function(e4) {
      t3.composing = { data: e4.data, done: false };
    }), de(i3, "compositionupdate", function(e4) {
      t3.composing || (t3.composing = { data: e4.data, done: false });
    }), de(i3, "compositionend", function(e4) {
      t3.composing && (e4.data != t3.composing.data && t3.readFromDOMSoon(), t3.composing.done = true);
    }), de(i3, "touchstart", function() {
      return r3.forceCompositionEnd();
    }), de(i3, "input", function() {
      t3.composing || t3.readFromDOMSoon();
    }), de(i3, "copy", a2), de(i3, "cut", a2);
  }, Ba.prototype.screenReaderLabelChanged = function(e3) {
    e3 ? this.div.setAttribute("aria-label", e3) : this.div.removeAttribute("aria-label");
  }, Ba.prototype.prepareSelection = function() {
    var e3 = vn(this.cm, false);
    return e3.focus = N() == this.div, e3;
  }, Ba.prototype.showSelection = function(e3, t3) {
    e3 && this.cm.display.view.length && ((e3.focus || t3) && this.showPrimarySelection(), this.showMultipleSelections(e3));
  }, Ba.prototype.getSelection = function() {
    return this.cm.display.wrapper.ownerDocument.getSelection();
  }, Ba.prototype.showPrimarySelection = function() {
    var e3 = this.getSelection(), t3 = this.cm, n3 = t3.doc.sel.primary(), i3 = n3.from(), o2 = n3.to();
    if (t3.display.viewTo == t3.display.viewFrom || i3.line >= t3.display.viewTo || o2.line < t3.display.viewFrom)
      e3.removeAllRanges();
    else {
      var a2 = $a(t3, e3.anchorNode, e3.anchorOffset), l2 = $a(t3, e3.focusNode, e3.focusOffset);
      if (!a2 || a2.bad || !l2 || l2.bad || tt(ot(a2, l2), i3) != 0 || tt(it(a2, l2), o2) != 0) {
        var s2 = t3.display.view, c2 = i3.line >= t3.display.viewFrom && Ha(t3, i3) || { node: s2[0].measure.map[2], offset: 0 }, u2 = o2.line < t3.display.viewTo && Ha(t3, o2);
        if (!u2) {
          var d2 = s2[s2.length - 1].measure, f2 = d2.maps ? d2.maps[d2.maps.length - 1] : d2.map;
          u2 = { node: f2[f2.length - 1], offset: f2[f2.length - 2] - f2[f2.length - 3] };
        }
        if (c2 && u2) {
          var h2, p2 = e3.rangeCount && e3.getRangeAt(0);
          try {
            h2 = L(c2.node, c2.offset, u2.offset, u2.node);
          } catch (e4) {
          }
          h2 && (!r2 && t3.state.focused ? (e3.collapse(c2.node, c2.offset), h2.collapsed || (e3.removeAllRanges(), e3.addRange(h2))) : (e3.removeAllRanges(), e3.addRange(h2)), p2 && e3.anchorNode == null ? e3.addRange(p2) : r2 && this.startGracePeriod()), this.rememberSelection();
        } else
          e3.removeAllRanges();
      }
    }
  }, Ba.prototype.startGracePeriod = function() {
    var e3 = this;
    clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function() {
      e3.gracePeriod = false, e3.selectionChanged() && e3.cm.operation(function() {
        return e3.cm.curOp.selectionChanged = true;
      });
    }, 20);
  }, Ba.prototype.showMultipleSelections = function(e3) {
    M(this.cm.display.cursorDiv, e3.cursors), M(this.cm.display.selectionDiv, e3.selection);
  }, Ba.prototype.rememberSelection = function() {
    var e3 = this.getSelection();
    this.lastAnchorNode = e3.anchorNode, this.lastAnchorOffset = e3.anchorOffset, this.lastFocusNode = e3.focusNode, this.lastFocusOffset = e3.focusOffset;
  }, Ba.prototype.selectionInEditor = function() {
    var e3 = this.getSelection();
    if (!e3.rangeCount)
      return false;
    var t3 = e3.getRangeAt(0).commonAncestorContainer;
    return _(this.div, t3);
  }, Ba.prototype.focus = function() {
    this.cm.options.readOnly != "nocursor" && (this.selectionInEditor() && N() == this.div || this.showSelection(this.prepareSelection(), true), this.div.focus());
  }, Ba.prototype.blur = function() {
    this.div.blur();
  }, Ba.prototype.getField = function() {
    return this.div;
  }, Ba.prototype.supportsTouch = function() {
    return true;
  }, Ba.prototype.receivedFocus = function() {
    var e3 = this;
    this.selectionInEditor() ? this.pollSelection() : Jn(this.cm, function() {
      return e3.cm.curOp.selectionChanged = true;
    }), this.polling.set(this.cm.options.pollInterval, function t3() {
      e3.cm.state.focused && (e3.pollSelection(), e3.polling.set(e3.cm.options.pollInterval, t3));
    });
  }, Ba.prototype.selectionChanged = function() {
    var e3 = this.getSelection();
    return e3.anchorNode != this.lastAnchorNode || e3.anchorOffset != this.lastAnchorOffset || e3.focusNode != this.lastFocusNode || e3.focusOffset != this.lastFocusOffset;
  }, Ba.prototype.pollSelection = function() {
    if (this.readDOMTimeout == null && !this.gracePeriod && this.selectionChanged()) {
      var e3 = this.getSelection(), t3 = this.cm;
      if (g && u && this.cm.display.gutterSpecs.length && function(e4) {
        for (var t4 = e4; t4; t4 = t4.parentNode)
          if (/CodeMirror-gutter-wrapper/.test(t4.className))
            return true;
        return false;
      }(e3.anchorNode))
        return this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs }), this.blur(), void this.focus();
      if (!this.composing) {
        this.rememberSelection();
        var r3 = $a(t3, e3.anchorNode, e3.anchorOffset), n3 = $a(t3, e3.focusNode, e3.focusOffset);
        r3 && n3 && Jn(t3, function() {
          Qi(t3.doc, Li(r3, n3), Z), (r3.bad || n3.bad) && (t3.curOp.selectionChanged = true);
        });
      }
    }
  }, Ba.prototype.pollContent = function() {
    this.readDOMTimeout != null && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);
    var e3, t3, r3, n3 = this.cm, i3 = n3.display, o2 = n3.doc.sel.primary(), a2 = o2.from(), l2 = o2.to();
    if (a2.ch == 0 && a2.line > n3.firstLine() && (a2 = et(a2.line - 1, Ke(n3.doc, a2.line - 1).length)), l2.ch == Ke(n3.doc, l2.line).text.length && l2.line < n3.lastLine() && (l2 = et(l2.line + 1, 0)), a2.line < i3.viewFrom || l2.line > i3.viewTo - 1)
      return false;
    a2.line == i3.viewFrom || (e3 = un(n3, a2.line)) == 0 ? (t3 = Xe(i3.view[0].line), r3 = i3.view[0].node) : (t3 = Xe(i3.view[e3].line), r3 = i3.view[e3 - 1].node.nextSibling);
    var s2, c2, u2 = un(n3, l2.line);
    if (u2 == i3.view.length - 1 ? (s2 = i3.viewTo - 1, c2 = i3.lineDiv.lastChild) : (s2 = Xe(i3.view[u2 + 1].line) - 1, c2 = i3.view[u2 + 1].node.previousSibling), !r3)
      return false;
    for (var d2 = n3.doc.splitLines(function(e4, t4, r4, n4, i4) {
      var o3 = "", a3 = false, l3 = e4.doc.lineSeparator(), s3 = false;
      function c3() {
        a3 && (o3 += l3, s3 && (o3 += l3), a3 = s3 = false);
      }
      function u3(e5) {
        e5 && (c3(), o3 += e5);
      }
      function d3(t5) {
        if (t5.nodeType == 1) {
          var r5 = t5.getAttribute("cm-text");
          if (r5)
            return void u3(r5);
          var o4, f3 = t5.getAttribute("cm-marker");
          if (f3) {
            var h3 = e4.findMarks(et(n4, 0), et(i4 + 1, 0), (g3 = +f3, function(e5) {
              return e5.id == g3;
            }));
            return void (h3.length && (o4 = h3[0].find(0)) && u3(Ge(e4.doc, o4.from, o4.to).join(l3)));
          }
          if (t5.getAttribute("contenteditable") == "false")
            return;
          var p3 = /^(pre|div|p|li|table|br)$/i.test(t5.nodeName);
          if (!/^br$/i.test(t5.nodeName) && t5.textContent.length == 0)
            return;
          p3 && c3();
          for (var m3 = 0; m3 < t5.childNodes.length; m3++)
            d3(t5.childNodes[m3]);
          /^(pre|p)$/i.test(t5.nodeName) && (s3 = true), p3 && (a3 = true);
        } else
          t5.nodeType == 3 && u3(t5.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
        var g3;
      }
      for (; d3(t4), t4 != r4; )
        t4 = t4.nextSibling, s3 = false;
      return o3;
    }(n3, r3, c2, t3, s2)), f2 = Ge(n3.doc, et(t3, 0), et(s2, Ke(n3.doc, s2).text.length)); d2.length > 1 && f2.length > 1; )
      if (V(d2) == V(f2))
        d2.pop(), f2.pop(), s2--;
      else {
        if (d2[0] != f2[0])
          break;
        d2.shift(), f2.shift(), t3++;
      }
    for (var h2 = 0, p2 = 0, m2 = d2[0], g2 = f2[0], v2 = Math.min(m2.length, g2.length); h2 < v2 && m2.charCodeAt(h2) == g2.charCodeAt(h2); )
      ++h2;
    for (var y2 = V(d2), b2 = V(f2), w2 = Math.min(y2.length - (d2.length == 1 ? h2 : 0), b2.length - (f2.length == 1 ? h2 : 0)); p2 < w2 && y2.charCodeAt(y2.length - p2 - 1) == b2.charCodeAt(b2.length - p2 - 1); )
      ++p2;
    if (d2.length == 1 && f2.length == 1 && t3 == a2.line)
      for (; h2 && h2 > a2.ch && y2.charCodeAt(y2.length - p2 - 1) == b2.charCodeAt(b2.length - p2 - 1); )
        h2--, p2++;
    d2[d2.length - 1] = y2.slice(0, y2.length - p2).replace(/^\u200b+/, ""), d2[0] = d2[0].slice(h2).replace(/\u200b+$/, "");
    var k2 = et(t3, h2), x2 = et(s2, f2.length ? V(f2).length - p2 : 0);
    return d2.length > 1 || d2[0] || tt(k2, x2) ? (po(n3.doc, d2, k2, x2, "+input"), true) : void 0;
  }, Ba.prototype.ensurePolled = function() {
    this.forceCompositionEnd();
  }, Ba.prototype.reset = function() {
    this.forceCompositionEnd();
  }, Ba.prototype.forceCompositionEnd = function() {
    this.composing && (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus());
  }, Ba.prototype.readFromDOMSoon = function() {
    var e3 = this;
    this.readDOMTimeout == null && (this.readDOMTimeout = setTimeout(function() {
      if (e3.readDOMTimeout = null, e3.composing) {
        if (!e3.composing.done)
          return;
        e3.composing = null;
      }
      e3.updateFromDOM();
    }, 80));
  }, Ba.prototype.updateFromDOM = function() {
    var e3 = this;
    !this.cm.isReadOnly() && this.pollContent() || Jn(this.cm, function() {
      return dn(e3.cm);
    });
  }, Ba.prototype.setUneditable = function(e3) {
    e3.contentEditable = "false";
  }, Ba.prototype.onKeyPress = function(e3) {
    e3.charCode == 0 || this.composing || (e3.preventDefault(), this.cm.isReadOnly() || ei(this.cm, Oa)(this.cm, String.fromCharCode(e3.charCode == null ? e3.keyCode : e3.charCode), 0));
  }, Ba.prototype.readOnlyChanged = function(e3) {
    this.div.contentEditable = (e3 != "nocursor") + "";
  }, Ba.prototype.onContextMenu = function() {
  }, Ba.prototype.resetPosition = function() {
  }, Ba.prototype.needsContentAttribute = true;
  var Ra = function(e3) {
    this.cm = e3, this.prevInput = "", this.pollingFast = false, this.polling = new H(), this.hasSelection = false, this.composing = null;
  };
  Ra.prototype.init = function(e3) {
    var t3 = this, r3 = this, n3 = this.cm;
    this.createField(e3);
    var i3 = this.textarea;
    function o2(e4) {
      if (!me(n3, e4)) {
        if (n3.somethingSelected())
          za({ lineWise: false, text: n3.getSelections() });
        else {
          if (!n3.options.lineWiseCopyCut)
            return;
          var t4 = Pa(n3);
          za({ lineWise: true, text: t4.text }), e4.type == "cut" ? n3.setSelections(t4.ranges, null, Z) : (r3.prevInput = "", i3.value = t4.text.join("\n"), W(i3));
        }
        e4.type == "cut" && (n3.state.cutIncoming = +new Date());
      }
    }
    e3.wrapper.insertBefore(this.wrapper, e3.wrapper.firstChild), m && (i3.style.width = "0px"), de(i3, "input", function() {
      a && l >= 9 && t3.hasSelection && (t3.hasSelection = null), r3.poll();
    }), de(i3, "paste", function(e4) {
      me(n3, e4) || _a4(e4, n3) || (n3.state.pasteIncoming = +new Date(), r3.fastPoll());
    }), de(i3, "cut", o2), de(i3, "copy", o2), de(e3.scroller, "paste", function(t4) {
      if (!kr(e3, t4) && !me(n3, t4)) {
        if (!i3.dispatchEvent)
          return n3.state.pasteIncoming = +new Date(), void r3.focus();
        var o3 = new Event("paste");
        o3.clipboardData = t4.clipboardData, i3.dispatchEvent(o3);
      }
    }), de(e3.lineSpace, "selectstart", function(t4) {
      kr(e3, t4) || be(t4);
    }), de(i3, "compositionstart", function() {
      var e4 = n3.getCursor("from");
      r3.composing && r3.composing.range.clear(), r3.composing = { start: e4, range: n3.markText(e4, n3.getCursor("to"), { className: "CodeMirror-composing" }) };
    }), de(i3, "compositionend", function() {
      r3.composing && (r3.poll(), r3.composing.range.clear(), r3.composing = null);
    });
  }, Ra.prototype.createField = function(e3) {
    this.wrapper = Wa(), this.textarea = this.wrapper.firstChild;
  }, Ra.prototype.screenReaderLabelChanged = function(e3) {
    e3 ? this.textarea.setAttribute("aria-label", e3) : this.textarea.removeAttribute("aria-label");
  }, Ra.prototype.prepareSelection = function() {
    var e3 = this.cm, t3 = e3.display, r3 = e3.doc, n3 = vn(e3);
    if (e3.options.moveInputWithCursor) {
      var i3 = Kr(e3, r3.sel.primary().head, "div"), o2 = t3.wrapper.getBoundingClientRect(), a2 = t3.lineDiv.getBoundingClientRect();
      n3.teTop = Math.max(0, Math.min(t3.wrapper.clientHeight - 10, i3.top + a2.top - o2.top)), n3.teLeft = Math.max(0, Math.min(t3.wrapper.clientWidth - 10, i3.left + a2.left - o2.left));
    }
    return n3;
  }, Ra.prototype.showSelection = function(e3) {
    var t3 = this.cm.display;
    M(t3.cursorDiv, e3.cursors), M(t3.selectionDiv, e3.selection), e3.teTop != null && (this.wrapper.style.top = e3.teTop + "px", this.wrapper.style.left = e3.teLeft + "px");
  }, Ra.prototype.reset = function(e3) {
    if (!this.contextMenuPending && !this.composing) {
      var t3 = this.cm;
      if (t3.somethingSelected()) {
        this.prevInput = "";
        var r3 = t3.getSelection();
        this.textarea.value = r3, t3.state.focused && W(this.textarea), a && l >= 9 && (this.hasSelection = r3);
      } else
        e3 || (this.prevInput = this.textarea.value = "", a && l >= 9 && (this.hasSelection = null));
    }
  }, Ra.prototype.getField = function() {
    return this.textarea;
  }, Ra.prototype.supportsTouch = function() {
    return false;
  }, Ra.prototype.focus = function() {
    if (this.cm.options.readOnly != "nocursor" && (!v || N() != this.textarea))
      try {
        this.textarea.focus();
      } catch (e3) {
      }
  }, Ra.prototype.blur = function() {
    this.textarea.blur();
  }, Ra.prototype.resetPosition = function() {
    this.wrapper.style.top = this.wrapper.style.left = 0;
  }, Ra.prototype.receivedFocus = function() {
    this.slowPoll();
  }, Ra.prototype.slowPoll = function() {
    var e3 = this;
    this.pollingFast || this.polling.set(this.cm.options.pollInterval, function() {
      e3.poll(), e3.cm.state.focused && e3.slowPoll();
    });
  }, Ra.prototype.fastPoll = function() {
    var e3 = false, t3 = this;
    t3.pollingFast = true, t3.polling.set(20, function r3() {
      t3.poll() || e3 ? (t3.pollingFast = false, t3.slowPoll()) : (e3 = true, t3.polling.set(60, r3));
    });
  }, Ra.prototype.poll = function() {
    var e3 = this, t3 = this.cm, r3 = this.textarea, n3 = this.prevInput;
    if (this.contextMenuPending || !t3.state.focused || Ne(r3) && !n3 && !this.composing || t3.isReadOnly() || t3.options.disableInput || t3.state.keySeq)
      return false;
    var i3 = r3.value;
    if (i3 == n3 && !t3.somethingSelected())
      return false;
    if (a && l >= 9 && this.hasSelection === i3 || y && /[\uf700-\uf7ff]/.test(i3))
      return t3.display.input.reset(), false;
    if (t3.doc.sel == t3.display.selForContextMenu) {
      var o2 = i3.charCodeAt(0);
      if (o2 != 8203 || n3 || (n3 = "\u200B"), o2 == 8666)
        return this.reset(), this.cm.execCommand("undo");
    }
    for (var s2 = 0, c2 = Math.min(n3.length, i3.length); s2 < c2 && n3.charCodeAt(s2) == i3.charCodeAt(s2); )
      ++s2;
    return Jn(t3, function() {
      Oa(t3, i3.slice(s2), n3.length - s2, null, e3.composing ? "*compose" : null), i3.length > 1e3 || i3.indexOf("\n") > -1 ? r3.value = e3.prevInput = "" : e3.prevInput = i3, e3.composing && (e3.composing.range.clear(), e3.composing.range = t3.markText(e3.composing.start, t3.getCursor("to"), { className: "CodeMirror-composing" }));
    }), true;
  }, Ra.prototype.ensurePolled = function() {
    this.pollingFast && this.poll() && (this.pollingFast = false);
  }, Ra.prototype.onKeyPress = function() {
    a && l >= 9 && (this.hasSelection = null), this.fastPoll();
  }, Ra.prototype.onContextMenu = function(e3) {
    var t3 = this, r3 = t3.cm, n3 = r3.display, i3 = t3.textarea;
    t3.contextMenuPending && t3.contextMenuPending();
    var o2 = cn(r3, e3), c2 = n3.scroller.scrollTop;
    if (o2 && !d) {
      r3.options.resetSelectionOnContextMenu && r3.doc.sel.contains(o2) == -1 && ei(r3, Qi)(r3.doc, Li(o2), Z);
      var u2, f2 = i3.style.cssText, h2 = t3.wrapper.style.cssText, p2 = t3.wrapper.offsetParent.getBoundingClientRect();
      if (t3.wrapper.style.cssText = "position: static", i3.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e3.clientY - p2.top - 5) + "px; left: " + (e3.clientX - p2.left - 5) + "px;\n      z-index: 1000; background: " + (a ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", s && (u2 = window.scrollY), n3.input.focus(), s && window.scrollTo(null, u2), n3.input.reset(), r3.somethingSelected() || (i3.value = t3.prevInput = " "), t3.contextMenuPending = v2, n3.selForContextMenu = r3.doc.sel, clearTimeout(n3.detectingSelectAll), a && l >= 9 && g2(), C) {
        xe(e3);
        var m2 = function() {
          he(window, "mouseup", m2), setTimeout(v2, 20);
        };
        de(window, "mouseup", m2);
      } else
        setTimeout(v2, 50);
    }
    function g2() {
      if (i3.selectionStart != null) {
        var e4 = r3.somethingSelected(), o3 = "\u200B" + (e4 ? i3.value : "");
        i3.value = "\u21DA", i3.value = o3, t3.prevInput = e4 ? "" : "\u200B", i3.selectionStart = 1, i3.selectionEnd = o3.length, n3.selForContextMenu = r3.doc.sel;
      }
    }
    function v2() {
      if (t3.contextMenuPending == v2 && (t3.contextMenuPending = false, t3.wrapper.style.cssText = h2, i3.style.cssText = f2, a && l < 9 && n3.scrollbars.setScrollTop(n3.scroller.scrollTop = c2), i3.selectionStart != null)) {
        (!a || a && l < 9) && g2();
        var e4 = 0, o3 = function() {
          n3.selForContextMenu == r3.doc.sel && i3.selectionStart == 0 && i3.selectionEnd > 0 && t3.prevInput == "\u200B" ? ei(r3, ao)(r3) : e4++ < 10 ? n3.detectingSelectAll = setTimeout(o3, 500) : (n3.selForContextMenu = null, n3.input.reset());
        };
        n3.detectingSelectAll = setTimeout(o3, 200);
      }
    }
  }, Ra.prototype.readOnlyChanged = function(e3) {
    e3 || this.reset(), this.textarea.disabled = e3 == "nocursor", this.textarea.readOnly = !!e3;
  }, Ra.prototype.setUneditable = function() {
  }, Ra.prototype.needsContentAttribute = false, function(e3) {
    var t3 = e3.optionHandlers;
    function r3(r4, n3, i3, o2) {
      e3.defaults[r4] = n3, i3 && (t3[r4] = o2 ? function(e4, t4, r5) {
        r5 != wa && i3(e4, t4, r5);
      } : i3);
    }
    e3.defineOption = r3, e3.Init = wa, r3("value", "", function(e4, t4) {
      return e4.setValue(t4);
    }, true), r3("mode", null, function(e4, t4) {
      e4.doc.modeOption = t4, Oi(e4);
    }, true), r3("indentUnit", 2, Oi, true), r3("indentWithTabs", false), r3("smartIndent", true), r3("tabSize", 4, function(e4) {
      _i(e4), Hr(e4), dn(e4);
    }, true), r3("lineSeparator", null, function(e4, t4) {
      if (e4.doc.lineSep = t4, t4) {
        var r4 = [], n3 = e4.doc.first;
        e4.doc.iter(function(e5) {
          for (var i4 = 0; ; ) {
            var o2 = e5.text.indexOf(t4, i4);
            if (o2 == -1)
              break;
            i4 = o2 + t4.length, r4.push(et(n3, o2));
          }
          n3++;
        });
        for (var i3 = r4.length - 1; i3 >= 0; i3--)
          po(e4.doc, t4, r4[i3], et(r4[i3].line, r4[i3].ch + t4.length));
      }
    }), r3("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g, function(e4, t4, r4) {
      e4.state.specialChars = RegExp(t4.source + (t4.test("	") ? "" : "|	"), "g"), r4 != wa && e4.refresh();
    }), r3("specialCharPlaceholder", Qt, function(e4) {
      return e4.refresh();
    }, true), r3("electricChars", true), r3("inputStyle", v ? "contenteditable" : "textarea", function() {
      throw Error("inputStyle can not (yet) be changed in a running editor");
    }, true), r3("spellcheck", false, function(e4, t4) {
      return e4.getInputField().spellcheck = t4;
    }, true), r3("autocorrect", false, function(e4, t4) {
      return e4.getInputField().autocorrect = t4;
    }, true), r3("autocapitalize", false, function(e4, t4) {
      return e4.getInputField().autocapitalize = t4;
    }, true), r3("rtlMoveVisually", !w), r3("wholeLineUpdateBefore", true), r3("theme", "default", function(e4) {
      ba(e4), mi(e4);
    }, true), r3("keyMap", "default", function(e4, t4, r4) {
      var n3 = Vo(t4), i3 = r4 != wa && Vo(r4);
      i3 && i3.detach && i3.detach(e4, n3), n3.attach && n3.attach(e4, i3 || null);
    }), r3("extraKeys", null), r3("configureMouse", null), r3("lineWrapping", false, Sa, true), r3("gutters", [], function(e4, t4) {
      e4.display.gutterSpecs = hi(t4, e4.options.lineNumbers), mi(e4);
    }, true), r3("fixedGutter", true, function(e4, t4) {
      e4.display.gutters.style.left = t4 ? an(e4.display) + "px" : "0", e4.refresh();
    }, true), r3("coverGutterNextToScrollbar", false, function(e4) {
      return $n(e4);
    }, true), r3("scrollbarStyle", "native", function(e4) {
      Un(e4), $n(e4), e4.display.scrollbars.setScrollTop(e4.doc.scrollTop), e4.display.scrollbars.setScrollLeft(e4.doc.scrollLeft);
    }, true), r3("lineNumbers", false, function(e4, t4) {
      e4.display.gutterSpecs = hi(e4.options.gutters, t4), mi(e4);
    }, true), r3("firstLineNumber", 1, mi, true), r3("lineNumberFormatter", function(e4) {
      return e4;
    }, mi, true), r3("showCursorWhenSelecting", false, gn, true), r3("resetSelectionOnContextMenu", true), r3("lineWiseCopyCut", true), r3("pasteLinesPerSelection", true), r3("selectionsMayTouch", false), r3("readOnly", false, function(e4, t4) {
      t4 == "nocursor" && (Ln(e4), e4.display.input.blur()), e4.display.input.readOnlyChanged(t4);
    }), r3("screenReaderLabel", null, function(e4, t4) {
      t4 = t4 === "" ? null : t4, e4.display.input.screenReaderLabelChanged(t4);
    }), r3("disableInput", false, function(e4, t4) {
      t4 || e4.display.input.reset();
    }, true), r3("dragDrop", true, Ca), r3("allowDropFileTypes", null), r3("cursorBlinkRate", 530), r3("cursorScrollMargin", 0), r3("cursorHeight", 1, gn, true), r3("singleCursorHeightPerLine", true, gn, true), r3("workTime", 100), r3("workDelay", 100), r3("flattenSpans", true, _i, true), r3("addModeClass", false, _i, true), r3("pollInterval", 100), r3("undoDepth", 200, function(e4, t4) {
      return e4.doc.history.undoDepth = t4;
    }), r3("historyEventDelay", 1250), r3("viewportMargin", 10, function(e4) {
      return e4.refresh();
    }, true), r3("maxHighlightLength", 1e4, _i, true), r3("moveInputWithCursor", true, function(e4, t4) {
      t4 || e4.display.input.resetPosition();
    }), r3("tabindex", null, function(e4, t4) {
      return e4.display.input.getField().tabIndex = t4 || "";
    }), r3("autofocus", null), r3("direction", "ltr", function(e4, t4) {
      return e4.doc.setDirection(t4);
    }, true), r3("phrases", null);
  }(La), function(e3) {
    var t3 = e3.optionHandlers, r3 = e3.helpers = {};
    e3.prototype = { constructor: e3, focus: function() {
      window.focus(), this.display.input.focus();
    }, setOption: function(e4, r4) {
      var n3 = this.options, i3 = n3[e4];
      n3[e4] == r4 && e4 != "mode" || (n3[e4] = r4, t3.hasOwnProperty(e4) && ei(this, t3[e4])(this, r4, i3), pe(this, "optionChange", this, e4));
    }, getOption: function(e4) {
      return this.options[e4];
    }, getDoc: function() {
      return this.doc;
    }, addKeyMap: function(e4, t4) {
      this.state.keyMaps[t4 ? "push" : "unshift"](Vo(e4));
    }, removeKeyMap: function(e4) {
      for (var t4 = this.state.keyMaps, r4 = 0; r4 < t4.length; ++r4)
        if (t4[r4] == e4 || t4[r4].name == e4)
          return t4.splice(r4, 1), true;
    }, addOverlay: ti(function(t4, r4) {
      var n3 = t4.token ? t4 : e3.getMode(this.options, t4);
      if (n3.startState)
        throw Error("Overlays may not be stateful.");
      !function(e4, t5, r5) {
        for (var n4 = 0, i3 = r5(t5); n4 < e4.length && r5(e4[n4]) <= i3; )
          n4++;
        e4.splice(n4, 0, t5);
      }(this.state.overlays, { mode: n3, modeSpec: t4, opaque: r4 && r4.opaque, priority: r4 && r4.priority || 0 }, function(e4) {
        return e4.priority;
      }), this.state.modeGen++, dn(this);
    }), removeOverlay: ti(function(e4) {
      for (var t4 = this.state.overlays, r4 = 0; r4 < t4.length; ++r4) {
        var n3 = t4[r4].modeSpec;
        if (n3 == e4 || typeof e4 == "string" && n3.name == e4)
          return t4.splice(r4, 1), this.state.modeGen++, void dn(this);
      }
    }), indentLine: ti(function(e4, t4, r4) {
      typeof t4 != "string" && typeof t4 != "number" && (t4 = t4 == null ? this.options.smartIndent ? "smart" : "prev" : t4 ? "add" : "subtract"), Qe(this.doc, e4) && Aa(this, e4, t4, r4);
    }), indentSelection: ti(function(e4) {
      for (var t4 = this.doc.sel.ranges, r4 = -1, n3 = 0; n3 < t4.length; n3++) {
        var i3 = t4[n3];
        if (i3.empty())
          i3.head.line > r4 && (Aa(this, i3.head.line, e4, true), r4 = i3.head.line, n3 == this.doc.sel.primIndex && _n(this));
        else {
          var o2 = i3.from(), a2 = i3.to(), l2 = Math.max(r4, o2.line);
          r4 = Math.min(this.lastLine(), a2.line - (a2.ch ? 0 : 1)) + 1;
          for (var s2 = l2; s2 < r4; ++s2)
            Aa(this, s2, e4);
          var c2 = this.doc.sel.ranges;
          o2.ch == 0 && t4.length == c2.length && c2[n3].from().ch > 0 && qi(this.doc, n3, new Ci(o2, c2[n3].to()), Z);
        }
      }
    }), getTokenAt: function(e4, t4) {
      return yt(this, e4, t4);
    }, getLineTokens: function(e4, t4) {
      return yt(this, et(e4), t4, true);
    }, getTokenTypeAt: function(e4) {
      e4 = lt(this.doc, e4);
      var t4, r4 = ft(this, Ke(this.doc, e4.line)), n3 = 0, i3 = (r4.length - 1) / 2, o2 = e4.ch;
      if (o2 == 0)
        t4 = r4[2];
      else
        for (; ; ) {
          var a2 = n3 + i3 >> 1;
          if ((a2 ? r4[2 * a2 - 1] : 0) >= o2)
            i3 = a2;
          else {
            if (!(r4[2 * a2 + 1] < o2)) {
              t4 = r4[2 * a2 + 2];
              break;
            }
            n3 = a2 + 1;
          }
        }
      var l2 = t4 ? t4.indexOf("overlay ") : -1;
      return l2 < 0 ? t4 : l2 == 0 ? null : t4.slice(0, l2 - 1);
    }, getModeAt: function(t4) {
      var r4 = this.doc.mode;
      return r4.innerMode ? e3.innerMode(r4, this.getTokenAt(t4).state).mode : r4;
    }, getHelper: function(e4, t4) {
      return this.getHelpers(e4, t4)[0];
    }, getHelpers: function(e4, t4) {
      var n3 = [];
      if (!r3.hasOwnProperty(t4))
        return n3;
      var i3 = r3[t4], o2 = this.getModeAt(e4);
      if (typeof o2[t4] == "string")
        i3[o2[t4]] && n3.push(i3[o2[t4]]);
      else if (o2[t4])
        for (var a2 = 0; a2 < o2[t4].length; a2++) {
          var l2 = i3[o2[t4][a2]];
          l2 && n3.push(l2);
        }
      else
        o2.helperType && i3[o2.helperType] ? n3.push(i3[o2.helperType]) : i3[o2.name] && n3.push(i3[o2.name]);
      for (var s2 = 0; s2 < i3._global.length; s2++) {
        var c2 = i3._global[s2];
        c2.pred(o2, this) && I(n3, c2.val) == -1 && n3.push(c2.val);
      }
      return n3;
    }, getStateAfter: function(e4, t4) {
      var r4 = this.doc;
      return ht(this, (e4 = at(r4, e4 == null ? r4.first + r4.size - 1 : e4)) + 1, t4).state;
    }, cursorCoords: function(e4, t4) {
      var r4 = this.doc.sel.primary();
      return Kr(this, e4 == null ? r4.head : typeof e4 == "object" ? lt(this.doc, e4) : e4 ? r4.from() : r4.to(), t4 || "page");
    }, charCoords: function(e4, t4) {
      return jr(this, lt(this.doc, e4), t4 || "page");
    }, coordsChar: function(e4, t4) {
      return qr(this, (e4 = Ur(this, e4, t4 || "page")).left, e4.top);
    }, lineAtHeight: function(e4, t4) {
      return e4 = Ur(this, { top: e4, left: 0 }, t4 || "page").top, Ye(this.doc, e4 + this.display.viewOffset);
    }, heightAtLine: function(e4, t4, r4) {
      var n3, i3 = false;
      if (typeof e4 == "number") {
        var o2 = this.doc.first + this.doc.size - 1;
        e4 < this.doc.first ? e4 = this.doc.first : e4 > o2 && (e4 = o2, i3 = true), n3 = Ke(this.doc, e4);
      } else
        n3 = e4;
      return Rr(this, n3, { top: 0, left: 0 }, t4 || "page", r4 || i3).top + (i3 ? this.doc.height - Rt(n3) : 0);
    }, defaultTextHeight: function() {
      return rn(this.display);
    }, defaultCharWidth: function() {
      return nn(this.display);
    }, getViewport: function() {
      return { from: this.display.viewFrom, to: this.display.viewTo };
    }, addWidget: function(e4, t4, r4, n3, i3) {
      var o2, a2, l2 = this.display, s2 = (e4 = Kr(this, lt(this.doc, e4))).bottom, c2 = e4.left;
      if (t4.style.position = "absolute", t4.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t4), l2.sizer.appendChild(t4), n3 == "over")
        s2 = e4.top;
      else if (n3 == "above" || n3 == "near") {
        var u2 = Math.max(l2.wrapper.clientHeight, this.doc.height), d2 = Math.max(l2.sizer.clientWidth, l2.lineSpace.clientWidth);
        (n3 == "above" || e4.bottom + t4.offsetHeight > u2) && e4.top > t4.offsetHeight ? s2 = e4.top - t4.offsetHeight : e4.bottom + t4.offsetHeight <= u2 && (s2 = e4.bottom), c2 + t4.offsetWidth > d2 && (c2 = d2 - t4.offsetWidth);
      }
      t4.style.top = s2 + "px", t4.style.left = t4.style.right = "", i3 == "right" ? (c2 = l2.sizer.clientWidth - t4.offsetWidth, t4.style.right = "0px") : (i3 == "left" ? c2 = 0 : i3 == "middle" && (c2 = (l2.sizer.clientWidth - t4.offsetWidth) / 2), t4.style.left = c2 + "px"), r4 && ((a2 = zn(o2 = this, { left: c2, top: s2, right: c2 + t4.offsetWidth, bottom: s2 + t4.offsetHeight })).scrollTop != null && Wn(o2, a2.scrollTop), a2.scrollLeft != null && Fn(o2, a2.scrollLeft));
    }, triggerOnKeyDown: ti(sa), triggerOnKeyPress: ti(ua), triggerOnKeyUp: ca, triggerOnMouseDown: ti(pa), execCommand: function(e4) {
      if (Jo.hasOwnProperty(e4))
        return Jo[e4].call(null, this);
    }, triggerElectric: ti(function(e4) {
      Na(this, e4);
    }), findPosH: function(e4, t4, r4, n3) {
      var i3 = 1;
      t4 < 0 && (i3 = -1, t4 = -t4);
      for (var o2 = lt(this.doc, e4), a2 = 0; a2 < t4 && !(o2 = Ea(this.doc, o2, i3, r4, n3)).hitSide; ++a2)
        ;
      return o2;
    }, moveH: ti(function(e4, t4) {
      var r4 = this;
      this.extendSelectionsBy(function(n3) {
        return r4.display.shift || r4.doc.extend || n3.empty() ? Ea(r4.doc, n3.head, e4, t4, r4.options.rtlMoveVisually) : e4 < 0 ? n3.from() : n3.to();
      }, U);
    }), deleteH: ti(function(e4, t4) {
      var r4 = this.doc.sel, n3 = this.doc;
      r4.somethingSelected() ? n3.replaceSelection("", null, "+delete") : qo(this, function(r5) {
        var i3 = Ea(n3, r5.head, e4, t4, false);
        return e4 < 0 ? { from: i3, to: r5.head } : { from: r5.head, to: i3 };
      });
    }), findPosV: function(e4, t4, r4, n3) {
      var i3 = 1, o2 = n3;
      t4 < 0 && (i3 = -1, t4 = -t4);
      for (var a2 = lt(this.doc, e4), l2 = 0; l2 < t4; ++l2) {
        var s2 = Kr(this, a2, "div");
        if (o2 == null ? o2 = s2.left : s2.left = o2, (a2 = Fa(this, s2, i3, r4)).hitSide)
          break;
      }
      return a2;
    }, moveV: ti(function(e4, t4) {
      var r4 = this, n3 = this.doc, i3 = [], o2 = !this.display.shift && !n3.extend && n3.sel.somethingSelected();
      if (n3.extendSelectionsBy(function(a3) {
        if (o2)
          return e4 < 0 ? a3.from() : a3.to();
        var l2 = Kr(r4, a3.head, "div");
        a3.goalColumn != null && (l2.left = a3.goalColumn), i3.push(l2.left);
        var s2 = Fa(r4, l2, e4, t4);
        return t4 == "page" && a3 == n3.sel.primary() && On(r4, jr(r4, s2, "div").top - l2.top), s2;
      }, U), i3.length)
        for (var a2 = 0; a2 < n3.sel.ranges.length; a2++)
          n3.sel.ranges[a2].goalColumn = i3[a2];
    }), findWordAt: function(e4) {
      var t4 = Ke(this.doc, e4.line).text, r4 = e4.ch, n3 = e4.ch;
      if (t4) {
        var i3 = this.getHelper(e4, "wordChars");
        e4.sticky != "before" && n3 != t4.length || !r4 ? ++n3 : --r4;
        for (var o2 = t4.charAt(r4), a2 = ee(o2, i3) ? function(e5) {
          return ee(e5, i3);
        } : /\s/.test(o2) ? function(e5) {
          return /\s/.test(e5);
        } : function(e5) {
          return !/\s/.test(e5) && !ee(e5);
        }; r4 > 0 && a2(t4.charAt(r4 - 1)); )
          --r4;
        for (; n3 < t4.length && a2(t4.charAt(n3)); )
          ++n3;
      }
      return new Ci(et(e4.line, r4), et(e4.line, n3));
    }, toggleOverwrite: function(e4) {
      e4 != null && e4 == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? P(this.display.cursorDiv, "CodeMirror-overwrite") : T(this.display.cursorDiv, "CodeMirror-overwrite"), pe(this, "overwriteToggle", this, this.state.overwrite));
    }, hasFocus: function() {
      return this.display.input.getField() == N();
    }, isReadOnly: function() {
      return !(!this.options.readOnly && !this.doc.cantEdit);
    }, scrollTo: ti(function(e4, t4) {
      Nn(this, e4, t4);
    }), getScrollInfo: function() {
      var e4 = this.display.scroller;
      return { left: e4.scrollLeft, top: e4.scrollTop, height: e4.scrollHeight - Lr(this) - this.display.barHeight, width: e4.scrollWidth - Lr(this) - this.display.barWidth, clientHeight: Ar(this), clientWidth: Tr(this) };
    }, scrollIntoView: ti(function(e4, t4) {
      e4 == null ? (e4 = { from: this.doc.sel.primary().head, to: null }, t4 == null && (t4 = this.options.cursorScrollMargin)) : typeof e4 == "number" ? e4 = { from: et(e4, 0), to: null } : e4.from == null && (e4 = { from: e4, to: null }), e4.to || (e4.to = e4.from), e4.margin = t4 || 0, e4.from.line != null ? function(e5, t5) {
        Pn(e5), e5.curOp.scrollToPos = t5;
      }(this, e4) : Dn(this, e4.from, e4.to, e4.margin);
    }), setSize: ti(function(e4, t4) {
      var r4 = this, n3 = function(e5) {
        return typeof e5 == "number" || /^\d+$/.test(e5 + "") ? e5 + "px" : e5;
      };
      e4 != null && (this.display.wrapper.style.width = n3(e4)), t4 != null && (this.display.wrapper.style.height = n3(t4)), this.options.lineWrapping && Br(this);
      var i3 = this.display.viewFrom;
      this.doc.iter(i3, this.display.viewTo, function(e5) {
        if (e5.widgets) {
          for (var t5 = 0; t5 < e5.widgets.length; t5++)
            if (e5.widgets[t5].noHScroll) {
              fn2(r4, i3, "widget");
              break;
            }
        }
        ++i3;
      }), this.curOp.forceUpdate = true, pe(this, "refresh", this);
    }), operation: function(e4) {
      return Jn(this, e4);
    }, startOperation: function() {
      return Kn(this);
    }, endOperation: function() {
      return Gn(this);
    }, refresh: ti(function() {
      var e4 = this.display.cachedTextHeight;
      dn(this), this.curOp.forceUpdate = true, Hr(this), Nn(this, this.doc.scrollLeft, this.doc.scrollTop), ci(this.display), (e4 == null || Math.abs(e4 - rn(this.display)) > 0.5 || this.options.lineWrapping) && sn(this), pe(this, "refresh", this);
    }), swapDoc: ti(function(e4) {
      var t4 = this.doc;
      return t4.cm = null, this.state.selectingText && this.state.selectingText(), Wi(this, e4), Hr(this), this.display.input.reset(), Nn(this, e4.scrollLeft, e4.scrollTop), this.curOp.forceScroll = true, lr(this, "swapDoc", this, t4), t4;
    }), phrase: function(e4) {
      var t4 = this.options.phrases;
      return t4 && Object.prototype.hasOwnProperty.call(t4, e4) ? t4[e4] : e4;
    }, getInputField: function() {
      return this.display.input.getField();
    }, getWrapperElement: function() {
      return this.display.wrapper;
    }, getScrollerElement: function() {
      return this.display.scroller;
    }, getGutterElement: function() {
      return this.display.gutters;
    } }, ye(e3), e3.registerHelper = function(t4, n3, i3) {
      r3.hasOwnProperty(t4) || (r3[t4] = e3[t4] = { _global: [] }), r3[t4][n3] = i3;
    }, e3.registerGlobalHelper = function(t4, n3, i3, o2) {
      e3.registerHelper(t4, n3, o2), r3[t4]._global.push({ pred: i3, val: o2 });
    };
  }(La);
  var Ua = "iter insert remove copy getEditor constructor".split(" ");
  for (var ja in Oo.prototype)
    Oo.prototype.hasOwnProperty(ja) && I(Ua, ja) < 0 && (La.prototype[ja] = function(e3) {
      return function() {
        return e3.apply(this.doc, arguments);
      };
    }(Oo.prototype[ja]));
  return ye(Oo), La.inputStyles = { textarea: Ra, contenteditable: Ba }, La.defineMode = function(e3) {
    La.defaults.mode || e3 == "null" || (La.defaults.mode = e3), Fe.apply(this, arguments);
  }, La.defineMIME = function(e3, t3) {
    Ee[e3] = t3;
  }, La.defineMode("null", function() {
    return { token: function(e3) {
      return e3.skipToEnd();
    } };
  }), La.defineMIME("text/plain", "null"), La.defineExtension = function(e3, t3) {
    La.prototype[e3] = t3;
  }, La.defineDocExtension = function(e3, t3) {
    Oo.prototype[e3] = t3;
  }, La.fromTextArea = function(e3, t3) {
    if ((t3 = t3 ? F(t3) : {}).value = e3.value, !t3.tabindex && e3.tabIndex && (t3.tabindex = e3.tabIndex), !t3.placeholder && e3.placeholder && (t3.placeholder = e3.placeholder), t3.autofocus == null) {
      var r3 = N();
      t3.autofocus = r3 == e3 || e3.getAttribute("autofocus") != null && r3 == document.body;
    }
    function n3() {
      e3.value = l2.getValue();
    }
    var i3;
    if (e3.form && (de(e3.form, "submit", n3), !t3.leaveSubmitMethodAlone)) {
      var o2 = e3.form;
      i3 = o2.submit;
      try {
        var a2 = o2.submit = function() {
          n3(), o2.submit = i3, o2.submit(), o2.submit = a2;
        };
      } catch (e4) {
      }
    }
    t3.finishInit = function(r4) {
      r4.save = n3, r4.getTextArea = function() {
        return e3;
      }, r4.toTextArea = function() {
        r4.toTextArea = isNaN, n3(), e3.parentNode.removeChild(r4.getWrapperElement()), e3.style.display = "", e3.form && (he(e3.form, "submit", n3), t3.leaveSubmitMethodAlone || typeof e3.form.submit != "function" || (e3.form.submit = i3));
      };
    }, e3.style.display = "none";
    var l2 = La(function(t4) {
      return e3.parentNode.insertBefore(t4, e3.nextSibling);
    }, t3);
    return l2;
  }, function(e3) {
    e3.off = he, e3.on = de, e3.wheelEventPixels = wi, e3.Doc = Oo, e3.splitLines = _e, e3.countColumn = B, e3.findColumn = j, e3.isWordChar = J, e3.Pass = $, e3.signal = pe, e3.Line = Kt, e3.changeEnd = Ti, e3.scrollbarModel = Rn, e3.Pos = et, e3.cmpPos = tt, e3.modes = We, e3.mimeModes = Ee, e3.resolveMode = Be, e3.getMode = He, e3.modeExtensions = Ie, e3.extendMode = $e, e3.copyState = Ze, e3.startState = Ue, e3.innerMode = Re, e3.commands = Jo, e3.keyMap = $o, e3.keyName = Go, e3.isModifierKey = jo, e3.lookupKey = Uo, e3.normalizeKeyMap = Ro, e3.StringStream = je, e3.SharedTextMarker = To, e3.TextMarker = So, e3.LineWidget = ko, e3.e_preventDefault = be, e3.e_stopPropagation = we, e3.e_stop = xe, e3.addClass = P, e3.contains = _, e3.rmClass = T, e3.keyNames = Fo;
  }(La), La.version = "5.60.0", La;
}, (window || self).CodeMirror = e(), function(e2) {
  function t2(t3, r3, i2, o) {
    if (i2 && i2.call) {
      var a = i2;
      i2 = null;
    } else
      a = n2(t3, i2, "rangeFinder");
    typeof r3 == "number" && (r3 = e2.Pos(r3, 0));
    var l = n2(t3, i2, "minFoldSize");
    function s(e3) {
      var n3 = a(t3, r3);
      if (!n3 || n3.to.line - n3.from.line < l)
        return null;
      for (var i3 = t3.findMarksAt(n3.from), s2 = 0; s2 < i3.length; ++s2)
        if (i3[s2].__isFold && o !== "fold") {
          if (!e3)
            return null;
          n3.cleared = true, i3[s2].clear();
        }
      return n3;
    }
    var c = s(true);
    if (n2(t3, i2, "scanUp"))
      for (; !c && r3.line > t3.firstLine(); )
        r3 = e2.Pos(r3.line - 1, 0), c = s(false);
    if (c && !c.cleared && o !== "unfold") {
      var u = function(e3, t4, r4) {
        var i3 = n2(e3, t4, "widget");
        if (typeof i3 == "function" && (i3 = i3(r4.from, r4.to)), typeof i3 == "string") {
          var o2 = document.createTextNode(i3);
          (i3 = document.createElement("span")).appendChild(o2), i3.className = "CodeMirror-foldmarker";
        } else
          i3 && (i3 = i3.cloneNode(true));
        return i3;
      }(t3, i2, c);
      e2.on(u, "mousedown", function(t4) {
        d.clear(), e2.e_preventDefault(t4);
      });
      var d = t3.markText(c.from, c.to, { replacedWith: u, clearOnEnter: n2(t3, i2, "clearOnEnter"), __isFold: true });
      d.on("clear", function(r4, n3) {
        e2.signal(t3, "unfold", t3, r4, n3);
      }), e2.signal(t3, "fold", t3, c.from, c.to);
    }
  }
  e2.newFoldFunction = function(e3, r3) {
    return function(n3, i2) {
      t2(n3, i2, { rangeFinder: e3, widget: r3 });
    };
  }, e2.defineExtension("foldCode", function(e3, r3, n3) {
    t2(this, e3, r3, n3);
  }), e2.defineExtension("isFolded", function(e3) {
    for (var t3 = this.findMarksAt(e3), r3 = 0; r3 < t3.length; ++r3)
      if (t3[r3].__isFold)
        return true;
  }), e2.commands.toggleFold = function(e3) {
    e3.foldCode(e3.getCursor());
  }, e2.commands.fold = function(e3) {
    e3.foldCode(e3.getCursor(), null, "fold");
  }, e2.commands.unfold = function(e3) {
    e3.foldCode(e3.getCursor(), null, "unfold");
  }, e2.commands.foldAll = function(t3) {
    t3.operation(function() {
      for (var r3 = t3.firstLine(), n3 = t3.lastLine(); r3 <= n3; r3++)
        t3.foldCode(e2.Pos(r3, 0), null, "fold");
    });
  }, e2.commands.unfoldAll = function(t3) {
    t3.operation(function() {
      for (var r3 = t3.firstLine(), n3 = t3.lastLine(); r3 <= n3; r3++)
        t3.foldCode(e2.Pos(r3, 0), null, "unfold");
    });
  }, e2.registerHelper("fold", "combine", function() {
    var e3 = Array.prototype.slice.call(arguments, 0);
    return function(t3, r3) {
      for (var n3 = 0; n3 < e3.length; ++n3) {
        var i2 = e3[n3](t3, r3);
        if (i2)
          return i2;
      }
    };
  }), e2.registerHelper("fold", "auto", function(e3, t3) {
    for (var r3 = e3.getHelpers(t3, "fold"), n3 = 0; n3 < r3.length; n3++) {
      var i2 = r3[n3](e3, t3);
      if (i2)
        return i2;
    }
  });
  var r2 = { rangeFinder: e2.fold.auto, widget: "\u2194", minFoldSize: 0, scanUp: false, clearOnEnter: true };
  function n2(e3, t3, n3) {
    if (t3 && t3[n3] !== void 0)
      return t3[n3];
    var i2 = e3.options.foldOptions;
    return i2 && i2[n3] !== void 0 ? i2[n3] : r2[n3];
  }
  e2.defineOption("foldOptions", null), e2.defineExtension("foldOption", function(e3, t3) {
    return n2(this, e3, t3);
  });
}(CodeMirror), r.prototype.start = function(e2) {
  return this.stream = e2, this.line = 0, this.string = e2.string.slice(e2.start), this.startLine = e2.string, this.startPos = e2.start, this;
}, r.prototype.startLinebreak = function() {
  return this.stream = null, this.line = this.startPos = 0, this.string = "\n", this.startLine = "", this;
}, r.prototype.copy = function() {
  var e2 = this.copyInstance || (this.copyInstance = new r());
  return e2.stream = this.stream, e2.startPos = this.startPos, e2.line = this.line, e2.startLine = this.startLine, e2.string = this.string, e2;
}, r.prototype.updateStart = function() {
  this.startLine = this.stream ? this.line == 0 ? this.stream.string : this.stream.lookAhead(this.line) : "", this.startPos = this.startLine.length - (this.string.length - 1);
}, r.prototype.ahead = function(e2) {
  for (; ; ) {
    if (e2 <= this.string.length)
      return true;
    if (this.string.charCodeAt(this.string.length - 1) !== 10)
      this.string += "\n";
    else {
      if (this.line === 3 || !this.stream || !this.stream.lookAhead)
        return false;
      var t2 = this.stream.lookAhead(this.line + 1);
      if (t2 == null)
        return false;
      this.string += t2 + "\n", this.line++;
    }
  }
};
var n = null;
function i(e2, i2) {
  this.State = function(e3, i3) {
    function o(e4, t2) {
      this.stack = e4, this.context = t2;
    }
    function a() {
      return null;
    }
    return o.prototype.matchNext = function(r2, i4, o2, a2) {
      for (var l = this.stack.length - 1, s = this.stack[l], c = e3.nodes[s], u = 0; u < c.length; u++) {
        var d, f, h = c[u];
        if (h === 0)
          d = i4, f = c[++u];
        else {
          if (h === 1 || h === 2) {
            var p = c[++u], m = c[++u];
            this.go(m);
            var g = this.context;
            if (h === 2) {
              var v = c[++u];
              this.context = new t(v.name, v.token, this.stack.length, this.context, r2.startLine, r2.startPos);
            }
            this.stack.push(p);
            var y = this.matchNext(r2, i4, 0, false);
            if (y === i4 && (y = this.matchNext(r2, i4, u == c.length - 1 ? o2 : 0, a2)), y < 0) {
              this.stack.length = l + 1, this.stack[l] = s, this.context = g;
              continue;
            }
            return y;
          }
          if (h === 3) {
            var b = c[++u];
            d = this.matchExpr(c[++u], r2, i4), f = c[++u], d > i4 && (n = b);
          } else
            d = this.matchExpr(h, r2, i4), f = c[++u];
        }
        if (d < 0) {
          if (!(o2 > 0 && u == c.length - 1))
            continue;
          o2--, d = i4;
        }
        if (this.go(f), !a2 && f === -1 || this.stack.length === 0)
          return d;
        if (d > i4)
          return d;
        if ((d = this.matchNext(r2, i4, u == c.length - 1 ? o2 : 0, a2)) >= 0)
          return d;
        this.stack.length = l + 1, this.stack[l] = s;
      }
      return -1;
    }, o.prototype.go = function(e4) {
      for (this.stack.pop(); this.context && this.context.depth > this.stack.length; )
        this.context = this.context.parent;
      e4 !== -1 && this.stack.push(e4);
    }, o.prototype.runMaybe = function(e4, t2, r2) {
      return n = null, this.matchNext(e4, t2, r2, true);
    }, o.prototype.forward = function(t2, r2) {
      var n2 = this.runMaybe(t2, r2, 2);
      return n2 < 0 && (this.stack.push(e3.token), n2 = this.runMaybe(t2, r2, 0)), n2;
    }, o.prototype.lookahead = function(e4, t2, r2) {
      var i4 = n, o2 = new this.constructor([r2], null);
      for (e4 = e4.copy(); ; ) {
        e4.updateStart();
        var a2 = o2.runMaybe(e4, t2, 0);
        if (a2 < 0)
          return n = i4, false;
        if (o2.stack.length === 0)
          return n = i4, true;
        t2 = a2;
      }
    }, o.prototype.matchExpr = function(e4, t2, r2) {
      if (typeof e4 == "string") {
        var n2 = r2 + e4.length;
        return t2.ahead(n2) && t2.string.slice(r2, n2) === e4 ? n2 : -1;
      }
      if (e4.exec) {
        var o2 = t2.ahead(r2 + 1) && e4.exec(r2 > 0 ? t2.string.slice(r2) : t2.string);
        return o2 ? r2 + o2[0].length : -1;
      }
      var l, s = e4[0];
      if (s === 0) {
        for (var c = 1; c < e4.length; c++)
          if ((r2 = this.matchExpr(e4[c], t2, r2)) < 0)
            return -1;
        return r2;
      }
      if (s === 1) {
        c = 1;
        for (var u = e4.length - 1; ; c++) {
          var d = this.matchExpr(e4[c], t2, r2);
          if (c === u || d > -1)
            return d;
        }
        return -1;
      }
      if (s !== 2 && s !== 3) {
        if (s === 4)
          return Math.max(this.matchExpr(e4[1], t2, r2), r2);
        if (s === 5)
          return this.lookahead(t2, r2, e4[1]) ? r2 : -1;
        if (s === 6)
          return this.lookahead(t2, r2, e4[1]) ? -1 : r2;
        if (s === 7) {
          var f, h, p = r2 ? t2.string.lastIndexOf("\n", r2 - 1) : -1;
          if (t2.stream && p < 0)
            f = t2.stream.string, h = r2 + t2.stream.start;
          else {
            var m = t2.string.indexOf("\n", r2);
            f = t2.string.slice(p + 1, m < 0 ? t2.string.length : m), h = r2 - (p + 1);
          }
          return i3.predicates[e4[1]](f, h, this.context, t2.stream ? (l = t2.stream, function(e5) {
            return l.lookAhead(e5);
          }) : a) ? r2 : -1;
        }
        throw Error("Unknown match type " + e4);
      }
      if (s === 3 && (r2 = this.matchExpr(e4[1], t2, r2)) < 0)
        return -1;
      for (; ; ) {
        var g = this.matchExpr(e4[1], t2, r2);
        if (g == -1)
          return r2;
        r2 = g;
      }
    }, o.prototype.contextAt = function(e4, t2) {
      var n2 = this.copy(), i4 = new r(), o2 = 0, a2 = this.context;
      for (i4.string = e4 + "\n", i4.startLine = e4; ; ) {
        var l = n2.runMaybe(i4, o2, 0);
        if (l == -1)
          return n2.context;
        if (l > t2) {
          var s = n2.context;
          if (o2 == t2)
            e:
              for (; s; ) {
                for (var c = a2; c; c = c.parent)
                  if (c === s)
                    break e;
                s = s.parent;
              }
          return s;
        }
        o2 = l, a2 = n2.context;
      }
    }, o.prototype.copy = function() {
      return new this.constructor(this.stack.slice(), this.context);
    }, o.start = function() {
      return new this([e3.start], null);
    }, o;
  }(e2, i2 || {}), this.mcx = new r();
}
CodeMirror.GrammarMode = i, i.prototype.startState = function() {
  return this.State.start();
}, i.prototype.copyState = function(e2) {
  return e2.copy();
}, i.prototype.token = function(e2, t2) {
  e2.pos += t2.forward(this.mcx.start(e2), 0);
  for (var r2 = n, i2 = t2.context; i2; i2 = i2.parent)
    i2.tokenType && (r2 = i2.tokenType + (r2 ? " " + r2 : ""));
  return e2.eol() && t2.forward(this.mcx, e2.pos - e2.start), r2;
}, i.prototype.blankLine = function(e2) {
  e2.forward(this.mcx.startLinebreak(), 0);
}, function(e2) {
  var t2 = [/^(?:var|let|const)(?![a-zA-Z¡-￿_0-9_\$])/, /^while(?![a-zA-Z¡-￿_0-9_\$])/, /^with(?![a-zA-Z¡-￿_0-9_\$])/, /^do(?![a-zA-Z¡-￿_0-9_\$])/, /^debugger(?![a-zA-Z¡-￿_0-9_\$])/, /^if(?![a-zA-Z¡-￿_0-9_\$])/, /^function(?![a-zA-Z¡-￿_0-9_\$])/, /^for(?![a-zA-Z¡-￿_0-9_\$])/, /^default(?![a-zA-Z¡-￿_0-9_\$])/, /^case(?![a-zA-Z¡-￿_0-9_\$])/, /^return(?![a-zA-Z¡-￿_0-9_\$])/, /^throw(?![a-zA-Z¡-￿_0-9_\$])/, /^(?:break|continue)(?![a-zA-Z¡-￿_0-9_\$])/, /^switch(?![a-zA-Z¡-￿_0-9_\$])/, /^try(?![a-zA-Z¡-￿_0-9_\$])/, /^class(?![a-zA-Z¡-￿_0-9_\$])/, /^export(?![a-zA-Z¡-￿_0-9_\$])/, /^import(?![a-zA-Z¡-￿_0-9_\$])/, [0, "async", /^(?![a-zA-Z¡-￿_0-9_\$])/, [5, 114]], [1, ";", /^(?=\})/, [7, "canInsertSemi"]], /^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*/, /^extends(?![a-zA-Z¡-￿_0-9_\$])/, /^from(?![a-zA-Z¡-￿_0-9_\$])/, /^else(?![a-zA-Z¡-￿_0-9_\$])/, /^catch(?![a-zA-Z¡-￿_0-9_\$])/, /^finally(?![a-zA-Z¡-￿_0-9_\$])/, /^as(?![a-zA-Z¡-￿_0-9_\$])/, /^(?:true|false|null|undefined|NaN|Infinity)(?![a-zA-Z¡-￿_0-9_\$])/, /^(?:super|this)(?![a-zA-Z¡-￿_0-9_\$])/, /^(?:delete|typeof|yield|await|void)(?![a-zA-Z¡-￿_0-9_\$])/, /^(?:\.\.\.|\!|\+\+?|\-\-?)/, /^(?:0x[0-9a-fA-F_]+|0o[0-7_]+|0b[01_]+|(?:[0-9][0-9_]*(?:\.[0-9_]*)?|\.[0-9_]+)(?:[eE][\+\-]?[0-9_]+)?)/, /^\/(?![\/\*])(?:\\.|\[(?:(?!\]).)*\]|(?!\/).)+\/[gimyus]*/, /^(?:\+\+|\-\-)/, /^(?:(?:\+|\-|\%|\*|\/(?![\/\*])|\>\>?\>?|\<\<?|\=\=?|\&\&?|\|\|?|\^|\!\=)\=?|\?\?)/, /^(?:in|instanceof)(?![a-zA-Z¡-￿_0-9_\$])/, /^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= *\()/, /^(?:\.|\?\.)/, [1, "\n", "	", " "], /^new(?![a-zA-Z¡-￿_0-9_\$])/], r2 = Object.freeze({ nodes: [[1, 6, 2], [/^[^]/, 0], [1, 6, 3], [2, 7, 4, { name: "Statement" }, 0, 1], [1, 6, 3], [3, "keyword", t2[0], -1, 3, "keyword", t2[1], -1, 3, "keyword", t2[2], -1, 3, "keyword", t2[23], -1, 3, "keyword", t2[3], -1, 3, "keyword", t2[14], -1, 3, "keyword", t2[25], -1, 3, "keyword", t2[10], -1, 3, "keyword", t2[11], -1, 3, "keyword", t2[12], -1, 3, "keyword", t2[4], -1, 3, "keyword", t2[9], -1, 3, "keyword", t2[8], -1, 3, "keyword", t2[6], -1, 3, "keyword", t2[5], -1, 3, "keyword", t2[24], -1, 3, "keyword", t2[7], -1, 3, "keyword", t2[13], -1, 3, "keyword", t2[15], -1, 3, "keyword", t2[16], -1, 3, "keyword", t2[17], -1, 3, "keyword", t2[21], -1, 3, "keyword", t2[18], -1, 3, "keyword", t2[39], -1, 3, "keyword", t2[35], -1, 3, "keyword", t2[29], -1, 3, "keyword", t2[28], -1, 3, "atom", t2[27], -1, 3, "variable", t2[20], -1, 3, "operator", t2[30], -1, 3, "operator", t2[34], -1, 3, "operator", t2[33], -1, 2, 116, -1, { name: "string", token: "string" }, 3, "number", t2[31], -1, 2, 121, -1, { name: "comment", token: "comment" }, 3, "string-2", t2[32], -1, 1, 125, -1, /^[^]/, -1], [t2[38], 6, 2, 121, 6, { name: "comment", token: "comment" }, 0, -1], [3, "keyword", t2[0], 8, 3, "keyword", t2[1], 23, 3, "keyword", t2[2], 23, 3, "keyword", t2[3], 27, 2, 129, -1, { name: "Block" }, ";", -1, 3, "keyword", t2[4], -1, 3, "keyword", t2[5], 35, 3, "keyword", t2[6], 40, 3, "keyword", t2[7], 46, 3, "keyword", t2[8], 48, /^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= *\:)/, 48, 3, "keyword", t2[9], 49, 3, "keyword", t2[10], 52, 3, "keyword", t2[11], 56, 3, "keyword", t2[12], 60, 3, "keyword", t2[13], 64, 3, "keyword", t2[14], 68, 3, "keyword", t2[15], 72, 3, "keyword", t2[16], 80, 3, "keyword", t2[17], 92, 3, "keyword", t2[18], 108, "@", 110, 1, 133, 112], [1, 6, 9], [1, 139, 10], [1, 6, 11], [3, "operator", "=", 12, 0, 13], [1, 6, 14], [1, 6, 15], [1, 142, 13], [",", 16, t2[19], -1], [1, 6, 17], [1, 139, 18], [1, 6, 19], [3, "operator", "=", 20, 0, 21], [1, 6, 22], [1, 6, 15], [1, 142, 21], [1, 6, 24], [2, 146, 25, { name: "CondExpr" }], [1, 6, 26], [2, 7, -1, { name: "Statement" }], [1, 6, 28], [2, 7, 29, { name: "Statement" }], [1, 6, 30], [3, "keyword", t2[1], 31, 0, -1], [1, 6, 32], [2, 146, 33, { name: "CondExpr" }], [1, 6, 34], [t2[19], -1], [1, 6, 36], [2, 146, 37, { name: "CondExpr" }], [1, 6, 38], [2, 7, 39, { name: "Statement" }], [2, 151, -1, { name: "Alternative" }], [1, 6, 41], [3, "keyword", "*", 42, 0, 42], [1, 6, 43], [3, "def", t2[20], 44], [1, 6, 45], [2, 155, -1, { name: "FunctionDef" }], [1, 6, 47], [2, 158, -1, { name: "ForStatement" }], [1, 6, 50], [1, 6, 51], [":", -1], [1, 133, 48], [1, 6, 53], [t2[19], -1, 1, 133, 54], [1, 6, 55], [t2[19], -1], [1, 6, 57], [1, 133, 58], [1, 6, 59], [t2[19], -1], [1, 6, 61], [/^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*)?/, 62], [1, 6, 63], [t2[19], -1], [1, 6, 65], [2, 146, 66, { name: "CondExpr" }], [1, 6, 67], [2, 129, -1, { name: "Block" }], [1, 6, 69], [2, 129, 70, { name: "Block" }], [1, 6, 71], [2, 161, -1, { name: "CatchFinally" }], [1, 6, 73], [3, "type def", t2[20], 74], [1, 6, 75], [3, "keyword", t2[21], 76, 0, 77], [1, 6, 78], [1, 6, 79], [1, 133, 77], [2, 174, -1, { name: "ClassBody" }], [1, 6, 81], ["*", 82, 3, "keyword", t2[8], 82, "{", 83, 2, 7, -1, { name: "Statement" }], [1, 6, 84], [1, 6, 85], [3, "keyword", t2[22], 86, 0, 87], [1, 182, 88], [1, 6, 89], [1, 6, 90], [1, 6, 91], [2, 116, 87, { name: "string", token: "string" }], [t2[19], -1], ["}", 82], [1, 6, 93], [2, 116, 94, { name: "string", token: "string" }, 3, "keyword", "*", 95, 1, 188, 96, "{", 97], [1, 6, 98], [1, 6, 99], [1, 6, 100], [1, 6, 101], [t2[19], -1], [3, "keyword", t2[26], 102, 0, 96], [3, "keyword", t2[22], 103, 0, 94], [1, 182, 104], [1, 6, 105], [1, 6, 106], [1, 6, 107], [3, "def", t2[20], 96], [2, 116, 94, { name: "string", token: "string" }], ["}", 96], [1, 6, 109], [2, 7, -1, { name: "Statement" }], [1, 6, 111], [1, 133, -1], [1, 6, 113], [t2[19], -1], [1, 6, 115], [3, "keyword", t2[6], -1, /^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*|\()/, -1], ["'", 117, '"', 119], ["\\", 118, /^(?!\')./, 117, "'", -1], [/^[^]/, 117], ["\\", 120, /^(?!\")./, 119, '"', -1], [/^[^]/, 119], [/^\/\*\*(?!\/)/, 122, "/*", 124, /^\/\/.*/, -1], [1, 193, 122, 0, 123], [2, 196, 123, { name: "doccomment.tagGroup" }, "*/", -1], [[0, /^(?!\*\/)/, /^[^]/], 124, "*/", -1], [3, "string-2", "`", 126], [3, "string-2", "${", 127, 2, 198, 126, { name: "str2", token: "string-2" }, 3, "string-2", /^(?:(?!\`|\$\{|\\).)+/, 126, 3, "string-2", "`", -1], [1, 133, 128], [3, "string-2", "}", 126], ["{", 130], [1, 6, 131], [2, 7, 132, { name: "Statement" }, "}", -1], [1, 6, 131], [1, 200, 134], [1, 6, 135], [",", 136, 1, 218, 137, 0, -1], [1, 6, 138], [1, 6, 135], [1, 142, 137], [3, "operator", "...", 140, 0, 140], [1, 6, 141], [3, "def", t2[20], -1, 2, 233, -1, { name: "ArrayPattern" }, 2, 238, -1, { name: "ObjectPattern" }], [1, 200, 143], [1, 6, 144], [1, 243, 145, 0, -1], [1, 6, 144], ["(", 147], [1, 6, 148], [1, 133, 149], [1, 6, 150], [")", -1], [1, 6, 152], [3, "keyword", t2[23], 153, 0, -1], [1, 6, 154], [2, 7, -1, { name: "Statement" }], [2, 258, 156, { name: "ParamList" }], [1, 6, 157], [2, 129, -1, { name: "Block" }], [2, 263, 159, { name: "ForSpec" }], [1, 6, 160], [2, 7, -1, { name: "Statement" }], [3, "keyword", t2[24], 162, 0, 170], [1, 6, 163], ["(", 164, 0, 165], [1, 6, 166], [1, 6, 167], [1, 139, 168], [2, 129, 170, { name: "Block" }], [1, 6, 169], [")", 165], [1, 6, 171], [3, "keyword", t2[25], 172, 0, -1], [1, 6, 173], [2, 129, -1, { name: "Block" }], ["{", 175], [1, 6, 176], [3, "keyword", /^static(?![a-zA-Z¡-￿_0-9_\$])/, 177, 0, 177, "@", 178, "}", -1], [1, 6, 179], [1, 6, 180], [2, 274, 181, { name: "ObjectMember" }], [1, 133, 181], [1, 6, 176], [1, 188, 183, 0, -1], [1, 6, 184], [",", 185, 0, -1], [1, 6, 186], [1, 188, 187, 0, 187], [1, 6, 184], [3, "variable", /^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= +as)/, 189, 3, "def", t2[20], -1], [1, 6, 190], [3, "keyword", t2[26], 191], [1, 6, 192], [3, "def", t2[20], -1], [0, 194, 2, 289, -1, { name: "doccomment.braced" }], [[0, /^(?!\*\/|\@[a-zA-Z¡-￿_0-9]|\{)/, /^[^]/], 195], [0, 194, 0, -1], [1, 293, 197], [1, 193, 197, 0, -1], ["\\", 199, "\n", -1], [/^[^]/, -1], [3, "atom", t2[27], -1, 3, "keyword", t2[28], -1, 3, "keyword", t2[29], 201, 3, "operator", t2[30], 201, 3, "keyword", t2[18], 201, 2, 299, -1, { name: "NewExpression" }, 3, "keyword", t2[6], 203, 3, "keyword", t2[15], 209, 2, 309, -1, { name: "ArrowFunc" }, 3, "variable callee", t2[36], -1, 3, "variable", t2[20], -1, 3, "number", t2[31], -1, 2, 116, -1, { name: "string", token: "string" }, 3, "string-2", t2[32], -1, 1, 125, -1, 2, 313, -1, { name: "ArrayLiteral" }, 2, 318, -1, { name: "ObjectLiteral" }, 2, 323, -1, { name: "ParenExpr" }], [1, 6, 202], [1, 200, -1], [1, 6, 204], [3, "keyword", "*", 205, 0, 205], [1, 6, 206], [3, "def", t2[20], 207, 0, 207], [1, 6, 208], [2, 155, -1, { name: "FunctionDef" }], [1, 6, 210], [[6, 328], 211, 0, 212], [3, "type def", t2[20], 212], [1, 6, 213], [3, "keyword", t2[21], 214, 0, 215], [1, 6, 216], [1, 6, 217], [1, 133, 215], [2, 174, -1, { name: "ClassBody" }], [3, "operator", t2[33], -1, 3, "operator", t2[34], 219, 3, "keyword", t2[35], 219, 2, 329, -1, { name: "ArgList" }, 1, 125, -1, t2[37], 221, "[", 223, 3, "operator", "?", 227], [1, 6, 220], [1, 133, -1], [1, 6, 222], [3, "property callee", t2[36], -1, 3, "property", t2[20], -1], [1, 6, 224], [1, 133, 225], [1, 6, 226], ["]", -1], [1, 6, 228], [1, 133, 229], [1, 6, 230], [3, "operator", ":", 231], [1, 6, 232], [1, 133, -1], ["[", 234], [1, 6, 235], [1, 334, 236], [1, 6, 237], ["]", -1], ["{", 239], [1, 6, 240], [1, 340, 241], [1, 6, 242], ["}", -1], [3, "operator", t2[33], -1, 3, "operator", t2[34], 244, 3, "keyword", t2[35], 244, 2, 329, -1, { name: "ArgList" }, 1, 125, -1, t2[37], 246, "[", 248, 3, "operator", "?", 252], [1, 6, 245], [1, 142, -1], [1, 6, 247], [3, "property callee", t2[36], -1, 3, "property", t2[20], -1], [1, 6, 249], [1, 133, 250], [1, 6, 251], ["]", -1], [1, 6, 253], [1, 133, 254], [1, 6, 255], [3, "operator", ":", 256], [1, 6, 257], [1, 142, -1], ["(", 259], [1, 6, 260], [1, 346, 261], [1, 6, 262], [")", -1], ["(", 264], [1, 6, 265], [2, 352, 266, { name: "StatementMaybeOf" }], [1, 6, 267], [1, 133, 268, 0, 268, 0, 272], [1, 6, 269], [";", 270], [1, 6, 271], [1, 133, 272, 0, 272], [1, 6, 273], [")", -1], [3, "keyword", /^(?:get|set|async)(?![a-zA-Z¡-￿_0-9_\$])(?! *[\,\}\:\(])/, 275, 0, 275], [1, 6, 276], [3, "keyword", "*", 277, 0, 277], [1, 6, 278], [3, "def property", t2[20], 279, "[", 280, 3, "number", t2[31], 279, 2, 116, 279, { name: "string", token: "string" }, 3, "operator", "...", 281], [1, 6, 282], [1, 6, 283], [1, 6, 284], [2, 155, -1, { name: "FunctionDef" }, ":", 285, 0, -1], [1, 133, 286], [1, 142, -1], [1, 6, 287], [1, 6, 288], [1, 142, -1], ["]", 279], ["{", 290], [1, 293, 291, 1, 193, 292], [[0, /^(?!\}|\*\/)/, /^[^]/], 291, 0, 292], [/^(?:\}|(?=\*\/))/, -1], [3, "tag", /^\@(?:member|param|arg(?:ument)?|module|namespace|typedef)(?![a-zA-Z¡-￿_0-9])/, 294, 3, "tag", /^\@[a-zA-Z¡-￿_0-9]+/, -1], [t2[38], 294, "{", 295, 0, 296, 0, -1], [2, 357, 297, { name: "doccomment.type" }], [3, "def", /^[a-zA-Z¡-￿_0-9]+/, -1, 0, -1], ["}", 298], [[1, "\n", "	", " ", /^\*(?!\/)/], 298, 0, 296], [3, "keyword", t2[39], 300], [1, 6, 301], [".", 302, 1, 200, 303], [1, 6, 304], [1, 6, 305], [3, "keyword", /^target(?![a-zA-Z¡-￿_0-9_\$])/, -1], [2, 329, 306, { name: "ArgList" }, ".", 307, 0, -1], [1, 6, 305], [1, 6, 308], [3, "property callee", t2[36], 306, 3, "property", t2[20], 306], [3, "def", [0, /^[a-zA-Z¡-￿__\$]/, /^[a-zA-Z¡-￿_0-9_\$]*/, [5, 361]], 311, [5, 363], 310], [2, 258, 311, { name: "ParamList" }], [1, 6, 312], [2, 366, -1, { name: "ArrowRest" }], ["[", 314], [1, 6, 315], [1, 369, 316], [1, 6, 317], ["]", -1], ["{", 319], [1, 6, 320], [1, 375, 321], [1, 6, 322], ["}", -1], ["(", 324], [1, 6, 325], [1, 133, 326], [1, 6, 327], [")", -1], [3, "keyword", t2[21], -1], ["(", 330], [1, 6, 331], [1, 369, 332], [1, 6, 333], [")", -1], [1, 381, 335, 0, 335, 0, -1], [1, 6, 336], [",", 337, 0, -1], [1, 6, 338], [1, 381, 339, 0, 339, 0, 339], [1, 6, 336], [1, 386, 341, 0, -1], [1, 6, 342], [",", 343, 0, -1], [1, 6, 344], [1, 386, 345, 0, 345], [1, 6, 342], [1, 381, 347, 0, -1], [1, 6, 348], [",", 349, 0, -1], [1, 6, 350], [1, 381, 351, 0, 351], [1, 6, 348], [2, 7, 353, { name: "Statement" }], [1, 6, 354], [3, "keyword", /^of(?![a-zA-Z¡-￿_0-9_\$])/, 355, 0, -1], [1, 6, 356], [1, 133, -1], [3, "type", "{", 358, 3, "type", /^(?:(?!\{|\}|\*\/).)+/, 357, "\n", 359, 0, -1], [2, 357, 360, { name: "doccomment.type" }], [/^[\t ]*(?:\*(?!\/)[\t ]*)?/, 357], [/^(?=\*\/)/, 357, 3, "type", "}", 357], [1, 6, 362], ["=>", -1], [2, 258, 364, { name: "ParamList" }], [1, 6, 365], ["=>", -1], [3, "operator", "=>", 367], [1, 6, 368], [2, 129, -1, { name: "Block" }, 1, 142, -1], [1, 142, 370, 0, -1], [1, 6, 371], [",", 372, 0, -1], [1, 6, 373], [1, 142, 374, 0, 374], [1, 6, 371], [2, 274, 376, { name: "ObjectMember" }, 0, -1], [1, 6, 377], [",", 378, 0, -1], [1, 6, 379], [2, 274, 380, { name: "ObjectMember" }, 0, 380], [1, 6, 377], [1, 139, 382], [1, 6, 383], [3, "operator", "=", 384, 0, -1], [1, 6, 385], [1, 142, -1], [3, "def", /^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?![a-z]|[A-Z]|[¡-￿]|_|[0-9]|_|\$| *\:)/, 387, 3, "property", t2[20], 391, 3, "number", t2[31], 391, 2, 116, 391, { name: "string", token: "string" }, 3, "operator", "...", 395], [1, 6, 388], [3, "operator", "=", 389, 0, -1], [1, 6, 390], [1, 142, -1], [1, 6, 392], [":", 393], [1, 6, 394], [1, 381, -1], [1, 6, 396], [1, 381, -1]], start: 0, token: 5 }), n2 = /(^|\s)variable($|\s)/;
  function i2(e3) {
    var t3 = /^(if|for|do|while|try)\b/.exec(e3.startLine.slice(e3.startPos));
    return t3 && t3[1];
  }
  var o = { Block: "}", BlockOf: "}", ClassBody: "}", AnnotationTypeBody: "}", ObjectLiteral: "}", ObjectPattern: "}", EnumBody: "}", LambdaBlock: "}", WhenBody: "}", ObjType: "}", ArrayInitializer: "}", NamespaceBlock: "}", BraceTokens: "}", ArrayLiteral: "]", BracketTokens: "]", TupleType: "]", ParamList: ")", SimpleParamList: ")", ArgList: ")", ParenExpr: ")", CondExpr: ")", ForSpec: ")", ParenTokens: ")", ParenthesizedExpression: ")", ConstructorParamList: ")", TypeParams: ">", TypeArgs: ">", TemplateArgs: ">", TemplateParams: ">" }, a = ["Block", "NamespaceBlock", "ClassBody", "AnnotationTypeBody", "BlockOf", "EnumBody"], l = ["Statement", "ObjectMember", "ClassItem", "EnumConstant", "AnnotationTypeItem", "ArgExpr", "StatementMaybeOf", "NewExpr"];
  function s(t3, r3) {
    for (var n3 = t3.startLine; ; t3 = t3.parent) {
      if (t3.name == "CondExpr")
        return e2.countColumn(t3.startLine, t3.startPos + 1, r3.tabSize);
      if (l.indexOf(t3.name) > -1 && /(^\s*|[\(\{\[])$/.test(t3.startLine.slice(0, t3.startPos)))
        return e2.countColumn(t3.startLine, t3.startPos, r3.tabSize);
      if (!t3.parent || t3.parent.startLine != n3)
        return e2.countColumn(t3.startLine, null, r3.tabSize);
    }
  }
  function c(t3, r3, n3) {
    if (!t3)
      return 0;
    if (t3.name == "string" || t3.name == "comment")
      return e2.Pass;
    var d2, f2, h2 = o[t3.name], p2 = r3 && r3.charAt(0) == h2;
    if (h2 && n3.align !== false && (!n3.dontAlign || n3.dontAlign.indexOf(t3.name) < 0) && function(e3) {
      return !/^\s*((\/\/.*)?$|.*=>)/.test(e3.startLine.slice(e3.startPos + 1));
    }(t3))
      return e2.countColumn(t3.startLine, t3.startPos, n3.tabSize) + (p2 ? 0 : 1);
    if (h2 && a.indexOf(t3.name) > -1) {
      var m2 = t3.parent;
      m2 && m2.name == "Statement" && m2.parent && m2.parent.name == "Statement" && i2(m2.parent) && !i2(m2) && (m2 = m2.parent);
      var g2 = u(m2, n3);
      return p2 || t3.name == "NamespaceBlock" ? g2 : /^(public|private|protected)\s*:/.test(r3) ? g2 + 1 : !(f2 = t3.parent) || f2.name != "Statement" || !/^switch\b/.test(f2.startLine.slice(f2.startPos)) || (d2 = r3) && /^\s*(case|default)\b/.test(d2) ? g2 + n3.indentUnit : g2 + 2 * n3.indentUnit;
    }
    var v2 = s(t3, n3.tabSize);
    return h2 ? p2 && (n3.dontCloseBrackets || "").indexOf(h2) < 0 ? v2 : v2 + n3.indentUnit * ((n3.doubleIndentBrackets || "").indexOf(h2) < 0 ? 1 : 2) : l.indexOf(t3.name) > -1 ? i2(t3) ? v2 + n3.indentUnit : v2 + 2 * n3.indentUnit : t3.name == "Alternative" || t3.name == "CatchFinally" ? (v2 = s(t3.parent, n3.tabSize), !r3 || /^((else|catch|finally)\b|\/[\/\*])/.test(r3) ? v2 : v2 + n3.indentUnit) : t3.name == "ArrowRest" ? v2 + n3.indentUnit : t3.name == "NewExpression" && t3.startLine.length > t3.startPos + 5 ? e2.countColumn(t3.startLine, t3.startPos, n3.tabSize) + 2 * n3.indentUnit : t3.name == "InitializerList" ? v2 + 2 : t3.name != "ThrowsClause" || /throws\s*$/.test(t3.startLine.slice(t3.startPos)) ? c(t3.parent, r3, n3) : v2 + 2 * n3.indentUnit;
  }
  function u(t3, r3) {
    for (; ; t3 = t3.parent) {
      if (!t3)
        return 0;
      if (l.indexOf(t3.name) > -1 || t3.parent && o[t3.parent.name])
        return e2.countColumn(t3.startLine, null, r3.tabSize);
    }
  }
  function d(t3, r3, n3, i3) {
    var o2 = t3.context && t3.context.name;
    if (o2 == "DeclType" || o2 == "BeforeStatement" || o2 == "AnnotationHead" || o2 == "Template" || o2 == "str")
      return u(t3.context, i3);
    if ((o2 == "doccomment.braced" || o2 == "doccomment.tagGroup") && !/^[@*]/.test(r3))
      return e2.countColumn(t3.context.startLine, null, i3.tabSize) + 2 * i3.indentUnit;
    var a2 = i3.forceContent && /^\s*(\/\/.*)?$/.test(n3) ? "x" : n3;
    return c(t3.contextAt(a2, n3.length - r3.length), r3, i3);
  }
  function f(e3, t3) {
    for (var r3 = t3 - 1; r3 >= 0; r3--) {
      var n3 = e3.charCodeAt(r3);
      if (n3 === 10)
        break;
      if (n3 !== 32 && n3 !== 9)
        return false;
    }
    return true;
  }
  var h = function(e3) {
    this.config = e3;
  };
  h.prototype.startState = function() {
    return new p();
  }, h.prototype.copyState = function(e3) {
    return e3.copy();
  }, h.prototype.shouldInterceptTokenizing = function(e3) {
    var t3 = e3.currentTemplateState;
    return t3 !== void 0 && t3.mode !== null;
  }, h.prototype.interceptTokenizing = function(e3, t3) {
    if (e3.match("${") && (e3.backUp(2), !this.isEscaped(e3, e3.pos - 2)))
      return { handled: false };
    if (e3.peek() === "`" && !this.isEscaped(e3, e3.pos))
      return { handled: false };
    var r3 = t3.currentTemplateState, n3 = r3.mode, i3 = r3.state, o2 = n3.token(e3, i3);
    return this.backupIfEmbeddedTokenizerOvershot(e3), { handled: true, style: o2 };
  }, h.prototype.trackState = function(e3, t3, r3) {
    if (e3) {
      var n3 = r3.currentTemplateState;
      n3 && n3.kind !== "inline-expression" ? this.trackStateInTemplate(e3, t3, r3, n3) : this.trackStateNotInTemplate(e3, t3, r3, n3), r3.previousVariable = e3 === "variable" ? t3.current() : null;
    }
  }, h.prototype.trackStateNotInTemplate = function(e3, t3, r3, n3) {
    if (n3 && e3 === "string-2" && t3.current().startsWith("}"))
      return r3.templateStack.pop(), void t3.backUp(t3.current().length - 1);
    if (e3 === "string-2" && t3.current().startsWith("`")) {
      var i3 = this.getModeForTemplateTag(r3.previousVariable), o2 = "template";
      i3 ? (t3.backUp(t3.current().length - 1), r3.templateStack.push(new g(o2, i3, CodeMirror.startState(i3)))) : r3.templateStack.push(new g(o2, null, null));
    }
  }, h.prototype.trackStateInTemplate = function(e3, t3, r3, n3) {
    e3 !== "string-2" || !t3.current().endsWith("`") || this.isEscaped(t3.pos - 1) ? e3 !== "string-2" || !t3.current().endsWith("${") || this.isEscaped(t3.pos - 2) || r3.templateStack.push(new g("inline-expression", null, null)) : r3.templateStack.pop();
  }, h.prototype.backupIfEmbeddedTokenizerOvershot = function(e3) {
    for (var t3 = e3.current(), r3 = 0; ; ) {
      var n3 = t3.slice(r3).search(/`|\$\{/);
      if (n3 === -1)
        return;
      n3 += r3;
      var i3 = t3.length - n3, o2 = e3.pos - i3;
      if (!this.isEscaped(e3, o2))
        return void e3.backUp(t3.length - n3);
      r3 = n3 + 1;
    }
  }, h.prototype.isEscaped = function(e3, t3) {
    for (var r3 = false, n3 = t3; n3 > 0 && e3.string[n3 - 1] === "\\"; )
      r3 = !r3, n3--;
    return r3;
  }, h.prototype.getModeForTemplateTag = function(e3) {
    if (!e3)
      return null;
    e3 === "htm" && (e3 = "html");
    for (var t3 = ["google-" + e3, "" + e3], r3 = 0; r3 < t3.length; r3++) {
      var n3 = CodeMirror.getMode(this.config, t3[r3]);
      if (n3 && n3.name !== "null")
        return n3;
    }
    return null;
  };
  var p = function(e3, t3) {
    e3 === void 0 && (e3 = []), t3 === void 0 && (t3 = null), this.templateStack = e3, this.previousVariable = t3;
  }, m = { currentTemplateState: { configurable: true } };
  p.prototype.copy = function() {
    return new p(this.templateStack.map(function(e3) {
      return e3.copy();
    }), this.previousVariable);
  }, m.currentTemplateState.get = function() {
    return this.templateStack[this.templateStack.length - 1];
  }, Object.defineProperties(p.prototype, m);
  var g = function(e3, t3, r3) {
    this.kind = e3, this.mode = t3, this.state = r3;
  };
  g.prototype.copy = function() {
    return this.mode ? new g(this.kind, this.mode, CodeMirror.copyState(this.mode, this.state)) : new g(this.kind, null, null);
  };
  var v = ["Block", "FunctionDef", "ArrowFunc", "ForStatement"], y = function(e3) {
    function t3(t4, n3) {
      e3.call(this, r2, { predicates: { canInsertSemi: n3.requireSemicolons === false ? f : function() {
        return false;
      } } }), this.embeddedParser = new h(t4), this.indentConf = { doubleIndentBrackets: ">)", dontCloseBrackets: ")", tabSize: t4.tabSize, indentUnit: t4.indentUnit, forceContent: true };
    }
    return e3 && (t3.__proto__ = e3), t3.prototype = Object.create(e3 && e3.prototype), t3.prototype.constructor = t3, t3.prototype.startState = function() {
      var t4 = e3.prototype.startState.call(this);
      return t4.embeddedParserState = this.embeddedParser.startState(), t4;
    }, t3.prototype.copyState = function(t4) {
      var r3 = e3.prototype.copyState.call(this, t4);
      return r3.embeddedParserState = this.embeddedParser.copyState(t4.embeddedParserState), r3;
    }, t3.prototype.token = function(t4, r3) {
      var i3 = r3.embeddedParserState;
      if (this.embeddedParser.shouldInterceptTokenizing(i3)) {
        var o2 = this.embeddedParser.interceptTokenizing(t4, i3), a2 = o2.handled, l2 = o2.style;
        if (a2)
          return l2;
      }
      var s2 = e3.prototype.token.call(this, t4, r3);
      return this.embeddedParser.trackState(s2, t4, i3), function(e4, t5, r4, i4) {
        if (e4 == "def") {
          var o3 = function(e5, t6) {
            for (var r5 = e5; r5; r5 = r5.parent)
              if (t6.indexOf(r5.name) > -1)
                return r5;
          }(i4.context, t5), a3 = r4.current();
          if (o3 && (o3.locals || (o3.locals = []), o3.locals.indexOf(a3) == -1 && o3.locals.push(a3), i4.context.name != "funcName"))
            return "def local";
        } else
          n2.test(e4) && !/qualified/.test(e4) && function(e5, t6) {
            for (var r5 = e5; r5; r5 = r5.parent)
              if (r5.locals && r5.locals.indexOf(t6) > -1)
                return true;
            return false;
          }(i4.context, r4.current()) && (e4 = e4.replace(n2, "$1variable-2$2"));
        return e4;
      }(s2, v, t4, r3);
    }, t3.prototype.indent = function(e4, t4, r3) {
      return t4 || (t4 = r3 = "x"), d(e4, t4, r3, this.indentConf);
    }, t3;
  }(e2.GrammarMode), b = { electricInput: /^\s*(?:case .*?:|default:|\{|\})$/, blockCommentStart: "/*", blockCommentEnd: "*/", blockCommentContinue: " * ", lineComment: "//", fold: "brace", closeBrackets: "()[]{}''\"\"``" };
  for (var w in b)
    y.prototype[w] = b[w];
  e2.registerHelper("wordChars", "google-javascript", /[\w$]/), e2.defineMode("google-javascript", function(e3, t3) {
    return new y(e3, t3);
  });
}(window.CodeMirror), function(e2) {
  var t2 = [/^(?:var|let|const)(?![a-zA-Z¡-￿_0-9_\$])/, /^while(?![a-zA-Z¡-￿_0-9_\$])/, /^with(?![a-zA-Z¡-￿_0-9_\$])/, /^do(?![a-zA-Z¡-￿_0-9_\$])/, /^debugger(?![a-zA-Z¡-￿_0-9_\$])/, /^if(?![a-zA-Z¡-￿_0-9_\$])/, /^function(?![a-zA-Z¡-￿_0-9_\$])/, /^for(?![a-zA-Z¡-￿_0-9_\$])/, /^default(?![a-zA-Z¡-￿_0-9_\$])/, /^case(?![a-zA-Z¡-￿_0-9_\$])/, /^return(?![a-zA-Z¡-￿_0-9_\$])/, /^throw(?![a-zA-Z¡-￿_0-9_\$])/, /^(?:break|continue)(?![a-zA-Z¡-￿_0-9_\$])/, /^switch(?![a-zA-Z¡-￿_0-9_\$])/, /^try(?![a-zA-Z¡-￿_0-9_\$])/, /^class(?![a-zA-Z¡-￿_0-9_\$])/, /^export(?![a-zA-Z¡-￿_0-9_\$])/, /^import(?![a-zA-Z¡-￿_0-9_\$])/, [0, "async", /^(?![a-zA-Z¡-￿_0-9_\$])/, [5, 139]], /^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*/, /^extends(?![a-zA-Z¡-￿_0-9_\$])/, /^enum(?![a-zA-Z¡-￿_0-9_\$])/, [1, ";", /^(?=\})/, [7, "canInsertSemi"]], /^from(?![a-zA-Z¡-￿_0-9_\$])/, [1, "\n", "	", " "], /^[a-zA-Z¡-￿__\$]/, /^const(?![a-zA-Z¡-￿_0-9_\$])/, /^(?:true|false|null|undefined|NaN|Infinity)(?![a-zA-Z¡-￿_0-9_\$])/, /^new(?![a-zA-Z¡-￿_0-9_\$])/, /^(?:0x[0-9a-fA-F_]+|0o[0-7_]+|0b[01_]+|(?:[0-9][0-9_]*(?:\.[0-9_]*)?|\.[0-9_]+)(?:[eE][\+\-]?[0-9_]+)?)/, /^else(?![a-zA-Z¡-￿_0-9_\$])/, /^catch(?![a-zA-Z¡-￿_0-9_\$])/, /^finally(?![a-zA-Z¡-￿_0-9_\$])/, /^as(?![a-zA-Z¡-￿_0-9_\$])/, /^(?:super|this)(?![a-zA-Z¡-￿_0-9_\$])/, /^(?:delete|typeof|yield|await|void)(?![a-zA-Z¡-￿_0-9_\$])/, /^(?:\.\.\.|\!|\+\+?|\-\-?)/, /^\/(?![\/\*])(?:\\.|\[(?:(?!\]).)*\]|(?!\/).)+\/[gimyus]*/, [0, /^[a-zA-Z¡-￿__\$]/, /^[a-zA-Z¡-￿_0-9_\$]*/, [5, 508]], /^(?:\+\+|\-\-)/, /^(?:(?:\+|\-|\%|\*|\/(?![\/\*])|\>\>?\>?|\<\<?|\=\=?|\&\&?|\|\|?|\^|\!\=)\=?|\?\?)/, /^(?:in|instanceof)(?![a-zA-Z¡-￿_0-9_\$])/, /^(?:public|private|protected|readonly|abstract|static)(?![a-zA-Z¡-￿_0-9_\$])/, /^(?:\.|\?\.)/, [0, /^[a-zA-Z¡-￿__\$]/, /^[a-zA-Z¡-￿_0-9_\$]*/, [5, 533]], /^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= *\:)/, /^is(?![a-zA-Z¡-￿_0-9_\$])/, /^(?:\.\.\.)?/, /^(?:get|set|async)(?![a-zA-Z¡-￿_0-9_\$])(?! *[\,\}\:\(\<])/], r2 = Object.freeze({ nodes: [[1, 6, 2], [/^[^]/, 0], [1, 6, 3], [2, 7, 4, { name: "Statement" }, 0, 1], [1, 6, 3], [3, "keyword", t2[0], -1, 3, "keyword", t2[1], -1, 3, "keyword", t2[2], -1, 3, "keyword", t2[30], -1, 3, "keyword", t2[3], -1, 3, "keyword", t2[14], -1, 3, "keyword", t2[32], -1, 3, "keyword", t2[10], -1, 3, "keyword", t2[11], -1, 3, "keyword", t2[12], -1, 3, "keyword", t2[4], -1, 3, "keyword", t2[9], -1, 3, "keyword", t2[8], -1, 3, "keyword", t2[6], -1, 3, "keyword", t2[5], -1, 3, "keyword", t2[31], -1, 3, "keyword", t2[7], -1, 3, "keyword", t2[13], -1, 3, "keyword", t2[15], -1, 3, "keyword", t2[16], -1, 3, "keyword", t2[17], -1, 3, "keyword", t2[20], -1, 3, "keyword", t2[18], -1, 3, "keyword", t2[28], -1, 3, "keyword", t2[41], -1, 3, "keyword", t2[35], -1, 3, "keyword", t2[34], -1, 3, "atom", t2[27], -1, 3, "variable", t2[19], -1, 3, "operator", t2[36], -1, 3, "operator", t2[40], -1, 3, "operator", t2[39], -1, 2, 141, -1, { name: "string", token: "string" }, 3, "number", t2[29], -1, 2, 146, -1, { name: "comment", token: "comment" }, 3, "string-2", t2[37], -1, 1, 150, -1, /^[^]/, -1], [t2[24], 6, 2, 146, 6, { name: "comment", token: "comment" }, 0, -1], [3, "keyword", [0, "type", /^(?![a-zA-Z¡-￿_0-9_\$])/, [5, 154]], 8, 3, "keyword", [0, "namespace", /^(?![a-zA-Z¡-￿_0-9_\$])/, [5, 155]], 18, 3, "keyword", [0, "interface", /^(?![a-zA-Z¡-￿_0-9_\$])/, [5, 156]], 26, [5, 157], 36, 3, "keyword", t2[21], 37, 3, "keyword", [0, "declare", /^(?![a-zA-Z¡-￿_0-9_\$])/, [5, 160]], 43, 3, "keyword", /^abstract(?![a-zA-Z¡-￿_0-9_\$])/, 43, 3, "keyword", t2[0], 45, 3, "keyword", t2[1], 52, 3, "keyword", t2[2], 52, 3, "keyword", t2[3], 56, 2, 161, -1, { name: "Block" }, ";", -1, 3, "keyword", t2[4], -1, 3, "keyword", t2[5], 64, 3, "keyword", t2[6], 69, 3, "keyword", t2[7], 75, 3, "keyword", t2[8], 77, t2[45], 77, 3, "keyword", t2[9], 78, 3, "keyword", t2[10], 81, 3, "keyword", t2[11], 85, 3, "keyword", t2[12], 89, 3, "keyword", t2[13], 93, 3, "keyword", t2[14], 97, 3, "keyword", t2[15], 101, 3, "keyword", t2[16], 105, 3, "keyword", t2[17], 117, 3, "keyword", t2[18], 133, "@", 135, 1, 165, 137], [1, 6, 9], [3, "def type", t2[19], 10], [1, 6, 11], [2, 171, 12, { name: "TypeParams" }, 0, 12], [1, 6, 13], [3, "operator", "=", 14], [1, 6, 15], [1, 176, 16], [1, 6, 17], [t2[22], -1], [1, 6, 19], [[5, 224], 20, 3, "def", t2[19], 21], [3, "variable", t2[19], 22], [1, 6, 23], [1, 6, 24], [2, 161, -1, { name: "Block" }], [".", 25], [1, 6, 19], [1, 6, 27], [3, "def type", t2[19], 28], [1, 6, 29], [2, 171, 30, { name: "TypeParams" }, 0, 30], [1, 6, 31], [3, "keyword", t2[20], 32, 0, 33], [1, 6, 34], [1, 6, 35], [1, 227, 33], [2, 233, -1, { name: "ObjType" }], [3, "keyword", t2[26], 38], [1, 6, 39], [1, 6, 40], [3, "def type", t2[19], 41], [3, "keyword", t2[21], 37], [1, 6, 42], [2, 241, -1, { name: "EnumBody" }], [1, 6, 44], [2, 7, -1, { name: "Statement" }], [1, 6, 46], [1, 246, 47], [1, 6, 48], [",", 49, t2[22], -1], [1, 6, 50], [1, 246, 51], [1, 6, 48], [1, 6, 53], [2, 257, 54, { name: "CondExpr" }], [1, 6, 55], [2, 7, -1, { name: "Statement" }], [1, 6, 57], [2, 7, 58, { name: "Statement" }], [1, 6, 59], [3, "keyword", t2[1], 60, 0, -1], [1, 6, 61], [2, 257, 62, { name: "CondExpr" }], [1, 6, 63], [t2[22], -1], [1, 6, 65], [2, 257, 66, { name: "CondExpr" }], [1, 6, 67], [2, 7, 68, { name: "Statement" }], [2, 262, -1, { name: "Alternative" }], [1, 6, 70], [3, "keyword", "*", 71, 0, 71], [1, 6, 72], [3, "def", t2[19], 73], [1, 6, 74], [2, 266, -1, { name: "FunctionDef" }], [1, 6, 76], [2, 275, -1, { name: "ForStatement" }], [1, 6, 79], [1, 6, 80], [":", -1], [1, 165, 77], [1, 6, 82], [t2[22], -1, 1, 165, 83], [1, 6, 84], [t2[22], -1], [1, 6, 86], [1, 165, 87], [1, 6, 88], [t2[22], -1], [1, 6, 90], [/^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*)?/, 91], [1, 6, 92], [t2[22], -1], [1, 6, 94], [2, 257, 95, { name: "CondExpr" }], [1, 6, 96], [2, 161, -1, { name: "Block" }], [1, 6, 98], [2, 161, 99, { name: "Block" }], [1, 6, 100], [2, 278, -1, { name: "CatchFinally" }], [1, 6, 102], [3, "def type", t2[19], 103], [1, 6, 104], [1, 291, -1], [1, 6, 106], ["*", 107, 3, "keyword", t2[8], 107, "{", 108, 2, 7, -1, { name: "Statement" }], [1, 6, 109], [1, 6, 110], [3, "keyword", t2[23], 111, 0, 112], [1, 302, 113], [1, 6, 114], [1, 6, 115], [1, 6, 116], [2, 141, 112, { name: "string", token: "string" }], [t2[22], -1], ["}", 107], [1, 6, 118], [2, 141, 119, { name: "string", token: "string" }, 3, "keyword", "*", 120, 1, 308, 121, "{", 122], [1, 6, 123], [1, 6, 124], [1, 6, 125], [1, 6, 126], [t2[22], -1], [3, "keyword", t2[33], 127, 0, 121], [3, "keyword", t2[23], 128, 0, 119], [1, 302, 129], [1, 6, 130], [1, 6, 131], [1, 6, 132], [3, "def", t2[19], 121], [2, 141, 119, { name: "string", token: "string" }], ["}", 121], [1, 6, 134], [2, 7, -1, { name: "Statement" }], [1, 6, 136], [1, 165, -1], [1, 6, 138], [t2[22], -1], [1, 6, 140], [3, "keyword", t2[6], -1, /^(?:[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*|\()/, -1], ["'", 142, '"', 144], ["\\", 143, /^(?!\')./, 142, "'", -1], [/^[^]/, 142], ["\\", 145, /^(?!\")./, 144, '"', -1], [/^[^]/, 144], [/^\/\*\*(?!\/)/, 147, "/*", 149, /^\/\/.*/, -1], [1, 313, 147, 0, 148], [2, 316, 148, { name: "doccomment.tagGroup" }, "*/", -1], [[0, /^(?!\*\/)/, /^[^]/], 149, "*/", -1], [3, "string-2", "`", 151], [3, "string-2", "${", 152, 2, 318, 151, { name: "str2", token: "string-2" }, 3, "string-2", /^(?:(?!\`|\$\{|\\).)+/, 151, 3, "string-2", "`", -1], [1, 165, 153], [3, "string-2", "}", 151], [t2[24], 154, t2[25], -1], [t2[24], 155, t2[25], -1], [t2[24], 156, t2[25], -1], [3, "keyword", t2[26], 158], [1, 6, 159], [3, "keyword", t2[21], -1], [t2[24], 160, t2[25], -1], ["{", 162], [1, 6, 163], [2, 7, 164, { name: "Statement" }, "}", -1], [1, 6, 163], [1, 320, 166], [1, 6, 167], [",", 168, 1, 348, 169, 0, -1], [1, 6, 170], [1, 6, 167], [1, 367, 169], ["<", 172], [1, 6, 173], [1, 371, 174], [1, 6, 175], [">", -1], [3, "keyword", /^this(?![a-zA-Z¡-￿_0-9_\$])/, 209, 3, "atom", t2[27], 209, 3, "keyword", /^typeof(?![a-zA-Z¡-￿_0-9_\$])/, 177, 3, "keyword", /^(?:keyof|readonly|unique)(?![a-zA-Z¡-￿_0-9_\$])/, 178, [0, [5, 393], "("], 179, 3, "keyword", t2[28], 180, 0, 180, 0, 181, 2, 396, 209, { name: "TupleType" }, 2, 233, 209, { name: "ObjType" }, 2, 141, 209, { name: "string", token: "string" }, 3, "number", t2[29], 209], [1, 6, 182], [1, 6, 183], [1, 6, 184], [1, 6, 185], [[5, 401], 186, 3, "type", t2[19], 187], [3, "variable", t2[19], 188], [1, 176, 209], [1, 176, 189], [2, 171, 190, { name: "TypeParams" }, 0, 190], [3, "variable", t2[19], 191], [1, 6, 192], [1, 6, 193], [1, 6, 194], [1, 6, 195], [1, 6, 196], [2, 404, 209, { name: "TypeArgs" }, 0, 209], [".", 197, "[", 198, 0, 209], [")", 209], [2, 409, 199, { name: "ParamListSpec" }], [".", 200], [1, 6, 201], [1, 6, 202], [1, 6, 203], [1, 6, 181], [3, "property", t2[19], 204], [1, 165, 205], [3, "operator", "=>", 206], [1, 6, 193], [1, 6, 207], [1, 6, 208], ["]", 204], [1, 410, 209], [1, 6, 210], [3, "operator", /^[\&\|]/, 211, 3, "keyword", t2[20], 211, "[", 212, 3, "operator", "?", 213, 0, -1], [1, 6, 214], [1, 6, 215], [1, 6, 216], [1, 176, 217], [1, 176, 218, 0, 218], [1, 176, 219], [1, 6, 210], [1, 6, 220], [1, 6, 221], ["]", 217], [3, "operator", ":", 222], [1, 6, 223], [1, 176, 217], [t2[19], 225], [1, 6, 226], [".", -1], [1, 176, 228, 0, -1], [1, 6, 229], [",", 230, 0, -1], [1, 6, 231], [1, 176, 232, 0, 232], [1, 6, 229], ["{", 234], [1, 6, 235], [1, 416, 236, 0, 236], [1, 6, 237], [/^[\,\;]/, 238, "}", -1], [1, 6, 239], [1, 416, 240, 0, 240], [1, 6, 237], ["{", 242], [1, 6, 243], [1, 449, 244], [1, 6, 245], ["}", -1], [1, 463, 247], [1, 6, 248], [3, "operator", "!", 249, 0, 249], [1, 6, 250], [":", 251, 0, 253], [1, 6, 252], [1, 176, 253], [1, 6, 254], [3, "operator", "=", 255, 0, -1], [1, 6, 256], [1, 367, -1], ["(", 258], [1, 6, 259], [1, 165, 260], [1, 6, 261], [")", -1], [1, 6, 263], [3, "keyword", t2[30], 264, 0, -1], [1, 6, 265], [2, 7, -1, { name: "Statement" }], [2, 171, 267, { name: "TypeParams" }, 0, 267], [1, 6, 268], [2, 466, 269, { name: "ParamList" }], [1, 6, 270], [":", 271, 0, 273], [1, 6, 272], [1, 410, 273], [1, 6, 274], [2, 161, -1, { name: "Block" }, t2[22], -1], [2, 471, 276, { name: "ForSpec" }], [1, 6, 277], [2, 7, -1, { name: "Statement" }], [3, "keyword", t2[31], 279, 0, 287], [1, 6, 280], ["(", 281, 0, 282], [1, 6, 283], [1, 6, 284], [1, 463, 285], [2, 161, 287, { name: "Block" }], [1, 6, 286], [")", 282], [1, 6, 288], [3, "keyword", t2[32], 289, 0, -1], [1, 6, 290], [2, 161, -1, { name: "Block" }], [2, 171, 292, { name: "TypeParams" }, 0, 292], [1, 6, 293], [3, "keyword", t2[20], 294, 0, 296], [1, 6, 295], [1, 176, 296], [1, 6, 297], [3, "keyword", /^implements(?![a-zA-Z¡-￿_0-9_\$])/, 298, 0, 300], [1, 6, 299], [1, 227, 300], [1, 6, 301], [2, 482, -1, { name: "ClassBody" }], [1, 308, 303, 0, -1], [1, 6, 304], [",", 305, 0, -1], [1, 6, 306], [1, 308, 307, 0, 307], [1, 6, 304], [3, "variable", /^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?= +as)/, 309, 3, "def", t2[19], -1], [1, 6, 310], [3, "keyword", t2[33], 311], [1, 6, 312], [3, "def", t2[19], -1], [0, 314, 2, 490, -1, { name: "doccomment.braced" }], [[0, /^(?!\*\/|\@[a-zA-Z¡-￿_0-9]|\{)/, /^[^]/], 315], [0, 314, 0, -1], [1, 494, 317], [1, 313, 317, 0, -1], ["\\", 319, "\n", -1], [/^[^]/, -1], ["<", 321, 3, "atom", t2[27], -1, 3, "keyword", t2[34], -1, 3, "keyword", t2[35], 327, 3, "operator", t2[36], 327, 3, "keyword", t2[18], 327, 3, "keyword", t2[28], 329, 3, "keyword", t2[6], 335, 3, "keyword", t2[15], 341, 2, 500, -1, { name: "ArrowFunc" }, 3, "variable callee", t2[38], 346, 3, "variable", t2[19], -1, 3, "number", t2[29], -1, 2, 141, -1, { name: "string", token: "string" }, 3, "string-2", t2[37], -1, 1, 150, -1, 2, 512, -1, { name: "ArrayLiteral" }, 2, 517, -1, { name: "ObjectLiteral" }, 2, 522, -1, { name: "ParenExpr" }], [1, 6, 322], [1, 176, 323], [1, 6, 324], [">", 325], [1, 6, 326], [1, 320, -1], [1, 6, 328], [1, 320, -1], [1, 6, 330], [".", 331, 3, "variable callee", t2[38], 332, 1, 320, -1], [1, 6, 333], [1, 6, 334], [3, "keyword", /^target(?![a-zA-Z¡-￿_0-9_\$])/, -1], [2, 404, -1, { name: "TypeArgs" }, 0, -1], [1, 6, 336], [3, "keyword", "*", 337, 0, 337], [1, 6, 338], [3, "def", t2[19], 339, 0, 339], [1, 6, 340], [2, 266, -1, { name: "FunctionDef" }], [1, 6, 342], [[6, 527], 343, 0, 344], [3, "def type", t2[19], 344], [1, 6, 345], [1, 291, -1], [1, 6, 347], [2, 404, -1, { name: "TypeArgs" }, 0, -1], [3, "keyword", t2[33], 349, 3, "operator", "!", -1, 3, "operator", t2[39], -1, 3, "operator", t2[40], 351, 3, "keyword", t2[41], 351, 2, 528, -1, { name: "ArgList" }, 1, 150, -1, t2[43], 353, "[", 357, 3, "operator", "?", 361], [1, 6, 350], [1, 176, -1], [1, 6, 352], [1, 165, -1], [1, 6, 354], [3, "property callee", t2[44], 355, 3, "property", t2[19], -1], [1, 6, 356], [2, 404, -1, { name: "TypeArgs" }, 0, -1], [1, 6, 358], [1, 165, 359], [1, 6, 360], ["]", -1], [1, 6, 362], [1, 165, 363], [1, 6, 364], [3, "operator", ":", 365], [1, 6, 366], [1, 165, -1], [1, 320, 368], [1, 6, 369], [1, 537, 370, 0, -1], [1, 6, 369], [3, "def type", t2[19], 372, 0, -1], [1, 6, 373], [3, "keyword", t2[20], 374, 0, 375], [1, 6, 376], [1, 6, 377], [1, 176, 375], [3, "operator", "=", 378, 0, 379], [1, 6, 380], [1, 6, 381], [1, 176, 379], [",", 382, 0, -1], [1, 6, 383], [3, "def type", t2[19], 384, 0, 385], [1, 6, 386], [1, 6, 381], [3, "keyword", t2[20], 387, 0, 388], [1, 6, 389], [1, 6, 390], [1, 176, 388], [3, "operator", "=", 391, 0, 385], [1, 6, 392], [1, 176, 385], ["(", 394], [1, 6, 395], [[6, 556], -1], ["[", 397], [1, 6, 398], [1, 559, 399], [1, 6, 400], ["]", -1], [t2[19], 402], [1, 6, 403], [".", -1], ["<", 405], [1, 6, 406], [1, 227, 407], [1, 6, 408], [">", -1], [2, 466, -1, { name: "ParamList" }], [[5, 573], 411, 0, 414], [3, "variable", t2[19], 412], [1, 6, 413], [3, "keyword", t2[46], 414], [1, 6, 415], [1, 176, -1], [3, "keyword", t2[28], 417, 0, 417, 0, 425], [1, 6, 418], [2, 171, 419, { name: "TypeParams" }, 0, 419], [1, 6, 420], [2, 466, 421, { name: "ParamList" }], [1, 6, 422], [":", 423, 0, -1], [1, 6, 424], [1, 410, -1], [3, "keyword", t2[42], 426, "[", 427, 3, "def property", t2[19], 428, 2, 141, 428, { name: "string", token: "string" }, 3, "number", t2[29], 428], [1, 6, 425], [1, 6, 429], [1, 6, 430], [[0, [5, 576], /^[a-zA-Z¡-￿__\$]/, /^[a-zA-Z¡-￿_0-9_\$]*/], 431, 1, 165, 432], [/^\??/, 433], [1, 6, 434], [1, 6, 435], [1, 6, 436], [":", 437, 3, "keyword", /^in(?![a-zA-Z¡-￿_0-9_\$])/, 437], ["]", 438], [2, 171, 439, { name: "TypeParams" }, 0, 439, 0, 440], [1, 6, 441], [1, 6, 442], [1, 6, 443], [1, 6, 444], [1, 176, 432], [":", 445], [2, 466, 440, { name: "ParamList" }], [":", 446, 0, -1], [1, 6, 447], [1, 6, 448], [1, 176, -1], [1, 410, -1], [3, "def property", t2[19], 450, 0, -1], [1, 6, 451], [3, "operator", "=", 452, 0, 453], [1, 6, 454], [1, 6, 455], [1, 367, 453], [",", 456, 0, -1], [1, 6, 457], [3, "def property", t2[19], 458, 0, 459], [1, 6, 460], [1, 6, 455], [3, "operator", "=", 461, 0, 459], [1, 6, 462], [1, 367, 459], [3, "operator", "...", 464, 0, 464], [1, 6, 465], [3, "def", t2[19], -1, 2, 579, -1, { name: "ArrayPattern" }, 2, 584, -1, { name: "ObjectPattern" }], ["(", 467], [1, 6, 468], [1, 589, 469], [1, 6, 470], [")", -1], ["(", 472], [1, 6, 473], [2, 629, 474, { name: "StatementMaybeOf" }], [1, 6, 475], [1, 165, 476, 0, 476, 0, 480], [1, 6, 477], [";", 478], [1, 6, 479], [1, 165, 480, 0, 480], [1, 6, 481], [")", -1], ["{", 483], [1, 6, 484], [0, 485, "@", 486, "}", -1], [3, "keyword", t2[42], 487, 2, 634, 488, { name: "ClassItem" }], [1, 6, 489], [1, 6, 485], [1, 6, 484], [1, 165, 488], ["{", 491], [1, 494, 492, 1, 313, 493], [[0, /^(?!\}|\*\/)/, /^[^]/], 492, 0, 493], [/^(?:\}|(?=\*\/))/, -1], [3, "tag", /^\@(?:member|param|arg(?:ument)?|module|namespace|typedef)(?![a-zA-Z¡-￿_0-9])/, 495, 3, "tag", /^\@[a-zA-Z¡-￿_0-9]+/, -1], [t2[24], 495, "{", 496, 0, 497, 0, -1], [2, 655, 498, { name: "doccomment.type" }], [3, "def", /^[a-zA-Z¡-￿_0-9]+/, -1, 0, -1], ["}", 499], [[1, "\n", "	", " ", /^\*(?!\/)/], 499, 0, 497], [3, "def", [0, /^[a-zA-Z¡-￿__\$]/, /^[a-zA-Z¡-￿_0-9_\$]*/, [5, 659]], 506, [5, 665], 501], [2, 466, 502, { name: "ParamList" }], [1, 6, 503], [":", 504, 0, 506], [1, 6, 505], [1, 410, 506], [1, 6, 507], [2, 672, -1, { name: "ArrowRest" }], [/^\<(?! )/, -1, /^ */, 509], [1, 677, 510, 0, 511], [/^ */, 511], ["(", -1], ["[", 513], [1, 6, 514], [1, 679, 515], [1, 6, 516], ["]", -1], ["{", 518], [1, 6, 519], [1, 685, 520], [1, 6, 521], ["}", -1], ["(", 523], [1, 6, 524], [1, 165, 525], [1, 6, 526], [")", -1], [3, "keyword", t2[20], -1], ["(", 529], [1, 6, 530], [1, 679, 531], [1, 6, 532], [")", -1], [/^ */, 534], [1, 677, 535, 0, 536], [/^ */, 536], ["(", -1], [3, "keyword", t2[33], 538, 3, "operator", "!", -1, 3, "operator", t2[39], -1, 3, "operator", t2[40], 540, 3, "keyword", t2[41], 540, 2, 528, -1, { name: "ArgList" }, 1, 150, -1, t2[43], 542, "[", 546, 3, "operator", "?", 550], [1, 6, 539], [1, 176, -1], [1, 6, 541], [1, 367, -1], [1, 6, 543], [3, "property callee", t2[44], 544, 3, "property", t2[19], -1], [1, 6, 545], [2, 404, -1, { name: "TypeArgs" }, 0, -1], [1, 6, 547], [1, 165, 548], [1, 6, 549], ["]", -1], [1, 6, 551], [1, 165, 552], [1, 6, 553], [3, "operator", ":", 554], [1, 6, 555], [1, 367, -1], [/^(?:\)|\.\.\.)/, -1, t2[19], 557], [1, 6, 558], [/^[\?\:]/, -1], [t2[45], 560, 0, 561, 0, -1], [1, 6, 562], [1, 6, 563], [":", 561], [1, 176, 564], [1, 6, 565], [",", 566, 0, -1], [1, 6, 567], [t2[45], 568, 0, 569, 0, 570], [1, 6, 571], [1, 6, 572], [1, 6, 565], [":", 569], [1, 176, 570], [t2[19], 574], [1, 6, 575], [3, "keyword", t2[46], -1], [t2[19], 577], [1, 6, 578], [/^(?:\:|in)/, -1], ["[", 580], [1, 6, 581], [1, 691, 582], [1, 6, 583], ["]", -1], ["{", 585], [1, 6, 586], [1, 697, 587], [1, 6, 588], ["}", -1], ["@", 590, 0, 591, 0, -1], [1, 6, 592], [3, "keyword", t2[42], 593, t2[47], 594], [1, 165, 595], [1, 6, 591], [1, 6, 596], [1, 6, 589], [1, 463, 597], [1, 6, 598], [/^\??/, 599], [1, 6, 600], [":", 601, 0, 602], [1, 6, 603], [1, 6, 604], [1, 176, 602], [3, "operator", "=", 605, 0, 606], [1, 6, 607], [1, 6, 608], [1, 367, 606], [",", 609, 0, -1], [1, 6, 610], ["@", 611, 0, 612, 0, 613], [1, 6, 614], [3, "keyword", t2[42], 615, t2[47], 616], [1, 6, 608], [1, 165, 617], [1, 6, 612], [1, 6, 618], [1, 6, 610], [1, 463, 619], [1, 6, 620], [/^\??/, 621], [1, 6, 622], [":", 623, 0, 624], [1, 6, 625], [1, 6, 626], [1, 176, 624], [3, "operator", "=", 627, 0, 613], [1, 6, 628], [1, 367, 613], [2, 7, 630, { name: "Statement" }], [1, 6, 631], [3, "keyword", /^of(?![a-zA-Z¡-￿_0-9_\$])/, 632, 0, -1], [1, 6, 633], [1, 165, -1], [3, "keyword", t2[48], 635, 0, 635], [1, 6, 636], [3, "def property", t2[19], 641, "[", 637, 3, "number", t2[29], 641, 2, 141, 641, { name: "string", token: "string" }], [1, 6, 638], [1, 165, 639], [1, 6, 640], ["]", 641], [1, 6, 642], [3, "keyword", "*", 643, 0, 643, /^[\!\?]?/, 644], [1, 6, 645], [1, 6, 646], [2, 266, -1, { name: "FunctionDef" }], [":", 647, 0, 648], [1, 6, 649], [1, 6, 650], [1, 176, 648], [3, "operator", "=", 651, 0, 652], [1, 6, 653], [1, 6, 654], [1, 165, 652], [t2[22], -1], [3, "type", "{", 656, 3, "type", /^(?:(?!\{|\}|\*\/).)+/, 655, "\n", 657, 0, -1], [2, 655, 658, { name: "doccomment.type" }], [/^[\t ]*(?:\*(?!\/)[\t ]*)?/, 655], [/^(?=\*\/)/, 655, 3, "type", "}", 655], [1, 6, 660], [":", 661, 0, 664], [1, 6, 662], [1, 176, 663], [1, 6, 664], ["=>", -1], [2, 466, 666, { name: "ParamList" }], [1, 6, 667], [":", 668, 0, 670], [1, 6, 669], [1, 410, 670], [1, 6, 671], ["=>", -1], [3, "operator", "=>", 673], [1, 6, 674], [2, 171, 675, { name: "TypeParams" }, 0, 675], [1, 6, 676], [2, 161, -1, { name: "Block" }, 1, 367, -1], ["<", 678], [1, 677, 678, [1, "=>", [0, /^(?!\>)/, /^[^]/]], 678, ">", -1], [1, 367, 680, 0, -1], [1, 6, 681], [",", 682, 0, -1], [1, 6, 683], [1, 367, 684, 0, 684], [1, 6, 681], [2, 703, 686, { name: "ObjectMember" }, 0, -1], [1, 6, 687], [",", 688, 0, -1], [1, 6, 689], [2, 703, 690, { name: "ObjectMember" }, 0, 690], [1, 6, 687], [1, 718, 692, 0, 692, 0, -1], [1, 6, 693], [",", 694, 0, -1], [1, 6, 695], [1, 718, 696, 0, 696, 0, 696], [1, 6, 693], [1, 723, 698, 0, -1], [1, 6, 699], [",", 700, 0, -1], [1, 6, 701], [1, 723, 702, 0, 702], [1, 6, 699], [3, "keyword", t2[48], 704, 0, 704], [1, 6, 705], [3, "keyword", "*", 706, 0, 706], [1, 6, 707], [3, "def property", t2[19], 708, "[", 709, 3, "number", t2[29], 708, 2, 141, 708, { name: "string", token: "string" }, 3, "operator", "...", 710], [1, 6, 711], [1, 6, 712], [1, 6, 713], [2, 266, -1, { name: "FunctionDef" }, ":", 714, 0, -1], [1, 165, 715], [1, 367, -1], [1, 6, 716], [1, 6, 717], [1, 367, -1], ["]", 708], [1, 463, 719], [1, 6, 720], [3, "operator", "=", 721, 0, -1], [1, 6, 722], [1, 367, -1], [3, "def", /^[a-zA-Z¡-￿__\$][a-zA-Z¡-￿_0-9_\$]*(?![a-z]|[A-Z]|[¡-￿]|_|[0-9]|_|\$| *\:)/, 724, 3, "property", t2[19], 728, 3, "number", t2[29], 728, 2, 141, 728, { name: "string", token: "string" }, 3, "operator", "...", 732], [1, 6, 725], [3, "operator", "=", 726, 0, -1], [1, 6, 727], [1, 367, -1], [1, 6, 729], [":", 730], [1, 6, 731], [1, 718, -1], [1, 6, 733], [1, 718, -1]], start: 0, token: 5 }), n2 = /(^|\s)variable($|\s)/;
  function i2(e3) {
    var t3 = /^(if|for|do|while|try)\b/.exec(e3.startLine.slice(e3.startPos));
    return t3 && t3[1];
  }
  var o = { Block: "}", BlockOf: "}", ClassBody: "}", AnnotationTypeBody: "}", ObjectLiteral: "}", ObjectPattern: "}", EnumBody: "}", LambdaBlock: "}", WhenBody: "}", ObjType: "}", ArrayInitializer: "}", NamespaceBlock: "}", BraceTokens: "}", ArrayLiteral: "]", BracketTokens: "]", TupleType: "]", ParamList: ")", SimpleParamList: ")", ArgList: ")", ParenExpr: ")", CondExpr: ")", ForSpec: ")", ParenTokens: ")", ParenthesizedExpression: ")", ConstructorParamList: ")", TypeParams: ">", TypeArgs: ">", TemplateArgs: ">", TemplateParams: ">" }, a = ["Block", "NamespaceBlock", "ClassBody", "AnnotationTypeBody", "BlockOf", "EnumBody"], l = ["Statement", "ObjectMember", "ClassItem", "EnumConstant", "AnnotationTypeItem", "ArgExpr", "StatementMaybeOf", "NewExpr"];
  function s(t3, r3) {
    for (var n3 = t3.startLine; ; t3 = t3.parent) {
      if (t3.name == "CondExpr")
        return e2.countColumn(t3.startLine, t3.startPos + 1, r3.tabSize);
      if (l.indexOf(t3.name) > -1 && /(^\s*|[\(\{\[])$/.test(t3.startLine.slice(0, t3.startPos)))
        return e2.countColumn(t3.startLine, t3.startPos, r3.tabSize);
      if (!t3.parent || t3.parent.startLine != n3)
        return e2.countColumn(t3.startLine, null, r3.tabSize);
    }
  }
  function c(t3, r3, n3) {
    if (!t3)
      return 0;
    if (t3.name == "string" || t3.name == "comment")
      return e2.Pass;
    var d2, f2, h2 = o[t3.name], p2 = r3 && r3.charAt(0) == h2;
    if (h2 && n3.align !== false && (!n3.dontAlign || n3.dontAlign.indexOf(t3.name) < 0) && function(e3) {
      return !/^\s*((\/\/.*)?$|.*=>)/.test(e3.startLine.slice(e3.startPos + 1));
    }(t3))
      return e2.countColumn(t3.startLine, t3.startPos, n3.tabSize) + (p2 ? 0 : 1);
    if (h2 && a.indexOf(t3.name) > -1) {
      var m2 = t3.parent;
      m2 && m2.name == "Statement" && m2.parent && m2.parent.name == "Statement" && i2(m2.parent) && !i2(m2) && (m2 = m2.parent);
      var g2 = u(m2, n3);
      return p2 || t3.name == "NamespaceBlock" ? g2 : /^(public|private|protected)\s*:/.test(r3) ? g2 + 1 : !(f2 = t3.parent) || f2.name != "Statement" || !/^switch\b/.test(f2.startLine.slice(f2.startPos)) || (d2 = r3) && /^\s*(case|default)\b/.test(d2) ? g2 + n3.indentUnit : g2 + 2 * n3.indentUnit;
    }
    var v2 = s(t3, n3.tabSize);
    return h2 ? p2 && (n3.dontCloseBrackets || "").indexOf(h2) < 0 ? v2 : v2 + n3.indentUnit * ((n3.doubleIndentBrackets || "").indexOf(h2) < 0 ? 1 : 2) : l.indexOf(t3.name) > -1 ? i2(t3) ? v2 + n3.indentUnit : v2 + 2 * n3.indentUnit : t3.name == "Alternative" || t3.name == "CatchFinally" ? (v2 = s(t3.parent, n3.tabSize), !r3 || /^((else|catch|finally)\b|\/[\/\*])/.test(r3) ? v2 : v2 + n3.indentUnit) : t3.name == "ArrowRest" ? v2 + n3.indentUnit : t3.name == "NewExpression" && t3.startLine.length > t3.startPos + 5 ? e2.countColumn(t3.startLine, t3.startPos, n3.tabSize) + 2 * n3.indentUnit : t3.name == "InitializerList" ? v2 + 2 : t3.name != "ThrowsClause" || /throws\s*$/.test(t3.startLine.slice(t3.startPos)) ? c(t3.parent, r3, n3) : v2 + 2 * n3.indentUnit;
  }
  function u(t3, r3) {
    for (; ; t3 = t3.parent) {
      if (!t3)
        return 0;
      if (l.indexOf(t3.name) > -1 || t3.parent && o[t3.parent.name])
        return e2.countColumn(t3.startLine, null, r3.tabSize);
    }
  }
  function d(t3, r3, n3, i3) {
    var o2 = t3.context && t3.context.name;
    if (o2 == "DeclType" || o2 == "BeforeStatement" || o2 == "AnnotationHead" || o2 == "Template" || o2 == "str")
      return u(t3.context, i3);
    if ((o2 == "doccomment.braced" || o2 == "doccomment.tagGroup") && !/^[@*]/.test(r3))
      return e2.countColumn(t3.context.startLine, null, i3.tabSize) + 2 * i3.indentUnit;
    var a2 = i3.forceContent && /^\s*(\/\/.*)?$/.test(n3) ? "x" : n3;
    return c(t3.contextAt(a2, n3.length - r3.length), r3, i3);
  }
  function f(e3, t3) {
    for (var r3 = t3 - 1; r3 >= 0; r3--) {
      var n3 = e3.charCodeAt(r3);
      if (n3 === 10)
        break;
      if (n3 !== 32 && n3 !== 9)
        return false;
    }
    return true;
  }
  var h = function(e3) {
    this.config = e3;
  };
  h.prototype.startState = function() {
    return new p();
  }, h.prototype.copyState = function(e3) {
    return e3.copy();
  }, h.prototype.shouldInterceptTokenizing = function(e3) {
    var t3 = e3.currentTemplateState;
    return t3 !== void 0 && t3.mode !== null;
  }, h.prototype.interceptTokenizing = function(e3, t3) {
    if (e3.match("${") && (e3.backUp(2), !this.isEscaped(e3, e3.pos - 2)))
      return { handled: false };
    if (e3.peek() === "`" && !this.isEscaped(e3, e3.pos))
      return { handled: false };
    var r3 = t3.currentTemplateState, n3 = r3.mode, i3 = r3.state, o2 = n3.token(e3, i3);
    return this.backupIfEmbeddedTokenizerOvershot(e3), { handled: true, style: o2 };
  }, h.prototype.trackState = function(e3, t3, r3) {
    if (e3) {
      var n3 = r3.currentTemplateState;
      n3 && n3.kind !== "inline-expression" ? this.trackStateInTemplate(e3, t3, r3, n3) : this.trackStateNotInTemplate(e3, t3, r3, n3), r3.previousVariable = e3 === "variable" ? t3.current() : null;
    }
  }, h.prototype.trackStateNotInTemplate = function(e3, t3, r3, n3) {
    if (n3 && e3 === "string-2" && t3.current().startsWith("}"))
      return r3.templateStack.pop(), void t3.backUp(t3.current().length - 1);
    if (e3 === "string-2" && t3.current().startsWith("`")) {
      var i3 = this.getModeForTemplateTag(r3.previousVariable), o2 = "template";
      i3 ? (t3.backUp(t3.current().length - 1), r3.templateStack.push(new g(o2, i3, CodeMirror.startState(i3)))) : r3.templateStack.push(new g(o2, null, null));
    }
  }, h.prototype.trackStateInTemplate = function(e3, t3, r3, n3) {
    e3 !== "string-2" || !t3.current().endsWith("`") || this.isEscaped(t3.pos - 1) ? e3 !== "string-2" || !t3.current().endsWith("${") || this.isEscaped(t3.pos - 2) || r3.templateStack.push(new g("inline-expression", null, null)) : r3.templateStack.pop();
  }, h.prototype.backupIfEmbeddedTokenizerOvershot = function(e3) {
    for (var t3 = e3.current(), r3 = 0; ; ) {
      var n3 = t3.slice(r3).search(/`|\$\{/);
      if (n3 === -1)
        return;
      n3 += r3;
      var i3 = t3.length - n3, o2 = e3.pos - i3;
      if (!this.isEscaped(e3, o2))
        return void e3.backUp(t3.length - n3);
      r3 = n3 + 1;
    }
  }, h.prototype.isEscaped = function(e3, t3) {
    for (var r3 = false, n3 = t3; n3 > 0 && e3.string[n3 - 1] === "\\"; )
      r3 = !r3, n3--;
    return r3;
  }, h.prototype.getModeForTemplateTag = function(e3) {
    if (!e3)
      return null;
    e3 === "htm" && (e3 = "html");
    for (var t3 = ["google-" + e3, "" + e3], r3 = 0; r3 < t3.length; r3++) {
      var n3 = CodeMirror.getMode(this.config, t3[r3]);
      if (n3 && n3.name !== "null")
        return n3;
    }
    return null;
  };
  var p = function(e3, t3) {
    e3 === void 0 && (e3 = []), t3 === void 0 && (t3 = null), this.templateStack = e3, this.previousVariable = t3;
  }, m = { currentTemplateState: { configurable: true } };
  p.prototype.copy = function() {
    return new p(this.templateStack.map(function(e3) {
      return e3.copy();
    }), this.previousVariable);
  }, m.currentTemplateState.get = function() {
    return this.templateStack[this.templateStack.length - 1];
  }, Object.defineProperties(p.prototype, m);
  var g = function(e3, t3, r3) {
    this.kind = e3, this.mode = t3, this.state = r3;
  };
  g.prototype.copy = function() {
    return this.mode ? new g(this.kind, this.mode, CodeMirror.copyState(this.mode, this.state)) : new g(this.kind, null, null);
  };
  var v = ["Block", "FunctionDef", "ArrowFunc", "ForStatement", "ParamListSpec"], y = function(e3) {
    function t3(t4, n3) {
      e3.call(this, r2, { predicates: { canInsertSemi: n3.requireSemicolons === false ? f : function() {
        return false;
      } } }), this.templateTokenizer = new h(t4), this.indentConf = { doubleIndentBrackets: ">)", dontCloseBrackets: ")", tabSize: t4.tabSize, indentUnit: t4.indentUnit, forceContent: true };
    }
    return e3 && (t3.__proto__ = e3), t3.prototype = Object.create(e3 && e3.prototype), t3.prototype.constructor = t3, t3.prototype.startState = function() {
      var t4 = e3.prototype.startState.call(this);
      return t4.embeddedParserState = this.templateTokenizer.startState(), t4;
    }, t3.prototype.copyState = function(t4) {
      var r3 = e3.prototype.copyState.call(this, t4);
      return r3.embeddedParserState = this.templateTokenizer.copyState(t4.embeddedParserState), r3;
    }, t3.prototype.token = function(t4, r3) {
      var i3 = r3.embeddedParserState;
      if (this.templateTokenizer.shouldInterceptTokenizing(i3)) {
        var o2 = this.templateTokenizer.interceptTokenizing(t4, i3), a2 = o2.handled, l2 = o2.style;
        if (a2)
          return l2;
      }
      var s2 = e3.prototype.token.call(this, t4, r3);
      return this.templateTokenizer.trackState(s2, t4, i3), function(e4, t5, r4, i4) {
        if (e4 == "def") {
          var o3 = function(e5, t6) {
            for (var r5 = e5; r5; r5 = r5.parent)
              if (t6.indexOf(r5.name) > -1)
                return r5;
          }(i4.context, t5), a3 = r4.current();
          if (o3 && (o3.locals || (o3.locals = []), o3.locals.indexOf(a3) == -1 && o3.locals.push(a3), i4.context.name != "funcName"))
            return "def local";
        } else
          n2.test(e4) && !/qualified/.test(e4) && function(e5, t6) {
            for (var r5 = e5; r5; r5 = r5.parent)
              if (r5.locals && r5.locals.indexOf(t6) > -1)
                return true;
            return false;
          }(i4.context, r4.current()) && (e4 = e4.replace(n2, "$1variable-2$2"));
        return e4;
      }(s2, v, t4, r3);
    }, t3.prototype.indent = function(e4, t4, r3) {
      return t4 || (t4 = r3 = "x"), d(e4, t4, r3, this.indentConf);
    }, t3;
  }(e2.GrammarMode), b = { electricInput: /^\s*(?:case .*?:|default:|\{|\})$/, blockCommentStart: "/*", blockCommentEnd: "*/", blockCommentContinue: " * ", lineComment: "//", fold: "brace", closeBrackets: "()[]{}''\"\"``" };
  for (var w in b)
    y.prototype[w] = b[w];
  e2.registerHelper("wordChars", "google-typescript", /[\w$]/), e2.defineMode("google-typescript", function(e3, t3) {
    return new y(e3, t3);
  });
}(window.CodeMirror), function(e2) {
  var t2 = [[1, "\n", "	", " "], /^[a-zA-Z\-\.0-9_]+/], r2 = Object.freeze({ nodes: [[1, 3, 0, 0, 1], [/^[^]/, 0], [/^[^]/, -1], [2, 4, -1, { name: "comment", token: "comment" }, 2, 6, -1, { name: "doctype", token: "meta" }, 2, 8, -1, { name: "tag" }, 3, "atom", /^\&(?:(?![\;\n\t ]).)*\;/, -1, [1, "\n", /^(?:(?![\&\<]).)+/], -1], ["<!--", 5], [[0, /^(?!\-\-\>)/, /^[^]/], 5, "-->", -1], [/^(?:\<\!doctype|\<\!DOCTYPE)(?![a-zA-Z\-\.0-9_])/, 7], [[0, /^(?!\>)/, /^[^]/], 7, ">", -1], [2, 14, 9, { name: "openTag" }], [3, "tag", "/>", -1, [7, "selfClosing"], 10, 3, "tag", ">", 11], [3, "tag", ">", -1], [1, 3, 11, /^(?=\<\/)/, 12], [[7, "matchingTag"], 13, 0, -1], [2, 21, -1, { name: "closeTag" }], [3, "tag", [0, "<", [6, 24]], 15], [t2[0], 15, 3, "tag", t2[1], 16], [t2[0], 16, 0, 17], [3, "attribute", t2[1], 18, 0, -1], [t2[0], 18, "=", 19, 0, 20], [t2[0], 19, 2, 25, 20, { name: "attributeValue", token: "string" }], [t2[0], 20, 0, 17], [3, "tag", "</", 22], [t2[0], 22, 3, "tag", t2[1], 23], [3, "tag", ">", -1], [t2[0], 24, "/", -1], ['"', 26, "'", 27, /^(?:(?![\n\t \>]).)*/, -1], [[0, /^(?!\")/, /^[^]/], 26, '"', -1], [[0, /^(?!\')/, /^[^]/], 27, "'", -1]], start: 0, token: 2 });
  function n2(e3) {
    var t3 = /^\s*([\w_\.-]+)/.exec(e3);
    return t3 ? t3[1].toLowerCase() : "x";
  }
  function i2(e3) {
    return n2(e3.startLine.slice(e3.startPos + 1));
  }
  var o = "area base br col command embed frame hr img input keygen link meta param source track wbr menuitem".split(" "), a = { selfClosing: function(e3, t3, r3) {
    return o.indexOf(i2(r3)) > -1;
  }, matchingTag: function(e3, t3, r3) {
    return n2(e3.slice(t3 + 2)) == i2(r3);
  } }, l = function(e3) {
    function t3(t4, n3) {
      e3.call(this, r2, { predicates: a }), this.conf = t4;
    }
    return e3 && (t3.__proto__ = e3), t3.prototype = Object.create(e3 && e3.prototype), t3.prototype.constructor = t3, t3.prototype.indent = function(e4, t4, r3) {
      return function(e5, t5, r4, n3) {
        for (var o2 = e5.contextAt(r4, r4.length - t5.length), a2 = /^\s*<\/\s*([\w_\.-]+)/.exec(t5); o2; ) {
          if (o2.name == "tag") {
            var l2 = CodeMirror.countColumn(o2.startLine, null, n3.tabSize);
            return a2 && a2[1].toLowerCase() == i2(o2) ? l2 : l2 + n3.indentUnit;
          }
          if (o2.name == "openTag")
            return CodeMirror.countColumn(o2.startLine, null, n3.tabSize) + 2 * n3.indentUnit;
          o2 = o2.parent;
        }
        return 0;
      }(e4, t4, r3, this.conf);
    }, t3;
  }(e2.GrammarMode), s = l.prototype;
  s.electricInput = /^\s*<\/.*?>/, s.blockCommentStart = "<!--", s.blockCommentEnd = "-->", s.fold = "xml", function(e3) {
    e3.xmlCurrentTag = function(e4) {
      var t3 = e4.context;
      if (!t3 || t3.name != "openTag" && t3.name != "closeTag")
        return null;
      var r3 = /^<\/?\s*([\w\-\.]+)/.exec(t3.startLine.slice(t3.startPos));
      return r3 ? { name: r3[1], close: t3.name == "closeTag" } : null;
    }, e3.xmlCurrentContext = function(e4) {
      for (var t3 = [], r3 = e4.context; r3; r3 = r3.parent)
        if (r3.name == "tag") {
          var n3 = /^<\s*([\w\-\.]+)/.exec(r3.startLine.slice(r3.startPos));
          n3 && t3.push(n3[1]);
        }
      return t3.reverse();
    };
  }(s), e2.defineMode("google-html", function(e3, t3) {
    return new l(e3, t3);
  });
}(window.CodeMirror), function(e2) {
  function t2(e3) {
    for (var t3 = {}, r3 = 0; r3 < e3.length; ++r3)
      t3[e3[r3].toLowerCase()] = true;
    return t3;
  }
  e2.defineMode("css", function(t3, r3) {
    var n3 = r3.inline;
    r3.propertyKeywords || (r3 = e2.resolveMode("text/css"));
    var i3, o2, a2 = t3.indentUnit, l2 = r3.tokenHooks, s2 = r3.documentTypes || {}, c2 = r3.mediaTypes || {}, u2 = r3.mediaFeatures || {}, d2 = r3.mediaValueKeywords || {}, f2 = r3.propertyKeywords || {}, h2 = r3.nonStandardPropertyKeywords || {}, p2 = r3.fontProperties || {}, m2 = r3.counterDescriptors || {}, g2 = r3.colorKeywords || {}, v2 = r3.valueKeywords || {}, y2 = r3.allowNested, b2 = r3.lineComment, w2 = r3.supportsAtComponent === true, k2 = t3.highlightNonStandardPropertyKeywords !== false;
    function x(e3, t4) {
      return i3 = t4, e3;
    }
    function C(e3, t4) {
      var r4 = e3.next();
      if (l2[r4]) {
        var n4 = l2[r4](e3, t4);
        if (n4 !== false)
          return n4;
      }
      return r4 == "@" ? (e3.eatWhile(/[\w\\\-]/), x("def", e3.current())) : r4 == "=" || (r4 == "~" || r4 == "|") && e3.eat("=") ? x(null, "compare") : r4 == '"' || r4 == "'" ? (t4.tokenize = S(r4), t4.tokenize(e3, t4)) : r4 == "#" ? (e3.eatWhile(/[\w\\\-]/), x("atom", "hash")) : r4 == "!" ? (e3.match(/^\s*\w*/), x("keyword", "important")) : /\d/.test(r4) || r4 == "." && e3.eat(/\d/) ? (e3.eatWhile(/[\w.%]/), x("number", "unit")) : r4 !== "-" ? /[,+>*\/]/.test(r4) ? x(null, "select-op") : r4 == "." && e3.match(/^-?[_a-z][_a-z0-9-]*/i) ? x("qualifier", "qualifier") : /[:;{}\[\]\(\)]/.test(r4) ? x(null, r4) : e3.match(/^[\w-.]+(?=\()/) ? (/^(url(-prefix)?|domain|regexp)$/i.test(e3.current()) && (t4.tokenize = L), x("variable callee", "variable")) : /[\w\\\-]/.test(r4) ? (e3.eatWhile(/[\w\\\-]/), x("property", "word")) : x(null, null) : /[\d.]/.test(e3.peek()) ? (e3.eatWhile(/[\w.%]/), x("number", "unit")) : e3.match(/^-[\w\\\-]*/) ? (e3.eatWhile(/[\w\\\-]/), e3.match(/^\s*:/, false) ? x("variable-2", "variable-definition") : x("variable-2", "variable")) : e3.match(/^\w+-/) ? x("meta", "meta") : void 0;
    }
    function S(e3) {
      return function(t4, r4) {
        for (var n4, i4 = false; (n4 = t4.next()) != null; ) {
          if (n4 == e3 && !i4) {
            e3 == ")" && t4.backUp(1);
            break;
          }
          i4 = !i4 && n4 == "\\";
        }
        return (n4 == e3 || !i4 && e3 != ")") && (r4.tokenize = null), x("string", "string");
      };
    }
    function L(e3, t4) {
      return e3.next(), e3.match(/^\s*[\"\')]/, false) ? t4.tokenize = null : t4.tokenize = S(")"), x(null, "(");
    }
    function T(e3, t4, r4) {
      this.type = e3, this.indent = t4, this.prev = r4;
    }
    function A(e3, t4, r4, n4) {
      return e3.context = new T(r4, t4.indentation() + (n4 === false ? 0 : a2), e3.context), r4;
    }
    function M(e3) {
      return e3.context.prev && (e3.context = e3.context.prev), e3.context.type;
    }
    function z(e3, t4, r4) {
      return N[r4.context.type](e3, t4, r4);
    }
    function O(e3, t4, r4, n4) {
      for (var i4 = n4 || 1; i4 > 0; i4--)
        r4.context = r4.context.prev;
      return z(e3, t4, r4);
    }
    function _(e3) {
      var t4 = e3.current().toLowerCase();
      o2 = v2.hasOwnProperty(t4) ? "atom" : g2.hasOwnProperty(t4) ? "keyword" : "variable";
    }
    var N = { top: function(e3, t4, r4) {
      if (e3 == "{")
        return A(r4, t4, "block");
      if (e3 == "}" && r4.context.prev)
        return M(r4);
      if (w2 && /@component/i.test(e3))
        return A(r4, t4, "atComponentBlock");
      if (/^@(-moz-)?document$/i.test(e3))
        return A(r4, t4, "documentTypes");
      if (/^@(media|supports|(-moz-)?document|import)$/i.test(e3))
        return A(r4, t4, "atBlock");
      if (/^@(font-face|counter-style)/i.test(e3))
        return r4.stateArg = e3, "restricted_atBlock_before";
      if (/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(e3))
        return "keyframes";
      if (e3 && e3.charAt(0) == "@")
        return A(r4, t4, "at");
      if (e3 == "hash")
        o2 = "builtin";
      else if (e3 == "word")
        o2 = "tag";
      else {
        if (e3 == "variable-definition")
          return "maybeprop";
        if (e3 == "interpolation")
          return A(r4, t4, "interpolation");
        if (e3 == ":")
          return "pseudo";
        if (y2 && e3 == "(")
          return A(r4, t4, "parens");
      }
      return r4.context.type;
    }, block: function(e3, t4, r4) {
      if (e3 == "word") {
        var n4 = t4.current().toLowerCase();
        return f2.hasOwnProperty(n4) ? (o2 = "property", "maybeprop") : h2.hasOwnProperty(n4) ? (o2 = k2 ? "string-2" : "property", "maybeprop") : y2 ? (o2 = t4.match(/^\s*:(?:\s|$)/, false) ? "property" : "tag", "block") : (o2 += " error", "maybeprop");
      }
      return e3 == "meta" ? "block" : y2 || e3 != "hash" && e3 != "qualifier" ? N.top(e3, t4, r4) : (o2 = "error", "block");
    }, maybeprop: function(e3, t4, r4) {
      return e3 == ":" ? A(r4, t4, "prop") : z(e3, t4, r4);
    }, prop: function(e3, t4, r4) {
      if (e3 == ";")
        return M(r4);
      if (e3 == "{" && y2)
        return A(r4, t4, "propBlock");
      if (e3 == "}" || e3 == "{")
        return O(e3, t4, r4);
      if (e3 == "(")
        return A(r4, t4, "parens");
      if (e3 != "hash" || /^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(t4.current())) {
        if (e3 == "word")
          _(t4);
        else if (e3 == "interpolation")
          return A(r4, t4, "interpolation");
      } else
        o2 += " error";
      return "prop";
    }, propBlock: function(e3, t4, r4) {
      return e3 == "}" ? M(r4) : e3 == "word" ? (o2 = "property", "maybeprop") : r4.context.type;
    }, parens: function(e3, t4, r4) {
      return e3 == "{" || e3 == "}" ? O(e3, t4, r4) : e3 == ")" ? M(r4) : e3 == "(" ? A(r4, t4, "parens") : e3 == "interpolation" ? A(r4, t4, "interpolation") : (e3 == "word" && _(t4), "parens");
    }, pseudo: function(e3, t4, r4) {
      return e3 == "meta" ? "pseudo" : e3 == "word" ? (o2 = "variable-3", r4.context.type) : z(e3, t4, r4);
    }, documentTypes: function(e3, t4, r4) {
      return e3 == "word" && s2.hasOwnProperty(t4.current()) ? (o2 = "tag", r4.context.type) : N.atBlock(e3, t4, r4);
    }, atBlock: function(e3, t4, r4) {
      if (e3 == "(")
        return A(r4, t4, "atBlock_parens");
      if (e3 == "}" || e3 == ";")
        return O(e3, t4, r4);
      if (e3 == "{")
        return M(r4) && A(r4, t4, y2 ? "block" : "top");
      if (e3 == "interpolation")
        return A(r4, t4, "interpolation");
      if (e3 == "word") {
        var n4 = t4.current().toLowerCase();
        o2 = n4 == "only" || n4 == "not" || n4 == "and" || n4 == "or" ? "keyword" : c2.hasOwnProperty(n4) ? "attribute" : u2.hasOwnProperty(n4) ? "property" : d2.hasOwnProperty(n4) ? "keyword" : f2.hasOwnProperty(n4) ? "property" : h2.hasOwnProperty(n4) ? k2 ? "string-2" : "property" : v2.hasOwnProperty(n4) ? "atom" : g2.hasOwnProperty(n4) ? "keyword" : "error";
      }
      return r4.context.type;
    }, atComponentBlock: function(e3, t4, r4) {
      return e3 == "}" ? O(e3, t4, r4) : e3 == "{" ? M(r4) && A(r4, t4, y2 ? "block" : "top", false) : (e3 == "word" && (o2 = "error"), r4.context.type);
    }, atBlock_parens: function(e3, t4, r4) {
      return e3 == ")" ? M(r4) : e3 == "{" || e3 == "}" ? O(e3, t4, r4, 2) : N.atBlock(e3, t4, r4);
    }, restricted_atBlock_before: function(e3, t4, r4) {
      return e3 == "{" ? A(r4, t4, "restricted_atBlock") : e3 == "word" && r4.stateArg == "@counter-style" ? (o2 = "variable", "restricted_atBlock_before") : z(e3, t4, r4);
    }, restricted_atBlock: function(e3, t4, r4) {
      return e3 == "}" ? (r4.stateArg = null, M(r4)) : e3 == "word" ? (o2 = r4.stateArg == "@font-face" && !p2.hasOwnProperty(t4.current().toLowerCase()) || r4.stateArg == "@counter-style" && !m2.hasOwnProperty(t4.current().toLowerCase()) ? "error" : "property", "maybeprop") : "restricted_atBlock";
    }, keyframes: function(e3, t4, r4) {
      return e3 == "word" ? (o2 = "variable", "keyframes") : e3 == "{" ? A(r4, t4, "top") : z(e3, t4, r4);
    }, at: function(e3, t4, r4) {
      return e3 == ";" ? M(r4) : e3 == "{" || e3 == "}" ? O(e3, t4, r4) : (e3 == "word" ? o2 = "tag" : e3 == "hash" && (o2 = "builtin"), "at");
    }, interpolation: function(e3, t4, r4) {
      return e3 == "}" ? M(r4) : e3 == "{" || e3 == ";" ? O(e3, t4, r4) : (e3 == "word" ? o2 = "variable" : e3 != "variable" && e3 != "(" && e3 != ")" && (o2 = "error"), "interpolation");
    } };
    return { startState: function(e3) {
      return { tokenize: null, state: n3 ? "block" : "top", stateArg: null, context: new T(n3 ? "block" : "top", e3 || 0, null) };
    }, token: function(e3, t4) {
      if (!t4.tokenize && e3.eatSpace())
        return null;
      var r4 = (t4.tokenize || C)(e3, t4);
      return r4 && typeof r4 == "object" && (i3 = r4[1], r4 = r4[0]), o2 = r4, i3 != "comment" && (t4.state = N[t4.state](i3, e3, t4)), o2;
    }, indent: function(e3, t4) {
      var r4 = e3.context, n4 = t4 && t4.charAt(0), i4 = r4.indent;
      return r4.type != "prop" || n4 != "}" && n4 != ")" || (r4 = r4.prev), r4.prev && (n4 != "}" || r4.type != "block" && r4.type != "top" && r4.type != "interpolation" && r4.type != "restricted_atBlock" ? (n4 != ")" || r4.type != "parens" && r4.type != "atBlock_parens") && (n4 != "{" || r4.type != "at" && r4.type != "atBlock") || (i4 = Math.max(0, r4.indent - a2)) : i4 = (r4 = r4.prev).indent), i4;
    }, electricChars: "}", blockCommentStart: "/*", blockCommentEnd: "*/", blockCommentContinue: " * ", lineComment: b2, fold: "brace" };
  });
  var r2 = ["domain", "regexp", "url", "url-prefix"], n2 = t2(r2), i2 = ["all", "aural", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "embossed"], o = t2(i2), a = ["width", "min-width", "max-width", "height", "min-height", "max-height", "device-width", "min-device-width", "max-device-width", "device-height", "min-device-height", "max-device-height", "aspect-ratio", "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio", "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color", "max-color", "color-index", "min-color-index", "max-color-index", "monochrome", "min-monochrome", "max-monochrome", "resolution", "min-resolution", "max-resolution", "scan", "grid", "orientation", "device-pixel-ratio", "min-device-pixel-ratio", "max-device-pixel-ratio", "pointer", "any-pointer", "hover", "any-hover", "prefers-color-scheme"], l = t2(a), s = ["landscape", "portrait", "none", "coarse", "fine", "on-demand", "hover", "interlace", "progressive", "dark", "light"], c = t2(s), u = ["align-content", "align-items", "align-self", "alignment-adjust", "alignment-baseline", "all", "anchor-point", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "appearance", "azimuth", "backdrop-filter", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-position-x", "background-position-y", "background-repeat", "background-size", "baseline-shift", "binding", "bleed", "block-size", "bookmark-label", "bookmark-level", "bookmark-state", "bookmark-target", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "color", "color-profile", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "contain", "content", "counter-increment", "counter-reset", "crop", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "dominant-baseline", "drop-initial-after-adjust", "drop-initial-after-align", "drop-initial-before-adjust", "drop-initial-before-align", "drop-initial-size", "drop-initial-value", "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "float-offset", "flow-from", "flow-into", "font", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-optical-sizing", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variation-settings", "font-weight", "gap", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-gap", "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-gap", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "inline-box-align", "inset", "inset-block", "inset-block-end", "inset-block-start", "inset-inline", "inset-inline-end", "inset-inline-start", "isolation", "justify-content", "justify-items", "justify-self", "left", "letter-spacing", "line-break", "line-height", "line-height-step", "line-stacking", "line-stacking-ruby", "line-stacking-shift", "line-stacking-strategy", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marks", "marquee-direction", "marquee-loop", "marquee-play-count", "marquee-speed", "marquee-style", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "max-block-size", "max-height", "max-inline-size", "max-width", "min-block-size", "min-height", "min-inline-size", "min-width", "mix-blend-mode", "move-to", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "object-fit", "object-position", "offset", "offset-anchor", "offset-distance", "offset-path", "offset-position", "offset-rotate", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "page-policy", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "place-content", "place-items", "place-self", "play-during", "position", "presentation-level", "punctuation-trim", "quotes", "region-break-after", "region-break-before", "region-break-inside", "region-fragment", "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness", "right", "rotate", "rotation", "rotation-point", "row-gap", "ruby-align", "ruby-overhang", "ruby-position", "ruby-span", "scale", "scroll-behavior", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align", "scroll-snap-type", "shape-image-threshold", "shape-inside", "shape-margin", "shape-outside", "size", "speak", "speak-as", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set", "tab-size", "table-layout", "target", "target-name", "target-new", "target-position", "text-align", "text-align-last", "text-combine-upright", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-skip-ink", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-height", "text-indent", "text-justify", "text-orientation", "text-outline", "text-overflow", "text-rendering", "text-shadow", "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position", "text-wrap", "top", "touch-action", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "translate", "unicode-bidi", "user-select", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "volume", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index", "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color", "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events", "color-interpolation", "color-interpolation-filters", "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering", "marker", "marker-end", "marker-mid", "marker-start", "paint-order", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering", "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal", "glyph-orientation-vertical", "text-anchor", "writing-mode"], d = t2(u), f = ["border-block", "border-block-color", "border-block-end", "border-block-end-color", "border-block-end-style", "border-block-end-width", "border-block-start", "border-block-start-color", "border-block-start-style", "border-block-start-width", "border-block-style", "border-block-width", "border-inline", "border-inline-color", "border-inline-end", "border-inline-end-color", "border-inline-end-style", "border-inline-end-width", "border-inline-start", "border-inline-start-color", "border-inline-start-style", "border-inline-start-width", "border-inline-style", "border-inline-width", "margin-block", "margin-block-end", "margin-block-start", "margin-inline", "margin-inline-end", "margin-inline-start", "padding-block", "padding-block-end", "padding-block-start", "padding-inline", "padding-inline-end", "padding-inline-start", "scroll-snap-stop", "scrollbar-3d-light-color", "scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-track-color", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "shape-inside", "zoom"], h = t2(f), p = t2(["font-display", "font-family", "src", "unicode-range", "font-variant", "font-feature-settings", "font-stretch", "font-weight", "font-style"]), m = t2(["additive-symbols", "fallback", "negative", "pad", "prefix", "range", "speak-as", "suffix", "symbols", "system"]), g = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"], v = t2(g), y = ["above", "absolute", "activeborder", "additive", "activecaption", "afar", "after-white-space", "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate", "always", "amharic", "amharic-abegede", "antialiased", "appworkspace", "arabic-indic", "armenian", "asterisks", "attr", "auto", "auto-flow", "avoid", "avoid-column", "avoid-page", "avoid-region", "axis-pan", "background", "backwards", "baseline", "below", "bidi-override", "binary", "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box", "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "button-bevel", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "cambodian", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-decimal", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote", "col-resize", "collapse", "color", "color-burn", "color-dodge", "column", "column-reverse", "compact", "condensed", "contain", "content", "contents", "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover", "crop", "cross", "crosshair", "currentcolor", "cursive", "cyclic", "darken", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "dense", "destination-atop", "destination-in", "destination-out", "destination-over", "devanagari", "difference", "disc", "discard", "disclosure-closed", "disclosure-open", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede", "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er", "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er", "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et", "ethiopic-halehame-gez", "ethiopic-halehame-om-et", "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et", "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig", "ethiopic-numeric", "ew-resize", "exclusion", "expanded", "extends", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fill-box", "fixed", "flat", "flex", "flex-end", "flex-start", "footnotes", "forwards", "from", "geometricPrecision", "georgian", "graytext", "grid", "groove", "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hard-light", "hebrew", "help", "hidden", "hide", "higher", "highlight", "highlighttext", "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "hue", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-flex", "inline-grid", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "japanese-formal", "japanese-informal", "justify", "kannada", "katakana", "katakana-iroha", "keep-all", "khmer", "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal", "landscape", "lao", "large", "larger", "left", "level", "lighter", "lighten", "line-through", "linear", "linear-gradient", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian", "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lower-roman", "lowercase", "ltr", "luminosity", "malayalam", "manipulation", "match", "matrix", "matrix3d", "media-controls-background", "media-current-time-display", "media-fullscreen-button", "media-mute-button", "media-play-button", "media-return-to-realtime-button", "media-rewind-button", "media-seek-back-button", "media-seek-forward-button", "media-slider", "media-sliderthumb", "media-time-remaining-display", "media-volume-slider", "media-volume-slider-container", "media-volume-sliderthumb", "medium", "menu", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic", "mix", "mongolian", "monospace", "move", "multiple", "multiple_mask_images", "multiply", "myanmar", "n-resize", "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize", "oblique", "octal", "opacity", "open-quote", "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset", "outside", "outside-shape", "overlay", "overline", "padding", "padding-box", "painted", "page", "paused", "persian", "perspective", "pinch-zoom", "plus-darker", "plus-lighter", "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radial-gradient", "radio", "read-only", "read-write", "read-write-plaintext-only", "rectangle", "region", "relative", "repeat", "repeating-linear-gradient", "repeating-radial-gradient", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY", "rotateZ", "round", "row", "row-resize", "row-reverse", "rtl", "run-in", "running", "s-resize", "sans-serif", "saturation", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "screen", "scroll", "scrollbar", "scroll-position", "se-resize", "searchfield", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "self-start", "self-end", "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama", "simp-chinese-formal", "simp-chinese-informal", "single", "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "soft-light", "solid", "somali", "source-atop", "source-in", "source-out", "source-over", "space", "space-around", "space-between", "space-evenly", "spell-out", "square", "square-button", "start", "static", "status-bar", "stretch", "stroke", "stroke-box", "sub", "subpixel-antialiased", "svg_masks", "super", "sw-resize", "symbolic", "symbols", "system-ui", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "tamil", "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er", "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top", "trad-chinese-formal", "trad-chinese-informal", "transform", "translate", "translate3d", "translateX", "translateY", "translateZ", "transparent", "ultra-condensed", "ultra-expanded", "underline", "unidirectional-pan", "unset", "up", "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal", "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url", "var", "vertical", "vertical-text", "view-box", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe", "windowtext", "words", "wrap", "wrap-reverse", "x-large", "x-small", "xor", "xx-large", "xx-small"], b = t2(y), w = r2.concat(i2).concat(a).concat(s).concat(u).concat(f).concat(g).concat(y);
  function k(e3, t3) {
    for (var r3, n3 = false; (r3 = e3.next()) != null; ) {
      if (n3 && r3 == "/") {
        t3.tokenize = null;
        break;
      }
      n3 = r3 == "*";
    }
    return ["comment", "comment"];
  }
  e2.registerHelper("hintWords", "css", w), e2.defineMIME("text/css", { documentTypes: n2, mediaTypes: o, mediaFeatures: l, mediaValueKeywords: c, propertyKeywords: d, nonStandardPropertyKeywords: h, fontProperties: p, counterDescriptors: m, colorKeywords: v, valueKeywords: b, tokenHooks: { "/": function(e3, t3) {
    return !!e3.eat("*") && (t3.tokenize = k, k(e3, t3));
  } }, name: "css" }), e2.defineMIME("text/x-scss", { mediaTypes: o, mediaFeatures: l, mediaValueKeywords: c, propertyKeywords: d, nonStandardPropertyKeywords: h, colorKeywords: v, valueKeywords: b, fontProperties: p, allowNested: true, lineComment: "//", tokenHooks: { "/": function(e3, t3) {
    return e3.eat("/") ? (e3.skipToEnd(), ["comment", "comment"]) : e3.eat("*") ? (t3.tokenize = k, k(e3, t3)) : ["operator", "operator"];
  }, ":": function(e3) {
    return !!e3.match(/^\s*\{/, false) && [null, null];
  }, $: function(e3) {
    return e3.match(/^[\w-]+/), e3.match(/^\s*:/, false) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"];
  }, "#": function(e3) {
    return !!e3.eat("{") && [null, "interpolation"];
  } }, name: "css", helperType: "scss" }), e2.defineMIME("text/x-less", { mediaTypes: o, mediaFeatures: l, mediaValueKeywords: c, propertyKeywords: d, nonStandardPropertyKeywords: h, colorKeywords: v, valueKeywords: b, fontProperties: p, allowNested: true, lineComment: "//", tokenHooks: { "/": function(e3, t3) {
    return e3.eat("/") ? (e3.skipToEnd(), ["comment", "comment"]) : e3.eat("*") ? (t3.tokenize = k, k(e3, t3)) : ["operator", "operator"];
  }, "@": function(e3) {
    return e3.eat("{") ? [null, "interpolation"] : !e3.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i, false) && (e3.eatWhile(/[\w\\\-]/), e3.match(/^\s*:/, false) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"]);
  }, "&": function() {
    return ["atom", "atom"];
  } }, name: "css", helperType: "less" }), e2.defineMIME("text/x-gss", { documentTypes: n2, mediaTypes: o, mediaFeatures: l, propertyKeywords: d, nonStandardPropertyKeywords: h, fontProperties: p, counterDescriptors: m, colorKeywords: v, valueKeywords: b, supportsAtComponent: true, tokenHooks: { "/": function(e3, t3) {
    return !!e3.eat("*") && (t3.tokenize = k, k(e3, t3));
  } }, name: "css", helperType: "gss" });
}(CodeMirror);

// node_modules/playground-elements/lib/codemirror.js
var CodeMirror2 = window.CodeMirror;

// node_modules/playground-elements/playground-styles.js
var playgroundStyles = css`/**
 * This file is derived from \`code-mirror/lib/codemirror.css\`, modified in the
 * following ways:
 *
 * - CSS custom properties added.
 * - Rules for unused features and addons removed.
 * - Unnecessary vendor prefixes removed.
 * - \`.cm-s-default\` class selectors removed.
 * - Empty rules removed.
 */

/* BASICS */

.CodeMirror {
  /* Set height, width, borders, and global font properties here */
  font-family: var(--playground-code-font-family, monospace);
  font-size: var(--playground-code-font-size, 14px);
  height: 350px;
  color: var(--playground-code-default-color, #000);
  background: var(--playground-code-background, #fff);
  direction: ltr;
  /* CodeMirror uses z-indexes up to 6 to e.g. place scrollbars above the code
     area. However, this can create undesirable stacking effects with the rest
     of the page. Force a new stacking context. */
  isolation: isolate;
  line-height: var(--playground-code-line-height, 1.4em);
}

/* PADDING */

.CodeMirror-lines {
  padding: 4px 0; /* Vertical padding around content */
}
.CodeMirror pre.CodeMirror-line,
.CodeMirror pre.CodeMirror-line-like {
  padding: 0 4px; /* Horizontal padding of content */
}

.CodeMirror-scrollbar-filler,
.CodeMirror-gutter-filler {
  background: var(
    --playground-code-background,
    #fff
  ); /* The little square between H and V scrollbars */
}

/* GUTTER */

.CodeMirror-gutters {
  border-right: var(--playground-code-gutter-border-right, none);
  background: var(
    --playground-code-gutter-background,
    var(--playground-code-background, #fff)
  );
  box-shadow: var(--playground-code-gutter-box-shadow, none);
  white-space: nowrap;
}
.CodeMirror-linenumber {
  padding: 0 3px 0 5px;
  min-width: 20px;
  text-align: right;
  color: var(--playground-code-linenumber-color, #767676);
  white-space: nowrap;
  margin-right: 1em;
}
.CodeMirror-code > div > .CodeMirror-line {
  /* Some extra room between the line number gutter and the line */
  padding-left: 0.7em;
}

/* CURSOR */

.CodeMirror-cursor {
  border-left: 2px solid
    var(
      --playground-code-cursor-color,
      var(--playground-code-default-color, #000)
    );
  border-right: none;
  width: 0;
}

@keyframes blink {
  0% {
  }
  50% {
    background: transparent;
  }
  100% {
  }
}

/* DEFAULT THEME */

.cm-header,
.cm-strong {
  font-weight: bold;
}
.cm-em {
  font-style: italic;
}
.cm-link {
  text-decoration: underline;
}
.cm-strikethrough {
  text-decoration: line-through;
}

.cm-keyword {
  color: var(--playground-code-keyword-color, #708);
}
.cm-atom {
  color: var(--playground-code-atom-color, #219);
}
.cm-number {
  color: var(--playground-code-number-color, #164);
}
.cm-def {
  color: var(--playground-code-def-color, #00f);
}
.cm-variable {
  color: var(--playground-code-variable-color, #000);
}
.cm-property {
  color: var(--playground-code-property-color, #000);
}
.cm-operator {
  color: var(--playground-code-operator-color, #000);
}
.cm-variable-2 {
  color: var(--playground-code-variable-2-color, #05a);
}
.cm-variable-3 {
  color: var(--playground-code-variable-3-color, #085);
}
.cm-type {
  color: var(--playground-code-type-color, #085);
}
.cm-comment {
  color: var(--playground-code-comment-color, #a50);
}
.cm-string {
  color: var(--playground-code-string-color, #a11);
}
.cm-string-2 {
  color: var(--playground-code-string-2-color, #f50);
}
.cm-meta {
  color: var(--playground-code-meta-color, #555);
}
.cm-qualifier {
  color: var(--playground-code-qualifier-color, #555);
}
.cm-builtin {
  color: var(--playground-code-builtin-color, #30a);
}
.cm-tag {
  color: var(--playground-code-tag-color, #170);
}
.cm-attribute {
  color: var(--playground-code-attribute-color, #00c);
}
.cm-callee {
  color: var(--playground-code-callee-color, #000);
}

.CodeMirror-composing {
  border-bottom: 2px solid;
}

/* STOP */

/* The rest of this file contains styles related to the mechanics of
   the editor. You probably shouldn't touch them. */

.CodeMirror {
  position: relative;
  overflow: hidden;
}

.CodeMirror-scroll {
  overflow: scroll !important; /* Things will break if this is overridden */
  /* 50px is the magic margin used to hide the element's real scrollbars */
  /* See overflow: hidden in .CodeMirror */
  margin-bottom: -50px;
  margin-right: -50px;
  padding-bottom: 50px;
  height: 100%;
  outline: none; /* Prevent dragging from highlighting the element */
  position: relative;
}
.CodeMirror-sizer {
  position: relative;
  border-right: 50px solid transparent;
}

/* The fake, visible scrollbars. Used to force redraw during scrolling
   before actual scrolling happens, thus preventing shaking and
   flickering artifacts. */
.CodeMirror-vscrollbar,
.CodeMirror-hscrollbar,
.CodeMirror-scrollbar-filler,
.CodeMirror-gutter-filler {
  position: absolute;
  z-index: 6;
  display: none;
  outline: none;
}
.CodeMirror-vscrollbar {
  right: 0;
  top: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
.CodeMirror-hscrollbar {
  bottom: 0;
  left: 0;
  overflow-y: hidden;
  overflow-x: scroll;
}
.CodeMirror-scrollbar-filler {
  right: 0;
  bottom: 0;
}
.CodeMirror-gutter-filler {
  left: 0;
  bottom: 0;
}

.CodeMirror-gutters {
  position: absolute;
  left: 0;
  top: 0;
  min-height: 100%;
  z-index: 3;
}
.CodeMirror-gutter {
  white-space: normal;
  height: 100%;
  display: inline-block;
  vertical-align: top;
  margin-bottom: -50px;
}
.CodeMirror-gutter-wrapper {
  position: absolute;
  z-index: 4;
  background: none !important;
  border: none !important;
}
.CodeMirror-gutter-background {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 4;
}
.CodeMirror-gutter-elt {
  position: absolute;
  cursor: default;
  z-index: 4;
}
.CodeMirror-gutter-wrapper ::selection {
  background: transparent;
}

.CodeMirror-lines {
  cursor: text;
  min-height: 1px; /* prevents collapsing before first draw */
}
.CodeMirror pre.CodeMirror-line,
.CodeMirror pre.CodeMirror-line-like {
  /* Reset some styles that the rest of the page might have set */
  border-radius: 0;
  border-width: 0;
  background: transparent;
  font-family: inherit;
  font-size: inherit;
  margin: 0;
  white-space: pre;
  word-wrap: normal;
  line-height: inherit;
  color: inherit;
  z-index: 2;
  position: relative;
  overflow: visible;
  -webkit-tap-highlight-color: transparent;
  font-variant-ligatures: contextual;
}
.CodeMirror-wrap pre.CodeMirror-line,
.CodeMirror-wrap pre.CodeMirror-line-like {
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: normal;
}

.CodeMirror-linebackground {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
}

.CodeMirror-linewidget {
  position: relative;
  z-index: 2;
  padding: 0.1px; /* Force widget margins to stay inside of the container */
}

.CodeMirror-rtl pre {
  direction: rtl;
}

.CodeMirror-code {
  outline: none;
}

/* Force content-box sizing for the elements where we expect it */
.CodeMirror-scroll,
.CodeMirror-sizer,
.CodeMirror-gutter,
.CodeMirror-gutters,
.CodeMirror-linenumber {
  box-sizing: content-box;
}

.CodeMirror-measure {
  position: absolute;
  width: 100%;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.CodeMirror-cursor {
  position: absolute;
  pointer-events: none;
}
.CodeMirror-measure pre {
  position: static;
}

div.CodeMirror-cursors {
  visibility: hidden;
  position: relative;
  z-index: 3;
}
div.CodeMirror-dragcursors {
  visibility: visible;
}

.CodeMirror-focused div.CodeMirror-cursors {
  visibility: visible;
}

.CodeMirror-selected {
  background: var(--playground-code-selection-background, #d7d4f0);
}
.CodeMirror-focused .CodeMirror-selected {
  background: var(--playground-code-selection-background, #d7d4f0);
}
.CodeMirror-crosshair {
  cursor: crosshair;
}
.CodeMirror-line::selection,
.CodeMirror-line > span::selection,
.CodeMirror-line > span > span::selection {
  background: var(--playground-code-selection-background, #d7d4f0);
}

/* Used to force a border model for a node */
.cm-force-border {
  padding-right: 0.1px;
}

@media print {
  /* Hide the cursor when printing */
  .CodeMirror div.CodeMirror-cursors {
    visibility: hidden;
  }
}

/* See issue #2901 */
.cm-tab-wrap-hack:after {
  content: '';
}

/* Help users use markselection to safely style text background */
span.CodeMirror-selectedtext {
  background: none;
}
`;
var playground_styles_default = playgroundStyles;

// node_modules/playground-elements/playground-code-editor.js
var unreachable = (n2) => n2;
var PlaygroundCodeEditor = class PlaygroundCodeEditor2 extends LitElement {
  constructor() {
    super(...arguments);
    this.lineNumbers = false;
    this.readonly = false;
    this.pragmas = "on";
    this._showKeyboardHelp = false;
    this._resizing = false;
    this._valueChangingFromOutside = false;
    this._ignoreValueChange = false;
    this._hideOrFoldRegionsActive = false;
    this._diagnosticMarkers = [];
    this._diagnosticsMouseoverListenerActive = false;
    this._onMouseOverWithDiagnostics = (event) => {
      var _a4, _b2, _c;
      if (!((_a4 = this.diagnostics) === null || _a4 === void 0 ? void 0 : _a4.length)) {
        return;
      }
      const idxMatch = (_b2 = event.target.className) === null || _b2 === void 0 ? void 0 : _b2.match(/diagnostic-(\d+)/);
      if (idxMatch === null) {
        this._tooltipDiagnostic = void 0;
        return;
      }
      const idx = Number(idxMatch[1]);
      const diagnostic = this.diagnostics[idx];
      if (diagnostic === ((_c = this._tooltipDiagnostic) === null || _c === void 0 ? void 0 : _c.diagnostic)) {
        return;
      }
      let position = "";
      const hostRect = this.getBoundingClientRect();
      const spanRect = event.target.getBoundingClientRect();
      const hostCenterY = hostRect.y + hostRect.height / 2;
      if (spanRect.y < hostCenterY) {
        position += `top:${spanRect.y + spanRect.height - hostRect.y}px;`;
      } else {
        position += `bottom:${hostRect.bottom - spanRect.y}px;`;
      }
      const hostCenterX = hostRect.x + hostRect.width / 2;
      if (spanRect.left < hostCenterX) {
        position += `left:${Math.max(0, spanRect.x - hostRect.x)}px`;
      } else {
        position += `right:${Math.max(0, hostRect.right - spanRect.right)}px`;
      }
      this._tooltipDiagnostic = { diagnostic, position };
    };
  }
  get value() {
    return this._value;
  }
  set value(v) {
    const oldValue = this._value;
    this._value = v;
    this.requestUpdate("value", oldValue);
  }
  update(changedProperties) {
    var _a4;
    const cm = this._codemirror;
    if (cm === void 0) {
      this._createView();
    } else {
      const changedTyped = changedProperties;
      for (const prop of changedTyped.keys()) {
        switch (prop) {
          case "value":
            this._valueChangingFromOutside = true;
            cm.setValue((_a4 = this.value) !== null && _a4 !== void 0 ? _a4 : "");
            this._valueChangingFromOutside = false;
            break;
          case "lineNumbers":
            cm.setOption("lineNumbers", this.lineNumbers);
            break;
          case "type":
            cm.setOption("mode", this._getLanguageMode());
            break;
          case "readonly":
            cm.setOption("readOnly", this.readonly);
            break;
          case "pragmas":
            this._applyHideAndFoldRegions();
            break;
          case "diagnostics":
            this._showDiagnostics();
            break;
          default:
            unreachable(prop);
        }
      }
    }
    super.update(changedProperties);
  }
  render() {
    var _a4, _b2;
    if (this.readonly) {
      return this._cmDom;
    }
    return html`
      <div
        id="focusContainer"
        tabindex="0"
        @mousedown=${this._onMousedown}
        @focus=${this._onFocus}
        @blur=${this._onBlur}
        @keydown=${this._onKeyDown}
      >
        ${this._showKeyboardHelp ? html`<div id="keyboardHelpScrim">
              <p id="keyboardHelp" part="dialog">
                Press <strong>Enter</strong> to start editing<br />
                Press <strong>Escape</strong> to exit editor
              </p>
            </div>` : nothing}
        ${this._cmDom}
        <div
          id="tooltip"
          ?hidden=${!this._tooltipDiagnostic}
          style=${ifDefined((_a4 = this._tooltipDiagnostic) === null || _a4 === void 0 ? void 0 : _a4.position)}
        >
          <div part="diagnostic-tooltip">
            ${(_b2 = this._tooltipDiagnostic) === null || _b2 === void 0 ? void 0 : _b2.diagnostic.message}
          </div>
        </div>
      </div>
    `;
  }
  connectedCallback() {
    if (typeof ResizeObserver === "function") {
      this._resizeObserver = new ResizeObserver(() => {
        var _a4;
        if (this._resizing) {
          return;
        }
        this._resizing = true;
        (_a4 = this._codemirror) === null || _a4 === void 0 ? void 0 : _a4.refresh();
        this._resizing = false;
      });
      this._resizeObserver.observe(this);
    }
    super.connectedCallback();
  }
  disconnectedCallback() {
    var _a4;
    (_a4 = this._resizeObserver) === null || _a4 === void 0 ? void 0 : _a4.disconnect();
    this._resizeObserver = void 0;
    super.disconnectedCallback();
  }
  _createView() {
    var _a4;
    const cm = CodeMirror2((dom) => {
      this._cmDom = dom;
      this._resizing = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          var _a5;
          (_a5 = this._codemirror) === null || _a5 === void 0 ? void 0 : _a5.refresh();
          this._resizing = false;
        });
      });
    }, {
      value: (_a4 = this.value) !== null && _a4 !== void 0 ? _a4 : "",
      lineNumbers: this.lineNumbers,
      mode: this._getLanguageMode(),
      readOnly: this.readonly,
      inputStyle: "contenteditable",
      tabindex: -1,
      extraKeys: {
        Tab: () => {
          var _a5;
          cm.replaceSelection(Array((_a5 = cm.getOption("indentUnit")) !== null && _a5 !== void 0 ? _a5 : 2).join(" "));
        }
      }
    });
    cm.on("change", () => {
      if (this._ignoreValueChange) {
        return;
      }
      this._value = cm.getValue();
      if (this._valueChangingFromOutside) {
        this._applyHideAndFoldRegions();
        this._showDiagnostics();
      } else {
        this.dispatchEvent(new Event("change"));
      }
    });
    this._codemirror = cm;
  }
  _onMousedown() {
    var _a4;
    (_a4 = this._codemirrorEditable) === null || _a4 === void 0 ? void 0 : _a4.focus();
  }
  _onFocus() {
    this._showKeyboardHelp = true;
  }
  _onBlur() {
    this._showKeyboardHelp = false;
  }
  _onKeyDown(event) {
    var _a4, _b2;
    if (event.key === "Enter" && event.target === this._focusContainer) {
      (_a4 = this._codemirrorEditable) === null || _a4 === void 0 ? void 0 : _a4.focus();
      event.preventDefault();
    } else if (event.key === "Escape") {
      (_b2 = this._focusContainer) === null || _b2 === void 0 ? void 0 : _b2.focus();
    }
  }
  async _applyHideAndFoldRegions() {
    const cm = this._codemirror;
    if (!cm) {
      return;
    }
    const value = cm.getValue();
    if (this._hideOrFoldRegionsActive) {
      await null;
      this._ignoreValueChange = true;
      cm.setValue("");
      cm.setValue(value);
      this._ignoreValueChange = false;
    }
    this._hideOrFoldRegionsActive = false;
    if (this.pragmas === "off-visible") {
      return;
    }
    const pattern = this._maskPatternForLang();
    if (pattern === void 0) {
      return;
    }
    const doc = cm.getDoc();
    const fold = (fromIdx, toIdx) => {
      cm.foldCode(0, {
        widget: "\u2026",
        rangeFinder: () => ({
          from: doc.posFromIndex(fromIdx),
          to: doc.posFromIndex(toIdx)
        })
      });
      this._hideOrFoldRegionsActive = true;
    };
    const hide = (fromIdx, toIdx) => {
      doc.markText(doc.posFromIndex(fromIdx), doc.posFromIndex(toIdx), {
        collapsed: true
      });
      this._hideOrFoldRegionsActive = true;
    };
    for (const match of value.matchAll(pattern)) {
      const [, opener, kind, content, closer] = match;
      const openerStart = match.index;
      if (openerStart === void 0) {
        continue;
      }
      const openerEnd = openerStart + opener.length;
      hide(openerStart, openerEnd);
      const contentStart = openerEnd;
      let contentEnd;
      if (content && closer) {
        contentEnd = contentStart + content.length;
        const closerStart = contentEnd;
        const closerEnd = contentEnd + closer.length;
        hide(closerStart, closerEnd);
      } else {
        contentEnd = value.length;
      }
      if (this.pragmas === "on") {
        if (kind === "fold") {
          fold(contentStart, contentEnd);
        } else if (kind === "hide") {
          hide(contentStart, contentEnd);
        }
      }
    }
  }
  _maskPatternForLang() {
    switch (this.type) {
      case "js":
      case "ts":
      case "css":
        return /( *\/\* *playground-(?<kind>hide|fold) *\*\/\n?)(?:(.*?)( *\/\* *playground-\k<kind>-end *\*\/\n?))?/gs;
      case "html":
        return /( *<!-- *playground-(?<kind>hide|fold) *-->\n?)(?:(.*?)( *<!-- *playground-\k<kind>-end *-->\n?))?/gs;
      default:
        return void 0;
    }
  }
  _getLanguageMode() {
    switch (this.type) {
      case "ts":
        return "google-typescript";
      case "js":
      case "json":
        return "google-javascript";
      case "html":
        return "google-html";
      case "css":
        return "css";
    }
    return void 0;
  }
  _showDiagnostics() {
    const cm = this._codemirror;
    if (cm === void 0) {
      return;
    }
    cm.operation(() => {
      var _a4, _b2, _c;
      this._tooltipDiagnostic = void 0;
      while (this._diagnosticMarkers.length > 0) {
        this._diagnosticMarkers.pop().clear();
      }
      if (!((_a4 = this.diagnostics) === null || _a4 === void 0 ? void 0 : _a4.length)) {
        if (this._diagnosticsMouseoverListenerActive) {
          (_b2 = this._cmDom) === null || _b2 === void 0 ? void 0 : _b2.removeEventListener("mouseover", this._onMouseOverWithDiagnostics);
          this._diagnosticsMouseoverListenerActive = false;
        }
        return;
      }
      if (!this._diagnosticsMouseoverListenerActive) {
        (_c = this._cmDom) === null || _c === void 0 ? void 0 : _c.addEventListener("mouseover", this._onMouseOverWithDiagnostics);
        this._diagnosticsMouseoverListenerActive = true;
      }
      for (let i2 = 0; i2 < this.diagnostics.length; i2++) {
        const diagnostic = this.diagnostics[i2];
        this._diagnosticMarkers.push(cm.markText({
          line: diagnostic.range.start.line,
          ch: diagnostic.range.start.character
        }, {
          line: diagnostic.range.end.line,
          ch: diagnostic.range.end.character
        }, {
          className: `diagnostic diagnostic-${i2}`
        }));
      }
    });
  }
};
PlaygroundCodeEditor.styles = [
  css`
      :host {
        display: block;
      }

      #focusContainer {
        height: 100%;
        position: relative;
      }
      #focusContainer:focus {
        outline: none;
      }

      .CodeMirror {
        height: 100% !important;
        border-radius: inherit;
      }

      #keyboardHelpScrim {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        z-index: 9;
        pointer-events: none;
        background: rgba(0, 0, 0, 0.32);
      }

      #keyboardHelp {
        background: #fff;
        color: #000;
        padding: 20px 40px;
        border-radius: 5px;
        font-family: sans-serif;
        font-size: 18px;
        line-height: 32px;
        box-shadow: rgba(0, 0, 0, 0.3) 0 2px 10px;
      }

      .CodeMirror-foldmarker {
        font-family: sans-serif;
      }
      .CodeMirror-foldmarker:hover {
        cursor: pointer;
        /* Pretty much any color from the theme is good enough. */
        color: var(--playground-code-keyword-color, #770088);
      }

      .diagnostic {
        position: relative;
      }

      .diagnostic::before {
        /* It would be nice to use "text-decoration: red wavy underline" here,
           but unfortunately it renders nothing at all for single characters.
           See https://bugs.chromium.org/p/chromium/issues/detail?id=668042. */
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJDw4cOCW1/KIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAHElEQVQI12NggIL/DAz/GdA5/xkY/qPKMDAwAADLZwf5rvm+LQAAAABJRU5ErkJggg==');
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
      }

      #tooltip {
        position: absolute;
        padding: 7px;
        z-index: 4;
        font-family: var(--playground-code-font-family, monospace);
      }

      #tooltip > div {
        background: var(--playground-code-background, #fff);
        color: var(--playground-code-default-color, #000);
        /* Kind of hacky... line number color tends to work out as a good
           default border, because it's usually visible on top of the
           background, but slightly muted. */
        border: 1px solid var(--playground-code-linenumber-color, #ccc);
        padding: 5px;
      }
    `,
  playground_styles_default
];
__decorate([
  property()
], PlaygroundCodeEditor.prototype, "type", void 0);
__decorate([
  property({ type: Boolean, attribute: "line-numbers", reflect: true })
], PlaygroundCodeEditor.prototype, "lineNumbers", void 0);
__decorate([
  property({ type: Boolean, reflect: true })
], PlaygroundCodeEditor.prototype, "readonly", void 0);
__decorate([
  property({ attribute: false })
], PlaygroundCodeEditor.prototype, "diagnostics", void 0);
__decorate([
  property()
], PlaygroundCodeEditor.prototype, "pragmas", void 0);
__decorate([
  internalProperty()
], PlaygroundCodeEditor.prototype, "_tooltipDiagnostic", void 0);
__decorate([
  internalProperty()
], PlaygroundCodeEditor.prototype, "_showKeyboardHelp", void 0);
__decorate([
  query("#focusContainer")
], PlaygroundCodeEditor.prototype, "_focusContainer", void 0);
__decorate([
  query(".CodeMirror-code")
], PlaygroundCodeEditor.prototype, "_codemirrorEditable", void 0);
PlaygroundCodeEditor = __decorate([
  customElement("playground-code-editor")
], PlaygroundCodeEditor);

// node_modules/@material/mwc-list/mwc-list-item-base.js
var ListItemBase = class extends LitElement2 {
  constructor() {
    super(...arguments);
    this.value = "";
    this.group = null;
    this.tabindex = -1;
    this.disabled = false;
    this.twoline = false;
    this.activated = false;
    this.graphic = null;
    this.multipleGraphics = false;
    this.hasMeta = false;
    this.noninteractive = false;
    this.selected = false;
    this.shouldRenderRipple = false;
    this._managingList = null;
    this.boundOnClick = this.onClick.bind(this);
    this._firstChanged = true;
    this._skipPropRequest = false;
    this.rippleHandlers = new RippleHandlers(() => {
      this.shouldRenderRipple = true;
      return this.ripple;
    });
    this.listeners = [
      {
        target: this,
        eventNames: ["click"],
        cb: () => {
          this.onClick();
        }
      },
      {
        target: this,
        eventNames: ["mouseenter"],
        cb: this.rippleHandlers.startHover
      },
      {
        target: this,
        eventNames: ["mouseleave"],
        cb: this.rippleHandlers.endHover
      },
      {
        target: this,
        eventNames: ["focus"],
        cb: this.rippleHandlers.startFocus
      },
      {
        target: this,
        eventNames: ["blur"],
        cb: this.rippleHandlers.endFocus
      },
      {
        target: this,
        eventNames: ["mousedown", "touchstart"],
        cb: (e2) => {
          const name = e2.type;
          this.onDown(name === "mousedown" ? "mouseup" : "touchend", e2);
        }
      }
    ];
  }
  get text() {
    const textContent = this.textContent;
    return textContent ? textContent.trim() : "";
  }
  render() {
    const text = this.renderText();
    const graphic = this.graphic ? this.renderGraphic() : html``;
    const meta = this.hasMeta ? this.renderMeta() : html``;
    return html`
      ${this.renderRipple()}
      ${graphic}
      ${text}
      ${meta}`;
  }
  renderRipple() {
    if (this.shouldRenderRipple) {
      return html`
      <mwc-ripple
        .activated=${this.activated}>
      </mwc-ripple>`;
    } else if (this.activated) {
      return html`<div class="fake-activated-ripple"></div>`;
    } else {
      return "";
    }
  }
  renderGraphic() {
    const graphicClasses = {
      multi: this.multipleGraphics
    };
    return html`
      <span class="mdc-deprecated-list-item__graphic material-icons ${classMap(graphicClasses)}">
        <slot name="graphic"></slot>
      </span>`;
  }
  renderMeta() {
    return html`
      <span class="mdc-deprecated-list-item__meta material-icons">
        <slot name="meta"></slot>
      </span>`;
  }
  renderText() {
    const inner = this.twoline ? this.renderTwoline() : this.renderSingleLine();
    return html`
      <span class="mdc-deprecated-list-item__text">
        ${inner}
      </span>`;
  }
  renderSingleLine() {
    return html`<slot></slot>`;
  }
  renderTwoline() {
    return html`
      <span class="mdc-deprecated-list-item__primary-text">
        <slot></slot>
      </span>
      <span class="mdc-deprecated-list-item__secondary-text">
        <slot name="secondary"></slot>
      </span>
    `;
  }
  onClick() {
    this.fireRequestSelected(!this.selected, "interaction");
  }
  onDown(upName, evt) {
    const onUp = () => {
      window.removeEventListener(upName, onUp);
      this.rippleHandlers.endPress();
    };
    window.addEventListener(upName, onUp);
    this.rippleHandlers.startPress(evt);
  }
  fireRequestSelected(selected, source) {
    if (this.noninteractive) {
      return;
    }
    const customEv = new CustomEvent("request-selected", { bubbles: true, composed: true, detail: { source, selected } });
    this.dispatchEvent(customEv);
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.noninteractive) {
      this.setAttribute("mwc-list-item", "");
    }
    for (const listener of this.listeners) {
      for (const eventName of listener.eventNames) {
        listener.target.addEventListener(eventName, listener.cb, { passive: true });
      }
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    for (const listener of this.listeners) {
      for (const eventName of listener.eventNames) {
        listener.target.removeEventListener(eventName, listener.cb);
      }
    }
    if (this._managingList) {
      this._managingList.debouncedLayout ? this._managingList.debouncedLayout(true) : this._managingList.layout(true);
    }
  }
  firstUpdated() {
    const ev = new Event("list-item-rendered", { bubbles: true, composed: true });
    this.dispatchEvent(ev);
  }
};
__decorate([
  query2("slot")
], ListItemBase.prototype, "slotElement", void 0);
__decorate([
  queryAsync("mwc-ripple")
], ListItemBase.prototype, "ripple", void 0);
__decorate([
  property2({ type: String })
], ListItemBase.prototype, "value", void 0);
__decorate([
  property2({ type: String, reflect: true })
], ListItemBase.prototype, "group", void 0);
__decorate([
  property2({ type: Number, reflect: true })
], ListItemBase.prototype, "tabindex", void 0);
__decorate([
  property2({ type: Boolean, reflect: true }),
  observer(function(value) {
    if (value) {
      this.setAttribute("aria-disabled", "true");
    } else {
      this.setAttribute("aria-disabled", "false");
    }
  })
], ListItemBase.prototype, "disabled", void 0);
__decorate([
  property2({ type: Boolean, reflect: true })
], ListItemBase.prototype, "twoline", void 0);
__decorate([
  property2({ type: Boolean, reflect: true })
], ListItemBase.prototype, "activated", void 0);
__decorate([
  property2({ type: String, reflect: true })
], ListItemBase.prototype, "graphic", void 0);
__decorate([
  property2({ type: Boolean })
], ListItemBase.prototype, "multipleGraphics", void 0);
__decorate([
  property2({ type: Boolean })
], ListItemBase.prototype, "hasMeta", void 0);
__decorate([
  property2({ type: Boolean, reflect: true }),
  observer(function(value) {
    if (value) {
      this.removeAttribute("aria-checked");
      this.removeAttribute("mwc-list-item");
      this.selected = false;
      this.activated = false;
      this.tabIndex = -1;
    } else {
      this.setAttribute("mwc-list-item", "");
    }
  })
], ListItemBase.prototype, "noninteractive", void 0);
__decorate([
  property2({ type: Boolean, reflect: true }),
  observer(function(value) {
    const role = this.getAttribute("role");
    const isAriaSelectable = role === "gridcell" || role === "option" || role === "row" || role === "tab";
    if (isAriaSelectable && value) {
      this.setAttribute("aria-selected", "true");
    } else if (isAriaSelectable) {
      this.setAttribute("aria-selected", "false");
    }
    if (this._firstChanged) {
      this._firstChanged = false;
      return;
    }
    if (this._skipPropRequest) {
      return;
    }
    this.fireRequestSelected(value, "property");
  })
], ListItemBase.prototype, "selected", void 0);
__decorate([
  internalProperty2()
], ListItemBase.prototype, "shouldRenderRipple", void 0);
__decorate([
  internalProperty2()
], ListItemBase.prototype, "_managingList", void 0);

// node_modules/@material/mwc-list/mwc-list-item-css.js
var style7 = css2`:host{cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;height:48px;display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:var(--mdc-list-side-padding, 16px);padding-right:var(--mdc-list-side-padding, 16px);outline:none;height:48px;color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}:host:focus{outline:none}:host([activated]){color:#6200ee;color:var(--mdc-theme-primary, #6200ee);--mdc-ripple-color: var( --mdc-theme-primary, #6200ee )}:host([activated]) .mdc-deprecated-list-item__graphic{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host([activated]) .fake-activated-ripple::before{position:absolute;display:block;top:0;bottom:0;left:0;right:0;width:100%;height:100%;pointer-events:none;z-index:1;content:"";opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12);background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-deprecated-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;display:inline-flex}.mdc-deprecated-list-item__graphic ::slotted(*){flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;width:100%;height:100%;text-align:center}.mdc-deprecated-list-item__meta{width:var(--mdc-list-item-meta-size, 24px);height:var(--mdc-list-item-meta-size, 24px);margin-left:auto;margin-right:0;color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-item__meta.multi{width:auto}.mdc-deprecated-list-item__meta ::slotted(*){width:var(--mdc-list-item-meta-size, 24px);line-height:var(--mdc-list-item-meta-size, 24px)}.mdc-deprecated-list-item__meta ::slotted(.material-icons),.mdc-deprecated-list-item__meta ::slotted(mwc-icon){line-height:var(--mdc-list-item-meta-size, 24px) !important}.mdc-deprecated-list-item__meta ::slotted(:not(.material-icons):not(mwc-icon)){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit)}[dir=rtl] .mdc-deprecated-list-item__meta,.mdc-deprecated-list-item__meta[dir=rtl]{margin-left:0;margin-right:auto}.mdc-deprecated-list-item__meta ::slotted(*){width:100%;height:100%}.mdc-deprecated-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-deprecated-list-item__text ::slotted([for]),.mdc-deprecated-list-item__text[for]{pointer-events:none}.mdc-deprecated-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px;display:block}.mdc-deprecated-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-deprecated-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-deprecated-list-item__secondary-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;display:block}.mdc-deprecated-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-deprecated-list--dense .mdc-deprecated-list-item__secondary-text{font-size:inherit}* ::slotted(a),a{color:inherit;text-decoration:none}:host([twoline]){height:72px}:host([twoline]) .mdc-deprecated-list-item__text{align-self:flex-start}:host([disabled]),:host([noninteractive]){cursor:default;pointer-events:none}:host([disabled]) .mdc-deprecated-list-item__text ::slotted(*){opacity:.38}:host([disabled]) .mdc-deprecated-list-item__text ::slotted(*),:host([disabled]) .mdc-deprecated-list-item__primary-text ::slotted(*),:host([disabled]) .mdc-deprecated-list-item__secondary-text ::slotted(*){color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-deprecated-list-item__secondary-text ::slotted(*){color:rgba(0, 0, 0, 0.54);color:var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54))}.mdc-deprecated-list-item__graphic ::slotted(*){background-color:transparent;color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-group__subheader ::slotted(*){color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 40px);height:var(--mdc-list-item-graphic-size, 40px)}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 40px);line-height:var(--mdc-list-item-graphic-size, 40px)}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 40px) !important}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(*){border-radius:50%}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic,:host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic,:host([graphic=control]) .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:var(--mdc-list-item-graphic-margin, 16px)}[dir=rtl] :host([graphic=avatar]) .mdc-deprecated-list-item__graphic,:host([graphic=avatar]) .mdc-deprecated-list-item__graphic[dir=rtl],[dir=rtl] :host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=medium]) .mdc-deprecated-list-item__graphic[dir=rtl],[dir=rtl] :host([graphic=large]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic[dir=rtl],[dir=rtl] :host([graphic=control]) .mdc-deprecated-list-item__graphic,:host([graphic=control]) .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:var(--mdc-list-item-graphic-margin, 16px);margin-right:0}:host([graphic=icon]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 24px);height:var(--mdc-list-item-graphic-size, 24px);margin-left:0;margin-right:var(--mdc-list-item-graphic-margin, 32px)}:host([graphic=icon]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 24px);line-height:var(--mdc-list-item-graphic-size, 24px)}:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 24px) !important}[dir=rtl] :host([graphic=icon]) .mdc-deprecated-list-item__graphic,:host([graphic=icon]) .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:var(--mdc-list-item-graphic-margin, 32px);margin-right:0}:host([graphic=avatar]:not([twoLine])),:host([graphic=icon]:not([twoLine])){height:56px}:host([graphic=medium]:not([twoLine])),:host([graphic=large]:not([twoLine])){height:72px}:host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 56px);height:var(--mdc-list-item-graphic-size, 56px)}:host([graphic=medium]) .mdc-deprecated-list-item__graphic.multi,:host([graphic=large]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(*),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 56px);line-height:var(--mdc-list-item-graphic-size, 56px)}:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 56px) !important}:host([graphic=large]){padding-left:0px}`;

// node_modules/@material/mwc-list/mwc-list-item.js
var ListItem = class ListItem2 extends ListItemBase {
};
ListItem.styles = style7;
ListItem = __decorate([
  customElement2("mwc-list-item")
], ListItem);

// node_modules/@material/dom/keyboard.js
var KEY = {
  UNKNOWN: "Unknown",
  BACKSPACE: "Backspace",
  ENTER: "Enter",
  SPACEBAR: "Spacebar",
  PAGE_UP: "PageUp",
  PAGE_DOWN: "PageDown",
  END: "End",
  HOME: "Home",
  ARROW_LEFT: "ArrowLeft",
  ARROW_UP: "ArrowUp",
  ARROW_RIGHT: "ArrowRight",
  ARROW_DOWN: "ArrowDown",
  DELETE: "Delete",
  ESCAPE: "Escape",
  TAB: "Tab"
};
var normalizedKeys = new Set();
normalizedKeys.add(KEY.BACKSPACE);
normalizedKeys.add(KEY.ENTER);
normalizedKeys.add(KEY.SPACEBAR);
normalizedKeys.add(KEY.PAGE_UP);
normalizedKeys.add(KEY.PAGE_DOWN);
normalizedKeys.add(KEY.END);
normalizedKeys.add(KEY.HOME);
normalizedKeys.add(KEY.ARROW_LEFT);
normalizedKeys.add(KEY.ARROW_UP);
normalizedKeys.add(KEY.ARROW_RIGHT);
normalizedKeys.add(KEY.ARROW_DOWN);
normalizedKeys.add(KEY.DELETE);
normalizedKeys.add(KEY.ESCAPE);
normalizedKeys.add(KEY.TAB);
var KEY_CODE = {
  BACKSPACE: 8,
  ENTER: 13,
  SPACEBAR: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  DELETE: 46,
  ESCAPE: 27,
  TAB: 9
};
var mappedKeyCodes = new Map();
mappedKeyCodes.set(KEY_CODE.BACKSPACE, KEY.BACKSPACE);
mappedKeyCodes.set(KEY_CODE.ENTER, KEY.ENTER);
mappedKeyCodes.set(KEY_CODE.SPACEBAR, KEY.SPACEBAR);
mappedKeyCodes.set(KEY_CODE.PAGE_UP, KEY.PAGE_UP);
mappedKeyCodes.set(KEY_CODE.PAGE_DOWN, KEY.PAGE_DOWN);
mappedKeyCodes.set(KEY_CODE.END, KEY.END);
mappedKeyCodes.set(KEY_CODE.HOME, KEY.HOME);
mappedKeyCodes.set(KEY_CODE.ARROW_LEFT, KEY.ARROW_LEFT);
mappedKeyCodes.set(KEY_CODE.ARROW_UP, KEY.ARROW_UP);
mappedKeyCodes.set(KEY_CODE.ARROW_RIGHT, KEY.ARROW_RIGHT);
mappedKeyCodes.set(KEY_CODE.ARROW_DOWN, KEY.ARROW_DOWN);
mappedKeyCodes.set(KEY_CODE.DELETE, KEY.DELETE);
mappedKeyCodes.set(KEY_CODE.ESCAPE, KEY.ESCAPE);
mappedKeyCodes.set(KEY_CODE.TAB, KEY.TAB);
var navigationKeys = new Set();
navigationKeys.add(KEY.PAGE_UP);
navigationKeys.add(KEY.PAGE_DOWN);
navigationKeys.add(KEY.END);
navigationKeys.add(KEY.HOME);
navigationKeys.add(KEY.ARROW_LEFT);
navigationKeys.add(KEY.ARROW_UP);
navigationKeys.add(KEY.ARROW_RIGHT);
navigationKeys.add(KEY.ARROW_DOWN);
function normalizeKey(evt) {
  var key = evt.key;
  if (normalizedKeys.has(key)) {
    return key;
  }
  var mappedKey = mappedKeyCodes.get(evt.keyCode);
  if (mappedKey) {
    return mappedKey;
  }
  return KEY.UNKNOWN;
}

// node_modules/@material/list/constants.js
var _a3;
var _b;
var cssClasses5 = {
  LIST_ITEM_ACTIVATED_CLASS: "mdc-list-item--activated",
  LIST_ITEM_CLASS: "mdc-list-item",
  LIST_ITEM_DISABLED_CLASS: "mdc-list-item--disabled",
  LIST_ITEM_SELECTED_CLASS: "mdc-list-item--selected",
  LIST_ITEM_TEXT_CLASS: "mdc-list-item__text",
  LIST_ITEM_PRIMARY_TEXT_CLASS: "mdc-list-item__primary-text",
  ROOT: "mdc-list"
};
var evolutionClassNameMap = (_a3 = {}, _a3["" + cssClasses5.LIST_ITEM_ACTIVATED_CLASS] = "mdc-list-item--activated", _a3["" + cssClasses5.LIST_ITEM_CLASS] = "mdc-list-item", _a3["" + cssClasses5.LIST_ITEM_DISABLED_CLASS] = "mdc-list-item--disabled", _a3["" + cssClasses5.LIST_ITEM_SELECTED_CLASS] = "mdc-list-item--selected", _a3["" + cssClasses5.LIST_ITEM_PRIMARY_TEXT_CLASS] = "mdc-list-item__primary-text", _a3["" + cssClasses5.ROOT] = "mdc-list", _a3);
var deprecatedClassNameMap = (_b = {}, _b["" + cssClasses5.LIST_ITEM_ACTIVATED_CLASS] = "mdc-deprecated-list-item--activated", _b["" + cssClasses5.LIST_ITEM_CLASS] = "mdc-deprecated-list-item", _b["" + cssClasses5.LIST_ITEM_DISABLED_CLASS] = "mdc-deprecated-list-item--disabled", _b["" + cssClasses5.LIST_ITEM_SELECTED_CLASS] = "mdc-deprecated-list-item--selected", _b["" + cssClasses5.LIST_ITEM_TEXT_CLASS] = "mdc-deprecated-list-item__text", _b["" + cssClasses5.LIST_ITEM_PRIMARY_TEXT_CLASS] = "mdc-deprecated-list-item__primary-text", _b["" + cssClasses5.ROOT] = "mdc-deprecated-list", _b);
var strings6 = {
  ACTION_EVENT: "MDCList:action",
  ARIA_CHECKED: "aria-checked",
  ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
  ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
  ARIA_CURRENT: "aria-current",
  ARIA_DISABLED: "aria-disabled",
  ARIA_ORIENTATION: "aria-orientation",
  ARIA_ORIENTATION_HORIZONTAL: "horizontal",
  ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
  ARIA_SELECTED: "aria-selected",
  ARIA_INTERACTIVE_ROLES_SELECTOR: '[role="listbox"], [role="menu"]',
  ARIA_MULTI_SELECTABLE_SELECTOR: '[aria-multiselectable="true"]',
  CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"], input[type="radio"]',
  CHECKBOX_SELECTOR: 'input[type="checkbox"]',
  CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + cssClasses5.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses5.LIST_ITEM_CLASS + " a,\n    ." + deprecatedClassNameMap[cssClasses5.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses5.LIST_ITEM_CLASS] + " a\n  ",
  DEPRECATED_SELECTOR: ".mdc-deprecated-list",
  FOCUSABLE_CHILD_ELEMENTS: "\n    ." + cssClasses5.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses5.LIST_ITEM_CLASS + " a,\n    ." + cssClasses5.LIST_ITEM_CLASS + ' input[type="radio"]:not(:disabled),\n    .' + cssClasses5.LIST_ITEM_CLASS + ' input[type="checkbox"]:not(:disabled),\n    .' + deprecatedClassNameMap[cssClasses5.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses5.LIST_ITEM_CLASS] + " a,\n    ." + deprecatedClassNameMap[cssClasses5.LIST_ITEM_CLASS] + ' input[type="radio"]:not(:disabled),\n    .' + deprecatedClassNameMap[cssClasses5.LIST_ITEM_CLASS] + ' input[type="checkbox"]:not(:disabled)\n  ',
  RADIO_SELECTOR: 'input[type="radio"]',
  SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]'
};
var numbers3 = {
  UNSET_INDEX: -1,
  TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300
};

// node_modules/@material/mwc-list/mwc-list-foundation.js
var integerSort = (a, b) => {
  return a - b;
};
var findIndexDiff = (oldSet, newSet) => {
  const oldArr = Array.from(oldSet);
  const newArr = Array.from(newSet);
  const diff = { added: [], removed: [] };
  const oldSorted = oldArr.sort(integerSort);
  const newSorted = newArr.sort(integerSort);
  let i2 = 0;
  let j = 0;
  while (i2 < oldSorted.length || j < newSorted.length) {
    const oldVal = oldSorted[i2];
    const newVal = newSorted[j];
    if (oldVal === newVal) {
      i2++;
      j++;
      continue;
    }
    if (oldVal !== void 0 && (newVal === void 0 || oldVal < newVal)) {
      diff.removed.push(oldVal);
      i2++;
      continue;
    }
    if (newVal !== void 0 && (oldVal === void 0 || newVal < oldVal)) {
      diff.added.push(newVal);
      j++;
      continue;
    }
  }
  return diff;
};
var ELEMENTS_KEY_ALLOWED_IN = ["input", "button", "textarea", "select"];
function isIndexSet(selectedIndex) {
  return selectedIndex instanceof Set;
}
var createSetFromIndex = (index) => {
  const entry = index === numbers3.UNSET_INDEX ? new Set() : index;
  return isIndexSet(entry) ? new Set(entry) : new Set([entry]);
};
var MDCListFoundation = class extends MDCFoundation {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, MDCListFoundation.defaultAdapter), adapter));
    this.isMulti_ = false;
    this.wrapFocus_ = false;
    this.isVertical_ = true;
    this.selectedIndex_ = numbers3.UNSET_INDEX;
    this.focusedItemIndex_ = numbers3.UNSET_INDEX;
    this.useActivatedClass_ = false;
    this.ariaCurrentAttrValue_ = null;
  }
  static get strings() {
    return strings6;
  }
  static get numbers() {
    return numbers3;
  }
  static get defaultAdapter() {
    return {
      focusItemAtIndex: () => void 0,
      getFocusedElementIndex: () => 0,
      getListItemCount: () => 0,
      isFocusInsideList: () => false,
      isRootFocused: () => false,
      notifyAction: () => void 0,
      notifySelected: () => void 0,
      getSelectedStateForElementIndex: () => false,
      setDisabledStateForElementIndex: () => void 0,
      getDisabledStateForElementIndex: () => false,
      setSelectedStateForElementIndex: () => void 0,
      setActivatedStateForElementIndex: () => void 0,
      setTabIndexForElementIndex: () => void 0,
      setAttributeForElementIndex: () => void 0,
      getAttributeForElementIndex: () => null
    };
  }
  setWrapFocus(value) {
    this.wrapFocus_ = value;
  }
  setMulti(value) {
    this.isMulti_ = value;
    const currentIndex = this.selectedIndex_;
    if (value) {
      if (!isIndexSet(currentIndex)) {
        const isUnset = currentIndex === numbers3.UNSET_INDEX;
        this.selectedIndex_ = isUnset ? new Set() : new Set([currentIndex]);
      }
    } else {
      if (isIndexSet(currentIndex)) {
        if (currentIndex.size) {
          const vals = Array.from(currentIndex).sort(integerSort);
          this.selectedIndex_ = vals[0];
        } else {
          this.selectedIndex_ = numbers3.UNSET_INDEX;
        }
      }
    }
  }
  setVerticalOrientation(value) {
    this.isVertical_ = value;
  }
  setUseActivatedClass(useActivated) {
    this.useActivatedClass_ = useActivated;
  }
  getSelectedIndex() {
    return this.selectedIndex_;
  }
  setSelectedIndex(index) {
    if (!this.isIndexValid_(index)) {
      return;
    }
    if (this.isMulti_) {
      this.setMultiSelectionAtIndex_(createSetFromIndex(index));
    } else {
      this.setSingleSelectionAtIndex_(index);
    }
  }
  handleFocusIn(_, listItemIndex) {
    if (listItemIndex >= 0) {
      this.adapter.setTabIndexForElementIndex(listItemIndex, 0);
    }
  }
  handleFocusOut(_, listItemIndex) {
    if (listItemIndex >= 0) {
      this.adapter.setTabIndexForElementIndex(listItemIndex, -1);
    }
    setTimeout(() => {
      if (!this.adapter.isFocusInsideList()) {
        this.setTabindexToFirstSelectedItem_();
      }
    }, 0);
  }
  handleKeydown(event, isRootListItem, listItemIndex) {
    const isArrowLeft = normalizeKey(event) === "ArrowLeft";
    const isArrowUp = normalizeKey(event) === "ArrowUp";
    const isArrowRight = normalizeKey(event) === "ArrowRight";
    const isArrowDown = normalizeKey(event) === "ArrowDown";
    const isHome = normalizeKey(event) === "Home";
    const isEnd = normalizeKey(event) === "End";
    const isEnter = normalizeKey(event) === "Enter";
    const isSpace = normalizeKey(event) === "Spacebar";
    if (this.adapter.isRootFocused()) {
      if (isArrowUp || isEnd) {
        event.preventDefault();
        this.focusLastElement();
      } else if (isArrowDown || isHome) {
        event.preventDefault();
        this.focusFirstElement();
      }
      return;
    }
    let currentIndex = this.adapter.getFocusedElementIndex();
    if (currentIndex === -1) {
      currentIndex = listItemIndex;
      if (currentIndex < 0) {
        return;
      }
    }
    let nextIndex;
    if (this.isVertical_ && isArrowDown || !this.isVertical_ && isArrowRight) {
      this.preventDefaultEvent(event);
      nextIndex = this.focusNextElement(currentIndex);
    } else if (this.isVertical_ && isArrowUp || !this.isVertical_ && isArrowLeft) {
      this.preventDefaultEvent(event);
      nextIndex = this.focusPrevElement(currentIndex);
    } else if (isHome) {
      this.preventDefaultEvent(event);
      nextIndex = this.focusFirstElement();
    } else if (isEnd) {
      this.preventDefaultEvent(event);
      nextIndex = this.focusLastElement();
    } else if (isEnter || isSpace) {
      if (isRootListItem) {
        const target = event.target;
        if (target && target.tagName === "A" && isEnter) {
          return;
        }
        this.preventDefaultEvent(event);
        this.setSelectedIndexOnAction_(currentIndex, true);
      }
    }
    this.focusedItemIndex_ = currentIndex;
    if (nextIndex !== void 0) {
      this.setTabindexAtIndex_(nextIndex);
      this.focusedItemIndex_ = nextIndex;
    }
  }
  handleSingleSelection(index, isInteraction, force) {
    if (index === numbers3.UNSET_INDEX) {
      return;
    }
    this.setSelectedIndexOnAction_(index, isInteraction, force);
    this.setTabindexAtIndex_(index);
    this.focusedItemIndex_ = index;
  }
  focusNextElement(index) {
    const count = this.adapter.getListItemCount();
    let nextIndex = index + 1;
    if (nextIndex >= count) {
      if (this.wrapFocus_) {
        nextIndex = 0;
      } else {
        return index;
      }
    }
    this.adapter.focusItemAtIndex(nextIndex);
    return nextIndex;
  }
  focusPrevElement(index) {
    let prevIndex = index - 1;
    if (prevIndex < 0) {
      if (this.wrapFocus_) {
        prevIndex = this.adapter.getListItemCount() - 1;
      } else {
        return index;
      }
    }
    this.adapter.focusItemAtIndex(prevIndex);
    return prevIndex;
  }
  focusFirstElement() {
    this.adapter.focusItemAtIndex(0);
    return 0;
  }
  focusLastElement() {
    const lastIndex = this.adapter.getListItemCount() - 1;
    this.adapter.focusItemAtIndex(lastIndex);
    return lastIndex;
  }
  setEnabled(itemIndex, isEnabled) {
    if (!this.isIndexValid_(itemIndex)) {
      return;
    }
    this.adapter.setDisabledStateForElementIndex(itemIndex, !isEnabled);
  }
  preventDefaultEvent(evt) {
    const target = evt.target;
    const tagName = `${target.tagName}`.toLowerCase();
    if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
      evt.preventDefault();
    }
  }
  setSingleSelectionAtIndex_(index, isInteraction = true) {
    if (this.selectedIndex_ === index) {
      return;
    }
    if (this.selectedIndex_ !== numbers3.UNSET_INDEX) {
      this.adapter.setSelectedStateForElementIndex(this.selectedIndex_, false);
      if (this.useActivatedClass_) {
        this.adapter.setActivatedStateForElementIndex(this.selectedIndex_, false);
      }
    }
    if (isInteraction) {
      this.adapter.setSelectedStateForElementIndex(index, true);
    }
    if (this.useActivatedClass_) {
      this.adapter.setActivatedStateForElementIndex(index, true);
    }
    this.setAriaForSingleSelectionAtIndex_(index);
    this.selectedIndex_ = index;
    this.adapter.notifySelected(index);
  }
  setMultiSelectionAtIndex_(newIndex, isInteraction = true) {
    const oldIndex = createSetFromIndex(this.selectedIndex_);
    const diff = findIndexDiff(oldIndex, newIndex);
    if (!diff.removed.length && !diff.added.length) {
      return;
    }
    for (const removed of diff.removed) {
      if (isInteraction) {
        this.adapter.setSelectedStateForElementIndex(removed, false);
      }
      if (this.useActivatedClass_) {
        this.adapter.setActivatedStateForElementIndex(removed, false);
      }
    }
    for (const added of diff.added) {
      if (isInteraction) {
        this.adapter.setSelectedStateForElementIndex(added, true);
      }
      if (this.useActivatedClass_) {
        this.adapter.setActivatedStateForElementIndex(added, true);
      }
    }
    this.selectedIndex_ = newIndex;
    this.adapter.notifySelected(newIndex, diff);
  }
  setAriaForSingleSelectionAtIndex_(index) {
    if (this.selectedIndex_ === numbers3.UNSET_INDEX) {
      this.ariaCurrentAttrValue_ = this.adapter.getAttributeForElementIndex(index, strings6.ARIA_CURRENT);
    }
    const isAriaCurrent = this.ariaCurrentAttrValue_ !== null;
    const ariaAttribute = isAriaCurrent ? strings6.ARIA_CURRENT : strings6.ARIA_SELECTED;
    if (this.selectedIndex_ !== numbers3.UNSET_INDEX) {
      this.adapter.setAttributeForElementIndex(this.selectedIndex_, ariaAttribute, "false");
    }
    const ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue_ : "true";
    this.adapter.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
  }
  setTabindexAtIndex_(index) {
    if (this.focusedItemIndex_ === numbers3.UNSET_INDEX && index !== 0) {
      this.adapter.setTabIndexForElementIndex(0, -1);
    } else if (this.focusedItemIndex_ >= 0 && this.focusedItemIndex_ !== index) {
      this.adapter.setTabIndexForElementIndex(this.focusedItemIndex_, -1);
    }
    this.adapter.setTabIndexForElementIndex(index, 0);
  }
  setTabindexToFirstSelectedItem_() {
    let targetIndex = 0;
    if (typeof this.selectedIndex_ === "number" && this.selectedIndex_ !== numbers3.UNSET_INDEX) {
      targetIndex = this.selectedIndex_;
    } else if (isIndexSet(this.selectedIndex_) && this.selectedIndex_.size > 0) {
      targetIndex = Math.min(...this.selectedIndex_);
    }
    this.setTabindexAtIndex_(targetIndex);
  }
  isIndexValid_(index) {
    if (index instanceof Set) {
      if (!this.isMulti_) {
        throw new Error("MDCListFoundation: Array of index is only supported for checkbox based list");
      }
      if (index.size === 0) {
        return true;
      } else {
        let isOneInRange = false;
        for (const entry of index) {
          isOneInRange = this.isIndexInRange_(entry);
          if (isOneInRange) {
            break;
          }
        }
        return isOneInRange;
      }
    } else if (typeof index === "number") {
      if (this.isMulti_) {
        throw new Error("MDCListFoundation: Expected array of index for checkbox based list but got number: " + index);
      }
      return index === numbers3.UNSET_INDEX || this.isIndexInRange_(index);
    } else {
      return false;
    }
  }
  isIndexInRange_(index) {
    const listSize = this.adapter.getListItemCount();
    return index >= 0 && index < listSize;
  }
  setSelectedIndexOnAction_(index, isInteraction, force) {
    if (this.adapter.getDisabledStateForElementIndex(index)) {
      return;
    }
    let checkedIndex = index;
    if (this.isMulti_) {
      checkedIndex = new Set([index]);
    }
    if (!this.isIndexValid_(checkedIndex)) {
      return;
    }
    if (this.isMulti_) {
      this.toggleMultiAtIndex(index, force, isInteraction);
    } else {
      if (isInteraction || force) {
        this.setSingleSelectionAtIndex_(index, isInteraction);
      } else {
        const isDeselection = this.selectedIndex_ === index;
        if (isDeselection) {
          this.setSingleSelectionAtIndex_(numbers3.UNSET_INDEX);
        }
      }
    }
    if (isInteraction) {
      this.adapter.notifyAction(index);
    }
  }
  toggleMultiAtIndex(index, force, isInteraction = true) {
    let newSelectionValue = false;
    if (force === void 0) {
      newSelectionValue = !this.adapter.getSelectedStateForElementIndex(index);
    } else {
      newSelectionValue = force;
    }
    const newSet = createSetFromIndex(this.selectedIndex_);
    if (newSelectionValue) {
      newSet.add(index);
    } else {
      newSet.delete(index);
    }
    this.setMultiSelectionAtIndex_(newSet, isInteraction);
  }
};
var mwc_list_foundation_default = MDCListFoundation;

// node_modules/@material/mwc-list/mwc-list-base.js
function debounceLayout(callback, waitInMS = 50) {
  let timeoutId;
  return function(updateItems = true) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(updateItems);
    }, waitInMS);
  };
}
var isListItem = (element) => {
  return element.hasAttribute("mwc-list-item");
};
function clearAndCreateItemsReadyPromise() {
  const oldResolver = this.itemsReadyResolver;
  this.itemsReady = new Promise((res) => {
    return this.itemsReadyResolver = res;
  });
  oldResolver();
}
var ListBase = class extends BaseElement {
  constructor() {
    super();
    this.mdcAdapter = null;
    this.mdcFoundationClass = mwc_list_foundation_default;
    this.activatable = false;
    this.multi = false;
    this.wrapFocus = false;
    this.itemRoles = null;
    this.innerRole = null;
    this.innerAriaLabel = null;
    this.rootTabbable = false;
    this.previousTabindex = null;
    this.noninteractive = false;
    this.itemsReadyResolver = () => {
    };
    this.itemsReady = Promise.resolve([]);
    this.items_ = [];
    const debouncedFunction = debounceLayout(this.layout.bind(this));
    this.debouncedLayout = (updateItems = true) => {
      clearAndCreateItemsReadyPromise.call(this);
      debouncedFunction(updateItems);
    };
  }
  async _getUpdateComplete() {
    let result = false;
    if (super._getUpdateComplete) {
      await super._getUpdateComplete();
    } else {
      result = await super.getUpdateComplete();
    }
    await this.itemsReady;
    return result;
  }
  async getUpdateComplete() {
    return this._getUpdateComplete();
  }
  get assignedElements() {
    const slot = this.slotElement;
    if (slot) {
      return slot.assignedNodes({ flatten: true }).filter(isNodeElement);
    }
    return [];
  }
  get items() {
    return this.items_;
  }
  updateItems() {
    const nodes = this.assignedElements;
    const listItems = [];
    for (const node of nodes) {
      if (isListItem(node)) {
        listItems.push(node);
        node._managingList = this;
      }
      if (node.hasAttribute("divider") && !node.hasAttribute("role")) {
        node.setAttribute("role", "separator");
      }
    }
    this.items_ = listItems;
    const selectedIndices = new Set();
    this.items_.forEach((item, index) => {
      if (this.itemRoles) {
        item.setAttribute("role", this.itemRoles);
      } else {
        item.removeAttribute("role");
      }
      if (item.selected) {
        selectedIndices.add(index);
      }
    });
    if (this.multi) {
      this.select(selectedIndices);
    } else {
      const index = selectedIndices.size ? selectedIndices.entries().next().value[1] : -1;
      this.select(index);
    }
    const itemsUpdatedEv = new Event("items-updated", { bubbles: true, composed: true });
    this.dispatchEvent(itemsUpdatedEv);
  }
  get selected() {
    const index = this.index;
    if (!isIndexSet(index)) {
      if (index === -1) {
        return null;
      }
      return this.items[index];
    }
    const selected = [];
    for (const entry of index) {
      selected.push(this.items[entry]);
    }
    return selected;
  }
  get index() {
    if (this.mdcFoundation) {
      return this.mdcFoundation.getSelectedIndex();
    }
    return -1;
  }
  render() {
    const role = this.innerRole === null ? void 0 : this.innerRole;
    const ariaLabel = this.innerAriaLabel === null ? void 0 : this.innerAriaLabel;
    const tabindex = this.rootTabbable ? "0" : "-1";
    return html`
      <!-- @ts-ignore -->
      <ul
          tabindex=${tabindex}
          role="${ifDefined(role)}"
          aria-label="${ifDefined(ariaLabel)}"
          class="mdc-deprecated-list"
          @keydown=${this.onKeydown}
          @focusin=${this.onFocusIn}
          @focusout=${this.onFocusOut}
          @request-selected=${this.onRequestSelected}
          @list-item-rendered=${this.onListItemConnected}>
        <slot></slot>
        ${this.renderPlaceholder()}
      </ul>
    `;
  }
  renderPlaceholder() {
    if (this.emptyMessage !== void 0 && this.assignedElements.length === 0) {
      return html`
        <mwc-list-item noninteractive>${this.emptyMessage}</mwc-list-item>
      `;
    }
    return null;
  }
  firstUpdated() {
    super.firstUpdated();
    if (!this.items.length) {
      this.mdcFoundation.setMulti(this.multi);
      this.layout();
    }
  }
  onFocusIn(evt) {
    if (this.mdcFoundation && this.mdcRoot) {
      const index = this.getIndexOfTarget(evt);
      this.mdcFoundation.handleFocusIn(evt, index);
    }
  }
  onFocusOut(evt) {
    if (this.mdcFoundation && this.mdcRoot) {
      const index = this.getIndexOfTarget(evt);
      this.mdcFoundation.handleFocusOut(evt, index);
    }
  }
  onKeydown(evt) {
    if (this.mdcFoundation && this.mdcRoot) {
      const index = this.getIndexOfTarget(evt);
      const target = evt.target;
      const isRootListItem = isListItem(target);
      this.mdcFoundation.handleKeydown(evt, isRootListItem, index);
    }
  }
  onRequestSelected(evt) {
    if (this.mdcFoundation) {
      let index = this.getIndexOfTarget(evt);
      if (index === -1) {
        this.layout();
        index = this.getIndexOfTarget(evt);
        if (index === -1) {
          return;
        }
      }
      const element = this.items[index];
      if (element.disabled) {
        return;
      }
      const selected = evt.detail.selected;
      const source = evt.detail.source;
      this.mdcFoundation.handleSingleSelection(index, source === "interaction", selected);
      evt.stopPropagation();
    }
  }
  getIndexOfTarget(evt) {
    const elements = this.items;
    const path = evt.composedPath();
    for (const pathItem of path) {
      let index = -1;
      if (isNodeElement(pathItem) && isListItem(pathItem)) {
        index = elements.indexOf(pathItem);
      }
      if (index !== -1) {
        return index;
      }
    }
    return -1;
  }
  createAdapter() {
    this.mdcAdapter = {
      getListItemCount: () => {
        if (this.mdcRoot) {
          return this.items.length;
        }
        return 0;
      },
      getFocusedElementIndex: this.getFocusedItemIndex,
      getAttributeForElementIndex: (index, attr) => {
        const listElement = this.mdcRoot;
        if (!listElement) {
          return "";
        }
        const element = this.items[index];
        return element ? element.getAttribute(attr) : "";
      },
      setAttributeForElementIndex: (index, attr, val) => {
        if (!this.mdcRoot) {
          return;
        }
        const element = this.items[index];
        if (element) {
          element.setAttribute(attr, val);
        }
      },
      focusItemAtIndex: (index) => {
        const element = this.items[index];
        if (element) {
          element.focus();
        }
      },
      setTabIndexForElementIndex: (index, value) => {
        const item = this.items[index];
        if (item) {
          item.tabindex = value;
        }
      },
      notifyAction: (index) => {
        const init = { bubbles: true, composed: true };
        init.detail = { index };
        const ev = new CustomEvent("action", init);
        this.dispatchEvent(ev);
      },
      notifySelected: (index, diff) => {
        const init = { bubbles: true, composed: true };
        init.detail = { index, diff };
        const ev = new CustomEvent("selected", init);
        this.dispatchEvent(ev);
      },
      isFocusInsideList: () => {
        return doesElementContainFocus(this);
      },
      isRootFocused: () => {
        const mdcRoot = this.mdcRoot;
        const root = mdcRoot.getRootNode();
        return root.activeElement === mdcRoot;
      },
      setDisabledStateForElementIndex: (index, value) => {
        const item = this.items[index];
        if (!item) {
          return;
        }
        item.disabled = value;
      },
      getDisabledStateForElementIndex: (index) => {
        const item = this.items[index];
        if (!item) {
          return false;
        }
        return item.disabled;
      },
      setSelectedStateForElementIndex: (index, value) => {
        const item = this.items[index];
        if (!item) {
          return;
        }
        item.selected = value;
      },
      getSelectedStateForElementIndex: (index) => {
        const item = this.items[index];
        if (!item) {
          return false;
        }
        return item.selected;
      },
      setActivatedStateForElementIndex: (index, value) => {
        const item = this.items[index];
        if (!item) {
          return;
        }
        item.activated = value;
      }
    };
    return this.mdcAdapter;
  }
  selectUi(index, activate = false) {
    const item = this.items[index];
    if (item) {
      item.selected = true;
      item.activated = activate;
    }
  }
  deselectUi(index) {
    const item = this.items[index];
    if (item) {
      item.selected = false;
      item.activated = false;
    }
  }
  select(index) {
    if (!this.mdcFoundation) {
      return;
    }
    this.mdcFoundation.setSelectedIndex(index);
  }
  toggle(index, force) {
    if (this.multi) {
      this.mdcFoundation.toggleMultiAtIndex(index, force);
    }
  }
  onListItemConnected(e2) {
    const target = e2.target;
    this.layout(this.items.indexOf(target) === -1);
  }
  layout(updateItems = true) {
    if (updateItems) {
      this.updateItems();
    }
    const first = this.items[0];
    for (const item of this.items) {
      item.tabindex = -1;
    }
    if (first) {
      if (this.noninteractive) {
        if (!this.previousTabindex) {
          this.previousTabindex = first;
        }
      } else {
        first.tabindex = 0;
      }
    }
    this.itemsReadyResolver();
  }
  getFocusedItemIndex() {
    if (!this.mdcRoot) {
      return -1;
    }
    if (!this.items.length) {
      return -1;
    }
    const activeElementPath = deepActiveElementPath();
    if (!activeElementPath.length) {
      return -1;
    }
    for (let i2 = activeElementPath.length - 1; i2 >= 0; i2--) {
      const activeItem = activeElementPath[i2];
      if (isListItem(activeItem)) {
        return this.items.indexOf(activeItem);
      }
    }
    return -1;
  }
  focusItemAtIndex(index) {
    for (const item of this.items) {
      if (item.tabindex === 0) {
        item.tabindex = -1;
        break;
      }
    }
    this.items[index].tabindex = 0;
    this.items[index].focus();
  }
  focus() {
    const root = this.mdcRoot;
    if (root) {
      root.focus();
    }
  }
  blur() {
    const root = this.mdcRoot;
    if (root) {
      root.blur();
    }
  }
};
__decorate([
  property2({ type: String })
], ListBase.prototype, "emptyMessage", void 0);
__decorate([
  query2(".mdc-deprecated-list")
], ListBase.prototype, "mdcRoot", void 0);
__decorate([
  query2("slot")
], ListBase.prototype, "slotElement", void 0);
__decorate([
  property2({ type: Boolean }),
  observer(function(value) {
    if (this.mdcFoundation) {
      this.mdcFoundation.setUseActivatedClass(value);
    }
  })
], ListBase.prototype, "activatable", void 0);
__decorate([
  property2({ type: Boolean }),
  observer(function(newValue, oldValue) {
    if (this.mdcFoundation) {
      this.mdcFoundation.setMulti(newValue);
    }
    if (oldValue !== void 0) {
      this.layout();
    }
  })
], ListBase.prototype, "multi", void 0);
__decorate([
  property2({ type: Boolean }),
  observer(function(value) {
    if (this.mdcFoundation) {
      this.mdcFoundation.setWrapFocus(value);
    }
  })
], ListBase.prototype, "wrapFocus", void 0);
__decorate([
  property2({ type: String }),
  observer(function(_newValue, oldValue) {
    if (oldValue !== void 0) {
      this.updateItems();
    }
  })
], ListBase.prototype, "itemRoles", void 0);
__decorate([
  property2({ type: String })
], ListBase.prototype, "innerRole", void 0);
__decorate([
  property2({ type: String })
], ListBase.prototype, "innerAriaLabel", void 0);
__decorate([
  property2({ type: Boolean })
], ListBase.prototype, "rootTabbable", void 0);
__decorate([
  property2({ type: Boolean, reflect: true }),
  observer(function(value) {
    const slot = this.slotElement;
    if (value && slot) {
      const tabbable = findAssignedElement(slot, '[tabindex="0"]');
      this.previousTabindex = tabbable;
      if (tabbable) {
        tabbable.setAttribute("tabindex", "-1");
      }
    } else if (!value && this.previousTabindex) {
      this.previousTabindex.setAttribute("tabindex", "0");
      this.previousTabindex = null;
    }
  })
], ListBase.prototype, "noninteractive", void 0);

// node_modules/@material/mwc-list/mwc-list-css.js
var style8 = css2`@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{display:block}.mdc-deprecated-list{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);line-height:1.5rem;margin:0;padding:8px 0;list-style-type:none;color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));padding:var(--mdc-list-vertical-padding, 8px) 0}.mdc-deprecated-list:focus{outline:none}.mdc-deprecated-list-item{height:48px}.mdc-deprecated-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-deprecated-list ::slotted([divider]){height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgba(0, 0, 0, 0.12)}.mdc-deprecated-list ::slotted([divider][padded]){margin:0 var(--mdc-list-side-padding, 16px)}.mdc-deprecated-list ::slotted([divider][inset]){margin-left:var(--mdc-list-inset-margin, 72px);margin-right:0;width:calc( 100% - var(--mdc-list-inset-margin, 72px) )}[dir=rtl] .mdc-deprecated-list ::slotted([divider][inset]),.mdc-deprecated-list ::slotted([divider][inset])[dir=rtl]{margin-left:0;margin-right:var(--mdc-list-inset-margin, 72px)}.mdc-deprecated-list ::slotted([divider][inset][padded]){width:calc( 100% - var(--mdc-list-inset-margin, 72px) - var(--mdc-list-side-padding, 16px) )}.mdc-deprecated-list--dense ::slotted([mwc-list-item]){height:40px}.mdc-deprecated-list--dense ::slotted([mwc-list]){--mdc-list-item-graphic-size: 20px}.mdc-deprecated-list--two-line.mdc-deprecated-list--dense ::slotted([mwc-list-item]),.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense ::slotted([mwc-list-item]){height:60px}.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense ::slotted([mwc-list]){--mdc-list-item-graphic-size: 36px}:host([noninteractive]){pointer-events:none;cursor:default}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text){display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text)::before{display:inline-block;width:0;height:24px;content:"";vertical-align:0}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text)::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}`;

// node_modules/@material/mwc-list/mwc-list.js
var List = class List2 extends ListBase {
};
List.styles = style8;
List = __decorate([
  customElement2("mwc-list")
], List);

// node_modules/@material/mwc-icon/mwc-icon-host-css.js
var style9 = css2`:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}`;

// node_modules/@material/mwc-icon/mwc-icon.js
var Icon = class Icon2 extends LitElement2 {
  render() {
    return html`<slot></slot>`;
  }
};
Icon.styles = style9;
Icon = __decorate([
  customElement2("mwc-icon")
], Icon);

// node_modules/@material/mwc-button/mwc-button-base.js
var ButtonBase = class extends LitElement2 {
  constructor() {
    super(...arguments);
    this.raised = false;
    this.unelevated = false;
    this.outlined = false;
    this.dense = false;
    this.disabled = false;
    this.trailingIcon = false;
    this.fullwidth = false;
    this.icon = "";
    this.label = "";
    this.expandContent = false;
    this.shouldRenderRipple = false;
    this.rippleHandlers = new RippleHandlers(() => {
      this.shouldRenderRipple = true;
      return this.ripple;
    });
  }
  renderOverlay() {
    return html``;
  }
  renderRipple() {
    const filled = this.raised || this.unelevated;
    return this.shouldRenderRipple ? html`<mwc-ripple class="ripple" .primary="${!filled}" .disabled="${this.disabled}"></mwc-ripple>` : "";
  }
  createRenderRoot() {
    return this.attachShadow({ mode: "open", delegatesFocus: true });
  }
  focus() {
    const buttonElement = this.buttonElement;
    if (buttonElement) {
      this.rippleHandlers.startFocus();
      buttonElement.focus();
    }
  }
  blur() {
    const buttonElement = this.buttonElement;
    if (buttonElement) {
      this.rippleHandlers.endFocus();
      buttonElement.blur();
    }
  }
  getRenderClasses() {
    return classMap({
      "mdc-button--raised": this.raised,
      "mdc-button--unelevated": this.unelevated,
      "mdc-button--outlined": this.outlined,
      "mdc-button--dense": this.dense
    });
  }
  render() {
    return html`
      <button
          id="button"
          class="mdc-button ${this.getRenderClasses()}"
          ?disabled="${this.disabled}"
          aria-label="${this.label || this.icon}"
          @focus="${this.handleRippleFocus}"
          @blur="${this.handleRippleBlur}"
          @mousedown="${this.handleRippleActivate}"
          @mouseenter="${this.handleRippleMouseEnter}"
          @mouseleave="${this.handleRippleMouseLeave}"
          @touchstart="${this.handleRippleActivate}"
          @touchend="${this.handleRippleDeactivate}"
          @touchcancel="${this.handleRippleDeactivate}">
        ${this.renderOverlay()}
        ${this.renderRipple()}
        <span class="leading-icon">
          <slot name="icon">
            ${this.icon && !this.trailingIcon ? this.renderIcon() : ""}
          </slot>
        </span>
        <span class="mdc-button__label">${this.label}</span>
        <span class="slot-container ${classMap({
      flex: this.expandContent
    })}">
          <slot></slot>
        </span>
        <span class="trailing-icon">
          <slot name="trailingIcon">
            ${this.icon && this.trailingIcon ? this.renderIcon() : ""}
          </slot>
        </span>
      </button>`;
  }
  renderIcon() {
    return html`
    <mwc-icon class="mdc-button__icon">
      ${this.icon}
    </mwc-icon>`;
  }
  handleRippleActivate(evt) {
    const onUp = () => {
      window.removeEventListener("mouseup", onUp);
      this.handleRippleDeactivate();
    };
    window.addEventListener("mouseup", onUp);
    this.rippleHandlers.startPress(evt);
  }
  handleRippleDeactivate() {
    this.rippleHandlers.endPress();
  }
  handleRippleMouseEnter() {
    this.rippleHandlers.startHover();
  }
  handleRippleMouseLeave() {
    this.rippleHandlers.endHover();
  }
  handleRippleFocus() {
    this.rippleHandlers.startFocus();
  }
  handleRippleBlur() {
    this.rippleHandlers.endFocus();
  }
};
__decorate([
  property2({ type: Boolean, reflect: true })
], ButtonBase.prototype, "raised", void 0);
__decorate([
  property2({ type: Boolean, reflect: true })
], ButtonBase.prototype, "unelevated", void 0);
__decorate([
  property2({ type: Boolean, reflect: true })
], ButtonBase.prototype, "outlined", void 0);
__decorate([
  property2({ type: Boolean })
], ButtonBase.prototype, "dense", void 0);
__decorate([
  property2({ type: Boolean, reflect: true })
], ButtonBase.prototype, "disabled", void 0);
__decorate([
  property2({ type: Boolean, attribute: "trailingicon" })
], ButtonBase.prototype, "trailingIcon", void 0);
__decorate([
  property2({ type: Boolean, reflect: true })
], ButtonBase.prototype, "fullwidth", void 0);
__decorate([
  property2({ type: String })
], ButtonBase.prototype, "icon", void 0);
__decorate([
  property2({ type: String })
], ButtonBase.prototype, "label", void 0);
__decorate([
  property2({ type: Boolean })
], ButtonBase.prototype, "expandContent", void 0);
__decorate([
  query2("#button")
], ButtonBase.prototype, "buttonElement", void 0);
__decorate([
  queryAsync("mwc-ripple")
], ButtonBase.prototype, "ripple", void 0);
__decorate([
  internalProperty2()
], ButtonBase.prototype, "shouldRenderRipple", void 0);
__decorate([
  eventOptions({ passive: true })
], ButtonBase.prototype, "handleRippleActivate", null);

// node_modules/@material/mwc-button/styles-css.js
var style10 = css2`.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff;background-color:var(--mdc-elevation-overlay-color, #fff)}.mdc-button{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform, uppercase);position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;font-size:1.125rem;height:1.125rem;vertical-align:top;width:1.125rem}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon,.mdc-button--outlined .mdc-button__icon{margin-left:-4px;margin-right:8px}[dir=rtl] .mdc-button--raised .mdc-button__icon,.mdc-button--raised .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__icon,.mdc-button--outlined .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:-4px}.mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:-4px}[dir=rtl] .mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--raised .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:-4px;margin-right:8px}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--raised:hover,.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12)}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0,0,0,.12)}.mdc-button--outlined{border-style:solid}.mdc-button{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px);padding:0 8px 0 8px}.mdc-button:not(:disabled){background-color:transparent}.mdc-button:disabled{background-color:transparent}.mdc-button:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-button:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--raised,.mdc-button--unelevated{padding:0 16px 0 16px;height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{background-color:rgba(0, 0, 0, 0.12)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){color:#fff;color:var(--mdc-theme-on-primary, #fff)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button--raised .mdc-button__ripple,.mdc-button--unelevated .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--outlined{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px);padding:0 15px 0 15px;border-width:1px}.mdc-button--outlined:not(:disabled){background-color:transparent}.mdc-button--outlined:disabled{background-color:transparent}.mdc-button--outlined:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-button--outlined:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button--outlined .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--outlined:not(:disabled){border-color:rgba(0, 0, 0, 0.12)}.mdc-button--outlined:disabled{border-color:rgba(0, 0, 0, 0.12)}.mdc-button--outlined.mdc-button--icon-trailing{padding:0 11px 0 15px}.mdc-button--outlined.mdc-button--icon-leading{padding:0 15px 0 11px}.mdc-button--outlined .mdc-button__ripple{top:-1px;left:-1px;border:1px solid transparent}.mdc-button--outlined .mdc-button__touch{left:-1px;width:calc(100% + 2 * 1px)}:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:transparent;vertical-align:top}:host([fullwidth]){width:100%}:host([raised]),:host([unelevated]){--mdc-ripple-color:#fff;--mdc-ripple-focus-opacity:0.24;--mdc-ripple-hover-opacity:0.08;--mdc-ripple-press-opacity:0.24}.trailing-icon ::slotted(*),.trailing-icon .mdc-button__icon,.leading-icon ::slotted(*),.leading-icon .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;font-size:1.125rem;height:1.125rem;vertical-align:top;width:1.125rem}[dir=rtl] .trailing-icon ::slotted(*),.trailing-icon ::slotted(*)[dir=rtl],[dir=rtl] .trailing-icon .mdc-button__icon,.trailing-icon .mdc-button__icon[dir=rtl],[dir=rtl] .leading-icon ::slotted(*),.leading-icon ::slotted(*)[dir=rtl],[dir=rtl] .leading-icon .mdc-button__icon,.leading-icon .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.trailing-icon ::slotted(*),.trailing-icon .mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .trailing-icon ::slotted(*),.trailing-icon ::slotted(*)[dir=rtl],[dir=rtl] .trailing-icon .mdc-button__icon,.trailing-icon .mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}.slot-container{display:inline-flex;align-items:center;justify-content:center}.slot-container.flex{flex:auto}.mdc-button{flex:auto;overflow:hidden;padding-left:8px;padding-left:var(--mdc-button-horizontal-padding, 8px);padding-right:8px;padding-right:var(--mdc-button-horizontal-padding, 8px)}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-focus, var(--mdc-button-raised-box-shadow-hover, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)))}.mdc-button--raised:hover{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-hover, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-active, 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12))}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);box-shadow:var(--mdc-button-raised-box-shadow-disabled, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12))}.mdc-button--raised,.mdc-button--unelevated{padding-left:16px;padding-left:var(--mdc-button-horizontal-padding, 16px);padding-right:16px;padding-right:var(--mdc-button-horizontal-padding, 16px)}.mdc-button--outlined{border-width:1px;border-width:var(--mdc-button-outline-width, 1px);padding-left:calc(16px - 1px);padding-left:calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px));padding-right:calc(16px - 1px);padding-right:calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px))}.mdc-button--outlined:not(:disabled){border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-button-outline-color, rgba(0, 0, 0, 0.12))}.mdc-button--outlined .ripple{top:calc(-1 * 1px);top:calc(-1 * var(--mdc-button-outline-width, 1px));left:calc(-1 * 1px);left:calc(-1 * var(--mdc-button-outline-width, 1px));right:initial;right:initial;border-width:1px;border-width:var(--mdc-button-outline-width, 1px);border-style:solid;border-color:transparent}[dir=rtl] .mdc-button--outlined .ripple,.mdc-button--outlined .ripple[dir=rtl]{left:initial;left:initial;right:calc(-1 * 1px);right:calc(-1 * var(--mdc-button-outline-width, 1px))}.mdc-button--dense{height:28px;margin-top:0;margin-bottom:0}.mdc-button--dense .mdc-button__touch{display:none}:host([disabled]){pointer-events:none}:host([disabled]) .mdc-button{color:rgba(0, 0, 0, 0.38);color:var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-button--raised,:host([disabled]) .mdc-button--unelevated{background-color:rgba(0, 0, 0, 0.12);background-color:var(--mdc-button-disabled-fill-color, rgba(0, 0, 0, 0.12))}:host([disabled]) .mdc-button--outlined{border-color:rgba(0, 0, 0, 0.12);border-color:var(--mdc-button-disabled-outline-color, rgba(0, 0, 0, 0.12))}`;

// node_modules/@material/mwc-button/mwc-button.js
var Button = class Button2 extends ButtonBase {
};
Button.styles = style10;
Button = __decorate([
  customElement2("mwc-button")
], Button);

// node_modules/@material/notched-outline/constants.js
var strings7 = {
  NOTCH_ELEMENT_SELECTOR: ".mdc-notched-outline__notch"
};
var numbers4 = {
  NOTCH_ELEMENT_PADDING: 8
};
var cssClasses6 = {
  NO_LABEL: "mdc-notched-outline--no-label",
  OUTLINE_NOTCHED: "mdc-notched-outline--notched",
  OUTLINE_UPGRADED: "mdc-notched-outline--upgraded"
};

// node_modules/@material/notched-outline/foundation.js
var MDCNotchedOutlineFoundation = function(_super) {
  __extends(MDCNotchedOutlineFoundation2, _super);
  function MDCNotchedOutlineFoundation2(adapter) {
    return _super.call(this, __assign(__assign({}, MDCNotchedOutlineFoundation2.defaultAdapter), adapter)) || this;
  }
  Object.defineProperty(MDCNotchedOutlineFoundation2, "strings", {
    get: function() {
      return strings7;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCNotchedOutlineFoundation2, "cssClasses", {
    get: function() {
      return cssClasses6;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCNotchedOutlineFoundation2, "numbers", {
    get: function() {
      return numbers4;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCNotchedOutlineFoundation2, "defaultAdapter", {
    get: function() {
      return {
        addClass: function() {
          return void 0;
        },
        removeClass: function() {
          return void 0;
        },
        setNotchWidthProperty: function() {
          return void 0;
        },
        removeNotchWidthProperty: function() {
          return void 0;
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  MDCNotchedOutlineFoundation2.prototype.notch = function(notchWidth) {
    var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation2.cssClasses.OUTLINE_NOTCHED;
    if (notchWidth > 0) {
      notchWidth += numbers4.NOTCH_ELEMENT_PADDING;
    }
    this.adapter.setNotchWidthProperty(notchWidth);
    this.adapter.addClass(OUTLINE_NOTCHED);
  };
  MDCNotchedOutlineFoundation2.prototype.closeNotch = function() {
    var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation2.cssClasses.OUTLINE_NOTCHED;
    this.adapter.removeClass(OUTLINE_NOTCHED);
    this.adapter.removeNotchWidthProperty();
  };
  return MDCNotchedOutlineFoundation2;
}(MDCFoundation);

// node_modules/@material/mwc-notched-outline/mwc-notched-outline-base.js
var NotchedOutlineBase = class extends BaseElement {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = MDCNotchedOutlineFoundation;
    this.width = 0;
    this.open = false;
    this.lastOpen = this.open;
  }
  createAdapter() {
    return {
      addClass: (className) => this.mdcRoot.classList.add(className),
      removeClass: (className) => this.mdcRoot.classList.remove(className),
      setNotchWidthProperty: (width) => this.notchElement.style.setProperty("width", `${width}px`),
      removeNotchWidthProperty: () => this.notchElement.style.removeProperty("width")
    };
  }
  openOrClose(shouldOpen, width) {
    if (!this.mdcFoundation) {
      return;
    }
    if (shouldOpen && width !== void 0) {
      this.mdcFoundation.notch(width);
    } else {
      this.mdcFoundation.closeNotch();
    }
  }
  render() {
    this.openOrClose(this.open, this.width);
    const classes = classMap({
      "mdc-notched-outline--notched": this.open
    });
    return html`
      <span class="mdc-notched-outline ${classes}">
        <span class="mdc-notched-outline__leading"></span>
        <span class="mdc-notched-outline__notch">
          <slot></slot>
        </span>
        <span class="mdc-notched-outline__trailing"></span>
      </span>`;
  }
};
__decorate([
  query2(".mdc-notched-outline")
], NotchedOutlineBase.prototype, "mdcRoot", void 0);
__decorate([
  property2({ type: Number })
], NotchedOutlineBase.prototype, "width", void 0);
__decorate([
  property2({ type: Boolean, reflect: true })
], NotchedOutlineBase.prototype, "open", void 0);
__decorate([
  query2(".mdc-notched-outline__notch")
], NotchedOutlineBase.prototype, "notchElement", void 0);

// node_modules/@material/mwc-notched-outline/mwc-notched-outline-css.js
var style11 = css2`.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / 0.75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}:host{display:block;position:absolute;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] :host,:host[dir=rtl]{text-align:right}::slotted(.mdc-floating-label){display:inline-block;position:relative;top:17px;bottom:auto;max-width:100%}::slotted(.mdc-floating-label--float-above){text-overflow:clip}.mdc-notched-outline--upgraded ::slotted(.mdc-floating-label--float-above){max-width:calc(100% / 0.75)}.mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-notched-outline .mdc-notched-outline__leading,.mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-notched-outline .mdc-notched-outline__leading{width:max(12px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px, var(--mdc-shape-small, 4px)) * 2)}}.mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{border-color:var(--mdc-notched-outline-border-color, var(--mdc-theme-primary, #6200ee));border-width:1px;border-width:var(--mdc-notched-outline-stroke-width, 1px)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0;padding-top:var(--mdc-notched-outline-notch-offset, 0)}`;

// node_modules/@material/mwc-notched-outline/mwc-notched-outline.js
var NotchedOutline = class NotchedOutline2 extends NotchedOutlineBase {
};
NotchedOutline.styles = style11;
NotchedOutline = __decorate([
  customElement2("mwc-notched-outline")
], NotchedOutline);

// node_modules/@material/mwc-base/form-element.js
var FormElement = class extends BaseElement {
  createRenderRoot() {
    return this.attachShadow({ mode: "open", delegatesFocus: true });
  }
  click() {
    if (this.formElement) {
      this.formElement.focus();
      this.formElement.click();
    }
  }
  setAriaLabel(label) {
    if (this.formElement) {
      this.formElement.setAttribute("aria-label", label);
    }
  }
  firstUpdated() {
    super.firstUpdated();
    if (this.shadowRoot) {
      this.mdcRoot.addEventListener("change", (e2) => {
        this.dispatchEvent(new Event("change", e2));
      });
    }
  }
};

// node_modules/@material/floating-label/constants.js
var cssClasses7 = {
  LABEL_FLOAT_ABOVE: "mdc-floating-label--float-above",
  LABEL_REQUIRED: "mdc-floating-label--required",
  LABEL_SHAKE: "mdc-floating-label--shake",
  ROOT: "mdc-floating-label"
};

// node_modules/@material/floating-label/foundation.js
var MDCFloatingLabelFoundation = function(_super) {
  __extends(MDCFloatingLabelFoundation2, _super);
  function MDCFloatingLabelFoundation2(adapter) {
    var _this = _super.call(this, __assign(__assign({}, MDCFloatingLabelFoundation2.defaultAdapter), adapter)) || this;
    _this.shakeAnimationEndHandler_ = function() {
      return _this.handleShakeAnimationEnd_();
    };
    return _this;
  }
  Object.defineProperty(MDCFloatingLabelFoundation2, "cssClasses", {
    get: function() {
      return cssClasses7;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCFloatingLabelFoundation2, "defaultAdapter", {
    get: function() {
      return {
        addClass: function() {
          return void 0;
        },
        removeClass: function() {
          return void 0;
        },
        getWidth: function() {
          return 0;
        },
        registerInteractionHandler: function() {
          return void 0;
        },
        deregisterInteractionHandler: function() {
          return void 0;
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  MDCFloatingLabelFoundation2.prototype.init = function() {
    this.adapter.registerInteractionHandler("animationend", this.shakeAnimationEndHandler_);
  };
  MDCFloatingLabelFoundation2.prototype.destroy = function() {
    this.adapter.deregisterInteractionHandler("animationend", this.shakeAnimationEndHandler_);
  };
  MDCFloatingLabelFoundation2.prototype.getWidth = function() {
    return this.adapter.getWidth();
  };
  MDCFloatingLabelFoundation2.prototype.shake = function(shouldShake) {
    var LABEL_SHAKE = MDCFloatingLabelFoundation2.cssClasses.LABEL_SHAKE;
    if (shouldShake) {
      this.adapter.addClass(LABEL_SHAKE);
    } else {
      this.adapter.removeClass(LABEL_SHAKE);
    }
  };
  MDCFloatingLabelFoundation2.prototype.float = function(shouldFloat) {
    var _a4 = MDCFloatingLabelFoundation2.cssClasses, LABEL_FLOAT_ABOVE = _a4.LABEL_FLOAT_ABOVE, LABEL_SHAKE = _a4.LABEL_SHAKE;
    if (shouldFloat) {
      this.adapter.addClass(LABEL_FLOAT_ABOVE);
    } else {
      this.adapter.removeClass(LABEL_FLOAT_ABOVE);
      this.adapter.removeClass(LABEL_SHAKE);
    }
  };
  MDCFloatingLabelFoundation2.prototype.setRequired = function(isRequired) {
    var LABEL_REQUIRED = MDCFloatingLabelFoundation2.cssClasses.LABEL_REQUIRED;
    if (isRequired) {
      this.adapter.addClass(LABEL_REQUIRED);
    } else {
      this.adapter.removeClass(LABEL_REQUIRED);
    }
  };
  MDCFloatingLabelFoundation2.prototype.handleShakeAnimationEnd_ = function() {
    var LABEL_SHAKE = MDCFloatingLabelFoundation2.cssClasses.LABEL_SHAKE;
    this.adapter.removeClass(LABEL_SHAKE);
  };
  return MDCFloatingLabelFoundation2;
}(MDCFoundation);

// node_modules/@material/mwc-floating-label/mwc-floating-label-directive.js
var createAdapter = (labelElement) => {
  return {
    addClass: (className) => labelElement.classList.add(className),
    removeClass: (className) => labelElement.classList.remove(className),
    getWidth: () => labelElement.scrollWidth,
    registerInteractionHandler: (evtType, handler) => {
      labelElement.addEventListener(evtType, handler);
    },
    deregisterInteractionHandler: (evtType, handler) => {
      labelElement.removeEventListener(evtType, handler);
    }
  };
};
var partToFoundationMap = new WeakMap();
var floatingLabel = directive((label) => (part) => {
  const lastFoundation = partToFoundationMap.get(part);
  if (!lastFoundation) {
    const labelElement = part.committer.element;
    labelElement.classList.add("mdc-floating-label");
    const adapter = createAdapter(labelElement);
    const foundation = new MDCFloatingLabelFoundation(adapter);
    foundation.init();
    part.setValue(foundation);
    partToFoundationMap.set(part, { label, foundation });
  }
});

// node_modules/@material/line-ripple/constants.js
var cssClasses8 = {
  LINE_RIPPLE_ACTIVE: "mdc-line-ripple--active",
  LINE_RIPPLE_DEACTIVATING: "mdc-line-ripple--deactivating"
};

// node_modules/@material/line-ripple/foundation.js
var MDCLineRippleFoundation = function(_super) {
  __extends(MDCLineRippleFoundation2, _super);
  function MDCLineRippleFoundation2(adapter) {
    var _this = _super.call(this, __assign(__assign({}, MDCLineRippleFoundation2.defaultAdapter), adapter)) || this;
    _this.transitionEndHandler_ = function(evt) {
      return _this.handleTransitionEnd(evt);
    };
    return _this;
  }
  Object.defineProperty(MDCLineRippleFoundation2, "cssClasses", {
    get: function() {
      return cssClasses8;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCLineRippleFoundation2, "defaultAdapter", {
    get: function() {
      return {
        addClass: function() {
          return void 0;
        },
        removeClass: function() {
          return void 0;
        },
        hasClass: function() {
          return false;
        },
        setStyle: function() {
          return void 0;
        },
        registerEventHandler: function() {
          return void 0;
        },
        deregisterEventHandler: function() {
          return void 0;
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  MDCLineRippleFoundation2.prototype.init = function() {
    this.adapter.registerEventHandler("transitionend", this.transitionEndHandler_);
  };
  MDCLineRippleFoundation2.prototype.destroy = function() {
    this.adapter.deregisterEventHandler("transitionend", this.transitionEndHandler_);
  };
  MDCLineRippleFoundation2.prototype.activate = function() {
    this.adapter.removeClass(cssClasses8.LINE_RIPPLE_DEACTIVATING);
    this.adapter.addClass(cssClasses8.LINE_RIPPLE_ACTIVE);
  };
  MDCLineRippleFoundation2.prototype.setRippleCenter = function(xCoordinate) {
    this.adapter.setStyle("transform-origin", xCoordinate + "px center");
  };
  MDCLineRippleFoundation2.prototype.deactivate = function() {
    this.adapter.addClass(cssClasses8.LINE_RIPPLE_DEACTIVATING);
  };
  MDCLineRippleFoundation2.prototype.handleTransitionEnd = function(evt) {
    var isDeactivating = this.adapter.hasClass(cssClasses8.LINE_RIPPLE_DEACTIVATING);
    if (evt.propertyName === "opacity") {
      if (isDeactivating) {
        this.adapter.removeClass(cssClasses8.LINE_RIPPLE_ACTIVE);
        this.adapter.removeClass(cssClasses8.LINE_RIPPLE_DEACTIVATING);
      }
    }
  };
  return MDCLineRippleFoundation2;
}(MDCFoundation);

// node_modules/@material/mwc-line-ripple/mwc-line-ripple-directive.js
var createAdapter2 = (lineElement) => {
  return {
    addClass: (className) => lineElement.classList.add(className),
    removeClass: (className) => lineElement.classList.remove(className),
    hasClass: (className) => lineElement.classList.contains(className),
    setStyle: (propertyName, value) => lineElement.style.setProperty(propertyName, value),
    registerEventHandler: (evtType, handler) => {
      lineElement.addEventListener(evtType, handler);
    },
    deregisterEventHandler: (evtType, handler) => {
      lineElement.removeEventListener(evtType, handler);
    }
  };
};
var partToFoundationMap2 = new WeakMap();
var lineRipple = directive(() => (part) => {
  const lastFoundation = partToFoundationMap2.get(part);
  if (!lastFoundation) {
    const lineElement = part.committer.element;
    lineElement.classList.add("mdc-line-ripple");
    const adapter = createAdapter2(lineElement);
    const foundation = new MDCLineRippleFoundation(adapter);
    foundation.init();
    part.setValue(foundation);
    partToFoundationMap2.set(part, foundation);
  }
});

// node_modules/@material/textfield/constants.js
var strings8 = {
  ARIA_CONTROLS: "aria-controls",
  ARIA_DESCRIBEDBY: "aria-describedby",
  INPUT_SELECTOR: ".mdc-text-field__input",
  LABEL_SELECTOR: ".mdc-floating-label",
  LEADING_ICON_SELECTOR: ".mdc-text-field__icon--leading",
  LINE_RIPPLE_SELECTOR: ".mdc-line-ripple",
  OUTLINE_SELECTOR: ".mdc-notched-outline",
  PREFIX_SELECTOR: ".mdc-text-field__affix--prefix",
  SUFFIX_SELECTOR: ".mdc-text-field__affix--suffix",
  TRAILING_ICON_SELECTOR: ".mdc-text-field__icon--trailing"
};
var cssClasses9 = {
  DISABLED: "mdc-text-field--disabled",
  FOCUSED: "mdc-text-field--focused",
  HELPER_LINE: "mdc-text-field-helper-line",
  INVALID: "mdc-text-field--invalid",
  LABEL_FLOATING: "mdc-text-field--label-floating",
  NO_LABEL: "mdc-text-field--no-label",
  OUTLINED: "mdc-text-field--outlined",
  ROOT: "mdc-text-field",
  TEXTAREA: "mdc-text-field--textarea",
  WITH_LEADING_ICON: "mdc-text-field--with-leading-icon",
  WITH_TRAILING_ICON: "mdc-text-field--with-trailing-icon"
};
var numbers5 = {
  LABEL_SCALE: 0.75
};
var VALIDATION_ATTR_WHITELIST = [
  "pattern",
  "min",
  "max",
  "required",
  "step",
  "minlength",
  "maxlength"
];
var ALWAYS_FLOAT_TYPES = [
  "color",
  "date",
  "datetime-local",
  "month",
  "range",
  "time",
  "week"
];

// node_modules/@material/textfield/foundation.js
var POINTERDOWN_EVENTS = ["mousedown", "touchstart"];
var INTERACTION_EVENTS = ["click", "keydown"];
var MDCTextFieldFoundation = function(_super) {
  __extends(MDCTextFieldFoundation2, _super);
  function MDCTextFieldFoundation2(adapter, foundationMap) {
    if (foundationMap === void 0) {
      foundationMap = {};
    }
    var _this = _super.call(this, __assign(__assign({}, MDCTextFieldFoundation2.defaultAdapter), adapter)) || this;
    _this.isFocused_ = false;
    _this.receivedUserInput_ = false;
    _this.isValid_ = true;
    _this.useNativeValidation_ = true;
    _this.validateOnValueChange_ = true;
    _this.helperText_ = foundationMap.helperText;
    _this.characterCounter_ = foundationMap.characterCounter;
    _this.leadingIcon_ = foundationMap.leadingIcon;
    _this.trailingIcon_ = foundationMap.trailingIcon;
    _this.inputFocusHandler_ = function() {
      return _this.activateFocus();
    };
    _this.inputBlurHandler_ = function() {
      return _this.deactivateFocus();
    };
    _this.inputInputHandler_ = function() {
      return _this.handleInput();
    };
    _this.setPointerXOffset_ = function(evt) {
      return _this.setTransformOrigin(evt);
    };
    _this.textFieldInteractionHandler_ = function() {
      return _this.handleTextFieldInteraction();
    };
    _this.validationAttributeChangeHandler_ = function(attributesList) {
      return _this.handleValidationAttributeChange(attributesList);
    };
    return _this;
  }
  Object.defineProperty(MDCTextFieldFoundation2, "cssClasses", {
    get: function() {
      return cssClasses9;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation2, "strings", {
    get: function() {
      return strings8;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation2, "numbers", {
    get: function() {
      return numbers5;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation2.prototype, "shouldAlwaysFloat_", {
    get: function() {
      var type = this.getNativeInput_().type;
      return ALWAYS_FLOAT_TYPES.indexOf(type) >= 0;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation2.prototype, "shouldFloat", {
    get: function() {
      return this.shouldAlwaysFloat_ || this.isFocused_ || !!this.getValue() || this.isBadInput_();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation2.prototype, "shouldShake", {
    get: function() {
      return !this.isFocused_ && !this.isValid() && !!this.getValue();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation2, "defaultAdapter", {
    get: function() {
      return {
        addClass: function() {
          return void 0;
        },
        removeClass: function() {
          return void 0;
        },
        hasClass: function() {
          return true;
        },
        setInputAttr: function() {
          return void 0;
        },
        removeInputAttr: function() {
          return void 0;
        },
        registerTextFieldInteractionHandler: function() {
          return void 0;
        },
        deregisterTextFieldInteractionHandler: function() {
          return void 0;
        },
        registerInputInteractionHandler: function() {
          return void 0;
        },
        deregisterInputInteractionHandler: function() {
          return void 0;
        },
        registerValidationAttributeChangeHandler: function() {
          return new MutationObserver(function() {
            return void 0;
          });
        },
        deregisterValidationAttributeChangeHandler: function() {
          return void 0;
        },
        getNativeInput: function() {
          return null;
        },
        isFocused: function() {
          return false;
        },
        activateLineRipple: function() {
          return void 0;
        },
        deactivateLineRipple: function() {
          return void 0;
        },
        setLineRippleTransformOrigin: function() {
          return void 0;
        },
        shakeLabel: function() {
          return void 0;
        },
        floatLabel: function() {
          return void 0;
        },
        setLabelRequired: function() {
          return void 0;
        },
        hasLabel: function() {
          return false;
        },
        getLabelWidth: function() {
          return 0;
        },
        hasOutline: function() {
          return false;
        },
        notchOutline: function() {
          return void 0;
        },
        closeOutline: function() {
          return void 0;
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  MDCTextFieldFoundation2.prototype.init = function() {
    var _this = this;
    if (this.adapter.hasLabel() && this.getNativeInput_().required) {
      this.adapter.setLabelRequired(true);
    }
    if (this.adapter.isFocused()) {
      this.inputFocusHandler_();
    } else if (this.adapter.hasLabel() && this.shouldFloat) {
      this.notchOutline(true);
      this.adapter.floatLabel(true);
      this.styleFloating_(true);
    }
    this.adapter.registerInputInteractionHandler("focus", this.inputFocusHandler_);
    this.adapter.registerInputInteractionHandler("blur", this.inputBlurHandler_);
    this.adapter.registerInputInteractionHandler("input", this.inputInputHandler_);
    POINTERDOWN_EVENTS.forEach(function(evtType) {
      _this.adapter.registerInputInteractionHandler(evtType, _this.setPointerXOffset_);
    });
    INTERACTION_EVENTS.forEach(function(evtType) {
      _this.adapter.registerTextFieldInteractionHandler(evtType, _this.textFieldInteractionHandler_);
    });
    this.validationObserver_ = this.adapter.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_);
    this.setCharacterCounter_(this.getValue().length);
  };
  MDCTextFieldFoundation2.prototype.destroy = function() {
    var _this = this;
    this.adapter.deregisterInputInteractionHandler("focus", this.inputFocusHandler_);
    this.adapter.deregisterInputInteractionHandler("blur", this.inputBlurHandler_);
    this.adapter.deregisterInputInteractionHandler("input", this.inputInputHandler_);
    POINTERDOWN_EVENTS.forEach(function(evtType) {
      _this.adapter.deregisterInputInteractionHandler(evtType, _this.setPointerXOffset_);
    });
    INTERACTION_EVENTS.forEach(function(evtType) {
      _this.adapter.deregisterTextFieldInteractionHandler(evtType, _this.textFieldInteractionHandler_);
    });
    this.adapter.deregisterValidationAttributeChangeHandler(this.validationObserver_);
  };
  MDCTextFieldFoundation2.prototype.handleTextFieldInteraction = function() {
    var nativeInput = this.adapter.getNativeInput();
    if (nativeInput && nativeInput.disabled) {
      return;
    }
    this.receivedUserInput_ = true;
  };
  MDCTextFieldFoundation2.prototype.handleValidationAttributeChange = function(attributesList) {
    var _this = this;
    attributesList.some(function(attributeName) {
      if (VALIDATION_ATTR_WHITELIST.indexOf(attributeName) > -1) {
        _this.styleValidity_(true);
        _this.adapter.setLabelRequired(_this.getNativeInput_().required);
        return true;
      }
      return false;
    });
    if (attributesList.indexOf("maxlength") > -1) {
      this.setCharacterCounter_(this.getValue().length);
    }
  };
  MDCTextFieldFoundation2.prototype.notchOutline = function(openNotch) {
    if (!this.adapter.hasOutline() || !this.adapter.hasLabel()) {
      return;
    }
    if (openNotch) {
      var labelWidth = this.adapter.getLabelWidth() * numbers5.LABEL_SCALE;
      this.adapter.notchOutline(labelWidth);
    } else {
      this.adapter.closeOutline();
    }
  };
  MDCTextFieldFoundation2.prototype.activateFocus = function() {
    this.isFocused_ = true;
    this.styleFocused_(this.isFocused_);
    this.adapter.activateLineRipple();
    if (this.adapter.hasLabel()) {
      this.notchOutline(this.shouldFloat);
      this.adapter.floatLabel(this.shouldFloat);
      this.styleFloating_(this.shouldFloat);
      this.adapter.shakeLabel(this.shouldShake);
    }
    if (this.helperText_ && (this.helperText_.isPersistent() || !this.helperText_.isValidation() || !this.isValid_)) {
      this.helperText_.showToScreenReader();
    }
  };
  MDCTextFieldFoundation2.prototype.setTransformOrigin = function(evt) {
    if (this.isDisabled() || this.adapter.hasOutline()) {
      return;
    }
    var touches = evt.touches;
    var targetEvent = touches ? touches[0] : evt;
    var targetClientRect = targetEvent.target.getBoundingClientRect();
    var normalizedX = targetEvent.clientX - targetClientRect.left;
    this.adapter.setLineRippleTransformOrigin(normalizedX);
  };
  MDCTextFieldFoundation2.prototype.handleInput = function() {
    this.autoCompleteFocus();
    this.setCharacterCounter_(this.getValue().length);
  };
  MDCTextFieldFoundation2.prototype.autoCompleteFocus = function() {
    if (!this.receivedUserInput_) {
      this.activateFocus();
    }
  };
  MDCTextFieldFoundation2.prototype.deactivateFocus = function() {
    this.isFocused_ = false;
    this.adapter.deactivateLineRipple();
    var isValid = this.isValid();
    this.styleValidity_(isValid);
    this.styleFocused_(this.isFocused_);
    if (this.adapter.hasLabel()) {
      this.notchOutline(this.shouldFloat);
      this.adapter.floatLabel(this.shouldFloat);
      this.styleFloating_(this.shouldFloat);
      this.adapter.shakeLabel(this.shouldShake);
    }
    if (!this.shouldFloat) {
      this.receivedUserInput_ = false;
    }
  };
  MDCTextFieldFoundation2.prototype.getValue = function() {
    return this.getNativeInput_().value;
  };
  MDCTextFieldFoundation2.prototype.setValue = function(value) {
    if (this.getValue() !== value) {
      this.getNativeInput_().value = value;
    }
    this.setCharacterCounter_(value.length);
    if (this.validateOnValueChange_) {
      var isValid = this.isValid();
      this.styleValidity_(isValid);
    }
    if (this.adapter.hasLabel()) {
      this.notchOutline(this.shouldFloat);
      this.adapter.floatLabel(this.shouldFloat);
      this.styleFloating_(this.shouldFloat);
      if (this.validateOnValueChange_) {
        this.adapter.shakeLabel(this.shouldShake);
      }
    }
  };
  MDCTextFieldFoundation2.prototype.isValid = function() {
    return this.useNativeValidation_ ? this.isNativeInputValid_() : this.isValid_;
  };
  MDCTextFieldFoundation2.prototype.setValid = function(isValid) {
    this.isValid_ = isValid;
    this.styleValidity_(isValid);
    var shouldShake = !isValid && !this.isFocused_ && !!this.getValue();
    if (this.adapter.hasLabel()) {
      this.adapter.shakeLabel(shouldShake);
    }
  };
  MDCTextFieldFoundation2.prototype.setValidateOnValueChange = function(shouldValidate) {
    this.validateOnValueChange_ = shouldValidate;
  };
  MDCTextFieldFoundation2.prototype.getValidateOnValueChange = function() {
    return this.validateOnValueChange_;
  };
  MDCTextFieldFoundation2.prototype.setUseNativeValidation = function(useNativeValidation) {
    this.useNativeValidation_ = useNativeValidation;
  };
  MDCTextFieldFoundation2.prototype.isDisabled = function() {
    return this.getNativeInput_().disabled;
  };
  MDCTextFieldFoundation2.prototype.setDisabled = function(disabled) {
    this.getNativeInput_().disabled = disabled;
    this.styleDisabled_(disabled);
  };
  MDCTextFieldFoundation2.prototype.setHelperTextContent = function(content) {
    if (this.helperText_) {
      this.helperText_.setContent(content);
    }
  };
  MDCTextFieldFoundation2.prototype.setLeadingIconAriaLabel = function(label) {
    if (this.leadingIcon_) {
      this.leadingIcon_.setAriaLabel(label);
    }
  };
  MDCTextFieldFoundation2.prototype.setLeadingIconContent = function(content) {
    if (this.leadingIcon_) {
      this.leadingIcon_.setContent(content);
    }
  };
  MDCTextFieldFoundation2.prototype.setTrailingIconAriaLabel = function(label) {
    if (this.trailingIcon_) {
      this.trailingIcon_.setAriaLabel(label);
    }
  };
  MDCTextFieldFoundation2.prototype.setTrailingIconContent = function(content) {
    if (this.trailingIcon_) {
      this.trailingIcon_.setContent(content);
    }
  };
  MDCTextFieldFoundation2.prototype.setCharacterCounter_ = function(currentLength) {
    if (!this.characterCounter_) {
      return;
    }
    var maxLength = this.getNativeInput_().maxLength;
    if (maxLength === -1) {
      throw new Error("MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.");
    }
    this.characterCounter_.setCounterValue(currentLength, maxLength);
  };
  MDCTextFieldFoundation2.prototype.isBadInput_ = function() {
    return this.getNativeInput_().validity.badInput || false;
  };
  MDCTextFieldFoundation2.prototype.isNativeInputValid_ = function() {
    return this.getNativeInput_().validity.valid;
  };
  MDCTextFieldFoundation2.prototype.styleValidity_ = function(isValid) {
    var INVALID = MDCTextFieldFoundation2.cssClasses.INVALID;
    if (isValid) {
      this.adapter.removeClass(INVALID);
    } else {
      this.adapter.addClass(INVALID);
    }
    if (this.helperText_) {
      this.helperText_.setValidity(isValid);
      var helperTextValidation = this.helperText_.isValidation();
      if (!helperTextValidation) {
        return;
      }
      var helperTextVisible = this.helperText_.isVisible();
      var helperTextId = this.helperText_.getId();
      if (helperTextVisible && helperTextId) {
        this.adapter.setInputAttr(strings8.ARIA_DESCRIBEDBY, helperTextId);
      } else {
        this.adapter.removeInputAttr(strings8.ARIA_DESCRIBEDBY);
      }
    }
  };
  MDCTextFieldFoundation2.prototype.styleFocused_ = function(isFocused) {
    var FOCUSED = MDCTextFieldFoundation2.cssClasses.FOCUSED;
    if (isFocused) {
      this.adapter.addClass(FOCUSED);
    } else {
      this.adapter.removeClass(FOCUSED);
    }
  };
  MDCTextFieldFoundation2.prototype.styleDisabled_ = function(isDisabled) {
    var _a4 = MDCTextFieldFoundation2.cssClasses, DISABLED = _a4.DISABLED, INVALID = _a4.INVALID;
    if (isDisabled) {
      this.adapter.addClass(DISABLED);
      this.adapter.removeClass(INVALID);
    } else {
      this.adapter.removeClass(DISABLED);
    }
    if (this.leadingIcon_) {
      this.leadingIcon_.setDisabled(isDisabled);
    }
    if (this.trailingIcon_) {
      this.trailingIcon_.setDisabled(isDisabled);
    }
  };
  MDCTextFieldFoundation2.prototype.styleFloating_ = function(isFloating) {
    var LABEL_FLOATING = MDCTextFieldFoundation2.cssClasses.LABEL_FLOATING;
    if (isFloating) {
      this.adapter.addClass(LABEL_FLOATING);
    } else {
      this.adapter.removeClass(LABEL_FLOATING);
    }
  };
  MDCTextFieldFoundation2.prototype.getNativeInput_ = function() {
    var nativeInput = this.adapter ? this.adapter.getNativeInput() : null;
    return nativeInput || {
      disabled: false,
      maxLength: -1,
      required: false,
      type: "input",
      validity: {
        badInput: false,
        valid: true
      },
      value: ""
    };
  };
  return MDCTextFieldFoundation2;
}(MDCFoundation);
var foundation_default5 = MDCTextFieldFoundation;

// node_modules/lit-html/directives/live.js
var live = directive((value) => (part) => {
  let previousValue;
  if (part instanceof EventPart || part instanceof NodePart) {
    throw new Error("The `live` directive is not allowed on text or event bindings");
  }
  if (part instanceof BooleanAttributePart) {
    checkStrings(part.strings);
    previousValue = part.element.hasAttribute(part.name);
    part.value = previousValue;
  } else {
    const { element, name, strings: strings10 } = part.committer;
    checkStrings(strings10);
    if (part instanceof PropertyPart) {
      previousValue = element[name];
      if (previousValue === value) {
        return;
      }
    } else if (part instanceof AttributePart) {
      previousValue = element.getAttribute(name);
    }
    if (previousValue === String(value)) {
      return;
    }
  }
  part.setValue(value);
});
var checkStrings = (strings10) => {
  if (strings10.length !== 2 || strings10[0] !== "" || strings10[1] !== "") {
    throw new Error("`live` bindings can only contain a single expression");
  }
};

// node_modules/@material/mwc-textfield/mwc-textfield-base.js
var passiveEvents = ["touchstart", "touchmove", "scroll", "mousewheel"];
var createValidityObj = (customValidity = {}) => {
  const objectifiedCustomValidity = {};
  for (const propName in customValidity) {
    objectifiedCustomValidity[propName] = customValidity[propName];
  }
  return Object.assign({ badInput: false, customError: false, patternMismatch: false, rangeOverflow: false, rangeUnderflow: false, stepMismatch: false, tooLong: false, tooShort: false, typeMismatch: false, valid: true, valueMissing: false }, objectifiedCustomValidity);
};
var TextFieldBase = class extends FormElement {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = foundation_default5;
    this.value = "";
    this.type = "text";
    this.placeholder = "";
    this.label = "";
    this.icon = "";
    this.iconTrailing = "";
    this.disabled = false;
    this.required = false;
    this.minLength = -1;
    this.maxLength = -1;
    this.outlined = false;
    this.helper = "";
    this.validateOnInitialRender = false;
    this.validationMessage = "";
    this.autoValidate = false;
    this.pattern = "";
    this.min = "";
    this.max = "";
    this.step = null;
    this.size = null;
    this.helperPersistent = false;
    this.charCounter = false;
    this.endAligned = false;
    this.prefix = "";
    this.suffix = "";
    this.name = "";
    this.readOnly = false;
    this.autocapitalize = "";
    this.outlineOpen = false;
    this.outlineWidth = 0;
    this.isUiValid = true;
    this.focused = false;
    this._validity = createValidityObj();
    this._outlineUpdateComplete = null;
    this.validityTransform = null;
  }
  get validity() {
    this._checkValidity(this.value);
    return this._validity;
  }
  get willValidate() {
    return this.formElement.willValidate;
  }
  get selectionStart() {
    return this.formElement.selectionStart;
  }
  get selectionEnd() {
    return this.formElement.selectionEnd;
  }
  focus() {
    const focusEvt = new CustomEvent("focus");
    this.formElement.dispatchEvent(focusEvt);
    this.formElement.focus();
  }
  blur() {
    const blurEvt = new CustomEvent("blur");
    this.formElement.dispatchEvent(blurEvt);
    this.formElement.blur();
  }
  select() {
    this.formElement.select();
  }
  setSelectionRange(selectionStart, selectionEnd, selectionDirection) {
    this.formElement.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  update(changedProperties) {
    if (changedProperties.has("autoValidate") && this.mdcFoundation) {
      this.mdcFoundation.setValidateOnValueChange(this.autoValidate);
    }
    if (changedProperties.has("value") && typeof this.value !== "string") {
      this.value = `${this.value}`;
    }
    super.update(changedProperties);
  }
  render() {
    const shouldRenderCharCounter = this.charCounter && this.maxLength !== -1;
    const shouldRenderHelperText = !!this.helper || !!this.validationMessage || shouldRenderCharCounter;
    const classes = {
      "mdc-text-field--disabled": this.disabled,
      "mdc-text-field--no-label": !this.label,
      "mdc-text-field--filled": !this.outlined,
      "mdc-text-field--outlined": this.outlined,
      "mdc-text-field--with-leading-icon": this.icon,
      "mdc-text-field--with-trailing-icon": this.iconTrailing,
      "mdc-text-field--end-aligned": this.endAligned
    };
    return html`
      <label class="mdc-text-field ${classMap(classes)}">
        ${this.renderRipple()}
        ${this.outlined ? this.renderOutline() : this.renderLabel()}
        ${this.renderLeadingIcon()}
        ${this.renderPrefix()}
        ${this.renderInput(shouldRenderHelperText)}
        ${this.renderSuffix()}
        ${this.renderTrailingIcon()}
        ${this.renderLineRipple()}
      </label>
      ${this.renderHelperText(shouldRenderHelperText, shouldRenderCharCounter)}
    `;
  }
  updated(changedProperties) {
    if (changedProperties.has("value") && changedProperties.get("value") !== void 0) {
      this.mdcFoundation.setValue(this.value);
      if (this.autoValidate) {
        this.reportValidity();
      }
    }
  }
  renderRipple() {
    return this.outlined ? "" : html`
      <span class="mdc-text-field__ripple"></span>
    `;
  }
  renderOutline() {
    return !this.outlined ? "" : html`
      <mwc-notched-outline
          .width=${this.outlineWidth}
          .open=${this.outlineOpen}
          class="mdc-notched-outline">
        ${this.renderLabel()}
      </mwc-notched-outline>`;
  }
  renderLabel() {
    return !this.label ? "" : html`
      <span
          .floatingLabelFoundation=${floatingLabel(this.label)}
          id="label">${this.label}</span>
    `;
  }
  renderLeadingIcon() {
    return this.icon ? this.renderIcon(this.icon) : "";
  }
  renderTrailingIcon() {
    return this.iconTrailing ? this.renderIcon(this.iconTrailing, true) : "";
  }
  renderIcon(icon, isTrailingIcon = false) {
    const classes = {
      "mdc-text-field__icon--leading": !isTrailingIcon,
      "mdc-text-field__icon--trailing": isTrailingIcon
    };
    return html`<i class="material-icons mdc-text-field__icon ${classMap(classes)}">${icon}</i>`;
  }
  renderPrefix() {
    return this.prefix ? this.renderAffix(this.prefix) : "";
  }
  renderSuffix() {
    return this.suffix ? this.renderAffix(this.suffix, true) : "";
  }
  renderAffix(content, isSuffix = false) {
    const classes = {
      "mdc-text-field__affix--prefix": !isSuffix,
      "mdc-text-field__affix--suffix": isSuffix
    };
    return html`<span class="mdc-text-field__affix ${classMap(classes)}">
        ${content}</span>`;
  }
  renderInput(shouldRenderHelperText) {
    const minOrUndef = this.minLength === -1 ? void 0 : this.minLength;
    const maxOrUndef = this.maxLength === -1 ? void 0 : this.maxLength;
    const autocapitalizeOrUndef = this.autocapitalize ? this.autocapitalize : void 0;
    const showValidationMessage = this.validationMessage && !this.isUiValid;
    const ariaControlsOrUndef = shouldRenderHelperText ? "helper-text" : void 0;
    const ariaDescribedbyOrUndef = this.focused || this.helperPersistent || showValidationMessage ? "helper-text" : void 0;
    const ariaErrortextOrUndef = showValidationMessage ? "helper-text" : void 0;
    return html`
      <input
          aria-labelledby="label"
          aria-controls="${ifDefined(ariaControlsOrUndef)}"
          aria-describedby="${ifDefined(ariaDescribedbyOrUndef)}"
          aria-errortext="${ifDefined(ariaErrortextOrUndef)}"
          class="mdc-text-field__input"
          type="${this.type}"
          .value="${live(this.value)}"
          ?disabled="${this.disabled}"
          placeholder="${this.placeholder}"
          ?required="${this.required}"
          ?readonly="${this.readOnly}"
          minlength="${ifDefined(minOrUndef)}"
          maxlength="${ifDefined(maxOrUndef)}"
          pattern="${ifDefined(this.pattern ? this.pattern : void 0)}"
          min="${ifDefined(this.min === "" ? void 0 : this.min)}"
          max="${ifDefined(this.max === "" ? void 0 : this.max)}"
          step="${ifDefined(this.step === null ? void 0 : this.step)}"
          size="${ifDefined(this.size === null ? void 0 : this.size)}"
          name="${ifDefined(this.name === "" ? void 0 : this.name)}"
          inputmode="${ifDefined(this.inputMode)}"
          autocapitalize="${ifDefined(autocapitalizeOrUndef)}"
          @input="${this.handleInputChange}"
          @focus="${this.onInputFocus}"
          @blur="${this.onInputBlur}">`;
  }
  renderLineRipple() {
    return this.outlined ? "" : html`
      <span .lineRippleFoundation=${lineRipple()}></span>
    `;
  }
  renderHelperText(shouldRenderHelperText, shouldRenderCharCounter) {
    const showValidationMessage = this.validationMessage && !this.isUiValid;
    const classes = {
      "mdc-text-field-helper-text--persistent": this.helperPersistent,
      "mdc-text-field-helper-text--validation-msg": showValidationMessage
    };
    const ariaHiddenOrUndef = this.focused || this.helperPersistent || showValidationMessage ? void 0 : "true";
    const helperText = showValidationMessage ? this.validationMessage : this.helper;
    return !shouldRenderHelperText ? "" : html`
      <div class="mdc-text-field-helper-line">
        <div id="helper-text"
             aria-hidden="${ifDefined(ariaHiddenOrUndef)}"
             class="mdc-text-field-helper-text ${classMap(classes)}"
             >${helperText}</div>
        ${this.renderCharCounter(shouldRenderCharCounter)}
      </div>`;
  }
  renderCharCounter(shouldRenderCharCounter) {
    const length = Math.min(this.value.length, this.maxLength);
    return !shouldRenderCharCounter ? "" : html`
      <span class="mdc-text-field-character-counter"
            >${length} / ${this.maxLength}</span>`;
  }
  onInputFocus() {
    this.focused = true;
  }
  onInputBlur() {
    this.focused = false;
    this.reportValidity();
  }
  checkValidity() {
    const isValid = this._checkValidity(this.value);
    if (!isValid) {
      const invalidEvent = new Event("invalid", { bubbles: false, cancelable: true });
      this.dispatchEvent(invalidEvent);
    }
    return isValid;
  }
  reportValidity() {
    const isValid = this.checkValidity();
    this.mdcFoundation.setValid(isValid);
    this.isUiValid = isValid;
    return isValid;
  }
  _checkValidity(value) {
    const nativeValidity = this.formElement.validity;
    let validity = createValidityObj(nativeValidity);
    if (this.validityTransform) {
      const customValidity = this.validityTransform(value, validity);
      validity = Object.assign(Object.assign({}, validity), customValidity);
      this.mdcFoundation.setUseNativeValidation(false);
    } else {
      this.mdcFoundation.setUseNativeValidation(true);
    }
    this._validity = validity;
    return this._validity.valid;
  }
  setCustomValidity(message) {
    this.validationMessage = message;
    this.formElement.setCustomValidity(message);
  }
  handleInputChange() {
    this.value = this.formElement.value;
  }
  createFoundation() {
    if (this.mdcFoundation !== void 0) {
      this.mdcFoundation.destroy();
    }
    this.mdcFoundation = new this.mdcFoundationClass(this.createAdapter());
    this.mdcFoundation.init();
  }
  createAdapter() {
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, this.getRootAdapterMethods()), this.getInputAdapterMethods()), this.getLabelAdapterMethods()), this.getLineRippleAdapterMethods()), this.getOutlineAdapterMethods());
  }
  getRootAdapterMethods() {
    return Object.assign({ registerTextFieldInteractionHandler: (evtType, handler) => this.addEventListener(evtType, handler), deregisterTextFieldInteractionHandler: (evtType, handler) => this.removeEventListener(evtType, handler), registerValidationAttributeChangeHandler: (handler) => {
      const getAttributesList = (mutationsList) => {
        return mutationsList.map((mutation) => mutation.attributeName).filter((attributeName) => attributeName);
      };
      const observer2 = new MutationObserver((mutationsList) => {
        handler(getAttributesList(mutationsList));
      });
      const config = { attributes: true };
      observer2.observe(this.formElement, config);
      return observer2;
    }, deregisterValidationAttributeChangeHandler: (observer2) => observer2.disconnect() }, addHasRemoveClass(this.mdcRoot));
  }
  getInputAdapterMethods() {
    return {
      getNativeInput: () => this.formElement,
      setInputAttr: () => void 0,
      removeInputAttr: () => void 0,
      isFocused: () => this.shadowRoot ? this.shadowRoot.activeElement === this.formElement : false,
      registerInputInteractionHandler: (evtType, handler) => this.formElement.addEventListener(evtType, handler, { passive: evtType in passiveEvents }),
      deregisterInputInteractionHandler: (evtType, handler) => this.formElement.removeEventListener(evtType, handler)
    };
  }
  getLabelAdapterMethods() {
    return {
      floatLabel: (shouldFloat) => this.labelElement && this.labelElement.floatingLabelFoundation.float(shouldFloat),
      getLabelWidth: () => {
        return this.labelElement ? this.labelElement.floatingLabelFoundation.getWidth() : 0;
      },
      hasLabel: () => Boolean(this.labelElement),
      shakeLabel: (shouldShake) => this.labelElement && this.labelElement.floatingLabelFoundation.shake(shouldShake),
      setLabelRequired: (isRequired) => {
        if (this.labelElement) {
          this.labelElement.floatingLabelFoundation.setRequired(isRequired);
        }
      }
    };
  }
  getLineRippleAdapterMethods() {
    return {
      activateLineRipple: () => {
        if (this.lineRippleElement) {
          this.lineRippleElement.lineRippleFoundation.activate();
        }
      },
      deactivateLineRipple: () => {
        if (this.lineRippleElement) {
          this.lineRippleElement.lineRippleFoundation.deactivate();
        }
      },
      setLineRippleTransformOrigin: (normalizedX) => {
        if (this.lineRippleElement) {
          this.lineRippleElement.lineRippleFoundation.setRippleCenter(normalizedX);
        }
      }
    };
  }
  async _getUpdateComplete() {
    let result = false;
    if (super._getUpdateComplete) {
      await super._getUpdateComplete();
    } else {
      result = await super.getUpdateComplete();
    }
    await this._outlineUpdateComplete;
    return result;
  }
  async getUpdateComplete() {
    return this._getUpdateComplete();
  }
  async firstUpdated() {
    const outlineElement = this.outlineElement;
    if (outlineElement) {
      this._outlineUpdateComplete = outlineElement.updateComplete;
      await this._outlineUpdateComplete;
    }
    super.firstUpdated();
    this.mdcFoundation.setValidateOnValueChange(this.autoValidate);
    if (this.validateOnInitialRender) {
      this.reportValidity();
    }
  }
  getOutlineAdapterMethods() {
    return {
      closeOutline: () => this.outlineElement && (this.outlineOpen = false),
      hasOutline: () => Boolean(this.outlineElement),
      notchOutline: (labelWidth) => {
        const outlineElement = this.outlineElement;
        if (outlineElement && !this.outlineOpen) {
          this.outlineWidth = labelWidth;
          this.outlineOpen = true;
        }
      }
    };
  }
  async layout() {
    await this.updateComplete;
    const labelElement = this.labelElement;
    if (!labelElement) {
      this.outlineOpen = false;
      return;
    }
    const shouldFloat = !!this.label && !!this.value;
    labelElement.floatingLabelFoundation.float(shouldFloat);
    if (!this.outlined) {
      return;
    }
    this.outlineOpen = shouldFloat;
    await this.updateComplete;
    const labelWidth = labelElement.floatingLabelFoundation.getWidth();
    if (this.outlineOpen) {
      this.outlineWidth = labelWidth;
    }
  }
};
__decorate([
  query2(".mdc-text-field")
], TextFieldBase.prototype, "mdcRoot", void 0);
__decorate([
  query2("input")
], TextFieldBase.prototype, "formElement", void 0);
__decorate([
  query2(".mdc-floating-label")
], TextFieldBase.prototype, "labelElement", void 0);
__decorate([
  query2(".mdc-line-ripple")
], TextFieldBase.prototype, "lineRippleElement", void 0);
__decorate([
  query2("mwc-notched-outline")
], TextFieldBase.prototype, "outlineElement", void 0);
__decorate([
  query2(".mdc-notched-outline__notch")
], TextFieldBase.prototype, "notchElement", void 0);
__decorate([
  property2({ type: String })
], TextFieldBase.prototype, "value", void 0);
__decorate([
  property2({ type: String })
], TextFieldBase.prototype, "type", void 0);
__decorate([
  property2({ type: String })
], TextFieldBase.prototype, "placeholder", void 0);
__decorate([
  property2({ type: String }),
  observer(function(_newVal, oldVal) {
    if (oldVal !== void 0 && this.label !== oldVal) {
      this.layout();
    }
  })
], TextFieldBase.prototype, "label", void 0);
__decorate([
  property2({ type: String })
], TextFieldBase.prototype, "icon", void 0);
__decorate([
  property2({ type: String })
], TextFieldBase.prototype, "iconTrailing", void 0);
__decorate([
  property2({ type: Boolean, reflect: true })
], TextFieldBase.prototype, "disabled", void 0);
__decorate([
  property2({ type: Boolean })
], TextFieldBase.prototype, "required", void 0);
__decorate([
  property2({ type: Number })
], TextFieldBase.prototype, "minLength", void 0);
__decorate([
  property2({ type: Number })
], TextFieldBase.prototype, "maxLength", void 0);
__decorate([
  property2({ type: Boolean, reflect: true }),
  observer(function(_newVal, oldVal) {
    if (oldVal !== void 0 && this.outlined !== oldVal) {
      this.layout();
    }
  })
], TextFieldBase.prototype, "outlined", void 0);
__decorate([
  property2({ type: String })
], TextFieldBase.prototype, "helper", void 0);
__decorate([
  property2({ type: Boolean })
], TextFieldBase.prototype, "validateOnInitialRender", void 0);
__decorate([
  property2({ type: String })
], TextFieldBase.prototype, "validationMessage", void 0);
__decorate([
  property2({ type: Boolean })
], TextFieldBase.prototype, "autoValidate", void 0);
__decorate([
  property2({ type: String })
], TextFieldBase.prototype, "pattern", void 0);
__decorate([
  property2({ type: String })
], TextFieldBase.prototype, "min", void 0);
__decorate([
  property2({ type: String })
], TextFieldBase.prototype, "max", void 0);
__decorate([
  property2({ type: Number })
], TextFieldBase.prototype, "step", void 0);
__decorate([
  property2({ type: Number })
], TextFieldBase.prototype, "size", void 0);
__decorate([
  property2({ type: Boolean })
], TextFieldBase.prototype, "helperPersistent", void 0);
__decorate([
  property2({ type: Boolean })
], TextFieldBase.prototype, "charCounter", void 0);
__decorate([
  property2({ type: Boolean })
], TextFieldBase.prototype, "endAligned", void 0);
__decorate([
  property2({ type: String })
], TextFieldBase.prototype, "prefix", void 0);
__decorate([
  property2({ type: String })
], TextFieldBase.prototype, "suffix", void 0);
__decorate([
  property2({ type: String })
], TextFieldBase.prototype, "name", void 0);
__decorate([
  property2({ type: String })
], TextFieldBase.prototype, "inputMode", void 0);
__decorate([
  property2({ type: Boolean })
], TextFieldBase.prototype, "readOnly", void 0);
__decorate([
  property2({ type: String })
], TextFieldBase.prototype, "autocapitalize", void 0);
__decorate([
  internalProperty2()
], TextFieldBase.prototype, "outlineOpen", void 0);
__decorate([
  internalProperty2()
], TextFieldBase.prototype, "outlineWidth", void 0);
__decorate([
  internalProperty2()
], TextFieldBase.prototype, "isUiValid", void 0);
__decorate([
  internalProperty2()
], TextFieldBase.prototype, "focused", void 0);
__decorate([
  eventOptions({ passive: true })
], TextFieldBase.prototype, "handleInputChange", null);

// node_modules/@material/mwc-textfield/mwc-textfield-css.js
var style12 = css2`.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform;transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required::after{margin-left:1px;margin-right:0px;content:"*"}[dir=rtl] .mdc-floating-label--required::after,.mdc-floating-label--required[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{border-bottom-width:1px;z-index:1}.mdc-line-ripple::after{transform:scaleX(0);border-bottom-width:2px;opacity:0;z-index:2}.mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / 0.75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-text-field--filled{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-text-field--filled .mdc-text-field__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-text-field--filled .mdc-text-field__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-text-field--filled.mdc-ripple-upgraded--unbounded .mdc-text-field__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-text-field--filled.mdc-ripple-upgraded--foreground-activation .mdc-text-field__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-text-field--filled.mdc-ripple-upgraded--foreground-deactivation .mdc-text-field__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-text-field__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-text-field{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:0;border-bottom-left-radius:0;display:inline-flex;align-items:baseline;padding:0 16px;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input{color:rgba(0, 0, 0, 0.87)}@media all{.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:rgba(0, 0, 0, 0.54)}}@media all{.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:rgba(0, 0, 0, 0.54)}}.mdc-text-field .mdc-text-field__input{caret-color:#6200ee;caret-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field-character-counter,.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--leading{color:rgba(0, 0, 0, 0.54)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--trailing{color:rgba(0, 0, 0, 0.54)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__affix--prefix{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__affix--suffix{color:rgba(0, 0, 0, 0.6)}.mdc-text-field .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-text-field__input{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);height:28px;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);width:100%;min-width:0;border:none;border-radius:0;background:none;appearance:none;padding:0}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input::-webkit-calendar-picker-indicator{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}@media all{.mdc-text-field__input::placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}}@media all{.mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}}@media all{.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}}@media all{.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}}.mdc-text-field__affix{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);height:28px;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0;white-space:nowrap}.mdc-text-field--label-floating .mdc-text-field__affix,.mdc-text-field--no-label .mdc-text-field__affix{opacity:1}@supports(-webkit-hyphens: none){.mdc-text-field--outlined .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field__affix--prefix,.mdc-text-field__affix--prefix[dir=rtl]{padding-left:2px;padding-right:0}.mdc-text-field--end-aligned .mdc-text-field__affix--prefix{padding-left:0;padding-right:12px}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--end-aligned .mdc-text-field__affix--prefix[dir=rtl]{padding-left:12px;padding-right:0}.mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field__affix--suffix,.mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:12px}.mdc-text-field--end-aligned .mdc-text-field__affix--suffix{padding-left:2px;padding-right:0}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--end-aligned .mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:2px}.mdc-text-field--filled{height:56px}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{background-color:rgba(0, 0, 0, 0.87);background-color:var(--mdc-ripple-color, rgba(0, 0, 0, 0.87))}.mdc-text-field--filled:hover .mdc-text-field__ripple::before,.mdc-text-field--filled.mdc-ripple-surface--hover .mdc-text-field__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-text-field--filled.mdc-ripple-upgraded--background-focused .mdc-text-field__ripple::before,.mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-text-field--filled::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:whitesmoke}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42)}.mdc-text-field--filled:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87)}.mdc-text-field--filled .mdc-line-ripple::after{border-bottom-color:#6200ee;border-bottom-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-text-field--filled .mdc-floating-label,.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled.mdc-text-field--no-label::before{display:none}@supports(-webkit-hyphens: none){.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field--outlined{height:56px;overflow:visible}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}}.mdc-text-field--outlined .mdc-text-field__input{height:100%}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.38)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.87)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px, var(--mdc-shape-small, 4px)) * 2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px, var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px, var(--mdc-shape-small, 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px, var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined .mdc-text-field__ripple::before,.mdc-text-field--outlined .mdc-text-field__ripple::after{content:none}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:transparent}.mdc-text-field--outlined .mdc-notched-outline{z-index:1}.mdc-text-field--textarea{flex-direction:column;align-items:center;width:auto;height:auto;padding:0;transition:none}.mdc-text-field--textarea .mdc-floating-label{top:19px}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea .mdc-text-field__input{flex-grow:1;height:auto;min-height:1.5rem;overflow-x:hidden;overflow-y:auto;box-sizing:border-box;resize:none;padding:0 16px;line-height:1.5rem}.mdc-text-field--textarea.mdc-text-field--filled::before{display:none}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-10.25px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-filled 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-filled{0%{transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-10.25px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-10.25px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}}.mdc-text-field--textarea.mdc-text-field--filled .mdc-text-field__input{margin-top:23px;margin-bottom:9px}.mdc-text-field--textarea.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-27.25px) scale(1)}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-24.75px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-24.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-24.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label{top:18px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field__input{margin-bottom:2px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter{align-self:flex-end;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::after{display:inline-block;width:0;height:16px;content:"";vertical-align:-16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::before{display:none}.mdc-text-field__resizer{align-self:stretch;display:inline-flex;flex-direction:column;flex-grow:1;max-height:100%;max-width:100%;min-height:56px;min-width:fit-content;min-width:-moz-available;min-width:-webkit-fill-available;overflow:hidden;resize:both}.mdc-text-field--filled .mdc-text-field__resizer{transform:translateY(-1px)}.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateY(1px)}.mdc-text-field--outlined .mdc-text-field__resizer{transform:translateX(-1px) translateY(-1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer,.mdc-text-field--outlined .mdc-text-field__resizer[dir=rtl]{transform:translateX(1px) translateY(-1px)}.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateX(1px) translateY(1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input[dir=rtl],[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter[dir=rtl]{transform:translateX(-1px) translateY(1px)}.mdc-text-field--with-leading-icon{padding-left:0;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon,.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:16px;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 48px);left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}}.mdc-text-field--with-trailing-icon{padding-left:16px;padding-right:0}[dir=rtl] .mdc-text-field--with-trailing-icon,.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 96px / 0.75)}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(98, 0, 238, 0.87)}.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--focused.mdc-text-field--outlined.mdc-text-field--textarea .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid .mdc-text-field__input{caret-color:#b00020;caret-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__icon--trailing{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--disabled{pointer-events:none}.mdc-text-field--disabled .mdc-text-field__input{color:rgba(0, 0, 0, 0.38)}@media all{.mdc-text-field--disabled .mdc-text-field__input::placeholder{color:rgba(0, 0, 0, 0.38)}}@media all{.mdc-text-field--disabled .mdc-text-field__input:-ms-input-placeholder{color:rgba(0, 0, 0, 0.38)}}.mdc-text-field--disabled .mdc-floating-label{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field-character-counter,.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field__icon--leading{color:rgba(0, 0, 0, 0.3)}.mdc-text-field--disabled .mdc-text-field__icon--trailing{color:rgba(0, 0, 0, 0.3)}.mdc-text-field--disabled .mdc-text-field__affix--prefix{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field__affix--suffix{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.06)}.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.06)}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__input::placeholder{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__input:-ms-input-placeholder{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-floating-label{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field-character-counter,.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__icon--leading{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__icon--trailing{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__affix--prefix{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__affix--suffix{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:GrayText}}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--disabled.mdc-text-field--filled{background-color:#fafafa}.mdc-text-field--disabled.mdc-text-field--filled .mdc-text-field__ripple{display:none}.mdc-text-field--disabled .mdc-text-field__input{pointer-events:auto}.mdc-text-field--end-aligned .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--end-aligned .mdc-text-field__input[dir=rtl]{text-align:left}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix{direction:ltr}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--leading,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--leading{order:1}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{order:2}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input{order:3}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{order:4}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--trailing,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--trailing{order:5}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--prefix{padding-right:12px}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--suffix{padding-left:2px}.mdc-text-field-helper-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin:0;opacity:0;will-change:opacity;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-text-field-helper-text::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}.mdc-text-field-helper-text--persistent{transition:none;opacity:1;will-change:initial}.mdc-text-field-character-counter{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin-left:auto;margin-right:0;padding-left:16px;padding-right:0;white-space:nowrap}.mdc-text-field-character-counter::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field__icon{align-self:center;cursor:pointer}.mdc-text-field__icon:not([tabindex]),.mdc-text-field__icon[tabindex="-1"]{cursor:default;pointer-events:none}.mdc-text-field__icon svg{display:block}.mdc-text-field__icon--leading{margin-left:16px;margin-right:8px}[dir=rtl] .mdc-text-field__icon--leading,.mdc-text-field__icon--leading[dir=rtl]{margin-left:8px;margin-right:16px}.mdc-text-field__icon--trailing{padding:12px;margin-left:0px;margin-right:0px}[dir=rtl] .mdc-text-field__icon--trailing,.mdc-text-field__icon--trailing[dir=rtl]{margin-left:0px;margin-right:0px}.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}:host{display:inline-flex;flex-direction:column;outline:none}.mdc-text-field{width:100%}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42);border-bottom-color:var(--mdc-text-field-idle-line-color, rgba(0, 0, 0, 0.42))}.mdc-text-field:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87);border-bottom-color:var(--mdc-text-field-hover-line-color, rgba(0, 0, 0, 0.87))}.mdc-text-field.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.06);border-bottom-color:var(--mdc-text-field-disabled-line-color, rgba(0, 0, 0, 0.06))}.mdc-text-field.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-idle-border-color, rgba(0, 0, 0, 0.38) )}:host(:not([disabled]):hover) :not(.mdc-text-field--invalid):not(.mdc-text-field--focused) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-hover-border-color, rgba(0, 0, 0, 0.87) )}:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--outlined){background-color:var(--mdc-text-field-fill-color, whitesmoke)}:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-error-color, var(--mdc-theme-error, #b00020) )}:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-character-counter,:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid .mdc-text-field__icon{color:var(--mdc-text-field-error-color, var(--mdc-theme-error, #b00020))}:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label,:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label::after{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused mwc-notched-outline{--mdc-notched-outline-stroke-width: 2px}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-focused-label-color, var(--mdc-theme-primary, rgba(98, 0, 238, 0.87)) )}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) .mdc-floating-label{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host(:not([disabled])) .mdc-text-field .mdc-text-field__input{color:var(--mdc-text-field-ink-color, rgba(0, 0, 0, 0.87))}:host(:not([disabled])) .mdc-text-field .mdc-text-field__input::placeholder{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg),:host(:not([disabled])) .mdc-text-field-helper-line:not(.mdc-text-field--invalid) .mdc-text-field-character-counter{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host([disabled]) .mdc-text-field:not(.mdc-text-field--outlined){background-color:var(--mdc-text-field-disabled-fill-color, #fafafa)}:host([disabled]) .mdc-text-field.mdc-text-field--outlined mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-disabled-border-color, rgba(0, 0, 0, 0.06) )}:host([disabled]) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label,:host([disabled]) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label::after{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-text-field .mdc-text-field__input,:host([disabled]) .mdc-text-field .mdc-text-field__input::placeholder{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-text-field-helper-line .mdc-text-field-helper-text,:host([disabled]) .mdc-text-field-helper-line .mdc-text-field-character-counter{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}`;

// node_modules/@material/mwc-textfield/mwc-textfield.js
var TextField = class TextField2 extends TextFieldBase {
};
TextField.styles = style12;
TextField = __decorate([
  customElement2("mwc-textfield")
], TextField);

// node_modules/@material/menu-surface/constants.js
var cssClasses10 = {
  ANCHOR: "mdc-menu-surface--anchor",
  ANIMATING_CLOSED: "mdc-menu-surface--animating-closed",
  ANIMATING_OPEN: "mdc-menu-surface--animating-open",
  FIXED: "mdc-menu-surface--fixed",
  IS_OPEN_BELOW: "mdc-menu-surface--is-open-below",
  OPEN: "mdc-menu-surface--open",
  ROOT: "mdc-menu-surface"
};
var strings9 = {
  CLOSED_EVENT: "MDCMenuSurface:closed",
  CLOSING_EVENT: "MDCMenuSurface:closing",
  OPENED_EVENT: "MDCMenuSurface:opened",
  FOCUSABLE_ELEMENTS: [
    "button:not(:disabled)",
    '[href]:not([aria-disabled="true"])',
    "input:not(:disabled)",
    "select:not(:disabled)",
    "textarea:not(:disabled)",
    '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])'
  ].join(", ")
};
var numbers6 = {
  TRANSITION_OPEN_DURATION: 120,
  TRANSITION_CLOSE_DURATION: 75,
  MARGIN_TO_EDGE: 32,
  ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: 0.67
};
var CornerBit;
(function(CornerBit2) {
  CornerBit2[CornerBit2["BOTTOM"] = 1] = "BOTTOM";
  CornerBit2[CornerBit2["CENTER"] = 2] = "CENTER";
  CornerBit2[CornerBit2["RIGHT"] = 4] = "RIGHT";
  CornerBit2[CornerBit2["FLIP_RTL"] = 8] = "FLIP_RTL";
})(CornerBit || (CornerBit = {}));
var Corner;
(function(Corner2) {
  Corner2[Corner2["TOP_LEFT"] = 0] = "TOP_LEFT";
  Corner2[Corner2["TOP_RIGHT"] = 4] = "TOP_RIGHT";
  Corner2[Corner2["BOTTOM_LEFT"] = 1] = "BOTTOM_LEFT";
  Corner2[Corner2["BOTTOM_RIGHT"] = 5] = "BOTTOM_RIGHT";
  Corner2[Corner2["TOP_START"] = 8] = "TOP_START";
  Corner2[Corner2["TOP_END"] = 12] = "TOP_END";
  Corner2[Corner2["BOTTOM_START"] = 9] = "BOTTOM_START";
  Corner2[Corner2["BOTTOM_END"] = 13] = "BOTTOM_END";
})(Corner || (Corner = {}));

// node_modules/@material/menu-surface/foundation.js
var MDCMenuSurfaceFoundation = function(_super) {
  __extends(MDCMenuSurfaceFoundation2, _super);
  function MDCMenuSurfaceFoundation2(adapter) {
    var _this = _super.call(this, __assign(__assign({}, MDCMenuSurfaceFoundation2.defaultAdapter), adapter)) || this;
    _this.isSurfaceOpen = false;
    _this.isQuickOpen = false;
    _this.isHoistedElement = false;
    _this.isFixedPosition = false;
    _this.isHorizontallyCenteredOnViewport = false;
    _this.maxHeight = 0;
    _this.openAnimationEndTimerId = 0;
    _this.closeAnimationEndTimerId = 0;
    _this.animationRequestId = 0;
    _this.anchorCorner = Corner.TOP_START;
    _this.originCorner = Corner.TOP_START;
    _this.anchorMargin = { top: 0, right: 0, bottom: 0, left: 0 };
    _this.position = { x: 0, y: 0 };
    return _this;
  }
  Object.defineProperty(MDCMenuSurfaceFoundation2, "cssClasses", {
    get: function() {
      return cssClasses10;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation2, "strings", {
    get: function() {
      return strings9;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation2, "numbers", {
    get: function() {
      return numbers6;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation2, "Corner", {
    get: function() {
      return Corner;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation2, "defaultAdapter", {
    get: function() {
      return {
        addClass: function() {
          return void 0;
        },
        removeClass: function() {
          return void 0;
        },
        hasClass: function() {
          return false;
        },
        hasAnchor: function() {
          return false;
        },
        isElementInContainer: function() {
          return false;
        },
        isFocused: function() {
          return false;
        },
        isRtl: function() {
          return false;
        },
        getInnerDimensions: function() {
          return { height: 0, width: 0 };
        },
        getAnchorDimensions: function() {
          return null;
        },
        getWindowDimensions: function() {
          return { height: 0, width: 0 };
        },
        getBodyDimensions: function() {
          return { height: 0, width: 0 };
        },
        getWindowScroll: function() {
          return { x: 0, y: 0 };
        },
        setPosition: function() {
          return void 0;
        },
        setMaxHeight: function() {
          return void 0;
        },
        setTransformOrigin: function() {
          return void 0;
        },
        saveFocus: function() {
          return void 0;
        },
        restoreFocus: function() {
          return void 0;
        },
        notifyClose: function() {
          return void 0;
        },
        notifyOpen: function() {
          return void 0;
        },
        notifyClosing: function() {
          return void 0;
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  MDCMenuSurfaceFoundation2.prototype.init = function() {
    var _a4 = MDCMenuSurfaceFoundation2.cssClasses, ROOT = _a4.ROOT, OPEN = _a4.OPEN;
    if (!this.adapter.hasClass(ROOT)) {
      throw new Error(ROOT + " class required in root element.");
    }
    if (this.adapter.hasClass(OPEN)) {
      this.isSurfaceOpen = true;
    }
  };
  MDCMenuSurfaceFoundation2.prototype.destroy = function() {
    clearTimeout(this.openAnimationEndTimerId);
    clearTimeout(this.closeAnimationEndTimerId);
    cancelAnimationFrame(this.animationRequestId);
  };
  MDCMenuSurfaceFoundation2.prototype.setAnchorCorner = function(corner) {
    this.anchorCorner = corner;
  };
  MDCMenuSurfaceFoundation2.prototype.flipCornerHorizontally = function() {
    this.originCorner = this.originCorner ^ CornerBit.RIGHT;
  };
  MDCMenuSurfaceFoundation2.prototype.setAnchorMargin = function(margin) {
    this.anchorMargin.top = margin.top || 0;
    this.anchorMargin.right = margin.right || 0;
    this.anchorMargin.bottom = margin.bottom || 0;
    this.anchorMargin.left = margin.left || 0;
  };
  MDCMenuSurfaceFoundation2.prototype.setIsHoisted = function(isHoisted) {
    this.isHoistedElement = isHoisted;
  };
  MDCMenuSurfaceFoundation2.prototype.setFixedPosition = function(isFixedPosition) {
    this.isFixedPosition = isFixedPosition;
  };
  MDCMenuSurfaceFoundation2.prototype.setAbsolutePosition = function(x, y) {
    this.position.x = this.isFinite(x) ? x : 0;
    this.position.y = this.isFinite(y) ? y : 0;
  };
  MDCMenuSurfaceFoundation2.prototype.setIsHorizontallyCenteredOnViewport = function(isCentered) {
    this.isHorizontallyCenteredOnViewport = isCentered;
  };
  MDCMenuSurfaceFoundation2.prototype.setQuickOpen = function(quickOpen) {
    this.isQuickOpen = quickOpen;
  };
  MDCMenuSurfaceFoundation2.prototype.setMaxHeight = function(maxHeight) {
    this.maxHeight = maxHeight;
  };
  MDCMenuSurfaceFoundation2.prototype.isOpen = function() {
    return this.isSurfaceOpen;
  };
  MDCMenuSurfaceFoundation2.prototype.open = function() {
    var _this = this;
    if (this.isSurfaceOpen) {
      return;
    }
    this.adapter.saveFocus();
    if (this.isQuickOpen) {
      this.isSurfaceOpen = true;
      this.adapter.addClass(MDCMenuSurfaceFoundation2.cssClasses.OPEN);
      this.dimensions = this.adapter.getInnerDimensions();
      this.autoposition();
      this.adapter.notifyOpen();
    } else {
      this.adapter.addClass(MDCMenuSurfaceFoundation2.cssClasses.ANIMATING_OPEN);
      this.animationRequestId = requestAnimationFrame(function() {
        _this.adapter.addClass(MDCMenuSurfaceFoundation2.cssClasses.OPEN);
        _this.dimensions = _this.adapter.getInnerDimensions();
        _this.autoposition();
        _this.openAnimationEndTimerId = setTimeout(function() {
          _this.openAnimationEndTimerId = 0;
          _this.adapter.removeClass(MDCMenuSurfaceFoundation2.cssClasses.ANIMATING_OPEN);
          _this.adapter.notifyOpen();
        }, numbers6.TRANSITION_OPEN_DURATION);
      });
      this.isSurfaceOpen = true;
    }
  };
  MDCMenuSurfaceFoundation2.prototype.close = function(skipRestoreFocus) {
    var _this = this;
    if (skipRestoreFocus === void 0) {
      skipRestoreFocus = false;
    }
    if (!this.isSurfaceOpen) {
      return;
    }
    this.adapter.notifyClosing();
    if (this.isQuickOpen) {
      this.isSurfaceOpen = false;
      if (!skipRestoreFocus) {
        this.maybeRestoreFocus();
      }
      this.adapter.removeClass(MDCMenuSurfaceFoundation2.cssClasses.OPEN);
      this.adapter.removeClass(MDCMenuSurfaceFoundation2.cssClasses.IS_OPEN_BELOW);
      this.adapter.notifyClose();
      return;
    }
    this.adapter.addClass(MDCMenuSurfaceFoundation2.cssClasses.ANIMATING_CLOSED);
    requestAnimationFrame(function() {
      _this.adapter.removeClass(MDCMenuSurfaceFoundation2.cssClasses.OPEN);
      _this.adapter.removeClass(MDCMenuSurfaceFoundation2.cssClasses.IS_OPEN_BELOW);
      _this.closeAnimationEndTimerId = setTimeout(function() {
        _this.closeAnimationEndTimerId = 0;
        _this.adapter.removeClass(MDCMenuSurfaceFoundation2.cssClasses.ANIMATING_CLOSED);
        _this.adapter.notifyClose();
      }, numbers6.TRANSITION_CLOSE_DURATION);
    });
    this.isSurfaceOpen = false;
    if (!skipRestoreFocus) {
      this.maybeRestoreFocus();
    }
  };
  MDCMenuSurfaceFoundation2.prototype.handleBodyClick = function(evt) {
    var el = evt.target;
    if (this.adapter.isElementInContainer(el)) {
      return;
    }
    this.close();
  };
  MDCMenuSurfaceFoundation2.prototype.handleKeydown = function(evt) {
    var keyCode = evt.keyCode, key = evt.key;
    var isEscape = key === "Escape" || keyCode === 27;
    if (isEscape) {
      this.close();
    }
  };
  MDCMenuSurfaceFoundation2.prototype.autoposition = function() {
    var _a4;
    this.measurements = this.getAutoLayoutmeasurements();
    var corner = this.getoriginCorner();
    var maxMenuSurfaceHeight = this.getMenuSurfaceMaxHeight(corner);
    var verticalAlignment = this.hasBit(corner, CornerBit.BOTTOM) ? "bottom" : "top";
    var horizontalAlignment = this.hasBit(corner, CornerBit.RIGHT) ? "right" : "left";
    var horizontalOffset = this.getHorizontalOriginOffset(corner);
    var verticalOffset = this.getVerticalOriginOffset(corner);
    var _b2 = this.measurements, anchorSize = _b2.anchorSize, surfaceSize = _b2.surfaceSize;
    var position = (_a4 = {}, _a4[horizontalAlignment] = horizontalOffset, _a4[verticalAlignment] = verticalOffset, _a4);
    if (anchorSize.width / surfaceSize.width > numbers6.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO) {
      horizontalAlignment = "center";
    }
    if (this.isHoistedElement || this.isFixedPosition) {
      this.adjustPositionForHoistedElement(position);
    }
    this.adapter.setTransformOrigin(horizontalAlignment + " " + verticalAlignment);
    this.adapter.setPosition(position);
    this.adapter.setMaxHeight(maxMenuSurfaceHeight ? maxMenuSurfaceHeight + "px" : "");
    if (!this.hasBit(corner, CornerBit.BOTTOM)) {
      this.adapter.addClass(MDCMenuSurfaceFoundation2.cssClasses.IS_OPEN_BELOW);
    }
  };
  MDCMenuSurfaceFoundation2.prototype.getAutoLayoutmeasurements = function() {
    var anchorRect = this.adapter.getAnchorDimensions();
    var bodySize = this.adapter.getBodyDimensions();
    var viewportSize = this.adapter.getWindowDimensions();
    var windowScroll = this.adapter.getWindowScroll();
    if (!anchorRect) {
      anchorRect = {
        top: this.position.y,
        right: this.position.x,
        bottom: this.position.y,
        left: this.position.x,
        width: 0,
        height: 0
      };
    }
    return {
      anchorSize: anchorRect,
      bodySize,
      surfaceSize: this.dimensions,
      viewportDistance: {
        top: anchorRect.top,
        right: viewportSize.width - anchorRect.right,
        bottom: viewportSize.height - anchorRect.bottom,
        left: anchorRect.left
      },
      viewportSize,
      windowScroll
    };
  };
  MDCMenuSurfaceFoundation2.prototype.getoriginCorner = function() {
    var corner = this.originCorner;
    var _a4 = this.measurements, viewportDistance = _a4.viewportDistance, anchorSize = _a4.anchorSize, surfaceSize = _a4.surfaceSize;
    var MARGIN_TO_EDGE = MDCMenuSurfaceFoundation2.numbers.MARGIN_TO_EDGE;
    var isAnchoredToBottom = this.hasBit(this.anchorCorner, CornerBit.BOTTOM);
    var availableTop;
    var availableBottom;
    if (isAnchoredToBottom) {
      availableTop = viewportDistance.top - MARGIN_TO_EDGE + this.anchorMargin.bottom;
      availableBottom = viewportDistance.bottom - MARGIN_TO_EDGE - this.anchorMargin.bottom;
    } else {
      availableTop = viewportDistance.top - MARGIN_TO_EDGE + this.anchorMargin.top;
      availableBottom = viewportDistance.bottom - MARGIN_TO_EDGE + anchorSize.height - this.anchorMargin.top;
    }
    var isAvailableBottom = availableBottom - surfaceSize.height > 0;
    if (!isAvailableBottom && availableTop > availableBottom) {
      corner = this.setBit(corner, CornerBit.BOTTOM);
    }
    var isRtl = this.adapter.isRtl();
    var isFlipRtl = this.hasBit(this.anchorCorner, CornerBit.FLIP_RTL);
    var hasRightBit = this.hasBit(this.anchorCorner, CornerBit.RIGHT) || this.hasBit(corner, CornerBit.RIGHT);
    var isAnchoredToRight = false;
    if (isRtl && isFlipRtl) {
      isAnchoredToRight = !hasRightBit;
    } else {
      isAnchoredToRight = hasRightBit;
    }
    var availableLeft;
    var availableRight;
    if (isAnchoredToRight) {
      availableLeft = viewportDistance.left + anchorSize.width + this.anchorMargin.right;
      availableRight = viewportDistance.right - this.anchorMargin.right;
    } else {
      availableLeft = viewportDistance.left + this.anchorMargin.left;
      availableRight = viewportDistance.right + anchorSize.width - this.anchorMargin.left;
    }
    var isAvailableLeft = availableLeft - surfaceSize.width > 0;
    var isAvailableRight = availableRight - surfaceSize.width > 0;
    var isOriginCornerAlignedToEnd = this.hasBit(corner, CornerBit.FLIP_RTL) && this.hasBit(corner, CornerBit.RIGHT);
    if (isAvailableRight && isOriginCornerAlignedToEnd && isRtl || !isAvailableLeft && isOriginCornerAlignedToEnd) {
      corner = this.unsetBit(corner, CornerBit.RIGHT);
    } else if (isAvailableLeft && isAnchoredToRight && isRtl || isAvailableLeft && !isAnchoredToRight && hasRightBit || !isAvailableRight && availableLeft >= availableRight) {
      corner = this.setBit(corner, CornerBit.RIGHT);
    }
    return corner;
  };
  MDCMenuSurfaceFoundation2.prototype.getMenuSurfaceMaxHeight = function(corner) {
    if (this.maxHeight > 0) {
      return this.maxHeight;
    }
    var viewportDistance = this.measurements.viewportDistance;
    var maxHeight = 0;
    var isBottomAligned = this.hasBit(corner, CornerBit.BOTTOM);
    var isBottomAnchored = this.hasBit(this.anchorCorner, CornerBit.BOTTOM);
    var MARGIN_TO_EDGE = MDCMenuSurfaceFoundation2.numbers.MARGIN_TO_EDGE;
    if (isBottomAligned) {
      maxHeight = viewportDistance.top + this.anchorMargin.top - MARGIN_TO_EDGE;
      if (!isBottomAnchored) {
        maxHeight += this.measurements.anchorSize.height;
      }
    } else {
      maxHeight = viewportDistance.bottom - this.anchorMargin.bottom + this.measurements.anchorSize.height - MARGIN_TO_EDGE;
      if (isBottomAnchored) {
        maxHeight -= this.measurements.anchorSize.height;
      }
    }
    return maxHeight;
  };
  MDCMenuSurfaceFoundation2.prototype.getHorizontalOriginOffset = function(corner) {
    var anchorSize = this.measurements.anchorSize;
    var isRightAligned = this.hasBit(corner, CornerBit.RIGHT);
    var avoidHorizontalOverlap = this.hasBit(this.anchorCorner, CornerBit.RIGHT);
    if (isRightAligned) {
      var rightOffset = avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin.left : this.anchorMargin.right;
      if (this.isHoistedElement || this.isFixedPosition) {
        return rightOffset - (this.measurements.viewportSize.width - this.measurements.bodySize.width);
      }
      return rightOffset;
    }
    return avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin.right : this.anchorMargin.left;
  };
  MDCMenuSurfaceFoundation2.prototype.getVerticalOriginOffset = function(corner) {
    var anchorSize = this.measurements.anchorSize;
    var isBottomAligned = this.hasBit(corner, CornerBit.BOTTOM);
    var avoidVerticalOverlap = this.hasBit(this.anchorCorner, CornerBit.BOTTOM);
    var y = 0;
    if (isBottomAligned) {
      y = avoidVerticalOverlap ? anchorSize.height - this.anchorMargin.top : -this.anchorMargin.bottom;
    } else {
      y = avoidVerticalOverlap ? anchorSize.height + this.anchorMargin.bottom : this.anchorMargin.top;
    }
    return y;
  };
  MDCMenuSurfaceFoundation2.prototype.adjustPositionForHoistedElement = function(position) {
    var e_1, _a4;
    var _b2 = this.measurements, windowScroll = _b2.windowScroll, viewportDistance = _b2.viewportDistance, surfaceSize = _b2.surfaceSize, viewportSize = _b2.viewportSize;
    var props = Object.keys(position);
    try {
      for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
        var prop = props_1_1.value;
        var value = position[prop] || 0;
        if (this.isHorizontallyCenteredOnViewport && (prop === "left" || prop === "right")) {
          position[prop] = (viewportSize.width - surfaceSize.width) / 2;
          continue;
        }
        value += viewportDistance[prop];
        if (!this.isFixedPosition) {
          if (prop === "top") {
            value += windowScroll.y;
          } else if (prop === "bottom") {
            value -= windowScroll.y;
          } else if (prop === "left") {
            value += windowScroll.x;
          } else {
            value -= windowScroll.x;
          }
        }
        position[prop] = value;
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (props_1_1 && !props_1_1.done && (_a4 = props_1.return))
          _a4.call(props_1);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
  };
  MDCMenuSurfaceFoundation2.prototype.maybeRestoreFocus = function() {
    var isRootFocused = this.adapter.isFocused();
    var childHasFocus = document.activeElement && this.adapter.isElementInContainer(document.activeElement);
    if (isRootFocused || childHasFocus) {
      this.adapter.restoreFocus();
    }
  };
  MDCMenuSurfaceFoundation2.prototype.hasBit = function(corner, bit) {
    return Boolean(corner & bit);
  };
  MDCMenuSurfaceFoundation2.prototype.setBit = function(corner, bit) {
    return corner | bit;
  };
  MDCMenuSurfaceFoundation2.prototype.unsetBit = function(corner, bit) {
    return corner ^ bit;
  };
  MDCMenuSurfaceFoundation2.prototype.isFinite = function(num) {
    return typeof num === "number" && isFinite(num);
  };
  return MDCMenuSurfaceFoundation2;
}(MDCFoundation);
var foundation_default6 = MDCMenuSurfaceFoundation;

// node_modules/@material/mwc-menu/mwc-menu-surface-base.js
var stringToCorner = {
  "TOP_LEFT": Corner.TOP_LEFT,
  "TOP_RIGHT": Corner.TOP_RIGHT,
  "BOTTOM_LEFT": Corner.BOTTOM_LEFT,
  "BOTTOM_RIGHT": Corner.BOTTOM_RIGHT,
  "TOP_START": Corner.TOP_START,
  "TOP_END": Corner.TOP_END,
  "BOTTOM_START": Corner.BOTTOM_START,
  "BOTTOM_END": Corner.BOTTOM_END
};
var MenuSurfaceBase = class extends BaseElement {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = foundation_default6;
    this.absolute = false;
    this.fullwidth = false;
    this.fixed = false;
    this.x = null;
    this.y = null;
    this.quick = false;
    this.open = false;
    this.stayOpenOnBodyClick = false;
    this.bitwiseCorner = Corner.TOP_START;
    this.previousMenuCorner = null;
    this.menuCorner = "START";
    this.corner = "TOP_START";
    this.styleTop = "";
    this.styleLeft = "";
    this.styleRight = "";
    this.styleBottom = "";
    this.styleMaxHeight = "";
    this.styleTransformOrigin = "";
    this.anchor = null;
    this.previouslyFocused = null;
    this.previousAnchor = null;
    this.onBodyClickBound = () => void 0;
  }
  render() {
    const classes = {
      "mdc-menu-surface--fixed": this.fixed,
      "mdc-menu-surface--fullwidth": this.fullwidth
    };
    const styles = {
      "top": this.styleTop,
      "left": this.styleLeft,
      "right": this.styleRight,
      "bottom": this.styleBottom,
      "max-height": this.styleMaxHeight,
      "transform-origin": this.styleTransformOrigin
    };
    return html`
      <div
          class="mdc-menu-surface ${classMap(classes)}"
          style="${styleMap(styles)}"
          @keydown=${this.onKeydown}
          @opened=${this.registerBodyClick}
          @closed=${this.deregisterBodyClick}>
        <slot></slot>
      </div>`;
  }
  createAdapter() {
    return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), { hasAnchor: () => {
      return !!this.anchor;
    }, notifyClose: () => {
      const init = { bubbles: true, composed: true };
      const ev = new CustomEvent("closed", init);
      this.open = false;
      this.mdcRoot.dispatchEvent(ev);
    }, notifyClosing: () => {
      const init = { bubbles: true, composed: true };
      const ev = new CustomEvent("closing", init);
      this.mdcRoot.dispatchEvent(ev);
    }, notifyOpen: () => {
      const init = { bubbles: true, composed: true };
      const ev = new CustomEvent("opened", init);
      this.open = true;
      this.mdcRoot.dispatchEvent(ev);
    }, isElementInContainer: () => false, isRtl: () => {
      if (this.mdcRoot) {
        return getComputedStyle(this.mdcRoot).direction === "rtl";
      }
      return false;
    }, setTransformOrigin: (origin) => {
      const root = this.mdcRoot;
      if (!root) {
        return;
      }
      this.styleTransformOrigin = origin;
    }, isFocused: () => {
      return doesElementContainFocus(this);
    }, saveFocus: () => {
      const activeElementPath = deepActiveElementPath();
      const pathLength = activeElementPath.length;
      if (!pathLength) {
        this.previouslyFocused = null;
      }
      this.previouslyFocused = activeElementPath[pathLength - 1];
    }, restoreFocus: () => {
      if (!this.previouslyFocused) {
        return;
      }
      if ("focus" in this.previouslyFocused) {
        this.previouslyFocused.focus();
      }
    }, getInnerDimensions: () => {
      const mdcRoot = this.mdcRoot;
      if (!mdcRoot) {
        return { width: 0, height: 0 };
      }
      return { width: mdcRoot.offsetWidth, height: mdcRoot.offsetHeight };
    }, getAnchorDimensions: () => {
      const anchorElement = this.anchor;
      return anchorElement ? anchorElement.getBoundingClientRect() : null;
    }, getBodyDimensions: () => {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      };
    }, getWindowDimensions: () => {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }, getWindowScroll: () => {
      return {
        x: window.pageXOffset,
        y: window.pageYOffset
      };
    }, setPosition: (position) => {
      const mdcRoot = this.mdcRoot;
      if (!mdcRoot) {
        return;
      }
      this.styleLeft = "left" in position ? `${position.left}px` : "";
      this.styleRight = "right" in position ? `${position.right}px` : "";
      this.styleTop = "top" in position ? `${position.top}px` : "";
      this.styleBottom = "bottom" in position ? `${position.bottom}px` : "";
    }, setMaxHeight: async (height) => {
      const mdcRoot = this.mdcRoot;
      if (!mdcRoot) {
        return;
      }
      this.styleMaxHeight = height;
      await this.updateComplete;
      this.styleMaxHeight = `var(--mdc-menu-max-height, ${height})`;
    } });
  }
  onKeydown(evt) {
    if (this.mdcFoundation) {
      this.mdcFoundation.handleKeydown(evt);
    }
  }
  onBodyClick(evt) {
    if (this.stayOpenOnBodyClick) {
      return;
    }
    const path = evt.composedPath();
    if (path.indexOf(this) === -1) {
      this.close();
    }
  }
  registerBodyClick() {
    this.onBodyClickBound = this.onBodyClick.bind(this);
    document.body.addEventListener("click", this.onBodyClickBound, { passive: true, capture: true });
  }
  deregisterBodyClick() {
    document.body.removeEventListener("click", this.onBodyClickBound, { capture: true });
  }
  close() {
    this.open = false;
  }
  show() {
    this.open = true;
  }
};
__decorate([
  query2(".mdc-menu-surface")
], MenuSurfaceBase.prototype, "mdcRoot", void 0);
__decorate([
  query2("slot")
], MenuSurfaceBase.prototype, "slotElement", void 0);
__decorate([
  property2({ type: Boolean }),
  observer(function(isAbsolute) {
    if (this.mdcFoundation && !this.fixed) {
      this.mdcFoundation.setIsHoisted(isAbsolute);
    }
  })
], MenuSurfaceBase.prototype, "absolute", void 0);
__decorate([
  property2({ type: Boolean })
], MenuSurfaceBase.prototype, "fullwidth", void 0);
__decorate([
  property2({ type: Boolean }),
  observer(function(isFixed) {
    if (this.mdcFoundation && !this.absolute) {
      this.mdcFoundation.setFixedPosition(isFixed);
    }
  })
], MenuSurfaceBase.prototype, "fixed", void 0);
__decorate([
  property2({ type: Number }),
  observer(function(value) {
    if (this.mdcFoundation && this.y !== null && value !== null) {
      this.mdcFoundation.setAbsolutePosition(value, this.y);
      this.mdcFoundation.setAnchorMargin({ left: value, top: this.y, right: -value, bottom: this.y });
    }
  })
], MenuSurfaceBase.prototype, "x", void 0);
__decorate([
  property2({ type: Number }),
  observer(function(value) {
    if (this.mdcFoundation && this.x !== null && value !== null) {
      this.mdcFoundation.setAbsolutePosition(this.x, value);
      this.mdcFoundation.setAnchorMargin({ left: this.x, top: value, right: -this.x, bottom: value });
    }
  })
], MenuSurfaceBase.prototype, "y", void 0);
__decorate([
  property2({ type: Boolean }),
  observer(function(value) {
    if (this.mdcFoundation) {
      this.mdcFoundation.setQuickOpen(value);
    }
  })
], MenuSurfaceBase.prototype, "quick", void 0);
__decorate([
  property2({ type: Boolean, reflect: true }),
  observer(function(isOpen, wasOpen) {
    if (this.mdcFoundation) {
      if (isOpen) {
        this.mdcFoundation.open();
      } else if (wasOpen !== void 0) {
        this.mdcFoundation.close();
      }
    }
  })
], MenuSurfaceBase.prototype, "open", void 0);
__decorate([
  property2({ type: Boolean })
], MenuSurfaceBase.prototype, "stayOpenOnBodyClick", void 0);
__decorate([
  internalProperty2(),
  observer(function(value) {
    if (this.mdcFoundation) {
      if (value) {
        this.mdcFoundation.setAnchorCorner(value);
      } else {
        this.mdcFoundation.setAnchorCorner(value);
      }
    }
  })
], MenuSurfaceBase.prototype, "bitwiseCorner", void 0);
__decorate([
  property2({ type: String }),
  observer(function(value) {
    if (this.mdcFoundation) {
      const isValidValue = value === "START" || value === "END";
      const isFirstTimeSet = this.previousMenuCorner === null;
      const cornerChanged = !isFirstTimeSet && value !== this.previousMenuCorner;
      const initiallySetToEnd = isFirstTimeSet && value === "END";
      if (isValidValue && (cornerChanged || initiallySetToEnd)) {
        this.bitwiseCorner = this.bitwiseCorner ^ CornerBit.RIGHT;
        this.mdcFoundation.flipCornerHorizontally();
        this.previousMenuCorner = value;
      }
    }
  })
], MenuSurfaceBase.prototype, "menuCorner", void 0);
__decorate([
  property2({ type: String }),
  observer(function(value) {
    if (this.mdcFoundation) {
      if (value) {
        let newCorner = stringToCorner[value];
        if (this.menuCorner === "END") {
          newCorner = newCorner ^ CornerBit.RIGHT;
        }
        this.bitwiseCorner = newCorner;
      }
    }
  })
], MenuSurfaceBase.prototype, "corner", void 0);
__decorate([
  internalProperty2()
], MenuSurfaceBase.prototype, "styleTop", void 0);
__decorate([
  internalProperty2()
], MenuSurfaceBase.prototype, "styleLeft", void 0);
__decorate([
  internalProperty2()
], MenuSurfaceBase.prototype, "styleRight", void 0);
__decorate([
  internalProperty2()
], MenuSurfaceBase.prototype, "styleBottom", void 0);
__decorate([
  internalProperty2()
], MenuSurfaceBase.prototype, "styleMaxHeight", void 0);
__decorate([
  internalProperty2()
], MenuSurfaceBase.prototype, "styleTransformOrigin", void 0);

// node_modules/@material/mwc-menu/mwc-menu-surface-css.js
var style13 = css2`.mdc-menu-surface{display:none;position:absolute;box-sizing:border-box;max-width:calc(100vw - 32px);max-width:var(--mdc-menu-max-width, calc(100vw - 32px));max-height:calc(100vh - 32px);max-height:var(--mdc-menu-max-height, calc(100vh - 32px));margin:0;padding:0;transform:scale(1);transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;z-index:8;transition:opacity .03s linear,transform .12s cubic-bezier(0, 0, 0.2, 1),height 250ms cubic-bezier(0, 0, 0.2, 1);box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12);background-color:#fff;background-color:var(--mdc-theme-surface, #fff);color:#000;color:var(--mdc-theme-on-surface, #000);border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);transform-origin-left:top left;transform-origin-right:top right}.mdc-menu-surface:focus{outline:none}.mdc-menu-surface--open{display:inline-block;transform:scale(1);opacity:1}.mdc-menu-surface--animating-open{display:inline-block;transform:scale(0.8);opacity:0}.mdc-menu-surface--animating-closed{display:inline-block;opacity:0;transition:opacity .075s linear}[dir=rtl] .mdc-menu-surface,.mdc-menu-surface[dir=rtl]{transform-origin-left:top right;transform-origin-right:top left}.mdc-menu-surface--anchor{position:relative;overflow:visible}.mdc-menu-surface--fixed{position:fixed}.mdc-menu-surface--fullwidth{width:100%}:host(:not([open])){display:none}.mdc-menu-surface{z-index:8;z-index:var(--mdc-menu-z-index, 8);min-width:112px;min-width:var(--mdc-menu-min-width, 112px)}`;

// node_modules/@material/mwc-menu/mwc-menu-surface.js
var MenuSurface = class MenuSurface2 extends MenuSurfaceBase {
};
MenuSurface.styles = style13;
MenuSurface = __decorate([
  customElement2("mwc-menu-surface")
], MenuSurface);

// node_modules/playground-elements/playground-connected-element.js
var PlaygroundConnectedElement = class extends LitElement {
  set project(elementOrId) {
    if (typeof elementOrId === "string") {
      requestAnimationFrame(() => {
        var _a4;
        const root = this.getRootNode();
        this._project = (_a4 = root.getElementById(elementOrId)) !== null && _a4 !== void 0 ? _a4 : void 0;
      });
    } else {
      this._project = elementOrId;
    }
  }
};
__decorate([
  property()
], PlaygroundConnectedElement.prototype, "project", null);
__decorate([
  internalProperty()
], PlaygroundConnectedElement.prototype, "_project", void 0);

// node_modules/playground-elements/playground-file-system-controls.js
var PlaygroundFileSystemControls = class PlaygroundFileSystemControls2 extends PlaygroundConnectedElement {
  constructor() {
    super(...arguments);
    this.state = "closed";
    this._postStateChangeRenderDone = false;
  }
  update(changedProperties) {
    if (changedProperties.has("state")) {
      this._postStateChangeRenderDone = false;
    }
    super.update(changedProperties);
  }
  render() {
    return html`<mwc-menu-surface
      fixed
      quick
      .open=${this.state !== "closed"}
      .anchor=${this.anchorElement}
      corner="BOTTOM_START"
      .classList=${this.state}
      @closed=${this._onSurfaceClosed}
      ><div class="wrapper">${this._surfaceContents}</div></mwc-menu-surface
    >`;
  }
  async updated() {
    if (this._postStateChangeRenderDone) {
      return;
    }
    if (this.state === "menu") {
      const menuList = this._menuList;
      if (menuList) {
        await menuList.updateComplete;
        menuList.focusItemAtIndex(0);
      }
    } else if (this.state === "rename" || this.state === "newfile") {
      const input = this._filenameInput;
      if (input) {
        await input.updateComplete;
        input.focus();
        if (this.state === "rename") {
          input.setSelectionRange(0, input.value.lastIndexOf("."));
        }
      }
    }
    this._postStateChangeRenderDone = true;
  }
  get _surfaceContents() {
    switch (this.state) {
      case "closed":
        return nothing;
      case "menu":
        return this._menu;
      case "rename":
        return this._rename;
      case "newfile":
        return this._newFile;
    }
  }
  get _menu() {
    return html`
      <mwc-list class="menu-list" @action=${this._onMenuAction}>
        <mwc-list-item graphic="icon">
          Rename
          <svg
            slot="graphic"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            fill="currentcolor"
          >
            <path
              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
            />
          </svg>
        </mwc-list-item>
        <mwc-list-item graphic="icon">
          Delete
          <svg
            slot="graphic"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentcolor"
          >
            <path
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
            />
          </svg>
        </mwc-list-item>
      </mwc-list>
    `;
  }
  get _rename() {
    return html`
      <mwc-textfield
        class="filename-input"
        label="Filename"
        .value=${this.filename || ""}
        @input=${this._onFilenameInputChange}
        @keydown=${this._onFilenameInputKeydown}
      ></mwc-textfield>
      <div class="actions">
        <mwc-button outlined @click=${this._onClickCancel}>Cancel</mwc-button>
        <mwc-button
          raised
          class="submit-button"
          .disabled=${!this._filenameInputValid}
          @click=${this._onSubmitRename}
          >Rename</mwc-button
        >
      </div>
    `;
  }
  get _newFile() {
    return html`
      <mwc-textfield
        class="filename-input"
        label="Filename"
        @input=${this._onFilenameInputChange}
        @keydown=${this._onFilenameInputKeydown}
      ></mwc-textfield>
      <div class="actions">
        <mwc-button outlined @click=${this._onClickCancel}>Cancel</mwc-button>
        <mwc-button
          raised
          class="submit-button"
          .disabled=${!this._filenameInputValid}
          @click=${this._onSubmitNewFile}
          >Create</mwc-button
        >
      </div>
    `;
  }
  _onSurfaceClosed() {
    this.state = "closed";
  }
  _onClickCancel() {
    this._surface.close();
  }
  _onMenuAction(event) {
    switch (event.detail.index) {
      case 0:
        return this._onMenuSelectRename();
      case 1:
        return this._onMenuSelectDelete();
    }
  }
  _onMenuSelectRename() {
    this.state = "rename";
  }
  _onMenuSelectDelete() {
    this._surface.close();
    if (this._project && this.filename) {
      this._project.deleteFile(this.filename);
    }
  }
  _onFilenameInputChange() {
    this.requestUpdate();
  }
  get _filenameInputValid() {
    return !!(this._project && this._filenameInput && this._project.isValidNewFilename(this._filenameInput.value));
  }
  _onFilenameInputKeydown(event) {
    var _a4;
    if (event.key === "Enter" && ((_a4 = this._submitButton) === null || _a4 === void 0 ? void 0 : _a4.disabled) === false) {
      event.preventDefault();
      this._submitButton.click();
    }
  }
  _onSubmitRename() {
    var _a4;
    this._surface.close();
    const oldFilename = this.filename;
    const newFilename = (_a4 = this._filenameInput) === null || _a4 === void 0 ? void 0 : _a4.value;
    if (this._project && oldFilename && newFilename) {
      this._project.renameFile(oldFilename, newFilename);
    }
  }
  _onSubmitNewFile() {
    var _a4;
    this._surface.close();
    const filename = (_a4 = this._filenameInput) === null || _a4 === void 0 ? void 0 : _a4.value;
    if (this._project && filename) {
      this._project.addFile(filename);
      this.dispatchEvent(new CustomEvent("newFile", {
        detail: { filename }
      }));
    }
  }
};
PlaygroundFileSystemControls.styles = css`
    mwc-menu-surface {
      --mdc-theme-primary: var(
        var(
          --playground-floating-controls-color,
          var(--playground-highlight-color, #6200ee)
        )
      );
    }

    mwc-menu-surface.menu {
      --mdc-typography-subtitle1-font-size: 13px;
      --mdc-list-item-graphic-margin: 14px;
    }

    mwc-list-item {
      min-width: 100px;
      height: 40px;
    }

    mwc-menu-surface.rename > .wrapper,
    mwc-menu-surface.newfile > .wrapper {
      padding: 18px;
    }

    .actions {
      margin-top: 18px;
      display: flex;
      justify-content: flex-end;
    }

    .actions > * {
      margin-left: 12px;
    }
  `;
__decorate([
  property({ attribute: false })
], PlaygroundFileSystemControls.prototype, "anchorElement", void 0);
__decorate([
  property()
], PlaygroundFileSystemControls.prototype, "state", void 0);
__decorate([
  property()
], PlaygroundFileSystemControls.prototype, "filename", void 0);
__decorate([
  query("mwc-menu-surface")
], PlaygroundFileSystemControls.prototype, "_surface", void 0);
__decorate([
  query(".menu-list")
], PlaygroundFileSystemControls.prototype, "_menuList", void 0);
__decorate([
  query(".filename-input")
], PlaygroundFileSystemControls.prototype, "_filenameInput", void 0);
__decorate([
  query(".submit-button")
], PlaygroundFileSystemControls.prototype, "_submitButton", void 0);
PlaygroundFileSystemControls = __decorate([
  customElement("playground-file-system-controls")
], PlaygroundFileSystemControls);

// node_modules/playground-elements/playground-tab-bar.js
var PlaygroundTabBar = class PlaygroundTabBar2 extends PlaygroundConnectedElement {
  constructor() {
    super(...arguments);
    this.editableFileSystem = false;
    this._activeFileName = "";
    this._activeFileIndex = 0;
    this._onProjectFilesChanged = () => {
      this._setNewActiveFile();
      this.requestUpdate();
    };
  }
  set editor(elementOrId) {
    if (typeof elementOrId === "string") {
      requestAnimationFrame(() => {
        var _a4;
        const root = this.getRootNode();
        this._editor = (_a4 = root.getElementById(elementOrId)) !== null && _a4 !== void 0 ? _a4 : void 0;
      });
    } else {
      this._editor = elementOrId;
    }
  }
  get _visibleFiles() {
    var _a4, _b2;
    return ((_b2 = (_a4 = this._project) === null || _a4 === void 0 ? void 0 : _a4.files) !== null && _b2 !== void 0 ? _b2 : []).filter(({ hidden }) => !hidden);
  }
  update(changedProperties) {
    if (changedProperties.has("_project")) {
      const oldProject = changedProperties.get("_project");
      if (oldProject) {
        oldProject.removeEventListener("filesChanged", this._onProjectFilesChanged);
      }
      if (this._project) {
        this._onProjectFilesChanged();
        this._project.addEventListener("filesChanged", this._onProjectFilesChanged);
      }
    }
    if (changedProperties.has("_activeFileName") && this._editor) {
      this._editor.filename = this._activeFileName;
      this._setNewActiveFile();
    }
    super.update(changedProperties);
  }
  render() {
    return html`
      <mwc-tab-bar activeIndex="1" @MDCTabBar:activated=${this._onTabActivated}>
        ${this._visibleFiles.map(({ name, label }, index) => html`<playground-tab
              .isFadingIndicator=${true}
              .index=${index}
              .label=${label || name}
              .showMenuButton=${this.editableFileSystem}
              @openMenu=${this._onOpenMenu}
            ></playground-tab>`)}
      </mwc-tab-bar>

      ${this.editableFileSystem ? html`
            <mwc-icon-button
              class="add-file-button"
              label="New file"
              @click=${this._onClickAddFile}
            >
              <!-- Source: https://material.io/resources/icons/?icon=add&style=baseline -->
              <svg fill="currentcolor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </mwc-icon-button>

            <playground-file-system-controls
              .project=${this._project}
              @newFile=${this._onNewFile}
            >
            </playground-file-system-controls>
          ` : nothing}
    `;
  }
  async updated() {
    if (!this._tabBar) {
      return;
    }
    await this._tabBar.updateComplete;
    this._tabBar.activeIndex = -1;
    this._tabBar.activeIndex = this._activeFileIndex;
  }
  _onTabActivated(event) {
    const index = event.detail.index;
    const name = this._visibleFiles[index].name;
    if (name !== this._activeFileName) {
      this._activeFileName = name;
      this._activeFileIndex = index;
    }
  }
  _onOpenMenu(event) {
    const controls = this._fileSystemControls;
    if (!controls) {
      return;
    }
    controls.state = "menu";
    controls.filename = this._visibleFiles[event.detail.index].name;
    controls.anchorElement = event.detail.anchor;
  }
  _onClickAddFile(event) {
    const controls = this._fileSystemControls;
    if (!controls) {
      return;
    }
    controls.state = "newfile";
    controls.anchorElement = event.target;
  }
  _onNewFile(event) {
    this._activeFileName = event.detail.filename;
  }
  _setNewActiveFile() {
    if (this._activeFileName) {
      const index = this._visibleFiles.findIndex((file) => file.name === this._activeFileName);
      if (index >= 0) {
        this._activeFileIndex = index;
        return;
      }
    }
    for (let i2 = this._activeFileIndex; i2 >= 0; i2--) {
      const file = this._visibleFiles[i2];
      if (file && !file.hidden) {
        this._activeFileName = file.name;
        return;
      }
    }
    this._activeFileIndex = 0;
    this._activeFileName = "";
  }
};
PlaygroundTabBar.styles = css`
    :host {
      display: flex;
      height: var(--playground-bar-height, 40px);
      background: var(--playground-tab-bar-background, #eaeaea);
      flex-direction: row;
      align-items: center;
      --mdc-theme-primary: var(--playground-highlight-color, #6200ee);
    }

    mwc-tab-bar {
      overflow: hidden;
      height: 100%;
      --mdc-tab-height: var(--playground-bar-height, 40px);
      --mdc-tab-text-label-color-default: var(
        --playground-tab-bar-foreground-color,
        #000
      );
      --mdc-typography-button-text-transform: none;
      --mdc-typography-button-font-weight: normal;
      --mdc-typography-button-font-size: var(
        --playground-tab-bar-font-size,
        0.85em
      );
      --mdc-typography-button-letter-spacing: normal;
    }

    mwc-icon-button {
      color: var(--playground-tab-bar-foreground-color);
    }

    .add-file-button {
      margin: 0 4px;
      opacity: 70%;
      --mdc-icon-button-size: 24px;
      --mdc-icon-size: 24px;
    }

    .add-file-button:hover {
      opacity: 100%;
    }
  `;
__decorate([
  property({ type: Boolean, attribute: "editable-file-system" })
], PlaygroundTabBar.prototype, "editableFileSystem", void 0);
__decorate([
  internalProperty()
], PlaygroundTabBar.prototype, "_activeFileName", void 0);
__decorate([
  internalProperty()
], PlaygroundTabBar.prototype, "_activeFileIndex", void 0);
__decorate([
  query("mwc-tab-bar")
], PlaygroundTabBar.prototype, "_tabBar", void 0);
__decorate([
  query("playground-file-system-controls")
], PlaygroundTabBar.prototype, "_fileSystemControls", void 0);
__decorate([
  internalProperty()
], PlaygroundTabBar.prototype, "_editor", void 0);
__decorate([
  property()
], PlaygroundTabBar.prototype, "editor", null);
PlaygroundTabBar = __decorate([
  customElement("playground-tab-bar")
], PlaygroundTabBar);
var PlaygroundTab = class PlaygroundTab2 extends Tab {
  constructor() {
    super(...arguments);
    this.showMenuButton = false;
    this.index = 0;
  }
  render() {
    return html`${super.render()}
    ${this.showMenuButton ? this._menuButton : nothing} `;
  }
  get _menuButton() {
    return html`<mwc-icon-button
      label="File menu"
      class="menu-button"
      @click=${this._onClickMenuButton}
    >
      <!-- Source: https://material.io/resources/icons/?icon=menu&style=baseline -->
      <svg viewBox="0 0 24 24" fill="currentcolor">
        <path
          d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        />
      </svg>
    </mwc-icon-button>`;
  }
  _onClickMenuButton(event) {
    this.dispatchEvent(new CustomEvent("openMenu", {
      composed: true,
      detail: {
        index: this.index,
        anchor: event.target
      }
    }));
  }
};
PlaygroundTab.styles = [
  style3,
  css`
      :host {
        /* Vertically center the menu button. */
        display: flex;
        align-items: center;
      }

      .menu-button {
        /* Shift the menu button to be inside the tab itself. */
        margin-left: -24px;
        z-index: 1;
        opacity: 0;
        --mdc-icon-button-size: 24px;
        --mdc-icon-size: 16px;
      }

      :host(:hover) .menu-button,
      :host(:focus) .menu-button {
        /* Note we use opacity instead of visibility so that keyboard focus
           works. */
        opacity: 100%;
      }

      mwc-icon-button {
        color: var(--playground-tab-bar-foreground-color);
      }

      .mdc-tab--active .mdc-tab__text-label {
        color: var(
          --playground-tab-bar-active-color,
          var(--playground-highlight-color, #6200ee)
        ) !important;
      }

      .mdc-tab--active {
        background: var(--playground-tab-bar-active-background, transparent);
      }

      mwc-tab-indicator {
        --mdc-theme-primary: var(
          --playground-tab-bar-indicator-color,
          var(--playground-highlight-color, #6200ee)
        );
      }
    `
];
__decorate([
  property({ type: Boolean, reflect: true })
], PlaygroundTab.prototype, "showMenuButton", void 0);
PlaygroundTab = __decorate([
  customElement("playground-tab")
], PlaygroundTab);

// node_modules/playground-elements/playground-file-editor.js
var PlaygroundFileEditor = class PlaygroundFileEditor2 extends PlaygroundConnectedElement {
  constructor() {
    super(...arguments);
    this.lineNumbers = false;
    this.pragmas = "on";
    this.readonly = false;
    this._onProjectFilesChanged = () => {
      var _a4, _b2;
      (_a4 = this.filename) !== null && _a4 !== void 0 ? _a4 : this.filename = (_b2 = this._files[0]) === null || _b2 === void 0 ? void 0 : _b2.name;
      this.requestUpdate();
    };
    this._onCompileDone = () => {
      this.requestUpdate();
    };
    this._onDiagnosticsChanged = () => {
      this.requestUpdate();
    };
  }
  get _files() {
    var _a4, _b2;
    return (_b2 = (_a4 = this._project) === null || _a4 === void 0 ? void 0 : _a4.files) !== null && _b2 !== void 0 ? _b2 : [];
  }
  get _currentFile() {
    return this.filename ? this._files.find((file) => file.name === this.filename) : void 0;
  }
  async update(changedProperties) {
    if (changedProperties.has("_project")) {
      const oldProject = changedProperties.get("_project");
      if (oldProject) {
        oldProject.removeEventListener("filesChanged", this._onProjectFilesChanged);
        oldProject.removeEventListener("compileDone", this._onCompileDone);
        oldProject.removeEventListener("diagnosticsChanged", this._onDiagnosticsChanged);
      }
      if (this._project) {
        this._project.addEventListener("filesChanged", this._onProjectFilesChanged);
        this._project.addEventListener("compileDone", this._onCompileDone);
        this._project.addEventListener("diagnosticsChanged", this._onDiagnosticsChanged);
      }
      this._onProjectFilesChanged();
    }
    super.update(changedProperties);
  }
  render() {
    var _a4, _b2, _c, _d, _e, _f;
    return html`
      ${this._files ? html`
            <playground-code-editor
              exportparts="diagnostic-tooltip, dialog"
              .value=${live((_b2 = (_a4 = this._currentFile) === null || _a4 === void 0 ? void 0 : _a4.content) !== null && _b2 !== void 0 ? _b2 : "")}
              .type=${this._currentFile ? mimeTypeToTypeEnum(this._currentFile.contentType) : void 0}
              .lineNumbers=${this.lineNumbers}
              .readonly=${this.readonly || !this._currentFile}
              .pragmas=${this.pragmas}
              .diagnostics=${(_d = (_c = this._project) === null || _c === void 0 ? void 0 : _c.diagnostics) === null || _d === void 0 ? void 0 : _d.get((_f = (_e = this._currentFile) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : "")}
              @change=${this._onEdit}
            >
            </playground-code-editor>
          ` : html`<slot></slot>`}
    `;
  }
  _onEdit() {
    var _a4;
    const value = this._editor.value;
    if (this._currentFile) {
      this._currentFile.content = value;
      (_a4 = this._project) === null || _a4 === void 0 ? void 0 : _a4.saveDebounced();
    }
  }
};
PlaygroundFileEditor.styles = css`
    :host {
      display: block;
      /* Prevents scrollbars from changing container size and shifting layout
      slightly. */
      box-sizing: border-box;
      height: 350px;
    }

    slot {
      height: 100%;
      display: block;
      background: var(--playground-code-background, unset);
    }

    playground-code-editor {
      height: 100%;
      border-radius: inherit;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  `;
__decorate([
  query("playground-code-editor")
], PlaygroundFileEditor.prototype, "_editor", void 0);
__decorate([
  property()
], PlaygroundFileEditor.prototype, "filename", void 0);
__decorate([
  property({ type: Boolean, attribute: "line-numbers" })
], PlaygroundFileEditor.prototype, "lineNumbers", void 0);
__decorate([
  property()
], PlaygroundFileEditor.prototype, "pragmas", void 0);
__decorate([
  property({ type: Boolean, reflect: true })
], PlaygroundFileEditor.prototype, "readonly", void 0);
PlaygroundFileEditor = __decorate([
  customElement("playground-file-editor")
], PlaygroundFileEditor);
var mimeTypeToTypeEnum = (mimeType) => {
  if (mimeType === void 0) {
    return;
  }
  const encodingSepIndex = mimeType.indexOf(";");
  if (encodingSepIndex !== -1) {
    mimeType = mimeType.substring(0, encodingSepIndex);
  }
  switch (mimeType) {
    case "video/mp2t":
      return "ts";
    case "text/javascript":
    case "application/javascript":
      return "js";
    case "application/json":
      return "json";
    case "text/html":
      return "html";
    case "text/css":
      return "css";
  }
  return void 0;
};

// node_modules/@material/mwc-linear-progress/mwc-linear-progress-base.js
var LinearProgressBase = class extends LitElement2 {
  constructor() {
    super(...arguments);
    this.indeterminate = false;
    this.progress = 0;
    this.buffer = 1;
    this.reverse = false;
    this.closed = false;
    this.stylePrimaryHalf = "";
    this.stylePrimaryFull = "";
    this.styleSecondaryQuarter = "";
    this.styleSecondaryHalf = "";
    this.styleSecondaryFull = "";
    this.animationReady = true;
    this.closedAnimationOff = false;
    this.resizeObserver = null;
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.rootEl) {
      this.attachResizeObserver();
    }
  }
  render() {
    const classes = {
      "mdc-linear-progress--closed": this.closed,
      "mdc-linear-progress--closed-animation-off": this.closedAnimationOff,
      "mdc-linear-progress--indeterminate": this.indeterminate,
      "mdc-linear-progress--animation-ready": this.animationReady
    };
    const rootStyles = {
      "--mdc-linear-progress-primary-half": this.stylePrimaryHalf,
      "--mdc-linear-progress-primary-half-neg": this.stylePrimaryHalf !== "" ? `-${this.stylePrimaryHalf}` : "",
      "--mdc-linear-progress-primary-full": this.stylePrimaryFull,
      "--mdc-linear-progress-primary-full-neg": this.stylePrimaryFull !== "" ? `-${this.stylePrimaryFull}` : "",
      "--mdc-linear-progress-secondary-quarter": this.styleSecondaryQuarter,
      "--mdc-linear-progress-secondary-quarter-neg": this.styleSecondaryQuarter !== "" ? `-${this.styleSecondaryQuarter}` : "",
      "--mdc-linear-progress-secondary-half": this.styleSecondaryHalf,
      "--mdc-linear-progress-secondary-half-neg": this.styleSecondaryHalf !== "" ? `-${this.styleSecondaryHalf}` : "",
      "--mdc-linear-progress-secondary-full": this.styleSecondaryFull,
      "--mdc-linear-progress-secondary-full-neg": this.styleSecondaryFull !== "" ? `-${this.styleSecondaryFull}` : ""
    };
    const bufferBarStyles = {
      "flex-basis": this.indeterminate ? "100%" : `${this.buffer * 100}%`
    };
    const primaryBarStyles = {
      transform: this.indeterminate ? "scaleX(1)" : `scaleX(${this.progress})`
    };
    return html`
      <div
          role="progressbar"
          class="mdc-linear-progress ${classMap(classes)}"
          style="${styleMap(rootStyles)}"
          dir="${ifDefined(this.reverse ? "rtl" : void 0)}"
          aria-label="${ifDefined(this.ariaLabel)}"
          aria-valuemin="0"
          aria-valuemax="1"
          aria-valuenow="${ifDefined(this.indeterminate ? void 0 : this.progress)}"
        @transitionend="${this.syncClosedState}">
        <div class="mdc-linear-progress__buffer">
          <div
            class="mdc-linear-progress__buffer-bar"
            style=${styleMap(bufferBarStyles)}>
          </div>
          <div class="mdc-linear-progress__buffer-dots"></div>
        </div>
        <div
            class="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
            style=${styleMap(primaryBarStyles)}>
          <span class="mdc-linear-progress__bar-inner"></span>
        </div>
        <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
          <span class="mdc-linear-progress__bar-inner"></span>
        </div>
      </div>`;
  }
  update(changedProperties) {
    if (changedProperties.has("closed") && (!this.closed || changedProperties.get("closed") === void 0)) {
      this.syncClosedState();
    }
    super.update(changedProperties);
  }
  async firstUpdated(changed) {
    super.firstUpdated(changed);
    this.attachResizeObserver();
  }
  syncClosedState() {
    this.closedAnimationOff = this.closed;
  }
  updated(changed) {
    if (!changed.has("indeterminate") && changed.has("reverse") && this.indeterminate) {
      this.restartAnimation();
    }
    if (changed.has("indeterminate") && changed.get("indeterminate") !== void 0 && this.indeterminate && window.ResizeObserver) {
      this.calculateAndSetAnimationDimensions(this.rootEl.offsetWidth);
    }
    super.updated(changed);
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    super.disconnectedCallback();
  }
  attachResizeObserver() {
    if (window.ResizeObserver) {
      this.resizeObserver = new window.ResizeObserver((entries) => {
        if (!this.indeterminate) {
          return;
        }
        for (const entry of entries) {
          if (entry.contentRect) {
            const width = entry.contentRect.width;
            this.calculateAndSetAnimationDimensions(width);
          }
        }
      });
      this.resizeObserver.observe(this.rootEl);
      return;
    }
    this.resizeObserver = null;
  }
  calculateAndSetAnimationDimensions(width) {
    const primaryHalf = width * 0.8367142;
    const primaryFull = width * 2.00611057;
    const secondaryQuarter = width * 0.37651913;
    const secondaryHalf = width * 0.84386165;
    const secondaryFull = width * 1.60277782;
    this.stylePrimaryHalf = `${primaryHalf}px`;
    this.stylePrimaryFull = `${primaryFull}px`;
    this.styleSecondaryQuarter = `${secondaryQuarter}px`;
    this.styleSecondaryHalf = `${secondaryHalf}px`;
    this.styleSecondaryFull = `${secondaryFull}px`;
    this.restartAnimation();
  }
  async restartAnimation() {
    this.animationReady = false;
    await this.updateComplete;
    await new Promise(requestAnimationFrame);
    this.animationReady = true;
    await this.updateComplete;
  }
  open() {
    this.closed = false;
  }
  close() {
    this.closed = true;
  }
};
__decorate([
  query2(".mdc-linear-progress")
], LinearProgressBase.prototype, "rootEl", void 0);
__decorate([
  property2({ type: Boolean, reflect: true })
], LinearProgressBase.prototype, "indeterminate", void 0);
__decorate([
  property2({ type: Number })
], LinearProgressBase.prototype, "progress", void 0);
__decorate([
  property2({ type: Number })
], LinearProgressBase.prototype, "buffer", void 0);
__decorate([
  property2({ type: Boolean, reflect: true })
], LinearProgressBase.prototype, "reverse", void 0);
__decorate([
  property2({ type: Boolean, reflect: true })
], LinearProgressBase.prototype, "closed", void 0);
__decorate([
  ariaProperty,
  property2({ attribute: "aria-label" })
], LinearProgressBase.prototype, "ariaLabel", void 0);
__decorate([
  internalProperty2()
], LinearProgressBase.prototype, "stylePrimaryHalf", void 0);
__decorate([
  internalProperty2()
], LinearProgressBase.prototype, "stylePrimaryFull", void 0);
__decorate([
  internalProperty2()
], LinearProgressBase.prototype, "styleSecondaryQuarter", void 0);
__decorate([
  internalProperty2()
], LinearProgressBase.prototype, "styleSecondaryHalf", void 0);
__decorate([
  internalProperty2()
], LinearProgressBase.prototype, "styleSecondaryFull", void 0);
__decorate([
  internalProperty2()
], LinearProgressBase.prototype, "animationReady", void 0);
__decorate([
  internalProperty2()
], LinearProgressBase.prototype, "closedAnimationOff", void 0);

// node_modules/@material/mwc-linear-progress/mwc-linear-progress-css.js
var style14 = css2`@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%);transform:translateX(var(--mdc-linear-progress-primary-half, 83.67142%))}100%{transform:translateX(200.611057%);transform:translateX(var(--mdc-linear-progress-primary-full, 200.611057%))}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%);transform:translateX(var(--mdc-linear-progress-secondary-quarter, 37.651913%))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%);transform:translateX(var(--mdc-linear-progress-secondary-half, 84.386165%))}100%{transform:translateX(160.277782%);transform:translateX(var(--mdc-linear-progress-secondary-full, 160.277782%))}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(-10px)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%);transform:translateX(var(--mdc-linear-progress-primary-half-neg, -83.67142%))}100%{transform:translateX(-200.611057%);transform:translateX(var(--mdc-linear-progress-primary-full-neg, -200.611057%))}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%);transform:translateX(var(--mdc-linear-progress-secondary-quarter-neg, -37.651913%))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%);transform:translateX(var(--mdc-linear-progress-secondary-half-neg, -84.386165%))}100%{transform:translateX(-160.277782%);transform:translateX(var(--mdc-linear-progress-secondary-full-neg, -160.277782%))}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}.mdc-linear-progress{position:relative;width:100%;height:4px;transform:translateZ(0);outline:1px solid transparent;overflow:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__bar{position:absolute;width:100%;height:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top:4px solid}.mdc-linear-progress__buffer{display:flex;position:absolute;width:100%;height:100%}.mdc-linear-progress__buffer-dots{background-repeat:repeat-x;background-size:10px 4px;flex:auto;transform:rotate(180deg);animation:mdc-linear-progress-buffering 250ms infinite linear}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress__secondary-bar{visibility:hidden}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;visibility:visible}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale 2s infinite linear}[dir=rtl] .mdc-linear-progress:not([dir=ltr]) .mdc-linear-progress__bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]) .mdc-linear-progress__bar{right:0;-webkit-transform-origin:center right;transform-origin:center right}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress:not([dir=ltr]) .mdc-linear-progress__buffer-dots,.mdc-linear-progress[dir=rtl]:not([dir=ltr]) .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse 250ms infinite linear;transform:rotate(0)}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}.mdc-linear-progress--closed{opacity:0}.mdc-linear-progress--closed-animation-off .mdc-linear-progress__buffer-dots{animation:none}.mdc-linear-progress--closed-animation-off.mdc-linear-progress--indeterminate .mdc-linear-progress__bar,.mdc-linear-progress--closed-animation-off.mdc-linear-progress--indeterminate .mdc-linear-progress__bar .mdc-linear-progress__bar-inner{animation:none}.mdc-linear-progress__bar-inner{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-linear-progress__buffer-dots{background-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E")}.mdc-linear-progress__buffer-bar{background-color:#e6e6e6}:host{display:block}.mdc-linear-progress__buffer-bar{background-color:#e6e6e6;background-color:var(--mdc-linear-progress-buffer-color, #e6e6e6)}.mdc-linear-progress__buffer-dots{background-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E");background-image:var(--mdc-linear-progress-buffering-dots-image, url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E"))}`;

// node_modules/@material/mwc-linear-progress/mwc-linear-progress.js
var LinearProgress = class LinearProgress2 extends LinearProgressBase {
};
LinearProgress.styles = style14;
LinearProgress = __decorate([
  customElement2("mwc-linear-progress")
], LinearProgress);

// node_modules/playground-elements/playground-preview.js
var PlaygroundPreview = class PlaygroundPreview2 extends PlaygroundConnectedElement {
  constructor() {
    super(...arguments);
    this.location = "Result";
    this._loading = true;
    this._showLoadingBar = false;
    this._loadedAtLeastOnce = false;
    this.reload = () => {
      if (!this._iframe) {
        return;
      }
      this._iframe.src = "";
      this._iframe.src = this._indexUrl;
      this._loading = true;
      this._showLoadingBar = true;
    };
  }
  update(changedProperties) {
    if (changedProperties.has("_project")) {
      const oldProject = changedProperties.get("_project");
      if (oldProject) {
        oldProject.removeEventListener("urlChanged", this.reload);
        oldProject.removeEventListener("compileStart", this.reload);
      }
      if (this._project) {
        this._project.addEventListener("urlChanged", this.reload);
        this._project.addEventListener("compileStart", this.reload);
      }
    }
    super.update(changedProperties);
  }
  get _indexUrl() {
    var _a4;
    const base = (_a4 = this._project) === null || _a4 === void 0 ? void 0 : _a4.baseUrl;
    if (!base) {
      return "";
    }
    const url = new URL("index.html", base);
    return url.toString();
  }
  render() {
    return html`
      <div id="toolbar" part="preview-toolbar">
        <span id="location" part="preview-location"> ${this.location}</span>
        <mwc-icon-button
          id="reload-button"
          label="Reload preview"
          part="preview-reload-button"
          ?disabled=${!this._indexUrl}
          @click=${this.reload}
        >
          <!-- Source: https://material.io/resources/icons/?icon=refresh&style=baseline -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentcolor"
            width="18px"
            height="18px"
          >
            <path
              d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
            />
          </svg>
        </mwc-icon-button>
      </div>

      <div id="content">
        <mwc-linear-progress
          aria-hidden=${this._loading ? "false" : "true"}
          part="preview-loading-indicator"
          indeterminate
          ?closed=${!this._showLoadingBar}
        ></mwc-linear-progress>

        ${this._loadedAtLeastOnce ? nothing : html`<slot></slot>`}

        <iframe
          title="Project preview"
          @load=${this._onIframeLoad}
          ?hidden=${!this._loadedAtLeastOnce}
        ></iframe>
      </div>
    `;
  }
  updated() {
    var _a4;
    if (((_a4 = this._iframe) === null || _a4 === void 0 ? void 0 : _a4.src) !== this._indexUrl) {
      this._iframe.src = this._indexUrl;
    }
  }
  async firstUpdated() {
    var _a4, _b2;
    if (this._loading && !this._slotHasAnyVisibleChildren()) {
      this._showLoadingBar = true;
    }
    const progress = this.shadowRoot.querySelector("mwc-linear-progress");
    await progress.updateComplete;
    (_b2 = (_a4 = progress.shadowRoot) === null || _a4 === void 0 ? void 0 : _a4.querySelector("[role=progressbar]")) === null || _b2 === void 0 ? void 0 : _b2.setAttribute("aria-label", "Preview is loading");
  }
  _slotHasAnyVisibleChildren() {
    var _a4;
    const assigned = (_a4 = this._slot) === null || _a4 === void 0 ? void 0 : _a4.assignedNodes({ flatten: true });
    if (!assigned) {
      return false;
    }
    for (const node of assigned) {
      if (node.nodeType === Node.COMMENT_NODE) {
        continue;
      }
      if (node.nodeType === Node.TEXT_NODE && (node.textContent || "").trim() === "") {
        continue;
      }
      return true;
    }
    return false;
  }
  _onIframeLoad() {
    if (this._indexUrl) {
      this._loading = false;
      this._loadedAtLeastOnce = true;
      this._showLoadingBar = false;
    }
  }
};
PlaygroundPreview.styles = css`
    :host {
      display: flex;
      flex-direction: column;
      background: white;
      font-family: sans-serif;
      height: 350px;
    }

    #toolbar {
      flex: 0 0 var(--playground-bar-height, 40px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: var(--playground-border, solid 1px #ddd);
      font-size: 15px;
      color: var(--playground-preview-toolbar-foreground-color, #444);
      border-radius: inherit;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      background: var(--playground-preview-toolbar-background, white);
    }

    #location {
      margin: 0 10px;
    }

    #reload-button {
      --mdc-icon-button-size: 30px;
      --mdc-icon-size: 18px;
    }

    #content {
      max-height: 100%;
      position: relative;
      flex: 1;
    }

    mwc-linear-progress {
      /* There is no way to directly specify the height of a linear progress
      bar, but zooming works well enough. It's 4px by default, and we want it to
      be 2px to match the tab bar indicator.*/
      zoom: 0.5;
      --mdc-linear-progress-buffer-color: transparent;
      position: absolute;
      top: -6px;
      width: 100%;
      --mdc-theme-primary: var(--playground-highlight-color, #6200ee);
    }

    iframe,
    slot {
      width: 100%;
      height: 100%;
    }

    iframe {
      border: none;
    }

    [hidden] {
      display: none;
    }
  `;
__decorate([
  property()
], PlaygroundPreview.prototype, "location", void 0);
__decorate([
  query("iframe")
], PlaygroundPreview.prototype, "_iframe", void 0);
__decorate([
  query("slot")
], PlaygroundPreview.prototype, "_slot", void 0);
__decorate([
  internalProperty()
], PlaygroundPreview.prototype, "_loading", void 0);
__decorate([
  internalProperty()
], PlaygroundPreview.prototype, "_showLoadingBar", void 0);
__decorate([
  internalProperty()
], PlaygroundPreview.prototype, "_loadedAtLeastOnce", void 0);
PlaygroundPreview = __decorate([
  customElement("playground-preview")
], PlaygroundPreview);

// node_modules/playground-elements/playground-ide.js
var PlaygroundIde = class PlaygroundIde2 extends LitElement {
  constructor() {
    super(...arguments);
    this.sandboxBaseUrl = `https://unpkg.com/playground-elements@${version}/`;
    this.sandboxScope = "playground-projects/";
    this.editableFileSystem = false;
    this.lineNumbers = false;
    this.resizable = false;
    this.pragmas = "on";
  }
  get projectSrc() {
    var _a4, _b2;
    return (_b2 = (_a4 = this._project) === null || _a4 === void 0 ? void 0 : _a4.projectSrc) !== null && _b2 !== void 0 ? _b2 : this._projectSrcSetBeforeRender;
  }
  set projectSrc(src) {
    const project = this._project;
    if (project) {
      project.projectSrc = src;
    } else {
      this._projectSrcSetBeforeRender = src;
    }
  }
  get config() {
    var _a4, _b2;
    return (_b2 = (_a4 = this._project) === null || _a4 === void 0 ? void 0 : _a4.config) !== null && _b2 !== void 0 ? _b2 : this._configSetBeforeRender;
  }
  set config(config) {
    const project = this._project;
    if (project) {
      project.config = config;
    } else {
      this._configSetBeforeRender = config;
    }
  }
  render() {
    const projectId = "project";
    const editorId = "editor";
    return html`
      <playground-project
        id=${projectId}
        .sandboxBaseUrl=${this.sandboxBaseUrl}
        .sandboxScope=${this.sandboxScope}
      >
        <slot></slot>
      </playground-project>

      <div id="lhs">
        <playground-tab-bar
          part="tab-bar"
          .project=${projectId}
          .editor=${editorId}
          .editableFileSystem=${this.editableFileSystem}
        >
        </playground-tab-bar>

        <playground-file-editor
          id=${editorId}
          part="editor"
          .lineNumbers=${this.lineNumbers}
          .project=${projectId}
          .pragmas=${this.pragmas}
        >
        </playground-file-editor>
      </div>

      <div id="rhs">
        ${this.resizable ? html`<div
              id="resizeBar"
              @pointerdown=${this._onResizeBarPointerdown}
            ></div>` : nothing}

        <playground-preview
          part="preview"
          exportparts="preview-toolbar,
                       preview-location,
                       preview-reload-button,
                       preview-loading-indicator,
                       diagnostic-tooltip,
                       dialog"
          .project=${projectId}
        ></playground-preview>
      </div>
    `;
  }
  firstUpdated() {
    if (this._configSetBeforeRender) {
      this._project.config = this._configSetBeforeRender;
      this._configSetBeforeRender = void 0;
    }
    if (this._projectSrcSetBeforeRender) {
      this._project.projectSrc = this._projectSrcSetBeforeRender;
      this._projectSrcSetBeforeRender = void 0;
    }
  }
  async update(changedProperties) {
    var _a4;
    if (changedProperties.has("resizable") && this.resizable === false) {
      (_a4 = this._rhs) === null || _a4 === void 0 ? void 0 : _a4.style.removeProperty("--playground-preview-width");
    }
    super.update(changedProperties);
  }
  _onResizeBarPointerdown({ pointerId }) {
    const bar = this._resizeBar;
    bar.setPointerCapture(pointerId);
    const rhsStyle = this._rhs.style;
    const { left: hostLeft, right: hostRight } = this.getBoundingClientRect();
    const hostWidth = hostRight - hostLeft;
    const rhsMinWidth = 100;
    const rhsMaxWidth = hostWidth - 100;
    const onPointermove = (event) => {
      const rhsWidth = Math.min(rhsMaxWidth, Math.max(rhsMinWidth, hostRight - event.clientX));
      const percent = rhsWidth / hostWidth * 100;
      rhsStyle.setProperty("--playground-preview-width", `${percent}%`);
    };
    bar.addEventListener("pointermove", onPointermove);
    const onPointerup = () => {
      bar.releasePointerCapture(pointerId);
      bar.removeEventListener("pointermove", onPointermove);
      bar.removeEventListener("pointerup", onPointerup);
    };
    bar.addEventListener("pointerup", onPointerup);
  }
};
PlaygroundIde.styles = css`
    :host {
      display: flex;
      height: 350px;
      min-width: 200px;
      border: var(--playground-border, solid 1px #ddd);
      /* The invisible resize bar has a high z-index so that it's above
      CodeMirror. But we don't want it also above other elements on the page.
      Force a new stacking context. */
      isolation: isolate;
    }

    #lhs {
      display: flex;
      flex-direction: column;
      height: 100%;
      flex: 1;
      min-width: 100px;
      overflow: hidden;
      border-radius: inherit;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: var(--playground-border, solid 1px #ddd);
    }

    playground-tab-bar {
      flex-shrink: 0;
    }

    playground-file-editor {
      flex: 1;
      height: calc(100% - var(--playground-bar-height, 40px));
    }

    #rhs {
      height: 100%;
      width: max(100px, var(--playground-preview-width, 30%));
      position: relative;
      border-radius: inherit;
    }

    playground-preview {
      height: 100%;
      width: 100%;
      border-radius: inherit;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    slot {
      display: none;
    }

    #resizeBar {
      position: absolute;
      top: 0;
      left: -5px;
      width: 10px;
      height: 100%;
      z-index: 9;
      cursor: col-resize;
    }

    #resizeOverlay {
      display: none;
    }
    #resizeOverlay.resizing {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 99999;
      cursor: col-resize;
    }
  `;
__decorate([
  property({ attribute: "project-src", hasChanged: () => false })
], PlaygroundIde.prototype, "projectSrc", null);
__decorate([
  property({ attribute: false, hasChanged: () => false })
], PlaygroundIde.prototype, "config", null);
__decorate([
  property({ attribute: "sandbox-base-url" })
], PlaygroundIde.prototype, "sandboxBaseUrl", void 0);
__decorate([
  property({ attribute: "sandbox-scope" })
], PlaygroundIde.prototype, "sandboxScope", void 0);
__decorate([
  property({ type: Boolean, attribute: "editable-file-system" })
], PlaygroundIde.prototype, "editableFileSystem", void 0);
__decorate([
  property({ type: Boolean, attribute: "line-numbers" })
], PlaygroundIde.prototype, "lineNumbers", void 0);
__decorate([
  property({ type: Boolean })
], PlaygroundIde.prototype, "resizable", void 0);
__decorate([
  property()
], PlaygroundIde.prototype, "pragmas", void 0);
__decorate([
  query("playground-project")
], PlaygroundIde.prototype, "_project", void 0);
__decorate([
  query("#resizeBar")
], PlaygroundIde.prototype, "_resizeBar", void 0);
__decorate([
  query("#rhs")
], PlaygroundIde.prototype, "_rhs", void 0);
PlaygroundIde = __decorate([
  customElement("playground-ide")
], PlaygroundIde);
/* @license CodeMirror, copyright (c) by Marijn Haverbeke and others
Distributed under an MIT license: https://codemirror.net/LICENSE */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 @license
 Copyright 2020 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/**
@license
Copyright 2019 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/**
@license
Copyright 2020 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/**
@license
Copyright 2021 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
//# sourceMappingURL=playground.js.map
