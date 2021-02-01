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
import { Dimensions } from "react-native";
// import { traverse } from "@babel/core";

//
//  traverse and display should have modal.
// lines from parent to child
//  Animate functions
//  pretty background,
// matter.js
//

export default function App() {
  // <BST>

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      // maxWidth: windowWidth,
    },
    buttonBox: {
      margin: "1%",
    },
    header: {
      backgroundColor: "black",
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingTop: 100,
      paddingBottom: 20,
      paddingLeft: 140,
      paddingRight: 140,
      bottom: 125,
      flex: 1,
      flexDirection: "row",
    },
  });

  const [BinarySearchTree, setBinarySearchTree] = useState({ root: null });
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  class Node {
    constructor(data, left = null, right = null) {
      this.data = data;
      this.left = left;
      this.right = right;
    }
  }

  function NodeView(n) {
    let node = n.node;
    let data = node.data;
    let left = node.left;
    let right = node.right;
    return (
      <View
        // opacity={1}
        style={{
          flexDirection: "column",

          justifyContent: "center",
          alignItems: "center",
          maxWidth: windowWidth / 3.5,
          // backgroundColor: "#FFFFFF90",
        }}
      >
        <View
          style={{
            backgroundColor: "#00dde835",
            borderBottomRightRadius: 50,
            borderBottomLeftRadius: 50,
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
            // margin: 0,
          }}
        >
          <View
            elevation={1}
            opacity={1}
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
              paddingLeft: 0,
              paddingRight: 0,
              maxWidth: 33,
              backgroundColor: "black",
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            <Text
              elevation={99}
              opacity={1}
              numberOfLines={1}
              style={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                marginLeft: 1,
                marginRight: 1,
                padding: 0,
                color: "white",
              }}
            >{`${data}`}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              // maxWidth: windowWidth / 3,
              justifyContent: "space-evenly",
            }}
          >
            {left ? (
              <View>
                <NodeView
                  node={node.left}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </View>
            ) : (
              <View style={{ width: "50%" }}></View>
            )}
            {right ? (
              <View>
                <NodeView
                  node={node.right}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </View>
            ) : (
              <View style={{ width: "50%" }}></View>
            )}
          </View>
        </View>
      </View>
    );
  }

  const add = (data) => {
    // const node = BinarySearchTree.root;
    let copy = BinarySearchTree;
    const node = copy.root;
    console.log(`BST before add: `, BinarySearchTree);
    if (node === null) {
      setBinarySearchTree({ root: new Node(data) });
      // BinarySearchTree.root = new Node(data);
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
      searchTree(node);
      setBinarySearchTree(copy);
    }
  };

  const findMin = () => {
    let current = BinarySearchTree.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  };
  const findMax = () => {
    let current = BinarySearchTree.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  };
  const find = (data) => {
    let current = BinarySearchTree.root;
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
  };
  const isPresent = (data) => {
    let current = BinarySearchTree.root;
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
  };
  const remove = (data) => {
    let copy = BinarySearchTree;
    console.log("bst before remove: ", copy);
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
    copy = removeNode(copy.root, data);
    setBinarySearchTree({ root: copy });
  };
  const invertTree = (root = BinarySearchTree.root) => {
    console.log("bst before invert: ", BinarySearchTree);
    let copy = BinarySearchTree;
    let copyRoot = copy.root;
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
    reverseNodes(copyRoot);
    setBinarySearchTree({ root: copyRoot });
    return root;
  };
  const isBalanced = () => {
    return findMinHeight() >= findMaxHeight() - 1;
  };
  const findMinHeight = (node = BinarySearchTree.root) => {
    if (node == null) {
      return -1;
    }
    let left = findMinHeight(node.left);
    let right = findMinHeight(node.right);
    if (left < right) {
      return left + 1;
    } else {
      return right + 1;
    }
  };
  const findMaxHeight = (node = BinarySearchTree.root) => {
    if (node == null) {
      return -1;
    }
    let left = findMaxHeight(node.left);
    let right = findMaxHeight(node.right);
    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    }
  };

  const inOrder = () => {
    if (BinarySearchTree.root == null) {
      return null;
    } else {
      var result = new Array();
      function traverseInOrder(node) {
        node.left && traverseInOrder(node.left);
        result.push(node.data);
        node.right && traverseInOrder(node.right);
      }
      traverseInOrder(BinarySearchTree.root);
      return result;
    }
  };
  const preOrder = () => {
    if (BinarySearchTree.root == null) {
      return null;
    } else {
      var result = new Array();
      function traversePreOrder(node) {
        result.push(node.data);
        node.left && traversePreOrder(node.left);
        node.right && traversePreOrder(node.right);
      }
      traversePreOrder(BinarySearchTree.root);
      return result;
    }
  };
  const postOrder = () => {
    if (BinarySearchTree.root == null) {
      return null;
    } else {
      var result = new Array();
      function traversePostOrder(node) {
        node.left && traversePostOrder(node.left);
        node.right && traversePostOrder(node.right);
        result.push(node.data);
      }
      traversePostOrder(BinarySearchTree.root);
      return result;
    }
  };

  const levelOrder = () => {
    let result = [];
    let Q = [];
    if (BinarySearchTree.root != null) {
      Q.push(BinarySearchTree.root);
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
  };
  const resetTree = () => {
    setBinarySearchTree({ root: null });
  };
  // </BST>

  function traverse() {
    if (traverseNumber === 1) {
      console.log(inOrder());
    } else if (traverseNumber === 2) {
      console.log(preOrder());
    } else if (traverseNumber === 3) {
      console.log(postOrder());
    } else if (traverseNumber === 4) {
      console.log(levelOrder());
    }
  }

  function simpleFind() {
    if (findNumber === 1) {
      console.log(findMax());
    } else if (findNumber === 2) {
      console.log(findMaxHeight());
    } else if (findNumber === 3) {
      console.log(findMin());
    } else if (findNumber === 4) {
      console.log(findMinHeight());
    } else if (findNumber === 5) {
      console.log(isBalanced());
    }
  }

  const [rando, setRando] = useState(0);

  function randomize() {
    let rand = Math.floor(Math.random() * 30);

    setBinarySearchTree({ root: null });
    setRando(rand);
  }

  useEffect(() => {
    if (rando > 0) {
      let randNum = Math.floor(Math.random() * 100);
      if (rando % 2 === 0) {
        add(randNum);
      } else {
        add(randNum * -1);
      }
      setRando(rando - 1);
    }
  }, [rando]);

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

  const Header = () => {
    return (
      <View style={styles.header}>
        <Text style={{ width: "120%", top: 75, color: "white" }}>
          Binary Tree Visualizer
        </Text>
      </View>
    );
  };

  return (
    <View style={({ maxWidth: windowWidth / 1.2 }, styles.container)}>
      <Header />
      <View style={{ flexDirection: "column", bottom: 100, flex: 7 }}>
        <View
          style={{
            flexDirection: "column",
            bottom: 35,
            justifyContent: "center",
            maxWidth: windowWidth / 2,
            maxHeight: windowHeight / 2,
          }}
        >
          {BinarySearchTree.root ? (
            <View
              style={{
                // backgroundColor: "pink",
                width: windowWidth / 3.5,
                maxHeight: windowHeight / 2,
                left: 100,
                minHeight: 390,
                top: 20,
              }}
            >
              <NodeView node={BinarySearchTree.root} />
            </View>
          ) : (
            <View
              style={{
                height: 390,
                top: 200,
                // alignContent: "center",

                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
            >
              <View
                style={{
                  alignContent: "center",
                  backgroundColor: "black",
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  margin: 40,
                  left: 50,

                  // width: 100,
                }}
              >
                <Text
                  elevation={99}
                  style={{
                    fontSize: 20,
                    fontStyle: "italic",

                    left: 50,
                    // height: 390,
                    color: "white",
                  }}
                >
                  null
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={{ flex: 0 }}>
          <View style={{ flexDirection: "column", marginTop: 20, top: 50 }}>
            <View
              style={{
                flexDirection: "row",
                float: "left",
                left: 0,
                marginBottom: 7,
              }}
            >
              <Text>Node Value:</Text>
              <TextInput
                style={{
                  backgroundColor: "lightgray",
                  width: "61.5%",
                  left: "170%",
                }}
                onChangeText={(text) => {
                  setNodeValue(text);
                }}
                value={nodeValue}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: windowWidth / 2,
              top: 50,
              // right: "50%",
            }}
          >
            <View style={styles.buttonBox}>
              <Button
                title="Add"
                disabled={disabled}
                onPress={() => {
                  add(Number(nodeValue));
                  console.log(`added: ${Number(nodeValue)}`, BinarySearchTree);
                }}
              />
            </View>
            <View style={styles.buttonBox}>
              <Button
                onPress={() => {
                  remove(Number(nodeValue));
                  console.log(
                    `after removing ${nodeValue}: `,
                    BinarySearchTree
                  );
                }}
                style={styles.button}
                title="Remove"
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
              <Button
                style={styles.button}
                title="Random"
                onPress={() => randomize()}
              />
            </View>
            <View>
              <View style={(styles.buttonBox, { top: 1.65 })}>
                <Button
                  style={styles.button}
                  title="Invert"
                  onPress={() => {
                    invertTree();
                    console.log(`bst after invert: `, BinarySearchTree);
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                // width: windowWidth / 2,
                right: "160%",
                top: 50,
                marginBottom: 1,
              }}
            >
              <View style={styles.buttonBox}>
                <Button
                  title="Traverse"
                  onPress={() => {
                    traverse();
                  }}
                />
                <Picker
                  selectedValue={`${traverseNumber}`}
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
              <View style={{ flexDirection: "column", top: 2 }}>
                <Button
                  title="Find"
                  onPress={() => {
                    simpleFind();
                  }}
                />
                <Picker
                  selectedValue={`${findNumber}`}
                  style={{
                    height: 50,
                    width: 121,
                  }}
                  onValueChange={(itemValue) =>
                    setFindNumber(Number(itemValue))
                  }
                >
                  <Picker.Item label="Max" value="1" />
                  <Picker.Item label="Max Height" value="2" />
                  <Picker.Item label="Min" value="3" />
                  <Picker.Item label="Min Height" value="4" />
                  <Picker.Item label="Is Balanced" value="5" />
                </Picker>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
