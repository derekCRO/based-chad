import {
    a as tr
} from "./chunk-6EZCOG56.mjs";
import {
    A as Re,
    B as e,
    C as c,
    H as Rr,
    J as de,
    L as m,
    O as Se,
    Q as Je,
    R as er,
    S as Ne,
    T as Ae,
    U as Ir,
    V as Dr,
    W as Tr,
    X as A,
    Z as I,
    b as Me,
    c as s,
    d as He,
    da as zr,
    f as qe,
    fa as v,
    g as vr,
    ga as d,
    h as wr,
    ha as Mr,
    ia as rr,
    j as fe,
    k as E,
    l as Cr,
    m as Wr,
    n as Z,
    o as B,
    p as me,
    r as Ve,
    s as ke,
    t as C,
    u as ye,
    v as Ye,
    w as Ke,
    x as Xe,
    y as Ze,
    z as $e
} from "./chunk-T2PCLNVY.mjs";
import {
    b,
    c as h
} from "./chunk-ELYU6EKT.mjs";
var pe = r => r;
var Be = {
    ms: r => 1e3 * r,
    s: r => r / 1e3
};

function ar(r, t) {
    return t ? r * (1e3 / t) : 0
}
var Vr = (r, t, n) => (((1 - 3 * n + 3 * t) * r + (3 * n - 6 * t)) * r + 3 * t) * r,
    st = 1e-7,
    lt = 12;

function ct(r, t, n, a, i) {
    let l, f, y = 0;
    do f = t + (n - t) / 2, l = Vr(f, a, i) - r, l > 0 ? n = f : t = f; while (Math.abs(l) > st && ++y < lt);
    return f
}

function Ie(r, t, n, a) {
    if (r === t && n === a) return pe;
    let i = l => ct(l, 0, 1, r, n);
    return l => l === 0 || l === 1 ? l : Vr(i(l), t, a)
}
var ki = {
    ease: Ie(.25, .1, .25, 1),
    "ease-in": Ie(.42, 0, 1, 1),
    "ease-in-out": Ie(.42, 0, .58, 1),
    "ease-out": Ie(0, 0, .58, 1)
};

function kr(r, t) {
    var n = {};
    for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && t.indexOf(a) < 0 && (n[a] = r[a]);
    if (r != null && typeof Object.getOwnPropertySymbols == "function") {
        var i = 0;
        for (a = Object.getOwnPropertySymbols(r); i < a.length; i++) t.indexOf(a[i]) < 0 && Object.prototype.propertyIsEnumerable.call(r, a[i]) && (n[a[i]] = r[a[i]])
    }
    return n
}
var be = {};
Object.defineProperty(be, "__esModule", {
    value: !0
});
be.warning = function () {};
be.invariant = function () {};
var Bi = be.__esModule,
    Fi = be.warning,
    ht = be.invariant;
var gt = 5;

function Fe(r, t, n) {
    let a = Math.max(t - gt, 0);
    return ar(n - r(a), t - a)
}
var ve = {
        stiffness: 100,
        damping: 10,
        mass: 1
    },
    xt = (r = ve.stiffness, t = ve.damping, n = ve.mass) => t / (2 * Math.sqrt(r * n));

function yt(r, t, n) {
    return r < t && n >= t || r > t && n <= t
}
var ir = ({
        stiffness: r = ve.stiffness,
        damping: t = ve.damping,
        mass: n = ve.mass,
        from: a = 0,
        to: i = 1,
        velocity: l = 0,
        restSpeed: f = 2,
        restDistance: y = .5
    } = {}) => {
        l = l ? Be.s(l) : 0;
        let g = {
                done: !1,
                hasReachedTarget: !1,
                current: a,
                target: i
            },
            o = i - a,
            x = Math.sqrt(r / n) / 1e3,
            u = xt(r, t, n),
            z;
        if (u < 1) {
            let D = x * Math.sqrt(1 - u * u);
            z = R => i - Math.exp(-u * x * R) * ((u * x * o - l) / D * Math.sin(D * R) + o * Math.cos(D * R))
        } else z = D => i - Math.exp(-x * D) * (o + (x * o - l) * D);
        return D => {
            g.current = z(D);
            let R = D === 0 ? l : Fe(z, D, g.current),
                _ = Math.abs(R) <= f,
                M = Math.abs(i - g.current) <= y;
            return g.done = _ && M, g.hasReachedTarget = yt(a, i, g.current), g
        }
    },
    Sr = ({
        from: r = 0,
        velocity: t = 0,
        power: n = .8,
        decay: a = .325,
        bounceDamping: i,
        bounceStiffness: l,
        changeTarget: f,
        min: y,
        max: g,
        restDistance: o = .5,
        restSpeed: x
    }) => {
        a = Be.ms(a);
        let u = {
                hasReachedTarget: !1,
                done: !1,
                current: r,
                target: r
            },
            z = p => y !== void 0 && p < y || g !== void 0 && p > g,
            D = p => y === void 0 ? g : g === void 0 || Math.abs(y - p) < Math.abs(g - p) ? y : g,
            R = n * t,
            _ = r + R,
            M = f === void 0 ? _ : f(_);
        u.target = M, M !== _ && (R = M - r);
        let j = p => -R * Math.exp(-p / a),
            O = p => M + j(p),
            P = p => {
                let J = j(p),
                    H = O(p);
                u.done = Math.abs(J) <= o, u.current = u.done ? M : H
            },
            F, S, U = p => {
                z(u.current) && (F = p, S = ir({
                    from: u.current,
                    to: D(u.current),
                    velocity: Fe(O, p, u.current),
                    damping: i,
                    stiffness: l,
                    restDistance: o,
                    restSpeed: x
                }))
            };
        return U(0), p => {
            let J = !1;
            return !S && F === void 0 && (J = !0, P(p), U(p)), F !== void 0 && p > F ? (u.hasReachedTarget = !0, S(p - F)) : (u.hasReachedTarget = !1, !J && P(p), u)
        }
    },
    nr = 10,
    bt = 1e4;

function Jr(r, t = pe) {
    let n, a = nr,
        i = r(0),
        l = [t(i.current)];
    for (; !i.done && a < bt;) i = r(a), l.push(t(i.done ? i.target : i.current)), n === void 0 && i.hasReachedTarget && (n = a), a += nr;
    let f = a - nr;
    return l.length === 1 && l.push(i.current), {
        keyframes: l,
        duration: f / 1e3,
        overshootDuration: (n ?? f) / 1e3
    }
}
var vt = ["", "X", "Y", "Z"],
    wt = ["translate", "scale", "rotate", "skew"];
var Nr = {
        syntax: "<angle>",
        initialValue: "0deg",
        toDefaultUnit: r => r + "deg"
    },
    Ct = {
        translate: {
            syntax: "<length-percentage>",
            initialValue: "0px",
            toDefaultUnit: r => r + "px"
        },
        rotate: Nr,
        scale: {
            syntax: "<number>",
            initialValue: 1,
            toDefaultUnit: pe
        },
        skew: Nr
    },
    Wt = new Map,
    Rt = r => `--motion-${r}`,
    _r = ["x", "y", "z"];
wt.forEach(r => {
    vt.forEach(t => {
        _r.push(r + t), Wt.set(Rt(r + t), Ct[r])
    })
});
var lo = new Set(_r);
var Ar = r => document.createElement("div").animate(r, {
        duration: .001
    }),
    Br = {
        cssRegisterProperty: () => typeof CSS < "u" && Object.hasOwnProperty.call(CSS, "registerProperty"),
        waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
        partialKeyframes: () => {
            try {
                Ar({
                    opacity: [1]
                })
            } catch {
                return !1
            }
            return !0
        },
        finished: () => !!Ar({
            opacity: [0, 1]
        }).finished
    },
    or = {},
    It = {};
for (let r in Br) It[r] = () => (or[r] === void 0 && (or[r] = Br[r]()), or[r]);

function Lr(r, t) {
    var n;
    return typeof r == "string" ? t ? ((n = t[r]) !== null && n !== void 0 || (t[r] = document.querySelectorAll(r)), r = t[r]) : r = document.querySelectorAll(r) : r instanceof Element && (r = [r]), Array.from(r || [])
}

function Ur(r) {
    let t = new WeakMap;
    return (n = {}) => {
        let a = new Map,
            i = (f = 0, y = 100, g = 0, o = !1) => {
                let x = `${f}-${y}-${g}-${o}`;
                return a.has(x) || a.set(x, r(Object.assign({
                    from: f,
                    to: y,
                    velocity: g,
                    restSpeed: o ?.05 : 2,
                    restDistance: o ?.01 : .5
                }, n))), a.get(x)
            },
            l = f => (t.has(f) || t.set(f, Jr(f)), t.get(f));
        return {
            createAnimation: (f, y, g, o, x) => {
                var u, z;
                let D, R = f.length;
                if (g && R <= 2 && f.every(Dt)) {
                    let M = f[R - 1],
                        j = R === 1 ? null : f[0],
                        O = 0,
                        P = 0,
                        F = x ?.generator;
                    if (F) {
                        let {
                            animation: p,
                            generatorStartTime: J
                        } = x, H = p ?.startTime || J || 0, k = p ?.currentTime || performance.now() - H, q = F(k).current;
                        P = (u = j) !== null && u !== void 0 ? u : q, (R === 1 || R === 2 && f[0] === null) && (O = Fe(re => F(re).current, k, q))
                    } else P = (z = j) !== null && z !== void 0 ? z : parseFloat(y());
                    let S = i(P, M, O, o ?.includes("scale")),
                        U = l(S);
                    D = Object.assign(Object.assign({}, U), {
                        easing: "linear"
                    }), x && (x.generator = S, x.generatorStartTime = performance.now())
                } else D = {
                    easing: "ease",
                    duration: l(i(0, 100)).overshootDuration
                };
                return D
            }
        }
    }
}
var Dt = r => typeof r != "string",
    co = Ur(ir),
    fo = Ur(Sr),
    Tt = {
        any: 0,
        all: 1
    };

function zt(r, t, {
    root: n,
    margin: a,
    amount: i = "any"
} = {}) {
    if (typeof IntersectionObserver > "u") return () => {};
    let l = Lr(r),
        f = new WeakMap,
        y = o => {
            o.forEach(x => {
                let u = f.get(x.target);
                if (x.isIntersecting !== !!u)
                    if (x.isIntersecting) {
                        let z = t(x);
                        typeof z == "function" ? f.set(x.target, z) : g.unobserve(x.target)
                    } else u && (u(x), f.delete(x.target))
            })
        },
        g = new IntersectionObserver(y, {
            root: n,
            rootMargin: a,
            threshold: typeof i == "number" ? i : Tt[i]
        });
    return l.forEach(o => g.observe(o)), () => g.disconnect()
}
var Ee = new WeakMap,
    ne;

function Mt(r, t) {
    if (t) {
        let {
            inlineSize: n,
            blockSize: a
        } = t[0];
        return {
            width: n,
            height: a
        }
    }
    return r instanceof SVGElement && "getBBox" in r ? r.getBBox() : {
        width: r.offsetWidth,
        height: r.offsetHeight
    }
}

function Vt({
    target: r,
    contentRect: t,
    borderBoxSize: n
}) {
    var a;
    (a = Ee.get(r)) === null || a === void 0 || a.forEach(i => {
        i({
            target: r,
            contentSize: t,
            get size() {
                return Mt(r, n)
            }
        })
    })
}

function kt(r) {
    r.forEach(Vt)
}

function St() {
    typeof ResizeObserver < "u" && (ne = new ResizeObserver(kt))
}

function Jt(r, t) {
    ne || St();
    let n = Lr(r);
    return n.forEach(a => {
        let i = Ee.get(a);
        i || (i = new Set, Ee.set(a, i)), i.add(t), ne ?.observe(a)
    }), () => {
        n.forEach(a => {
            let i = Ee.get(a);
            i ?.delete(t), i ?.size || ne ?.unobserve(a)
        })
    }
}
var _e = new Set,
    De;

function Nt() {
    De = () => {
        let r = {
                width: h.innerWidth,
                height: h.innerHeight
            },
            t = {
                target: h,
                size: r,
                contentSize: r
            };
        _e.forEach(n => n(t))
    }, h.addEventListener("resize", De)
}

function At(r) {
    return _e.add(r), De || Nt(), () => {
        _e.delete(r), !_e.size && De && (De = void 0)
    }
}

function Or(r, t) {
    return typeof r == "function" ? At(r) : Jt(r, t)
}

function sr(r, t, n) {
    r.dispatchEvent(new CustomEvent(t, {
        detail: {
            originalEvent: n
        }
    }))
}

function Fr(r, t, n) {
    r.dispatchEvent(new CustomEvent(t, {
        detail: {
            originalEntry: n
        }
    }))
}
var Bt = {
        isActive: r => !!r.inView,
        subscribe: (r, {
            enable: t,
            disable: n
        }, {
            inViewOptions: a = {}
        }) => {
            let {
                once: i
            } = a, l = kr(a, ["once"]);
            return zt(r, f => {
                if (t(), Fr(r, "viewenter", f), !i) return y => {
                    n(), Fr(r, "viewleave", y)
                }
            }, l)
        }
    },
    Er = (r, t, n) => a => {
        (!a.pointerType || a.pointerType === "mouse") && (n(), sr(r, t, a))
    },
    Ft = {
        isActive: r => !!r.hover,
        subscribe: (r, {
            enable: t,
            disable: n
        }) => {
            let a = Er(r, "hoverstart", t),
                i = Er(r, "hoverend", n);
            return r.addEventListener("pointerenter", a), r.addEventListener("pointerleave", i), () => {
                r.removeEventListener("pointerenter", a), r.removeEventListener("pointerleave", i)
            }
        }
    },
    Et = {
        isActive: r => !!r.press,
        subscribe: (r, {
            enable: t,
            disable: n
        }) => {
            let a = l => {
                    n(), sr(r, "pressend", l), h.removeEventListener("pointerup", a)
                },
                i = l => {
                    t(), sr(r, "pressstart", l), h.addEventListener("pointerup", a)
                };
            return r.addEventListener("pointerdown", i), () => {
                r.removeEventListener("pointerdown", i), h.removeEventListener("pointerup", a)
            }
        }
    },
    _t = {
        inView: Bt,
        hover: Ft,
        press: Et
    },
    mo = ["initial", "animate", ...Object.keys(_t), "exit"];
var Lt = 100,
    Ut = {
        left: r => `translateX(-${r}px)`,
        right: r => `translateX(${r}px)`,
        top: r => `translateY(-${r}px)`,
        bottom: r => `translateY(${r}px)`
    },
    lr = typeof Animation < "u" && typeof Animation.prototype.updatePlaybackRate == "function";

function ue(r) {
    let {
        slots: t,
        gap: n,
        padding: a,
        paddingPerSide: i,
        paddingTop: l,
        paddingRight: f,
        paddingBottom: y,
        paddingLeft: g,
        speed: o,
        hoverFactor: x,
        direction: u,
        alignment: z,
        sizingOptions: D,
        fadeOptions: R,
        style: _
    } = r, {
        fadeContent: M,
        overflow: j,
        fadeWidth: O,
        fadeInset: P,
        fadeAlpha: F
    } = R, {
        widthType: S,
        heightType: U
    } = D, p = i ? `${l}px ${f}px ${y}px ${g}px` : `${a}px`, J = de.current() === de.canvas, H = Me.count(t), k = H > 0;
    u === !0 && (u = "left");
    let q = u === "left" || u === "right",
        re = Ye(0),
        he = Ut[u],
        ie = Ke(re, he),
        te = B(null),
        L = Z(() => [qe(), qe()], []),
        [Y, K] = me({
            parent: null,
            children: null
        }),
        ae = [],
        oe = [],
        $ = 0,
        We = 0;
    J && ($ = H ? Math.floor(10 / H) : 0, We = 1), !J && k && Y.parent && ($ = Math.round(Y.parent / Y.children * 2) + 1, $ = Math.min($, Lt), We = 1);
    let Ue = fe(() => {
            if (k && te.current) {
                let V = q ? te.current.offsetWidth : te.current.offsetHeight,
                    T = L[0].current ? q ? L[0].current.offsetLeft : L[0].current.offsetTop : 0,
                    G = (L[1].current ? q ? L[1].current.offsetLeft + L[1].current.offsetWidth : L[1].current.offsetTop + L[1].current.offsetHeight : 0) - T + n;
                K({
                    parent: V,
                    children: G
                })
            }
        }, []),
        N = J ? {
            contentVisibility: "auto"
        } : {};
    if (k) {
        if (!J) {
            let V = B(!0);
            E(() => (ke.read(Ue), Or(te.current, ({
                contentSize: T
            }) => {
                !V.current && (T.width || T.height) && ke.read(Ue), V.current = !1
            })), [])
        }
        ae = Me.map(t, (V, T) => {
            var ee, G, se, le;
            let ce;
            T === 0 && (ce = L[0]), T === t.length - 1 && (ce = L[1]);
            let xe = {
                width: S ? (ee = V.props) === null || ee === void 0 ? void 0 : ee.width : "100%",
                height: U ? (G = V.props) === null || G === void 0 ? void 0 : G.height : "100%"
            };
            return e(ye, {
                inherit: "id",
                children: e("li", {
                    ref: ce,
                    style: xe,
                    children: He(V, {
                        style: {
                            ...(se = V.props) === null || se === void 0 ? void 0 : se.style,
                            ...xe,
                            flexShrink: 0,
                            ...N
                        },
                        layoutId: V.props.layoutId ? V.props.layoutId + "-original-" + T : void 0
                    }, (le = V.props) === null || le === void 0 ? void 0 : le.children)
                })
            })
        })
    }
    if (!J)
        for (let V = 0; V < $; V++) oe = [...oe, ...Me.map(t, (T, ee) => {
            var G, se, le, ce, xe, je;
            let nt = {
                width: S ? (G = T.props) === null || G === void 0 ? void 0 : G.width : "100%",
                height: U ? (se = T.props) === null || se === void 0 ? void 0 : se.height : "100%"
            };
            return e(ye, {
                inherit: "id",
                children: e("li", {
                    style: nt,
                    "aria-hidden": !0,
                    children: He(T, {
                        key: V + " " + ee,
                        style: {
                            ...(le = T.props) === null || le === void 0 ? void 0 : le.style,
                            width: S ? (ce = T.props) === null || ce === void 0 ? void 0 : ce.width : "100%",
                            height: U ? (xe = T.props) === null || xe === void 0 ? void 0 : xe.height : "100%",
                            flexShrink: 0,
                            ...N
                        },
                        layoutId: T.props.layoutId ? T.props.layoutId + "-dupe-" + V : void 0
                    }, (je = T.props) === null || je === void 0 ? void 0 : je.children)
                }, V + "li" + ee)
            }, V + "lg" + ee)
        })];
    let X = Y.children + Y.children * Math.round(Y.parent / Y.children),
        Oe = B(null),
        Pe = B(null),
        ze = B(0),
        Qe = B(!1),
        xr = Ze(),
        yr = B(null),
        ge = B(null);
    if (!J) {
        let V = Re(te);
        lr ? E(() => {
            if (!(xr || !X || !o)) return ge.current = yr.current.animate({
                transform: [he(0), he(X)]
            }, {
                duration: Math.abs(X) / o * 1e3,
                iterations: 1 / 0,
                easing: "linear"
            }), () => ge.current.cancel()
        }, [x, X, o]) : Xe(T => {
            if (!X || xr || lr) return;
            Oe.current === null && (Oe.current = T), T = T - Oe.current;
            let G = (Pe.current === null ? 0 : T - Pe.current) * (o / 1e3);
            Qe.current && (G *= x), ze.current += G, ze.current = $e(0, X, ze.current), Pe.current = T, V && re.set(ze.current)
        })
    }
    let et = q ? "to right" : "to bottom",
        br = O / 2,
        rt = 100 - O / 2,
        tt = jt(P, 0, br),
        at = 100 - P,
        Ge = `linear-gradient(${et}, rgba(0, 0, 0, ${F}) ${tt}%, rgba(0, 0, 0, 1) ${br}%, rgba(0, 0, 0, 1) ${rt}%, rgba(0, 0, 0, ${F}) ${at}%)`;
    return k ? e("section", {
        style: {
            ...Pr,
            opacity: We,
            WebkitMaskImage: M ? Ge : void 0,
            MozMaskImage: M ? Ge : void 0,
            maskImage: M ? Ge : void 0,
            overflow: j ? "visible" : "hidden",
            padding: p
        },
        ref: te,
        children: c(C.ul, {
            ref: yr,
            style: {
                ...Pr,
                gap: n,
                top: u === "bottom" && Qr(X) ? -X : void 0,
                left: u === "right" && Qr(X) ? -X : void 0,
                placeItems: z,
                position: "relative",
                flexDirection: q ? "row" : "column",
                ..._,
                transform: lr ? void 0 : ie,
                willChange: J ? "auto" : "transform"
            },
            onMouseEnter: () => {
                Qe.current = !0, ge.current && (ge.current.playbackRate = x)
            },
            onMouseLeave: () => {
                Qe.current = !1, ge.current && (ge.current.playbackRate = 1)
            },
            children: [ae, oe]
        })
    }) : c("section", {
        style: Ot,
        children: [e("div", {
            style: Pt,
            children: "\u2728"
        }), e("p", {
            style: Qt,
            children: "Connect to Content"
        }), e("p", {
            style: Gt,
            children: "Add layers or components to infinitely loop on your page."
        })]
    })
}
ue.defaultProps = {
    gap: 10,
    padding: 10,
    sizingOptions: {
        widthType: !0,
        heightType: !0
    },
    fadeOptions: {
        fadeContent: !0,
        overflow: !1,
        fadeWidth: 25,
        fadeAlpha: 0,
        fadeInset: 0
    },
    direction: !0
};
Se(ue, {
    slots: {
        type: m.Array,
        title: "Children",
        control: {
            type: m.ComponentInstance
        }
    },
    speed: {
        type: m.Number,
        title: "Speed",
        min: 0,
        max: 1e3,
        defaultValue: 100,
        unit: "%",
        displayStepper: !0,
        step: 5
    },
    direction: {
        type: m.Enum,
        title: "Direction",
        options: ["left", "right", "top", "bottom"],
        optionIcons: ["direction-left", "direction-right", "direction-up", "direction-down"],
        optionTitles: ["Left", "Right", "Top", "Bottom"],
        defaultValue: "left",
        displaySegmentedControl: !0
    },
    alignment: {
        type: m.Enum,
        title: "Align",
        options: ["flex-start", "center", "flex-end"],
        optionIcons: {
            direction: {
                right: ["align-top", "align-middle", "align-bottom"],
                left: ["align-top", "align-middle", "align-bottom"],
                top: ["align-left", "align-center", "align-right"],
                bottom: ["align-left", "align-center", "align-right"]
            }
        },
        defaultValue: "center",
        displaySegmentedControl: !0
    },
    gap: {
        type: m.Number,
        title: "Gap"
    },
    padding: {
        title: "Padding",
        type: m.FusedNumber,
        toggleKey: "paddingPerSide",
        toggleTitles: ["Padding", "Padding per side"],
        valueKeys: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
        valueLabels: ["T", "R", "B", "L"],
        min: 0
    },
    sizingOptions: {
        type: m.Object,
        title: "Sizing",
        controls: {
            widthType: {
                type: m.Boolean,
                title: "Width",
                enabledTitle: "Auto",
                disabledTitle: "Stretch",
                defaultValue: !0
            },
            heightType: {
                type: m.Boolean,
                title: "Height",
                enabledTitle: "Auto",
                disabledTitle: "Stretch",
                defaultValue: !0
            }
        }
    },
    fadeOptions: {
        type: m.Object,
        title: "Clipping",
        controls: {
            fadeContent: {
                type: m.Boolean,
                title: "Fade",
                defaultValue: !0
            },
            overflow: {
                type: m.Boolean,
                title: "Overflow",
                enabledTitle: "Show",
                disabledTitle: "Hide",
                defaultValue: !1,
                hidden(r) {
                    return r.fadeContent === !0
                }
            },
            fadeWidth: {
                type: m.Number,
                title: "Width",
                defaultValue: 25,
                min: 0,
                max: 100,
                unit: "%",
                hidden(r) {
                    return r.fadeContent === !1
                }
            },
            fadeInset: {
                type: m.Number,
                title: "Inset",
                defaultValue: 0,
                min: 0,
                max: 100,
                unit: "%",
                hidden(r) {
                    return r.fadeContent === !1
                }
            },
            fadeAlpha: {
                type: m.Number,
                title: "Opacity",
                defaultValue: 0,
                min: 0,
                max: 1,
                step: .05,
                hidden(r) {
                    return r.fadeContent === !1
                }
            }
        }
    },
    hoverFactor: {
        type: m.Number,
        title: "Hover",
        min: 0,
        max: 1,
        unit: "x",
        defaultValue: 1,
        step: .1,
        displayStepper: !0,
        description: "Slows down the speed while you are hovering."
    }
});
var Pr = {
        display: "flex",
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        placeItems: "center",
        margin: 0,
        padding: 0,
        listStyleType: "none",
        textIndent: "none"
    },
    Ot = {
        display: "flex",
        width: "100%",
        height: "100%",
        placeContent: "center",
        placeItems: "center",
        flexDirection: "column",
        color: "#96F",
        background: "rgba(136, 85, 255, 0.1)",
        fontSize: 11,
        overflow: "hidden",
        padding: "20px 20px 30px 20px"
    },
    Pt = {
        fontSize: 32,
        marginBottom: 10
    },
    Qt = {
        margin: 0,
        marginBottom: 10,
        fontWeight: 600,
        textAlign: "center"
    },
    Gt = {
        margin: 0,
        opacity: .7,
        maxWidth: 150,
        lineHeight: 1.5,
        textAlign: "center"
    },
    jt = (r, t, n) => Math.min(Math.max(r, t), n),
    Qr = r => typeof r == "number" && !isNaN(r);
var Gr = {
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    Ht = {
        ...Gr,
        borderRadius: 6,
        background: "rgba(136, 85, 255, 0.3)",
        color: "#85F",
        border: "1px dashed #85F",
        flexDirection: "column"
    },
    cr = {
        onClick: {
            type: m.EventHandler
        },
        onMouseEnter: {
            type: m.EventHandler
        },
        onMouseLeave: {
            type: m.EventHandler
        }
    },
    qt = {
        type: m.Number,
        title: "Font Size",
        min: 2,
        max: 200,
        step: 1,
        displayStepper: !0
    },
    Yt = {
        font: {
            type: m.Boolean,
            title: "Font",
            defaultValue: !1,
            disabledTitle: "Default",
            enabledTitle: "Custom"
        },
        fontFamily: {
            type: m.String,
            title: "Family",
            placeholder: "Inter",
            hidden: ({
                font: r
            }) => !r
        },
        fontWeight: {
            type: m.Enum,
            title: "Weight",
            options: [100, 200, 300, 400, 500, 600, 700, 800, 900],
            optionTitles: ["Thin", "Extra-light", "Light", "Regular", "Medium", "Semi-bold", "Bold", "Extra-bold", "Black"],
            hidden: ({
                font: r
            }) => !r
        }
    };

function fr(r, t) {
    return jr(!0, r, t)
}

function mr(r, t) {
    return jr(!1, r, t)
}

function jr(r, t, n = !0) {
    let a = Je();
    E(() => {
        n && a === r && t()
    }, [a])
}
var Kt = () => {
        if (typeof b < "u") {
            let r = b.userAgent.toLowerCase();
            return (r.indexOf("safari") > -1 || r.indexOf("framermobile") > -1 || r.indexOf("framerx") > -1) && r.indexOf("chrome") < 0
        } else return !1
    },
    dr = () => Z(() => Kt(), []);

function pr() {
    return Z(() => de.current() === de.canvas, [])
}

function ur(r) {
    let {
        borderRadius: t,
        isMixedBorderRadius: n,
        topLeftRadius: a,
        topRightRadius: i,
        bottomRightRadius: l,
        bottomLeftRadius: f
    } = r;
    return Z(() => n ? `${a}px ${i}px ${l}px ${f}px` : `${t}px`, [t, n, a, i, l, f])
}
var hr = {
    borderRadius: {
        title: "Radius",
        type: m.FusedNumber,
        toggleKey: "isMixedBorderRadius",
        toggleTitles: ["Radius", "Radius per corner"],
        valueKeys: ["topLeftRadius", "topRightRadius", "bottomRightRadius", "bottomLeftRadius"],
        valueLabels: ["TL", "TR", "BR", "BL"],
        min: 0
    }
};
var $t = {
    padding: {
        type: m.FusedNumber,
        toggleKey: "paddingPerSide",
        toggleTitles: ["Padding", "Padding per side"],
        valueKeys: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
        valueLabels: ["T", "R", "B", "L"],
        min: 0,
        title: "Padding"
    }
};
var Yr;
(function (r) {
    r.Fill = "fill", r.Contain = "contain", r.Cover = "cover", r.None = "none", r.ScaleDown = "scale-down"
})(Yr || (Yr = {}));
var Kr;
(function (r) {
    r.Video = "Upload", r.Url = "URL"
})(Kr || (Kr = {}));

function ea(r) {
    let {
        width: t,
        height: n,
        topLeft: a,
        topRight: i,
        bottomRight: l,
        bottomLeft: f,
        id: y,
        children: g,
        ...o
    } = r;
    return o
}

function we(r) {
    let t = ea(r);
    return e(aa, {
        ...t
    })
}

function ra(r) {
    let t = Je(),
        n = B(!1),
        a = fe(f => {
            if (!r.current) return;
            let y = (f === 1 ?.999 : f) * r.current.duration,
                g = Math.abs(r.current.currentTime - y) < .1;
            r.current.duration > 0 && !g && (r.current.currentTime = y)
        }, []),
        i = fe(() => {
            !(r.current.currentTime > 0 && r.current.onplaying && !r.current.paused && !r.current.ended && r.current.readyState > r.current.HAVE_CURRENT_DATA) && r.current && !n.current && t && (n.current = !0, r.current.play().catch(y => {}).finally(() => n.current = !1))
        }, []),
        l = fe(() => {
            !r.current || n.current || r.current.pause()
        }, []);
    return {
        play: i,
        pause: l,
        setProgress: a
    }
}

function ta({
    playingProp: r,
    muted: t,
    loop: n,
    playsinline: a,
    controls: i
}) {
    let [l] = me(() => r), [f, y] = me(!1);
    r !== l && !f && y(!0);
    let g = l && t && n && a && !i && !f,
        o;
    return g ? o = "on-viewport" : l ? o = "on-mount" : o = "no-autoplay", o
}
var Xr = !1,
    aa = wr(function (t) {
        let {
            srcType: n,
            srcFile: a,
            srcUrl: i,
            playing: l,
            muted: f,
            playsinline: y,
            controls: g,
            progress: o,
            objectFit: x,
            backgroundColor: u,
            onSeeked: z,
            onPause: D,
            onPlay: R,
            onEnd: _,
            onClick: M,
            onMouseEnter: j,
            onMouseLeave: O,
            onMouseDown: P,
            onMouseUp: F,
            poster: S,
            posterEnabled: U,
            startTime: p,
            volume: J,
            loop: H
        } = t, k = B(), q = dr(), re = B(null), he = B(null), ie = pr(), te = ur(t), L = ie ? "no-autoplay" : ta({
            playingProp: l,
            muted: f,
            loop: H,
            playsinline: y,
            controls: g
        }), Y = ie ? !0 : Re(k), K = p === 100 ? 99.9 : p, {
            play: ae,
            pause: oe,
            setProgress: $
        } = ra(k);
        E(() => {
            ie || (l ? ae() : oe())
        }, [l]), E(() => {
            ie || L === "on-viewport" && (Y ? ae() : oe())
        }, [L, Y]), E(() => {
            if (!Xr) {
                Xr = !0;
                return
            }
            let N = Ve(o) ? o.get() : (o ?? 0) * .01;
            $((N ?? 0) || (K ?? 0) / 100)
        }, [K, a, i, o]), E(() => {
            if (Ve(o)) return o.on("change", N => $(N))
        }, [o]), fr(() => {
            re.current !== null && k.current && (!he && H || !re.current) && ae()
        }), mr(() => {
            k.current && (he.current = k.current.ended, re.current = k.current.paused, oe())
        });
        let We = Z(() => {
            let N = "";
            if (n === "URL") return i + N;
            if (n === "Upload") return a + N
        }, [n, a, i, K]);
        return E(() => {
            q && k.current && L === "on-mount" && setTimeout(() => ae(), 50)
        }, []), E(() => {
            k.current && !f && (k.current.volume = (J ?? 0) / 100)
        }, [J]), e("video", {
            onClick: M,
            onMouseEnter: j,
            onMouseLeave: O,
            onMouseDown: P,
            onMouseUp: F,
            src: We,
            loop: H,
            ref: k,
            onSeeked: N => z ?.(N),
            onPause: N => D ?.(N),
            onPlay: N => R ?.(N),
            onEnded: N => _ ?.(N),
            autoPlay: L === "on-mount",
            poster: U ? S : void 0,
            onLoadedData: () => {
                k.current && (k.current.currentTime < .3 && $((K ?? 0) * .01), L === "on-mount" && ae())
            },
            controls: g,
            muted: ie ? !0 : f,
            playsInline: y,
            style: {
                cursor: M ? "pointer" : "auto",
                width: "100%",
                height: "100%",
                borderRadius: te,
                display: "block",
                objectFit: x,
                backgroundColor: u,
                objectPosition: "50% 50%"
            }
        })
    });
we.displayName = "Video";
we.defaultProps = {
    srcType: "URL",
    srcUrl: "https://assets.mixkit.co/videos/preview/mixkit-shining-sun-in-the-sky-surrounded-by-moving-clouds-31793-small.mp4",
    srcFile: "",
    posterEnabled: !1,
    controls: !1,
    playing: !0,
    loop: !0,
    muted: !0,
    playsinline: !0,
    restartOnEnter: !1,
    objectFit: "cover",
    backgroundColor: "rgba(0,0,0,0)",
    radius: 0,
    volume: 25,
    startTime: 0
};
var na = /[A-Z]{2,}|[A-Z][a-z]+|[a-z]+|[A-Z]|\d+/gu;

function ia(r) {
    return r.charAt(0).toUpperCase() + r.slice(1)
}

function oa(r) {
    return (r.match(na) || []).map(ia).join(" ")
}
var Zr = ["cover", "fill", "contain", "scale-down", "none"];
Se(we, {
    srcType: {
        type: m.Enum,
        displaySegmentedControl: !0,
        title: "Source",
        options: ["URL", "Upload"]
    },
    srcUrl: {
        type: m.String,
        title: "URL",
        placeholder: "../example.mp4",
        hidden(r) {
            return r.srcType === "Upload"
        },
        description: "Hosted video file URL. For YouTube, use the YouTube component."
    },
    srcFile: {
        type: m.File,
        title: "File",
        allowedFileTypes: ["mp4", "webm"],
        hidden(r) {
            return r.srcType === "URL"
        }
    },
    playing: {
        type: m.Boolean,
        title: "Playing",
        enabledTitle: "Yes",
        disabledTitle: "No"
    },
    posterEnabled: {
        type: m.Boolean,
        title: "Poster",
        enabledTitle: "Yes",
        disabledTitle: "No"
    },
    poster: {
        type: m.Image,
        title: " ",
        hidden: ({
            posterEnabled: r
        }) => !r
    },
    backgroundColor: {
        type: m.Color,
        title: "Background"
    },
    ...hr,
    startTime: {
        title: "Start Time",
        type: m.Number,
        min: 0,
        max: 100,
        step: .1,
        unit: "%"
    },
    loop: {
        type: m.Boolean,
        title: "Loop",
        enabledTitle: "Yes",
        disabledTitle: "No"
    },
    objectFit: {
        type: m.Enum,
        title: "Fit",
        options: Zr,
        optionTitles: Zr.map(oa)
    },
    controls: {
        type: m.Boolean,
        title: "Controls",
        enabledTitle: "Show",
        disabledTitle: "Hide"
    },
    muted: {
        type: m.Boolean,
        title: "Muted",
        enabledTitle: "Yes",
        disabledTitle: "No"
    },
    volume: {
        type: m.Number,
        max: 100,
        min: 0,
        unit: "%",
        hidden: ({
            muted: r
        }) => r
    },
    onEnd: {
        type: m.EventHandler
    },
    onSeeked: {
        type: m.EventHandler
    },
    onPause: {
        type: m.EventHandler
    },
    onPlay: {
        type: m.EventHandler
    },
    ...cr
});
var sa = rr(ue),
    la = rr(we);
var ca = {
        KDWX91tIU: "(max-width: 809px)",
        rxJ8_y4tS: "(min-width: 810px) and (max-width: 1199px)",
        VQKTpmpRz: "(min-width: 1500px) and (max-width: 1919px)",
        WQLkyLRf1: "(min-width: 1200px) and (max-width: 1499px)",
        zk2FBa2dy: "(min-width: 1920px)"
    },
    Ce = () => typeof document < "u",
    $r = "framer-iJaID",
    fa = {
        KDWX91tIU: "framer-v-15hurun",
        rxJ8_y4tS: "framer-v-1i6nyat",
        VQKTpmpRz: "framer-v-k4kk23",
        WQLkyLRf1: "framer-v-72rtr7",
        zk2FBa2dy: "framer-v-19x8ari"
    },
    Q = (r, t) => `translateX(-50%) ${t}`,
    w = (r, t) => `translate(-50%, -50%) ${t}`,
    gr = (r, t) => `translateY(-50%) ${t}`,
    Te = tr(),
    ma = {
        1500: "VQKTpmpRz",
        1920: "zk2FBa2dy",
        Desktop: "WQLkyLRf1",
        Phone: "KDWX91tIU",
        Tablet: "rxJ8_y4tS"
    },
    da = ({
        height: r,
        id: t,
        width: n,
        ...a
    }) => {
        var i, l;
        return {
            ...a,
            variant: (l = (i = ma[a.variant]) !== null && i !== void 0 ? i : a.variant) !== null && l !== void 0 ? l : "WQLkyLRf1"
        }
    },
    pa = vr(function (r, t) {
        let {
            activeLocale: n,
            setLocale: a
        } = Rr(), {
            style: i,
            className: l,
            layoutId: f,
            variant: y,
            ...g
        } = da(r);
        Wr(() => {
            let S = tr(void 0, n);
            if (document.title = S.title || "", S.viewport) {
                var U;
                (U = document.querySelector('meta[name="viewport"]')) === null || U === void 0 || U.setAttribute("content", S.viewport)
            }
            if (S.bodyClassName) return Array.from(document.body.classList).filter(p => p.startsWith("framer-body-")).map(p => document.body.classList.remove(p)), document.body.classList.add(`${S.bodyClassName}-framer-iJaID`), () => {
                document.body.classList.remove(`${S.bodyClassName}-framer-iJaID`)
            }
        }, [void 0, n]);
        let [o, x] = zr(y, ca, !1), u = void 0, z = B(null), D = () => o === "rxJ8_y4tS" ? !Ce() : !0, R = () => o === "KDWX91tIU" ? !Ce() : !0, _ = () => ["rxJ8_y4tS", "KDWX91tIU"].includes(o) ? !Ce() : !0, M = () => ["zk2FBa2dy", "VQKTpmpRz"].includes(o) ? !0 : !Ce(), j = () => o === "rxJ8_y4tS" ? !0 : !Ce(), O = () => o === "KDWX91tIU" ? !0 : !Ce(), P = Cr(), F = [];
        return Dr({}), e(Tr.Provider, {
            value: {
                primaryVariantId: "WQLkyLRf1",
                variantClassNames: fa
            },
            children: c(ye, {
                id: f ?? P,
                children: [c(C.div, {
                    ...g,
                    className: er($r, ...F, "framer-72rtr7", l),
                    ref: t ?? z,
                    style: {
                        ...i
                    },
                    children: [c(v, {
                        as: "header",
                        background: {
                            alt: "",
                            fit: "fill",
                            pixelHeight: 2160,
                            pixelWidth: 3840,
                            sizes: "100vw",
                            src: "https://framerusercontent.com/images/FZKR8GRaMy0yd1AmxRgtZiSNY.png",
                            srcSet: "https://framerusercontent.com/images/FZKR8GRaMy0yd1AmxRgtZiSNY.png?scale-down-to=512 512w,https://framerusercontent.com/images/FZKR8GRaMy0yd1AmxRgtZiSNY.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/FZKR8GRaMy0yd1AmxRgtZiSNY.png?scale-down-to=2048 2048w,https://framerusercontent.com/images/FZKR8GRaMy0yd1AmxRgtZiSNY.png 3840w"
                        },
                        className: "framer-foeqna",
                        "data-framer-name": "Header",
                        name: "Header",
                        children: [D() && c("div", {
                            className: "framer-5vcoy hidden-1i6nyat",
                            children: [R() && e(d, {
                                __fromCanvasComponent: !0,
                                children: e(s, {
                                    children: c("p", {
                                        style: {
                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                            "--framer-font-size": "19px",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: [e("span", {
                                            style: {
                                                "--framer-font-size": "23px"
                                            },
                                            children: "I\u2019m a cryptobro"
                                        }), e("span", {
                                            style: {
                                                "--framer-font-size": "23px"
                                            },
                                            children: e("br", {})
                                        }), e("span", {
                                            style: {
                                                "--framer-font-size": "23px"
                                            },
                                            children: "Degenerate on a mission"
                                        }), e("span", {
                                            style: {
                                                "--framer-font-size": "23px"
                                            },
                                            children: e("br", {})
                                        }), e("span", {
                                            style: {
                                                "--framer-font-size": "23px"
                                            },
                                            children: "to destroy all jeets."
                                        }), c("span", {
                                            style: {
                                                "--framer-font-size": "23px"
                                            },
                                            children: [e("br", {}), e("br", {})]
                                        }), e("span", {
                                            style: {
                                                "--framer-font-size": "23px"
                                            },
                                            children: "Mostly by making them cry"
                                        }), e("span", {
                                            style: {
                                                "--framer-font-size": "23px"
                                            },
                                            children: e("br", {})
                                        }), e("span", {
                                            style: {
                                                "--framer-font-size": "23px"
                                            },
                                            children: "#SIGMALIFE #STAYBASED"
                                        })]
                                    })
                                }),
                                className: "framer-1mp5s5z hidden-15hurun",
                                fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                style: {
                                    rotate: 9
                                },
                                transformTemplate: Q,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            }), R() && c("div", {
                                className: "framer-ck8i2i hidden-15hurun",
                                "data-framer-name": "Frame 48096107",
                                name: "Frame 48096107",
                                children: [e(A, {
                                    href: "https://t.me/chadonbase",
                                    children: e(C.a, {
                                        className: "framer-11dj4jn framer-lux5qc",
                                        "data-framer-name": "Frame 48096106",
                                        name: "Frame 48096106",
                                        style: {
                                            rotate: -7
                                        },
                                        children: e(v, {
                                            background: {
                                                alt: "",
                                                fit: "fill",
                                                src: "https://framerusercontent.com/images/GfMjiNTITpRT0O4cscBv7JFQa8.png"
                                            },
                                            className: "framer-soluca",
                                            "data-framer-name": "icons8-tiktok-512 1",
                                            name: "icons8-tiktok-512 1",
                                            transformTemplate: w
                                        })
                                    })
                                }), e(A, {
                                    href: "https://twitter.com/chadsonbase",
                                    children: e(C.a, {
                                        className: "framer-8bw7w0 framer-lux5qc",
                                        "data-framer-name": "Frame 48096104",
                                        name: "Frame 48096104",
                                        style: {
                                            rotate: -2
                                        },
                                        children: e(v, {
                                            background: {
                                                alt: "",
                                                fit: "fill",
                                                sizes: "33.4286px",
                                                src: "https://framerusercontent.com/images/FUE1zo8A3HaN986MV69VQnyN4Yw.png",
                                                srcSet: "https://framerusercontent.com/images/FUE1zo8A3HaN986MV69VQnyN4Yw.png?scale-down-to=512 512w,https://framerusercontent.com/images/FUE1zo8A3HaN986MV69VQnyN4Yw.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/FUE1zo8A3HaN986MV69VQnyN4Yw.png 1500w"
                                            },
                                            className: "framer-99uekq",
                                            "data-framer-name": "icons8-discord-500 1",
                                            name: "icons8-discord-500 1",
                                            transformTemplate: w
                                        })
                                    })
                                })]
                            })]
                        }), c("div", {
                            className: "framer-1ue1p7u",
                            children: [c("div", {
                                className: "framer-3invbi",
                                children: [e(I, {
                                    breakpoint: o,
                                    overrides: {
                                        KDWX91tIU: {
                                            children: c(s, {
                                                children: [e("p", {
                                                    style: {
                                                        "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                        "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                        "--framer-font-size": "73px",
                                                        "--framer-text-alignment": "center",
                                                        "--framer-text-color": "rgb(255, 255, 255)"
                                                    },
                                                    children: "$BASED"
                                                }), e("p", {
                                                    style: {
                                                        "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                        "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                        "--framer-font-size": "73px",
                                                        "--framer-text-alignment": "center",
                                                        "--framer-text-color": "rgb(255, 255, 255)"
                                                    },
                                                    children: "CHAD"
                                                })]
                                            })
                                        }
                                    },
                                    children: e(d, {
                                        __fromCanvasComponent: !0,
                                        children: c(s, {
                                            children: [e("p", {
                                                style: {
                                                    "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                    "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                    "--framer-font-size": "90px",
                                                    "--framer-text-alignment": "center",
                                                    "--framer-text-color": "rgb(255, 255, 255)"
                                                },
                                                children: "$BASED"
                                            }), e("p", {
                                                style: {
                                                    "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                    "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                    "--framer-font-size": "90px",
                                                    "--framer-text-alignment": "center",
                                                    "--framer-text-color": "rgb(255, 255, 255)"
                                                },
                                                children: "CHAD"
                                            })]
                                        }),
                                        className: "framer-vb7g3o",
                                        fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                        verticalAlignment: "top",
                                        withExternalLayout: !0
                                    })
                                }), c("div", {
                                    className: "framer-noqezk",
                                    children: [e(v, {
                                        background: {
                                            alt: "",
                                            fit: "fill",
                                            intrinsicHeight: 2500,
                                            intrinsicWidth: 2500,
                                            pixelHeight: 2500,
                                            pixelWidth: 2500,
                                            sizes: "76px",
                                            src: "https://framerusercontent.com/images/urYlquXZlx3DBzgHMf96N91eNxQ.png",
                                            srcSet: "https://framerusercontent.com/images/urYlquXZlx3DBzgHMf96N91eNxQ.png?scale-down-to=512 512w,https://framerusercontent.com/images/urYlquXZlx3DBzgHMf96N91eNxQ.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/urYlquXZlx3DBzgHMf96N91eNxQ.png?scale-down-to=2048 2048w,https://framerusercontent.com/images/urYlquXZlx3DBzgHMf96N91eNxQ.png 2500w"
                                        },
                                        className: "framer-1559rh",
                                        "data-framer-name": "BASECHAIN_LOGO",
                                        name: "BASECHAIN_LOGO"
                                    }), e(I, {
                                        breakpoint: o,
                                        overrides: {
                                            KDWX91tIU: {
                                                children: e(s, {
                                                    children: e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "19px",
                                                            "--framer-text-color": "rgb(255, 255, 255)"
                                                        },
                                                        children: "Powered By Basechain"
                                                    })
                                                })
                                            }
                                        },
                                        children: e(d, {
                                            __fromCanvasComponent: !0,
                                            children: e(s, {
                                                children: e("p", {
                                                    style: {
                                                        "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                        "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                        "--framer-font-size": "21px",
                                                        "--framer-text-color": "rgb(255, 255, 255)"
                                                    },
                                                    children: "Powered By Basechain"
                                                })
                                            }),
                                            className: "framer-1u36i66",
                                            fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                            verticalAlignment: "top",
                                            withExternalLayout: !0
                                        })
                                    })]
                                })]
                            }), _() && c("div", {
                                className: "framer-a7vydz hidden-1i6nyat hidden-15hurun",
                                children: [e(v, {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 500,
                                        intrinsicWidth: 500,
                                        pixelHeight: 500,
                                        pixelWidth: 500,
                                        src: "https://framerusercontent.com/images/lCbCtymR9NyESP8uzUmiY9Cv9s.png"
                                    },
                                    className: "framer-6ombgt",
                                    "data-framer-name": "arrow",
                                    name: "arrow",
                                    transformTemplate: w
                                }), e(d, {
                                    __fromCanvasComponent: !0,
                                    children: e(s, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                "--framer-font-size": "19px",
                                                "--framer-text-alignment": "right"
                                            },
                                            children: "Best ticker brah."
                                        })
                                    }),
                                    className: "framer-13rbkcc",
                                    fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                    transformTemplate: w,
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                })]
                            })]
                        }), 
                        e(I, {
                            breakpoint: o,
                            overrides: {
                                KDWX91tIU: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2500,
                                        intrinsicWidth: 2500,
                                        pixelHeight: 2500,
                                        pixelWidth: 2500,
                                        sizes: "115px",
                                        src: "https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png",
                                        srcSet: "https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png?scale-down-to=512 512w,https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png?scale-down-to=2048 2048w,https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png 2500w"
                                    },
                                    transformTemplate: Q
                                },
                                rxJ8_y4tS: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2500,
                                        intrinsicWidth: 2500,
                                        pixelHeight: 2500,
                                        pixelWidth: 2500,
                                        sizes: "116px",
                                        src: "https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png",
                                        srcSet: "https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png?scale-down-to=512 512w,https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png?scale-down-to=2048 2048w,https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png 2500w"
                                    },
                                    transformTemplate: Q
                                },
                                VQKTpmpRz: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2500,
                                        intrinsicWidth: 2500,
                                        pixelHeight: 2500,
                                        pixelWidth: 2500,
                                        sizes: "485px",
                                        src: "https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png",
                                        srcSet: "https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png?scale-down-to=512 512w,https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png?scale-down-to=2048 2048w,https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png 2500w"
                                    }
                                },
                                zk2FBa2dy: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2500,
                                        intrinsicWidth: 2500,
                                        pixelHeight: 2500,
                                        pixelWidth: 2500,
                                        sizes: "485px",
                                        src: "https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png",
                                        srcSet: "https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png?scale-down-to=512 512w,https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png?scale-down-to=2048 2048w,https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png 2500w"
                                    }
                                }
                            },
                            children: e(v, {
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 2500,
                                    intrinsicWidth: 2500,
                                    pixelHeight: 2500,
                                    pixelWidth: 2500,
                                    sizes: "378px",
                                    src: "https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png",
                                    srcSet: "https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png?scale-down-to=512 512w,https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png?scale-down-to=2048 2048w,https://framerusercontent.com/images/TkZjRvy4rRMK8iFXS2AKzcMlmdI.png 2500w"
                                },
                                className: "framer-j3j88f",
                                "data-framer-name": "BASED_CHAD_LOGO",
                                name: "BASED_CHAD_LOGO",
                                transformTemplate: gr
                            })
                        }), e("div", {
                            className: "framer-ndbve8",
                            "data-border": !0,
                            children: e(Ne, {
                                children: e(Ae, {
                                    className: "framer-potn1g-container",
                                    children: e(ue, {
                                        alignment: "center",
                                        direction: "left",
                                        fadeOptions: {
                                            fadeAlpha: 0,
                                            fadeContent: !0,
                                            fadeInset: 0,
                                            fadeWidth: 0,
                                            overflow: !1
                                        },
                                        gap: 48,
                                        height: "100%",
                                        hoverFactor: 1,
                                        id: "N3NIq_JYd",
                                        layoutId: "N3NIq_JYd",
                                        padding: 10,
                                        paddingBottom: 10,
                                        paddingLeft: 10,
                                        paddingPerSide: !1,
                                        paddingRight: 10,
                                        paddingTop: 10,
                                        sizingOptions: {
                                            heightType: !0,
                                            widthType: !0
                                        },
                                        slots: [e(C.div, {
                                            className: "framer-ul0tli",
                                            children: e(d, {
                                                __fromCanvasComponent: !0,
                                                children: e(s, {
                                                    children: e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "35px"
                                                        },
                                                        children: "$BASED"
                                                    })
                                                }),
                                                className: "framer-1tv2zk4",
                                                fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                transformTemplate: w,
                                                verticalAlignment: "top",
                                                withExternalLayout: !0
                                            })
                                        }), e(C.div, {
                                            className: "framer-1cd1ycq",
                                            children: e(d, {
                                                __fromCanvasComponent: !0,
                                                children: e(s, {
                                                    children: e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "35px"
                                                        },
                                                        children: "$BASED"
                                                    })
                                                }),
                                                className: "framer-5ggt4v",
                                                fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                transformTemplate: w,
                                                verticalAlignment: "top",
                                                withExternalLayout: !0
                                            })
                                        }), e(C.div, {
                                            className: "framer-126ssn9",
                                            children: e(d, {
                                                __fromCanvasComponent: !0,
                                                children: e(s, {
                                                    children: e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "35px"
                                                        },
                                                        children: "$BASED"
                                                    })
                                                }),
                                                className: "framer-10wmga0",
                                                fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                transformTemplate: w,
                                                verticalAlignment: "top",
                                                withExternalLayout: !0
                                            })
                                        }), e(C.div, {
                                            className: "framer-ox9ux5",
                                            children: e(d, {
                                                __fromCanvasComponent: !0,
                                                children: e(s, {
                                                    children: e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "35px"
                                                        },
                                                        children: "$BASED"
                                                    })
                                                }),
                                                className: "framer-1inlchw",
                                                fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                transformTemplate: w,
                                                verticalAlignment: "top",
                                                withExternalLayout: !0
                                            })
                                        }), e(C.div, {
                                            className: "framer-xa1fao",
                                            children: e(d, {
                                                __fromCanvasComponent: !0,
                                                children: e(s, {
                                                    children: e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "35px"
                                                        },
                                                        children: "$BASED"
                                                    })
                                                }),
                                                className: "framer-eqksmq",
                                                fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                transformTemplate: w,
                                                verticalAlignment: "top",
                                                withExternalLayout: !0
                                            })
                                        }), e(C.div, {
                                            className: "framer-114fryi",
                                            children: e(d, {
                                                __fromCanvasComponent: !0,
                                                children: e(s, {
                                                    children: e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "35px"
                                                        },
                                                        children: "$BASED"
                                                    })
                                                }),
                                                className: "framer-puy6wz",
                                                fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                verticalAlignment: "top",
                                                withExternalLayout: !0
                                            })
                                        }), e(C.div, {
                                            className: "framer-poq7ar",
                                            children: e(d, {
                                                __fromCanvasComponent: !0,
                                                children: e(s, {
                                                    children: e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "35px"
                                                        },
                                                        children: "$BASED"
                                                    })
                                                }),
                                                className: "framer-15mb6fj",
                                                fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                transformTemplate: w,
                                                verticalAlignment: "top",
                                                withExternalLayout: !0
                                            })
                                        }), e(C.div, {
                                            className: "framer-n3aozb",
                                            children: e(d, {
                                                __fromCanvasComponent: !0,
                                                children: e(s, {
                                                    children: e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "35px"
                                                        },
                                                        children: "$BASED"
                                                    })
                                                }),
                                                className: "framer-1f4wbrk",
                                                fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                transformTemplate: w,
                                                verticalAlignment: "top",
                                                withExternalLayout: !0
                                            })
                                        }), e(C.div, {
                                            className: "framer-1wrnaqx",
                                            children: e(d, {
                                                __fromCanvasComponent: !0,
                                                children: e(s, {
                                                    children: e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "35px"
                                                        },
                                                        children: "$BASED"
                                                    })
                                                }),
                                                className: "framer-1s1kerc",
                                                fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                transformTemplate: w,
                                                verticalAlignment: "top",
                                                withExternalLayout: !0
                                            })
                                        }), e(C.div, {
                                            className: "framer-poq7ar",
                                            children: e(d, {
                                                __fromCanvasComponent: !0,
                                                children: e(s, {
                                                    children: e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "35px"
                                                        },
                                                        children: "$BASED"
                                                    })
                                                }),
                                                className: "framer-15mb6fj",
                                                fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                transformTemplate: w,
                                                verticalAlignment: "top",
                                                withExternalLayout: !0
                                            })
                                        })],
                                        speed: 100,
                                        style: {
                                            height: "100%",
                                            width: "100%"
                                        },
                                        width: "100%"
                                    })
                                })
                            })
                        })]
                    }), c("div", {
                        className: "framer-tzckox",
                        "data-border": !0,
                        children: [M() && c("div", {
                            className: "framer-hw3891 hidden-72rtr7 hidden-1i6nyat hidden-15hurun",
                            children: [M() && e(d, {
                                __fromCanvasComponent: !0,
                                children: e(s, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                            "--framer-font-size": "21px",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: "Buy from Coinbase wallet"
                                    })
                                }),
                                className: "framer-1ef292c hidden-72rtr7",
                                fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                transformTemplate: Q,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            }), M() && e(Ne, {
                                children: e(Ae, {
                                    className: "framer-1hucz9n-container hidden-72rtr7",
                                    children: e(we, {
                                        backgroundColor: "rgba(0, 0, 0, 0)",
                                        borderRadius: 0,
                                        bottomLeftRadius: 0,
                                        bottomRightRadius: 0,
                                        controls: !1,
                                        height: "100%",
                                        id: "vkYuxGsva",
                                        isMixedBorderRadius: !1,
                                        layoutId: "vkYuxGsva",
                                        loop: !0,
                                        muted: !1,
                                        objectFit: "fill",
                                        playing: !0,
                                        posterEnabled: !1,
                                        srcFile: "https://framerusercontent.com/assets/cnYOx1sAEQkodyhHVGGGvGzG2s.mp4",
                                        srcType: "Upload",
                                        srcUrl: "https://assets.mixkit.co/videos/preview/mixkit-shining-sun-in-the-sky-surrounded-by-moving-clouds-31793-small.mp4",
                                        startTime: 12,
                                        style: {
                                            height: "100%",
                                            width: "100%"
                                        },
                                        topLeftRadius: 0,
                                        topRightRadius: 0,
                                        volume: 25,
                                        width: "100%"
                                    })
                                })
                            })]
                        }), e("div", {
                            className: "framer-1y8zvia",
                            children: c("div", {
                                className: "framer-19zq74v",
                                children: [j() && e(d, {
                                    __fromCanvasComponent: !0,
                                    children: e(s, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                "--framer-font-size": "28px",
                                                "--framer-text-color": "rgb(255, 255, 255)"
                                            },
                                            children: "..stfu just buy it here"
                                        })
                                    }),
                                    className: "framer-1nytobq hidden-72rtr7 hidden-15hurun hidden-19x8ari hidden-k4kk23",
                                    fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                    transformTemplate: Q,
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(I, {
                                    breakpoint: o,
                                    overrides: {
                                        KDWX91tIU: {
                                            children: e(s, {
                                                children: e("p", {
                                                    style: {
                                                        "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                        "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                        "--framer-font-size": "41px",
                                                        "--framer-text-color": "rgb(255, 255, 255)"
                                                    },
                                                    children: "Wen Binance?"
                                                })
                                            }),
                                            transformTemplate: Q
                                        },
                                        rxJ8_y4tS: {
                                            transformTemplate: Q
                                        }
                                    },
                                    children: e(d, {
                                        __fromCanvasComponent: !0,
                                        children: e(s, {
                                            children: e("p", {
                                                style: {
                                                    "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                    "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                    "--framer-font-size": "87px",
                                                    "--framer-text-color": "rgb(255, 255, 255)"
                                                },
                                                children: "Wen Binance?"
                                            })
                                        }),
                                        className: "framer-g1ga2r",
                                        fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                        transformTemplate: w,
                                        verticalAlignment: "top",
                                        withExternalLayout: !0
                                    })
                                }), _() && e(d, {
                                    __fromCanvasComponent: !0,
                                    children: e(s, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                "--framer-font-size": "31px",
                                                "--framer-text-color": "rgb(255, 255, 255)"
                                            },
                                            children: "..stfu just buy it here"
                                        })
                                    }),
                                    className: "framer-udwwa9 hidden-1i6nyat hidden-15hurun",
                                    fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                    transformTemplate: w,
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                })]
                            })
                        }), O() && e(d, {
                            __fromCanvasComponent: !0,
                            children: e(s, {
                                children: e("p", {
                                    style: {
                                        "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                        "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                        "--framer-font-size": "25px",
                                        "--framer-text-color": "rgb(255, 255, 255)"
                                    },
                                    children: "..stfu just buy it here"
                                })
                            }),
                            className: "framer-d5c9bk hidden-72rtr7 hidden-1i6nyat hidden-19x8ari hidden-k4kk23",
                            fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                            transformTemplate: w,
                            verticalAlignment: "top",
                            withExternalLayout: !0
                        }), c("div", {
                            className: "framer-qz37kz",
                            children: [D() && e("div", {
                                className: "framer-iiv7zk hidden-1i6nyat",
                                children: R() && c("div", {
                                    className: "framer-13diddb hidden-15hurun",
                                    children: [e(d, {
                                        __fromCanvasComponent: !0,
                                        children: e(s, {
                                            children: e("p", {
                                                style: {
                                                    "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                    "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                    "--framer-font-size": "18.5px",
                                                    "--framer-letter-spacing": "-0.1em"
                                                },
                                                children: "-OXFORD DICTIONARY"
                                            })
                                        }),
                                        className: "framer-16frv28",
                                        fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                        verticalAlignment: "top",
                                        withExternalLayout: !0
                                    }), e(I, {
                                        breakpoint: o,
                                        overrides: {
                                            VQKTpmpRz: {
                                                children: c(s, {
                                                    children: [e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "23.5px",
                                                            "--framer-letter-spacing": "-2px",
                                                            "--framer-line-height": "1.3em",
                                                            "--framer-text-alignment": "center",
                                                            "--framer-text-color": "rgb(130, 208, 245)"
                                                        },
                                                        children: "\u201CJEET (NOUN) - PERSON WITH LOW IQ THAT PANIC SELLS AT THE"
                                                    }), e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "23.5px",
                                                            "--framer-letter-spacing": "-2px",
                                                            "--framer-line-height": "1.3em",
                                                            "--framer-text-alignment": "center",
                                                            "--framer-text-color": "rgb(130, 208, 245)"
                                                        },
                                                        children: "SLIGHTEST DIP, FUDS HIS OWN BAGS AND NEVER GETS A PUSSY WET -"
                                                    }), e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "23.5px",
                                                            "--framer-letter-spacing": "-2px",
                                                            "--framer-line-height": "1.3em",
                                                            "--framer-text-alignment": "center",
                                                            "--framer-text-color": "rgb(130, 208, 245)"
                                                        },
                                                        children: "OFTEN STARTS HIS SENTENCES WITH \u2018WEN\u2019)"
                                                    })]
                                                })
                                            },
                                            zk2FBa2dy: {
                                                children: c(s, {
                                                    children: [e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "23.5px",
                                                            "--framer-letter-spacing": "-2px",
                                                            "--framer-line-height": "1.3em",
                                                            "--framer-text-alignment": "center",
                                                            "--framer-text-color": "rgb(130, 208, 245)"
                                                        },
                                                        children: "\u201CJEET (NOUN) - PERSON WITH LOW IQ THAT PANIC SELLS AT THE"
                                                    }), e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "23.5px",
                                                            "--framer-letter-spacing": "-2px",
                                                            "--framer-line-height": "1.3em",
                                                            "--framer-text-alignment": "center",
                                                            "--framer-text-color": "rgb(130, 208, 245)"
                                                        },
                                                        children: "SLIGHTEST DIP, FUDS HIS OWN BAGS AND NEVER GETS A PUSSY WET -"
                                                    }), e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "23.5px",
                                                            "--framer-letter-spacing": "-2px",
                                                            "--framer-line-height": "1.3em",
                                                            "--framer-text-alignment": "center",
                                                            "--framer-text-color": "rgb(130, 208, 245)"
                                                        },
                                                        children: "OFTEN STARTS HIS SENTENCES WITH \u2018WEN\u2019)"
                                                    })]
                                                })
                                            }
                                        },
                                        children: e(d, {
                                            __fromCanvasComponent: !0,
                                            children: c(s, {
                                                children: [e("p", {
                                                    style: {
                                                        "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                        "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                        "--framer-font-size": "23.5px",
                                                        "--framer-letter-spacing": "-0.1em",
                                                        "--framer-text-alignment": "center",
                                                        "--framer-text-color": "rgb(130, 208, 245)"
                                                    },
                                                    children: "\u201CJEET (NOUN) - PERSON WITH LOW IQ THAT PANIC SELLS AT THE"
                                                }), e("p", {
                                                    style: {
                                                        "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                        "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                        "--framer-font-size": "23.5px",
                                                        "--framer-letter-spacing": "-0.1em",
                                                        "--framer-text-alignment": "center",
                                                        "--framer-text-color": "rgb(130, 208, 245)"
                                                    },
                                                    children: "SLIGHTEST DIP, FUDS HIS OWN BAGS AND NEVER GETS A PUSSY WET -"
                                                }), e("p", {
                                                    style: {
                                                        "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                        "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                        "--framer-font-size": "23.5px",
                                                        "--framer-letter-spacing": "-0.1em",
                                                        "--framer-text-alignment": "center",
                                                        "--framer-text-color": "rgb(130, 208, 245)"
                                                    },
                                                    children: "OFTEN STARTS HIS SENTENCES WITH \u2018WEN\u2019)"
                                                })]
                                            }),
                                            className: "framer-dfsbiy",
                                            fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                            transformTemplate: Q,
                                            verticalAlignment: "top",
                                            withExternalLayout: !0
                                        })
                                    }), e(v, {
                                        background: {
                                            alt: "",
                                            fit: "fill",
                                            intrinsicHeight: 1e3,
                                            intrinsicWidth: 1e3,
                                            loading: "lazy",
                                            pixelHeight: 1e3,
                                            pixelWidth: 1e3,
                                            sizes: "89px",
                                            src: "https://framerusercontent.com/images/ZgFqGxIkPiUcv4kdYt9RxsTHI.png",
                                            srcSet: "https://framerusercontent.com/images/ZgFqGxIkPiUcv4kdYt9RxsTHI.png?scale-down-to=512 512w,https://framerusercontent.com/images/ZgFqGxIkPiUcv4kdYt9RxsTHI.png 1000w"
                                        },
                                        className: "framer-1oaziqu",
                                        "data-framer-name": "arrow_1_",
                                        name: "arrow_1_"
                                    })]
                                })
                            }), e(I, {
                                breakpoint: o,
                                overrides: {
                                    KDWX91tIU: {
                                        background: {
                                            alt: "",
                                            fit: "fill",
                                            intrinsicHeight: 2e3,
                                            intrinsicWidth: 2e3,
                                            loading: "lazy",
                                            pixelHeight: 2e3,
                                            pixelWidth: 2e3,
                                            src: "https://framerusercontent.com/images/qx5PipI4GqJSmk2RQEsCFdZ7XbQ.png"
                                        }
                                    },
                                    rxJ8_y4tS: {
                                        background: {
                                            alt: "",
                                            fit: "fill",
                                            intrinsicHeight: 2e3,
                                            intrinsicWidth: 2e3,
                                            loading: "lazy",
                                            pixelHeight: 2e3,
                                            pixelWidth: 2e3,
                                            src: "https://framerusercontent.com/images/qx5PipI4GqJSmk2RQEsCFdZ7XbQ.png"
                                        }
                                    }
                                },
                                children: e(v, {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2e3,
                                        intrinsicWidth: 2e3,
                                        pixelHeight: 2e3,
                                        pixelWidth: 2e3,
                                        src: "https://framerusercontent.com/images/qx5PipI4GqJSmk2RQEsCFdZ7XbQ.png"
                                    },
                                    className: "framer-1ccrs0g",
                                    "data-framer-name": "Jeet_right_side",
                                    name: "Jeet_right_side"
                                })
                            })]
                        })]
                    }), c("div", {
                        className: "framer-1gic54t",
                        children: [e("div", {
                            className: "framer-5un6pk",
                            children: c("div", {
                                className: "framer-1vgku7w",
                                children: [e(I, {
                                    breakpoint: o,
                                    overrides: {
                                        KDWX91tIU: {
                                            children: e(s, {
                                                children: e("p", {
                                                    style: {
                                                        "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                        "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                        "--framer-font-size": "58px",
                                                        "--framer-letter-spacing": "-0.09em",
                                                        "--framer-line-height": "1.3em",
                                                        "--framer-text-color": "rgb(255, 255, 255)"
                                                    },
                                                    children: "Tokenomics"
                                                })
                                            })
                                        }
                                    },
                                    children: e(d, {
                                        __fromCanvasComponent: !0,
                                        children: e(s, {
                                            children: e("p", {
                                                style: {
                                                    "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                    "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                    "--framer-font-size": "71px",
                                                    "--framer-letter-spacing": "-0.09em",
                                                    "--framer-line-height": "1.3em",
                                                    "--framer-text-color": "rgb(255, 255, 255)"
                                                },
                                                children: "Tokenomics"
                                            })
                                        }),
                                        className: "framer-1rl5sld",
                                        fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                        verticalAlignment: "top",
                                        withExternalLayout: !0
                                    })
                                }), 
                                 c("div", {
                                    className: "framer-d6ysfz",
                                    children: [e(I, {
                                        breakpoint: o,
                                        overrides: {
                                            VQKTpmpRz: {
                                                children: e(s, {
                                                    children: e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "35px",
                                                            "--framer-line-height": "1.3em",
                                                            "--framer-text-color": "rgb(255, 255, 255)"
                                                        },
                                                        children: "Total Tokens"
                                                    })
                                                })
                                            },
                                            zk2FBa2dy: {
                                                children: e(s, {
                                                    children: e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "35px",
                                                            "--framer-line-height": "1.3em",
                                                            "--framer-text-color": "rgb(255, 255, 255)"
                                                        },
                                                        children: "Total Tokens"
                                                    })
                                                })
                                            }
                                        },
                                        children: e(d, {
                                            __fromCanvasComponent: !0,
                                            children: e(s, {
                                                children: e("p", {
                                                    style: {
                                                        "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                        "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                        "--framer-font-size": "30px",
                                                        "--framer-letter-spacing": "-0.09em",
                                                        "--framer-line-height": "1.3em",
                                                        "--framer-text-color": "rgb(255, 255, 255)"
                                                    },
                                                    children: "Total Tokens"
                                                })
                                            }),
                                            className: "framer-1unlfdd",
                                            fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                            verticalAlignment: "top",
                                            withExternalLayout: !0
                                        })
                                    }), e(d, {
                                        __fromCanvasComponent: !0,
                                        children: e(s, {
                                            children: e("p", {
                                                style: {
                                                    "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                    "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                    "--framer-font-size": "38px",
                                                    "--framer-letter-spacing": "-0.09em",
                                                    "--framer-line-height": "1.3em",
                                                    "--framer-text-color": "rgb(255, 255, 255)"
                                                },
                                                children: "1,000,000,000"
                                            })
                                        }),
                                        className: "framer-1ox3x54",
                                        fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                        verticalAlignment: "top",
                                        withExternalLayout: !0
                                    }), e(d, {
                                        __fromCanvasComponent: !0,
                                        children: e(s, {
                                            children: e("p", {
                                                style: {
                                                    "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                    "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                    "--framer-font-size": "20px",
                                                    "--framer-letter-spacing": "-0.09em",
                                                    "--framer-line-height": "1.3em",
                                                    "--framer-text-color": "rgb(255, 255, 255)"
                                                },
                                                children: "100% in curculation!"
                                            })
                                        }),
                                        className: "framer-1m94brv",
                                        fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                        verticalAlignment: "top",
                                        withExternalLayout: !0
                                    })]
                                }), c("div", {
                                    className: "framer-1b6phjo",
                                    children: [e(I, {
                                        breakpoint: o,
                                        overrides: {
                                            VQKTpmpRz: {
                                                children: e(s, {
                                                    children: e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "30px",
                                                            "--framer-line-height": "1.3em",
                                                            "--framer-text-color": "rgb(255, 255, 255)"
                                                        },
                                                        children: "Price target"
                                                    })
                                                })
                                            },
                                            zk2FBa2dy: {
                                                children: e(s, {
                                                    children: e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "30px",
                                                            "--framer-line-height": "1.3em",
                                                            "--framer-text-color": "rgb(255, 255, 255)"
                                                        },
                                                        children: "Price target"
                                                    })
                                                })
                                            }
                                        },
                                        children: e(d, {
                                            __fromCanvasComponent: !0,
                                            children: e(s, {
                                                children: e("p", {
                                                    style: {
                                                        "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                        "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                        "--framer-font-size": "30px",
                                                        "--framer-letter-spacing": "-0.09em",
                                                        "--framer-line-height": "1.3em",
                                                        "--framer-text-color": "rgb(255, 255, 255)"
                                                    },
                                                    children: "Price target"
                                                })
                                            }),
                                            className: "framer-1s6jfyh",
                                            fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                            verticalAlignment: "top",
                                            withExternalLayout: !0
                                        })
                                    }), e(d, {
                                        __fromCanvasComponent: !0,
                                        children: e(s, {
                                            children: e("p", {
                                                style: {
                                                    "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                    "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                    "--framer-font-size": "20px",
                                                    "--framer-letter-spacing": "-0.09em",
                                                    "--framer-line-height": "1.3em",
                                                    "--framer-text-color": "rgb(255, 255, 255)"
                                                },
                                                children: "1$ = 1$Based"
                                            })
                                        }),
                                        className: "framer-1do5suk",
                                        fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                        verticalAlignment: "top",
                                        withExternalLayout: !0
                                    })]
                                }), c("div", {
                                    className: "framer-2w5f1p",
                                    children: [e(d, {
                                        __fromCanvasComponent: !0,
                                        children: e(s, {
                                            children: e("p", {
                                                style: {
                                                    "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                    "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                    "--framer-font-size": "30px",
                                                    "--framer-letter-spacing": "-0.09em",
                                                    "--framer-line-height": "1.3em",
                                                    "--framer-text-color": "rgb(255, 255, 255)"
                                                },
                                                children: "contract address"
                                            })
                                        }),
                                        className: "framer-x40kj6",
                                        fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                        verticalAlignment: "top",
                                        withExternalLayout: !0
                                    }), e(I, {
                                        breakpoint: o,
                                        overrides: {
                                            KDWX91tIU: {
                                                children: e(s, {
                                                    children: e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "14.5px",
                                                            "--framer-letter-spacing": "-0.09em",
                                                            "--framer-line-height": "1.3em",
                                                            "--framer-text-color": "rgb(255, 255, 255)"
                                                        },
                                                        children: "0x..."
                                                    })
                                                })
                                            },
                                            rxJ8_y4tS: {
                                                children: e(s, {
                                                    children: e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "18px",
                                                            "--framer-line-height": "1.3em",
                                                            "--framer-text-color": "rgb(255, 255, 255)"
                                                        },
                                                        children: "0x..."
                                                    })
                                                })
                                            },
                                            VQKTpmpRz: {
                                                children: e(s, {
                                                    children: e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "18px",
                                                            "--framer-line-height": "1.3em",
                                                            "--framer-text-color": "rgb(255, 255, 255)"
                                                        },
                                                        children: "0x..."
                                                    })
                                                })
                                            },
                                            zk2FBa2dy: {
                                                children: e(s, {
                                                    children: e("p", {
                                                        style: {
                                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                            "--framer-font-size": "18px",
                                                            "--framer-line-height": "1.3em",
                                                            "--framer-text-color": "rgb(255, 255, 255)"
                                                        },
                                                        children: "0x..."
                                                    })
                                                })
                                            }
                                        },
                                        children: e(d, {
                                            __fromCanvasComponent: !0,
                                            children: e(s, {
                                                children: e("p", {
                                                    style: {
                                                        "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                        "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                        "--framer-font-size": "18px",
                                                        "--framer-letter-spacing": "-0.09em",
                                                        "--framer-line-height": "1.3em",
                                                        "--framer-text-color": "rgb(255, 255, 255)"
                                                    },
                                                    children: "0x..."
                                                })
                                            }),
                                            className: "framer-1ca2h4p",
                                            fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                            verticalAlignment: "top",
                                            withExternalLayout: !0
                                        })
                                    })]
                                })]
                            })
                        }), _() && e(v, {
                            background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1080,
                                intrinsicWidth: 1920,
                                loading: "lazy",
                                pixelHeight: 949,
                                pixelWidth: 1920,
                                sizes: "99.8519vw",
                                src: "https://framerusercontent.com/images/igstOx8xg1KW8SntddjX03oJ9eU.png",
                                srcSet: "https://framerusercontent.com/images/igstOx8xg1KW8SntddjX03oJ9eU.png?scale-down-to=512 512w,https://framerusercontent.com/images/igstOx8xg1KW8SntddjX03oJ9eU.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/igstOx8xg1KW8SntddjX03oJ9eU.png 1920w"
                            },
                            className: "framer-1xpwta7 hidden-1i6nyat hidden-15hurun",
                            "data-framer-name": "wher_nft_ser_1920_x_1080_px_",
                            name: "wher_nft_ser_1920_x_1080_px_",
                            transformTemplate: Q
                        })]
                    }), c("header", {
                        className: "framer-1ohu3vo",
                        "data-framer-name": "Header",
                        name: "Header",
                        children: [e("div", {
                            className: "framer-1uk23to",
                            children: c("div", {
                                className: "framer-10emvsp",
                                children: [e(I, {
                                    breakpoint: o,
                                    overrides: {
                                        KDWX91tIU: {
                                            children: c(s, {
                                                children: [e("p", {
                                                    style: {
                                                        "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                        "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                        "--framer-font-size": "14px",
                                                        "--framer-text-alignment": "center",
                                                        "--framer-text-color": "rgb(255, 255, 255)"
                                                    },
                                                    children: "Stake $BASED Tokens/NFT to Earn Up to"
                                                }), e("p", {
                                                    style: {
                                                        "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                        "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                        "--framer-font-size": "14px",
                                                        "--framer-text-alignment": "center",
                                                        "--framer-text-color": "rgb(237, 181, 32)"
                                                    },
                                                    children: "20% APR"
                                                })]
                                            })
                                        }
                                    },
                                    children: e(d, {
                                        __fromCanvasComponent: !0,
                                        children: c(s, {
                                            children: [e("p", {
                                                style: {
                                                    "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                    "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                    "--framer-font-size": "23px",
                                                    "--framer-text-alignment": "center",
                                                    "--framer-text-color": "rgb(255, 255, 255)"
                                                },
                                                children: "Stake $BASED Tokens/NFT to Earn Up to"
                                            }), e("p", {
                                                style: {
                                                    "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                    "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                    "--framer-font-size": "23px",
                                                    "--framer-text-alignment": "center",
                                                    "--framer-text-color": "rgb(237, 181, 32)"
                                                },
                                                children: "20% APR"
                                            })]
                                        }),
                                        className: "framer-u17thb",
                                        fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                        verticalAlignment: "top",
                                        withExternalLayout: !0
                                    })
                                }), e(I, {
                                    breakpoint: o,
                                    overrides: {
                                        KDWX91tIU: {
                                            children: c(s, {
                                                children: [c("p", {
                                                    style: {
                                                        "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                        "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                        "--framer-font-size": "14px",
                                                        "--framer-text-alignment": "center",
                                                        "--framer-text-color": "rgb(237, 181, 32)"
                                                    },
                                                    children: [e("span", {
                                                        style: {
                                                            "--framer-text-color": "rgb(255, 255, 255)"
                                                        },
                                                        children: "it's easy to "
                                                    }), "bridge from other networks"]
                                                }), e("p", {
                                                    style: {
                                                        "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                        "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                        "--framer-font-size": "14px",
                                                        "--framer-text-alignment": "center",
                                                        "--framer-text-color": "rgb(255, 255, 255)"
                                                    },
                                                    children: "so you can ape instantly."
                                                }), c("p", {
                                                    style: {
                                                        "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                        "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                        "--framer-font-size": "14px",
                                                        "--framer-text-alignment": "center",
                                                        "--framer-text-color": "rgb(255, 255, 255)"
                                                    },
                                                    children: ["you ", e("span", {
                                                        style: {
                                                            "--framer-text-decoration": "underline"
                                                        },
                                                        children: "filthy degenerate"
                                                    })]
                                                })]
                                            })
                                        }
                                    },
                                    children: e(d, {
                                        __fromCanvasComponent: !0,
                                        children: c(s, {
                                            children: [c("p", {
                                                style: {
                                                    "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                    "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                    "--framer-font-size": "23px",
                                                    "--framer-text-alignment": "center",
                                                    "--framer-text-color": "rgb(237, 181, 32)"
                                                },
                                                children: [e("span", {
                                                    style: {
                                                        "--framer-text-color": "rgb(255, 255, 255)"
                                                    },
                                                    children: "it's easy to "
                                                }), "bridge from other networks"]
                                            }), e("p", {
                                                style: {
                                                    "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                    "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                    "--framer-font-size": "23px",
                                                    "--framer-text-alignment": "center",
                                                    "--framer-text-color": "rgb(255, 255, 255)"
                                                },
                                                children: "so you can ape instantly."
                                            }), c("p", {
                                                style: {
                                                    "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                    "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                    "--framer-font-size": "23px",
                                                    "--framer-text-alignment": "center",
                                                    "--framer-text-color": "rgb(255, 255, 255)"
                                                },
                                                children: ["you ", e("span", {
                                                    style: {
                                                        "--framer-text-decoration": "underline"
                                                    },
                                                    children: "filthy degenerate"
                                                })]
                                            })]
                                        }),
                                        className: "framer-m84b5a",
                                        fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                        verticalAlignment: "top",
                                        withExternalLayout: !0
                                    })
                                }), 
                                ]
                            })
                        }), e(I, {
                            breakpoint: o,
                            overrides: {
                                KDWX91tIU: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 838,
                                        intrinsicWidth: 2e3,
                                        loading: "lazy",
                                        pixelHeight: 838,
                                        pixelWidth: 2e3,
                                        sizes: "340px",
                                        src: "https://framerusercontent.com/images/JtgyzXMA09bfPM5LTzi93449XzY.png",
                                        srcSet: "https://framerusercontent.com/images/JtgyzXMA09bfPM5LTzi93449XzY.png?scale-down-to=512 512w,https://framerusercontent.com/images/JtgyzXMA09bfPM5LTzi93449XzY.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/JtgyzXMA09bfPM5LTzi93449XzY.png 2000w"
                                    }
                                },
                                rxJ8_y4tS: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 838,
                                        intrinsicWidth: 2e3,
                                        loading: "lazy",
                                        pixelHeight: 838,
                                        pixelWidth: 2e3,
                                        sizes: "670px",
                                        src: "https://framerusercontent.com/images/JtgyzXMA09bfPM5LTzi93449XzY.png",
                                        srcSet: "https://framerusercontent.com/images/JtgyzXMA09bfPM5LTzi93449XzY.png?scale-down-to=512 512w,https://framerusercontent.com/images/JtgyzXMA09bfPM5LTzi93449XzY.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/JtgyzXMA09bfPM5LTzi93449XzY.png 2000w"
                                    }
                                }
                            },
                            children: e(v, {
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 838,
                                    intrinsicWidth: 2e3,
                                    loading: "lazy",
                                    pixelHeight: 838,
                                    pixelWidth: 2e3,
                                    sizes: "701px",
                                    src: "https://framerusercontent.com/images/JtgyzXMA09bfPM5LTzi93449XzY.png",
                                    srcSet: "https://framerusercontent.com/images/JtgyzXMA09bfPM5LTzi93449XzY.png?scale-down-to=512 512w,https://framerusercontent.com/images/JtgyzXMA09bfPM5LTzi93449XzY.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/JtgyzXMA09bfPM5LTzi93449XzY.png 2000w"
                                },
                                className: "framer-e9u6qe",
                                "data-framer-name": "Chad_bottom_1_1_1_",
                                name: "Chad_bottom_1_1_1_",
                                transformTemplate: Q
                            })
                        })]
                    }), c("header", {
                        className: "framer-19qcoy8",
                        "data-framer-name": "Header",
                        name: "Header",
                        children: [e(I, {
                            breakpoint: o,
                            overrides: {
                                KDWX91tIU: {
                                    children: e(s, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                "--framer-font-size": "41px",
                                                "--framer-text-color": "rgb(255, 255, 255)"
                                            },
                                            children: "Wen nft ser?"
                                        })
                                    })
                                },
                                rxJ8_y4tS: {
                                    children: e(s, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                "--framer-font-size": "55px",
                                                "--framer-text-color": "rgb(255, 255, 255)"
                                            },
                                            children: "Wen nft ser?"
                                        })
                                    })
                                }
                            },
                            children: e(d, {
                                __fromCanvasComponent: !0,
                                children: e(s, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                            "--framer-font-size": "67px",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: "Wen nft ser?"
                                    })
                                }),
                                className: "framer-5idwqh",
                                fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), c("div", {
                            className: "framer-12r6qvw",
                            children: [e(I, {
                                breakpoint: o,
                                overrides: {
                                    KDWX91tIU: {
                                        background: {
                                            alt: "",
                                            fit: "fill",
                                            intrinsicHeight: 2e3,
                                            intrinsicWidth: 2e3,
                                            loading: "lazy",
                                            pixelHeight: 2e3,
                                            pixelWidth: 2e3,
                                            sizes: "170px",
                                            src: "https://framerusercontent.com/images/LUnFL38L5me5sPtZLMUzM1lI8.png",
                                            srcSet: "https://framerusercontent.com/images/LUnFL38L5me5sPtZLMUzM1lI8.png?scale-down-to=512 512w,https://framerusercontent.com/images/LUnFL38L5me5sPtZLMUzM1lI8.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/LUnFL38L5me5sPtZLMUzM1lI8.png 2000w"
                                        }
                                    },
                                    rxJ8_y4tS: {
                                        background: {
                                            alt: "",
                                            fit: "fill",
                                            intrinsicHeight: 2e3,
                                            intrinsicWidth: 2e3,
                                            loading: "lazy",
                                            pixelHeight: 2e3,
                                            pixelWidth: 2e3,
                                            sizes: "186px",
                                            src: "https://framerusercontent.com/images/LUnFL38L5me5sPtZLMUzM1lI8.png",
                                            srcSet: "https://framerusercontent.com/images/LUnFL38L5me5sPtZLMUzM1lI8.png?scale-down-to=512 512w,https://framerusercontent.com/images/LUnFL38L5me5sPtZLMUzM1lI8.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/LUnFL38L5me5sPtZLMUzM1lI8.png 2000w"
                                        }
                                    }
                                },
                                children: e(v, {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2e3,
                                        intrinsicWidth: 2e3,
                                        loading: "lazy",
                                        pixelHeight: 2e3,
                                        pixelWidth: 2e3,
                                        sizes: "250px",
                                        src: "https://framerusercontent.com/images/LUnFL38L5me5sPtZLMUzM1lI8.png",
                                        srcSet: "https://framerusercontent.com/images/LUnFL38L5me5sPtZLMUzM1lI8.png?scale-down-to=512 512w,https://framerusercontent.com/images/LUnFL38L5me5sPtZLMUzM1lI8.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/LUnFL38L5me5sPtZLMUzM1lI8.png 2000w"
                                    },
                                    className: "framer-e40ou4",
                                    "data-framer-name": "nft_1",
                                    name: "nft_1"
                                })
                            }), e(I, {
                                breakpoint: o,
                                overrides: {
                                    KDWX91tIU: {
                                        background: {
                                            alt: "",
                                            fit: "fill",
                                            intrinsicHeight: 2e3,
                                            intrinsicWidth: 2e3,
                                            loading: "lazy",
                                            pixelHeight: 2e3,
                                            pixelWidth: 2e3,
                                            sizes: "170px",
                                            src: "https://framerusercontent.com/images/Mf99O7x1xriRSFWrzMhLTs1m8.png",
                                            srcSet: "https://framerusercontent.com/images/Mf99O7x1xriRSFWrzMhLTs1m8.png?scale-down-to=512 512w,https://framerusercontent.com/images/Mf99O7x1xriRSFWrzMhLTs1m8.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/Mf99O7x1xriRSFWrzMhLTs1m8.png 2000w"
                                        }
                                    },
                                    rxJ8_y4tS: {
                                        background: {
                                            alt: "",
                                            fit: "fill",
                                            intrinsicHeight: 2e3,
                                            intrinsicWidth: 2e3,
                                            loading: "lazy",
                                            pixelHeight: 2e3,
                                            pixelWidth: 2e3,
                                            sizes: "186px",
                                            src: "https://framerusercontent.com/images/Mf99O7x1xriRSFWrzMhLTs1m8.png",
                                            srcSet: "https://framerusercontent.com/images/Mf99O7x1xriRSFWrzMhLTs1m8.png?scale-down-to=512 512w,https://framerusercontent.com/images/Mf99O7x1xriRSFWrzMhLTs1m8.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/Mf99O7x1xriRSFWrzMhLTs1m8.png 2000w"
                                        }
                                    }
                                },
                                children: e(v, {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2e3,
                                        intrinsicWidth: 2e3,
                                        loading: "lazy",
                                        pixelHeight: 2e3,
                                        pixelWidth: 2e3,
                                        sizes: "250px",
                                        src: "https://framerusercontent.com/images/Mf99O7x1xriRSFWrzMhLTs1m8.png",
                                        srcSet: "https://framerusercontent.com/images/Mf99O7x1xriRSFWrzMhLTs1m8.png?scale-down-to=512 512w,https://framerusercontent.com/images/Mf99O7x1xriRSFWrzMhLTs1m8.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/Mf99O7x1xriRSFWrzMhLTs1m8.png 2000w"
                                    },
                                    className: "framer-3qyzg1",
                                    "data-framer-name": "nft_1",
                                    name: "nft_1"
                                })
                            })]
                        }), e(I, {
                            breakpoint: o,
                            overrides: {
                                rxJ8_y4tS: {
                                    children: c(s, {
                                        children: [e("p", {
                                            style: {
                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-text-alignment": "center"
                                            },
                                            children: "get access to ALPHA AIRDROP GROUP"
                                        }), e("p", {
                                            style: {
                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-text-alignment": "center"
                                            },
                                            children: "& GET FILTHY RICH LIKE A"
                                        }), e("p", {
                                            style: {
                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-text-alignment": "center"
                                            },
                                            children: "REAL SIGMA chad."
                                        })]
                                    })
                                }
                            },
                            children: e(d, {
                                __fromCanvasComponent: !0,
                                children: c(s, {
                                    children: [e("p", {
                                        style: {
                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                            "--framer-font-size": "14px",
                                            "--framer-text-alignment": "center"
                                        },
                                        children: "get access to ALPHA AIRDROP GROUP"
                                    }), e("p", {
                                        style: {
                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                            "--framer-font-size": "14px",
                                            "--framer-text-alignment": "center"
                                        },
                                        children: "& GET FILTHY RICH LIKE A"
                                    }), e("p", {
                                        style: {
                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                            "--framer-font-size": "14px",
                                            "--framer-text-alignment": "center"
                                        },
                                        children: "REAL SIGMA chad."
                                    })]
                                }),
                                className: "framer-7l3jrg",
                                fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e("div", {
                            className: "framer-1mxdfl0",
                            "data-border": !0,
                            children: e("div", {
                                className: "framer-iifdy7",
                                children: e(Ne, {
                                    children: e(Ae, {
                                        className: "framer-15odz2s-container",
                                        children: e(ue, {
                                            alignment: "center",
                                            direction: "left",
                                            fadeOptions: {
                                                fadeAlpha: 0,
                                                fadeContent: !0,
                                                fadeInset: 0,
                                                fadeWidth: 0,
                                                overflow: !1
                                            },
                                            gap: 48,
                                            height: "100%",
                                            hoverFactor: 1,
                                            id: "KkY34V6Sa",
                                            layoutId: "KkY34V6Sa",
                                            padding: 10,
                                            paddingBottom: 10,
                                            paddingLeft: 10,
                                            paddingPerSide: !1,
                                            paddingRight: 10,
                                            paddingTop: 10,
                                            sizingOptions: {
                                                heightType: !0,
                                                widthType: !0
                                            },
                                            slots: [e(C.div, {
                                                className: "framer-1odwiqc",
                                                children: e(d, {
                                                    __fromCanvasComponent: !0,
                                                    children: e(s, {
                                                        children: e("p", {
                                                            style: {
                                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                                "--framer-font-size": "35px",
                                                                "--framer-text-color": "rgb(255, 255, 255)"
                                                            },
                                                            children: "Based Chads"
                                                        })
                                                    }),
                                                    className: "framer-xl660z",
                                                    fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                    transformTemplate: w,
                                                    verticalAlignment: "top",
                                                    withExternalLayout: !0
                                                })
                                            }), e(C.div, {
                                                className: "framer-1hjjvx4",
                                                children: e(d, {
                                                    __fromCanvasComponent: !0,
                                                    children: e(s, {
                                                        children: e("p", {
                                                            style: {
                                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                                "--framer-font-size": "35px",
                                                                "--framer-text-color": "rgb(255, 255, 255)"
                                                            },
                                                            children: "Based Chads"
                                                        })
                                                    }),
                                                    className: "framer-1nsca0c",
                                                    fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                    transformTemplate: w,
                                                    verticalAlignment: "top",
                                                    withExternalLayout: !0
                                                })
                                            }), e(C.div, {
                                                className: "framer-10u9led",
                                                children: e(d, {
                                                    __fromCanvasComponent: !0,
                                                    children: e(s, {
                                                        children: e("p", {
                                                            style: {
                                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                                "--framer-font-size": "35px",
                                                                "--framer-text-color": "rgb(255, 255, 255)"
                                                            },
                                                            children: "Based Chads"
                                                        })
                                                    }),
                                                    className: "framer-ukjbu0",
                                                    fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                    transformTemplate: w,
                                                    verticalAlignment: "top",
                                                    withExternalLayout: !0
                                                })
                                            }), e(C.div, {
                                                className: "framer-18ke83w",
                                                children: e(d, {
                                                    __fromCanvasComponent: !0,
                                                    children: e(s, {
                                                        children: e("p", {
                                                            style: {
                                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                                "--framer-font-size": "35px",
                                                                "--framer-text-color": "rgb(255, 255, 255)"
                                                            },
                                                            children: "Based Chads"
                                                        })
                                                    }),
                                                    className: "framer-nbogd3",
                                                    fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                    transformTemplate: w,
                                                    verticalAlignment: "top",
                                                    withExternalLayout: !0
                                                })
                                            }), e(C.div, {
                                                className: "framer-1sdg0u8",
                                                children: e(d, {
                                                    __fromCanvasComponent: !0,
                                                    children: e(s, {
                                                        children: e("p", {
                                                            style: {
                                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                                "--framer-font-size": "35px",
                                                                "--framer-text-color": "rgb(255, 255, 255)"
                                                            },
                                                            children: "Based Chads"
                                                        })
                                                    }),
                                                    className: "framer-50khdt",
                                                    fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                    transformTemplate: w,
                                                    verticalAlignment: "top",
                                                    withExternalLayout: !0
                                                })
                                            }), e(C.div, {
                                                className: "framer-p1lsam",
                                                children: e(d, {
                                                    __fromCanvasComponent: !0,
                                                    children: e(s, {
                                                        children: e("p", {
                                                            style: {
                                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                                "--framer-font-size": "35px",
                                                                "--framer-text-color": "rgb(255, 255, 255)"
                                                            },
                                                            children: "Based Chads"
                                                        })
                                                    }),
                                                    className: "framer-1vg8sv6",
                                                    fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                    transformTemplate: w,
                                                    verticalAlignment: "top",
                                                    withExternalLayout: !0
                                                })
                                            }), e(C.div, {
                                                className: "framer-2hmylp",
                                                children: e(d, {
                                                    __fromCanvasComponent: !0,
                                                    children: e(s, {
                                                        children: e("p", {
                                                            style: {
                                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                                "--framer-font-size": "35px",
                                                                "--framer-text-color": "rgb(255, 255, 255)"
                                                            },
                                                            children: "Based Chads"
                                                        })
                                                    }),
                                                    className: "framer-j5czy2",
                                                    fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                    transformTemplate: w,
                                                    verticalAlignment: "top",
                                                    withExternalLayout: !0
                                                })
                                            }), e(C.div, {
                                                className: "framer-1tql10h",
                                                children: e(d, {
                                                    __fromCanvasComponent: !0,
                                                    children: e(s, {
                                                        children: e("p", {
                                                            style: {
                                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                                "--framer-font-size": "35px",
                                                                "--framer-text-color": "rgb(255, 255, 255)"
                                                            },
                                                            children: "Based Chads"
                                                        })
                                                    }),
                                                    className: "framer-3wio8h",
                                                    fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                    transformTemplate: w,
                                                    verticalAlignment: "top",
                                                    withExternalLayout: !0
                                                })
                                            }), e(C.div, {
                                                className: "framer-1tql10h",
                                                children: e(d, {
                                                    __fromCanvasComponent: !0,
                                                    children: e(s, {
                                                        children: e("p", {
                                                            style: {
                                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                                "--framer-font-size": "35px",
                                                                "--framer-text-color": "rgb(255, 255, 255)"
                                                            },
                                                            children: "Based Chads"
                                                        })
                                                    }),
                                                    className: "framer-3wio8h",
                                                    fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                    transformTemplate: w,
                                                    verticalAlignment: "top",
                                                    withExternalLayout: !0
                                                })
                                            }), e(C.div, {
                                                className: "framer-p1lsam",
                                                children: e(d, {
                                                    __fromCanvasComponent: !0,
                                                    children: e(s, {
                                                        children: e("p", {
                                                            style: {
                                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                                "--framer-font-size": "35px",
                                                                "--framer-text-color": "rgb(255, 255, 255)"
                                                            },
                                                            children: "Based Chads"
                                                        })
                                                    }),
                                                    className: "framer-1vg8sv6",
                                                    fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                                    transformTemplate: w,
                                                    verticalAlignment: "top",
                                                    withExternalLayout: !0
                                                })
                                            })],
                                            speed: 100,
                                            style: {
                                                height: "100%",
                                                width: "100%"
                                            },
                                            width: "100%"
                                        })
                                    })
                                })
                            })
                        }), R() && e(I, {
                            breakpoint: o,
                            overrides: {
                                rxJ8_y4tS: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2e3,
                                        intrinsicWidth: 2e3,
                                        loading: "lazy",
                                        pixelHeight: 2e3,
                                        pixelWidth: 2e3,
                                        sizes: "calc((100vw - 80px) * 0.5296)",
                                        src: "https://framerusercontent.com/images/m70RG4Fy3BScUdb3yyPlvWRZkD4.png",
                                        srcSet: "https://framerusercontent.com/images/m70RG4Fy3BScUdb3yyPlvWRZkD4.png?scale-down-to=512 512w,https://framerusercontent.com/images/m70RG4Fy3BScUdb3yyPlvWRZkD4.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/m70RG4Fy3BScUdb3yyPlvWRZkD4.png 2000w"
                                    }
                                },
                                VQKTpmpRz: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2e3,
                                        intrinsicWidth: 2e3,
                                        loading: "lazy",
                                        pixelHeight: 2e3,
                                        pixelWidth: 2e3,
                                        sizes: "calc((100vw - 80px) * 0.45)",
                                        src: "https://framerusercontent.com/images/m70RG4Fy3BScUdb3yyPlvWRZkD4.png",
                                        srcSet: "https://framerusercontent.com/images/m70RG4Fy3BScUdb3yyPlvWRZkD4.png?scale-down-to=512 512w,https://framerusercontent.com/images/m70RG4Fy3BScUdb3yyPlvWRZkD4.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/m70RG4Fy3BScUdb3yyPlvWRZkD4.png 2000w"
                                    }
                                },
                                zk2FBa2dy: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2e3,
                                        intrinsicWidth: 2e3,
                                        loading: "lazy",
                                        pixelHeight: 2e3,
                                        pixelWidth: 2e3,
                                        sizes: "calc((100vw - 80px) * 0.45)",
                                        src: "https://framerusercontent.com/images/m70RG4Fy3BScUdb3yyPlvWRZkD4.png",
                                        srcSet: "https://framerusercontent.com/images/m70RG4Fy3BScUdb3yyPlvWRZkD4.png?scale-down-to=512 512w,https://framerusercontent.com/images/m70RG4Fy3BScUdb3yyPlvWRZkD4.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/m70RG4Fy3BScUdb3yyPlvWRZkD4.png 2000w"
                                    }
                                }
                            },
                            children: e(v, {
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 2e3,
                                    intrinsicWidth: 2e3,
                                    loading: "lazy",
                                    pixelHeight: 2e3,
                                    pixelWidth: 2e3,
                                    sizes: "calc((100vw - 80px) * 0.55)",
                                    src: "https://framerusercontent.com/images/m70RG4Fy3BScUdb3yyPlvWRZkD4.png",
                                    srcSet: "https://framerusercontent.com/images/m70RG4Fy3BScUdb3yyPlvWRZkD4.png?scale-down-to=512 512w,https://framerusercontent.com/images/m70RG4Fy3BScUdb3yyPlvWRZkD4.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/m70RG4Fy3BScUdb3yyPlvWRZkD4.png 2000w"
                                },
                                className: "framer-z7wfb7 hidden-15hurun",
                                "data-framer-name": "Jeet_bottom_left",
                                name: "Jeet_bottom_left"
                            })
                        })]
                    }), c(v, {
                        as: "header",
                        background: {
                            alt: "",
                            fit: "fill",
                            loading: "lazy",
                            pixelHeight: 600,
                            pixelWidth: 1200,
                            sizes: "100vw",
                            src: "https://framerusercontent.com/images/6921cBKpLW9uhLDajc0sCBGXEX4.png",
                            srcSet: "https://framerusercontent.com/images/6921cBKpLW9uhLDajc0sCBGXEX4.png?scale-down-to=512 512w,https://framerusercontent.com/images/6921cBKpLW9uhLDajc0sCBGXEX4.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/6921cBKpLW9uhLDajc0sCBGXEX4.png 1200w"
                        },
                        className: "framer-mf0gv6",
                        "data-border": !0,
                        "data-framer-name": "Header",
                        name: "Header",
                        children: [e(A, {
                            href: "https://fanlink.tv/BASEDONBASE",
                            children: e(v, {
                                as: "a",
                                background: {
                                    alt: "",
                                    fit: "fit",
                                    intrinsicHeight: 608,
                                    intrinsicWidth: 1621,
                                    loading: "lazy",
                                    pixelHeight: 500,
                                    pixelWidth: 500,
                                    positionX: "center",
                                    positionY: "center",
                                    src: "https://framerusercontent.com/images/V2RMVyQtvVhgjRf9NUNS8JU5WA.png"
                                },
                                className: "framer-1mwwalz framer-lux5qc",
                                "data-framer-name": "button_1",
                                name: "button_1"
                            })
                        }), e(I, {
                            breakpoint: o,
                            overrides: {
                                KDWX91tIU: {
                                    children: c(s, {
                                        children: [e("p", {
                                            style: {
                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                "--framer-font-size": "15px",
                                                "--framer-letter-spacing": "-2px",
                                                "--framer-line-height": "1.3em",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "rgb(255, 255, 255)"
                                            },
                                            children: "Need Some Workout Pump? Be a chad and pump our"
                                        }), c("p", {
                                            style: {
                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                "--framer-font-size": "15px",
                                                "--framer-letter-spacing": "-2px",
                                                "--framer-line-height": "1.3em",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "rgb(255, 255, 255)"
                                            },
                                            children: [e("span", {
                                                style: {
                                                    "--framer-text-color": "rgb(237, 181, 32)"
                                                },
                                                children: "$BASED Phonk banger "
                                            }), "on your headphones brah"]
                                        })]
                                    })
                                },
                                VQKTpmpRz: {
                                    children: c(s, {
                                        children: [e("p", {
                                            style: {
                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                "--framer-font-size": "31px",
                                                "--framer-letter-spacing": "-2px",
                                                "--framer-line-height": "1.3em",
                                                "--framer-text-color": "rgb(255, 255, 255)"
                                            },
                                            children: "Need Some Workout Pump? Be a chad and pump our"
                                        }), c("p", {
                                            style: {
                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                "--framer-font-size": "31px",
                                                "--framer-letter-spacing": "-2px",
                                                "--framer-line-height": "1.3em",
                                                "--framer-text-color": "rgb(255, 255, 255)"
                                            },
                                            children: [e("span", {
                                                style: {
                                                    "--framer-text-color": "rgb(237, 181, 32)"
                                                },
                                                children: "$BASED Phonk banger "
                                            }), "on your headphones brah"]
                                        })]
                                    }),
                                    transformTemplate: Q
                                },
                                zk2FBa2dy: {
                                    children: c(s, {
                                        children: [e("p", {
                                            style: {
                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                "--framer-font-size": "31px",
                                                "--framer-letter-spacing": "-2px",
                                                "--framer-line-height": "1.3em",
                                                "--framer-text-color": "rgb(255, 255, 255)"
                                            },
                                            children: "Need Some Workout Pump? Be a chad and pump our"
                                        }), c("p", {
                                            style: {
                                                "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                                "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                                "--framer-font-size": "31px",
                                                "--framer-letter-spacing": "-2px",
                                                "--framer-line-height": "1.3em",
                                                "--framer-text-color": "rgb(255, 255, 255)"
                                            },
                                            children: [e("span", {
                                                style: {
                                                    "--framer-text-color": "rgb(237, 181, 32)"
                                                },
                                                children: "$BASED Phonk banger "
                                            }), "on your headphones brah"]
                                        })]
                                    }),
                                    transformTemplate: Q
                                }
                            },
                            children: e(d, {
                                __fromCanvasComponent: !0,
                                children: c(s, {
                                    children: [e("p", {
                                        style: {
                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                            "--framer-font-size": "25px",
                                            "--framer-letter-spacing": "-2px",
                                            "--framer-line-height": "1.3em",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: "Need Some Workout Pump? Be a chad and pump our"
                                    }), c("p", {
                                        style: {
                                            "--font-selector": "Q1VTVE9NO0NDTWFsYWRyb2l0VzAwLUJvbGQgUmVndWxhcg==",
                                            "--framer-font-family": '"CCMaladroitW00-Bold Regular", "CCMaladroitW00-Bold Regular Placeholder", sans-serif',
                                            "--framer-font-size": "25px",
                                            "--framer-letter-spacing": "-2px",
                                            "--framer-line-height": "1.3em",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: [e("span", {
                                            style: {
                                                "--framer-text-color": "rgb(237, 181, 32)"
                                            },
                                            children: "$BASED Phonk banger "
                                        }), "on your headphones brah"]
                                    })]
                                }),
                                className: "framer-1o2by1k",
                                fonts: ["CUSTOM;CCMaladroitW00-Bold Regular"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), 
                        ]
                    })]
                }), e("div", {
                    className: er($r, ...F),
                    id: "overlay"
                })]
            })
        })
    }),
    ua = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", `.${Te.bodyClassName}-framer-iJaID { background: var(--token-419394a1-565d-4952-8ba3-b4f1eb92339c, rgb(5, 5, 5)) /* {"name":"1"} */; }`, ".framer-iJaID.framer-lux5qc, .framer-iJaID .framer-lux5qc { display: block; }", ".framer-iJaID.framer-72rtr7 { align-content: center; align-items: center; background-color: var(--token-419394a1-565d-4952-8ba3-b4f1eb92339c, #050505); display: flex; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 0px; position: relative; width: 1200px; }", ".framer-iJaID .framer-foeqna { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: 800px; justify-content: center; overflow: hidden; padding: 40px; position: relative; width: 100%; }", ".framer-iJaID .framer-5vcoy { bottom: 195px; flex: none; height: 320px; overflow: hidden; position: absolute; right: 0px; width: 391px; z-index: 1; }", ".framer-iJaID .framer-1mp5s5z { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; left: 50%; position: absolute; top: 28px; transform: translateX(-50%); white-space: pre; width: auto; z-index: 1; }", ".framer-iJaID .framer-ck8i2i { bottom: 0px; flex: none; height: 62px; left: calc(45.01278772378519% - 329px / 2); overflow: visible; position: absolute; width: 329px; z-index: 1; }", ".framer-iJaID .framer-1vtsv3l { background-color: #000000; flex: none; height: 53px; left: 275px; overflow: hidden; position: absolute; text-decoration: none; top: 2px; width: 53px; }", ".framer-iJaID .framer-w6dbub { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 41px); left: 50%; position: absolute; top: 50%; transform: translate(-50%, -50%); width: 41px; }", ".framer-iJaID .framer-11dj4jn { background-color: #000000; flex: none; height: 50px; left: 137px; overflow: hidden; position: absolute; text-decoration: none; top: 9px; width: 50px; }", ".framer-iJaID .framer-soluca { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 39px); left: 50%; position: absolute; top: 50%; transform: translate(-50%, -50%); width: 39px; }", ".framer-iJaID .framer-1kzhddu { background-color: #000000; flex: none; height: 53px; left: 0px; overflow: hidden; position: absolute; text-decoration: none; top: 4px; width: 53px; }", ".framer-iJaID .framer-1kmlmnh { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 45px); left: 50%; position: absolute; top: 50%; transform: translate(-50%, -50%); width: 45px; }", ".framer-iJaID .framer-8bw7w0 { background-color: #000000; flex: none; height: 52px; left: 205px; overflow: hidden; position: absolute; text-decoration: none; top: 4px; width: 52px; }", ".framer-iJaID .framer-99uekq { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 33px); left: 51%; position: absolute; top: 49%; transform: translate(-50%, -50%); width: 33px; }", ".framer-iJaID .framer-1mxafit { background-color: #000000; flex: none; height: 53px; left: 63px; overflow: hidden; position: absolute; text-decoration: none; top: 7px; width: 53px; }", ".framer-iJaID .framer-smyc6c { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 35px); left: 49%; position: absolute; top: 49%; transform: translate(-50%, -50%); width: 35px; }", ".framer-iJaID .framer-1ue1p7u { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 372px; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: 589px; }", ".framer-iJaID .framer-3invbi { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: 312px; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: 394px; }", ".framer-iJaID .framer-vb7g3o, .framer-iJaID .framer-1u36i66, .framer-iJaID .framer-1unlfdd, .framer-iJaID .framer-1ox3x54, .framer-iJaID .framer-1m94brv, .framer-iJaID .framer-1s6jfyh, .framer-iJaID .framer-1do5suk, .framer-iJaID .framer-x40kj6, .framer-iJaID .framer-1ca2h4p, .framer-iJaID .framer-u17thb, .framer-iJaID .framer-m84b5a { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; position: relative; white-space: pre; width: auto; }", ".framer-iJaID .framer-noqezk { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: wrap; gap: 10px; height: 76px; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: 100%; }", ".framer-iJaID .framer-1559rh { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 76px); overflow: visible; position: relative; width: 76px; }", ".framer-iJaID .framer-a7vydz { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 100px; justify-content: center; left: 304px; overflow: hidden; padding: 0px; position: absolute; top: -24px; width: 284px; z-index: 1; }", ".framer-iJaID .framer-6ombgt { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 100px); left: 18%; overflow: visible; position: absolute; top: 50%; transform: translate(-50%, -50%); width: 100px; z-index: 1; }", ".framer-iJaID .framer-13rbkcc { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; left: 64%; position: absolute; top: 52%; transform: translate(-50%, -50%); white-space: pre; width: auto; z-index: 1; }", ".framer-iJaID .framer-1ny0jw7 { aspect-ratio: 2.6621621621621623 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 142px); overflow: visible; position: relative; text-decoration: none; width: 376px; }", ".framer-iJaID .framer-j3j88f { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 378px); left: 3px; overflow: visible; position: absolute; top: 50%; transform: translateY(-50%); width: 378px; z-index: 1; }", ".framer-iJaID .framer-ndbve8 { --border-bottom-width: 1px; --border-color: #222222; --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; background-color: #6fc7d9; bottom: 0px; flex: none; height: 65px; left: 0px; overflow: hidden; position: absolute; right: 0px; z-index: 1; }", ".framer-iJaID .framer-potn1g-container, .framer-iJaID .framer-15odz2s-container { flex: none; height: 45px; left: 0px; position: absolute; right: 0px; top: calc(49.230769230769255% - 45px / 2); }", ".framer-iJaID .framer-ul0tli, .framer-iJaID .framer-1cd1ycq, .framer-iJaID .framer-126ssn9, .framer-iJaID .framer-ox9ux5, .framer-iJaID .framer-xa1fao, .framer-iJaID .framer-poq7ar, .framer-iJaID .framer-n3aozb, .framer-iJaID .framer-1wrnaqx { height: 42px; overflow: hidden; position: relative; width: 148px; }", ".framer-iJaID .framer-1tv2zk4, .framer-iJaID .framer-5ggt4v, .framer-iJaID .framer-10wmga0, .framer-iJaID .framer-1inlchw, .framer-iJaID .framer-eqksmq, .framer-iJaID .framer-15mb6fj, .framer-iJaID .framer-1f4wbrk, .framer-iJaID .framer-1s1kerc, .framer-iJaID .framer-xl660z, .framer-iJaID .framer-1nsca0c, .framer-iJaID .framer-ukjbu0, .framer-iJaID .framer-nbogd3, .framer-iJaID .framer-50khdt, .framer-iJaID .framer-1vg8sv6, .framer-iJaID .framer-j5czy2, .framer-iJaID .framer-3wio8h { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; left: 50%; position: absolute; top: 50%; transform: translate(-50%, -50%); white-space: pre; width: auto; }", ".framer-iJaID .framer-114fryi { height: 42px; overflow: hidden; position: relative; width: 157px; }", ".framer-iJaID .framer-puy6wz { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; bottom: 0px; flex: none; left: 0px; position: absolute; right: 0px; top: 0px; white-space: pre-wrap; word-break: break-word; word-wrap: break-word; }", ".framer-iJaID .framer-tzckox { --border-bottom-width: 0px; --border-color: #222222; --border-left-width: 0px; --border-right-width: 0px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; background-color: #284cf6; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 800px; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: 100%; }", ".framer-iJaID .framer-hw3891 { align-content: center; align-items: center; aspect-ratio: 0.519327731092437 / 1; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: var(--framer-aspect-ratio-supported, 639px); justify-content: center; left: 71px; overflow: hidden; padding: 0px; position: absolute; top: 55%; transform: translateY(-50%); width: 332px; z-index: 1; }", ".framer-iJaID .framer-1ef292c { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; bottom: 0px; flex: none; height: auto; left: 50%; position: absolute; transform: translateX(-50%); white-space: pre; width: auto; z-index: 1; }", ".framer-iJaID .framer-1hucz9n-container { aspect-ratio: 0.5625 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 562px); left: -3px; position: absolute; right: -4px; top: 0px; z-index: 1; }", ".framer-iJaID .framer-1y8zvia { align-content: center; align-items: center; bottom: 0px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 652px; justify-content: center; overflow: hidden; padding: 0px; position: absolute; right: 0px; width: 1054px; z-index: 1; }", ".framer-iJaID .framer-19zq74v { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 344px; justify-content: center; left: calc(33.49146110056928% - 706px / 2); overflow: hidden; padding: 0px; position: absolute; top: calc(26.38036809815953% - 344px / 2); width: 706px; z-index: 1; }", ".framer-iJaID .framer-1nytobq { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; bottom: 62px; flex: none; height: auto; left: 50%; position: absolute; transform: translateX(-50%); white-space: pre; width: auto; z-index: 1; }", ".framer-iJaID .framer-13iiohh { aspect-ratio: 2.5974025974025974 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 126px); left: 23%; overflow: visible; position: absolute; text-decoration: none; top: 71%; transform: translate(-50%, -50%); width: 327px; z-index: 1; }", ".framer-iJaID .framer-g1ga2r { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; left: 52%; position: absolute; top: 15%; transform: translate(-50%, -50%); white-space: pre; width: auto; z-index: 1; }", ".framer-iJaID .framer-udwwa9 { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; left: 46%; position: absolute; top: 94%; transform: translate(-50%, -50%); white-space: pre; width: auto; z-index: 1; }", ".framer-iJaID .framer-1sta7y4 { aspect-ratio: 2.5974025974025974 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 126px); left: 73%; overflow: visible; position: absolute; text-decoration: none; top: 71%; transform: translate(-50%, -50%); width: 327px; z-index: 3; }", ".framer-iJaID .framer-d5c9bk { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; left: 50%; position: absolute; top: 54%; transform: translate(-50%, -50%); white-space: pre; width: auto; z-index: 1; }", ".framer-iJaID .framer-qz37kz { align-content: center; align-items: center; bottom: 0px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 650px; justify-content: center; overflow: hidden; padding: 0px; position: absolute; right: 0px; width: 1029px; z-index: 0; }", ".framer-iJaID .framer-iiv7zk { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 198px; justify-content: center; left: calc(38.581146744412074% - 794px / 2); overflow: hidden; padding: 0px; position: absolute; top: calc(73.53846153846156% - 198px / 2); width: 794px; }", ".framer-iJaID .framer-13diddb { flex: none; height: 198px; left: calc(50.00000000000002% - 794px / 2); overflow: hidden; position: absolute; top: calc(50.00000000000002% - 198px / 2); width: 794px; z-index: 1; }", ".framer-iJaID .framer-16frv28 { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; bottom: 0px; flex: none; height: auto; position: absolute; right: 0px; white-space: pre; width: auto; z-index: 1; }", ".framer-iJaID .framer-dfsbiy { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; bottom: 21px; flex: none; height: auto; left: 48%; position: absolute; transform: translateX(-50%); white-space: pre-wrap; width: 765px; word-break: break-word; word-wrap: break-word; z-index: 1; }", ".framer-iJaID .framer-1oaziqu { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 89px); overflow: visible; position: absolute; right: 0px; top: 0px; width: 89px; z-index: 1; }", ".framer-iJaID .framer-1ccrs0g { flex: none; height: 650px; left: calc(68.41593780369293% - 650px / 2); overflow: visible; position: absolute; top: calc(50.00000000000002% - 650px / 2); width: 650px; z-index: 0; }", ".framer-iJaID .framer-1gic54t { align-content: center; align-items: center; background-color: #6fc7d9; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 600px; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: 100%; z-index: 0; }", ".framer-iJaID .framer-5un6pk { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; left: 50%; overflow: hidden; padding: 0px; position: absolute; top: 18px; transform: translateX(-50%); width: min-content; z-index: 1; }", ".framer-iJaID .framer-1vgku7w { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 16px; height: min-content; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: min-content; z-index: 1; }", ".framer-iJaID .framer-1rl5sld, .framer-iJaID .framer-5idwqh, .framer-iJaID .framer-7l3jrg { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; position: relative; white-space: pre; width: auto; z-index: 1; }", ".framer-iJaID .framer-1dxjiu1 { aspect-ratio: 2.8896434634974533 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 84px); overflow: visible; position: relative; text-decoration: none; width: 241px; z-index: 1; }", ".framer-iJaID .framer-d6ysfz, .framer-iJaID .framer-1b6phjo { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 2px; height: auto; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: auto; }", ".framer-iJaID .framer-2w5f1p { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 6px; height: auto; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: auto; }", ".framer-iJaID .framer-1xpwta7 { aspect-ratio: 1.7777777777777777 / 1; bottom: -18px; flex: none; height: var(--framer-aspect-ratio-supported, 674px); left: 50%; overflow: visible; position: absolute; top: -56px; transform: translateX(-50%); width: 100%; z-index: 0; }", ".framer-iJaID .framer-1ohu3vo { align-content: center; align-items: center; background-color: #284cf6; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: 680px; justify-content: center; overflow: hidden; padding: 40px; position: relative; width: 100%; }", ".framer-iJaID .framer-1uk23to { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 500px; justify-content: center; overflow: hidden; padding: 0px 0px 210px 0px; position: relative; width: 850px; }", ".framer-iJaID .framer-10emvsp { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: 279px; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: 850px; }", ".framer-iJaID .framer-18zjkab { align-content: center; align-items: center; aspect-ratio: 9.433566433566433 / 1; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: var(--framer-aspect-ratio-supported, 90px); justify-content: center; overflow: hidden; padding: 0px; position: relative; width: 100%; }", ".framer-iJaID .framer-12kuu5u { aspect-ratio: 3.1018867924528304 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 88px); position: relative; text-decoration: none; width: 270px; }", ".framer-iJaID .framer-8q6p0e, .framer-iJaID .framer-13tvg2l { aspect-ratio: 3.1056603773584905 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 86px); position: relative; text-decoration: none; width: 270px; }", ".framer-iJaID .framer-8blpp1 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 12px; height: 36px; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: 362px; z-index: 3; }", ".framer-iJaID .framer-1h8j1ea { aspect-ratio: 3.1018868987709283 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 36px); position: relative; text-decoration: none; width: 111px; }", ".framer-iJaID .framer-ssapvt, .framer-iJaID .framer-177c4f6 { aspect-ratio: 3.1056605469036396 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 36px); position: relative; text-decoration: none; width: 111px; }", ".framer-iJaID .framer-e9u6qe { aspect-ratio: 2.386634844868735 / 1; bottom: 0px; flex: none; height: var(--framer-aspect-ratio-supported, 294px); left: 50%; overflow: visible; position: absolute; transform: translateX(-50%); width: 701px; z-index: 1; }", ".framer-iJaID .framer-19qcoy8 { align-content: center; align-items: center; background-color: #6fc7d9; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 20px; height: 740px; justify-content: center; overflow: hidden; padding: 40px; position: relative; width: 100%; }", ".framer-iJaID .framer-12r6qvw { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: min-content; }", ".framer-iJaID .framer-e40ou4, .framer-iJaID .framer-3qyzg1 { aspect-ratio: 1 / 1; flex: none; height: 250px; overflow: visible; position: relative; width: var(--framer-aspect-ratio-supported, 250px); z-index: 1; }", ".framer-iJaID .framer-1u9m7uj { aspect-ratio: 3.1446540880503147 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 100px); overflow: visible; position: sticky; text-decoration: none; top: 0px; width: 312px; will-change: transform; z-index: 1; }", ".framer-iJaID .framer-1mxdfl0 { --border-bottom-width: 1px; --border-color: #222222; --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; background-color: #284cf6; bottom: 0px; flex: none; height: 65px; left: 0px; overflow: hidden; position: absolute; right: 0px; z-index: 1; }", ".framer-iJaID .framer-iifdy7 { background-color: #284cf6; flex: none; height: 65px; left: 0px; overflow: hidden; position: absolute; right: 0px; top: 0px; z-index: 0; }", ".framer-iJaID .framer-1odwiqc, .framer-iJaID .framer-1hjjvx4, .framer-iJaID .framer-10u9led, .framer-iJaID .framer-18ke83w, .framer-iJaID .framer-1sdg0u8, .framer-iJaID .framer-p1lsam, .framer-iJaID .framer-2hmylp, .framer-iJaID .framer-1tql10h { height: 42px; overflow: hidden; position: relative; width: 267px; }", ".framer-iJaID .framer-z7wfb7 { aspect-ratio: 1 / 1; bottom: 0px; flex: none; height: var(--framer-aspect-ratio-supported, 660px); left: 0px; overflow: visible; position: absolute; width: 55%; z-index: 0; }", ".framer-iJaID .framer-mf0gv6 { --border-bottom-width: 0px; --border-color: #222222; --border-left-width: 0px; --border-right-width: 0px; --border-style: solid; --border-top-width: 1px; align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 40px; height: 600px; justify-content: center; overflow: hidden; padding: 80px 90px 40px 40px; position: relative; width: 100%; }", ".framer-iJaID .framer-1mwwalz { flex: none; height: 338px; overflow: visible; position: relative; text-decoration: none; width: 528px; }", ".framer-iJaID .framer-1o2by1k { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; left: 510px; position: absolute; top: 79px; white-space: pre; width: auto; z-index: 1; }", ".framer-iJaID .framer-17vr322 { flex: none; height: 142px; overflow: visible; position: relative; text-decoration: none; width: 388px; }", "@supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-iJaID.framer-72rtr7, .framer-iJaID .framer-foeqna, .framer-iJaID .framer-1ue1p7u, .framer-iJaID .framer-3invbi, .framer-iJaID .framer-noqezk, .framer-iJaID .framer-a7vydz, .framer-iJaID .framer-tzckox, .framer-iJaID .framer-hw3891, .framer-iJaID .framer-1y8zvia, .framer-iJaID .framer-19zq74v, .framer-iJaID .framer-qz37kz, .framer-iJaID .framer-iiv7zk, .framer-iJaID .framer-1gic54t, .framer-iJaID .framer-5un6pk, .framer-iJaID .framer-1vgku7w, .framer-iJaID .framer-d6ysfz, .framer-iJaID .framer-1b6phjo, .framer-iJaID .framer-2w5f1p, .framer-iJaID .framer-1ohu3vo, .framer-iJaID .framer-1uk23to, .framer-iJaID .framer-10emvsp, .framer-iJaID .framer-18zjkab, .framer-iJaID .framer-8blpp1, .framer-iJaID .framer-19qcoy8, .framer-iJaID .framer-12r6qvw, .framer-iJaID .framer-mf0gv6 { gap: 0px; } .framer-iJaID.framer-72rtr7 > * { margin: 0px; margin-bottom: calc(0px / 2); margin-top: calc(0px / 2); } .framer-iJaID.framer-72rtr7 > :first-child, .framer-iJaID .framer-foeqna > :first-child, .framer-iJaID .framer-3invbi > :first-child, .framer-iJaID .framer-hw3891 > :first-child, .framer-iJaID .framer-1vgku7w > :first-child, .framer-iJaID .framer-d6ysfz > :first-child, .framer-iJaID .framer-1b6phjo > :first-child, .framer-iJaID .framer-2w5f1p > :first-child, .framer-iJaID .framer-1ohu3vo > :first-child, .framer-iJaID .framer-10emvsp > :first-child, .framer-iJaID .framer-19qcoy8 > :first-child { margin-top: 0px; } .framer-iJaID.framer-72rtr7 > :last-child, .framer-iJaID .framer-foeqna > :last-child, .framer-iJaID .framer-3invbi > :last-child, .framer-iJaID .framer-hw3891 > :last-child, .framer-iJaID .framer-1vgku7w > :last-child, .framer-iJaID .framer-d6ysfz > :last-child, .framer-iJaID .framer-1b6phjo > :last-child, .framer-iJaID .framer-2w5f1p > :last-child, .framer-iJaID .framer-1ohu3vo > :last-child, .framer-iJaID .framer-10emvsp > :last-child, .framer-iJaID .framer-19qcoy8 > :last-child { margin-bottom: 0px; } .framer-iJaID .framer-foeqna > *, .framer-iJaID .framer-1ohu3vo > *, .framer-iJaID .framer-19qcoy8 > * { margin: 0px; margin-bottom: calc(20px / 2); margin-top: calc(20px / 2); } .framer-iJaID .framer-1ue1p7u > *, .framer-iJaID .framer-noqezk > *, .framer-iJaID .framer-a7vydz > *, .framer-iJaID .framer-tzckox > *, .framer-iJaID .framer-1y8zvia > *, .framer-iJaID .framer-19zq74v > *, .framer-iJaID .framer-qz37kz > *, .framer-iJaID .framer-iiv7zk > *, .framer-iJaID .framer-1gic54t > *, .framer-iJaID .framer-5un6pk > *, .framer-iJaID .framer-1uk23to > *, .framer-iJaID .framer-18zjkab > *, .framer-iJaID .framer-12r6qvw > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-iJaID .framer-1ue1p7u > :first-child, .framer-iJaID .framer-noqezk > :first-child, .framer-iJaID .framer-a7vydz > :first-child, .framer-iJaID .framer-tzckox > :first-child, .framer-iJaID .framer-1y8zvia > :first-child, .framer-iJaID .framer-19zq74v > :first-child, .framer-iJaID .framer-qz37kz > :first-child, .framer-iJaID .framer-iiv7zk > :first-child, .framer-iJaID .framer-1gic54t > :first-child, .framer-iJaID .framer-5un6pk > :first-child, .framer-iJaID .framer-1uk23to > :first-child, .framer-iJaID .framer-18zjkab > :first-child, .framer-iJaID .framer-8blpp1 > :first-child, .framer-iJaID .framer-12r6qvw > :first-child, .framer-iJaID .framer-mf0gv6 > :first-child { margin-left: 0px; } .framer-iJaID .framer-1ue1p7u > :last-child, .framer-iJaID .framer-noqezk > :last-child, .framer-iJaID .framer-a7vydz > :last-child, .framer-iJaID .framer-tzckox > :last-child, .framer-iJaID .framer-1y8zvia > :last-child, .framer-iJaID .framer-19zq74v > :last-child, .framer-iJaID .framer-qz37kz > :last-child, .framer-iJaID .framer-iiv7zk > :last-child, .framer-iJaID .framer-1gic54t > :last-child, .framer-iJaID .framer-5un6pk > :last-child, .framer-iJaID .framer-1uk23to > :last-child, .framer-iJaID .framer-18zjkab > :last-child, .framer-iJaID .framer-8blpp1 > :last-child, .framer-iJaID .framer-12r6qvw > :last-child, .framer-iJaID .framer-mf0gv6 > :last-child { margin-right: 0px; } .framer-iJaID .framer-3invbi > *, .framer-iJaID .framer-hw3891 > *, .framer-iJaID .framer-10emvsp > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-iJaID .framer-1vgku7w > * { margin: 0px; margin-bottom: calc(16px / 2); margin-top: calc(16px / 2); } .framer-iJaID .framer-d6ysfz > *, .framer-iJaID .framer-1b6phjo > * { margin: 0px; margin-bottom: calc(2px / 2); margin-top: calc(2px / 2); } .framer-iJaID .framer-2w5f1p > * { margin: 0px; margin-bottom: calc(6px / 2); margin-top: calc(6px / 2); } .framer-iJaID .framer-8blpp1 > * { margin: 0px; margin-left: calc(12px / 2); margin-right: calc(12px / 2); } .framer-iJaID .framer-mf0gv6 > * { margin: 0px; margin-left: calc(40px / 2); margin-right: calc(40px / 2); } }", "@media (min-width: 1200px) and (max-width: 1499px) { .framer-iJaID .hidden-72rtr7 { display: none !important; } }", `@media (min-width: 810px) and (max-width: 1199px) { .framer-iJaID .hidden-1i6nyat { display: none !important; } .${Te.bodyClassName}-framer-iJaID { background: var(--token-419394a1-565d-4952-8ba3-b4f1eb92339c, rgb(5, 5, 5)) /* {"name":"1"} */; } .framer-iJaID.framer-72rtr7 { width: 810px; } .framer-iJaID .framer-foeqna { height: 716px; order: 0; } .framer-iJaID .framer-1ue1p7u { height: min-content; order: 3; } .framer-iJaID .framer-3invbi { height: 280px; } .framer-iJaID .framer-1ny0jw7 { height: var(--framer-aspect-ratio-supported, 120px); order: 4; width: 320px; } .framer-iJaID .framer-j3j88f { height: var(--framer-aspect-ratio-supported, 116px); left: 50%; order: 1; top: 8px; transform: translateX(-50%); width: 116px; } .framer-iJaID .framer-ndbve8, .framer-iJaID .framer-17vr322 { order: 2; } .framer-iJaID .framer-tzckox { height: 715px; order: 1; } .framer-iJaID .framer-1y8zvia { order: 3; z-index: 0; } .framer-iJaID .framer-19zq74v { gap: 4px; left: 297px; top: 37px; } .framer-iJaID .framer-13iiohh { left: 1px; top: 52%; transform: translateY(-50%); } .framer-iJaID .framer-g1ga2r { left: 50%; top: -1px; transform: translateX(-50%); } .framer-iJaID .framer-1sta7y4 { left: unset; right: -1px; top: 52%; transform: translateY(-50%); } .framer-iJaID .framer-qz37kz { height: 320px; order: 4; } .framer-iJaID .framer-1ccrs0g { bottom: -78px; height: 455px; left: unset; right: -74px; top: unset; width: 455px; } .framer-iJaID .framer-1gic54t { height: 715px; order: 2; } .framer-iJaID .framer-5un6pk { flex-direction: column; top: 50%; transform: translate(-50%, -50%); } .framer-iJaID .framer-1dxjiu1 { height: 100px; width: var(--framer-aspect-ratio-supported, 289px); } .framer-iJaID .framer-1ohu3vo { height: 600px; order: 3; } .framer-iJaID .framer-10emvsp { padding: 0px 0px 20px 0px; } .framer-iJaID .framer-e9u6qe { height: var(--framer-aspect-ratio-supported, 281px); width: 670px; } .framer-iJaID .framer-19qcoy8 { height: 580px; order: 4; } .framer-iJaID .framer-e40ou4, .framer-iJaID .framer-3qyzg1 { height: 186px; width: var(--framer-aspect-ratio-supported, 186px); } .framer-iJaID .framer-1u9m7uj { height: 71px; width: var(--framer-aspect-ratio-supported, 224px); } .framer-iJaID .framer-z7wfb7 { height: var(--framer-aspect-ratio-supported, 429px); width: 53%; } .framer-iJaID .framer-mf0gv6 { flex-direction: column; gap: 24px; height: 650px; order: 5; } .framer-iJaID .framer-1mwwalz { order: 1; } .framer-iJaID .framer-1o2by1k { left: unset; order: 0; position: relative; top: unset; } @supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-iJaID .framer-19zq74v, .framer-iJaID .framer-5un6pk, .framer-iJaID .framer-mf0gv6 { gap: 0px; } .framer-iJaID .framer-19zq74v > * { margin: 0px; margin-left: calc(4px / 2); margin-right: calc(4px / 2); } .framer-iJaID .framer-19zq74v > :first-child { margin-left: 0px; } .framer-iJaID .framer-19zq74v > :last-child { margin-right: 0px; } .framer-iJaID .framer-5un6pk > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-iJaID .framer-5un6pk > :first-child, .framer-iJaID .framer-mf0gv6 > :first-child { margin-top: 0px; } .framer-iJaID .framer-5un6pk > :last-child, .framer-iJaID .framer-mf0gv6 > :last-child { margin-bottom: 0px; } .framer-iJaID .framer-mf0gv6 > * { margin: 0px; margin-bottom: calc(24px / 2); margin-top: calc(24px / 2); } }}`, `@media (max-width: 809px) { .framer-iJaID .hidden-15hurun { display: none !important; } .${Te.bodyClassName}-framer-iJaID { background: var(--token-419394a1-565d-4952-8ba3-b4f1eb92339c, rgb(5, 5, 5)) /* {"name":"1"} */; } .framer-iJaID.framer-72rtr7 { width: 390px; } .framer-iJaID .framer-foeqna { height: 693px; padding: 60px; } .framer-iJaID .framer-5vcoy { align-content: center; align-items: center; bottom: unset; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: 249px; justify-content: center; left: 50%; min-width: 391px; order: 1; padding: 0px; right: unset; top: 178px; transform: translateX(-50%); width: min-content; } .framer-iJaID .framer-1ue1p7u, .framer-iJaID .framer-7l3jrg { order: 3; } .framer-iJaID .framer-3invbi { height: 280px; } .framer-iJaID .framer-1ny0jw7 { bottom: 128px; height: var(--framer-aspect-ratio-supported, 92px); left: 50%; order: 4; position: absolute; transform: translateX(-50%); width: 245px; z-index: 1; } .framer-iJaID .framer-j3j88f { height: var(--framer-aspect-ratio-supported, 115px); left: 50%; order: 0; top: 12px; transform: translateX(-50%); width: 115px; } .framer-iJaID .framer-ndbve8 { order: 2; } .framer-iJaID .framer-tzckox { height: 601px; } .framer-iJaID .framer-1y8zvia { order: 3; z-index: 0; } .framer-iJaID .framer-19zq74v { flex-wrap: wrap; height: 338px; left: 665px; top: -30px; width: 386px; z-index: 0; } .framer-iJaID .framer-13iiohh { height: var(--framer-aspect-ratio-supported, 67px); left: 5px; top: 262px; transform: unset; width: 174px; z-index: 3; } .framer-iJaID .framer-g1ga2r { left: 50%; top: 135px; transform: translateX(-50%); } .framer-iJaID .framer-1sta7y4 { height: var(--framer-aspect-ratio-supported, 67px); left: 200px; top: 262px; transform: unset; width: 174px; } .framer-iJaID .framer-d5c9bk, .framer-iJaID .framer-12r6qvw { order: 1; } .framer-iJaID .framer-qz37kz { height: 313px; order: 4; } .framer-iJaID .framer-1ccrs0g { bottom: -83px; height: 310px; left: unset; right: 0px; top: unset; width: 310px; } .framer-iJaID .framer-1gic54t { height: 692px; } .framer-iJaID .framer-5un6pk { top: 46%; transform: translate(-50%, -50%); } .framer-iJaID .framer-1dxjiu1 { height: 84px; width: var(--framer-aspect-ratio-supported, 242px); } .framer-iJaID .framer-1ohu3vo { height: 450px; padding: 60px; } .framer-iJaID .framer-10emvsp { height: 200px; z-index: 0; } .framer-iJaID .framer-e9u6qe { height: var(--framer-aspect-ratio-supported, 142px); width: 340px; } .framer-iJaID .framer-19qcoy8 { gap: 24px; height: 640px; padding: 60px; } .framer-iJaID .framer-5idwqh { order: 0; } .framer-iJaID .framer-e40ou4 { height: var(--framer-aspect-ratio-supported, 170px); width: 170px; } .framer-iJaID .framer-3qyzg1 { height: 170px; width: var(--framer-aspect-ratio-supported, 170px); } .framer-iJaID .framer-1u9m7uj { height: 81px; order: 2; width: var(--framer-aspect-ratio-supported, 254px); } .framer-iJaID .framer-1mxdfl0 { order: 4; } .framer-iJaID .framer-mf0gv6 { flex-direction: column; gap: 24px; padding: 60px; } .framer-iJaID .framer-1mwwalz { height: 287px; order: 1; width: 448px; } .framer-iJaID .framer-1o2by1k { left: unset; order: 0; position: relative; top: unset; white-space: pre-wrap; width: 358px; word-break: break-word; word-wrap: break-word; } .framer-iJaID .framer-17vr322 { height: 115px; order: 2; width: 306px; } @supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-iJaID .framer-5vcoy, .framer-iJaID .framer-19qcoy8, .framer-iJaID .framer-mf0gv6 { gap: 0px; } .framer-iJaID .framer-5vcoy > * { margin: 0px; margin-bottom: calc(10px / 2); margin-top: calc(10px / 2); } .framer-iJaID .framer-5vcoy > :first-child, .framer-iJaID .framer-19qcoy8 > :first-child, .framer-iJaID .framer-mf0gv6 > :first-child { margin-top: 0px; } .framer-iJaID .framer-5vcoy > :last-child, .framer-iJaID .framer-19qcoy8 > :last-child, .framer-iJaID .framer-mf0gv6 > :last-child { margin-bottom: 0px; } .framer-iJaID .framer-19qcoy8 > *, .framer-iJaID .framer-mf0gv6 > * { margin: 0px; margin-bottom: calc(24px / 2); margin-top: calc(24px / 2); } }}`, `@media (min-width: 1920px) { .framer-iJaID .hidden-19x8ari { display: none !important; } .${Te.bodyClassName}-framer-iJaID { background: var(--token-419394a1-565d-4952-8ba3-b4f1eb92339c, rgb(5, 5, 5)) /* {"name":"1"} */; } .framer-iJaID.framer-72rtr7 { width: 1920px; } .framer-iJaID .framer-j3j88f { height: var(--framer-aspect-ratio-supported, 485px); left: 57px; width: 485px; } .framer-iJaID .framer-1ef292c { order: 1; } .framer-iJaID .framer-1hucz9n-container { height: var(--framer-aspect-ratio-supported, 603px); order: 0; } .framer-iJaID .framer-19zq74v { z-index: 5; } .framer-iJaID .framer-1xpwta7 { height: var(--framer-aspect-ratio-supported, 1078px); } .framer-iJaID .framer-19qcoy8 { height: 720px; } .framer-iJaID .framer-z7wfb7 { height: var(--framer-aspect-ratio-supported, 864px); left: -42px; width: 45%; } .framer-iJaID .framer-1o2by1k { left: 50%; top: 39px; transform: translateX(-50%); }}`, `@media (min-width: 1500px) and (max-width: 1919px) { .framer-iJaID .hidden-k4kk23 { display: none !important; } .${Te.bodyClassName}-framer-iJaID { background: var(--token-419394a1-565d-4952-8ba3-b4f1eb92339c, rgb(5, 5, 5)) /* {"name":"1"} */; } .framer-iJaID.framer-72rtr7 { width: 1500px; } .framer-iJaID .framer-j3j88f { height: var(--framer-aspect-ratio-supported, 485px); left: 57px; width: 485px; } .framer-iJaID .framer-1ef292c { order: 1; } .framer-iJaID .framer-1hucz9n-container { height: var(--framer-aspect-ratio-supported, 603px); order: 0; } .framer-iJaID .framer-19zq74v { z-index: 5; } .framer-iJaID .framer-1xpwta7 { height: var(--framer-aspect-ratio-supported, 842px); } .framer-iJaID .framer-19qcoy8 { height: 720px; } .framer-iJaID .framer-z7wfb7 { height: var(--framer-aspect-ratio-supported, 675px); left: -42px; width: 45%; } .framer-iJaID .framer-1o2by1k { left: 50%; top: 39px; transform: translateX(-50%); }}`, '.framer-iJaID[data-border="true"]::after, .framer-iJaID [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }'],
    Le = Ir(pa, ua, "framer-iJaID"),
    yl = Le;
Le.displayName = "Home";
Le.defaultProps = {
    height: 4220,
    width: 1200
};
Mr(Le, [{
    explicitInter: !0,
    fonts: [{
        family: "CCMaladroitW00-Bold Regular",
        source: "custom",
        url: "https://framerusercontent.com/assets/VUodia92vqoMd75ltOF6srAc.woff2"
    }]
}, ...sa, ...la], {
    supportsExplicitInterCodegen: !0
});
var bl = {
    exports: {
        default: {
            type: "reactComponent",
            name: "FrameraugiA20Il",
            slots: [],
            annotations: {
                framerIntrinsicHeight: "4220",
                framerResponsiveScreen: "",
                framerContractVersion: "1",
                framerCanvasComponentVariantDetails: '{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"rxJ8_y4tS":{"layout":["fixed","auto"]},"KDWX91tIU":{"layout":["fixed","auto"]},"zk2FBa2dy":{"layout":["fixed","auto"]},"VQKTpmpRz":{"layout":["fixed","auto"]}}}',
                framerDisplayContentsDiv: "false",
                framerImmutableVariables: "true",
                framerComponentViewportWidth: "true",
                framerIntrinsicWidth: "1200"
            }
        },
        Props: {
            type: "tsType",
            annotations: {
                framerContractVersion: "1"
            }
        },
        __FramerMetadata__: {
            type: "variable"
        }
    }
};
export {
    bl as __FramerMetadata__, yl as
    default
};
//# sourceMappingURL=ABMhHgPxnxgfkUeBAmX4ZNQ1hTiU6--18YCbDT64kww.WPKP5NEJ.mjs.map