import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface InventoryItem {
  'iid' : string,
  'title' : string,
  'unit' : string,
  'description' : string,
  'avgCost' : number,
  'quantity' : bigint,
}
export interface _SERVICE {
  'addItem' : ActorMethod<
    [string, string, string, bigint, string, number],
    undefined
  >,
  'getAllItems' : ActorMethod<[], Array<InventoryItem>>,
  'searchItems' : ActorMethod<[string], Array<InventoryItem>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
