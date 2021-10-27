/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          https://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileOverview English strings for test blocks. All names have the postfix
 *     BLOCKS_{category} from the blocks_config.json data.
 */
'use strict';

goog.require('Blockly.Msg.en');

/**
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to message files.
 */

/// Toolbox category name
Blockly.Msg.BLOCKS_SERVO_CATEGORY = 'Servo';

/// Servo
Blockly.Msg.ARD_SERVO_WRITE = "control SERVO %1";
Blockly.Msg.ARD_SERVO_WRITE_TO = "to";
Blockly.Msg.ARD_SERVO_WRITE_DEG = "degree";
Blockly.Msg.ARD_SERVO_WRITE_DEG_180 = "Degrees (0~180)";
Blockly.Msg.ARD_SERVO_DELAY = "delay";
Blockly.Msg.ARD_SERVO_SECOND = "second";
Blockly.Msg.ARD_SERVO_WRITE_TIP = "Set a Servo to an specified angle";
Blockly.Msg.ARD_SERVO_PWM = "Servo PWM ";
Blockly.Msg.ARD_SERVO_PWM_TO = " microseconds";
Blockly.Msg.ARD_SERVO_PWM_TIP = "Set Servo PWM microseconds";
Blockly.Msg.ARD_SERVO_READ = "read SERVO from PIN#";
Blockly.Msg.ARD_SERVO_READ_TIP = "Read a Servo angle";
Blockly.Msg.ARD_SERVO_ATTACH = "attach SERVO from Pin";
Blockly.Msg.ARD_SERVO_PIN = "";
Blockly.Msg.ARD_SERVO_ATTACH_TIP = "";
Blockly.Msg.ARD_SERVO_DETACH = "detach SERVO from Pin";
Blockly.Msg.ARD_SERVO_DETACH_TIP = "";

/// AFMorot
Blockly.Msg.ARD_AFMOROT = 'L293D小車';
Blockly.Msg.ARD_AFMOROT_CONTROL = 'Command';
Blockly.Msg.ARD_AFMOROT_FORWARD = 'Forward';
Blockly.Msg.ARD_AFMOROT_BACKWARD = 'Backward';
Blockly.Msg.ARD_AFMOROT_RELEASE = 'Stop';
Blockly.Msg.ARD_AFMOROT_CHANNEL = 'AFMotor channel';
Blockly.Msg.ARD_AFMOTOR_SPEED = 'AFMotor speed';
Blockly.Msg.ARD_AFMOTOR_TIP = "";

/// Stepper
Blockly.Msg.ARD_STEPPER = 'Stepper';
Blockly.Msg.ARD_STEPPER_SETUP_4PIN = "Stepper 4pin";
Blockly.Msg.ARD_STEPPER_PIN1 = "PIN1#";
Blockly.Msg.ARD_STEPPER_PIN2 = "PIN2#";
Blockly.Msg.ARD_STEPPER_PIN3 = "PIN3#";
Blockly.Msg.ARD_STEPPER_PIN4 = "PIN4#";
Blockly.Msg.ARD_STEPPPE_RREVOLUTION = 'steps per revolution';
Blockly.Msg.ARD_STEPPER_SET_SPEED = 'setSpeed';
Blockly.Msg.ARD_STEPPER_STEP = 'step';
Blockly.Msg.ARD_TOOLTIP_STEPPER_2PIN= 'Initialize two-pin stepper motor';
Blockly.Msg.ARD_TOOLTIP_STEPPER_4PIN= 'Initialize four-pin stepper motor';
Blockly.Msg.ARD_TOOLTIP_STEPPER_MOVE = 'Set the number of movement steps of the stepper motor';