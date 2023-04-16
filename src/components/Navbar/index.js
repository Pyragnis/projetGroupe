import NavigationBar from 'react-native-navbar';

const styles = {
    container: {
      flex: 1,
    },
  };
   
  const rightButtonConfig = {
    title: 'Next',
    handler: () => alert('hello!'),
  };
   
  const titleConfig = {
    title: 'Hello, world',
  };
   
  function ComponentWithNavigationBar() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          rightButton={rightButtonConfig}
        />
      </View>
    );
  }