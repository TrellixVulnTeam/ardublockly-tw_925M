/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          https://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileOverview Code generator for the test 2 blocks.
 */
'use strict';

goog.provide('Blockly.Arduino.WS2812Leds');

goog.require('Blockly.Arduino');

Blockly.Arduino["pixel_init_var"] = function (block) {
    var pixelName = block.getFieldValue('PIXEL_VAR');
    var pixelId = Blockly.Arduino.variableDB_.getName(
        pixelName,
        Blockly.Variables.NAME_TYPE/*blocklyArray_NAME_TYPE*/);
    /*
    var pixel_var = Blockly.Arduino.valueToCode(
        block, 'PIXEL_VAR', Blockly.Arduino.ORDER_ATOMIC) || '0';*/
    var pixel_pin = Blockly.Arduino.valueToCode(
        block, 'PIXEL_PIN', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var pixel_number = Blockly.Arduino.valueToCode(
        block, 'PIXEL_NUM', Blockly.Arduino.ORDER_ATOMIC) || '0';

    Blockly.Arduino.addInclude('Adafruit_NeoPixel_inc', '#include <Adafruit_NeoPixel.h>');
    var dec = 'Adafruit_NeoPixel ' + pixelId +
        ' = Adafruit_NeoPixel(' + pixel_number + ', ' + pixel_pin + ', NEO_GRB + NEO_KHZ800);'
    //Blockly.Arduino.addDeclaration(pixel_var + '_tag', dec);
    Blockly.Arduino.addVariable(pixelId, dec, true);
    var code = pixelId + '.begin();\n' +
        pixelId + '.clear();\n' +
        pixelId + '.show();\n';

    return code;
};

Blockly.Arduino["pixel_single_color"] = function (block) {
    var pixelName = block.getFieldValue('PIXEL_VAR');
    var pixelId = Blockly.Arduino.variableDB_.getName(
        pixelName,
        Blockly.Variables.NAME_TYPE/*blocklyArray_NAME_TYPE*/);
    var pixel_numth = Blockly.Arduino.valueToCode(
        block, 'PIXEL_NUMTH', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var pixel_red = Blockly.Arduino.valueToCode(
        block, 'PIXEL_RED', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var pixel_green = Blockly.Arduino.valueToCode(
        block, 'PIXEL_GREEN', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var pixel_blue = Blockly.Arduino.valueToCode(
        block, 'PIXEL_BLUE', Blockly.Arduino.ORDER_ATOMIC) || '0';

    var code = pixelId + '.setPixelColor(' +
        pixel_numth + ', ' + pixelId + '.Color(' +
        pixel_red + ', ' + pixel_green + ', ' + pixel_blue + '));\n' +
        pixelId + '.show();\n';

    return code;
};

Blockly.Arduino["pixel_single_off"] = function (block) {
    var pixelName = block.getFieldValue('PIXEL_VAR');
    var pixelId = Blockly.Arduino.variableDB_.getName(
        pixelName,
        Blockly.Variables.NAME_TYPE/*blocklyArray_NAME_TYPE*/);
    var pixel_numth = Blockly.Arduino.valueToCode(
        block, 'PIXEL_NUMTH', Blockly.Arduino.ORDER_ATOMIC) || '0';

    var code = pixelId + '.setPixelColor(' +
        pixel_numth + ', ' + pixelId + '.Color(0, 0, 0));\n' +
        pixelId + '.show();\n';

    return code;
};

Blockly.Arduino["pixel_all_off"] = function (block) {
    var pixelName = block.getFieldValue('PIXEL_VAR');
    var pixelId = Blockly.Arduino.variableDB_.getName(
        pixelName,
        Blockly.Variables.NAME_TYPE/*blocklyArray_NAME_TYPE*/);

    var code = pixelId + '.clear();\n' +
        pixelId + '.show();\n';

    return code;
};
