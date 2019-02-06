==============
PlasmaOperator
==============

``PlasmaOperator`` handles interaction with the plasma operator.

.. code-block:: javascript

    const PlasmaOperator = require('plasma-js-lib').PlasmaOperator

    // Can replace the endpoint with the endpoint of your operator.
    const operator = new PlasmaOperator('http://localhost:3000')

------------------------------------------------------------------------------

getBlockMetadata
================

.. code-block:: javascript

    operator.getBlockMetadata(start, end)

Returns metadata about a list of blocks.

----------
Parameters
----------

1. ``start`` - ``number``: First block to query.
2. ``end`` - ``number``: Last block to query.

-------
Returns
-------

``Promise<Array>``: A list of metadata objects for each block.

------------------------------------------------------------------------------

getBlockTransactions
====================

.. code-block:: javascript

    operator.getBlockTransactions(block, start, end)

Returns the transactions in a specific block.
Queries all transactions between ``start`` and ``end``.
Limited to 25 transactions at a time.

----------
Parameters
----------

1. ``block`` - ``number``: Number of the block to query.
2. ``start`` - ``number``: First transaction to query.
3. ``end`` - ``number``: Last transaction to query.

-------
Returns
-------

``Promise<Array>``: A list of transaction objects.

------------------------------------------------------------------------------

getTransaction
==============

.. code-block:: javascript

    operator.getTransaction(hash)

Returns a transaction by its hash.

----------
Parameters
----------

1. ``hash`` - ``string``: Hash of the transaction to return.

-------
Returns
-------

``Promise<SignedTransaction>``: The transaction object.

------------------------------------------------------------------------------

getRecentTransactions
=====================

.. code-block:: javascript

    operator.getRecentTransactions(start, end)

Returns a list of recent transactions.

----------
Parameters
----------

1. ``start`` - ``number``: First transaction to query.
2. ``end`` - ``number``: Last transaction to query.

-------
Returns
-------

``Promise<Array>``: A list of transaction objects.

------------------------------------------------------------------------------

getCurrentBlock
===============

.. code-block:: javascript

    operator.getCurrentBlock()

Returns the current block number according to the operator.

-------
Returns
-------

``Promise<number>``: Current block number.

------------------------------------------------------------------------------

submitBlock
===========

.. code-block:: javascript

    operator.submitBlock()

Attempts to force the operator to submit a block.
If the operator is properly configured, it won't let you do this.
Usually used for testing locally.
