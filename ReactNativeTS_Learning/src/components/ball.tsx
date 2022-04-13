import { Text, View, Button, Image, Animated} from 'react-native';
import React, { useEffect, useState, useRef, FC} from 'react';
import styles from '../styles/ball.styles';

export default function Ball () {
    interface Parameter {
        data : {
            args: [string]
        }
    }
    interface ShakingStyleInput {
        width: number,
        height: number,
        transform: [{ 
            rotate: Animated.Value,
        }]
    }
    interface FadeInStyleInput {
        backgroundColor: string,
        width: number,
        alignItems: string,
        paddingTop: number,
        paddingBottom: number,
        borderRadius: number,
        opacity: Animated.Value
    }

    const loadingAnim = useRef(new Animated.Value(0)).current;
    const fadeInAnim = useRef(new Animated.Value(0)).current;
    const [data, setData] = useState<Parameter>({data: {args: [""]}});
    const [magic8Response, setMagic8Response] = useState<string>('');
    const [waiting, setWaiting] = useState<boolean>(false);

    useEffect(() => {
        loadingAnimation(waiting);
    });

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
            selectResponse();
            Animated.timing(loadingAnim, {toValue: 0, duration: 0, useNativeDriver: true}).start();
            Animated.timing(fadeInAnim, {toValue: 1, duration: 1000, useNativeDriver: true}).start();
        }
    }

    function selectResponse(): void {
        setMagic8Response(magic8BallResponses[Math.floor(Math.random()*magic8BallResponses.length)]);
    }

    function tapped (): void {
        console.log("tapped");
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
            const json = await response.json();
                setData(json);
                setWaiting(false);
        } catch (error) {
            console.error(error);
        }
    };

    const magic8BallResponses: string[] = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes - definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy, try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'Dont count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];
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
        borderRadius: 10,
        opacity: fadeInAnim,
    }
    const inputDataDelay: Parameter = {
        data: {
            args: ["wait"]
        }
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