import { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Avatar, Card, FAB, PaperProvider, Text } from "react-native-paper";
import { UnitContext, WorkoutContext } from "../contexts/Context";
import styles from "../style/style";
import { myTheme } from "../style/theme";


export default Workoutlist = () => {

    const { workouts } = useContext(WorkoutContext);
    const { unit } = useContext(UnitContext);

    const [runningDistance, setRunningDistance] = useState(0);
    const [swimmingDistance, setSwimmingDistance] = useState(0);
    const [skiingDistance, setSkiingDistance] = useState(0);



    useEffect(() => {
        setRunningDistance(0);
        setSwimmingDistance(0);
        setSkiingDistance(0);

        workouts.forEach((workout) => {
            let distanceToAdd = workout.distance; 

            if (unit === "miles") {
                distanceToAdd /= 1.609; 
            }

            switch (workout.sport) {
                case "run":
                    setRunningDistance((prevDistance) => prevDistance + parseFloat(distanceToAdd));
                    break;
                case "swim":
                    setSwimmingDistance((prevDistance) => prevDistance + parseFloat(distanceToAdd));
                    break;
                case "ski":
                    setSkiingDistance((prevDistance) => prevDistance + parseFloat(distanceToAdd));
                    break;
                default:
                    break;
            }
        });
    }, [workouts, unit]);

    const getSportIcon = (sport) => {
        switch (sport) {
            case "run":
                return "run-fast";
            case "swim":
                return "swim";
            case "ski":
                return "ski";
        }
    }

    return(
        <PaperProvider theme={myTheme}>
            <View style={styles.container}>
                <Text style={styles.titles} variant="headlineMedium">List of workouts</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                    <FAB
                        icon="run-fast"
                        label={`${runningDistance.toFixed(2)} ${unit === "km" ? "km" : "mi"}`}
                        style={styles.workoutFAB}
                    />
                    <FAB
                        icon="swim"
                        label={`${swimmingDistance.toFixed(2)} ${unit === "km" ? "km" : "mi"}`}
                        style={styles.workoutFAB}
                    />
                    <FAB
                        icon="ski"
                        label={`${skiingDistance.toFixed(2)} ${unit === "km" ? "km" : "mi"}`}
                        style={styles.workoutFAB}
                    />
                </View>
                <ScrollView>
                    {workouts.map((workout, index) => (
                        <Card mode="contained" key={index} style={styles.cards}>
                            <Card.Title 
                                title={workout.date} 
                                left={(props) => (<Avatar.Icon {...props} icon={getSportIcon(workout.sport)} />)}
                            />
                            {
                                unit === "km" ?
                                <Card.Content>
                                    <Text>Distance: {workout.distance} km</Text>
                                    <Text>Duration: {workout.duration} min</Text>
                                </Card.Content>
                                :
                                <Card.Content>
                                    <Text>Duration: {workout.duration} min</Text>
                                    <Text>Distance: {(workout.distance / 1.609).toFixed(2)} miles</Text>
                                </Card.Content>
                            }
                        </Card>
                    ))}
                    
                </ScrollView>
            </View>
        </PaperProvider>
    )
}