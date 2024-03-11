import { useContext } from "react";
import { View } from "react-native";
import { PaperProvider, RadioButton, Text } from "react-native-paper";
import { UnitContext } from "../contexts/Context";
import styles from "../style/style";
import { myTheme } from "../style/theme";


export default Settings = () => {

    const {unit, setUnit} = useContext(UnitContext);

    return(
        <PaperProvider theme={myTheme}>
            <View style={styles.container}>
                <Text style={styles.titles} variant="headlineMedium">Units</Text>
                <View style={styles.radioButton}>
                <RadioButton.Group onValueChange={value => setUnit(value)} value={unit}>
                    <RadioButton.Item label="Kilometers" value="km" />
                    <RadioButton.Item label="Miles" value="miles" />
                </RadioButton.Group>
                </View>
            </View>
        </PaperProvider>
    )
}