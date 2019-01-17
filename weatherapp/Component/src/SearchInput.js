import React from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import PropTypes from 'prop-types';

export default class SearchInput extends React.Component {
 /** Text is empty */
  state = {
    text:"",
   
    
  }

  handleChangeText = text => {
    this.setState({text});
    console.log(this.state);
  };


  handleSubmitEditing = () => {
    const {onSubmit} = this.props;
    const {text} = this.state;

    if (!text) return;

    onSubmit(text);
    this.setState({text:''});
    
  }

  
  render() {
    const {placeholder} = this.props;
    const {text} = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          style={styles.textInput}
          clearButtonMode="always"
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
});
