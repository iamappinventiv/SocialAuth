import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, Dimensions} from 'react-native';
import {Settings} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
  User as GoogleUser,
} from '@react-native-google-signin/google-signin';
import {LoginButton, AccessToken} from 'react-native-fbsdk-next';
import Video from 'react-native-video';
import TrackPlayer from 'react-native-track-player';

const track1 = [
  {
    url: require('./src/assets/audio/SoundHelix-Song-1.mp3'),
    title: 'Test',
  },
];

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<GoogleUser | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        '917934707278-d336s8kh3ntusaqf8rnihar459a16n35.apps.googleusercontent.com',
    });

    TrackPlayer.setupPlayer().then(async () => {
      await TrackPlayer.add(track1);
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
      console.log('User Photo URL:', user.user.photo);
    } catch (error) {
      console.log('Error:', error);
      if ((error as any).code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if ((error as any).code === statusCodes.IN_PROGRESS) {
        console.log('Signing in');
      } else if (
        (error as any).code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
      ) {
        console.log('Play services not available or outdated');
      } else {
        console.log('Some other error happened');
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };

  const videoURL = 'https://www.w3schools.com/html/mov_bbb.mp4';
  const screenWidth = Dimensions.get('screen').width;

  const playTrack = async () => {
    await TrackPlayer.play();
  };

  const pauseTrack = async () => {
    await TrackPlayer.pause();
  };

  return (
    <View style={styles.container}>
      {userInfo ? (
        <>
          <Video
            source={{uri: videoURL}}
            style={{width: screenWidth, height: screenWidth / 2}}
            resizeMode="cover"
            controls
            disableFocus
            audioOnly
            currentTime={0}
          />

          <Button title="Sign Out" onPress={signOut} />
          <Button title="Play-Audio" onPress={playTrack} />
          <Button title="Pause-Audio" onPress={pauseTrack} />
        </>
      ) : (
        <>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />
          <LoginButton
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('login has error: ' + result.error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  console.log(data.accessToken.toString());
                });
              }
            }}
            onLogoutFinished={() => console.log('logout.')}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
