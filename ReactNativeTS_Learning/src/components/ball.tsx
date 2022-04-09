import { StyleSheet, Text, View, Button, Image, Animated} from 'react-native';
import React, { useState, useRef} from 'react';
import styles from '../styles/ball.styles';
// import { useTransition } from 'react-native-redash';

export default function Ball () {
    interface Parameter {
        data : {
            args: [string]
        }
    }
    interface StyleInput {
        transform: [{ 
            rotate: {
                inputRange: number[],
                outputRange: string[],
            }
        }]
    }

    const shakeAnim = useRef(new Animated.Value(0)).current;
    const [data, setData] = useState([]);
    const [magic8Response, setMagic8Response] = useState('');
    const [waiting, setWaiting] = useState(false);

    function shake (): void {
        console.log("tapped");
        if (waiting === false) {
            setWaiting(true);
            getData();
        }
    }

    function shakeAnimation (isActive: boolean): void {
        if (isActive === true) {
            console.log("start");
            Animated.loop(
                Animated.sequence([
                    Animated.timing(shakeAnim, {toValue: 1, duration: 100, useNativeDriver: true}),
                    Animated.timing(shakeAnim, {toValue: -1, duration: 100, useNativeDriver: true}),
                ]) 
            ).start();
        } else {
            console.log("stop");
            Animated.timing(shakeAnim, {toValue: 0, duration: 0, useNativeDriver: true}).start();
        }
    }

    function revealLoading (): void {
        console.log('loading');
        shakeAnimation(true);
    }

    function hideLoading (): void {
        console.log('done');
        console.log(data);
        shakeAnimation(false);
        setWaiting(false);
        setMagic8Response(magic8BallResponses[Math.floor(Math.random()*magic8BallResponses.length)]);
    }

    const magic8BallResponses: string[] = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes - definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy, try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'Dont count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];
    const animationStyleScale: StyleInput = {
        transform: [{ 
            rotate: shakeAnim.interpolate({
                inputRange: [-1, 1],
                outputRange: ['-0.1rad', '0.1rad']
            }) 
        }] 
    };
    const inputDataDelay: Parameter = {
        data: {
            args: ["wait"]
        }
    }

    const getData = async () => {
        revealLoading();
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
                hideLoading();
        } catch (error) {
            console.error(error);
        }
    };
        
    return (
        <View style={styles.ball}>
            <View style={styles.activate}>
                <Animated.Image source={require('../../assets/logo.png')} style={ animationStyleScale }/>
                <Text style={styles.response}>{magic8Response}</Text>
            </View>
            <Button onPress={shake} title="Shake!" color='#005f60'/>
        </View>
    )
}