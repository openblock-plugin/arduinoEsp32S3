export default Blockly => {
    Blockly.Arduino['arduino_pin_setPinMode'] = function (block) {
        var arg0 = block.getFieldValue('PIN') || '0';
        var arg1 = block.getFieldValue('MODE') || 'INPUT';
        var code = 'pinMode(' + arg0 + ', ' + arg1 + ');\n';
        return code;
    };

    Blockly.Arduino['arduino_pin_setDigitalOutput'] = function (block) {
        var arg0 = block.getFieldValue('PIN') || '0';
        var arg1 = Blockly.Arduino.valueToCode(block, 'LEVEL', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 'LOW';
        var code = 'digitalWrite(' + arg0 + ', ' + arg1 + ');\n';
        return code;
    };

    Blockly.Arduino['arduino_pin_menu_level'] = function (block) {
        var code = block.getFieldValue('level') || 'LOW';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['arduino_pin_readDigitalPin'] = function (block) {
        var arg0 = block.getFieldValue('PIN') || '0';
        var code = 'digitalRead(' + arg0 + ')';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['arduino_pin_readAnalogPin'] = function (block) {
        var arg0 = block.getFieldValue('PIN') || 'A1';
        var code = 'analogRead(' + arg0 + ')';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['arduino_serial_multiSerialBegin'] = function (block) {
        var arg0 = block.getFieldValue('NO') || '0';
        var arg1 = block.getFieldValue('VALUE') || '9600';

        if (arg0 === '0') {
            arg0 = '';
        }
        var code = 'Serial' + arg0 + '.begin(' + arg1 + ');\n';
        return code;
    };

    Blockly.Arduino['arduino_serial_multiSerialPrint'] = function (block) {
        var arg0 = block.getFieldValue('NO') || '0';
        var arg1 = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
        var eol = block.getFieldValue('EOL') || 'warp';

        if (arg0 === '0') {
            arg0 = '';
        }

        var code;
        if (eol === 'warp') {
            code = 'Serial' + arg0 + '.println(' + arg1 + ');\n';
        } else {
            code = 'Serial' + arg0 + '.print(' + arg1 + ');\n';
        }
        return code;
    };

    Blockly.Arduino['arduino_serial_multiSerialAvailable'] = function (block) {
        var arg0 = block.getFieldValue('NO') || '0';
        if (arg0 === '0') {
            arg0 = '';
        }

        var code = 'Serial' + arg0 + '.available()';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['arduino_serial_multiSerialReadAByte'] = function (block) {
        var arg0 = block.getFieldValue('NO') || '0';
        if (arg0 === '0') {
            arg0 = '';
        }

        var code = 'Serial' + arg0 + '.read()';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['arduino_data_dataMap'] = function (block) {
        var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
        var arg1 = Blockly.Arduino.valueToCode(block, 'ARG0', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1;
        var arg2 = Blockly.Arduino.valueToCode(block, 'ARG1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 100;
        var arg3 = Blockly.Arduino.valueToCode(block, 'ARG2', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1;
        var arg4 = Blockly.Arduino.valueToCode(block, 'ARG3', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1000;

        var code = 'map(' + arg0 + ', ' + arg1 + ', ' + arg2 + ', ' + arg3 + ', ' + arg4 + ')';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['arduino_data_dataConstrain'] = function (block) {
        var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
        var arg1 = Blockly.Arduino.valueToCode(block, 'ARG0', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1;
        var arg2 = Blockly.Arduino.valueToCode(block, 'ARG1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 100;

        var code = 'constrain(' + arg0 + ', ' + arg1 + ', ' + arg2 + ')';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['arduino_data_dataConvert'] = function (block) {
        var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
        var arg1 = block.getFieldValue('TYPE') || 'INTEGER';

        var code;

        switch (arg1) {
        case 'INTEGER':
            code = 'String(' + arg0 + ').toInt()';
            break;
        case 'DECIMAL':
            code = 'String(' + arg0 + ').toFloat()';
            break;
        case 'STRING':
            code = 'String(' + arg0 + ')';
            break;
        }

        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['arduino_data_dataConvertASCIICharacter'] = function (block) {
        var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '0';
        var code = 'String(char(' + arg0 + '))';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['arduino_data_dataConvertASCIINumber'] = function (block) {
        var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '0';
        var code = 'toascii(String(' + arg0 + ')[0])';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['arduino_pin_esp32SetPwmOutput'] = function (block) {
        var arg0 = block.getFieldValue('PIN') || '0';
        var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

        Blockly.Arduino.includes_['esp32SetPwmOutput'] = '#include <ESP32PWM.h>';
        Blockly.Arduino.definitions_['esp32SetPwmOutput' + arg0] = 'ESP32PWM pwm_' + arg0 + ';';
        Blockly.Arduino.setups_['esp32SetPwmOutput' + arg0] = 'pwm_' + arg0 + '.attachPin(' + arg0 + ', 490, 8);';

        // https://github.com/espressif/arduino-esp32/issues/11455
        // Due to this bug in esp32-arduino 3.x, we need to add a delay after attach before writing the duty.
        // Only one delay is needed, so delete and re-add it to ensure it is generated last.
        delete Blockly.Arduino.setups_['esp32LedcFix'];
        Blockly.Arduino.setups_['esp32LedcFix'] = 'delay(40);';

        var code = 'pwm_' + arg0 + '.write(' + arg1 + ');\n';
        return code;
    };

    Blockly.Arduino['arduino_pin_esp32SetDACOutput'] = function (block) {
        var arg0 = block.getFieldValue('PIN') || '0';
        var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
        var code = 'dacWrite(' + arg0 + ', ' + arg1 + ');\n';
        return code;
    };

    Blockly.Arduino['arduino_pin_esp32ReadTouchPin'] = function (block) {
        var arg0 = block.getFieldValue('PIN') || '0';
        var code = 'touchRead(' + arg0 + ')';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['arduino_pin_esp32SetServoOutput'] = function (block) {
        var arg0 = block.getFieldValue('PIN') || '0';
        var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

        Blockly.Arduino.includes_['esp32SetServoOutput'] = '#include <ESP32Servo.h>';
        Blockly.Arduino.definitions_['esp32SetServoOutput' + arg0] = 'Servo servo_' + arg0 + ';';
        Blockly.Arduino.setups_['esp32SetServoOutput' + arg0] = 'servo_' + arg0 + '.attach' + '(' + arg0 + ');';

        delete Blockly.Arduino.setups_['esp32LedcFix'];
        Blockly.Arduino.setups_['esp32LedcFix'] = 'delay(40);';

        var code = 'servo_' + arg0 + '.write(' + arg1 + ');\n';
        return code;
    };

    Blockly.Arduino['arduino_pin_esp32AttachInterrupt'] = function (block) {
        var arg0 = block.getFieldValue('PIN') || '0';
        var arg1 = block.getFieldValue('MODE') || 'RISING';

        var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
        branch = Blockly.Arduino.addLoopTrap(branch, block.id);

        Blockly.Arduino.definitions_['definitions_ISR_' + arg1 + arg0] =
            'void IRAM_ATTR ISR_' + arg1 + '_' + arg0 + '() {\n' + branch + '}';

        var code = 'attachInterrupt(' + arg0 + ', ISR_' + arg1 + '_' + arg0 + ', ' + arg1 + ');\n';
        return code;
    };

    Blockly.Arduino['arduino_pin_esp32DetachInterrupt'] = function (block) {
        var arg0 = block.getFieldValue('PIN') || '0';

        var code = 'detachInterrupt(' + arg0 + ');\n';
        return code;
    };

    return Blockly;
};
