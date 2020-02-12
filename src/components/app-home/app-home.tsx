import { Component, h, State } from '@stencil/core'
import { Keypair, Server, AccountResponse, TransactionBuilder, BASE_FEE, Networks, Operation, Asset, Horizon } from 'stellar-sdk'

import handleError from '../../services/error'

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
})
export class AppHome {
  private server: Server = new Server('https://horizon-testnet.stellar.org')

  @State() keypair: Keypair
  @State() account: AccountResponse
  @State() friend: Keypair
  @State() payment: Horizon.SubmitTransactionResponse
  @State() error: Error

  componentWillLoad() {

  }

  // START METHODS

  keypairGenerate() {
    this.error = null
    this.account = null
    this.friend = null
    this.payment = null
    this.keypair = Keypair.random()
  }

  async accountFund() {
    try {
      this.error = null

      await this.server.friendbot(
        this.keypair.publicKey()
      ).call()
      .then((res) => {
        console.log(res)
        this.accountUpdate()
      })
    }
    catch(err) {
      this.error = handleError(err)
    }
  }

  async accountUpdate() {
    try {
      this.error = null

      await this.server
      .loadAccount(this.keypair.publicKey())
      .then((account: any) => {
        console.log(account)
        delete account._links
        this.account = account
      })
    }
    catch (err) {
      this.error = handleError(err)
    }
  }

  async accountCreate() {
    try {
      this.error = null
      this.friend = null
      this.payment = null

      const friend = Keypair.random()

      await this.server
      .loadAccount(this.keypair.publicKey())
      .then((account) => {
        const transaction = new TransactionBuilder(account, {
          fee: BASE_FEE,
          networkPassphrase: Networks.TESTNET
        })
        .addOperation(Operation.createAccount({
          destination: friend.publicKey(),
          startingBalance: '10'
        }))
        .setTimeout(0)
        .build()

        transaction.sign(this.keypair)
        return this.server.submitTransaction(transaction)
      })
      .then((res) => {
        console.log(res)
        this.friend = friend
        this.accountUpdate()
      })
    } catch(err) {
      this.error = handleError(err)
    }
  }

  async paymentSend() {
    try {
      this.error = null
      this.payment = null

      await this.server
      .loadAccount(this.keypair.publicKey())
      .then((account) => {
        const transaction = new TransactionBuilder(account, {
          fee: BASE_FEE,
          networkPassphrase: Networks.TESTNET
        })
        .addOperation(Operation.payment({
          destination: this.friend.publicKey(),
          asset: Asset.native(),
          amount: '100'
        }))
        .setTimeout(0)
        .build()

        transaction.sign(this.keypair)
        return this.server.submitTransaction(transaction)
      })
      .then((res) => {
        console.log(res)
        this.payment = res
        this.accountUpdate()
      })
    } catch(err) {
      this.error = handleError(err)
    }
  }

  // END METHODS

  render() {
    return (
      <div class='app-home'>
        <h2>
          This Hack Stellar app is a boilerplate collection of basic Stellar functions. You can either hack this Stencil project into whatever you're trying to build or just cut and paste out the functions from here into your own project.
        </h2>

        <div class="actions">
          {this.error ? <pre class="error">{JSON.stringify(this.error, null, 2)}</pre> : null}

          <button onClick={() => this.keypairGenerate()}>Generate Keypair</button>
          {!!this.keypair ? <p>{this.keypair.publicKey()}</p> : null}

          <button onClick={() => this.accountFund()}>Fund Account</button>
          {!!this.account ? <p class="check">✅</p> : null}

          <button onClick={() => this.accountUpdate()}>Update Account</button>
          {!!this.account ? <pre class="account">{JSON.stringify(this.account, null, 2)}</pre> : null}

          <button onClick={() => this.accountCreate()}>Create Friend Account</button>
          {!!this.friend ? <p class="check">✅</p> : null}

          <button onClick={() => this.paymentSend()}>Send Friend Payment</button>
          {!!this.payment ? <p class="check">✅</p> : null}
        </div>
      </div>
    )
  }
}
