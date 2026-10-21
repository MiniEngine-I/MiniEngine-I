* {
  box-sizing: border-box;
}

:root {
  --bg: #f3f0ea;
  --panel: #f8f6f2;
  --panel-strong: #f1efe9;
  --panel-edge: #d9d1c7;
  --ink: #1d1d1b;
  --muted: #6b685f;
  --line: rgba(29, 29, 27, 0.12);
  --soft: rgba(29, 29, 27, 0.04);
  --accent: #d67a3a;
  --accent-soft: #f5e1d0;
  --accent-strong: #b9642c;
  --green: #4f8b69;
  --green-soft: #dfeee5;
  --danger: #ae4c4c;
  --danger-soft: #f4dede;
  --shadow: 0 8px 22px rgba(30, 24, 17, 0.08);
  --radius: 14px;
}

html, body {
  margin: 0;
  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
  font-family: "Segoe UI", Tahoma, sans-serif;
}

button, input {
  font: inherit;
}

button {
  border: 1px solid var(--panel-edge);
  border-radius: 10px;
  background: #fff;
  color: var(--ink);
  cursor: pointer;
  transition: transform 0.14s ease, box-shadow 0.14s ease;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(29, 29, 27, 0.05);
}

input[type="text"], input[type="number"], input[type="color"], input[type="file"] {
  width: 100%;
  border: 1px solid var(--panel-edge);
  border-radius: 10px;
  background: #fff;
  color: var(--ink);
  padding: 9px 10px;
}

input[type="range"] {
  accent-color: var(--accent);
}

.app-shell {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: var(--bg);
}

.sidebar {
  width: 320px;
  background: var(--panel);
  border-right: 1px solid var(--line);
  padding: 18px 14px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidebar-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

.eyebrow {
  margin: 0 0 4px;
  color: var(--muted);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.sidebar-header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.primary-btn {
  background: var(--accent);
  color: white;
  border-color: var(--accent-strong);
}

.secondary-btn {
  background: #fff;
}

.ghost-btn {
  background: var(--panel-strong);
}

.danger-btn {
  background: var(--danger-soft);
  color: var(--danger);
  border-color: rgba(174, 76, 76, 0.22);
}

.sprite-toolbar {
  display: none;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 12px;
  box-shadow: var(--shadow);
}

.sprite-toolbar.active {
  display: block;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
  font-size: 0.75rem;
  color: var(--muted);
}

.field.compact {
  margin-bottom: 0;
}

.sprite-toolbar-row {
  display: flex;
  gap: 8px;
  align-items: stretch;
}

.sprite-toolbar-row > * {
  flex: 1;
}

.sprite-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
  padding-right: 2px;
}

.sprite-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: rgba(255,255,255,0.8);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 10px 12px;
  cursor: pointer;
  min-height: 52px;
}

.sprite-card.selected {
  border-color: rgba(214, 122, 58, 0.45);
  background: rgba(245, 225, 208, 0.6);
}

.sprite-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.sprite-thumb {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 0.7rem;
  font-weight: 700;
  color: rgba(16, 16, 16, 0.75);
  border: 1px solid rgba(0,0,0,0.08);
  flex-shrink: 0;
  background: #d9d9d9;
}

.sprite-name {
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sprite-status {
  font-size: 0.7rem;
  color: var(--muted);
  background: var(--soft);
  border-radius: 999px;
  padding: 4px 8px;
}

.main-panel {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 14px 18px 12px;
  border-bottom: 1px solid var(--line);
  background: var(--panel);
}

.tab-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tab-btn {
  min-width: 84px;
  background: #fff;
  border: 1px solid var(--panel-edge);
}

.tab-btn.active {
  background: var(--accent-soft);
  border-color: rgba(214, 122, 58, 0.5);
  color: var(--ink);
}

.actions {
  display: flex;
  gap: 8px;
}

.stage-panel {
  padding: 12px 18px 0;
}

#stageCanvas {
  display: block;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  background: #eaf1f8;
  border: 1px solid rgba(28, 34, 53, 0.08);
  border-radius: 14px;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.7);
}

.empty-editor-state {
  display: block;
  margin: 10px 18px 0;
  color: var(--muted);
  font-size: 0.8rem;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px dashed var(--panel-edge);
  background: rgba(255,255,255,0.35);
}

.empty-editor-state.hidden {
  display: none;
}

.tab-panel {
  flex: 1;
  min-height: 0;
  display: block;
  padding: 12px 18px 18px;
}

.tab-panel.hidden {
  display: none;
}

.blockly-area {
  height: 100%;
  min-height: 320px;
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
  border: 1px solid var(--line);
}

#blocklyDiv {
  height: 100%;
  min-height: 320px;
  width: 100%;
}

.costume-editor, .sound-editor {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.tool-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
}

.canvas-tool-group {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tool-btn {
  background: #fff;
  padding: 7px 10px;
}

.tool-btn.active {
  background: var(--accent-soft);
  border-color: rgba(214, 122, 58, 0.5);
}

.canvas-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px;
  border: 1px solid var(--line);
  background: var(--panel-strong);
  border-radius: 14px;
}

#costumeCanvas {
  width: min(420px, 100%);
  aspect-ratio: 1;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.08);
  background: #1f2937;
  cursor: crosshair;
}

.sound-import-row {
  justify-content: space-between;
}

.file-picker {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--ink);
  font-size: 0.9rem;
}

.file-picker input {
  max-width: 220px;
}

.sound-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.sound-chip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 10px 12px;
  min-width: 170px;
}

.sound-chip .name {
  font-size: 0.88rem;
  max-width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sound-chip button {
  background: var(--green-soft);
  color: var(--green);
  border-color: rgba(79, 139, 105, 0.22);
  padding: 5px 10px;
}

.sound-empty {
  color: var(--muted);
  background: rgba(255,255,255,0.5);
  border: 1px dashed var(--line);
  border-radius: 12px;
  padding: 12px;
}

@media (max-width: 920px) {
  .app-shell {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--line);
  }

  .main-panel {
    min-height: 60vh;
  }

  .topbar {
    flex-wrap: wrap;
  }

  .actions {
    width: 100%;
    justify-content: flex-end;
  }
}

@media (max-width: 580px) {
  .sidebar-header {
    flex-direction: column;
    align-items: stretch;
  }

  .sprite-toolbar-row {
    flex-wrap: wrap;
  }

  .tab-btn {
    flex: 1 1 calc(50% - 8px);
  }

  .sound-chip {
    width: 100%;
  }
}
