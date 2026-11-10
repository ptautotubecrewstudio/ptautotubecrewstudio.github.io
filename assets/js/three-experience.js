import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.187.0/build/three.module.js";

(() => {
  "use strict";

  const host = document.querySelector(".hero-background");
  if (!host) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = document.createElement("canvas");
  canvas.className = "hero-3d-canvas";
  canvas.setAttribute("aria-hidden", "true");
  host.prepend(canvas);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power"
    });
  } catch (error) {
    canvas.remove();
    host.classList.add("three-fallback");
    console.warn("AUTOTUBE 3D scene unavailable; using CSS fallback.", error);
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 0, 8.5);

  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.62, 3),
    new THREE.MeshBasicMaterial({
      color: 0x16090c,
      transparent: true,
      opacity: 0.64
    })
  );
  globeGroup.add(core);

  const wireframe = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.66, 2),
    new THREE.MeshBasicMaterial({
      color: 0xe50920,
      wireframe: true,
      transparent: true,
      opacity: 0.34
    })
  );
  globeGroup.add(wireframe);

  const edgeGeometry = new THREE.EdgesGeometry(
    new THREE.IcosahedronGeometry(1.72, 2)
  );
  const edgeLines = new THREE.LineSegments(
    edgeGeometry,
    new THREE.LineBasicMaterial({
      color: 0xff5262,
      transparent: true,
      opacity: 0.42
    })
  );
  globeGroup.add(edgeLines);

  const nodePositions = [];
  const nodeCount = 420;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < nodeCount; i += 1) {
    const y = 1 - (i / (nodeCount - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    nodePositions.push(
      1.69 * Math.cos(theta) * radius,
      1.69 * y,
      1.69 * Math.sin(theta) * radius
    );
  }

  const nodeGeometry = new THREE.BufferGeometry();
  nodeGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(nodePositions, 3)
  );

  const nodes = new THREE.Points(
    nodeGeometry,
    new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.022,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    })
  );
  globeGroup.add(nodes);

  const orbitA = new THREE.Mesh(
    new THREE.TorusGeometry(2.05, 0.006, 6, 180),
    new THREE.MeshBasicMaterial({
      color: 0xe50920,
      transparent: true,
      opacity: 0.35
    })
  );
  orbitA.rotation.set(0.9, 0.25, 0.3);
  globeGroup.add(orbitA);

  const orbitB = new THREE.Mesh(
    new THREE.TorusGeometry(2.18, 0.004, 6, 180),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.16
    })
  );
  orbitB.rotation.set(1.25, -0.55, -0.45);
  globeGroup.add(orbitB);

  const starPositions = [];
  for (let i = 0; i < 260; i += 1) {
    starPositions.push(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 5 - 1
    );
  }

  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starPositions, 3)
  );

  const stars = new THREE.Points(
    starGeometry,
    new THREE.PointsMaterial({
      color: 0x9b9b9b,
      size: 0.012,
      transparent: true,
      opacity: 0.42
    })
  );
  scene.add(stars);

  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

  function resize() {
    const width = Math.max(host.clientWidth, 1);
    const height = Math.max(host.clientHeight, 1);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    globeGroup.position.x = width < 650 ? 0.35 : width < 950 ? 1.05 : 1.7;
    globeGroup.scale.setScalar(width < 650 ? 0.72 : width < 950 ? 0.86 : 1);
  }

  function onPointerMove(event) {
    const bounds = host.getBoundingClientRect();
    pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
  }

  function renderStatic() {
    renderer.render(scene, camera);
  }

  function animate() {
    if (document.hidden) {
      window.requestAnimationFrame(animate);
      return;
    }

    target.x += (pointer.y * 0.12 - target.x) * 0.025;
    target.y += (pointer.x * 0.18 - target.y) * 0.025;

    globeGroup.rotation.x = target.x + 0.16;
    globeGroup.rotation.y += 0.0018 + target.y * 0.001;
    edgeLines.rotation.y = -globeGroup.rotation.y * 0.35;
    orbitA.rotation.z += 0.0008;
    orbitB.rotation.y += 0.0005;
    stars.rotation.y += 0.00008;

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  const pointerTarget = host.closest(".hero") || window;
  pointerTarget.addEventListener("pointermove", onPointerMove, { passive: true });

  if (reducedMotion) {
    renderStatic();
  } else {
    animate();
  }
})();
