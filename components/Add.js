import { useContext, useState } from "react";
import { Keyboard, View } from 'react-native';
import { Calendar } from "react-native-calendars";
import { Button, Dialog, FAB, Modal, PaperProvider, Portal, SegmentedButtons, Text, TextInput } from 'react-native-paper';
import { UnitContext, WorkoutContext } from "../contexts/Context";
import styles from "../style/style";
import { myTheme } from "../style/theme";


export default Add = () => {

    const [sport, setSport] = useState("");
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [date, setDate] = useState("");
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogContent, setDialogContent] = useState("");

    const {workouts, setWorkouts} = useContext(WorkoutContext);
    const {unit} = useContext(UnitContext);

    const dateSelected = (day) => {
        const selectedDate = new Date(day.dateString);

        const formattedDate = selectedDate.toLocaleDateString();
        setDate(formattedDate);
        setCalendarVisible(false);
    };

    const addWorkout = () => {
        if (sport === "") {
            setDialogContent("Please select the type of sport");
            setDialogVisible(true);
        } else if (distance === "") {
            setDialogContent("Please enter the distance");
            setDialogVisible(true);
        } else if (distance <= 0) {
            setDialogContent("You can't enter a negative or zero distance");
            setDialogVisible(true);
        } else if (duration === "") {
            setDialogContent("Please enter the duration");
            setDialogVisible(true);
        } else if (duration <= 0) {
            setDialogContent("You can't enter a negative or zero duration");
            setDialogVisible(true);
        } else if (date === "") {
            setDialogContent("Please select a date");
            setDialogVisible(true);
        } else {
            let distanceToAdd = distance;

            if (unit === "miles") {
                distanceToAdd = parseFloat((distance * 1.609).toFixed(2)); 
            } 

            let newWorkout = {
                sport,
                distance: distanceToAdd,
                duration,
                date
            }

            setWorkouts([...workouts, newWorkout]);
            Keyboard.dismiss();
            setSport("");
            setDistance("");
            setDuration("");
            setDate("");
            setDialogContent("Workout successfully added to the workout list");
            setDialogVisible(true);
        }
    }


    
    return(
        <PaperProvider theme={myTheme}>
            <View style={styles.container}>
                <Portal>
                    <Modal visible={calendarVisible}>
                        <Calendar onDayPress={dateSelected}/>
                    </Modal>
                </Portal>
                <Text style={styles.titles} variant="headlineMedium">Add workout</Text>
                <SegmentedButtons
                    style={styles.segmentedButtons} 
                    value={sport}
                    onValueChange={setSport}
                    buttons={[
                        {
                            value: "run",
                            label: "Run",
                            icon: "run-fast"
                        },
                        {
                            value: "swim",
                            label: "Swim",
                            icon: "swim"
                        },
                        {
                            value: "ski",
                            label: "Ski",
                            icon: "ski"
                        }
                    ]}
                />
                <TextInput
                    style={styles.input} 
                    label={"Distance ("+ unit + ")"} 
                    value={distance}
                    onChangeText={distance => setDistance(distance)}
                    mode="outlined"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}  
                    label="Duration (min)" 
                    value={duration}
                    onChangeText={duration => setDuration(duration)}
                    mode="outlined"
                    keyboardType="numeric"
                />
                <FAB
                icon="calendar-month"
                label={date ? date : "Select a date"}
                style={styles.calendarFAB}
                onPress={() => setCalendarVisible(true)}
                />
                <Button style={styles.button} mode="contained" onPress={addWorkout}>
                    Add workout
                </Button>
            </View>
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                    <Dialog.Content>
                        <Text variant="bodyLarge">{dialogContent}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDialogVisible(false)}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </PaperProvider>
    )
}