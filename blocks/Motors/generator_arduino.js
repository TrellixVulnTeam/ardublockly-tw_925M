/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          https://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileOverview Arduino code generator for the Servo library blocks.
 *     The Arduino Servo library docs: https://arduino.cc/en/reference/servo
 *
 * TODO: If angle selector added to blocks edit code here.
 */
'use strict';

goog.provide('Blockly.Arduino.Motos');

goog.require('Blockly.Arduino');

/**
 * Code generator to attach servo to a arduino Pin (X).
 * Arduino code: #include <Servo.h>
 *               Servo ServoX;
 *               setup { ServoX.attach(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['servo_attach'] = function (block) {
    var pinKey = block.getFieldValue('SERVO_PIN');
    var servoName = block.getFieldValue('SERVO_NAME');
    var servoId = Blockly.Arduino.variableDB_.getName(
        servoName,
        Blockly.Variables.NAME_TYPE/*blocklyArray_NAME_TYPE*/);

    Blockly.Arduino.reservePin(block, pinKey, Blockly.Arduino.pinTypes.SERVO, 'Servo Write');
    Blockly.Arduino.addInclude('Servo_inc', '#include <Servo.h>');
    Blockly.Arduino.addVariable(servoName, 'Servo ' + servoId + ';', true);


    var code = servoId + '.attach(' + pinKey + ');\n';

    return code;
};


/**
 * Code generator to read an angle value from a servo Pin (X).
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {(string|number)[]} Completed code with order of operation.
 */
Blockly.Arduino['servo_read'] = function (block) {
    var servoName = block.getFieldValue('SERVO_NAME');
    var servoId = Blockly.Arduino.variableDB_.getName(
        servoName,
        Blockly.Variables.NAME_TYPE/*blocklyArray_NAME_TYPE*/);

    Blockly.Arduino.addInclude('Servo_inc', '#include <Servo.h>');
    Blockly.Arduino.addVariable(servoName, 'Servo ' + servoId + ';', true);

    var code = servoId + '.read()';
    return [code, Blockly.Arduino.ORDER_NONE];
};

/**
 * Code generator to set an angle (Y) value to a servo Pin (X).
 * Arduino code: #include <Servo.h>
 *               Servo servo_X;
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */

Blockly.Arduino['servo_write'] = function (block) {
    var servoName = block.getFieldValue('SERVO_NAME');
    var servoAngle = Blockly.Arduino.valueToCode(
        block, 'SERVO_ANGLE', Blockly.Arduino.ORDER_ATOMIC);
    var servoId = Blockly.Arduino.variableDB_.getName(
        servoName,
        Blockly.Variables.NAME_TYPE/*blocklyArray_NAME_TYPE*/);

    Blockly.Arduino.addInclude('Servo_inc', '#include <Servo.h>');
    Blockly.Arduino.addVariable(servoName, 'Servo ' + servoId + ';', true);

    var code = servoId + '.write(' + servoAngle + ');\n';
    return code;
};

/**
 * Code generator to set an writeMicroseconds (Y) value to a servo Pin (X).
 * Arduino code: #include <Servo.h>
 *               Servo servo_X;
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['servo_pwm'] = function (block) {
    var servoName = block.getFieldValue('SERVO_NAME');
    var servoPWM = Blockly.Arduino.valueToCode(
        block, 'SERVO_PWM', Blockly.Arduino.ORDER_ATOMIC);
    var servoId = Blockly.Arduino.variableDB_.getName(
        servoName,
        Blockly.Variables.NAME_TYPE/*blocklyArray_NAME_TYPE*/);

    Blockly.Arduino.addInclude('Servo_inc', '#include <Servo.h>');
    Blockly.Arduino.addVariable(servoName, 'Servo ' + servoId + ';', true);

    var code = servoId + '.writeMicroseconds(' + servoPWM + ');\n';
    return code;
};

/**
 * Code generator to set an angle (Y) value to a servo Pin (X).
 * Arduino code: #include <Servo.h>
 *               Servo servo_X;
 *               setup { myServoX.attach(X); }
 *               loop  { myServoX.write(Y);  }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['servo_write_angle'] = function (block) {
    var pinKey = block.getFieldValue('SERVO_PIN');
    var servoAngle = block.getFieldValue('SERVO_ANGLE');
    var servoName = 'myServo' + pinKey;
    var servoDelay = block.getFieldValue('SERVO_DELAY');
    var servoDelayVar = 'servo' + pinKey + 'delaytime';

    Blockly.Arduino.reservePin(
        block, pinKey, Blockly.Arduino.pinTypes.SERVO, 'Servo Write');

    Blockly.Arduino.addInclude('Servo_inc', '#include <Servo.h>');
    Blockly.Arduino.addDeclaration('servo_' + pinKey, 'Servo ' + servoName + ';');

    var code = servoName + '.attach(' + pinKey + ');\n' +
        servoName + '.write(' + servoName + '.read());\n' +
        servoDelayVar + ' = abs(' + servoName + '.read()-' + servoAngle + ')*' + servoDelay + ';\n' +
        servoName + '.write(' + servoAngle + ');\n';
    return code;
};

/**
 * Code generator to detach to a servo Pin (X).
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['servo_detach'] = function (block) {
    var servoName = block.getFieldValue('SERVO_NAME');
    var servoId = Blockly.Arduino.variableDB_.getName(
        servoName,
        Blockly.Variables.NAME_TYPE/*blocklyArray_NAME_TYPE*/);

    Blockly.Arduino.addInclude('Servo_inc', '#include <Servo.h>');
    Blockly.Arduino.addVariable(servoName, 'Servo ' + servoId + ';', true);

    var code = servoId + '.detach();\n';
    return code;
};

/** afmotor*/
Blockly.Arduino['afmotor'] = function (block) {
    var afmotor_control = block.getFieldValue('afmotor_control');
    var afmotor_channel = block.getFieldValue('afmotor_channel');
    var motorName = 'motor_dc_' + afmotor_channel;
    var feqName;
    switch (parseInt(afmotor_channel)) {
        case 1:
        case 2:
            feqName = 'MOTOR12_64KHZ';
            break;
        case 3:
        case 4:
            feqName = 'MOTOR34_64KHZ';
            break;
        default:
            feqName = '';
    }
    var afmotor_speed = block.getFieldValue('afmotor_speed');

    Blockly.Arduino.addInclude('AFMotor_inc', '#include <AFMotor.h>');
    Blockly.Arduino.addDeclaration('AF_DCMotor_' + afmotor_channel, 'AF_DCMotor ' + motorName + '(' + afmotor_channel + ', ' + feqName + ');');

    var code = motorName + '.setSpeed(' + afmotor_speed + ');\n' +
        motorName + '.run(' + afmotor_control + ');\n';
    return code;
};

/** afmotor*/
Blockly.Arduino['afmotor_var'] = function (block) {
    var afmotor_control = block.getFieldValue('afmotor_control');
    var afmotor_channel = block.getFieldValue('afmotor_channel');
    var motorName = 'motor_dc_' + afmotor_channel;
    var feqName;
    switch (parseInt(afmotor_channel)) {
        case 1:
        case 2:
            feqName = 'MOTOR12_64KHZ';
            break;
        case 3:
        case 4:
            feqName = 'MOTOR34_64KHZ';
            break;
        default:
            feqName = '';
    }
    var afmotor_speed = Blockly.Arduino.valueToCode(
        block, 'afmotor_speed', Blockly.Arduino.ORDER_ATOMIC) || 255;

    Blockly.Arduino.addInclude('AFMotor_inc', '#include <AFMotor.h>');
    Blockly.Arduino.addDeclaration('AFMotor_declar_' + afmotor_channel, 'AF_DCMotor ' + motorName + '(' + afmotor_channel + ', ' + feqName + ');');

    var code = motorName + '.setSpeed(' + afmotor_speed + ');\n' +
        motorName + '.run(' + afmotor_control + ');\n';
    return code;
};

/** stepper */
Blockly.Arduino["stepper_setup_2pin"] = function (block) {
    var stepperName = block.getFieldValue('STEPPER_NAME');
    var stepperId = Blockly.Arduino.variableDB_.getName(
        stepperName,
        Blockly.Variables.NAME_TYPE/*blocklyArray_NAME_TYPE*/);
    var pin1 = Blockly.Arduino.valueToCode(block, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
    var pin2 = Blockly.Arduino.valueToCode(block, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
    var steps = Blockly.Arduino.valueToCode(block, 'STEPS', Blockly.Arduino.ORDER_ATOMIC);
    var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.addInclude('Stepper_inc', '#include <Stepper.h>');
    Blockly.Arduino.addVariable(stepperName, 'Stepper ' + stepperId + '(' + steps + ',' + pin1 + ',' + pin2 + ');', true);
    Blockly.Arduino.addSetup('setup_stepper_' + stepperId, stepperId + '.setSpeed(' + speed + ');');
    return '';
};

Blockly.Arduino["stepper_setup_4pin"] = function (block) {
    var stepperName = block.getFieldValue('STEPPER_NAME');
    var stepperId = Blockly.Arduino.variableDB_.getName(
        stepperName,
        Blockly.Variables.NAME_TYPE/*blocklyArray_NAME_TYPE*/);
    var pin1 = Blockly.Arduino.valueToCode(block, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
    var pin2 = Blockly.Arduino.valueToCode(block, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
    var pin3 = Blockly.Arduino.valueToCode(block, 'PIN3', Blockly.Arduino.ORDER_ATOMIC);
    var pin4 = Blockly.Arduino.valueToCode(block, 'PIN4', Blockly.Arduino.ORDER_ATOMIC);
    var steps = Blockly.Arduino.valueToCode(block, 'STEPS', Blockly.Arduino.ORDER_ATOMIC);
    var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.addInclude('Stepper_inc', '#include <Stepper.h>');
    Blockly.Arduino.addVariable(stepperName, 'Stepper ' + stepperId + '(' + steps + ',' + pin1 + ',' + pin3 + ',' + pin2 + ',' + pin4 + ');', true);
    Blockly.Arduino.addSetup('setup_stepper_' + stepperId, stepperId + '.setSpeed(' + speed + ');');
    return '';
};

Blockly.Arduino["stepper_speed"] = function (block) {
    var stepperName = block.getFieldValue('STEPPER_NAME');
    var stepperId = Blockly.Arduino.variableDB_.getName(
        stepperName,
        Blockly.Variables.NAME_TYPE/*blocklyArray_NAME_TYPE*/);
    var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);
    var code = stepperId + '.setSpeed(' + speed + ');\n';
    return code;
};

Blockly.Arduino["stepper_move"] = function (block) {
    var stepperName = block.getFieldValue('STEPPER_NAME');
    var stepperId = Blockly.Arduino.variableDB_.getName(
        stepperName,
        Blockly.Variables.NAME_TYPE/*blocklyArray_NAME_TYPE*/);
    var step = Blockly.Arduino.valueToCode(this, 'STEP', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.addInclude('Stepper_inc', '#include <Stepper.h>');
    return stepperId + '.step(' + step + ');\n';
};
