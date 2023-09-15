import { ContractParamter, ContractType, CreateSmartContract } from './Contract.js';

export interface ContractParamterWrapper<T = ContractParamter> {
    value: T;
    type_url: string;
}
export interface TransactionContract<T = ContractParamter> {
    type: ContractType;
    parameter: ContractParamterWrapper<T>;
    Permission_id?: number;
}

export interface Transaction<T = ContractParamter> {
    visible: boolean;
    txID: string;
    raw_data: {
        contract: TransactionContract<T>[];
        ref_block_bytes: string;
        ref_block_hash: string;
        expiration: number;
        timestamp: number;
        // @todo: confirm these exist
        data?: unknown;
        fee_limit?: unknown;
    };
    raw_data_hex: string;
}

export interface CreateSmartContractTransaction extends Transaction<CreateSmartContract> {
    /**
     * Address of smart contract.
     */
    contract_address: string;
}

/**
 * `TransactionWrapper` interface is returned when user trigger a smart contract.
 */
export interface TransactionWrapper {
    Error?: string;
    result: {
        result: boolean;
        message?: string;
    };
    /**
     * The transaction object created by calling contract function.
     */
    transaction: Transaction;
    /**
     * Energy required for successfully deploying new contract or trigger contract.
     * This is returned in `transactionBuilder.estimateEnergy()` and `transactionBuilder.deployConstantContract()`
     */
    energy_required?: number;
    /**
     * Energy used by triggering contract.
     */
    energy_used?: number;
    /**
     * Result of calling contract function which is decorated by `view` or `pure`.
     */
    constant_result?: any;
}

export interface SignedTransaction extends Transaction {
    signature: string[];
    contract_address?: string;
}
