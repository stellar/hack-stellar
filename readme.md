# Hack Stellar Boilerplate

This Hack Stellar app is a boilerplate collection of basic Stellar functions. You can either hack this [Stencil](https://stenciljs.com) project into whatever you're trying to build or just cut and paste out the functions from here into your own project.

[View a demo](https://hack-stellar.now.sh)

## Getting Started

To start building with this project clone this repo and install the deps:

```bash
npm i
```

and run:

```bash
npm start
```

To build the app for production, run:

```bash
npm run build
```

## [Stellar Functions](https://github.com/tyvdh/hack-stellar/blob/master/src/components/app-home/app-home.tsx#L48-L176) Featured in this Boilerplate

```ts
keypairGenerate() {}
```
Dead simple Stellar keypair generator method. There are lots of ways to generate valid Stellar keypairs but if all you're looking for is a quick random keypair this is the method for you.

```ts
async accountFund() {}
```
While on testnet we have a fancy little friendbot server method we can call to pay ourselves 10,000 XLM. Once you're in a production environment you'll need to use an `accountPay` method in order to get accounts created and funded. This is just a quick way to boot up your testing environment.

```ts
async accountUpdate() {}
```
Once we have a funded account live on the ledger we can call that account and GET its current state. There's lots of data in an account object understandably so you'll likely want to [brush up on these fields](https://www.stellar.org/developers/guides/concepts/accounts.html).

```ts
async accountCreate() {}
```
A core Stellar transaction operation is creating new accounts. It's just like a payment operation except it's always XLM and always funding new accounts which don't exist on the ledger.

```ts
async accountPay() {}
```
Another central operation of Stellar transactions is making payments. In this method we're paying 100 XLM to the account we just created with an intial 10 XLM. The next step would be to explore [custom assets](https://www.stellar.org/developers/guides/concepts/assets.html) so you can make and receive payments in assets other than the native XLM.

---

### Helpful links:
#### Docs
- [https://www.stellar.org/developers](https://www.stellar.org/developers)
- [https://stellar.github.io/js-stellar-sdk](https://stellar.github.io/js-stellar-sdk/)
- [https://github.com/stellar/js-stellar-sdk](https://github.com/stellar/js-stellar-sdk)
#### Explore
- [https://stellar.expert](https://stellar.expert/)
- [https://stellarbeat.io](https://stellarbeat.io/)
- [https://www.stellar.org/laboratory](https://www.stellar.org/laboratory/)
#### Wallets
- [https://solarwallet.io](https://solarwallet.io/)
- [https://testnet.interstellar.exchange](https://testnet.interstellar.exchange/)
- [https://stellarterm.com/testnet](https://stellarterm.com/testnet)
