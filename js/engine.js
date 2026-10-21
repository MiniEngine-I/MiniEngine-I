export class MiniEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.sprites = [];
    this.selectedSpriteId = null;
    this.loops = [];
    this.running = false;
    this.currentSpriteId = null;
    this.animationFrame = null;
    this.audioContext = null;
  }

  addSprite(sprite) {
    this.sprites.push(sprite);
    if (!this.selectedSpriteId) {
      this.selectedSpriteId = sprite.id;
    }
    return sprite;
  }

  getSpriteById(id) {
    return this.sprites.find((sprite) => sprite.id === id) ?? null;
  }

  getSpriteByName(name) {
    if (!name) return null;
    return this.sprites.find((sprite) => sprite.name.toLowerCase() === String(name).toLowerCase()) ?? null;
  }

  setSelectedSprite(id) {
    this.selectedSpriteId = id;
    this.currentSpriteId = id;
  }

  registerLoop(handle) {
    this.loops.push(handle);
  }

  clearLoops() {
    for (const handle of this.loops) {
      clearInterval(handle);
    }
    this.loops = [];
  }

  setVariable(spriteId, name, value) {
    const sprite = this.getSpriteById(spriteId);
    if (!sprite) return;
    sprite.variables[name] = Number(value) || value;
  }

  changeVariable(spriteId, name, delta) {
    const sprite = this.getSpriteById(spriteId);
    if (!sprite) return;
    const current = Number(sprite.variables[name] ?? 0);
    sprite.variables[name] = current + Number(delta || 0);
  }

  setPosition(spriteId, x, y) {
    const sprite = this.getSpriteById(spriteId);
    if (!sprite) return;
    sprite.x = Number(x || 0);
    sprite.y = Number(y || 0);
  }

  moveSprite(spriteId, steps) {
    const sprite = this.getSpriteById(spriteId);
    if (!sprite) return;
    const radians = (sprite.rotation * Math.PI) / 180;
    sprite.x += Math.cos(radians) * Number(steps || 0);
    sprite.y += Math.sin(radians) * Number(steps || 0);
  }

  turn(spriteId, angle) {
    const sprite = this.getSpriteById(spriteId);
    if (!sprite) return;
    sprite.rotation += Number(angle || 0);
  }

  moveTowardSprite(spriteId, targetName, speed) {
    const sprite = this.getSpriteById(spriteId);
    const target = this.getSpriteByName(targetName);
    if (!sprite || !target) return;

    const dx = target.x - sprite.x;
    const dy = target.y - sprite.y;
    const distance = Math.hypot(dx, dy) || 1;

    sprite.x += (dx / distance) * Number(speed || 0);
    sprite.y += (dy / distance) * Number(speed || 0);
  }

  distanceToSprite(spriteId, targetName) {
    const sprite = this.getSpriteById(spriteId);
    const target = this.getSpriteByName(targetName);
    if (!sprite || !target) return 0;
    return Math.hypot(target.x - sprite.x, target.y - sprite.y);
  }

  isTouchingSprite(spriteId, targetName) {
    const sprite = this.getSpriteById(spriteId);
    const target = this.getSpriteByName(targetName);
    if (!sprite || !target) return false;

    const distance = Math.hypot(target.x - sprite.x, target.y - sprite.y);
    const threshold = (sprite.size + target.size) / 2;
    return distance <= threshold;
  }

  isTouchingEdge(spriteId) {
    const sprite = this.getSpriteById(spriteId);
    if (!sprite) return false;
    const halfSize = sprite.size / 2;
    return sprite.x + halfSize > this.canvas.width / 2 || sprite.x - halfSize < -this.canvas.width / 2 || sprite.y + halfSize > this.canvas.height / 2 || sprite.y - halfSize < -this.canvas.height / 2;
  }

  hideSprite(spriteId) {
    const sprite = this.getSpriteById(spriteId);
    if (!sprite) return;
    sprite.visible = false;
  }

  showSprite(spriteId) {
    const sprite = this.getSpriteById(spriteId);
    if (!sprite) return;
    sprite.visible = true;
  }

  setSize(spriteId, size) {
    const sprite = this.getSpriteById(spriteId);
    if (!sprite) return;
    sprite.size = Number(size || 50);
  }

  setColor(spriteId, color) {
    const sprite = this.getSpriteById(spriteId);
    if (!sprite) return;
    sprite.color = color || sprite.color;
    sprite.costumes[0].dataUrl = sprite.createDefaultCostumeDataUrl(sprite.color);
  }

  destroySprite(spriteId) {
    const sprite = this.getSpriteById(spriteId);
    if (!sprite) return;
    sprite.visible = false;
    sprite.deleted = true;
  }

  wait(seconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, Number(seconds || 0) * 1000);
    });
  }

  getAudioContext() {
    if (!this.audioContext) {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (AudioCtor) {
        this.audioContext = new AudioCtor();
      }
    }
    return this.audioContext;
  }

  playSound(spriteId, soundName) {
    const context = this.getAudioContext();
    if (!context) return;

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    const frequency = {
      Bleep: 330,
      Chime: 540,
      Pop: 780,
    }[soundName] || 440;

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gainNode.gain.value = 0.03;

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.13);
  }

  drawSprite(sprite) {
    const ctx = this.ctx;
    const image = new Image();
    image.src = sprite.getCurrentCostume().dataUrl;

    ctx.save();
    ctx.translate(this.canvas.width / 2 + sprite.x, this.canvas.height / 2 - sprite.y);
    ctx.rotate((sprite.rotation * Math.PI) / 180);
    ctx.translate(-sprite.size / 2, -sprite.size / 2);
    ctx.drawImage(image, 0, 0, sprite.size, sprite.size);
    ctx.restore();
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.fillStyle = '#eaf7ff';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.strokeStyle = 'rgba(30, 41, 59, 0.18)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= this.canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= this.canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.canvas.width, y);
      ctx.stroke();
    }

    for (const sprite of this.sprites) {
      if (!sprite.visible || sprite.deleted) continue;
      this.drawSprite(sprite);
    }
  }

  start() {
    this.running = true;
    const tick = () => {
      this.render();
      if (this.running) {
        this.animationFrame = requestAnimationFrame(tick);
      }
    };

    if (!this.animationFrame) {
      this.animationFrame = requestAnimationFrame(tick);
    }
  }

  stop() {
    this.running = false;
    this.clearLoops();
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    this.render();
  }
}
