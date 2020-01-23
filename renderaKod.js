// **************************************************************
// Kodat av Gustav Walter
// Beskrivning: 
// Renderar formaterad kod med färger
// **************************************************************
var appl = {
    elBtnKor: null,
    elTextarea: null,
    elSelectBoxLanguage: null,
    // **************************************************************
    // Körs efter sidan laddats
    // **************************************************************
    init: function() {

        //Hämtar element som applikationen arbetar med
        appl.elBtnKor = document.getElementById("btnKor");
        appl.elTextarea = document.getElementById("txtInput");
        appl.elSelectBoxLanguage = document.getElementById("dropDown");

        // Event-hanterar mina element
        appl.elBtnKor.addEventListener("click", appl.displayOutput);
        appl.elTextarea.addEventListener("keydown", appl.displayOutput);
        appl.elSelectBoxLanguage.addEventListener("change", appl.displayOutput);
        // appl.elBtnKor.addEventListener("click", appl.displayOutput);
    },
    // **************************************************************
    // Returnerar färg-css class för valt språk
    // **************************************************************
    getCssForLanguage: function() {
        var selected = document.getElementById("dropDown").value;

        if (selected == "HTML") {
            return "language-html";
        } else if (selected == "Java") {
            return "language-java";

        } else if (selected == "C#") {
            return "language-c#";

        } else if (selected == "CSS") {
            return "language-css";

        } else if (selected == "JavaScript") {
            return "language-js";
        } else {
            alert("Unknown selection: " + selected);
        }
    },
    // **************************************************************
    // Klippt och klistrat från prism.js med viss modifikation
    // **************************************************************
    displayOutput: function() {
        //Prism.js -- tagen kod för färg-output.
        var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
            Prism = function(u) {
                var c = /\blang(?:uage)?-([\w-]+)\b/i,
                    n = 0,
                    C = {
                        manual: u.Prism && u.Prism.manual,
                        disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
                        util: {
                            encode: function(e) {
                                return e instanceof _ ? new _(e.type, C.util.encode(e.content), e.alias) : Array.isArray(e) ? e.map(C.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                            },
                            type: function(e) {
                                return Object.prototype.toString.call(e).slice(8, -1)
                            },
                            objId: function(e) {
                                return e.__id || Object.defineProperty(e, "__id", {
                                    value: ++n
                                }), e.__id
                            },
                            clone: function r(e, t) {
                                var a, n, i = C.util.type(e);
                                switch (t = t || {}, i) {
                                    case "Object":
                                        if (n = C.util.objId(e), t[n]) return t[n];
                                        for (var o in a = {}, t[n] = a, e) e.hasOwnProperty(o) && (a[o] = r(e[o], t));
                                        return a;
                                    case "Array":
                                        return n = C.util.objId(e), t[n] ? t[n] : (a = [], t[n] = a, e.forEach(function(e, n) {
                                            a[n] = r(e, t)
                                        }), a);
                                    default:
                                        return e
                                }
                            },
                            getLanguage: function(e) {
                                for (; e && !c.test(e.className);) e = e.parentElement;
                                return e ? (e.className.match(c) || [, "none"])[1].toLowerCase() : "none"
                            },
                            currentScript: function() {
                                if ("undefined" == typeof document) return null;
                                if ("currentScript" in document) return document.currentScript;
                                try {
                                    throw new Error
                                } catch (e) {
                                    var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
                                    if (n) {
                                        var r = document.getElementsByTagName("script");
                                        for (var t in r)
                                            if (r[t].src == n) return r[t]
                                    }
                                    return null
                                }
                            }
                        },
                        languages: {
                            extend: function(e, n) {
                                var r = C.util.clone(C.languages[e]);
                                for (var t in n) r[t] = n[t];
                                return r
                            },
                            insertBefore: function(r, e, n, t) {
                                var a = (t = t || C.languages)[r],
                                    i = {};
                                for (var o in a)
                                    if (a.hasOwnProperty(o)) {
                                        if (o == e)
                                            for (var l in n) n.hasOwnProperty(l) && (i[l] = n[l]);
                                        n.hasOwnProperty(o) || (i[o] = a[o])
                                    } var s = t[r];
                                return t[r] = i, C.languages.DFS(C.languages, function(e, n) {
                                    n === s && e != r && (this[e] = i)
                                }), i
                            },
                            DFS: function e(n, r, t, a) {
                                a = a || {};
                                var i = C.util.objId;
                                for (var o in n)
                                    if (n.hasOwnProperty(o)) {
                                        r.call(n, o, n[o], t || o);
                                        var l = n[o],
                                            s = C.util.type(l);
                                        "Object" !== s || a[i(l)] ? "Array" !== s || a[i(l)] || (a[i(l)] = !0, e(l, r, o, a)) : (a[i(l)] = !0, e(l, r, null, a))
                                    }
                            }
                        },
                        plugins: {},
                        highlightAll: function(e, n) {
                            C.highlightAllUnder(document, e, n)
                        },
                        highlightAllUnder: function(e, n, r) {
                            var t = {
                                callback: r,
                                container: e,
                                selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                            };
                            C.hooks.run("before-highlightall", t), t.elements = Array.prototype.slice.apply(t.container.querySelectorAll(t.selector)), C.hooks.run("before-all-elements-highlight", t);
                            for (var a, i = 0; a = t.elements[i++];) C.highlightElement(a, !0 === n, t.callback)
                        },
                        highlightElement: function(e, n, r) {
                            var t = C.util.getLanguage(e),
                                a = C.languages[t];
                            e.className = e.className.replace(c, "").replace(/\s+/g, " ") + " language-" + t;
                            var i = e.parentNode;
                            i && "pre" === i.nodeName.toLowerCase() && (i.className = i.className.replace(c, "").replace(/\s+/g, " ") + " language-" + t);
                            var o = {
                                element: e,
                                language: t,
                                grammar: a,
                                code: e.textContent
                            };

                            function l(e) {
                                o.highlightedCode = e, C.hooks.run("before-insert", o), o.element.innerHTML = o.highlightedCode, C.hooks.run("after-highlight", o), C.hooks.run("complete", o), r && r.call(o.element)
                            }
                            if (C.hooks.run("before-sanity-check", o), !o.code) return C.hooks.run("complete", o), void(r && r.call(o.element));
                            if (C.hooks.run("before-highlight", o), o.grammar)
                                if (n && u.Worker) {
                                    var s = new Worker(C.filename);
                                    s.onmessage = function(e) {
                                        l(e.data)
                                    }, s.postMessage(JSON.stringify({
                                        language: o.language,
                                        code: o.code,
                                        immediateClose: !0
                                    }))
                                } else l(C.highlight(o.code, o.grammar, o.language));
                            else l(C.util.encode(o.code))
                        },
                        highlight: function(e, n, r) {
                            var t = {
                                code: e,
                                grammar: n,
                                language: r
                            };
                            return C.hooks.run("before-tokenize", t), t.tokens = C.tokenize(t.code, t.grammar), C.hooks.run("after-tokenize", t), _.stringify(C.util.encode(t.tokens), t.language)
                        },
                        matchGrammar: function(e, n, r, t, a, i, o) {
                            for (var l in r)
                                if (r.hasOwnProperty(l) && r[l]) {
                                    var s = r[l];
                                    s = Array.isArray(s) ? s : [s];
                                    for (var u = 0; u < s.length; ++u) {
                                        if (o && o == l + "," + u) return;
                                        var c = s[u],
                                            g = c.inside,
                                            f = !!c.lookbehind,
                                            h = !!c.greedy,
                                            d = 0,
                                            m = c.alias;
                                        if (h && !c.pattern.global) {
                                            var p = c.pattern.toString().match(/[imsuy]*$/)[0];
                                            c.pattern = RegExp(c.pattern.source, p + "g")
                                        }
                                        c = c.pattern || c;
                                        for (var y = t, v = a; y < n.length; v += n[y].length, ++y) {
                                            var k = n[y];
                                            if (n.length > e.length) return;
                                            if (!(k instanceof _)) {
                                                if (h && y != n.length - 1) {
                                                    if (c.lastIndex = v, !(O = c.exec(e))) break;
                                                    for (var b = O.index + (f && O[1] ? O[1].length : 0), w = O.index + O[0].length, A = y, P = v, x = n.length; A < x && (P < w || !n[A].type && !n[A - 1].greedy); ++A)(P += n[A].length) <= b && (++y, v = P);
                                                    if (n[y] instanceof _) continue;
                                                    S = A - y, k = e.slice(v, P), O.index -= v
                                                } else {
                                                    c.lastIndex = 0;
                                                    var O = c.exec(k),
                                                        S = 1
                                                }
                                                if (O) {
                                                    f && (d = O[1] ? O[1].length : 0);
                                                    w = (b = O.index + d) + (O = O[0].slice(d)).length;
                                                    var j = k.slice(0, b),
                                                        N = k.slice(w),
                                                        E = [y, S];
                                                    j && (++y, v += j.length, E.push(j));
                                                    var L = new _(l, g ? C.tokenize(O, g) : O, m, O, h);
                                                    if (E.push(L), N && E.push(N), Array.prototype.splice.apply(n, E), 1 != S && C.matchGrammar(e, n, r, y, v, !0, l + "," + u), i) break
                                                } else if (i) break
                                            }
                                        }
                                    }
                                }
                        },
                        tokenize: function(e, n) {
                            var r = [e],
                                t = n.rest;
                            if (t) {
                                for (var a in t) n[a] = t[a];
                                delete n.rest
                            }
                            return C.matchGrammar(e, r, n, 0, 0, !1), r
                        },
                        hooks: {
                            all: {},
                            add: function(e, n) {
                                var r = C.hooks.all;
                                r[e] = r[e] || [], r[e].push(n)
                            },
                            run: function(e, n) {
                                var r = C.hooks.all[e];
                                if (r && r.length)
                                    for (var t, a = 0; t = r[a++];) t(n)
                            }
                        },
                        Token: _
                    };

                function _(e, n, r, t, a) {
                    this.type = e, this.content = n, this.alias = r, this.length = 0 | (t || "").length, this.greedy = !!a
                }
                if (u.Prism = C, _.stringify = function(e, n) {
                        if ("string" == typeof e) return e;
                        if (Array.isArray(e)) return e.map(function(e) {
                            return _.stringify(e, n)
                        }).join("");
                        var r = {
                            type: e.type,
                            content: _.stringify(e.content, n),
                            tag: "span",
                            classes: ["token", e.type],
                            attributes: {},
                            language: n
                        };
                        if (e.alias) {
                            var t = Array.isArray(e.alias) ? e.alias : [e.alias];
                            Array.prototype.push.apply(r.classes, t)
                        }
                        C.hooks.run("wrap", r);
                        var a = Object.keys(r.attributes).map(function(e) {
                            return e + '="' + (r.attributes[e] || "").replace(/"/g, "&quot;") + '"'
                        }).join(" ");
                        return "<" + r.tag + ' class="' + r.classes.join(" ") + '"' + (a ? " " + a : "") + ">" + r.content + "</" + r.tag + ">"
                    }, !u.document) return u.addEventListener && (C.disableWorkerMessageHandler || u.addEventListener("message", function(e) {
                    var n = JSON.parse(e.data),
                        r = n.language,
                        t = n.code,
                        a = n.immediateClose;
                    u.postMessage(C.highlight(t, C.languages[r], r)), a && u.close()
                }, !1)), C;
                var e = C.util.currentScript();
                if (e && (C.filename = e.src, e.hasAttribute("data-manual") && (C.manual = !0)), !C.manual) {
                    function r() {
                        C.manual || C.highlightAll()
                    }
                    var t = document.readyState;
                    "loading" === t || "interactive" === t && e && e.defer ? document.addEventListener("DOMContentLoaded", r) : window.requestAnimationFrame ? window.requestAnimationFrame(r) : window.setTimeout(r, 16)
                }
                return C
            }(_self);
        "undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
        Prism.languages.markup = {
            comment: /<!--[\s\S]*?-->/,
            prolog: /<\?[\s\S]+?\?>/,
            doctype: {
                pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:(?!<!--)[^"'\]]|"[^"]*"|'[^']*'|<!--[\s\S]*?-->)*\]\s*)?>/i,
                greedy: !0
            },
            cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
            tag: {
                pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
                greedy: !0,
                inside: {
                    tag: {
                        pattern: /^<\/?[^\s>\/]+/i,
                        inside: {
                            punctuation: /^<\/?/,
                            namespace: /^[^\s>\/:]+:/
                        }
                    },
                    "attr-value": {
                        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
                        inside: {
                            punctuation: [/^=/, {
                                pattern: /^(\s*)["']|["']$/,
                                lookbehind: !0
                            }]
                        }
                    },
                    punctuation: /\/?>/,
                    "attr-name": {
                        pattern: /[^\s>\/]+/,
                        inside: {
                            namespace: /^[^\s>\/:]+:/
                        }
                    }
                }
            },
            entity: /&#?[\da-z]{1,8};/i
        }, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.hooks.add("wrap", function(a) {
            "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
        }), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
            value: function(a, e) {
                var s = {};
                s["language-" + e] = {
                    pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                    lookbehind: !0,
                    inside: Prism.languages[e]
                }, s.cdata = /^<!\[CDATA\[|\]\]>$/i;
                var n = {
                    "included-cdata": {
                        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                        inside: s
                    }
                };
                n["language-" + e] = {
                    pattern: /[\s\S]+/,
                    inside: Prism.languages[e]
                };
                var t = {};
                t[a] = {
                    pattern: RegExp("(<__[\\s\\S]*?>)(?:<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\s*|[\\s\\S])*?(?=<\\/__>)".replace(/__/g, a), "i"),
                    lookbehind: !0,
                    greedy: !0,
                    inside: n
                }, Prism.languages.insertBefore("markup", "cdata", t)
            }
        }), Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
        ! function(s) {
            var t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
            s.languages.css = {
                comment: /\/\*[\s\S]*?\*\//,
                atrule: {
                    pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
                    inside: {
                        rule: /@[\w-]+/
                    }
                },
                url: {
                    pattern: RegExp("url\\((?:" + t.source + "|[^\n\r()]*)\\)", "i"),
                    inside: {
                        function: /^url/i,
                        punctuation: /^\(|\)$/
                    }
                },
                selector: RegExp("[^{}\\s](?:[^{};\"']|" + t.source + ")*?(?=\\s*\\{)"),
                string: {
                    pattern: t,
                    greedy: !0
                },
                property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
                important: /!important\b/i,
                function: /[-a-z0-9]+(?=\()/i,
                punctuation: /[(){};:,]/
            }, s.languages.css.atrule.inside.rest = s.languages.css;
            var e = s.languages.markup;
            e && (e.tag.addInlined("style", "css"), s.languages.insertBefore("inside", "attr-value", {
                "style-attr": {
                    pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
                    inside: {
                        "attr-name": {
                            pattern: /^\s*style/i,
                            inside: e.tag.inside
                        },
                        punctuation: /^\s*=\s*['"]|['"]\s*$/,
                        "attr-value": {
                            pattern: /.+/i,
                            inside: s.languages.css
                        }
                    },
                    alias: "language-css"
                }
            }, e.tag))
        }(Prism);
        Prism.languages.clike = {
            comment: [{
                pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
                lookbehind: !0
            }, {
                pattern: /(^|[^\\:])\/\/.*/,
                lookbehind: !0,
                greedy: !0
            }],
            string: {
                pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                greedy: !0
            },
            "class-name": {
                pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
                lookbehind: !0,
                inside: {
                    punctuation: /[.\\]/
                }
            },
            keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
            boolean: /\b(?:true|false)\b/,
            function: /\w+(?=\()/,
            number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
            operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
            punctuation: /[{}[\];(),.:]/
        };
        Prism.languages.javascript = Prism.languages.extend("clike", {
            "class-name": [Prism.languages.clike["class-name"], {
                pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
                lookbehind: !0
            }],
            keyword: [{
                pattern: /((?:^|})\s*)(?:catch|finally)\b/,
                lookbehind: !0
            }, {
                pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
                lookbehind: !0
            }],
            number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
            function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
            operator: /--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/
        }), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
            regex: {
                pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*[\s\S]*?\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
                lookbehind: !0,
                greedy: !0
            },
            "function-variable": {
                pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
                alias: "function"
            },
            parameter: [{
                pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
                lookbehind: !0,
                inside: Prism.languages.javascript
            }, {
                pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
                inside: Prism.languages.javascript
            }, {
                pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
                lookbehind: !0,
                inside: Prism.languages.javascript
            }, {
                pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
                lookbehind: !0,
                inside: Prism.languages.javascript
            }],
            constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
        }), Prism.languages.insertBefore("javascript", "string", {
            "template-string": {
                pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
                greedy: !0,
                inside: {
                    "template-punctuation": {
                        pattern: /^`|`$/,
                        alias: "string"
                    },
                    interpolation: {
                        pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                        lookbehind: !0,
                        inside: {
                            "interpolation-punctuation": {
                                pattern: /^\${|}$/,
                                alias: "punctuation"
                            },
                            rest: Prism.languages.javascript
                        }
                    },
                    string: /[\s\S]+/
                }
            }
        }), Prism.languages.markup && Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.js = Prism.languages.javascript;

        // Hämtar text från textarea
        var inputText = document.querySelector(".inputArea").value;

        // ersätter tecken till HTML specialtecken
        var inputTextReplace = inputText.replace(/"/g, '&quot;').replace(/'/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // Hämtar css klass och skapar output text
        var css = appl.getCssForLanguage();
        var html = "<pre>" + "<code class=\"" + css + "\">"
        html = html + inputTextReplace;
        html = html + "</code>" + "</pre>";

        // Skriver ut texten på sidan
        var elementOutput = document.querySelector(".output");
        elementOutput.innerHTML = html;

    }
}
appl.init();