import React from 'react'
import { Text, StyleSheet, View, Dimensions, Linking, ScrollView, TouchableHighlight, TouchableOpacity, Image} from 'react-native'
import {StackNavigator} from 'react-navigation'
import YouTube from 'react-native-youtube'
import HyperlinkedText from 'react-native-hyperlinked-text'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'


const wid = Dimensions.get('window').width
const apiKey = 'AIzaSyCqmf7AceiC6zADq2SbuzyTZ-6qg44NFzI';

export default class YouTubeVideo extends React.Component{
	static navigactionOptions = {
		headerTitle: 'YouTube',
		headerStyle: {
			backgroundColor: '#fff'
		},
		headerTitleStyle: {
			color: '#000'
		}
	}

	constructor(props){
		super(props)
		this.state={
			data : []
		}
	}

	componentDidMount(){
		fetch(`https://www.googleapis.com/youtube/v3/search/?key=${apiKey}&part=snippet&type=video&relatedToVideoId=${this.props.navigation.state.params.youtubeId}&maxResults=10`)
		.then(res=>res.json())
		.then(res=>{
			const vid=[]
			res.items.forEach(item=>{
				vid.push(item)
			})
			this.setState({
				data: vid
			})
		})
		.catch(error=>{
			console.log(error)
		})
	}

	render(){
		const {navigate}=this.props.navigation
		return (
			<View style={styles.container}>
				<ScrollView>
				<Text style={{ width: wid, height: 60, color: '#000', padding: 5, fontSize: 18 }}>
					{this.props.navigation.state.params.title}
				</Text>
				<YouTube
					videoId={this.props.navigation.state.params.youtubeId}
					play={true}
					fullscreen={false}
					loop={true}
					apiKey={'AIzaSyCqmf7AceiC6zADq2SbuzyTZ-6qg44NFzI'}
					onReady={e => this.setState({isReady: true})}
					onChangeState={e => this.setState({status: e.state})}
					onChangeQuality={e => this.setState({quality: e.quality})}
					onError={e => this.setState({error: e.error})}
					style={{alignSelf: 'stretch', height: 300}}
				/>
				<Text style={{ width: wid, height: 33, color: '#f00', padding: 5, fontSize: 18 }}>
					Description
				</Text>
				<HyperlinkedText style={styles.entry}>
					{this.props.navigation.state.params.description}
				</HyperlinkedText>
				<ScrollView>
		          <View style={styles.vidlist}>
		            {this.state.data.map((item, i) => 
		            <TouchableHighlight 
		              key={item.id.vid} 
		              onPress={() => navigate('YouTubeVideo', {youtubeId: item.id.videoId, title: item.snippet.title, description: item.snippet.description})}>
		              {/* onPress={() => this.props.navigation.navigate('YoutubeVideo', {youtubeId: item.id.videoId})}> */}
		              <View style={styles.vids}>
		                <Image 
		                  source={{uri: item.snippet.thumbnails.default.url}} 
		                  style={{width: 50, height: 50}}/>
		                <View style={styles.vidItems}>
		                  <Text style={styles.vidText}>{item.snippet.title}</Text>
		                  <Icon name='more-vert' size={20} color='#555'/> 
		                </View>
		              </View>
		            </TouchableHighlight>
		            )}
		          </View>
		        </ScrollView>
		        </ScrollView>

			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: '#faf0e6',
		padding: 1 
	},
	entry: {
		color: '#333333',
		marginTop: 5,
		alignItems: 'flex-start',
		textAlign: 'left', 
		padding: 5,
		width: wid
	},
	vidlist: {
		flex: 1,
		backgroundColor: '#000',
		alignItems: 'center'
	},
	vids: {
		flexDirection: 'row',
		
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
  }
})

