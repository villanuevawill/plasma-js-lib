const assert = require('chai').assert
const dummy = require('../src/dummy/dummy-data')
const DummyProvider = require('../src/providers/dummy-provider')

describe('DummyProvider', async () => {
  const provider = new DummyProvider()
  it('should return a transaction by hash', async () => {
    const hash = '0x0000000000000000000000000000000000000000000000000000000000000001'
    const tx = await provider.handle('pg_getTransaction', [hash])
    assert.deepEqual(tx, dummy.DUMMY_TRANSCTIONS[0])
  })
  it('should return a block by number', async () => {
    const number = 1
    const block = await provider.handle('pg_getBlock', [number])
    assert.deepEqual(block, dummy.DUMMY_BLOCKS[0])
  })
  it('should return several blocks in a range', async () => {
    const start = 1
    const end = 5
    const blocks = await provider.handle('pg_getBlocks', [start, end])
    assert.deepEqual(blocks, dummy.DUMMY_BLOCKS.slice(0, 5))
  })
  it('should return the current height', async () => {
    const height = await provider.handle('pg_getHeight')
    assert.strictEqual(height, 7)
  })
  it('should return the transactions in a block', async () => {
    const block = 1
    const start = 0
    const end = 5
    const txs = await provider.handle('pg_getTransactionsInBlock', [block, start, end])
    assert.deepEqual(txs, dummy.DUMMY_TRANSCTIONS)
  })
  it('should return the most recent transactions', async () => {
    const start = 0
    const end = 2
    const txs = await provider.handle('pg_getRecentTransactions', [start, end])
    assert.deepEqual(txs, dummy.DUMMY_TRANSCTIONS)
  })
})
