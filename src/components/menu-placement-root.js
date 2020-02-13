AFRAME.registerComponent("menu-placement-root", {
  schema: {
    menuSelector: { type: "string" }
  },
  init() {
    this.didRegisterWithSystems = false;
  },
  // Can't register with the system in init() or play() because menus do not seem to exist yet
  // under elements loaded from objects.gltf (The pinned room objects).
  tick() {
    if (!this.didRegisterWithSystems) {
      this.didRegisterWithSystems = true;
      const systems = this.el.sceneEl.systems["hubs-systems"];
      const menuEl = this.el.querySelector(this.data.menuSelector);
      systems.boundingSphereSystem.register(this.el);
      systems.boundingSphereVisualizationSystem.register(this.el);
      systems.menuPlacementSystem.register(this.el, menuEl);
      systems.menuAnimationSystem.register(menuEl);
    }
  },
  remove() {
    if (this.didRegisterWithSystems) {
      const systems = this.el.sceneEl.systems["hubs-systems"];
      const menuEl = this.el.querySelector(this.data.menuSelector);
      systems.boundingSphereSystem.unregister(this.el);
      systems.boundingSphereVisualizationSystem.unregister(this.el);
      systems.menuPlacementSystem.unregister(this.el);
      systems.menuAnimationSystem.unregister(menuEl);
    }
  }
});
