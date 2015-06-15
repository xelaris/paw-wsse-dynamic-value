require("./bower_components/cryptojslib/components/core.js");
require("./bower_components/cryptojslib/components/sha1.js");
require("./bower_components/cryptojslib/components/enc-base64.js");

var WsseDynamicValue = function () {

    this.username = "";

    this.password = "";

    this.evaluate = function () {
        var time = (new Date()).toISOString();
        var nonce = CryptoJS.enc.Utf8.parse(Math.random().toString(36).substring(2)).toString(CryptoJS.enc.Base64);
        var digest = CryptoJS.SHA1(
            CryptoJS.enc.Base64
                .parse(nonce).concat(CryptoJS.enc.Utf8.parse(time).concat(CryptoJS.enc.Utf8.parse(this.password)))
        ).toString(CryptoJS.enc.Base64);

        return 'UsernameToken Username="' + this.username + '", PasswordDigest="' + digest + '", Nonce="' + nonce + '", Created="' + time + '"';
    };

    this.title = function () {
        return "WSSE"
    };

    this.text = function () {
        return this.username
    };
};

WsseDynamicValue.identifier = "net.xelaris.PawExtensions.WsseDynamicValue";

WsseDynamicValue.title = "WSSE Dynamic Value";

WsseDynamicValue.inputs = [
    DynamicValueInput("username", "Username", "String"),
    DynamicValueInput("password", "Password", "String")
];

registerDynamicValueClass(WsseDynamicValue);
