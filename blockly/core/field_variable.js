/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileOverview Variable input field.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldVariable');

goog.require('Blockly.FieldDropdown');
goog.require('Blockly.Msg');
goog.require('Blockly.Variables');
goog.require('Blockly.utils');
goog.require('goog.string');


/**
 * Class for a variable's dropdown field.
 * @param {?string} varname The default name for the variable.  If null,
 *     a unique variable name will be generated.
 * @param {Function=} opt_validator A function that is executed when a new
 *     option is selected.  Its sole argument is the new option value.
 * @extends {Blockly.FieldDropdown}
 * @constructor
 */
Blockly.FieldVariable = function (varname, opt_validator) {
    Blockly.FieldVariable.superClass_.constructor.call(this,
        this.dropdownCreate, opt_validator);
    this.setValue(varname || '');
};
goog.inherits(Blockly.FieldVariable, Blockly.FieldDropdown);

/**
 * Sets a new change handler for angle field.
 * @param {Function} handler New change handler, or null.
 */
Blockly.FieldVariable.prototype.setValidator = function (handler) {
    var wrappedHandler;
    if (handler) {
        // Wrap the user's change handler together with the variable rename handler.
        wrappedHandler = function (value) {
            var v1 = handler.call(this, value);
            if (v1 === null) {
                var v2 = v1;
            } else {
                if (v1 === undefined) {
                    v1 = value;
                }
                var v2 = Blockly.FieldVariable.dropdownChange.call(this, v1);
                if (v2 === undefined) {
                    v2 = v1;
                }
            }
            return v2 === value ? undefined : v2;
        };
    } else {
        wrappedHandler = Blockly.FieldVariable.dropdownChange;
    }
    Blockly.FieldVariable.superClass_.setValidator.call(this, wrappedHandler);
};

/**
 * Install this dropdown on a block.
 */
Blockly.FieldVariable.prototype.init = function () {
    if (this.fieldGroup_) {
        // Dropdown has already been initialized once.
        return;
    }
    Blockly.FieldVariable.superClass_.init.call(this);
    if (!this.getValue()) {
        // Variables without names get uniquely named for this workspace.
        var workspace =
            this.sourceBlock_.isInFlyout ?
                this.sourceBlock_.workspace.targetWorkspace :
                this.sourceBlock_.workspace;
        this.setValue(Blockly.Variables.generateUniqueName(workspace));
    }
};

/**
 * Get the variable's name (use a variableDB to convert into a real name).
 * Unline a regular dropdown, variables are literal and have no neutral value.
 * @return {string} Current text.
 */
Blockly.FieldVariable.prototype.getValue = function () {
    return this.getText();
};

/**
 * Set the variable name.
 * @param {string} newValue New text.
 */
Blockly.FieldVariable.prototype.setValue = function (newValue) {
    if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
        Blockly.Events.fire(new Blockly.Events.Change(
            this.sourceBlock_, 'field', this.name, this.value_, newValue));
    }
    this.value_ = newValue;
    this.setText(newValue);
};

/**
 * Return a sorted list of variable names for variable dropdown menus.
 * Include a special option at the end for creating a new variable name.
 * @return {!Array.<string>} Array of variable names.
 * @this {!Blockly.FieldVariable}
 */
Blockly.FieldVariable.prototype.dropdownCreate = function () {
    if (this.sourceBlock_ && this.sourceBlock_.workspace) {
        var variableList =
            Blockly.Variables.allVariables(this.sourceBlock_.workspace);
    } else {
        var variableList = [];
    }
    // Ensure that the currently selected variable is an option.
    var name = this.getText();
    if (name && variableList.indexOf(name) == -1) {
        variableList.push(name);
    }
    variableList.sort(goog.string.caseInsensitiveCompare);
    variableList.push(Blockly.Msg.RENAME_VARIABLE);
    variableList.push(Blockly.Msg.NEW_VARIABLE);
    // Variables are not language-specific, use the name as both the user-facing
    // text and the internal representation.
    var options = [];
    for (var x = 0; x < variableList.length; x++) {
        options[x] = [variableList[x], variableList[x]];
    }
    return options;
};

/**
 * Event handler for a change in variable name.
 * Special case the 'New variable...' and 'Rename variable...' options.
 * In both of these special cases, prompt the user for a new name.
 * @param {string} text The selected dropdown menu option.
 * @return {null|undefined|string} An acceptable new variable name, or null if
 *     change is to be either aborted (cancel button) or has been already
 *     handled (rename), or undefined if an existing variable was chosen.
 * @this {!Blockly.FieldVariable}
 */
Blockly.FieldVariable.dropdownChange = function (text) {
    function promptName(promptText, defaultText, callback) {
        Blockly.hideChaff();
        var newVar = Blockly.prompt(promptText, defaultText, function (newVar) {
            // Merge runs of whitespace.  Strip leading and trailing whitespace.
            // Beyond this, all names are legal.
            if (newVar) {
                newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
                if (newVar == Blockly.Msg.RENAME_VARIABLE ||
                    newVar == Blockly.Msg.NEW_VARIABLE) {
                    // Ok, not ALL names are legal...
                    newVar = null;
                }
            }
            callback(newVar);
        });
    }

    var workspace = this.sourceBlock_.workspace;
    if (text == Blockly.Msg.RENAME_VARIABLE) {
        var oldVar = this.getText();
        promptName(Blockly.Msg.RENAME_VARIABLE_TITLE.replace('%1', oldVar),
            oldVar, function (text) {
                if (text) {
                    Blockly.Variables.renameVariable(oldVar, text, workspace);
                }
            });
        return null;
    } else if (text == Blockly.Msg.NEW_VARIABLE) {
        /*promptName(Blockly.Msg.NEW_VARIABLE_TITLE, '', function(text) {
          // Since variables are case-insensitive, ensure that if the new variable
          // matches with an existing variable, the new case prevails throughout.
          if (text) {
            Blockly.Variables.renameVariable(text, text, workspace);
            //TODO: need to add here what too do with the newly created variable
          }
        });*/
        //TODO: this return variable needs to be made redundant
        return Blockly.Variables.generateUniqueName(workspace);
    }
    return undefined;
};
