const theSum = require("../theSum")


test('shoud return sum two number',async () => {
  expect(theSum(1,2)).toBe(3)
})

test('shoud return error',async () => {
  expect(theSum("1",2)).toBe(1)
})