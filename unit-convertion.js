$app.strings = {
    "en": {
        "main-title": "unit-convertion",
        "exchange-rate": "Exchange Rate",
        "temperature": "Temperature",
        "length": "Length",
        "weight": "Weight",
        "volume": "Volume",
        "from": "From",
        "to": "To",
        "celsius": "Celsius",
        "fahrenheit": "Fahrenheit",
        "feet": "Feet",
        "inches": "Inches",
        "centimeters": "Centimeters",
        "onlyfeet": "Only Feet",
        "lbs": "Pounds",
        "kg": "Kilogram",
        "oz": "Ounce",
        "gal": "Gallon",
        "l": "Liter",
        "qt": "Quart",
        "pt": "Pint",
        "cup": "Cup",
        "gi": "Gill"
    },
    "zh-Hans": {
        "main-title": "单位转换",
        "exchange-rate": "汇率",
        "temperature": "温度",
        "length": "长度",
        "weight": "重量",
        "volume": "容积",
        "from": "转",
        "to": "为",
        "celsius": "摄氏度",
        "fahrenheit": "华氏度",
        "feet": "英尺",
        "inches": "英寸",
        "centimeters": "厘米",
        "onlyfeet": "英尺优先",
        "lbs": "磅",
        "kg": "千克",
        "oz": "盎司",
        "gal": "加仑",
        "l": "升",
        "qt": "夸脱",
        "pt": "品脱",
        "cup": "杯",
        "gi": "吉尔"
    },
    "zh-Hant": {
        "main-title": "單位轉換",
        "exchange-rate": "匯率",
        "temperature": "溫度",
        "length": "長度",
        "weight": "重量",
        "volume": "容積",
        "from": "轉",
        "to": "為",
        "celsius": "攝氏度",
        "fahrenheit": "華氏度",
        "feet": "英尺",
        "inches": "英吋",
        "centimeters": "釐米",
        "onlyfeet": "英尺優先",
        "lbs": "磅",
        "kg": "千克",
        "oz": "盎司",
        "gal": "加侖",
        "l": "升",
        "qt": "誇脫",
        "pt": "品脫",
        "cup": "杯",
        "gi": "吉爾"
    }
}

var metrics = [
    $l10n("exchange-rate"),
    $l10n("temperature"),
    $l10n("length"),
    $l10n("weight"),
    $l10n("volume")
];

//---------- convert exchange rate ----------
function convertExchangeRate() {
    var usd2cny;
    function fetch(pulled) {
        $ui.loading(!pulled);
        $http.get({
            url: "https://api.exchangeratesapi.io/latest?base=USD",
            handler: function (resp) {
                $ui.loading(false);
                usd2cny = resp.data.rates.CNY;
                calculate();
            }
        });
    }
    fetch(false);
    function calculate() {
        let val = parseFloat($("input-USD").text);
        $("label-result").text = val * usd2cny + " CNY";
    }
    $ui.push({
        props: {
            title: $l10n("exchange-rate")
        },
        views: [
            {
                type: "input",
                props: {
                    id: "input-USD",
                    text: "1",
                    type: $kbType.decimal
                },
                layout: function (make, view) {
                    make.left.top.inset(10);
                    make.height.equalTo(32);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.3);
                },
                events: {
                    changed: function (sender) {
                        calculate();
                    }
                }
            },
            {
                type: "label",
                props: {
                    id: "label-USD",
                    text: "USD",
                    font: $font(28)
                },
                layout: function (make, view) {
                    make.top.inset(10);
                    make.left.equalTo($("input-USD").right).inset(5);
                }
            },
            {
                type: "label",
                props: {
                    id: "label-result",
                    text: usd2cny,
                    font: $font(28),
                    align: $align.center
                },
                layout: function (make, view) {
                    make.right.top.inset(10);
                    make.left.equalTo($("label-USD").right).inset(10);
                    make.height.equalTo(32);
                }
            }
        ]
    });
}

//---------- convert temperature ----------
function convertTemperature() {
    var fahrenheit2celsius = true;
    var fahSym = "˚F";
    var celSym = "˚C";
    $ui.push({
        props: {
            title: $l10n("temperature")
        },
        views: [
            {
                type: "label",
                props: {
                    text: $l10n("from"),
                    font: $font(28)
                },
                layout: function (make, view) {
                    make.top.left.inset(10);
                }
            },
            {
                type: "button",
                props: {
                    id: "button-from",
                    title: " " + $l10n("fahrenheit") + " ",
                    font: $font(28)
                },
                layout: function (make, view) {
                    make.left.equalTo(view.prev.right);
                    make.top.inset(10);
                    make.height.equalTo(view.prev.height);
                },
                events: {
                    tapped: function (sender) {
                        switchUnit();
                    }
                }
            },
            {
                type: "label",
                props: {
                    text: $l10n("to"),
                    font: $font(28)
                },
                layout: function (make, view) {
                    make.top.inset(10);
                    make.left.equalTo(view.prev.right);
                    make.height.equalTo(view.prev.height);
                }
            },
            {
                type: "button",
                props: {
                    id: "button-to",
                    title: " " + $l10n("celsius") + " ",
                    font: $font(28)
                },
                layout: function (make, view) {
                    make.top.inset(10);
                    make.height.equalTo(view.prev.height);
                    make.left.equalTo(view.prev.right);
                },
                events: {
                    tapped: function (sender) {
                        switchUnit();
                    }
                }
            },
            {
                type: "input",
                props: {
                    id: "input-temp",
                    type: $kbType.decimal,
                    text: "80",
                    font: $font(28),
                    align: $align.right
                },
                layout: function (make, view) {
                    make.left.inset(10);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.2);
                    make.top.equalTo($("button-from").bottom)
                        .inset(10);
                    make.height.equalTo($("button-from"));
                },
                events: {
                    changed: function (sender) {
                        updateTemp();
                    }
                }
            },
            {
                type: "label",
                props: {
                    id: "label1",
                    text: fahSym,
                    font: $font(36)
                },
                layout: function (make, view) {
                    make.left.equalTo(view.prev.right)
                        .offset(10);
                    make.top.equalTo($("button-from").bottom)
                        .offset(10);
                }
            },
            {
                type: "label",
                props: {
                    id: "output-temp",
                    font: $font(28),
                    align: $align.right
                },
                layout: function (make, view) {
                    make.left.inset(10);
                    make.top.equalTo(view.prev.prev.bottom)
                        .offset(10);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.2);
                    make.height.equalTo(view.prev.prev);
                }
            },
            {
                type: "label",
                props: {
                    id: "label2",
                    text: celSym,
                    font: $font(36)
                },
                layout: function (make, view) {
                    make.left.equalTo(view.prev.right)
                        .offset(10);
                    make.top.equalTo(view.prev.prev.bottom)
                        .offset(10);
                }
            }
        ]
    });
    function switchUnit() {
        fahrenheit2celsius = !fahrenheit2celsius;
        if (fahrenheit2celsius) {
            $("button-from").title = " " + $l10n("fahrenheit") + " ";
            $("button-to").title = " " + $l10n("celsius") + " ";
        } else {
            $("button-from").title = " " + $l10n("celsius") + " ";
            $("button-to").title = " " + $l10n("fahrenheit") + " ";
        }
        $("label1").text = fahrenheit2celsius ? fahSym : celSym;
        $("label2").text = fahrenheit2celsius ? celSym : fahSym;
        updateTemp();
    }
    function updateTemp() {
        var input = parseFloat($("input-temp").text);
        if (fahrenheit2celsius) {
            var output = (input - 32) / 1.8;
        } else {
            var output = input * 1.8 + 32;
        }
        $("output-temp").text = output.toFixed(2);
    }
    updateTemp();
}

//---------- convert length ----------
function convertLength() {
    $ui.push({
        props: {
            title: $l10n("length")
        },
        views: [
            {
                type: "label",
                props: {
                    text: $l10n("onlyfeet")
                },
                layout: function (make, view) {
                    make.left.top.inset(10);
                    make.height.equalTo(32);
                }
            },
            {
                type: "switch",
                props: {
                    id: "only-feet",
                    on: false
                },
                layout: function (make, view) {
                    make.top.inset(10);
                    make.left.equalTo(view.prev.right)
                        .inset(20);
                    make.height.equalTo(32);
                },
                events: {
                    changed: function (sender) {
                        updateOnlyFeet();
                    }
                }
            },
            {
                type: "input",
                props: {
                    id: "feet-input",
                    type: $kbType.decimal,
                    text: "1"
                },
                layout: function (make, view) {
                    make.left.inset(10);
                    make.top.equalTo(view.prev.bottom)
                        .inset(10);
                    make.height.equalTo(32);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.25)
                        .offset(-15);
                },
                events: {
                    changed: function (sender) {
                        updateLength(sender);
                    }
                }
            },
            {
                type: "button",
                props: {
                    title: $l10n("feet")
                },
                layout: function (make, view) {
                    make.top.equalTo(view.prev);
                    make.left.equalTo(view.prev.right)
                        .inset(10);
                    make.height.equalTo(32);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.25)
                        .offset(-10);
                },
                events: {
                    tapped: function (sender) {

                    }
                }
            },
            {
                type: "input",
                props: {
                    id: "inches-input",
                    type: $kbType.decimal,
                    text: "0"
                },
                layout: function (make, view) {
                    make.top.equalTo(view.prev);
                    make.left.equalTo(view.prev.right)
                        .inset(10);
                    make.height.equalTo(32);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.25)
                        .offset(-15);
                },
                events: {
                    changed: function (sender) {
                        updateLength(sender);
                    }
                }
            },
            {
                type: "button",
                props: {
                    title: $l10n("inches")
                },
                layout: function (make, view) {
                    make.top.equalTo(view.prev);
                    make.right.inset(10);
                    make.height.equalTo(32);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.25)
                        .offset(-10);
                }
            },
            {
                type: "input",
                props: {
                    id: "cm-input",
                    type: $kbType.decimal,
                    text: "30.48"
                },
                layout: function (make, view) {
                    make.left.inset(10);
                    make.top.equalTo(view.prev.bottom)
                        .inset(10);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.75)
                        .offset(-20);
                    make.height.equalTo(32);
                },
                events: {
                    changed: function (sender) {
                        updateLength(sender);
                    }
                }
            },
            {
                type: "button",
                props: {
                    title: $l10n("centimeters")
                },
                layout: function (make, view) {
                    make.top.equalTo(view.prev);
                    make.right.inset(10);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.25)
                        .offset(-10);
                    make.height.equalTo(32);
                },
                events: {
                    tapped: function (sender) {

                    }
                }
            }
        ]
    });
    function updateOnlyFeet() {
        var onlyFeet = $("only-feet").on;
        var inchesInput = $("inches-input");
        var feetInput = $("feet-input");
        $("inches-input").userInteractionEnabled = !onlyFeet;
        if (onlyFeet) {
            var numInches = parseFloat(inchesInput.text);
            feetInput.text = (parseFloat(feetInput.text) + (numInches / 12)).toFixed(3);
            inchesInput.text = "0";
        } else {
            var numFeet = parseFloat(feetInput.text);
            feetInput.text = Math.floor(numFeet);
            inchesInput.text = ((numFeet - Math.floor(numFeet)) * 12).toFixed(3);
            inchesInput.blur(); // dismiss keyboard
        }
    }
    function updateLength(sender) {
        var feetInput = $("feet-input");
        var inchesInput = $("inches-input");
        var cmInput = $("cm-input");
        if (sender === feetInput || sender === inchesInput) {
            var numInches = parseFloat(feetInput.text) * 12 + parseFloat(inchesInput.text);
            cmInput.text = (numInches * 2.54).toFixed(3);
        } else {
            var numFeet = parseFloat(cmInput.text) / (2.54 * 12);
            feetInput.text = numFeet;
            updateOnlyFeet();
        }
    }
}

//---------- convert weight ----------
function convertWeight() {
    $ui.push({
        props: {
            title: $l10n("weight")
        },
        views: [
            {
                type: "input",
                props: {
                    id: "lb-input",
                    type: $kbType.decimal,
                    text: "1"
                },
                layout: function (make, view) {
                    make.left.top.inset(10);
                    make.height.equalTo(32);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.75)
                        .offset(-15);
                },
                events: {
                    changed: function (sender) {
                        updateWeight(sender);
                    }
                }
            },
            {
                type: "button",
                props: {
                    title: $l10n("lbs")
                },
                layout: function (make, view) {
                    make.top.right.inset(10);
                    make.height.equalTo(32);
                    make.left.equalTo(view.prev.right)
                        .inset(10);
                }
            },
            {
                type: "input",
                props: {
                    id: "kg-input",
                    type: $kbType.decimal,
                    text: "0.453"
                },
                layout: function (make, view) {
                    make.left.inset(10);
                    make.top.equalTo(view.prev.bottom)
                        .inset(10);
                    make.height.equalTo(32);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.75)
                        .offset(-15);
                },
                events: {
                    changed: function (sender) {
                        updateWeight(sender);
                    }
                }
            },
            {
                type: "button",
                props: {
                    title: $l10n("kg")
                },
                layout: function (make, view) {
                    make.right.inset(10);
                    make.top.equalTo(view.prev);
                    make.left.equalTo(view.prev.right)
                        .inset(10);
                    make.height.equalTo(32);
                }
            },
            {
                type: "input",
                props: {
                    id: "oz-input",
                    type: $kbType.decimal,
                    text: "16"
                },
                layout: function (make, view) {
                    make.left.inset(10);
                    make.top.equalTo(view.prev.bottom)
                        .inset(10);
                    make.height.equalTo(32);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.75)
                        .offset(-15);
                },
                events: {
                    changed: function (sender) {
                        updateWeight(sender);
                    }
                }
            },
            {
                type: "button",
                props: {
                    title: $l10n("oz")
                },
                layout: function (make, view) {
                    make.height.equalTo(32);
                    make.left.equalTo(view.prev.right)
                        .inset(10);
                    make.right.inset(10);
                    make.top.equalTo(view.prev);
                }
            }
        ]
    });
    function updateWeight(sender) {
        var lbInput = $("lb-input");
        var kgInput = $("kg-input");
        var ozInput = $("oz-input");
        if (sender === lbInput) {
            var numLb = parseFloat(lbInput.text);
            kgInput.text = (numLb * 0.4536).toFixed(3);
            ozInput.text = (numLb * 16).toFixed(3);
        } else if (sender === kgInput) {
            var numKg = parseFloat(kgInput.text);
            lbInput.text = (numKg / 0.4536).toFixed(3);
            ozInput.text = (numKg / 0.4536 * 16).toFixed(3);
        } else {
            var numOz = parseFloat(ozInput.text);
            lbInput.text = (numOz / 16).toFixed(3);
            kgInput.text = (numOz / 16 * 0.4536).toFixed(3);
        }
    }
}

//---------- convert volume
function convertVolume() {
    $ui.push({
        props: {
            title: $l10n("volume")
        },
        views: [
            {
                type: "input",
                props: {
                    id: "gal-input",
                    type: $kbType.decimal
                },
                layout: function (make, view) {

                },
                events: {

                }
            }
        ]
    });
}

//---------- render main ui ----------
$ui.render({
    props: {
        title: $l10n("main-title")
    },
    views: [{
        type: "list",
        props: {
            data: metrics
        },
        layout: $layout.fill,
        events: {
            didSelect: function (sender, indexPath, data) {
                switch (data) {
                    case $l10n("exchange-rate"):
                        convertExchangeRate();
                        break;
                    case $l10n("temperature"):
                        convertTemperature();
                        break;
                    case $l10n("length"):
                        convertLength();
                        break;
                    case $l10n("weight"):
                        convertWeight();
                        break;
                    case $l10n("volume"):

                        break;
                    default:
                        console.log(data + ": invalid selected item")
                        break;
                }
            }
        }
    }]
});