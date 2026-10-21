import { Sprite } from './sprite.js';
import { MiniEngine } from './engine.js';
import { toolboxXml, registerCustomBlocks } from './blocks.js';

const stageCanvas = document.getElementById('stageCanvas');
const canvas = document.getElementById('costumeCanvas');
const ctx = canvas.getContext('2d');
const engine = new MiniEngine(stageCanvas);
const workspaceMap = new Map();

const spriteListEl = document.getElementById('spriteList');
const addSpriteButton = document.getElementById('addSpriteButton');
const runButton = document.getElementById('runButton');
const stopButton = document.getElementById('stopButton');

const tabButtons = [...document.querySelectorAll('.tab-btn')];
const tabPanels = {
  code: document.getElementById('codeTab'),
  costume: document.getElementById('costumeTab'),
  sound: document.getElementById('soundTab'),
};

const brushSizeInput = document.getElementById('brushSize');
const brushColorInput = document.getElementById('brushColor');
const clearCostumeButton = document.getElementById('clearCostumeButton');
const toneFrequencyInput = document.getElementById('toneFrequency');
const toneDurationInput = document.getElementById('toneDuration');
const playToneButton = document.getElementById('playToneButton');
const saveToneButton = document.getElementById('saveToneButton');
const soundList = document.getElementById('soundList');

registerCustomBlocks();

function makeStarterSprites() {
  const player = new Sprite('Player');
  player.x = -150;
  player.y = 0;
  player.color = '#4ecdc4';
  player.size = 54;

  const coin = new Sprite('Coin');
  coin.x = 120;
  coin.y = 40;
  coin.color = '#f7b801';
  coin.size = 26;

  engine.addSprite(player);
  engine.addSprite(coin);
}

function createWorkspaceForSprite(sprite) {
  if (workspaceMap.has(sprite.id)) {
    return workspaceMap.get(sprite.id);
  }

  const workspace = Blockly.inject('blocklyDiv', {
    toolbox: toolboxXml,
    theme: Blockly.Themes.Classic,
    move: {
      scrollbars: true,
      drag: true,
      wheel: true,
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1,
      maxScale: 3,
      minScale: 0.3,
    },
  });

  workspace.addChangeListener(() => {
    const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    sprite.programXml = xml;
  });

  workspaceMap.set(sprite.id, workspace);
  return workspace;
}

function renderSpriteList() {
  spriteListEl.innerHTML = '';

  for (const sprite of engine.sprites) {
    const card = document.createElement('div');
    card.className = 'sprite-card';
    if (sprite.id === engine.selectedSpriteId) {
      card.classList.add('selected');
    }

    card.addEventListener('click', () => {
      engine.setSelectedSprite(sprite.id);
      renderSpriteList();
      loadSelectedSpriteWorkspace();
      renderCostumeCanvas();
      renderSoundList();
    });

    const meta = document.createElement('div');
    meta.className = 'sprite-meta';

    const thumb = document.createElement('div');
    thumb.className = 'sprite-thumb';
    thumb.textContent = sprite.name.slice(0, 2).toUpperCase();
    thumb.style.background = `linear-gradient(135deg, ${sprite.color}, #7cc6ff)`;

    const name = document.createElement('span');
    name.className = 'sprite-name';
    name.textContent = sprite.name;

    meta.append(thumb, name);

    const badge = document.createElement('span');
    badge.textContent = sprite.visible ? 'ON' : 'OFF';
    badge.style.color = sprite.visible ? '#5eead4' : '#fca5a5';
    badge.style.fontSize = '0.72rem';
    badge.style.opacity = '0.9';

    card.append(meta, badge);
    spriteListEl.appendChild(card);
  }
}

function loadSelectedSpriteWorkspace() {
  const sprite = engine.getSpriteById(engine.selectedSpriteId);
  if (!sprite) return;

  const workspace = createWorkspaceForSprite(sprite);
  const existingXml = sprite.programXml;
  workspace.clear();

  try {
    const dom = Blockly.Xml.textToDom(existingXml);
    if (dom && dom.nodeName !== '#text' && dom.childNodes.length > 0) {
      Blockly.Xml.domToWorkspace(dom, workspace);
    }
  } catch (error) {
    console.warn('Unable to restore workspace', error);
  }

  setTimeout(() => {
    workspace.resize();
  }, 20);
}

function runCurrentProject() {
  engine.stop();
  engine.clearLoops();

  const activeSprite = engine.getSpriteById(engine.selectedSpriteId);
  if (!activeSprite) return;

  for (const sprite of engine.sprites) {
    const workspace = workspaceMap.get(sprite.id);
    if (!workspace) continue;

    const script = Blockly.JavaScript.workspaceToCode(workspace);
    const runner = new Function('engine', `
      const sprite = engine.getSpriteById('${sprite.id}');
      engine.currentSpriteId = '${sprite.id}';
      try {
        ${script}
      } catch (error) {
        console.error('Script error on ' + sprite.name, error);
      }
    `);

    runner(engine);
  }

  engine.render();
  engine.start();
}

function setActiveTab(tabName) {
  tabButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tabName);
  });

  Object.entries(tabPanels).forEach(([key, panel]) => {
    panel.classList.toggle('hidden', key !== tabName);
  });
}

function renderCostumeCanvas() {
  const sprite = engine.getSpriteById(engine.selectedSpriteId);
  if (!sprite) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0b1020';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const image = new Image();
  image.onload = () => {
    const size = 180;
    const x = canvas.width / 2 - size / 2;
    const y = canvas.height / 2 - size / 2;
    ctx.drawImage(image, x, y, size, size);
  };
  image.src = sprite.getCurrentCostume().dataUrl;

  const activeColor = brushColorInput.value;
  brushColorInput.value = sprite.color;
  ctx.strokeStyle = activeColor;
}

function beginDrawing(event) {
  const sprite = engine.getSpriteById(engine.selectedSpriteId);
  if (!sprite) return;

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  const image = new Image();
  image.src = sprite.getCurrentCostume().dataUrl;

  ctx.lineWidth = Number(brushSizeInput.value);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = brushColorInput.value;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 1, y + 1);
  ctx.stroke();

  const dataUrl = canvas.toDataURL();
  sprite.costumes[0].dataUrl = dataUrl;
  sprite.color = brushColorInput.value;
  renderSpriteList();
}

function clearCostume() {
  const sprite = engine.getSpriteById(engine.selectedSpriteId);
  if (!sprite) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0b1020';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  sprite.costumes[0].dataUrl = sprite.createDefaultCostumeDataUrl(sprite.color);
  renderCostumeCanvas();
}

function renderSoundList() {
  const sprite = engine.getSpriteById(engine.selectedSpriteId);
  if (!sprite) return;

  soundList.innerHTML = '';

  if (!sprite.sounds.length) {
    const empty = document.createElement('div');
    empty.textContent = 'No sounds yet. Generate one in the sound tab.';
    empty.style.opacity = '0.82';
    soundList.appendChild(empty);
    return;
  }

  for (const sound of sprite.sounds) {
    const chip = document.createElement('div');
    chip.className = 'sound-chip';

    const label = document.createElement('span');
    label.textContent = sound.name;

    const play = document.createElement('button');
    play.textContent = 'Play';
    play.addEventListener('click', () => {
      const audio = new Audio(sound.dataUrl);
      audio.play();
    });

    chip.append(label, play);
    soundList.appendChild(chip);
  }
}

function generateTone() {
  const sprite = engine.getSpriteById(engine.selectedSpriteId);
  if (!sprite) return;

  const context = engine.getAudioContext();
  if (!context) return;

  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  const frequency = Number(toneFrequencyInput.value);
  const duration = Number(toneDurationInput.value);

  oscillator.type = 'square';
  oscillator.frequency.value = frequency;
  gainNode.gain.value = 0.05;
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start();
  oscillator.stop(context.currentTime + duration);

  const dataUrl = createToneDataUrl(frequency, duration);
  sprite.sounds.push({
    id: crypto.randomUUID(),
    name: `tone-${sprite.sounds.length + 1}`,
    dataUrl,
  });
  renderSoundList();
}

function createToneDataUrl(frequency, duration) {
  const waveform = new AudioContext();
  const sampleRate = 22050;
  const frameCount = sampleRate * duration;
  const audioBuffer = waveform.createBuffer(1, frameCount, sampleRate);
  const channelData = audioBuffer.getChannelData(0);

  for (let i = 0; i < frameCount; i += 1) {
    const t = i / sampleRate;
    const envelope = 1 - t / duration;
    channelData[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.25;
  }

  const wavBlob = audioBufferToWav(audioBuffer);
  return URL.createObjectURL(wavBlob);
}

function audioBufferToWav(audioBuffer) {
  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const format = 1;
  const bitDepth = 16;
  const samples = audioBuffer.length * numChannels;
  const buffer = new ArrayBuffer(44 + samples * 2);
  const view = new DataView(buffer);

  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i += 1) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + samples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * (bitDepth / 8), true);
  view.setUint16(32, numChannels * (bitDepth / 8), true);
  view.setUint16(34, bitDepth, true);
  writeString(36, 'data');
  view.setUint32(40, samples * 2, true);

  let offset = 44;
  for (let i = 0; i < audioBuffer.length; i += 1) {
    for (let channel = 0; channel < numChannels; channel += 1) {
      const data = Math.max(-1, Math.min(1, audioBuffer.getChannelData(channel)[i]));
      view.setInt16(offset, data < 0 ? data * 0x8000 : data * 0x7fff, true);
      offset += 2;
    }
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

function bindEvents() {
  addSpriteButton.addEventListener('click', () => {
    const count = engine.sprites.length + 1;
    const sprite = new Sprite(`Sprite ${count}`);
    sprite.x = (Math.random() - 0.5) * 250;
    sprite.y = (Math.random() - 0.5) * 180;
    sprite.color = ['#4ecdc4', '#f7b801', '#ff6b6b', '#81c784'][count % 4];
    engine.addSprite(sprite);
    renderSpriteList();
    engine.setSelectedSprite(sprite.id);
    loadSelectedSpriteWorkspace();
    renderCostumeCanvas();
    renderSoundList();
  });

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => setActiveTab(button.dataset.tab));
  });

  runButton.addEventListener('click', runCurrentProject);
  stopButton.addEventListener('click', () => {
    engine.stop();
  });

  clearCostumeButton.addEventListener('click', clearCostume);
  playToneButton.addEventListener('click', generateTone);

  canvas.addEventListener('pointerdown', beginDrawing);
  canvas.addEventListener('pointermove', (event) => {
    if (event.buttons === 1) {
      beginDrawing(event);
    }
  });

  saveToneButton.addEventListener('click', () => {
    generateTone();
  });
}

makeStarterSprites();
renderSpriteList();
engine.setSelectedSprite(engine.sprites[0].id);
loadSelectedSpriteWorkspace();
setActiveTab('code');
renderCostumeCanvas();
renderSoundList();
bindEvents();
engine.render();

window.engine = engine;
window.Blockly = Blockly;
window.addEventListener('resize', () => {
  for (const workspace of workspaceMap.values()) {
    workspace.resize();
  }
});

console.log('MiniEngine-I ready');

window.makeCoinExample = () => {
  const coin = engine.getSpriteByName('Coin');
  if (!coin) return;
  const workspace = workspaceMap.get(coin.id);
  if (!workspace) return;

  const xml = `
    <xml xmlns="http://www.w3.org/1999/xhtml">
      <block type="when_green_flag" x="80" y="80">
        <statement name="DO">
          <block type="loop_forever">
            <statement name="DO">
              <block type="if_touching_sprite">
                <field name="SPRITE">Player</field>
                <statement name="DO">
                  <block type="hide_sprite"></block>
                  <next>
                    <block type="change_variable">
                      <field name="VAR">score</field>
                      <value name="VALUE">
                        <block type="math_number">
                          <field name="NUM">1</field>
                        </block>
                      </value>
                    </block>
                  </next>
                </statement>
              </block>
            </statement>
          </block>
        </statement>
      </block>
    </xml>
  `;

  workspace.clear();
  Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), workspace);
  coin.programXml = xml;
};
