var md5 = require("../index.js");
var expect = require("chai").expect;

describe("A library that mimics the MD5 command shipped with macOS. This library should", function() {
    describe("output", function() {
        it("the standard md5 output.", function() {
            md5.file("./test/testfile.txt" , function(err, md5) {
                expect(md5).to.equal("MD5 (testfile.txt) = f0ffb8dbde05931dfb9baeee5c86b214");
            });
        });

        it("only the MD5.", function() {
            md5.file.quiet("./test/testfile.txt" , function(err, md5) {
                expect(md5).to.equal("f0ffb8dbde05931dfb9baeee5c86b214");
            });
        });

        it("the reverse md5 output.", function() {
            md5.file.reverse("./test/testfile.txt" , function(err, md5) {
                expect(md5).to.equal("f0ffb8dbde05931dfb9baeee5c86b214 testfile.txt");
            });
        });
    });

    describe("output", function() {
        it("the standard md5 output, respecting input order.", function() {
            md5.files(["./test/testfile.txt", "./test/anotherTestFile.txt"], function(err, md5s) {
                expect(md5s[0]).to.equal("MD5 (testfile.txt) = f0ffb8dbde05931dfb9baeee5c86b214");
                expect(md5s[1]).to.equal("MD5 (anotherTestFile.txt) = 59a8935a0ac35991c27f29d4f25ea8b9");
            });
        });

        it("only the MD5, respecting input order.", function() {
            md5.files.quiet(["./test/testfile.txt", "./test/anotherTestFile.txt"], function(err, md5s) {
                expect(md5s[0]).to.equal("f0ffb8dbde05931dfb9baeee5c86b214");
                expect(md5s[1]).to.equal("59a8935a0ac35991c27f29d4f25ea8b9");
            });
        });

        it("the reverse md5 output, respecting input order.", function() {
            md5.files.reverse(["./test/testfile.txt", "./test/anotherTestFile.txt"], function(err, md5s) {
                expect(md5s[0]).to.equal("f0ffb8dbde05931dfb9baeee5c86b214 testfile.txt");
                expect(md5s[1]).to.equal("59a8935a0ac35991c27f29d4f25ea8b9 anotherTestFile.txt");
            });
        });
    });

    describe("output", function() {
        it("the standard md5 output of a string.", function() {
            md5.string("Hello, world", function (err, md5) {
                expect(md5).to.equal("MD5 (\"Hello, world\") = bc6e6f16b8a077ef5fbc8d59d0b931b9");
            });
        });

        it("just the MD5 of a string.", function() {
            md5.string.quiet("Hello, world", function (err, md5) {
                expect(md5).to.equal("bc6e6f16b8a077ef5fbc8d59d0b931b9");
            });
        });

        it("the reverse md5 output of a string.", function() {
            md5.string.reverse("Hello, world", function (err, md5) {
                expect(md5).to.equal("bc6e6f16b8a077ef5fbc8d59d0b931b9 \"Hello, world\"");
            });
        });
    });

    describe("throw", function() {
        it("error for undefined variable given.", function() {
            md5.string(undefined, function (err, md5) {
                var expectedError = new Error("Variable passed in is undefined");
                expect(err.message).to.equal(expectedError.message);
            });
        });

        it("error for undefined variable given.(quiet)", function() {
            md5.string.quiet(undefined, function (err, md5) {
                var expectedError = new Error("Variable passed in is undefined");
                expect(err.message).to.equal(expectedError.message);
            });
        });

        it("error for undefined variable given. (reverse)", function() {
            md5.string.reverse(undefined, function (err, md5) {
                var expectedError = new Error("Variable passed in is undefined");
                expect(err.message).to.equal(expectedError.message);
            });
        });

        it("non string variable given.", function() {
            md5.string(1, function (err, md5) {
                var expectedError = new Error("Variable passed in is not a String");
                expect(err.message).to.equal(expectedError.message);
            });
        });

        it("non string variable given. (quiet)", function() {
            md5.string.quiet(1, function (err, md5) {
                var expectedError = new Error("Variable passed in is not a String");
                expect(err.message).to.equal(expectedError.message);
            });
        });

        it("non string variable given. (reverse)", function() {
            md5.string.reverse(1, function (err, md5) {
                var expectedError = new Error("Variable passed in is not a String");
                expect(err.message).to.equal(expectedError.message);
            });
        });

        it("directory exception.", function() {
            md5.file("./test", function (err, md5) {
                var expectedError = new Error("./test  - Is a directory");
                expect(err.message).to.equal(expectedError.message);
            });
        });

        it("directory exception. (quiet)", function() {
            md5.file.quiet("./test", function (err, md5) {
                var expectedError = new Error("./test  - Is a directory");
                expect(err.message).to.equal(expectedError.message);
            });
        });

        it("directory exception. (reverse)", function() {
            md5.file.reverse("./test", function (err, md5) {
                var expectedError = new Error("./test  - Is a directory");
                expect(err.message).to.equal(expectedError.message);
            });
        });

        it("directory exception.", function() {
            md5.files(["./test"], function (err, md5) {
                var expectedError = new Error("./test  - Is a directory");
                expect(err.message).to.equal(expectedError.message);
            });
        });

        it("directory exception. (quiet)", function() {
            md5.files.quiet(["./test"], function (err, md5) {
                var expectedError = new Error("./test  - Is a directory");
                expect(err.message).to.equal(expectedError.message);
            });
        });

        it("directory exception. (reverse)", function() {
            md5.files.reverse(["./test"], function (err, md5) {
                var expectedError = new Error("./test  - Is a directory");
                expect(err.message).to.equal(expectedError.message);
            });
        });
    });
});
