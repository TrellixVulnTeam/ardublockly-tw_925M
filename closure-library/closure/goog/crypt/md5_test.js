// Copyright 2011 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.module('goog.crypt.Md5Test');
goog.setTestOnly();

const Md5 = goog.require('goog.crypt.Md5');
const crypt = goog.require('goog.crypt');
const hashTester = goog.require('goog.crypt.hashTester');
const testSuite = goog.require('goog.testing.testSuite');

const sixty = '123456789012345678901234567890123456789012345678901234567890';

testSuite({
  testBasicOperations() {
    const md5 = new Md5();
    hashTester.runBasicTests(md5);
  },

  testBlockOperations() {
    const md5 = new Md5();
    hashTester.runBlockTests(md5, 64);
  },

  testHashing() {
    // Empty stream.
    const md5 = new Md5();
    assertEquals(
        'd41d8cd98f00b204e9800998ecf8427e', crypt.byteArrayToHex(md5.digest()));

    // Simple stream.
    md5.reset();
    md5.update([97]);
    assertEquals(
        '0cc175b9c0f1b6a831c399e269772661', crypt.byteArrayToHex(md5.digest()));

    // Simple stream with two updates.
    md5.reset();
    md5.update([97]);
    md5.update('bc');
    assertEquals(
        '900150983cd24fb0d6963f7d28e17f72', crypt.byteArrayToHex(md5.digest()));

    // RFC 1321 standard test.
    md5.reset();
    md5.update('abcdefghijklmnopqrstuvwxyz');
    assertEquals(
        'c3fcd3d76192e4007dfb496cca67e13b', crypt.byteArrayToHex(md5.digest()));

    // RFC 1321 standard test with two updates.
    md5.reset();
    md5.update('message ');
    md5.update('digest');
    assertEquals(
        'f96b697d7cb7938d525a2f31aaf161d0', crypt.byteArrayToHex(md5.digest()));

    // RFC 1321 standard test with three updates.
    md5.reset();
    md5.update('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    md5.update('abcdefghijklmnopqrstuvwxyz');
    md5.update('0123456789');
    assertEquals(
        'd174ab98d277d9f5a5611c2c9f419d9f', crypt.byteArrayToHex(md5.digest()));
  },

  testPadding() {
    // Message + padding fits in two 64-byte blocks.
    const md5 = new Md5();
    md5.update(sixty);
    md5.update(sixty.substr(0, 59));
    assertEquals(
        '6261005311809757906e04c0d670492d', crypt.byteArrayToHex(md5.digest()));

    // Message + padding does not fit in two 64-byte blocks.
    md5.reset();
    md5.update(sixty);
    md5.update(sixty);
    assertEquals(
        '1d453b96d48d5e0cec4a20a71fecaa81', crypt.byteArrayToHex(md5.digest()));
  },

  testTwoAccumulators() {
    // Two accumulators in parallel.
    const md5_A = new Md5();
    const md5_B = new Md5();
    md5_A.update(sixty);
    md5_B.update(sixty);
    md5_A.update(`${sixty}1`);
    md5_B.update(`${sixty}2`);
    assertEquals(
        '0801d688cc107d4789ec8b9a4519f01f',
        crypt.byteArrayToHex(md5_A.digest()));
    assertEquals(
        '6e1a35ffc185d1e684d6ed281c0d4bd2',
        crypt.byteArrayToHex(md5_B.digest()));
  },

  testCollision() {
    // Check a known collision.
    const A = [
      0xd1, 0x31, 0xdd, 0x02, 0xc5, 0xe6, 0xee, 0xc4, 0x69, 0x3d, 0x9a, 0x06,
      0x98, 0xaf, 0xf9, 0x5c, 0x2f, 0xca, 0xb5, 0x87, 0x12, 0x46, 0x7e, 0xab,
      0x40, 0x04, 0x58, 0x3e, 0xb8, 0xfb, 0x7f, 0x89, 0x55, 0xad, 0x34, 0x06,
      0x09, 0xf4, 0xb3, 0x02, 0x83, 0xe4, 0x88, 0x83, 0x25, 0x71, 0x41, 0x5a,
      0x08, 0x51, 0x25, 0xe8, 0xf7, 0xcd, 0xc9, 0x9f, 0xd9, 0x1d, 0xbd, 0xf2,
      0x80, 0x37, 0x3c, 0x5b, 0xd8, 0x82, 0x3e, 0x31, 0x56, 0x34, 0x8f, 0x5b,
      0xae, 0x6d, 0xac, 0xd4, 0x36, 0xc9, 0x19, 0xc6, 0xdd, 0x53, 0xe2, 0xb4,
      0x87, 0xda, 0x03, 0xfd, 0x02, 0x39, 0x63, 0x06, 0xd2, 0x48, 0xcd, 0xa0,
      0xe9, 0x9f, 0x33, 0x42, 0x0f, 0x57, 0x7e, 0xe8, 0xce, 0x54, 0xb6, 0x70,
      0x80, 0xa8, 0x0d, 0x1e, 0xc6, 0x98, 0x21, 0xbc, 0xb6, 0xa8, 0x83, 0x93,
      0x96, 0xf9, 0x65, 0x2b, 0x6f, 0xf7, 0x2a, 0x70,
    ];
    const B = [
      0xd1, 0x31, 0xdd, 0x02, 0xc5, 0xe6, 0xee, 0xc4, 0x69, 0x3d, 0x9a, 0x06,
      0x98, 0xaf, 0xf9, 0x5c, 0x2f, 0xca, 0xb5, 0x07, 0x12, 0x46, 0x7e, 0xab,
      0x40, 0x04, 0x58, 0x3e, 0xb8, 0xfb, 0x7f, 0x89, 0x55, 0xad, 0x34, 0x06,
      0x09, 0xf4, 0xb3, 0x02, 0x83, 0xe4, 0x88, 0x83, 0x25, 0xf1, 0x41, 0x5a,
      0x08, 0x51, 0x25, 0xe8, 0xf7, 0xcd, 0xc9, 0x9f, 0xd9, 0x1d, 0xbd, 0x72,
      0x80, 0x37, 0x3c, 0x5b, 0xd8, 0x82, 0x3e, 0x31, 0x56, 0x34, 0x8f, 0x5b,
      0xae, 0x6d, 0xac, 0xd4, 0x36, 0xc9, 0x19, 0xc6, 0xdd, 0x53, 0xe2, 0x34,
      0x87, 0xda, 0x03, 0xfd, 0x02, 0x39, 0x63, 0x06, 0xd2, 0x48, 0xcd, 0xa0,
      0xe9, 0x9f, 0x33, 0x42, 0x0f, 0x57, 0x7e, 0xe8, 0xce, 0x54, 0xb6, 0x70,
      0x80, 0x28, 0x0d, 0x1e, 0xc6, 0x98, 0x21, 0xbc, 0xb6, 0xa8, 0x83, 0x93,
      0x96, 0xf9, 0x65, 0xab, 0x6f, 0xf7, 0x2a, 0x70,
    ];
    const digest = '79054025255fb1a26e4bc422aef54eb4';
    const md5_A = new Md5();
    const md5_B = new Md5();
    md5_A.update(A);
    md5_B.update(B);
    assertEquals(digest, crypt.byteArrayToHex(md5_A.digest()));
    assertEquals(digest, crypt.byteArrayToHex(md5_B.digest()));
  },
});
