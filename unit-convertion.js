$app.strings = {
    "en": {
        "main-title": "unit-convertion",
        "exchange-rate": "Exchange Rate",
        "temperature": "Temperature",
        "length": "Length",
        "weight": "Weight",
        "volume": "Volume",
        "distance": "Distance",
        "celsius": "Celsius(˚C)",
        "fahrenheit": "Fahrenheit(˚F)",
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
        "gi": "Gill",
        "miles": "Miles",
        "yards": "Yards",
        "km": "Kiloeters"
    },
    "zh-Hans": {
        "main-title": "单位转换",
        "exchange-rate": "汇率",
        "temperature": "温度",
        "length": "长度",
        "weight": "重量",
        "volume": "容积",
        "distance": "距离",
        "celsius": "摄氏度(˚C)",
        "fahrenheit": "华氏度(˚F)",
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
        "gi": "吉尔",
        "miles": "公里",
        "yards": "码",
        "km": "千米"
    },
    "zh-Hant": {
        "main-title": "單位轉換",
        "exchange-rate": "匯率",
        "temperature": "溫度",
        "length": "長度",
        "weight": "重量",
        "volume": "容積",
        "distance": "距離",
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
        "gi": "吉爾",
        "miles": "公里",
        "yards": "碼",
        "km": "千米"
    }
}

var metrics = [
    $l10n("exchange-rate"),
    $l10n("temperature"),
    $l10n("length"),
    $l10n("weight"),
    $l10n("volume"),
    $l10n("distance")
];

//---------- convert exchange rate ----------
function convertExchangeRate() {
    var usd2cny = 0;
    function fetch(pulled) {
        $http.get({
            url: "https://api.exchangeratesapi.io/latest?base=USD",
            handler: function (resp) {
                usd2cny = resp.data.rates.CNY;
                $("cny-input").text = usd2cny.toFixed(4);
            }
        });
    }
    fetch(false);
    function updateExRate(sender) {
        var usdInput = $("usd-input");
        var cnyInput = $("cny-input");
        var input = parseFloat(sender.text);
        if (sender === usdInput) {
            cnyInput.text = (input * usd2cny).toFixed(3);
        } else {
            usdInput.text = (input / usd2cny).toFixed(3);
        }
    }
    $ui.push({
        props: {
            title: $l10n("exchange-rate")
        },
        views: [
            {
                type: "input",
                props: {
                    id: "usd-input",
                    type: $kbType.decimal,
                    text: "1"
                },
                layout: function (make, view) {
                    make.top.inset(10);
                    make.left.inset(10);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.75)
                        .offset(-15);
                    make.height.equalTo(32);
                },
                events: {
                    changed: function (sender) {
                        updateExRate(sender);
                    }
                }
            },
            {
                type: "button",
                props: {
                    title: "USD"
                },
                layout: function (make, view) {
                    make.top.inset(10);
                    make.left.equalTo(view.prev.right)
                        .inset(10);
                    make.right.inset(10);
                    make.height.equalTo(32);
                }
            },
            {
                type: "input",
                props: {
                    id: "cny-input",
                    type: $kbType.decimal
                },
                layout: function (make, view) {
                    make.top.equalTo(view.prev.bottom)
                        .inset(10);
                    make.left.inset(10);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.75)
                        .offset(-15);
                    make.height.equalTo(32);
                },
                events: {
                    changed: function (sender) {
                        updateExRate(sender);
                    }
                }
            },
            {
                type: "button",
                props: {
                    title: "CNY"
                },
                layout: function (make, view) {
                    make.top.equalTo(view.prev);
                    make.left.equalTo(view.prev.right)
                        .inset(10);
                    make.right.inset(10);
                    make.height.equalTo(32);
                }
            }
        ]
    });
}

//---------- convert temperature ----------
function convertTemperature() {
    $ui.push({
        props: {
            title: $l10n("temperature")
        },
        views: [
            {
                type: "input",
                props: {
                    id: "fah-input",
                    type: $kbType.decimal,
                    text: "86"
                },
                layout: function (make, view) {
                    make.top.inset(10);
                    make.left.inset(10);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.7)
                        .offset(-15);
                    make.height.equalTo(32);
                },
                events: {
                    changed: function (sender) {
                        updateTemp(sender);
                    }
                }
            },
            {
                type: "button",
                props: {
                    title: $l10n("fahrenheit")
                },
                layout: function (make, view) {
                    make.top.inset(10);
                    make.left.equalTo(view.prev.right)
                        .inset(10);
                    make.right.inset(10);
                    make.height.equalTo(32);
                }
            },
            {
                type: "input",
                props: {
                    id: "cel-input",
                    type: $kbType.decimal,
                    text: "30"
                },
                layout: function (make, view) {
                    make.top.equalTo(view.prev.bottom)
                        .inset(10);
                    make.left.inset(10);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.7)
                        .offset(-15);
                    make.height.equalTo(32);
                },
                events: {
                    changed: function (sender) {
                        updateTemp(sender);
                    }
                }
            },
            {
                type: "button",
                props: {
                    title: $l10n("celsius")
                },
                layout: function (make, view) {
                    make.top.equalTo(view.prev);
                    make.left.equalTo(view.prev.right)
                        .inset(10);
                    make.right.inset(10);
                    make.height.equalTo(32);
                }
            }
        ]
    });
    function updateTemp(sender) {
        var fahInput = $("fah-input");
        var celInput = $("cel-input");
        var input = parseFloat(sender.text);
        if (sender === fahInput) {
            celInput.text = ((input - 32) / 1.8).toFixed(2);
        } else {
            fahInput.text = (input * 1.8 + 32).toFixed(2);
        }
    }
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

//---------- convert volume ----------
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
                    type: $kbType.decimal,
                    text: "1.000"
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
                        updateVolume(sender);
                    }
                }
            },
            {
                type: "button",
                props: {
                    title: $l10n("gal")
                },
                layout: function (make, view) {
                    make.right.top.inset(10);
                    make.height.equalTo(32);
                    make.left.equalTo(view.prev.right)
                        .inset(10);
                }
            },
            {
                type: "input",
                props: {
                    id: "l-input",
                    type: $kbType.decimal,
                    text: "3.785"
                },
                layout: function (make, view) {
                    make.left.inset(10);
                    make.height.equalTo(32);
                    make.top.equalTo(view.prev.bottom)
                        .inset(10);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.75)
                        .offset(-15);
                },
                events: {
                    changed: function (sender) {
                        updateVolume(sender);
                    }
                }
            },
            {
                type: "button",
                props: {
                    title: $l10n("l")
                },
                layout: function (make, view) {
                    make.height.equalTo(32);
                    make.right.inset(10);
                    make.top.equalTo(view.prev);
                    make.left.equalTo(view.prev.right)
                        .inset(10);
                }
            },
            // update above about layout format
            {
                type: "input",
                props: {
                    id: "qt-input",
                    type: $kbType.decimal,
                    text: "4.000"
                },
                layout: function (make, view) {
                    make.top.equalTo(view.prev.bottom)
                        .inset(10);
                    make.left.inset(10);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.75)
                        .offset(-15);
                    make.height.equalTo(32);
                },
                events: {
                    changed: function (sender) {
                        updateVolume(sender);
                    }
                }
            },
            {
                type: "button",
                props: {
                    title: $l10n("qt")
                },
                layout: function (make, view) {
                    make.top.equalTo(view.prev);
                    make.left.equalTo(view.prev.right)
                        .inset(10);
                    make.right.inset(10);
                    make.height.equalTo(32);
                }
            },
            {
                type: "input",
                props: {
                    id: "pt-input",
                    type: $kbType.decimal,
                    text: "8.000"
                },
                layout: function (make, view) {
                    make.top.equalTo(view.prev.bottom)
                        .inset(10);
                    make.left.inset(10);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.75)
                        .offset(-15);
                    make.height.equalTo(32);
                },
                events: {
                    changed: function (sender) {
                        updateVolume(sender);
                    }
                }
            },
            {
                type: "button",
                props: {
                    title: $l10n("pt")
                },
                layout: function (make, view) {
                    make.top.equalTo(view.prev);
                    make.left.equalTo(view.prev.right)
                        .inset(10);
                    make.right.inset(10);
                    make.height.equalTo(32);
                }
            },
            {
                type: "input",
                props: {
                    id: "cup-input",
                    type: $kbType.decimal,
                    text: "16.000"
                },
                layout: function (make, view) {
                    make.top.equalTo(view.prev.bottom)
                        .inset(10);
                    make.left.inset(10);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.75)
                        .offset(-15);
                    make.height.equalTo(32);
                },
                events: {
                    changed: function (sender) {
                        updateVolume(sender);
                    }
                }
            },
            {
                type: "button",
                props: {
                    title: $l10n("cup")
                },
                layout: function (make, view) {
                    make.top.equalTo(view.prev);
                    make.left.equalTo(view.prev.right)
                        .inset(10);
                    make.right.inset(10);
                    make.height.equalTo(32);
                }
            },
            {
                type: "input",
                props: {
                    id: "gi-input",
                    type: $kbType.decimal,
                    text: "32.000"
                },
                layout: function (make, view) {
                    make.top.equalTo(view.prev.bottom)
                        .inset(10);
                    make.left.inset(10);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.75)
                        .offset(-15);
                    make.height.equalTo(32);
                },
                events: {
                    changed: function (sender) {
                        updateVolume(sender);
                    }
                }
            },
            {
                type: "button",
                props: {
                    title: $l10n("gi")
                },
                layout: function (make, view) {
                    make.top.equalTo(view.prev);
                    make.left.equalTo(view.prev.right)
                        .inset(10);
                    make.right.inset(10);
                    make.height.equalTo(32);
                }
            }
        ]
    });
    // stupid function, to be updated next version
    function updateVolume(sender) {
        var galInput = $("gal-input");
        var lInput = $("l-input");
        var qtInput = $("qt-input");
        var ptInput = $("pt-input");
        var cupInput = $("cup-input");
        var giInput = $("gi-input");
        var numSender = parseFloat(sender.text);
        var numGal = 0;
        switch (sender) {
            case galInput:
                numGal = numSender;
                break;
            case lInput:
                numGal = numSender / 3.875;
                break;
            case qtInput:
                numgal = numSender / 4;
                break;
            case ptInput:
                numGal = numSender / 8;
                break;
            case cupInput:
                numGal = numSender / 16;
                break;
            default:
                numGal = numSender / 32;
        }
        if (sender != galInput) {
            galInput.text = numGal.toFixed(3);
        }
        if (sender != lInput) {
            lInput.text = (numGal * 3.875).toFixed(3);
        }
        if (sender != qtInput) {
            qtInput.text = (numGal * 4).toFixed(3);
        }
        if (sender != ptInput) {
            ptInput.text = (numGal * 8).toFixed(3);
        }
        if (sender != cupInput) {
            cupInput.text = (numGal * 16).toFixed(3);
        }
        if (sender != giInput) {
            giInput.text = (numGal * 32).toFixed(3);
        }
    }
}

//---------- convert distance ----------
function convertDistance() {
    $ui.push({
        props: {
            title: $l10n("distance")
        },
        views: [
            {
                type: "input",
                props: {
                    id: "mile-input",
                    type: $kbType.decimal,
                    text: "1"
                },
                layout: function (make, view) {
                    make.top.inset(10);
                    make.left.inset(10);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.75)
                        .offset(-15);
                    make.height.equalTo(32);
                },
                events: {
                    changed: function(sender) {
                        updateDistance(sender);
                    }
                }
            },
            {
                type: "button",
                props: {
                    title: $l10n("miles")
                },
                layout: function(make, view) {
                    make.top.inset(10);
                    make.left.equalTo(view.prev.right)
                        .inset(10);
                    make.right.inset(10);
                    make.height.equalTo(32);
                }
            },
            {
                type: "input",
                props: {
                    id: "km-input",
                    type: $kbType.decimal,
                    text: "1.609"
                },
                layout: function(make, view) {
                    make.top.equalTo(view.prev.bottom)
                        .inset(10);
                    make.left.inset(10);
                    make.width.equalTo(view.super)
                        .multipliedBy(0.75)
                        .offset(-15);
                    make.height.equalTo(32);
                },
                events: {
                    changed: function(sender) {
                        updateDistance(sender);
                    }
                }
            },
            {
                type: "button",
                props: {
                    title: $l10n("km")
                },
                layout: function(make, view) {
                    make.top.equalTo(view.prev);
                    make.left.equalTo(view.prev.right)
                        .inset(10);
                    make.right.inset(10);
                    make.height.equalTo(32);
                }
            }
        ]
    });
    function updateDistance(sender) {
        var mileInput = $("mile-input");
        var kmInput = $("km-input");
        var input = parseFloat(sender.text);
        if (sender === mileInput) {
            kmInput.text = (input * 1.609).toFixed(3);
        } else {
            mileInput.text = (input / 1.609).toFixed(3);
        }
    }
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
                        convertVolume();
                        break;
                    case $l10n("distance"):
                        convertDistance();
                        break;
                    default:
                        console.log(data + ": invalid selected item")
                        break;
                }
            }
        }
    }]
});