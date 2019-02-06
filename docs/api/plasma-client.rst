============
PlasmaClient
============

``PlasmaClient`` handles interaction with plasma clients that implement the `PG JSON-RPC Calls`_

.. code-block:: javascript

    const PlasmaClient = require('plasma-js-lib')

    // Connects automatically to http://localhost:9898
    const plasma = new PlasmaClient()

------------------------------------------------------------------------------

getAccounts
===========

.. code-block:: javascript

    plasma.getAccounts()

Returns the list of available accounts.

-------
Returns
-------

``Promise<Array>``: List of addresses controlled by the node.

------------------------------------------------------------------------------

getBalances
===========

.. code-block:: javascript

    plasma.getBalances(address)

Returns all token balances for an address.

----------
Parameters
----------

1. ``address`` - ``string``: Address to return balances for.

-------
Returns
-------

``Promise<Object>``: A mapping of token IDs to account balances.

------------------------------------------------------------------------------

getExits
========

.. code-block:: javascript

    plasma.getExits(address)

Returns all active exits for an address.

----------
Parameters
----------

1. ``address`` - ``string``: Address to return exits for.

-------
Returns
-------

``Promise<Array>``: List of exits.

------------------------------------------------------------------------------

getTransaction
==============

.. code-block:: javascript

    plasma.getTransaction(hash)

Returns a transaction given its hash.

----------
Parameters
----------

1. ``hash`` - ``string``: Hash of the transaction to return.

-------
Returns
-------

``Promise<SignedTransaction>``: Transaction with the given hash.

------------------------------------------------------------------------------

getBlock
========

.. code-block:: javascript

    plasma.getBlock(block)

Returns the hash of the plasma block with the given number.

----------
Parameters
----------

1. ``block`` - ``number``: Number of the block to query.

-------
Returns
-------

``Promise<string>``: Hash of the block with that number.

------------------------------------------------------------------------------

getHeight
=========

.. code-block:: javascript

    plasma.getHeight()

Returns the number of the most recently submitted block.

-------
Returns
-------

``Promise<number>``: Last submitted block number.

------------------------------------------------------------------------------

getNextBlock
============

.. code-block:: javascript

    plasma.getNextBlock()

Returns the number of the plasma block that will be submitted next.

-------
Returns
-------

``Promise<number>``: Next plasma block number.

------------------------------------------------------------------------------

getTokenId
==========

.. code-block:: javascript

    plasma.getTokenId(tokenAddress)

Returns the `token ID`_ of the token at the given contract address.

----------
Parameters
----------

1. ``tokenAddress`` - ``string``: Address of the contract that represents the token.

-------
Returns
-------

``Promise<string>``: The token's ID.

------------------------------------------------------------------------------

createAccount
=============

.. code-block:: javascript

    plasma.createAccount()

Creates a new account.

-------
Returns
-------

``Promise<string>``: Address of the created account.

------------------------------------------------------------------------------

sign
====

.. code-block:: javascript

    plasma.sign(address, data)

Signs a message with a given account.

----------
Parameters
----------

1. ``address`` - ``string``: Address of the account to sign with.
2. ``data`` - ``string``: Message to sign.

-------
Returns
-------

``Promise<Object>``: An `Ethereum signature object`_.

------------------------------------------------------------------------------

deposit
=======

.. code-block:: javascript

    plasma.deposit(token, amount, address)

Deposits an amount of a given token for an address.

----------
Parameters
----------

1. ``token`` - ``string``: ID or address of the token to be deposited.
2. ``amount`` - ``number``: Amount to be deposited.
3. ``address`` - ``string``: Address to use to deposit.

-------
Returns
-------

``Promise<EthereumTransaction>``: An Ethereum transaction object.

------------------------------------------------------------------------------

pickRanges
==========

.. code-block:: javascript

    plasma.pickRanges(address, token, amount)

Picks the best ranges to make a transaction.

----------
Parameters
----------

1. ``address`` - ``string``: Address to transact from.
2. ``token`` - ``string``: ID or address of token to send.
3. ``amount`` - ``number``: Amount to be sent.

-------
Returns
-------

``Promise<Array>``: An array of Range_ objects.

------------------------------------------------------------------------------

sendRawTransaction
==================

.. code-block:: javascript

    plasma.sendRawTransaction(transaction)

Sends an encoded and signed transaction to the operator.
If you're looking for an easier way to send transactions, look at ``sendTransaction`` below.

----------
Parameters
----------

1. ``transaction`` - ``string``: The encoded signed transaction.

-------
Returns
-------

``Promise<string>``: A transaction receipt.

------------------------------------------------------------------------------

sendTransaction
===============

.. code-block:: javascript

    plasma.sendTransaction(from, to, token, amount)

The method that most people should use to make transactions.
Wraps ``sendRawTransaction`` and automatically calculates the best ranges for a given transaction.
Also handles formatting and signing the transaction.

----------
Parameters
----------

1. ``from`` - ``string``: Address to send from.
2. ``to`` - ``string``: Address to send to.
3. ``token`` - ``string``: ID or address of the token to send.
4. ``amount`` - ``number``: Amount of the token to send.

-------
Returns
-------

``Promise<string>``: A transaction receipt.

------------------------------------------------------------------------------

startExit
=========

.. code-block:: javascript

    plasma.startExit(address, token, amount)

Starts exits for a user to withdraw a certain amount of a given token.
Will automatically select the right ranges to withdraw and submit more than one exit if necessary.

----------
Parameters
----------

1. ``address`` - ``string``: Address to submit exits for.
2. ``token`` - ``string``: ID or address of the token to exit.
3. ``amount`` - ``number``: Amount of the token to withdraw.

-------
Returns
-------

``Promise<Array>``: Ethereum transaction hash for each exit.

------------------------------------------------------------------------------

finalizeExits
=============

.. code-block:: javascript

    plasma.finalizeExits(address)

Finalizes all available exits for an address.
Will not finalize any exits that are still in their challenge period or have already been finalized.

----------
Parameters
----------

1. ``address`` - ``string``: Address to finalize exits for.

-------
Returns
-------

``Promise<Array>``: Ethereum transaction hash for each finalization.

------------------------------------------------------------------------------

listToken
=========

.. code-block:: javascript

    plasma.listToken(tokenAddress)

Lists a new token so that it can be deposited.

----------
Parameters
----------

1. ``tokenAddress`` - ``string``: Address of the token to be deposited.

-------
Returns
-------

``Promise<EthereumTransaction>``: The transaction result.

.. _PG JSON-RPC Calls: https://plasma-core.readthedocs.io/en/latest/specs/jsonrpc.html
.. _token ID: TODO
.. _Ethereum signature object: https://web3js.readthedocs.io/en/1.0/web3-eth-accounts.html#id14
.. _Range: TODO
