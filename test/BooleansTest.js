/*
 * Copyright (c) 2018 Michael Ko
 * 
 * This work is licensed under the GNU LGPLv3 license.
 * <https://www.gnu.org/licenses/lgpl-3.0.en.html>.
 */

/* global NaN */

"use strict";

var assert = require("chai").assert;

var Booleans = require("../src/Booleans");

suite("go/Booleans", function () {

    var fn = function () {};

    suite("#isBoolean", function () {
        var isBoolean = Booleans.isBoolean;

        test("boolean", function () {
            assert.equal(isBoolean(false), true);
            assert.equal(isBoolean(true), true);
            assert.equal(isBoolean(new Boolean(true)), true);
        });

        test("not boolean", function () {
            assert.equal(isBoolean(), false);
            assert.equal(isBoolean(undefined), false);
            assert.equal(isBoolean(null), false);
            assert.equal(isBoolean(""), false);
            assert.equal(isBoolean("false"), false);
            assert.equal(isBoolean(0), false);
            assert.equal(isBoolean(NaN), false);
            assert.equal(isBoolean(Boolean), false);
            assert.equal(isBoolean({}), false);
            assert.equal(isBoolean([]), false);
        });
    });


    suite("#isTrue", function () {
        var isTrue = Booleans.isTrue;

        test("true", function () {
            assert.equal(isTrue(true), true);
            assert.equal(isTrue(new Boolean(true)), true);
        });

        test("not true", function () {
            assert.equal(isTrue(), false);
            assert.equal(isTrue(false), false);
            assert.equal(isTrue(new Boolean(false)), false);
            assert.equal(isTrue("true"), false);
            assert.equal(isTrue("1"), false);
            assert.equal(isTrue(1), false);
            assert.equal(isTrue({}), false);
        });
    });


    suite("#isFalse", function () {
        var isFalse = Booleans.isFalse;

        test("false", function () {
            assert.equal(isFalse(false), true);
            assert.equal(isFalse(new Boolean(false)), true);
        });

        test("not false", function () {
            assert.equal(isFalse(), false);
            assert.equal(isFalse(true), false);
            assert.equal(isFalse(new Boolean(true)), false);
            assert.equal(isFalse(null), false);
            assert.equal(isFalse(undefined), false);
            assert.equal(isFalse(0), false);
            assert.equal(isFalse(NaN), false);
            assert.equal(isFalse(""), false);
            assert.equal(isFalse("false"), false);
            assert.equal(isFalse("0"), false);
            assert.equal(isFalse({}), false);
        });
    });


    suite("#isTruthy", function () {
        var isTruthy = Booleans.isTruthy;

        test("truthy", function () {
            assert.equal(isTruthy(true), true);
            assert.equal(isTruthy(1), true);
            assert.equal(isTruthy("a"), true);
            assert.equal(isTruthy({}), true);
            assert.equal(isTruthy([]), true);
            assert.equal(isTruthy(fn), true);
        });

        test("not truthy", function () {
            assert.equal(isTruthy(), false);
            assert.equal(isTruthy(undefined), false);
            assert.equal(isTruthy(null), false);
            assert.equal(isTruthy(0), false);
            assert.equal(isTruthy(NaN), false);
            assert.equal(isTruthy(""), false);
            assert.equal(isTruthy(false), false);
        });
    });


    suite("#isFalsy", function () {
        var isFalsy = Booleans.isFalsy;

        test("falsy", function () {
            assert.equal(isFalsy(), true);
            assert.equal(isFalsy(undefined), true);
            assert.equal(isFalsy(null), true);
            assert.equal(isFalsy(0), true);
            assert.equal(isFalsy(NaN), true);
            assert.equal(isFalsy(false), true);
            assert.equal(isFalsy(""), true);

        });

        test("not falsy", function () {
            assert.equal(isFalsy(true), false);
            assert.equal(isFalsy(1), false);
            assert.equal(isFalsy(-1), false);
            assert.equal(isFalsy("a"), false);
            assert.equal(isFalsy({}), false);
            assert.equal(isFalsy([]), false);
            assert.equal(isFalsy(fn), false);
        });
    });


    suite("#parseBool", function () {

        var parseBool = Booleans.parseBool;

        test("parsable", function () {
            assert.equal(parseBool("true"), true);
            assert.equal(parseBool("false"), false);
            assert.equal(parseBool("True"), true);
            assert.equal(parseBool("False"), false);
            assert.equal(parseBool("TRUE"), true);
            assert.equal(parseBool("FALSE"), false);
            assert.equal(parseBool("tRuE"), true);
            assert.equal(parseBool("fALsE"), false);
            assert.equal(parseBool(" true"), true);
            assert.equal(parseBool("false "), false);
            assert.equal(parseBool(true), true);
            assert.equal(parseBool(new Boolean(false)), false);
        });

        test("non-parsable", function () {
            assert.equal(parseBool("true1"), undefined);
            assert.equal(parseBool("true."), undefined);
            assert.equal(parseBool("truefalse"), undefined);
            assert.equal(parseBool("true or false"), undefined);
            assert.equal(parseBool("1"), undefined);
            assert.equal(parseBool("0"), undefined);
            assert.equal(parseBool(null), undefined);
            assert.equal(parseBool(0), undefined);
            assert.equal(parseBool(1), undefined);

            assert.equal(parseBool(0, false), false);
            assert.equal(parseBool(1, true), true);
        });
    });


    suite("#parseBoolStrict", function () {

        var parseBoolStrict = Booleans.parseBoolStrict;

        test("parsable", function () {
            assert.equal(parseBoolStrict("true"), true);
            assert.equal(parseBoolStrict("false"), false);
            assert.equal(parseBoolStrict(true), true);
            assert.equal(parseBoolStrict(new Boolean(false)), false);
        });

        test("non-parsable", function () {
            assert.equal(parseBoolStrict("True"), undefined);
            assert.equal(parseBoolStrict("False"), undefined);
            assert.equal(parseBoolStrict("TRUE"), undefined);
            assert.equal(parseBoolStrict("FALSE"), undefined);
            assert.equal(parseBoolStrict(" true"), undefined);
            assert.equal(parseBoolStrict("false "), undefined);
            assert.equal(parseBoolStrict("true1"), undefined);
            assert.equal(parseBoolStrict("true."), undefined);
            assert.equal(parseBoolStrict("truefalse"), undefined);
            assert.equal(parseBoolStrict("true or false"), undefined);
            assert.equal(parseBoolStrict("1"), undefined);
            assert.equal(parseBoolStrict("0"), undefined);
            assert.equal(parseBoolStrict(null), undefined);
            assert.equal(parseBoolStrict(0), undefined);
            assert.equal(parseBoolStrict(1), undefined);

            assert.equal(parseBoolStrict(0, false), false);
            assert.equal(parseBoolStrict(1, true), true);
        });
    });
});