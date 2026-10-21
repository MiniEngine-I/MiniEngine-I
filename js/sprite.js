export class Sprite {
  constructor(name = 'Sprite') {
    this.id = crypto.randomUUID();
    this.name = name;
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.size = 46;
    this.visible = true;
    this.color = '#4ecdc4';
    this.variables = { score: 0, collected: 0 };
    this.costumes = [
      {
        id: crypto.randomUUID(),
        name: 'costume1',
        dataUrl: this.createDefaultCostumeDataUrl(this.color),
      },
    ];
    this.currentCostumeIndex = 0;
    this.sounds = [];
    this.programXml = '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';
  }

  createDefaultCostumeDataUrl(color) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="38" fill="${color}" />
        <circle cx="36" cy="40" r="6" fill="#fff" opacity="0.8" />
        <circle cx="64" cy="40" r="6" fill="#fff" opacity="0.8" />
        <path d="M32 62 Q50 72 68 62" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" />
      </svg>
    `;

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  getCurrentCostume() {
    return this.costumes[this.currentCostumeIndex] ?? this.costumes[0];
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      size: this.size,
      visible: this.visible,
      color: this.color,
      variables: this.variables,
      costumes: this.costumes,
      currentCostumeIndex: this.currentCostumeIndex,
      sounds: this.sounds,
      programXml: this.programXml,
    };
  }

  static fromJSON(data) {
    const sprite = new Sprite(data.name || 'Sprite');
    sprite.id = data.id || sprite.id;
    sprite.x = data.x ?? 0;
    sprite.y = data.y ?? 0;
    sprite.rotation = data.rotation ?? 0;
    sprite.size = data.size ?? 46;
    sprite.visible = data.visible ?? true;
    sprite.color = data.color || sprite.color;
    sprite.variables = data.variables || sprite.variables;
    sprite.costumes = data.costumes || sprite.costumes;
    sprite.currentCostumeIndex = data.currentCostumeIndex ?? 0;
    sprite.sounds = data.sounds || sprite.sounds;
    sprite.programXml = data.programXml || sprite.programXml;
    return sprite;
  }
}
