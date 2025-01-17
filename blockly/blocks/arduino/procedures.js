/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileOverview Block for the Arduino functions.
 *     The Arduino built in functions syntax can be found at:
 *     https://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.require('Blockly.Blocks');

/** Common HSV hue for all blocks in this category. */
//Blockly.Blocks.procedures.HUE = 290;

Blockly.Blocks['arduino_functions'] = {
    /**
     * Block for defining the Arduino setup() and loop() functions.
     * @this Blockly.Block
     */
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARD_FUN_RUN_SETUP);
        this.appendStatementInput('SETUP_FUNC');
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARD_FUN_RUN_LOOP);
        this.appendStatementInput('LOOP_FUNC');
        this.setInputsInline(false);
        this.setColour(290);
        this.setTooltip(Blockly.Msg.ARD_FUN_RUN_TIP);
        this.setHelpUrl('https://arduino.cc/en/Reference/Loop');
        this.contextMenu = false;
        this.setDeletable(false);
    },
    /** @return {!boolean} True if the block instance is in the workspace. */
    getArduinoLoopsInstance: function () {
        return true;
    }
};
