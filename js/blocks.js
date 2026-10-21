export const toolboxXml = `
<xml id="toolbox" style="display:none">
  <category name="Control" colour="#5E81AC">
    <block type="when_green_flag"></block>
    <block type="loop_forever"></block>
    <block type="if_touching_sprite"></block>
    <block type="wait_seconds"></block>
  </category>

  <category name="Motion" colour="#E67E22">
    <block type="move_steps"></block>
    <block type="set_xy"></block>
    <block type="move_toward_sprite"></block>
    <block type="turn_right"></block>
    <block type="turn_left"></block>
  </category>

  <category name="Looks" colour="#C25D91">
    <block type="show_sprite"></block>
    <block type="hide_sprite"></block>
    <block type="set_size"></block>
    <block type="set_color"></block>
  </category>

  <category name="Sensing" colour="#2ECC71">
    <block type="sprite_touching_other"></block>
    <block type="distance_to_sprite"></block>
    <block type="touching_edge"></block>
  </category>

  <category name="Variables" colour="#F1C40F">
    <block type="set_variable"></block>
    <block type="change_variable"></block>
    <block type="random_between"></block>
  </category>

  <category name="Sprites" colour="#8E44AD">
    <block type="destroy_sprite"></block>
    <block type="set_position_absolute"></block>
  </category>

  <category name="Sounds" colour="#16A085">
    <block type="play_sound"></block>
  </category>
</xml>`;

export function registerCustomBlocks() {
  if (typeof window === 'undefined' || typeof Blockly === 'undefined') {
    return;
  }

  if (window.__miniEngineBlocksRegistered) {
    return;
  }

  const blocks = [
    {
      type: 'when_green_flag',
      message0: 'when green flag clicked %1',
      args0: [{ type: 'input_statement', name: 'DO' }],
      colour: 180,
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: 'loop_forever',
      message0: 'forever %1',
      args0: [{ type: 'input_statement', name: 'DO' }],
      colour: 160,
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: 'if_touching_sprite',
      message0: 'if touching %1 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'SPRITE',
          options: [
            ['Player', 'Player'],
            ['Coin', 'Coin'],
            ['Sprite', 'Sprite'],
          ],
        },
        { type: 'input_statement', name: 'DO' },
      ],
      colour: 160,
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: 'wait_seconds',
      message0: 'wait %1 seconds',
      args0: [{ type: 'input_value', name: 'SECONDS' }],
      colour: 160,
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: 'move_steps',
      message0: 'move %1 steps',
      args0: [{ type: 'input_value', name: 'STEPS' }],
      colour: 210,
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: 'set_xy',
      message0: 'set position x %1 y %2',
      args0: [
        { type: 'input_value', name: 'X' },
        { type: 'input_value', name: 'Y' },
      ],
      colour: 210,
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: 'move_toward_sprite',
      message0: 'move toward %1 at speed %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'SPRITE',
          options: [
            ['Player', 'Player'],
            ['Coin', 'Coin'],
            ['Sprite', 'Sprite'],
          ],
        },
        { type: 'input_value', name: 'SPEED' },
      ],
      colour: 210,
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: 'turn_right',
      message0: 'turn right %1 degrees',
      args0: [{ type: 'input_value', name: 'ANGLE' }],
      colour: 210,
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: 'turn_left',
      message0: 'turn left %1 degrees',
      args0: [{ type: 'input_value', name: 'ANGLE' }],
      colour: 210,
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: 'show_sprite',
      message0: 'show sprite',
      colour: 300,
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: 'hide_sprite',
      message0: 'hide sprite',
      colour: 300,
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: 'set_size',
      message0: 'set size to %1',
      args0: [{ type: 'input_value', name: 'SIZE' }],
      colour: 300,
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: 'set_color',
      message0: 'set color to %1',
      args0: [{ type: 'input_value', name: 'COLOR' }],
      colour: 300,
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: 'sprite_touching_other',
      message0: 'sprite touching %1',
      args0: [{ type: 'field_dropdown', name: 'SPRITE', options: [['Player', 'Player'], ['Coin', 'Coin'], ['Sprite', 'Sprite']] }],
      output: 'Boolean',
      colour: 120,
    },
    {
      type: 'distance_to_sprite',
      message0: 'distance to %1',
      args0: [{ type: 'field_dropdown', name: 'SPRITE', options: [['Player', 'Player'], ['Coin', 'Coin'], ['Sprite', 'Sprite']] }],
      output: 'Number',
      colour: 120,
    },
    {
      type: 'touching_edge',
      message0: 'touching edge',
      output: 'Boolean',
      colour: 120,
    },
    {
      type: 'set_variable',
      message0: 'set %1 to %2',
      args0: [
        { type: 'field_variable', name: 'VAR', variable: 'score' },
        { type: 'input_value', name: 'VALUE' },
      ],
      colour: 230,
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: 'change_variable',
      message0: 'change %1 by %2',
      args0: [
        { type: 'field_variable', name: 'VAR', variable: 'score' },
        { type: 'input_value', name: 'VALUE' },
      ],
      colour: 230,
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: 'random_between',
      message0: 'random between %1 and %2',
      args0: [
        { type: 'input_value', name: 'MIN' },
        { type: 'input_value', name: 'MAX' },
      ],
      output: 'Number',
      colour: 230,
    },
    {
      type: 'destroy_sprite',
      message0: 'hide and remove this sprite',
      colour: 290,
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: 'set_position_absolute',
      message0: 'set absolute x %1 y %2',
      args0: [
        { type: 'input_value', name: 'X' },
        { type: 'input_value', name: 'Y' },
      ],
      colour: 290,
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: 'play_sound',
      message0: 'play sound %1',
      args0: [{ type: 'field_dropdown', name: 'SOUND', options: [['Bleep', 'Bleep'], ['Chime', 'Chime'], ['Pop', 'Pop']] }],
      colour: 150,
      previousStatement: null,
      nextStatement: null,
    },
  ];

  Blockly.defineBlocksWithJsonArray(blocks);

  Blockly.JavaScript['when_green_flag'] = function (block) {
    return Blockly.JavaScript.statementToCode(block, 'DO');
  };

  Blockly.JavaScript['loop_forever'] = function (block) {
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    return `engine.registerLoop(setInterval(() => {\n${branch}\n}, 80));\n`;
  };

  Blockly.JavaScript['if_touching_sprite'] = function (block) {
    const spriteName = block.getFieldValue('SPRITE');
    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    return `if (engine.isTouchingSprite(engine.currentSpriteId, ${JSON.stringify(spriteName)})) {\n${branch}\n}\n`;
  };

  Blockly.JavaScript['wait_seconds'] = function (block) {
    const seconds = Blockly.JavaScript.valueToCode(block, 'SECONDS', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return `engine.wait(${seconds});\n`;
  };

  Blockly.JavaScript['move_steps'] = function (block) {
    const steps = Blockly.JavaScript.valueToCode(block, 'STEPS', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return `engine.moveSprite(engine.currentSpriteId, ${steps});\n`;
  };

  Blockly.JavaScript['set_xy'] = function (block) {
    const x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    const y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return `engine.setPosition(engine.currentSpriteId, ${x}, ${y});\n`;
  };

  Blockly.JavaScript['move_toward_sprite'] = function (block) {
    const target = block.getFieldValue('SPRITE');
    const speed = Blockly.JavaScript.valueToCode(block, 'SPEED', Blockly.JavaScript.ORDER_ATOMIC) || '3';
    return `engine.moveTowardSprite(engine.currentSpriteId, ${JSON.stringify(target)}, ${speed});\n`;
  };

  Blockly.JavaScript['turn_right'] = function (block) {
    const angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || '10';
    return `engine.turn(engine.currentSpriteId, ${angle});\n`;
  };

  Blockly.JavaScript['turn_left'] = function (block) {
    const angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || '10';
    return `engine.turn(engine.currentSpriteId, -(${angle}));\n`;
  };

  Blockly.JavaScript['show_sprite'] = function () {
    return `engine.showSprite(engine.currentSpriteId);\n`;
  };

  Blockly.JavaScript['hide_sprite'] = function () {
    return `engine.hideSprite(engine.currentSpriteId);\n`;
  };

  Blockly.JavaScript['set_size'] = function (block) {
    const size = Blockly.JavaScript.valueToCode(block, 'SIZE', Blockly.JavaScript.ORDER_ATOMIC) || '100';
    return `engine.setSize(engine.currentSpriteId, ${size});\n`;
  };

  Blockly.JavaScript['set_color'] = function (block) {
    const color = Blockly.JavaScript.valueToCode(block, 'COLOR', Blockly.JavaScript.ORDER_ATOMIC) || "'#4ecdc4'";
    return `engine.setColor(engine.currentSpriteId, ${color});\n`;
  };

  Blockly.JavaScript['sprite_touching_other'] = function (block) {
    const target = block.getFieldValue('SPRITE');
    return [`engine.isTouchingSprite(engine.currentSpriteId, ${JSON.stringify(target)})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };

  Blockly.JavaScript['distance_to_sprite'] = function (block) {
    const target = block.getFieldValue('SPRITE');
    return [`engine.distanceToSprite(engine.currentSpriteId, ${JSON.stringify(target)})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };

  Blockly.JavaScript['touching_edge'] = function () {
    return [`engine.isTouchingEdge(engine.currentSpriteId)`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };

  Blockly.JavaScript['set_variable'] = function (block) {
    const variableName = block.getFieldValue('VAR') || 'score';
    const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return `engine.setVariable(engine.currentSpriteId, ${JSON.stringify(variableName)}, ${value});\n`;
  };

  Blockly.JavaScript['change_variable'] = function (block) {
    const variableName = block.getFieldValue('VAR') || 'score';
    const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return `engine.changeVariable(engine.currentSpriteId, ${JSON.stringify(variableName)}, ${value});\n`;
  };

  Blockly.JavaScript['random_between'] = function (block) {
    const min = Blockly.JavaScript.valueToCode(block, 'MIN', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    const max = Blockly.JavaScript.valueToCode(block, 'MAX', Blockly.JavaScript.ORDER_ATOMIC) || '10';
    return [`(Math.random() * (Number(${max}) - Number(${min})) + Number(${min}))`, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['destroy_sprite'] = function () {
    return `engine.destroySprite(engine.currentSpriteId);\n`;
  };

  Blockly.JavaScript['set_position_absolute'] = function (block) {
    const x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    const y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return `engine.setPosition(engine.currentSpriteId, ${x}, ${y});\n`;
  };

  Blockly.JavaScript['play_sound'] = function (block) {
    const soundName = block.getFieldValue('SOUND');
    return `engine.playSound(engine.currentSpriteId, ${JSON.stringify(soundName)});\n`;
  };

  window.__miniEngineBlocksRegistered = true;
}
