import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, ActivityIndicator, FlatList, StyleSheet, Platform, StatusBar} from "react-native";
import { fetchImages } from "./src/api/api";
import { IImagesData } from "./src/interface/imagesData";

import ImageElement from "./src/components/ImageElement";

const IMAGES_LIMIT  = 20;
const IMAGES_PAGE = 1;

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesData, setImagesData] = useState<IImagesData[]>([]);
  const [page, setPage] = useState<number>(IMAGES_PAGE);
  const [isEndReachCalled, setIsEndReachCalled] = useState<boolean>(true);

  const getImageKey = useCallback((image: IImagesData) => image.id.toString(), []);

  useEffect(() => {
    fetchImages(page, IMAGES_LIMIT).then(res => {
      setImagesData(res);
      setIsLoading(false);
    })
  }, [page]);

  function foo() {
    if(!isEndReachCalled) {
      console.log('fooooo')
      onEndReached();
      setIsEndReachCalled(true);
    }
  }

  async function onEndReached() {
    setPage(page + 1);
    const newImages = await fetchImages(page, IMAGES_LIMIT);
    setImagesData(prevImages => [...prevImages, ...newImages]);
    console.log("page", page)
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#7a7a7a" />
      ) : (
        <FlatList
          data={imagesData}
          renderItem={({ item }) => <ImageElement {...item} />}
          keyExtractor={getImageKey}
          style={styles.list}
          numColumns={2}
          onEndReachedThreshold={0.5}
          onEndReached={foo}
          onMomentumScrollBegin={() => console.log("onMomentumScrollBegin")}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
  },
  list: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
