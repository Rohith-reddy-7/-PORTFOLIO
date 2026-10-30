"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function NeuralScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.4, 10);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0b0c0e, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const stage = new THREE.Group();
    stage.rotation.set(-0.12, -0.26, 0.06);
    scene.add(stage);
    const disposable: THREE.Object3D[] = [];
    const amber = new THREE.MeshBasicMaterial({ color: 0xb96b11, transparent: true, opacity: 0.94 });
    const paper = new THREE.MeshBasicMaterial({ color: 0x131518, transparent: true, opacity: 0.72 });
    const faint = new THREE.LineBasicMaterial({ color: 0x59636d, transparent: true, opacity: 0.5 });

    const chart = new THREE.Group();
    chart.position.set(-2.25, -0.85, 0.1);
    chart.rotation.set(-0.15, 0.25, 0);
    stage.add(chart);
    const chartGrid = new THREE.GridHelper(3.4, 6, 0xb96b11, 0x9ca3a8);
    chartGrid.rotation.x = Math.PI / 2;
    chartGrid.material.transparent = true;
    chartGrid.material.opacity = 0.38;
    chart.add(chartGrid);
    disposable.push(chartGrid);
    const barHeights = [0.7, 1.35, 0.95, 1.85, 1.45, 2.2];
    const bars = barHeights.map((height, index) => {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.3, height, 0.3), index === 5 ? amber : paper);
      bar.position.set(-1.35 + index * 0.52, height / 2 - 1.2, 0);
      chart.add(bar);
      disposable.push(bar);
      return { bar, baseY: bar.position.y };
    });

    const network = new THREE.Group();
    network.position.set(1.95, 0.2, 0.25);
    network.rotation.y = -0.25;
    stage.add(network);
    const networkPoints = [
      new THREE.Vector3(-0.9, 0.8, 0), new THREE.Vector3(-0.9, 0, 0.1), new THREE.Vector3(-0.9, -0.8, 0),
      new THREE.Vector3(0, 0.45, 0.25), new THREE.Vector3(0, -0.45, 0.25), new THREE.Vector3(0.9, 0.1, 0.45),
    ];
    const networkNodes = networkPoints.map((point, index) => {
      const node = new THREE.Mesh(new THREE.SphereGeometry(index === 5 ? 0.16 : 0.1, 12, 8), index === 5 ? amber : paper);
      node.position.copy(point);
      network.add(node);
      disposable.push(node);
      return node;
    });
    const networkLines: number[] = [];
    [[0, 3], [0, 4], [1, 3], [1, 4], [2, 3], [2, 4], [3, 5], [4, 5]].forEach(([from, to]) => {
      networkLines.push(...networkPoints[from].toArray(), ...networkPoints[to].toArray());
    });
    const networkGeometry = new THREE.BufferGeometry();
    networkGeometry.setAttribute("position", new THREE.Float32BufferAttribute(networkLines, 3));
    const networkMesh = new THREE.LineSegments(networkGeometry, faint);
    network.add(networkMesh);
    disposable.push(networkMesh);

    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.72, 2), new THREE.MeshBasicMaterial({ color: 0xb96b11, wireframe: true, transparent: true, opacity: 0.82 }));
    core.position.set(0, 0.2, 0.55);
    stage.add(core);
    disposable.push(core);
    const coreRing = new THREE.Mesh(new THREE.RingGeometry(0.94, 0.96, 64), new THREE.MeshBasicMaterial({ color: 0xb96b11, side: THREE.DoubleSide, transparent: true, opacity: 0.62 }));
    coreRing.position.copy(core.position);
    coreRing.rotation.x = Math.PI / 2.2;
    stage.add(coreRing);
    disposable.push(coreRing);

    const resize = () => {
      const width = mount.clientWidth || 640;
      const height = mount.clientHeight || 560;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    const animate = (time: number) => {
      stage.rotation.y = -0.26 + time * 0.00005;
      chart.rotation.z = Math.sin(time * 0.0004) * 0.025;
      bars.forEach(({ bar, baseY }, index) => { bar.position.y = baseY + Math.sin(time * 0.001 + index) * 0.04; });
      network.rotation.y = -0.25 + Math.sin(time * 0.00035) * 0.06;
      networkNodes.forEach((node, index) => { node.scale.setScalar(1 + Math.sin(time * 0.0012 + index) * 0.12); });
      core.rotation.x = time * 0.00018;
      core.rotation.z = -time * 0.0002;
      coreRing.rotation.z = time * 0.0003;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      disposable.forEach((object) => {
        const mesh = object as THREE.Mesh | THREE.LineSegments;
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) mesh.material.forEach((material) => material.dispose());
        else mesh.material.dispose();
      });
      amber.dispose();
      paper.dispose();
      faint.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="neural-scene" aria-label="3D data chart and neural network visualization" role="img"><div className="domain-label domain-label-ai">AI / ML</div><div className="domain-label domain-label-python">PYTHON</div><div className="domain-label domain-label-cloud">CLOUD</div><div className="domain-label domain-label-data">DATA</div></div>;
}
