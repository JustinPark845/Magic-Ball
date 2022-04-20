import { Text, View, Button, Animated} from 'react-native';
import React, { useEffect, useState, useRef} from 'react';
import styles from '../styles/ball.styles';

export default function Ball (): React.FunctionComponent<{}>{
    interface BodyParameter {
        data : {
            args: [string]
        }
    }
    interface ShakingStyleInput {
        width: number,
        height: number,
        transform: [{ 
            // Type of rotate should be  "loadingAnim.interpolate()", however it is last as
            // any as I do not currently know its typing
            rotate: any,
        }]
    }
    interface FadeInStyleInput {
        backgroundColor: string,
        width: number,
        alignItems: "center" | "flex-start" | "flex-end" | "stretch",
        paddingTop: number,
        paddingBottom: number,
        borderRadius: number,
        opacity: Animated.Value,
    }

    // const [data, setData] = useState<BodyParameter>({data: {args: [""]}}); <-- In case I do want to save the 'success' value
    const [magic8Response, setMagic8Response] = useState<string>('');
    const [firstRender, setFirstRender] = useState<boolean>(true);
    const [waiting, setWaiting] = useState<boolean>(false);
    const loadingAnim = new Animated.Value(0);
    const fadeInAnim = useRef(new Animated.Value(0)).current;
    const magic8BallResponses: string[] = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes - definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy, try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'Dont count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];
    // body parameter for fetch
    const inputDataDelay: BodyParameter = {
        data: {
            args: ["random"]
        }
    }

    // Activates upon change in state "waiting"
    useEffect(() => {
        // Dont activate on first render of the screen
        if (firstRender) {
            setFirstRender(false);
        } else {
            loadingAnimation(waiting);
        }
    }, [waiting]);

    // Start animation if "waiting" === true, stop if "waiting" === false
    function loadingAnimation (isActive: boolean): void {
        if (isActive === true) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(loadingAnim, {toValue: 1, duration: 100, useNativeDriver: true}),
                    Animated.timing(loadingAnim, {toValue: -1, duration: 100, useNativeDriver: true}),
                ]) 
            ).start();
            Animated.timing(fadeInAnim, {toValue: 0, duration: 1000, useNativeDriver: true}).start();
        } else {
            Animated.timing(loadingAnim, {toValue: 0, duration: 0, useNativeDriver: true}).start();
            Animated.timing(fadeInAnim, {toValue: 1, duration: 1000, useNativeDriver: true}).start();
        }
    }

    // Button tapped
    function tapped (): void {
        console.log("tapped");
        // fetch api
        apiFetch();
    }

    const apiFetch = async () => {
        setWaiting(true);
        try {
            const response = await fetch('https://us-east4-recirclable-dev.cloudfunctions.net/call-ping', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputDataDelay)
            });
            // Check HTTP Status
            const json = await response.json();
            if (!response.ok) {
                console.log(response.status);
                throw new Error(`Error status: ${response.status}, Could not find response! Please Shake Again.`);
            }
            // Check success
            if (!json.result.success) {
                console.log('unsuccessful');
                throw new Error(`Error status: success = false. Shake was weak. Please Shake Again.`);
            // save data into useState
            }
            // setData(json);
            console.log('success');
            // Randomly generate an 8ball response
            selectResponse();
        } catch (error) {
            console.error(error);
        }
        setWaiting(false);
    };

    function selectResponse(): void {
        setMagic8Response(magic8BallResponses[Math.floor(Math.random()*magic8BallResponses.length)]);
    }

    // Style script
    const shakingAnimation: ShakingStyleInput = {
        width : 250,
        height: 250,
        transform: [{ 
            rotate: loadingAnim.interpolate({
                inputRange: [-1, 1],
                outputRange: ['-0.1rad', '0.1rad']
            }) 
        }] 
    };
    const fadeInAnimation: FadeInStyleInput  = {
        backgroundColor: 'white',
        width: 250,
        alignItems: 'center',
        paddingTop:0,
        paddingBottom:10,
        borderRadius: 10,
        opacity: fadeInAnim,
    }
        
    return (
        <View style={styles.ball}>
            <View style={styles.activate}>
                <Animated.Image source={require('../../assets/logo.png')} style={shakingAnimation}/>
                <View style={styles.responseContainer}>
                    <Animated.View style={fadeInAnimation}>
                        <Text style={styles.response}>{magic8Response}</Text>
                    </Animated.View>
                </View>
            </View>
            <Button onPress={tapped} disabled={waiting} title="Shake!" color='#005f60'/>
        </View>
    )
}