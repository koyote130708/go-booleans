/*
 * Copyright (c) 2018 Michael Ko
 * 
 * This work is licensed under the GNU LGPLv3 license.
 * <https://www.gnu.org/licenses/lgpl-3.0.en.html>.
 */

/* global define, global */

(function (root, factory) {
    // UMD (Universal Module Definition) https://github.com/umdjs/umd
    if (typeof define === "function" && define.amd) {
        define([], factory.bind(null, root));
    } else if (typeof exports === "object") {
        module.exports = factory(root);
    } else {
        root.Booleans = factory(root);
    }

}(typeof window !== "undefined" ? window : global, function (root) {


    var Booleans = {
        /**
         * Determines whether the value is a primitive boolean or <code>Boolean</code> object.
         * @param {*} value The value to check.
         * @returns {boolean} <code>true</code> if the value is a primitive boolean or <code>Boolean</code> object; <code>false</code> otherwise.
         * @example <caption>Boolean values</caption>
         * // returns true
         * isBoolean(true);
         * isBoolean(new Boolean(true));
         * @example <caption>Non-boolean values</caption>
         * // returns false
         * isBoolean(1);
         * isBoolean("true");
         * @since 1.0.0
         * @static
         */
        isBoolean: function (value) {
            return typeof value === "boolean" || value instanceof Boolean;
        },
        /**
         * Determines whether the value is <code>true</code> (a primitive boolean or <code>Boolean</code> object).
         * @param {*} value The value to check.
         * @returns {boolean} <code>true</code> if the value is true; <code>false</code> otherwise.
         * @example <caption>True values</caption>
         * // returns true
         * isTrue(true);
         * isTrue(Boolean(true));
         * @example <caption>Non-true values</caption>
         * // returns false
         * isTrue(false);
         * isTrue(1);
         * isTrue("true");
         * @since 1.0.0
         * @static
         */
        isTrue: function (value) {
            return value === true || (value instanceof Boolean && value.valueOf() === true);
        },
        /**
         * Determines whether the value is <code>false</code> (a primitive boolean or <code>Boolean</code> object).
         * @param {*} value The value to check.
         * @returns {boolean} <code>true</code> if the value is false; <code>false</code> otherwise.
         * @example <caption>False values</caption>
         * // returns true
         * isFalse(false);
         * isFalse(Boolean(false));
         * @example <caption>Non-false values</caption>
         * // returns false
         * isFalse(true);
         * isFalse(0);
         * isFalse("false");
         * @since 1.0.0
         * @static
         */
        isFalse: function (value) {
            return value === false || (value instanceof Boolean && value.valueOf() === false);
        },
        /**
         * Determines whether the value is a truthy value. 
         * A truthy value is a value that is considered true when encountered in a Boolean context.
         * All values are truthy except <code>false</code>, <code>0</code>, <code>""</code>, <code>undefined</code>, <code>null</code> and <code>NaN</code>.
         * @param {*} value The value to check.
         * @returns {boolean} <code>true</code> if the value is a truthy value; <code>false</code> otherwise.
         * @example <caption>Truthy values</caption>
         * // returns true
         * isTruthy(true);
         * isTruthy(1);
         * isTruthy("false");
         * isTruthy(new Boolean(false));
         * isTruthy({});
         * @example <caption>Non-truthy values</caption>
         * // returns false
         * isTruthy(false);
         * isTruthy(0);
         * isTruthy("");
         * isTruthy(undefined);
         * isTruthy(null);
         * isTruthy(NaN);
         * @since 1.0.0
         * @static
         */
        isTruthy: function (value) {
            return value ? true : false;
        },
        /**
         * Determines whether the value is a falsy value which can be one of the following:
         * - <code>false</code>
         * - <code>0</code>
         * - <code>""</code>
         * - <code>undefined</code>
         * - <code>null</code>
         * - <code>NaN</code>
         * @param {*} value The value to check.
         * @returns {boolean} <code>true</code> if the value is a falsy value; <code>false</code> otherwise.
         * @example <caption>Falsy values</caption>
         * // returns true
         * isFalsy(false);
         * isFalsy(0);
         * isFalsy("");
         * isFalsy(undefined);
         * isFalsy(null);
         * isFalsy(NaN);
         * @example <caption>Non-falsy values</caption>
         * // returns false
         * isFalsy(true);
         * isFalsy(-1);
         * isFalsy("false");
         * isFalsy(new Boolean(false));
         * isFalsy({});
         * @since 1.0.0
         * @static
         */
        isFalsy: function (value) {
            return value ? false : true;
        },
        /**
         * Examines the given value to find a boolean value. If no boolean value is found, the <code>defaultValue</code> is returned instead. Based on the type of <code>value</code>, it performs the following:
         * - <code>string</code>: checks if the string is equal to <code>"true"</code> or <code>"false"</code> after trimming surrounding spaces and converting the string to lower case if required. If it matches, it returns the corresponding boolean value.
         * - <code>boolean</code>: returns the boolean value.
         * @param {(string|boolean|Boolean)} value The value to parse a boolean value from.
         * @param {boolean} [defaultValue] The default value to return when no boolean value is found.
         * @returns {boolean} A boolean value parsed from the <code>value</code> if found; the <code>defaultValue</code> otherwise.
         * @example <caption>Parsable values</caption>
         * parseBool("true"); // => true
         * parseBool("FALSE"); // => false
         * parseBool(true); // => true
         * parseBool(new Boolean(false)); // => false
         * @example <caption>Non-parsable values</caption>
         * parseBool(1); // => undefined
         * parseBool("true1"); // => undefined
         * parseBool("true or false"); // => undefined
         * parseBool("Hello, World!", false); // => false
         * @since 1.0.0
         * @static
         */
        parseBool: function (value, defaultValue) {
            if (value == "true") {
                return true;
            } else if (value == "false") {
                return false;
            } else if (typeof value === "string" || value instanceof String) {
                var normalised = value.trim().toLowerCase();
                if (normalised === "true") {
                    return true;
                } else if (normalised === "false") {
                    return false;
                }
            } else if (typeof value === "boolean") {
                return value;
            } else if (value instanceof Boolean) {
                return value.valueOf();
            }
            return defaultValue;
        },
        /**
         * Examines the given value to find a boolean value without any normalisation or conversion. If no boolean value is found, the <code>defaultValue</code> is returned instead. Based on the type of <code>value</code>, it performs the following:
         * - <code>string</code>: checks if the string is equal to <code>"true"</code> or <code>"false"</code>. If it matches, it returns the corresponding boolean value.
         * - <code>boolean</code>: returns the boolean value.
         * @param {(string|boolean|Boolean)} value The value to parse a boolean value from.
         * @param {boolean} [defaultValue] The default value to return when no boolean value is found.
         * @returns {boolean} A boolean value parsed from the <code>value</code> if found; the <code>defaultValue</code> otherwise.
         * @example <caption>Parsable values</caption>
         * parseBoolStrict("true"); // => true
         * parseBoolStrict("false"); // => false
         * parseBoolStrict(true); // => true
         * parseBoolStrict(new Boolean(false)); // => false
         * @example <caption>Non-parsable values</caption>
         * parseBoolStrict(1); // => undefined
         * parseBoolStrict("True"); // => undefined
         * parseBoolStrict(" false ", true); // => true
         * @since 1.0.0
         * @static
         */
        parseBoolStrict: function (value, defaultValue) {
            if (value == "true") {
                return true;
            } else if (value == "false") {
                return false;
            } else if (typeof value === "boolean") {
                return value;
            } else if (value instanceof Boolean) {
                return value.valueOf();
            }
            return defaultValue;
        }
    };

    return Booleans;
}));