/**
 * ImagePickerViewer.js
 * 用于上传图片轮播图列表
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Image, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, ViewPropTypes, ScrollView } from 'react-native';
import colors from '../resources/colors';
import strings from '../resources/strings';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../utils/tools";

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;

const imagePickerOptions = {
  cropperChooseText: strings.ImagePicker_SelectTitle,
  cropperCancelText: strings.cancel,
  chooseFromLibraryButtonTitle: strings.ImagePicker_ChooseFromLibrary,
  takePhotoButtonTitle: strings.ImagePicker_TakePhoto,
  width: 50,
  height: 50,
  cropping: true,
  includeBase64: true,
  compressImageQuality: 0.2,
}

export default class ImagePickerViewer extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state={
      selectedImgIndex:0,
      permissionModalVisible: false,
      imagePickerActionSheet: [imagePickerOptions.cropperCancelText, imagePickerOptions.takePhotoButtonTitle, imagePickerOptions.chooseFromLibraryButtonTitle],
    }
  };

  _renderImageListView(imgurls){
    var imgItems = [];
    if(imgurls == null) return null;
    for(var i=0;i<imgurls.length;i++){
      imgItems.push(this._getImageListViewItem(imgurls[i], i))
    }
    return imgItems;
  }

  _getImageListViewItem(url, idx){

    const { imageHeight ,imageWidth } = this.props;

    return (
        <TouchableOpacity
            key={idx}
            style={styles.pictureItemWrapper}
            onPress={()=>this.actionSheet.show()}>
          <Image
              resizeMode="contain"
              style={[styles.pictureItemView, imageHeight? {height:imageHeight}:{}, imageWidth? {width:imageWidth}:{}]}
              source={url == null?require('../assets/img/img_logo.png'):{uri:url}}/>
        </TouchableOpacity>
    );
  }

  render() {
    const { imgurls ,viewerHeight } = this.props;

    return (
        [
        <View
            key={0}
            style={[styles.container, viewerHeight ? {height: viewerHeight} : {} ]}>
          <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              pagingEnabled={true}
          >
            {this._renderImageListView(imgurls)}
          </ScrollView>
        </View>,
          <ActionSheet
              ref={(o) => { this.actionSheet = o; }}
              cancelButtonIndex={CANCEL_INDEX}
              destructiveButtonIndex={DESTRUCTIVE_INDEX}
              onPress={(data) => {
                switch (data) {
                  case 1:
                    this.pickSingleWithCamera();
                    break;
                  case 2:
                    this.pickSingleWithLibaray();
                    break;
                  default:
                    break;
                }
              }}
              options={this.state.imagePickerActionSheet}
              title={imagePickerOptions.cropperChooseText}
          />
        ]
    );
  }

  pickSingleWithCamera() {
    ImagePicker.openCamera(imagePickerOptions).then((image) => {
      const formData = new FormData();
      const file = { uri: image.path, type: 'multipart/form-data', name: 'image.png' };
      formData.append('file', file);
      //this.props.actions.uploadAvatar({ formData });
    }).catch((e) => {
      if (e === 'Photo library permissions not granted'
          || e === 'Camera permissions not granted'
          || e === "Permissions weren't granted") {
        alert('errorNoPermission')
        //this.openPermissionModal('errorNoPermission');
      } else if (e === 'Camera not available on simulator') {
        alert('errorNoCamOnSimulator')
        //this.openPermissionModal('errorNoCamOnSimulator');
      }
    });
  }

  pickSingleWithLibaray() {
    ImagePicker.openPicker(imagePickerOptions).then((image) => {
      const formData = new FormData();
      const file = { uri: image.path, type: 'multipart/form-data', name: 'image.png' };
      formData.append('file', file);
      //this.props.actions.uploadAvatar({ formData });
    }).catch((e) => {
      if (e === 'Photo library permissions not granted'
          || e === 'Camera permissions not granted'
          || e === "Permissions weren't granted") {
        //this.openPermissionModal('errorNoPermission');
      } else if (e === 'Camera not available on simulator') {
        //this.openPermissionModal('errorNoCamOnSimulator');
      }
    });
  }
}

const styles = StyleSheet.create({
  pictureItemWrapper: {
    flex: 1,
    padding: 10,
  },
  pictureItemView: {
    width: 200,
    height: 100,
    borderWidth: 0.5,
    borderColor: colors.primaryGray
  },
  container: {
    height: 120,
    width: SCREEN_WIDTH,
  }
});
