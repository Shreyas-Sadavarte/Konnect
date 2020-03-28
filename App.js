import React, { Component,useState,useEffect } from 'react';
import { View, TextInput,StyleSheet,Button, } from 'react-native';
import Sound from 'react-native-sound';
import YTSearch from 'youtube-api-search';
import io from 'socket.io-client';
// import { TextInput } from 'react-native';

  let socket = io("https://konnectapi.herokuapp.com/");
    socket.username = "Shreyas";


export default function App() {
  
  const [message, setMessage] = useState('');
  const API_KEY = 'AIzaSyChIABzSatyztW9lbU1O4fYXPT3vchtGto';
  var link;
  var track = null;
  const PressSearch =term => {
    searchYT(term);
  }
  const searchYT = term => {
    YTSearch({key: API_KEY,term},videos=>{
      console.log(videos[0].id.videoId);
      link = videos[0].id.videoId;
    //   track = "http://konnectapi.herokuapp.com/streaming/stream?URL=https://www.youtube.com/watch?v="+link;
    //   track = new Sound(track);
    });
  }

  const [ term ,setTerm ] = useState("");

  const onSetTextHandler =value => {
    setTerm(value);
  }

  const [val1,setVal] = useState({});
  
  useEffect(() => {
    socket.on('sync-sound', (data) => {

        console.log(data.timestamp + ' ' + data.videoid);
        track = new Sound("http://konnectapi.herokuapp.com/streaming/stream?URL=https://www.youtube.com/watch?v="+data.videoid, null, (e) => {
          if (e) {
            console.log(e);
          } else {
            console.log('song loaded');
            socket.emit('audio-status',{'username':socket.username,'status':'1','timestamp':new Date()});
            console.log("Emmited");          }
        });
        setVal(track);
});
},[track]);

  useEffect(() =>{
    socket.on('play-status',(data)=>{
      if(data.play == 1){
        console.log("Hogaya na Bho ");
        playTrack();
      }
    })
  },[track]);

  // const [loadedStatusServer,setloadedStatusServer] = useState(0);

  //   useEffect(()=>{
  //       console.log("loaded successfully");
  //       if(val1._loaded)
  //       {
  //           console.log("loaded successfully");
  //           let loadedStatusServer;
  //           //  socket.emit('audio-status',{loaded:-1});
  //           socket.on('audio-status',(data)=>{
  //               console.log("whatsup")
  //               if(data==undefined){
  //                   console.log("ABCD");
  //                   socket.emit('audio-status',{'loaded':'0'});
  //                   loadedStatusServer = 0;
  //               }else{
  //                   console.log("XYZZ"+" "+parseInt(data.loaded));
  //                  loadedStatusServer =  parseInt( data.loaded );
  //                   if(loadedStatusServer==1){
  //                     console.log("whatsssssssssssss");
  //                     socket.broadcast.emit('audio-status',{loaded : parseInt(loadedStatusServer)+1 })
  //                 }
  //                 else if(loadedStatusServer==2){
  //                     console.log("whatsssssssssssss");
  //                     socket.emit('play-sound',{ 'play':'1' })
  //                 }
                
  //               }
        
  //           });
        
            
        
  //       }
  //   });

    
    // let [loadedStatusServer,setloadedStatusServer] = useState(0);
    
   

   


  // const track = new Sound("http://konnectapi.herokuapp.com/streaming/stream?URL=https://www.youtube.com/watch?v=kJQP7kiw5Fk");
  playTrack = () => {
        val1.play();
        console.log(val1);
  }


  useEffect(()=>{
    console.log("done?");
    socket.on('pause-play-status',(data)=>{
      if(data.pause ==1 ){
        console.log("Pause Track");
        realPause();
        return;
      }else if (data.pause == 0){
        console.log("Resume Track");
        playTrack();
        return;
      }
    })
  },[]);
  

  pauseTrack =() =>{
    if(val1._playing){
    socket.emit( 'pause-play-status',{ 'username':socket.username,'timestamp':new Date(),'pause':'1' } );
    }else if(!val1._playing){
      socket.emit( 'pause-play-status',{ 'username':socket.username,'timestamp':new Date(),'pause':'0' } )
    }
  }


  realPause =() =>{
    val1.pause();
  }
  seekTrack = () =>{
  val1.setCurrentTime(30);
  }

  return( 
  
  <View>
      <View>
            <TextInput autoCorrect = {false}
                onChangeText = {chatMessage => {
                    setMessage: chatMessage
                }}
            />
        </View>

    <View style = { styles.containerStyle }>
      <TextInput style= { styles.searchTextStyle }  onChangeText = { onSetTextHandler }/>
      <Button  title = "Search "onPress={ PressSearch.bind(this,term) }/>

    </View>
    <Button title="play me" onPress= { playTrack } />
    <Button title="pause / Play" onPress={ pauseTrack } />
    <Button title="seek me" onPress={ seekTrack } />
    <Button title ="undefined" onPress={()=>{socket.emit( 'sync-sound', {'videoid': link ,'timestamp':new Date()} )} } />
  </View>
  );
} 


const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    marginTop: 75,
    marginLeft:10,
    marginRight:10
  },
  searchTextStyle: {
    flex:1, 
  }
}); 

// import React, {useEffect, useState,Component} from 'react';
// import {View, Text, Button,StyleSheet} from 'react-native';
// import io from 'socket.io-client';
// import { TextInput } from 'react-native';
// import { useImmer } from 'use-immer';
// const socket = io("https://konnectapi.herokuapp.com/");
// import YTSearch from 'youtube-api-search';
// import Sound from 'react-native-sound';

// const App = props => {

    
//     // const [message1, setMessage] = useState('');

//     // let socket;
//     // useEffect(() => {
//     //     socket = io("https://konnectapi.herokuapp.com/");
//     //     socket.emit();
//     // })


//   const API_KEY = 'AIzaSyChIABzSatyztW9lbU1O4fYXPT3vchtGto';
//   var link;
//   var track = null;
//   const PressSearch =term => {
//     searchYT(term);
//   }
//   const playTrack1 = () => {
//     const track = new Sound("http://konnectapi.herokuapp.com/streaming/stream?URL=https://www.youtube.com/watch?v=csqBMqvW17Y" , null, (e) => {
//       if (e) {
//         console.log('error loading track:', e)
//       } else {
//         track.play()
//       }
//     })
//   }

//   const searchYT = term => {
//     YTSearch({key: API_KEY,term},videos=>{
//       console.log(videos[0].id.videoId);
//       link = videos[0].id.videoId
//       track = "http://konnectapi.herokuapp.com/streaming/stream?URL=https://www.youtube.com/watch?v="+link;
//       track = new Sound(track);
//     });
//   }

//   const [ term ,setTerm ] = useState("");

//   const onSetTextHandler =value => {
//     setTerm(value);
//   }

//   // const track = new Sound("http://konnectapi.herokuapp.com/streaming/stream?URL=https://www.youtube.com/watch?v=kJQP7kiw5Fk");
//  const playTrack = () => {
//     track.play();
//   }
  
//   pauseTrack =() =>{
//     track.pause();
//   }
//   seekTrack = () =>{
//   track.setCurrentTime(30);
//   }
    

//     const [message, setMessage] = useState('');
//     const [clientmsg , setclientmsg ] = useImmer([]);
//     let msgObj = {msg:message, user:'Shreyas'};
//     const val = 1;

//     useEffect(() => {
        
//         socket.on('chat-msg', (data) =>
//         { console.log(data.msg + ' ' + data.user);
//         setclientmsg(draft => {
//             draft.push([data.msg])
//           })
//     });
        
//     }, [val])

//     const submitText = () => {
//         socket.emit('chat-msg', msgObj);
//         setMessage('');
//     }

//     return(
//         <View>
//             <View style = { styles.containerStyle }>
//       <TextInput style= { styles.searchTextStyle }  onChangeText = { onSetTextHandler }/>
//       <Button  title = "Search "onPress={ PressSearch.bind(this,term) }/>

//     </View>
//     <Button title="play me" onPress= { playTrack } />
//     <Button title="pause me" onPress={ pauseTrack } />
//     <Button title="seek me" onPress={ seekTrack } />

            
//         <View>
//             <TextInput  autoCorrect = {false}
//                 onChangeText = {chatMessage => {
//                     setMessage(chatMessage);
//                 }}
//                 value = {message}
//                 onSubmitEditing = {() => submitText()}
//                 placeholder = "Write Here"
//                 style = {{borderColor:'black', borderWidth:1}}
//             />
            
//         </View>
//         <View>        
        
//         {clientmsg.map(chat =>< Text style={{borderWidth:1 ,top:500}}>{chat}</Text>)}
        
//         </View>

//         </View>
//     );
//             }

//             const styles = StyleSheet.create({
//                 containerStyle: {
//                   flexDirection: 'row',
//                   marginTop: 75,
//                   marginLeft:10,
//                   marginRight:10
//                 },
//                 searchTextStyle: {
//                   flex:1, 
//                 }
//               }); 
// export default App;


// import React, {useEffect, useState} from 'react';
// import {View, Text, TextInput, StyleSheet, Dimensions, Button} from 'react-native';
// import io from 'socket.io-client';
// import { useImmer } from 'use-immer';
// import Sound from 'react-native-sound';

// const socket = io("https://konnectapi.herokuapp.com/");
// const wd = Dimensions.get('window').width;
// const ht = Dimensions.get('window').height;

// const App = props => {
//     const [message, setMessage] = useState('');
//     const [allChats, setAllChats] = useImmer([])
//     let msgObj = {msg:message, user:'Karan'};
//     const val = 1;

//     const playTrack = () => {
//         const track = new Sound("http://konnectapi.herokuapp.com/streaming/stream?URL=https://www.youtube.com/watch?v=khPLWaBioOs" , null, (e) => {
//           if (e) {
//             console.log('error loading track:', e)
//           } else {
//             track.play()
//           }
//         })
//       }

//     const recieveMessage = () => {
//         socket.on('chat-msg' , data => {
//             playTrack();
//             console.log(data.msg + ' ' + data.user);
//             setAllChats(draft => {
//                 draft.push(data.msg);
//             })
//         })
//     }

//     useEffect(() => {
//         recieveMessage();
//     }, [val])

//     const submitText = () => {
//         socket.emit('chat-msg', msgObj);
//         setMessage('');
//     }

//     return(
//         <View> 
//             <View>
//             <TextInput autoCorrect = {false}
//                 onChangeText = {chatMessage => {
//                     setMessage(chatMessage);
//                 }}
//                 value = {message}
//                 onSubmitEditing = {() => submitText()}
//                 placeholder = "Write Here"
//                 style = {{borderColor:'black', borderWidth:1}}
//             />
//             <Button title="play me" onPress={ playTrack }/>
//             </View>
//             <View style = {{backgroundColor: '#B5D3E7',height:ht}}>
//                 {allChats.map(chat => <Text style = {styles.chatContainer}>{chat}</Text>)}
//             </View>
//         </View>
//     );
//             }



// // let styles = StyleSheet.create({
// //     chatContainer: {
// //         borderRadius: 25,
// //         borderColor: 'black',
// //         borderWidth:1,
// //         padding: 10,
// //         backgroundColor: '#ccc',
// //         width: wd/2,
// //         marginTop:10

// //     },
// // })

// // export default App;

