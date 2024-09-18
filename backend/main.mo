import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Func "mo:base/Func";
import Hash "mo:base/Hash";
import Result "mo:base/Result";

import Float "mo:base/Float";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor {
  // Define the structure for an inventory item
  type InventoryItem = {
    iid: Text;
    title: Text;
    description: Text;
    quantity: Nat;
    unit: Text;
    avgCost: Float;
  };

  // Create a stable variable to store the inventory
  stable var inventoryEntries : [(Text, InventoryItem)] = [];
  var inventory = HashMap.HashMap<Text, InventoryItem>(0, Text.equal, Text.hash);

  // Initialize the inventory from stable storage
  system func preupgrade() {
    inventoryEntries := Iter.toArray(inventory.entries());
  };

  system func postupgrade() {
    inventory := HashMap.fromIter<Text, InventoryItem>(inventoryEntries.vals(), 1, Text.equal, Text.hash);
  };

  // Function to add a new item to the inventory
  public func addItem(iid: Text, title: Text, description: Text, quantity: Nat, unit: Text, avgCost: Float) : async () {
    let newItem : InventoryItem = {
      iid = iid;
      title = title;
      description = description;
      quantity = quantity;
      unit = unit;
      avgCost = avgCost;
    };
    inventory.put(iid, newItem);
  };

  // Function to search for items in the inventory
  public query func searchItems(searchQuery: Text) : async [InventoryItem] {
    let lowercaseQuery = Text.toLowercase(searchQuery);
    let searchResults = Iter.toArray(
      Iter.filter(inventory.vals(), func (item: InventoryItem) : Bool {
        Text.contains(Text.toLowercase(item.title), #text(lowercaseQuery)) or
        Text.contains(Text.toLowercase(item.description), #text(lowercaseQuery))
      })
    );
    return searchResults;
  };

  // Function to get all items in the inventory
  public query func getAllItems() : async [InventoryItem] {
    return Iter.toArray(inventory.vals());
  };
}
