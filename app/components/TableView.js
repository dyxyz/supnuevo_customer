import React from 'react';
import {View, Image, StyleSheet, TextInput, ViewPropTypes, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../resources/colors';
import {SCREEN_HEIGHT} from "../utils/tools";

export default class TableView extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    headerList: PropTypes.array,
    dataList: PropTypes.array,
    renderAux: PropTypes.func || null,
  };

  render() {

    const {title, headerList, dataList} = this.props;

    return (
        <View style={[styles.container,{backgroundColor:colors.baseWhite}]}>
          {this._renderTitle(title)}
          {/*{this._renderHeader(headerList)}*/}
          {this._renderInfoList(dataList)}
          {this.props.renderAux?this.props.renderAux():null}
        </View>
    );
  }

  _renderTitle(title){
    return (
        <View style={styles.titleWrapperStyle}>
        <Text style={styles.titleStyle} allowFontScaling={false}>{title}</Text>
        </View>
    );
  }

  _renderHeader(headerList){
    var headerItemList = [];
    headerList.map((headerItem,i)=>{
      headerItemList.push(
          <View key={i} style={styles.tableItemStyle}><Text style={styles.headerItemTextStyle}>{headerItem}</Text></View>
      )
    });
    return(
      <View style={styles.tableWrapperStyle}>{headerItemList}</View>
    );
  }

    _renderInfoList(dataList){
        if(!dataList || dataList.length<=0) return;
        var dataListView = [];
        dataList.map((dataListItem,i)=>{
            const dataRow = dataListItem;
            var dataRowList = [];
            if(dataRow && dataRow.length>0){

                    dataRowList.push(

                            <View style={{flex:1,padding:6}}>
                                {dataRow.length==4?
                                    <View><Text style={styles.headerItemTextStyle} allowFontScaling={false}>{dataRow[0]}</Text></View>
                                    :
                                    <View><Text style={styles.headerItemTextStyle} allowFontScaling={false}>{dataRow[2]}</Text></View>
                                }
                                {dataRow.length==4?
                                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
                                        <Text style={styles.headerItemTextStyle} allowFontScaling={false}>{dataRow[1]} x {dataRow[2]}</Text>
                                        <Text style={styles.headerItemTextStyle} allowFontScaling={false}>{dataRow[3]}</Text>
                                    </View>
                                    :
                                    <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center',marginTop:8}}>
                                        <Text style={styles.headerItemTextStyle} allowFontScaling={false}>{dataRow[1]}</Text>
                                    </View>
                                }

                            </View>





                    );
                if(i==0){
                    dataListView.push(

                        <View key={i} style={[styles.tableWrapperStyle,{borderTopWidth:1,borderColor:'#888'}]}>{dataRowList}</View>


                    );
                }
                else{
                    dataListView.push(

                        <View key={i} style={styles.tableWrapperStyle}>{dataRowList}</View>


                    );
                }
                }});

        return dataListView;
    }

  // _renderInfoList(dataList){
  //   if(!dataList || dataList.length<=0) return;
  //   var dataListView = [];
  //   dataList.map((dataListItem,i)=>{
  //     const dataRow = dataListItem;
  //     var dataRowList = [];
  //     if(dataRow && dataRow.length>0){
  //       dataRow.map((dataRowItem,i)=>{
  //         dataRowList.push(
  //           <View key={i} style={styles.tableItemStyle}><Text style={styles.headerItemTextStyle} allowFontScaling={false}>{dataRowItem}</Text></View>
  //         );
  //       });
  //       dataListView.push(
  //           <View key={i} style={styles.tableWrapperStyle}>{dataRowList}</View>
  //       );}});
  //
  //   return dataListView;
  // }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  titleWrapperStyle:{
    height:40,
    width:"100%",
    justifyContent: "center",
    alignItems: "center"
  },
  titleStyle:{
    fontSize:16,
  },
  tableWrapperStyle:{
    // height:SCREEN_HEIGHT*0.2,
    width:"100%",
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:10,
    borderBottomWidth:1,
    borderColor:'#888'
  },
  tableItemStyle:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:10
  },
  headerItemTextStyle:{
    fontSize:14,
    color:'#333'
  },
  dataItemTextStyle:{
    fontSize:14,
    color:'#888'
  },

});
