const base = require('../src/toole')

describe("移出数组的某一项",() => {
    test('正常输入测试',() => {
        expect(base.removeItemByIndex(0,[1,2,3])).toBe[2, 3] // 这里竟然是这样玩的，toBe[] 
        expect(base.removeItemByIndex(1,[1,2,3])).toBe[1,3]
        expect(base.removeItemByIndex(2,[1,2,3])).toBe[1,2]
    })
    test('容错测试',() => {
        expect(base.removeItemByIndex(-1,[1,2,3])).toBe[1,2,3]
        expect(base.removeItemByIndex(3,[1,2,3])).toBe[1,2,3]
        expect(base.removeItemByIndex("1",[1,2,3])).toBe[1,2,3]
        expect(base.removeItemByIndex(false,[1,2,3])).toBe[1,2,3]
        expect(base.removeItemByIndex({},[1,2,3])).toBe[1,2,3]
        expect(base.removeItemByIndex(function(){},[1,2,3])).toBe[1,2,3]
    })
})