===============
Getting Started
===============
Hello! If you're looking to build your first plasma chain application, you're in the right place.

``plasma-js-lib`` is a JavaScript library that makes it easy for you to interact with plasma chains.
This includes things like making transactions, querying balances, querying blocks, and a lot more.

Adding plasma-js-lib
====================
There are a few simple ways to add ``plasma-js-lib`` to your project.

npm
---
If you're working with a project that supports npm_ imports, you can install ``plasma-js-lib`` with ``npm``:

.. code::
   npm install --save plasma-js-lib

Then you'll be able to import ``Plasma`` in your project:

.. code:: javascript
   const Plasma = require('plasma-js-lib')

Browser
-------
You can also import ``plasma-js-lib`` with a ``<script>`` tag:

.. code:: html
   <script src="https://raw.githubusercontent.com/plasma-group/plasma-js-lib/master/dist/plasma-js-lib.min.js" type="text/javascript"></script>

This will give you access to a window variable:

.. code:: javascript
   const Plasma = window.Plasma

.. _npm: https://www.npmjs.com/
