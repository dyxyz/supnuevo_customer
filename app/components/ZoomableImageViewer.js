/**
 * ZoomableImageViewer.js
 * 可放大缩小的轮播图列表
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Image, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, ViewPropTypes, ScrollView } from 'react-native';
import colors from '../resources/colors'
import ImageViewer from 'react-native-image-zoom-viewer';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../utils/tools"

export default class ZoomableImageViewer extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state={
      zoomableImageVisible:false,
      selectedImgIndex:0,
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
            onPress={()=>this._onPressImage(idx)}>
          <Image
              resizeMode="contain"
              style={[styles.pictureItemView, imageHeight? {height:imageHeight}:{}, imageWidth? {width:imageWidth}:{}]}
              source={url == null?require('../assets/img/img_logo.png'):{uri:url}}/>
        </TouchableOpacity>
    );
  }

  _onPressImage = (idx) => this.setState({ zoomableImageVisible: true ,selectedImgIndex: idx})

  _transformImageViewer = (imgurls) => {
    let imgviewer = [];
    if(imgurls && imgurls.length>0)
      for(var i=0;i<imgurls.length;i++)
      imgviewer.push({url:imgurls[i],props:{}});
    return imgviewer;
  }

  render() {
    const { imgurls ,viewerHeight } = this.props;
    const imgviewer = this._transformImageViewer(imgurls);

    return (
        imgurls && imgurls.length>0?
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
          <Modal
              key={1}
              visible={this.state.zoomableImageVisible}
              transparent={true}
              onRequestClose={() => this.setState({ zoomableImageVisible: false })}
          >
            <ImageViewer
                imageUrls={imgviewer}
                index={this.state.selectedImgIndex}
                enableSwipeDown={true}
                enableImageZoom={true} // 是否开启手势缩放
                onSwipeDown={() => {
                  this.setState({zoomableImageVisible:false})
                }}
                onClick={()=>{
                  this.setState({zoomableImageVisible:false})
                }}
            />
          </Modal>
        ]:null
    );
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
