export const idlFactory = ({ IDL }) => {
  const InventoryItem = IDL.Record({
    'iid' : IDL.Text,
    'title' : IDL.Text,
    'unit' : IDL.Text,
    'description' : IDL.Text,
    'avgCost' : IDL.Float64,
    'quantity' : IDL.Nat,
  });
  return IDL.Service({
    'addItem' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Nat, IDL.Text, IDL.Float64],
        [],
        [],
      ),
    'getAllItems' : IDL.Func([], [IDL.Vec(InventoryItem)], ['query']),
    'searchItems' : IDL.Func([IDL.Text], [IDL.Vec(InventoryItem)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
