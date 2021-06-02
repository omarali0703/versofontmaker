function exportConfig() {
    let inputs = document.querySelectorAll('.basesetting-container');
    let outputObject = { settings: {}, effects: {} };
    for (let input of inputs) {
        let configType = input.getAttribute('config');

        switch (configType) {

            case "base":
                let settings = input.querySelectorAll('.input-group');
                for (let setting of settings) {
                    let key, value;
                    if (setting.querySelectorAll('select').length > 0) {
                        value = setting.querySelector('select').value;
                        key = setting.querySelector('select').getAttribute('inputid');
                    } else {
                        console.log(setting.querySelector('input'))
                        value = setting.querySelector('input').value;
                        key = setting.querySelector('input').getAttribute('inputid');
                    }
                    console.log(key);
                    outputObject.settings[key] = value;
                }
                break;
        }
    }

    console.log(outputObject);
}