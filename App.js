import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  // Animated,
  // Easing,
  Text,
  View,
  Button,
  // Image,
  TextInput,
  // Switch,
  // ActivityIndicator,
  // TouchableNativeFeedback,
  // Touchable,
  // TouchableOpacity,
  // Linking,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-community/picker";
// import { traverse } from "@babel/core";

export default function App() {
  //
  class Node {
    constructor(data, left = null, right = null) {
      this.data = data;
      this.left = left;
      this.right = right;
    }
  }
  //
  class BST {
    constructor() {
      this.root = null;
    }
    add(data) {
      const node = this.root;
      if (node === null) {
        this.root = new Node(data);
        return;
      } else {
        const searchTree = function (node) {
          if (data < node.data) {
            if (node.left === null) {
              node.left = new Node(data);
              return;
            } else if (node.left !== null) {
              return searchTree(node.left);
            }
          } else if (data > node.data) {
            if (node.right === null) {
              node.right = new Node(data);
              return;
            } else if (node.right !== null) {
              return searchTree(node.right);
            }
          } else {
            return null;
          }
        };
        return searchTree(node);
      }
    }
    findMin() {
      let current = this.root;
      while (current.left !== null) {
        current = current.left;
      }
      return current.data;
    }
    findMax() {
      let current = this.root;
      while (current.right !== null) {
        current = current.right;
      }
      return current.data;
    }
    find(data) {
      let current = this.root;
      while (current.data !== data) {
        if (data < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
        if (current === null) {
          return null;
        }
      }
      return current;
    }
    isPresent(data) {
      let current = this.root;
      while (current) {
        if (data === current.data) {
          return true;
        }
        if (data < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
      return false;
    }
    remove(data) {
      const removeNode = function (node, data) {
        if (node == null) {
          return null;
        }
        if (data == node.data) {
          // node has no children
          if (node.left == null && node.right == null) {
            return null;
          }
          // node has no left child
          if (node.left == null) {
            return node.right;
          }
          // node has no right child
          if (node.right == null) {
            return node.left;
          }
          // node has two children
          var tempNode = node.right;
          while (tempNode.left !== null) {
            tempNode = tempNode.left;
          }
          node.data = tempNode.data;
          node.right = removeNode(node.right, tempNode.data);
          return node;
        } else if (data < node.data) {
          node.left = removeNode(node.left, data);
          return node;
        } else {
          node.right = removeNode(node.right, data);
          return node;
        }
      };
      this.root = removeNode(this.root, data);
    }
    invertTree = (root = this.root) => {
      const reverseNodes = (node) => {
        if (node === null) {
          return null;
        }
        reverseNodes(node.left);
        reverseNodes(node.right);

        let hold = node.left;
        node.left = node.right;
        node.right = hold;
      };
      reverseNodes(root);
      return root;
    };
    isBalanced() {
      return this.findMinHeight() >= this.findMaxHeight() - 1;
    }
    findMinHeight(node = this.root) {
      if (node == null) {
        return -1;
      }
      let left = this.findMinHeight(node.left);
      let right = this.findMinHeight(node.right);
      if (left < right) {
        return left + 1;
      } else {
        return right + 1;
      }
    }
    findMaxHeight(node = this.root) {
      if (node == null) {
        return -1;
      }
      let left = this.findMaxHeight(node.left);
      let right = this.findMaxHeight(node.right);
      if (left > right) {
        return left + 1;
      } else {
        return right + 1;
      }
    }

    inOrder() {
      if (this.root == null) {
        return null;
      } else {
        var result = new Array();
        function traverseInOrder(node) {
          node.left && traverseInOrder(node.left);
          result.push(node.data);
          node.right && traverseInOrder(node.right);
        }
        traverseInOrder(this.root);
        return result;
      }
    }
    preOrder() {
      if (this.root == null) {
        return null;
      } else {
        var result = new Array();
        function traversePreOrder(node) {
          result.push(node.data);
          node.left && traversePreOrder(node.left);
          node.right && traversePreOrder(node.right);
        }
        traversePreOrder(this.root);
        return result;
      }
    }
    postOrder() {
      if (this.root == null) {
        return null;
      } else {
        var result = new Array();
        function traversePostOrder(node) {
          node.left && traversePostOrder(node.left);
          node.right && traversePostOrder(node.right);
          result.push(node.data);
        }
        traversePostOrder(this.root);
        return result;
      }
    }

    levelOrder() {
      let result = [];
      let Q = [];
      if (this.root != null) {
        Q.push(this.root);
        while (Q.length > 0) {
          let node = Q.shift();
          result.push(node.data);
          if (node.left != null) {
            Q.push(node.left);
          }
          if (node.right != null) {
            Q.push(node.right);
          }
        }
        return result;
      } else {
        return null;
      }
    }
  }

  let binarySearch = new BST();
  let bst = binarySearch;

  function resetTree() {
    binarySearch = new BST();
    bst = binarySearch;
  }

  function traverse() {
    if (traverseNumber === 1) {
      bst.inOrder();
    } else if (traverseNumber === 2) {
      bst.preOrder();
    } else if (traverseNumber === 3) {
      bst.postOrder();
    } else if (traverseNumber === 4) {
      bst.levelOrder();
    }
  }

  function find() {
    if (findNumber === 1) {
      bst.findMax();
    } else if (findNumber === 2) {
      bst.findMaxHeight();
    } else if (findNUmber === 3) {
      bst.findMin();
    } else if (findNumber === 4) {
      bst.findMinHeight();
    } else if (findNUmber === 5) {
      bst.isBalanced();
    }
  }

  const [traverseNumber, setTraverseNumber] = useState(1);
  const [findNumber, setFindNumber] = useState(1);
  const [nodeValue, setNodeValue] = useState(""); // MUST only be a number, ultimately!
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (nodeValue.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [nodeValue]);

  function BstNode(value, parent, left = null, right = null) {
    return (
      <View style={{ backgroundColor: "lightgray" }}>
        <Text>{value}</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          {left ? <BstNode value={left} parent={value} /> : <View></View>}
          {right ? <BstNode value={right} parent={value} /> : <View></View>}
        </View>
      </View>
    );
  }

  const Header = () => {
    return (
      <View style={styles.header}>
        <Text style={{ width: "120%" }}>Binary Tree Visualizer</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "column", flex: 2 }}>
          <View style={{ flexDirection: "row" }}>
            <Text>Node Value:</Text>
            <TextInput
              style={{
                backgroundColor: "lightgray",
                width: "40%",
                left: "10%",
              }}
              onChangeText={(text) => {
                setNodeValue(text);
              }}
              value={nodeValue}
            />
          </View>
          <View style={styles.buttonBox}>
            <Button
              title="Add Node"
              disabled={disabled}
              onPress={() => {
                bst.add(Number(nodeValue));
                console.log(`added: ${Number(nodeValue)}`, bst);
              }}
            />
          </View>
          <View style={styles.buttonBox}>
            <Button
              onPress={() => {
                bst.remove(Number(nodeValue));
              }}
              style={styles.button}
              title="Remove Node"
              disabled={disabled}
            />
          </View>
          <View style={styles.buttonBox}>
            <Button
              style={styles.button}
              title="Clear"
              onPress={() => {
                resetTree();
              }}
            />
          </View>
          <View style={styles.buttonBox}>
            <Button style={styles.button} title="Random" />
          </View>
          <View style={styles.buttonBox}>
            <Button
              style={styles.button}
              title="Invert"
              onPress={() => {
                bst.invertTree();
              }}
            />
          </View>
          <View style={(styles.buttonBox, { flexDirection: "row" })}>
            <Button
              title="Traverse"
              onPress={() => {
                traverse();
              }}
            />
            <Picker
              selectedValue={traverseNumber}
              style={{
                height: 50,
                width: 121,
              }}
              onValueChange={(itemValue) =>
                setTraverseNumber(Number(itemValue))
              }
            >
              <Picker.Item label="In Order" value="1" />
              <Picker.Item label="Pre Order" value="2" />
              <Picker.Item label="Post Order" value="3" />
              <Picker.Item label="Level Order" value="4" />
            </Picker>
          </View>
          <View style={(styles.buttonBox, { flexDirection: "row" })}>
            <Button
              title="Find"
              onPress={() => {
                find();
              }}
            />
            <Picker
              selectedValue={findNumber}
              style={{
                height: 50,
                width: 121,
              }}
              onValueChange={(itemValue) => setFindNumber(Number(itemValue))}
            >
              <Picker.Item label="Max" value="1" />
              <Picker.Item label="Max Height" value="2" />
              <Picker.Item label="Min" value="3" />
              <Picker.Item label="Min Height" value="4" />
              <Picker.Item label="Is Balanced" value="5" />
            </Picker>
          </View>
        </View>
        <View style={{ flexDirection: "column", flex: 3 }}>
          <Text>Tree goes here.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBox: {
    margin: "10%",
  },
  header: {
    backgroundColor: "#fcffed",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingTop: 100,
    paddingBottom: 20,
    paddingLeft: 140,
    paddingRight: 140,
    bottom: 120,
    flexDirection: "row",
  },
});
