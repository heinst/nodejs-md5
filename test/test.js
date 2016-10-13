var md5 = require("../index.js");
var expect = require("chai").expect;

describe("A library that mimics the MD5 command shipped with macOS", function() {
    describe("MD5 Outputs for a File", function() {
        it("returns full output for MD5", function() {
            md5.file("./test/testfile.txt" , function(md5) {
                expect(md5).to.equal("MD5 (testfile.txt) = f0ffb8dbde05931dfb9baeee5c86b214");
            });
        });

        it("returns just the MD5 of a file", function() {
            md5.file.quiet("./test/testfile.txt" , function(md5) {
                expect(md5).to.equal("f0ffb8dbde05931dfb9baeee5c86b214");
            });
        });

        it("returns the MD5, then the file name, of a file", function() {
            md5.file.reverse("./test/testfile.txt" , function(md5) {
                expect(md5).to.equal("f0ffb8dbde05931dfb9baeee5c86b214 testfile.txt");
            });
        });
    });

    describe("MD5 Outputs for an array of Paths", function() {
        it("returns the full output for MD5s", function() {
            md5.files(["./test/testfile.txt", "./test/anotherTestFile.txt"], function(md5s) {
                expect(md5s[0]).to.equal("MD5 (testfile.txt) = f0ffb8dbde05931dfb9baeee5c86b214");
                expect(md5s[1]).to.equal("MD5 (anotherTestFile.txt) = 59a8935a0ac35991c27f29d4f25ea8b9");
            });
        });

        it("returns just the MD5 of the Files", function() {
            md5.files.quiet(["./test/testfile.txt", "./test/anotherTestFile.txt"], function(md5s) {
                expect(md5s[0]).to.equal("f0ffb8dbde05931dfb9baeee5c86b214");
                expect(md5s[1]).to.equal("59a8935a0ac35991c27f29d4f25ea8b9");
            });
        });

        it("returns the MD5s, then the file names, of the Files", function() {
            md5.files.reverse(["./test/testfile.txt", "./test/anotherTestFile.txt"], function(md5s) {
                expect(md5s[0]).to.equal("f0ffb8dbde05931dfb9baeee5c86b214 testfile.txt");
                expect(md5s[1]).to.equal("59a8935a0ac35991c27f29d4f25ea8b9 anotherTestFile.txt");
            });
        });
    });

    describe("MD5 Outputs for Strings", function() {
        it("returns the full output for the MD5 of a string", function() {
            expect(md5.string("Hello, world")).to.equal("MD5 (\"Hello, world\") = bc6e6f16b8a077ef5fbc8d59d0b931b9");
        });

        it("returns just the MD5 of a string", function() {
            it("returns the MD5 of a string", function() {
                expect(md5.string.quiet("Hello, world")).to.equal("bc6e6f16b8a077ef5fbc8d59d0b931b9");
            });
        });

        it("returns the MD5s, then the file names, of the Files", function() {
            it("returns the MD5, then the string itself", function() {
                expect(md5.string.quiet("Hello, world")).to.equal("bc6e6f16b8a077ef5fbc8d59d0b931b9 \"Hello, world\"");
            });
        });
    });
});
