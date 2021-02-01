import React, { useState, useEffect } from "react";

function Node(value, parent, left = null, right = null) {
  return (
    <View>
      <Text>{value}</Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        {left ? <Node value={left} parent={value} /> : <View></View>}
        {right ? <Node value={right} parent={value} /> : <View></View>}
      </View>
    </View>
  );
}
