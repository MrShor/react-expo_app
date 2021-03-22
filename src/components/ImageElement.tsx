import React from "react";
import { Image, TouchableHighlight, StyleSheet } from "react-native";
import { IImagesData } from "../interface/imagesData";

export default function ImageElement({ thumbnailUrl }: IImagesData) {
  return (
    <Image
    source={{ uri: thumbnailUrl }}
    style={styles.image}
  />
  )
}

const styles = StyleSheet.create({
  image: {
    margin: 10,
    height: 150,
    width: 150,
  }
})