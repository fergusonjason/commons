import React, {Component} from "react";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {withNavigation} from "react-navigation";

// TODO: Import only the functions I'm actually using
import _ from "lodash";

/**
 * Reuseable component to render a button that will navigator to a new
 * screen
 * 
 * @author Jason
 */
class MenuNavigationButton extends Component {

    /**
     * @constructor
     * @param {object} props - properties passed to component
     */
    constructor(props) {
        super(props);
        if (_.isNil(this.props.navigation)) {
            console.warn("No StackNavigator passed to component");
        }

    }


    /**
     * Event handler to handle button press event
     */
    _clkOnPress = () => {
        if (typeof this.props.navigation === "undefined") {
            console.log("Navigation undefined");
        }

        if (typeof this.props.target === "undefined") {
            console.log("Navigation target undefined");
        }

        this.props.navigation.navigate(this.props.target);

    }



    /**
     * Render component
     */
    render() {
        return (
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this._clkOnPress}>
                <Text style={styles.textStyle}>{this.props.label}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
      fontSize:20,
      color: '#ffffff',
      textAlign: 'center'
    },
    
    buttonStyle: {
      padding:10,
      backgroundColor: '#202646',
      borderRadius:5,
      marginVertical: 20,
      marginHorizontal: 20
    }
  });

  export default withNavigation(MenuNavigationButton);
