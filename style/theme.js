import { MD3LightTheme } from "react-native-paper";

const myTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: "#599fb2",
        primaryContainer: "#cfe3e9",
        secondaryContainer: "#cfe3e9",
        onPrimaryContainer: "#030506",
        surfaceVariant: "#dee7ea",
        background: "#f2f5f5",
        elevation: {
            ...MD3LightTheme.colors.elevation,
            level3: "#d7dcdd"
        },
        headerBackground: "#145f74",
        tabBarBackground: "#a3bfc7",
        tabBarActive: "#0b323c",
        tabBarInactive: "#4b717a",
        headerNavigation: "#f0f2f3"


    }
}

export {myTheme};