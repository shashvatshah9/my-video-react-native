
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native'
import {StackNavigator} from 'react-navigation'
import YouTube from 'react-native-youtube'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import YouTubeVideo from './YouTubeVideo'

/*
find the channel id sentdex
https://www.googleapis.com/youtube/v3/channels?key=AIzaSyCqmf7AceiC6zADq2SbuzyTZ-6qg44NFzI&forUsername=sentdex&part=id
*/

const apiKey = 'AIzaSyCqmf7AceiC6zADq2SbuzyTZ-6qg44NFzI';
const channelId = 'UCfzlCWGWYyIQ0aLC5w48gBQ'
const results = 30
const wid = Dimensions.get('window').width
console.disableYellowBox = true;

class App extends Component{

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#000'
    },
    headerLeft: (
      <TouchableOpacity>
        <Text style={{ width: 200, height: 25, color: '#fff', paddingLeft: 15, fontSize: 22}}>YouTube Focus</Text>
      </TouchableOpacity>
    ),
  }

  constructor(props){
    super(props)
    this.state={
      data : []
    }
  }
  
   componentDidMount(){
    fetch(`https://www.googleapis.com/youtube/v3/search/?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${results}`)
    //fetch('https://www.googleapis.com/youtube/v3/search/?key=AIzaSyBJ3ntReiv0L19H2RoYW62LpRdIuyPhIpw&channelId=UCQzdMyuz0Lf4zo4uGcEujFw&part=snippet,id&order=date&maxResults=30')
    .then(res => res.json())
    .then(res => {
      const videoId = []
      res.items.forEach(item => {
        videoId.push(item)
      })
      this.setState({
        data: videoId
      }) 
    })
    .catch(error => {
      console.error(error)
    })
  }


   render() {
    const {navigate} = this.props.navigation
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.body}>
            {this.state.data.map((item, i) => 
            <TouchableHighlight 
              key={item.id.videoId} 
              onPress={() => navigate('YouTubeVideo', {youtubeId: item.id.videoId, title: item.snippet.title, description: item.snippet.description})}>
              {/* onPress={() => this.props.navigation.navigate('YoutubeVideo', {youtubeId: item.id.videoId})}> */}
              <View style={styles.vids}>
                <Image 
                  source={{uri: item.snippet.thumbnails.high.url}} 
                  style={{width: wid, height: 180}}/>
                <View style={styles.vidItems}>
                  <Text style={styles.vidText}>{item.snippet.title}</Text>
                  <Icon name='more-vert' size={20} color='#555'/> 
                </View>
              </View>
            </TouchableHighlight>
            )}
          </View>
        </ScrollView>
        
        
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 30
  },
  vids: {
    paddingBottom: 3,
    width: wid*.95,
    alignItems: 'center',
    backgroundColor: '#000',
    justifyContent: 'center',
    borderBottomWidth: 0.6,
    borderColor: '#aaa'
  },
  vidItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 0
  },
  vidText: {
    padding: 20,
    width: wid*.8,
    color: '#fff',
    alignItems: 'flex-start'
  },
  tabBar: {
    backgroundColor: '#fff',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
    borderColor: '#bbb'
  },
  tabItems: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2
  },
  tabTitle: {
    fontSize: 11,
    color: '#333',
    paddingTop: 4,
  }
});

export default screens = StackNavigator({
  Home: {screen: App},
  YouTubeVideo: { screen: YouTubeVideo}
})


