/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileOverview Ajax calls to the Ardublockly Server python program.
 */
'use strict';

/** Create a name space for the application. */
var ArdublocklyServer = {};

/**
 * Reads JSON data from the server and forwards formatted JavaScript object.
 * @param {!string} url Location for the JSON data.
 * @param {!function} jsonDataCb Callback with JSON object or null for error.
 */
ArdublocklyServer.getJson = function (url, callback) {
    ArdublocklyServer.sendRequest(url, 'GET', 'application/json;', null, callback, true);
};

/**
 * Sends JSON data to the ArduBlocklyServer.
 * @param {!string} url Request URL.
 * @param {{new_value: !string}} json JSON string.
 * @param {!function} callback Request callback function.
 */
ArdublocklyServer.putJson = function (url, json, callback) {
    ArdublocklyServer.sendRequest(url, 'PUT', 'application/json', json, callback, true);
};


/**
 * Sends a request to the Ardublockly Server that returns a JSON response.
 * @param {!string} url Request URL.
 * @param {!string} method HTTP method.
 * @param {!string} contentType HTTP content type.
 * @param {string} jsonObjSend JavaScript object to be parsed into JSON to send.
 * @param {!function} cb Request callback function, takes a single input for a
 *     parsed JSON object.
 * @param {!string} async async or not.
 */
ArdublocklyServer.sendRequest = function (url, method, contentType, jsonObjSend, cb, async) {
    var request = ArdublocklyServer.createRequest();

    // The data received is JSON, so it needs to be converted into the right
    // format to be displayed in the page.
    var onReady = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                if (contentType.indexOf('application/json') > -1) {
                    var jsonObjReceived = null;
                    try {
                        jsonObjReceived = JSON.parse(request.responseText);
                    } catch (e) {
                        console.error('Incorrectly formatted JSON data from ' + url);
                        throw e;
                    }
                    cb(jsonObjReceived);
                } else if (contentType.indexOf('application/text') > -1) {
                    var textReceived = null;
                    try {
                        textReceived = request.responseText;
                    } catch (e) {
                        console.error('Incorrectly text from ' + url);
                        throw e;
                    }
                    cb(textReceived);
                } else {
                    console.log(contentType);
                    console.error('Incorrectly data type from ' + url);
                }
            } else {
                // return a null element which will be dealt with in the front end
                cb(null);
            }
        }
    };

    try {

        request.open(method, url, async);
        request.setRequestHeader('Content-type', contentType);
        request.onreadystatechange = onReady;
        request.send(JSON.stringify(jsonObjSend));
    } catch (e) {
        // Nullify callback to indicate error
        cb(null);
        console.error('Nullify callback to indicate error ' + e);
        throw e;
    }
};

/** @return {XMLHttpRequest} An XML HTTP Request multi-browser compatible. */
ArdublocklyServer.createRequest = function () {
    var request = null;
    try {
        // Firefox, Chrome, IE7+, Opera, Safari
        request = new XMLHttpRequest();
    } catch (e) {
        // IE6 and earlier
        try {
            request = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e) {
            try {
                request = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) {
                request = null;
                throw 'Your browser does not support AJAX. You will not be able to' +
                'use all of Ardublockly features.';
            }
        }
    }
    return request;
};

/**
 * Creates an HTML element based on the JSON data received from the server.
 * @param {!string} json_data A string containing the JSON data to be parsed.
 * @return {HTMLDivElement} An HTML element, which type depends on the JSON 'element'
 *                    key (currently only text input or drop down).
 */
ArdublocklyServer.jsonToIdeModal = function (jsonObj) {
    if (!jsonObj) return null;
    var elTitle = document.createElement('h4');
    elTitle.className = (jsonObj && jsonObj.success) ? 'arduino_dialog_success' :
        'arduino_dialog_failure';
    var elStdOp = document.createElement('span');
    elStdOp.className = 'arduino_dialog_out';
    var elErrOp = document.createElement('span');
    elErrOp.className = 'arduino_dialog_out_error';

    // Add the Standard and Error outputs
    var ideData = jsonObj.ide_data;
    if (ideData && (ideData.std_output !== undefined && ideData.std_output !== null) &&
        (ideData.err_output !== undefined && ideData.err_output !== null)) {
        elStdOp.innerHTML = ideData.std_output.split('\n').join('<br />');
        elErrOp.innerHTML = ideData.err_output.split('\n').join('<br />');
    } else {
        console.error(jsonObj);
        console.error('The IDE out JSON response does not have valid "ide_data".');
    }

    if (jsonObj.errors) {
        // Prepare error message
        elTitle.innerHTML = Ardublockly.getLocalStr('arduinoOpErrorTitle');
        var errStr = [];
        for (var i = 0; i < jsonObj.errors.length; i++) {
            var errorContext = 'Unrecognised error.';
            try {
                errorContext = Ardublockly.getLocalStr(
                    'arduinoOpErrorIdContext_' + jsonObj.errors[i].id);
            } catch (e) {
                // Swallow the exception, could be expanded to try to figure out issue
            }
            errStr.push('\nError id ' + jsonObj.errors[i].id + ': ' + errorContext);
        }
        elErrOp.innerHTML += '<br />' + errStr.join('<br />');
    } else if (jsonObj.success && jsonObj.ide_mode) {
        // Format a successful response
        if (jsonObj.ide_mode === 'upload') {
            elTitle.innerHTML = Ardublockly.getLocalStr('arduinoOpUploadedTitle');
        } else if (jsonObj.ide_mode === 'USB') {
            elTitle.innerHTML = Ardublockly.getLocalStr('arduinoOpUSBTitle');
        } else if (jsonObj.ide_mode === 'verify') {
            elTitle.innerHTML = Ardublockly.getLocalStr('arduinoOpVerifiedTitle');
        } else if (jsonObj.ide_mode === 'open') {
            elTitle.innerHTML = Ardublockly.getLocalStr('arduinoOpOpenedTitle');
            // This is a corner case where we also add to the stand out
            elStdOp.innerHTML += Ardublockly.getLocalStr('arduinoOpOpenedBody');
        } else if (jsonObj.ide_mode === 'putty') {
            elTitle.innerHTML = Ardublockly.getLocalStr('arduinoPuttyOpenedTitle');
            elStdOp.innerHTML += Ardublockly.getLocalStr('arduinoPuttyOpenedBody');
        } else {
            elTitle.innerHTML = Ardublockly.getLocalStr('arduinoOpErrorTitle');
        }
    } else {
        console.error(jsonObj);
        console.error('Unexpected response format, printed above.');
    }

    var element = document.createElement('div');
    element.appendChild(elErrOp);
    element.appendChild(elStdOp);
    element.appendChild(elTitle);
    return element;
};

ArdublocklyServer.jsonToHtmlTextInput = function (jsonObj) {
    var element = null;
    if (jsonObj) {
        // Simple text input
        element = document.createElement('input');
        element.setAttribute('type', 'text');
        element.style.cssText = '';
        if (jsonObj.errors) {
            element.setAttribute('value', '');
            element.style.cssText = 'border-bottom: 1px solid #f75c51;' +
                'box-shadow: 0 1px 0 0 #d73c30;';
        } else {
            element.setAttribute('value', jsonObj.selected || '');
        }
    }
    return element;
};

ArdublocklyServer.jsonToHtmlDropdown = function (jsonObj) {
    var element = null;
    if (!jsonObj) {
        console.error('Invalid JSON received from server.');
    } else if (jsonObj.errors) {
        console.error('There are errors in the JSON response from server.');
        console.error(jsonObj);
    } else {
        // Drop down list of unknown length with a selected item
        element = document.createElement('select');
        element.name = jsonObj.settings_type;
        for (var i = 0; i < jsonObj.options.length; i++) {
            if (jsonObj.options[i].value && jsonObj.options[i].display_text) {
                var option = document.createElement('option');
                option.value = jsonObj.options[i].value;
                if (option.value === 'open') {
                    option.text = Ardublockly.getLocalStr('verifySketch');
                } else if (option.value === 'verify') {
                    option.text = Ardublockly.getLocalStr('openSketch');
                } else if (option.value === 'upload') {
                    option.text = Ardublockly.getLocalStr('uploadSketch')
                } else {
                    option.text = jsonObj.options[i].display_text;
                }
                // Check selected option and mark it
                if (jsonObj.selected) {
                    option.selected = jsonObj.options[i].value === jsonObj.selected;
                }
                element.appendChild(option);
            } else {
                console.error('Missing required JSON keys for Drop Down conversion.');
            }
        }
    }
    return element;
};

/**
 * Gets the current Compiler location from the ArdublocklyServer settings.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.requestCompilerLocation = function (callback) {
    ArdublocklyServer.getJson('/settings/compiler', callback);
};

/**
 * Sends a string to the Ardublockly Server for a the Arduino IDE executable
 * path.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.setCompilerLocation = function (new_path, callback) {
    ArdublocklyServer.putJson(
        '/settings/compiler', {"new_value": new_path}, callback);
};

/**
 * Gets the current Sketch location from the Ardublockly Server settings.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.requestSketchLocation = function (callback) {
    ArdublocklyServer.getJson('/settings/sketch', callback);
};

/**
 * Sends a string to the Ardublockly Server for a the Arduino sketch folder.
 * @param {!string} new_path New Sketch location path..
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.setSketchLocation = function (new_path, callback) {
    ArdublocklyServer.putJson(
        '/settings/sketch', {"new_value": new_path}, callback);
};

/**
 * Gets the current Examples location from the Ardublockly Server settings.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.requestExamplesLocation = function (callback) {
    ArdublocklyServer.getJson('/settings/examples', callback);
};

/**
 * Sends a string to the Ardublockly Server for a the Examples folder.
 * @param {!string} new_path New Sketch location path..
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.setExamplesLocation = function (new_path, callback) {
    ArdublocklyServer.putJson(
        '/settings/examples', {"new_value": new_path}, callback);
};


/**
 * Request to the Ardublockly Server to return JSON data containing all
 * available target Arduino Boards, and the selected one in the settings.
 * The data is then processed into an HTML element and sent to the callback
 * function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.requestArduinoBoard = function (callback) {
    ArdublocklyServer.getJson('/settings/board', callback);
};

/**
 * Sends the inputted Arduino Board type to the Ardublockly Server Settings.
 * The new settings menu for the Board type is then processed into an HTML
 * element and sent to the callback function as an argument.
 * @param {!string} new_board Indicates which board has been selected.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.setArduinoBoard = function (new_board, callback) {
    ArdublocklyServer.putJson(
        '/settings/board', {"new_value": new_board}, callback);
};

/**
 * Request to the Ardublockly Server to return JSON data containing all
 * available target Arduino Boards, and the selected one in the settings.
 * The data is then processed into an HTML element and sent to the callback
 * function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.requestArduinoBoardFlag = function (callback) {
    ArdublocklyServer.getJson('/settings/boardflag', callback);
};

/**
 * Sends the inputted Arduino Board type to the Ardublockly Server Settings.
 * The new settings menu for the Board type is then processed into an HTML
 * element and sent to the callback function as an argument.
 * @param {!string} new_flag Indicates which board has been selected.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.setArduinoBoardFlag = function (new_flag, callback) {
    ArdublocklyServer.putJson(
        '/settings/boardflag', {"new_value": new_flag}, callback);
};

/**
 * Request to the Ardublockly Server to return JSON data containing all
 * available serial ports in the computer, and the selected one in the
 * settings. The data is then processed into an HTML element and sent to the
 * callback function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.requestSerialPorts = function (callback) {
    ArdublocklyServer.getJson('/settings/serial', callback);
};

/**
 * Sends the inputted Serial Port to the Ardublockly Server Settings. The new
 * settings menu for the Serial Port is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!string} new_port Indicates which port has been selected.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.setSerialPort = function (new_port, callback) {
    ArdublocklyServer.putJson(
        '/settings/serial', {"new_value": new_port}, callback);
};

/**
 * Gets the current IDE setting from the Ardublockly Server settings. The new
 * settings menu for the IDE options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.requestIdeOptions = function (callback) {
    ArdublocklyServer.getJson('/settings/ide', callback);
};

/**
 * Sends the inputted IDE option to the Ardublockly Server Settings. The new
 * settings menu for the IDE options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!string} ide_option Indicates which option has been selected.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.setIdeOptions = function (ide_option, callback) {
    ArdublocklyServer.putJson(
        '/settings/ide', {"new_value": ide_option}, callback);
};

/**
 * Gets the current Baud Rate setting from the Ardublockly Server settings. The new
 * settings menu for the Baud Rate options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.requestBaudRateOptions = function (callback) {
    ArdublocklyServer.getJson('/settings/baudrate', callback);
};

/**
 * Sends the inputted Baud Rate option to the Ardublockly Server Settings. The new
 * settings menu for the Baud Rate options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param baud_rate_option
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.setBaudRateOptions = function (baud_rate_option, callback) {
    ArdublocklyServer.putJson(
        '/settings/baudrate', {"new_value": baud_rate_option}, callback);
};


/**
 * Gets the current Load Delay setting from the Ardublockly Server settings. The new
 * settings menu for the Load Delay options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.requestLoadDelayOptions = function (callback) {
    ArdublocklyServer.getJson('/settings/loaddelay', callback);
};

/**
 * Sends the inputted Load Delay option to the Ardublockly Server Settings. The new
 * settings menu for the End Of Line options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param load_delay_option
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.setLoadDelayOptions = function (load_delay_option, callback) {
    ArdublocklyServer.putJson(
        '/settings/loaddelay', {"new_value": load_delay_option}, callback);
};

/**
 * Gets the current End Of Line setting from the Ardublockly Server settings. The new
 * settings menu for the End Of Line options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.requestEndOfLineOptions = function (callback) {
    ArdublocklyServer.getJson('/settings/endofline', callback);
};

/**
 * Sends the inputted End Of Line option to the Ardublockly Server Settings. The new
 * settings menu for the End Of Line options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param end_of_line_option
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.setEndOfLineOptions = function (end_of_line_option, callback) {
    ArdublocklyServer.putJson(
        '/settings/endofline', {"new_value": end_of_line_option}, callback);
};

/**
 * Gets the current time stamp setting from the Ardublockly Server settings. The new
 * settings menu for the End Of Line options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.requestSerialTimeStamp = function (callback) {
    ArdublocklyServer.getJson('/settings/serialtimestamp', callback);
};

/**
 * Sends the inputted Time Stamp option to the Ardublockly Server Settings. The new
 * settings menu for the End Of Line options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param serialtimestamp
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.setSerialTimeStamp = function (serialtimestamp, callback) {
    ArdublocklyServer.putJson(
        '/settings/serialtimestamp', {"new_value": serialtimestamp}, callback);
};

/**
 * Gets the Example files from local directory.
 * @param url Path to example file or action
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.requestExamplesList = function (url, callback) {
    ArdublocklyServer.getJson(url, callback);
};

/**
 * Sends the Arduino code to the ArdublocklyServer to be processed as defined
 * by the settings.
 * @param {!string} code Arduino code in a single string format.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.sendSketchToServer = function (code, callback, async) {
    ArdublocklyServer.sendRequest(
        '/code', 'POST', 'application/json', {"sketch_code": code}, callback, async);
};

/**
 * Open putty to be processed as defined by the settings.
 */
ArdublocklyServer.sendCliToPutty = function (callback) {
    ArdublocklyServer.sendRequest(
        '/putty', 'POST', 'application/json', null, callback, true);
};

/**
 * kill putty process.
 */
ArdublocklyServer.cliKillPutty = function (callback) {
    ArdublocklyServer.sendRequest(
        '/killputty', 'POST', 'application/json', null, callback, true);
};

/**
 * Get version number.
 */
ArdublocklyServer.getVersionNumber = function (callback) {
    ArdublocklyServer.sendRequest(
        'build_number', 'GET', 'application/text', null, callback, true);
};
