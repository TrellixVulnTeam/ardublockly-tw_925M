/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileOverview XML toolbox embedded into a JavaScript text string.
 */
'use strict';

/** Create a namespace for the application. */
var Ardublockly = Ardublockly || {};

Ardublockly.TOOLBOX_XML =
    '<xml id="toolbox" style="display:none">' +
    '  <category id="catFunctions" name="Functions" custom="PROCEDURE"></category>' +
    '  <sep></sep>' +
    '  <category id="catLogic" name="Logic">' +
    '    <block type="controls_if"></block>' +
    '    <block type="logic_compare"></block>' +
    '    <block type="logic_operation"></block>' +
    '    <block type="logic_negate"></block>' +
    '    <block type="logic_boolean"></block>' +
    '    <block type="logic_null"></block>' +
    '    <block type="logic_ternary"></block>' +
    '    <block type="controls_switch"></block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catLoops" name="Loops">' +
    '    <block type="controls_repeat_ext">' +
    '      <value name="TIMES">' +
    '        <block type="math_number">' +
    '          <field name="NUM">10</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="controls_whileUntil"></block>' +
    '    <block type="controls_time_loop">' +
    '       <value name="LOOP_SEC">' +
    '         <block type="math_number">' +
    '           <field name="NUM">10</field>' +
    '         </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="controls_for">' +
    '      <value name="FROM">' +
    '        <block type="math_number">' +
    '          <field name="NUM">1</field>' +
    '        </block>' +
    '      </value>' +
    '      <value name="TO">' +
    '        <block type="math_number">' +
    '          <field name="NUM">10</field>' +
    '        </block>' +
    '      </value>' +
    '      <value name="BY">' +
    '        <block type="math_number">' +
    '          <field name="NUM">1</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="controls_flow_statements"></block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catMath" name="Math">' +
    '    <block type="math_number"></block>' +
    '    <block type="math_arithmetic"></block>' +
    '    <block type="math_single"></block>' +
    '    <block type="math_trig"></block>' +
    '    <block type="math_constant"></block>' +
    '    <block type="math_number_property"></block>' +
    '    <block type="math_base_map"></block>' +
    '    <block type="math_any_map"></block>' +
    /*'    <block type="math_change">' +
    '      <value name="DELTA">' +
    '        <block type="math_number">' +
    '          <field name="NUM">1</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' + */
    '    <block type="math_round"></block>' +
    '    <block type="math_modulo"></block>' +
    '    <block type="math_constrain">' +
    '      <value name="LOW">' +
    '        <block type="math_number">' +
    '          <field name="NUM">1</field>' +
    '        </block>' +
    '      </value>' +
    '      <value name="HIGH">' +
    '        <block type="math_number">' +
    '          <field name="NUM">100</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="math_random_int">' +
    '      <value name="FROM">' +
    '        <block type="math_number">' +
    '          <field name="NUM">1</field>' +
    '        </block>' +
    '      </value>' +
    '      <value name="TO">' +
    '        <block type="math_number">' +
    '          <field name="NUM">100</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="math_random_float"></block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catVariables" name="Variables">' +
    '      <block type="variables_get"></block>' +
    '      <block type="variables_set">' +
    '        <value name="VALUE">' +
    '          <block type="math_number"></block>' +
    '        </value>' +
    '      </block>' +
    '      <block type="variables_set">' +
    '        <value name="VALUE">' +
    '          <block type="io_highlow"></block>' +
    '        </value>' +
    '      </block>' +
    '      <block type="variables_set">' +
    '        <value name="VALUE">' +
    '          <block type="io_allpins"></block>' +
    '        </value>' +
    '      </block>' +
    '      <block type="variables_set">' +
    '        <value name="VALUE">' +
    '          <block type="io_pwmpins"></block>' +
    '        </value>' +
    '      </block>' +
    '      <block type="variables_set">' +
    '        <value name="VALUE">' +
    '          <block type="io_analogpins"></block>' +
    '        </value>' +
    '      </block>' +
    '      <block type="variables_set">' +
    '        <value name="VALUE">' +
    '          <block type="variables_set_type"></block>' +
    '        </value>' +
    '      </block>' +
    '      <block type="variables_init">' +
    '        <value name="VALUE">' +
    '          <block type="variables_set_type"></block>' +
    '        </value>' +
    '      </block>' +
    '      <block type="variables_declare"></block>' +
    '      <block type="variables_set_type"></block>' +
    '      <block type="io_highlow"></block>' +
    '      <block type="io_allpins"></block>' +
    '      <block type="io_pwmpins"></block>' +
    '      <block type="io_analogpins"></block>' +
    '      <block type="io_i2cPins"></block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catText" name="Text">' +
    '    <block type="char"></block>' +
    '    <block type="text"></block>' +
    '    <block type="string_hex"></block>' +
    '    <block type="text_join"></block>' +
    '    <block type="text_append"></block>' +
    '    <block type="text_length"></block>' +
    '    <block type="text_isEmpty"></block>' +
    '    <block type="text_indexOf"></block>' +
    '    <block type="text_getSubstring"></block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catTime" name="Time">' +
    '    <block type="time_delay">' +
    '      <value name="DELAY_TIME_MILI">' +
    '        <block type="math_number">' +
    '          <field name="NUM">1000</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="time_delaymicros">' +
    '      <value name="DELAY_TIME_MICRO">' +
    '        <block type="math_number">' +
    '          <field name="NUM">100</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="time_millis"></block>' +
    '    <block type="time_micros"></block>' +
    '    <block type="infinite_loop"></block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catArray" name="Array">' +
    '    <block type="array_declare"></block>' +
    '    <block type="array_modify"></block>' +
    '    <block type="array_create_with"></block>' +
    '    <block type="array_getIndex">' +
    '        <value name="AT">' +
    '            <block type="math_number">' +
    '                <field name="NUM">1</field>' +
    '            </block>' +
    '        </value>' +
    '    </block>' +
    '    <block type="array_map"></block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catInput" name="Input">' +
    '    <block type="io_input"></block>' +
    '    <block type="io_input_var">' +
    '      <value name="PIN">' +
    '        <block type="variables_get"></block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="io_input_pullup"></block>' +
    '    <block type="io_input_pullup_var">' +
    '      <value name="PIN">' +
    '        <block type="variables_get"></block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="io_digitalread"></block>' +
    '    <block type="io_digitalread_var">' +
    '      <value name="PIN">' +
    '        <block type="variables_get"></block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="io_analogread"></block>' +
    '    <block type="io_analogread_var">' +
    '      <value name="PIN">' +
    '        <block type="variables_get"></block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="io_pulsein">' +
    '      <value name="PULSETYPE">' +
    '        <block type="io_highlow"></block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="io_pulsetimeout">' +
    '      <value name="PULSETYPE">' +
    '        <block type="io_highlow"></block>' +
    '      </value>' +
    '      <value name="TIMEOUT">' +
    '        <block type="math_number">' +
    '          <field name="NUM">100</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="io_pulsetimeout_var">' +
    '      <value name="PIN">' +
    '        <block type="variables_get"></block>' +
    '      </value>' +
    '      <value name="PULSETYPE">' +
    '        <block type="io_highlow"></block>' +
    '      </value>' +
    '      <value name="TIMEOUT">' +
    '        <block type="math_number">' +
    '          <field name="NUM">1000</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '  </category>' +
    '  <sep></sep>' +
    '  <category id="catOutput" name="Output">' +
    '    <block type="io_output"></block>' +
    '    <block type="io_output_var">' +
    '      <value name="PIN">' +
    '        <block type="variables_get"></block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="io_digitalwrite">' +
    '      <value name="STATE">' +
    '        <block type="io_highlow"></block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="io_digitalwrite_var">' +
    '      <value name="PIN">' +
    '        <block type="variables_get"></block>' +
    '      </value>' +
    '      <value name="STATE">' +
    '        <block type="io_highlow"></block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="io_analogwrite">' +
    '      <value name="NUM">' +
    '        <block type="math_number">' +
    '          <field name="NUM">100</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="io_analogwrite_var">' +
    '      <value name="PIN">' +
    '        <block type="variables_get"></block>' +
    '      </value>' +
    '      <value name="NUM">' +
    '        <block type="math_number">' +
    '          <field name="NUM">100</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    /*
    '    <block type="io_tone">' +
    '      <field name="TONEPIN">0</field>' +
    '      <value name="FREQUENCY">' +
    '        <block type="math_number">' +
    '          <field name="NUM">220</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '    <block type="io_notone"></block>' +
    */
    '    <block type="io_play_tone"></block>' +
    '    <block type="io_single_tone">' +
    '      <field name="NOTE">C</field>' +
    '      <field name="TONE">1</field>' +
    '      <field name="TEMPO">1</field>' +
    '    </block>' +
    '    <block type="io_multi_tone">' +
    '      <value name="NOTE_TONE">' +
    '        <block type="text">' +
    '           <field name="TEXT">C6,D6,E6,F6,G6,A6,B6</field>' +
    '        </block>' +
    '      </value>' +
    '      <value name="TEMPO">' +
    '        <block type="text">' +
    '           <field name="TEXT">1,1,1,1,1,1,1</field>' +
    '        </block>' +
    '      </value>' +
    '    </block>' +
    '  </category>' +
    '</xml>';
