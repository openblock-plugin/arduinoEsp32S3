export default Blockly => {
    Blockly.Arduino.arduino_pin_setPinMode = function (block) {
        const arg0 = block.getFieldValue('PIN') || '0';
        const arg1 = block.getFieldValue('MODE') || 'INPUT';
        const code = `pinMode(${arg0}, ${arg1});\n`;
        return code;
    };

    Blockly.Arduino.arduino_pin_setDigitalOutput = function (block) {
        const arg0 = block.getFieldValue('PIN') || '0';
        const arg1 = Blockly.Arduino.valueToCode(block, 'LEVEL', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 'LOW';
        const code = `digitalWrite(${arg0}, ${arg1});\n`;
        return code;
    };

    Blockly.Arduino.arduino_pin_menu_level = function (block) {
        const code = block.getFieldValue('level') || 'LOW';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.arduino_pin_readDigitalPin = function (block) {
        const arg0 = block.getFieldValue('PIN') || '0';
        const code = `digitalRead(${arg0})`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.arduino_pin_readAnalogPin = function (block) {
        const arg0 = block.getFieldValue('PIN') || 'A1';
        const code = `analogRead(${arg0})`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.arduino_serial_multiSerialBegin = function (block) {
        let arg0 = block.getFieldValue('NO') || '0';
        const arg1 = block.getFieldValue('VALUE') || '9600';

        if (arg0 === '0') {
            arg0 = '';
        }
        const code = `Serial${arg0}.begin(${arg1});\n`;
        return code;
    };

    Blockly.Arduino.arduino_serial_multiSerialPrint = function (block) {
        let arg0 = block.getFieldValue('NO') || '0';
        const arg1 = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
        const eol = block.getFieldValue('EOL') || 'warp';

        if (arg0 === '0') {
            arg0 = '';
        }

        let code;
        if (eol === 'warp') {
            code = `Serial${arg0}.println(${arg1});\n`;
        } else {
            code = `Serial${arg0}.print(${arg1});\n`;
        }
        return code;
    };

    Blockly.Arduino.arduino_serial_multiSerialAvailable = function (block) {
        let arg0 = block.getFieldValue('NO') || '0';
        if (arg0 === '0') {
            arg0 = '';
        }

        const code = `Serial${arg0}.available()`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.arduino_serial_multiSerialReadAByte = function (block) {
        let arg0 = block.getFieldValue('NO') || '0';
        if (arg0 === '0') {
            arg0 = '';
        }

        const code = `Serial${arg0}.read()`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.arduino_data_dataMap = function (block) {
        const arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
        const arg1 = Blockly.Arduino.valueToCode(block, 'ARG0', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1;
        const arg2 = Blockly.Arduino.valueToCode(block, 'ARG1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 100;
        const arg3 = Blockly.Arduino.valueToCode(block, 'ARG2', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1;
        const arg4 = Blockly.Arduino.valueToCode(block, 'ARG3', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1000;

        const code = `map(${arg0}, ${arg1}, ${arg2}, ${arg3}, ${arg4})`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.arduino_data_dataConstrain = function (block) {
        const arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
        const arg1 = Blockly.Arduino.valueToCode(block, 'ARG0', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1;
        const arg2 = Blockly.Arduino.valueToCode(block, 'ARG1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 100;

        const code = `constrain(${arg0}, ${arg1}, ${arg2})`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.arduino_data_dataConvert = function (block) {
        const arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
        const arg1 = block.getFieldValue('TYPE') || 'INTEGER';

        let code;

        switch (arg1) {
        case 'INTEGER':
            code = `String(${arg0}).toInt()`;
            break;
        case 'DECIMAL':
            code = `String(${arg0}).toFloat()`;
            break;
        case 'STRING':
            code = `String(${arg0})`;
            break;
        }

        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.arduino_data_dataConvertASCIICharacter = function (block) {
        const arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '0';
        const code = `String(char(${arg0}))`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.arduino_data_dataConvertASCIINumber = function (block) {
        const arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '0';
        const code = `toascii(String(${arg0})[0])`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.arduino_pin_setPwmOutput = function (block) {
        const arg0 = block.getFieldValue('PIN') || '0';
        const arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

        Blockly.Arduino.includes_.setPwmOutput = '#include <ESP32PWM.h>';
        Blockly.Arduino.definitions_[`setPwmOutput${arg0}`] = `ESP32PWM pwm_${arg0};`;
        Blockly.Arduino.setups_[`setPwmOutput${arg0}`] = `pwm_${arg0}.attachPin(${arg0}, 490, 8);`;

        // https://github.com/espressif/arduino-esp32/issues/11455
        // Due to this bug in esp32-arduino 3.x, we need to add a delay after attach before writing the duty.
        // Only one delay is needed, so delete and re-add it to ensure it is generated last.
        delete Blockly.Arduino.setups_.esp32LedcFix;
        Blockly.Arduino.setups_.esp32LedcFix = 'delay(40);';

        const code = `pwm_${arg0}.write(${arg1});\n`;
        return code;
    };

    Blockly.Arduino.arduino_pin_setDACOutput = function (block) {
        const arg0 = block.getFieldValue('PIN') || '0';
        const arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
        const code = `dacWrite(${arg0}, ${arg1});\n`;
        return code;
    };

    Blockly.Arduino.arduino_pin_readTouchPin = function (block) {
        const arg0 = block.getFieldValue('PIN') || '0';
        const code = `touchRead(${arg0})`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.arduino_pin_setServoOutput = function (block) {
        const arg0 = block.getFieldValue('PIN') || '0';
        const arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;

        Blockly.Arduino.includes_.setServoOutput = '#include <ESP32Servo.h>';
        Blockly.Arduino.definitions_[`setServoOutput${arg0}`] = `Servo servo_${arg0};`;
        Blockly.Arduino.setups_[`setServoOutput${arg0}`] = `servo_${arg0}.attach(${arg0});`;

        delete Blockly.Arduino.setups_.esp32LedcFix;
        Blockly.Arduino.setups_.esp32LedcFix = 'delay(40);';

        const code = `servo_${arg0}.write(${arg1});\n`;
        return code;
    };

    Blockly.Arduino.arduino_pin_attachInterrupt = function (block) {
        const arg0 = block.getFieldValue('PIN') || '0';
        const arg1 = block.getFieldValue('MODE') || 'RISING';

        let branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
        branch = Blockly.Arduino.addLoopTrap(branch, block.id);

        Blockly.Arduino.definitions_[`definitions_ISR_${arg1}${arg0}`] =
            `void IRAM_ATTR ISR_${arg1}_${arg0}() {\n${branch}}`;

        const code = `attachInterrupt(${arg0}, ISR_${arg1}_${arg0}, ${arg1});\n`;
        return code;
    };

    Blockly.Arduino.arduino_pin_detachInterrupt = function (block) {
        const arg0 = block.getFieldValue('PIN') || '0';

        const code = `detachInterrupt(${arg0});\n`;
        return code;
    };

    // Legacy generator aliases, kept for backward compatibility.
    Blockly.Arduino.arduino_pin_esp32SetPwmOutput = Blockly.Arduino.arduino_pin_setPwmOutput;
    Blockly.Arduino.arduino_pin_esp32SetDACOutput = Blockly.Arduino.arduino_pin_setDACOutput;
    Blockly.Arduino.arduino_pin_esp32ReadTouchPin = Blockly.Arduino.arduino_pin_readTouchPin;
    Blockly.Arduino.arduino_pin_esp32SetServoOutput = Blockly.Arduino.arduino_pin_setServoOutput;
    Blockly.Arduino.arduino_pin_esp32AttachInterrupt = Blockly.Arduino.arduino_pin_attachInterrupt;
    Blockly.Arduino.arduino_pin_esp32DetachInterrupt = Blockly.Arduino.arduino_pin_detachInterrupt;

    return Blockly;
};
