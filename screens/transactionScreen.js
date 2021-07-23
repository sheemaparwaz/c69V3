import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner"
export default class TransactionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domState: 'normal',
      hasCameraPermissions: null,
      scanned: false,
      scannedData: ""
    }
  }

  getCameraPermissions = async domState => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === 'granted',
      domState: domState,
      scanned: false
    })
  }

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      domState: 'normal',
      scanned: true,
      scannedData: data
    })
  }
  render() {
    const { domState, hasCameraPermissions, scannedData, scanned } = this.state;
    if (domState === "scanner") {
      return(
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        />
      )

    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {hasCameraPermissions ? scannedData : "Request for Camera Permissions"}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.getCameraPermissions('scanner')}>
          <Text style={styles.buttonText}>
            Scan Qr Code
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 30,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
  },
  button: {
    width: "43%",
    height: 55,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#F48D20",
    borderRadius: 15,
  }
});
