var Analyzer = require('../../../index').query.analyzer;
var tokenize = require('../../support/tokenize');
var assert = require('assert');

describe('Analyzer ::', function() {
  describe('UNION statements', function() {
    it('should generate a valid group for UNION statements', function() {
      var tokens = tokenize({
        select: '*',
        from: 'users',
        where: {
          firstName: 'Bob'
        },
        union: [
          {
            select: '*',
            from: 'users',
            where: {
              lastName: 'Smith'
            }
          },
          {
            select: '*',
            from: 'users',
            where: {
              middleName: 'Allen'
            }
          }
        ]
      });

      var result = Analyzer(tokens);

      assert.deepEqual(result, [
        [
          { type: 'IDENTIFIER', value: 'SELECT' },
          { type: 'VALUE', value: '*' }
        ],
        [
          { type: 'IDENTIFIER', value: 'FROM' },
          { type: 'VALUE', value: 'users' }
        ],
        [
          { type: 'IDENTIFIER', value: 'WHERE' },
          { type: 'KEY', value: 'firstName' },
          { type: 'VALUE', value: 'Bob' }
        ],
        [
          { type: 'UNION', value: 'UNION' },
          [
            [
              [
                { type: 'IDENTIFIER', value: 'SELECT' },
                { type: 'VALUE', value: '*' }
              ],
              [
                { type: 'IDENTIFIER', value: 'FROM' },
                { type: 'VALUE', value: 'users' }
              ],
              [
                { type: 'IDENTIFIER', value: 'WHERE' },
                { type: 'KEY', value: 'lastName' },
                { type: 'VALUE', value: 'Smith' }
              ]
            ],
            [
              [
                { type: 'IDENTIFIER', value: 'SELECT' },
                { type: 'VALUE', value: '*' }
              ],
              [
                { type: 'IDENTIFIER', value: 'FROM' },
                { type: 'VALUE', value: 'users' }
              ],
              [
                { type: 'IDENTIFIER', value: 'WHERE' },
                { type: 'KEY', value: 'middleName' },
                { type: 'VALUE', value: 'Allen' }
              ]
            ]
          ]
        ]
      ]);
    });
  });
});