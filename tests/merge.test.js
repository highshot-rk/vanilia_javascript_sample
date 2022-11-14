import { merge } from '../merge.js'

test('load more and check next page', () => { 
    expect(merge([1,2,3,4], [4,5,6])).toMatchObject([1,2,3,4,5,6]);
});