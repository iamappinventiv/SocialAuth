import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import {Settings} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
  User as GoogleUser,
} from '@react-native-google-signin/google-signin';
import {LoginButton, AccessToken} from 'react-native-fbsdk-next';

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<GoogleUser | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: 'YOUR_IOS_CLIENT_ID',
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
  Settings.setAppID('APP ID');
  Settings.initializeSDK();
  return (
    <View style={styles.container}>
      {userInfo ? (
        <>
          <View>
            <Text>Name: {userInfo.user.name}</Text>
            <Text>Email: {userInfo.user.email}</Text>

            <View>
              {userInfo.user.photo && (
                <Image
                  source={{uri: userInfo.user.photo}}
                  style={{width: 100, height: 100}}
                />
              )}
            </View>
          </View>
          <Button title="Sign Out" onPress={signOut} />
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
