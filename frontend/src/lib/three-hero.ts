"use client";

import * as THREE from "three";
import { gsap } from "@/lib/gsap";

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function createDashboardTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 512;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, 512);
  gradient.addColorStop(0, "#1B4D3E");
  gradient.addColorStop(1, "#0D2B22");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 512);

  ctx.fillStyle = "#C9A84C";
  roundedRect(ctx, 20, 18, 216, 44, 14);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.12)";
  roundedRect(ctx, 20, 84, 100, 76, 16);
  ctx.fill();
  roundedRect(ctx, 136, 84, 100, 76, 16);
  ctx.fill();

  for (let index = 0; index < 5; index += 1) {
    ctx.fillStyle = index % 2 === 0 ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)";
    roundedRect(ctx, 20, 186 + index * 58, 216, 40, 12);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function createPhoneScene(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    42,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100,
  );
  camera.position.set(0, 0.1, 5.2);

  const group = new THREE.Group();
  scene.add(group);

  const phoneGeo = new THREE.BoxGeometry(1.55, 3.05, 0.14);
  const phoneMat = new THREE.MeshPhongMaterial({
    color: 0x0d2b22,
    specular: 0xc9a84c,
    shininess: 80,
  });
  const phone = new THREE.Mesh(phoneGeo, phoneMat);
  group.add(phone);

  const screenGeo = new THREE.PlaneGeometry(1.34, 2.76);
  const screenMat = new THREE.MeshBasicMaterial({
    map: createDashboardTexture(),
  });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.z = 0.08;
  group.add(screen);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.45, 0.025, 20, 80),
    new THREE.MeshBasicMaterial({
      color: 0xc9a84c,
      transparent: true,
      opacity: 0.26,
    }),
  );
  ring.rotation.x = Math.PI / 2.3;
  ring.position.set(0.15, 0.05, -0.6);
  scene.add(ring);

  const goldLight = new THREE.PointLight(0xc9a84c, 4, 14);
  goldLight.position.set(2.5, 2.8, 3.5);
  scene.add(goldLight);

  const fillLight = new THREE.PointLight(0xffffff, 1.2, 12);
  fillLight.position.set(-3, -1.5, 3);
  scene.add(fillLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  gsap.to(group.rotation, {
    y: Math.PI * 2,
    duration: 22,
    repeat: -1,
    ease: "none",
  });
  gsap.to(group.position, {
    y: 0.16,
    duration: 2.8,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut",
  });
  gsap.to(ring.rotation, {
    z: Math.PI * 2,
    duration: 14,
    repeat: -1,
    ease: "none",
  });

  let frameId = 0;

  const resize = () => {
    const { clientWidth, clientHeight } = canvas;
    renderer.setSize(clientWidth, clientHeight, false);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
  };

  const animate = () => {
    frameId = window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  resize();
  animate();
  window.addEventListener("resize", resize);

  return () => {
    window.cancelAnimationFrame(frameId);
    window.removeEventListener("resize", resize);
    renderer.dispose();
    phoneGeo.dispose();
    phoneMat.dispose();
    screenGeo.dispose();
    screenMat.map?.dispose();
    screenMat.dispose();
    ring.geometry.dispose();
    if (Array.isArray(ring.material)) {
      ring.material.forEach((material) => material.dispose());
    } else {
      ring.material.dispose();
    }
  };
}
