import Eth from 'ethjs-query';
import EthContract from 'ethjs-contract';

import {ELECTION_CONTRACT_ADDRESS} from '~/const';
import ElectionContractJSON from '~/contract/build/contracts/Election.json';

export class Singleton {

  instance = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = this.createInstance();
    }
    return this.instance;
  }
}

class EthContractSingleton extends Singleton {
  static createInstance() {
    let contract;
    if (window.web3) {
      const eth = new Eth(window.web3.currentProvider);
      contract = new EthContract(eth);
    }
    return contract;
  }
}

class ContractSingleton extends Singleton {

  constructor(json, address) {
    super();
    this.contract = this.createContract(json.abi, json.bytecode).at(address);
  }

  createContract(...data) {
    const contract = EthContractSingleton.getInstance();
    if (!contract) {
      throw 'No web3 found!';
    }
    return contract(...data);
  }
}

export class ElectionContract extends ContractSingleton {
  static createInstance() {
    return new ElectionContract(ElectionContractJSON, ELECTION_CONTRACT_ADDRESS);
  }
}
