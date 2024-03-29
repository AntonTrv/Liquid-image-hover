! function(f, l) { "object" == typeof exports && "undefined" != typeof module ? module.exports = l(require("three"), require("gsap/TweenMax")) : "function" == typeof define && define.amd ? define(["three", "gsap/TweenMax"], l) : f.hoverEffect = l(f.THREE, f.TweenMax) }(this, function(f, l) {
    return l = l && l.hasOwnProperty("default") ? l.default : l,
        function(h) {
            function F() {
                for (var f = arguments, l = 0; l < arguments.length; l++)
                    if (void 0 !== f[l]) return f[l]
            }
            console.log("%c Hover effect by Robin Delaporte: https://github.com/robin-dela/hover-effect ", "color: #bada55; font-size: 0.8rem");
            var w = h.parent,
                L = h.displacementImage,
                M = h.image1,
                P = h.image2,
                U = F(h.intensity1, h.intensity, 1),
                V = F(h.intensity2, h.intensity, 1),
                C = F(h.angle, Math.PI / 4),
                D = F(h.angle1, C),
                S = F(h.angle2, 3 * -C),
                W = F(h.speedIn, h.speed, 1.6),
                _ = F(h.speedOut, h.speed, 1.2),
                z = F(h.hover, !0),
                q = F(h.easing, Expo.easeOut),
                G = F(h.video, !1);
            if (w)
                if (M && P && L) {
                    var A = new f.Scene,
                        B = new f.OrthographicCamera(w.offsetWidth / -2, w.offsetWidth / 2, w.offsetHeight / 2, w.offsetHeight / -2, 1, 1e3);
                    B.position.z = 1;
                    var k = new f.WebGLRenderer({ antialias: !1, alpha: !0 });
                    k.setPixelRatio(window.devicePixelRatio), k.setClearColor(16777215, 0), k.setSize(w.offsetWidth, w.offsetHeight), w.appendChild(k.domElement);
                    var J = function() { k.render(A, B) },
                        K = new f.TextureLoader;
                    K.crossOrigin = "";
                    var N = K.load(L, J);
                    if (N.wrapS = N.wrapT = f.RepeatWrapping, G) {
                        var Q = function() { requestAnimationFrame(Q), k.render(A, B) };
                        Q(), (G = document.createElement("video")).autoplay = !0, G.loop = !0, G.src = M, G.load();
                        var X = document.createElement("video");
                        X.autoplay = !0, X.loop = !0, X.src = P, X.load();
                        var Y = new f.VideoTexture(G),
                            Z = new f.VideoTexture(X);
                        Y.magFilter = Z.magFilter = f.LinearFilter, Y.minFilter = Z.minFilter = f.LinearFilter, X.addEventListener("loadeddata", function() { X.play(), (Z = new f.VideoTexture(X)).magFilter = f.LinearFilter, Z.minFilter = f.LinearFilter, $.uniforms.texture2.value = Z }, !1), G.addEventListener("loadeddata", function() { G.play(), (Y = new f.VideoTexture(G)).magFilter = f.LinearFilter, Y.minFilter = f.LinearFilter, $.uniforms.texture1.value = Y }, !1)
                    } else Y = K.load(M, J), Z = K.load(P, J), Y.magFilter = Z.magFilter = f.LinearFilter, Y.minFilter = Z.minFilter = f.LinearFilter;
                    var $ = new f.ShaderMaterial({ uniforms: { intensity1: { type: "f", value: U }, intensity2: { type: "f", value: V }, dispFactor: { type: "f", value: 0 }, angle1: { type: "f", value: D }, angle2: { type: "f", value: S }, texture1: { type: "t", value: Y }, texture2: { type: "t", value: Z }, disp: { type: "t", value: N } }, vertexShader: "\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n", fragmentShader: "\nvarying vec2 vUv;\n\nuniform float dispFactor;\nuniform sampler2D disp;\n\nuniform sampler2D texture1;\nuniform sampler2D texture2;\nuniform float angle1;\nuniform float angle2;\nuniform float intensity1;\nuniform float intensity2;\n\nmat2 getRotM(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n  return mat2(c, -s, s, c);\n}\n\nvoid main() {\n  vec4 disp = texture2D(disp, vUv);\n  vec2 dispVec = vec2(disp.r, disp.g);\n  vec2 distortedPosition1 = vUv + getRotM(angle1) * dispVec * intensity1 * dispFactor;\n  vec2 distortedPosition2 = vUv + getRotM(angle2) * dispVec * intensity2 * (1.0 - dispFactor);\n  vec4 _texture1 = texture2D(texture1, distortedPosition1);\n  vec4 _texture2 = texture2D(texture2, distortedPosition2);\n  gl_FragColor = mix(_texture1, _texture2, dispFactor);\n}\n", transparent: !0, opacity: 1 }),
                        y = new f.PlaneBufferGeometry(w.offsetWidth, w.offsetHeight, 1),
                        b = new f.Mesh(y, $);
                    A.add(b), z && (w.addEventListener("mouseenter", j), w.addEventListener("touchstart", j), w.addEventListener("mouseleave", O), w.addEventListener("touchend", O)), window.addEventListener("resize", function(f) { k.setSize(w.offsetWidth, w.offsetHeight) }), this.next = j, this.previous = O
                } else console.warn("One or more images are missing");
            else console.warn("Parent missing");

            function j() { l.to($.uniforms.dispFactor, W, { value: 1, ease: q, onUpdate: J, onComplete: J }) }

            function O() { l.to($.uniforms.dispFactor, _, { value: 0, ease: q, onUpdate: J, onComplete: J }) }
        }
});
//# sourceMappingURL=hover-effect.umd.js.map