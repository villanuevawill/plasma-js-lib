const DUMMY_TRANSCTIONS = [
  {
    hash: '0x0000000000000000000000000000000000000000000000000000000000000001',
    block: 1,
    transfers: [
      {
        sender: '0x0000000000000000000000000000000000000000',
        recipient: '0x0000000000000000000000000000000000000000',
        token: 'ETH',
        amount: 100,
        start: 0,
        end: 100
      }
    ]
  },
  {
    hash: '0x0000000000000000000000000000000000000000000000000000000000000002',
    block: 1,
    transfers: [
      {
        sender: '0x0000000000000000000000000000000000000000',
        recipient: '0x0000000000000000000000000000000000000000',
        token: 'ETH',
        amount: 100,
        start: 0,
        end: 100
      }
    ]
  },
  {
    hash: '0x0000000000000000000000000000000000000000000000000000000000000003',
    block: 1,
    transfers: [
      {
        sender: '0x0000000000000000000000000000000000000000',
        recipient: '0x0000000000000000000000000000000000000000',
        token: 'ETH',
        amount: 100,
        start: 0,
        end: 100
      }
    ]
  }
]

const DUMMY_BLOCKS = [
  {
    number: 1,
    operator: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
    hash: '0x1000000000000000000000000000000000000000000000000000000000000000',
    size: 0,
    timestamp: 1546990851,
    transactions: 0
  },
  {
    number: 2,
    operator: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
    hash: '0x2000000000000000000000000000000000000000000000000000000000000000',
    size: 0,
    timestamp: 1546990851,
    transactions: 0
  },
  {
    number: 3,
    operator: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
    hash: '0x3000000000000000000000000000000000000000000000000000000000000000',
    size: 0,
    timestamp: 1546990851,
    transactions: 0
  },
  {
    number: 4,
    operator: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
    hash: '0x4000000000000000000000000000000000000000000000000000000000000000',
    size: 0,
    timestamp: 1546990851,
    transactions: 0
  },
  {
    number: 5,
    operator: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
    hash: '0x5000000000000000000000000000000000000000000000000000000000000000',
    size: 0,
    timestamp: 1546990851,
    transactions: 0
  },
  {
    number: 6,
    operator: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
    hash: '0x6000000000000000000000000000000000000000000000000000000000000000',
    size: 0,
    timestamp: 1546990851,
    transactions: 0
  },
  {
    number: 7,
    operator: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
    hash: '0x7000000000000000000000000000000000000000000000000000000000000000',
    size: 0,
    timestamp: 1546990851,
    transactions: 0
  }
]

module.exports = {
  DUMMY_TRANSCTIONS,
  DUMMY_BLOCKS
}
