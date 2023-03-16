/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {Text, View, UIManager, Platform, LayoutAnimation} from 'react-native';

import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

import {styleRecorder as styles} from '../Ressources/Styles';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconL from 'react-native-vector-icons/EvilIcons';
import Globals from '../Ressources/Globals';
import * as RNFS from 'react-native-fs';
import {toast_message} from '../Helpers/Utils';
import {TouchableOpacity} from 'react-native-gesture-handler';

class AutioTaper extends Component {
  constructor(props) {
    super(props);
    this.recordedFileUrl = '';
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  state = {
    currentTime: 0.0,
    recording: false,
    paused: false,
    playing: false,
    stoppedRecording: false,
    finished: false,
    audioPath: AudioUtils.DocumentDirectoryPath + '/test.wav',
    hasPermission: undefined,
  };

  prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Medium',
      AudioEncoding: 'wav',
      AudioEncodingBitRate: 32000,
    });
  }
  componentDidMount() {
    AudioRecorder.requestAuthorization().then(isAuthorised => {
      this.setState({hasPermission: isAuthorised});
      if (!isAuthorised) return;
      this.prepareRecordingPath(this.state.audioPath);
      AudioRecorder.onProgress = data => {
        this.setState({currentTime: Math.floor(data.currentTime)});
      };
      AudioRecorder.onFinished = data => {
        this.recordedFileUrl = data.audioFileURL;
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this._finishRecording(
            data.status === 'OK',
            data.audioFileURL,
            data.audioFileSize,
          );
        }
      };
    });
  }
  async _pause() {
    if (!this.state.recording) {
      console.warn("Can't pause, not recording!");
      return;
    }

    try {
      const filePath = await AudioRecorder.pauseRecording();
      this.setState({paused: true});
    } catch (error) {
      console.error(error);
    }
  }
  async _resume() {
    if (!this.state.paused) {
      console.warn("Can't resume, not paused!");
      return;
    }

    try {
      await AudioRecorder.resumeRecording();
      this.setState({paused: false});
    } catch (error) {
      console.error(error);
    }
  }
  async _stop() {
    if (!this.state.recording) {
      console.warn("Can't stop, not recording!");
      return;
    }
    this.setState({
      expanded: true,
      stoppedRecording: true,
      recording: false,
      paused: false,
    });
    try {
      const filePath = await AudioRecorder.stopRecording();
      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
      }
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      return filePath;
    } catch (error) {
      console.error(error);
    }
  }
  async _play() {
    if (this.state.recording) {
      await this._stop();
    }
    this.setState({playing: !this.state.playing});
    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      var sound = new Sound(this.state.audioPath, '', error => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        sound.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
          this.setState({playing: !this.state.playing});
        });
      }, 100);
    }, 100);
  }
  async _record() {
    if (this.state.recording) {
      this.props.err_player('un Enrégistrement déjà en cour');
      return;
    }
    if (!this.state.hasPermission) {
      return;
    }

    await RNFS.writeFile(this.state.audioPath, '', 'utf8');
    if (this.state.stoppedRecording) {
      this.prepareRecordingPath(this.state.audioPath);
    }

    this.setState({recording: true, expanded: false, paused: false});
    try {
      const filePath = await AudioRecorder.startRecording();
    } catch (error) {
      console.error(error);
    }
  }
  _finishRecording(didSucceed, filePath, fileSize) {
    this.setState({finished: didSucceed});
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '90%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              elevation: 10,
              paddingTop: 30,
              paddingBottom: 30,
              marginTop: 20,
            }}>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                padding: 10,
                fontSize: 30,
                color: 'black',
              }}>
              She also engaged actively with various other Catholic
              organisations.
            </Text>
          </View>
        </View>

        <View style={styles.bottom_container}>
          <TouchableOpacity
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              elevation: 5,
              width: 80,
              padding: 6,
            }}
            labelStyle={{color: 'white'}}
            mode="contained"
            onPress={() => {}}>
            <IconL
              name="like"
              size={32}
              color="grey"
              style={{
                transform: [{rotate: '18deg'}],
                marginTop: 5,
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                color: 'black',
              }}>
              oui
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 5,
              width: 70,
              height: 70,
              borderRadius: 70,
            }}
            labelStyle={{color: 'white'}}
            onPress={() => {}}>
            <Icon
              style={{
                marginLeft: 5,
              }}
              name="play"
              size={30}
              color="green"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              elevation: 5,
              width: 80,
              padding: 6,
            }}
            labelStyle={{color: 'white'}}
            mode="contained"
            onPress={() => {}}>
            <IconL
              style={{
                transform: [{rotate: '180deg'}],
                marginTop: 5,
              }}
              name="like"
              size={32}
              color="grey"
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                color: 'black',
              }}>
              Non
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              height: this.state.expanded ? null : 0,
              overflow: 'hidden',
              marginTop: 10,
            }}>
            <Button
              mode="outlined"
              theme={{colors: {primary: '#000'}}}
              onPress={() => {
                this._play();
              }}>
              <Icon
                name={this.state.playing ? 'pause' : 'play'}
                size={30}
                color="#000"
              />
            </Button>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'flex-end',
                justifyContent: 'space-between',
                margin: 10,
              }}>
              <Button
                mode="text"
                theme={{colors: {primary: '#000'}}}
                disabled={this.props.spinner}
                onPress={() => {
                  this.setState({expanded: false});
                  RNFS.unlink(this.state.audioPath);
                }}>
                <Icon name="undo" size={20} color="#000" />
                {Globals.STRINGS.cancel}
              </Button>

              <Button
                onPress={() => {
                  this.props.send_instance(
                    this.state.audioPath,
                    this.recordedFileUrl,
                  );
                }}
                labelStyle={styles.loginButtonLabel}
                disabled={this.props.spinner}
                loading={this.props.spinner}
                mode="contained"
                theme={{colors: {primary: '#fd7e14'}}}>
                <Text style={{color: 'white'}}>
                  <Icon name="check" size={20} color="#fff" />
                  {Globals.STRINGS.validate}
                </Text>
              </Button>
            </View>
          </View>
          <Button
            style={styles.pass_button}
            mode="text"
            theme={{colors: {primary: '#dddddd'}}}
            onPress={async () => {
              if (this.state.recording) {
                await this._stop();
              }
              if (this.props.sectiondata.sentences.length > 0) {
                this.setState({expanded: false});
                if (await RNFS.exists(this.state.audioPath)) {
                  RNFS.unlink(this.state.audioPath);
                }
              } else {
                toast_message('Revenez plus tard pour de nouveaux textes');
              }
              this.props.load_init();
            }}>
            Autre
          </Button>
        </View>
      </View>
    );
  }
}

export default AutioTaper;
