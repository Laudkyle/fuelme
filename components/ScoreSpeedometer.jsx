import {
    View,
    Text,
    Dimensions,
} from "react-native";
import React from "react";
import Svg, { Path, Circle, G, Text as SvgText, LinearGradient, Stop, Defs } from "react-native-svg";

const { width } = Dimensions.get("window");

const ScoreSpeedometer = ({ score = 50, maxScore = 180 }) => {
    const size = width - 40;
    const strokeWidth = size * 0.07; // Adjust thickness relative to size
    const radius = (size - strokeWidth) / 2;
    const circumference = Math.PI * radius;

    const limitedScore = Math.min(Math.max(score, 0), maxScore);
    const percentage = limitedScore / maxScore;
    const angle = 180 * percentage;
    const strokeDashoffset = circumference - (circumference * percentage);

    const getScoreColor = () => {
        if (percentage < 0.2) return "#FF4D4D"; // Red (Poor)
        if (percentage < 0.5) return "#FFB800"; // Yellow/Orange (Average)
        if (percentage < 0.8) return "#00C853"; // Green (Good)
        return "#4A6CFF"; // Blue (Excellent)
    };

    const getScoreText = () => {
        if (percentage < 0.2) return "Poor";
        if (percentage < 0.5) return "Average";
        if (percentage < 0.8) return "Good";
        return "Excellent";
    };

    return (
        <View className="items-center rounded-lg p-6 bg-white mt-2">
            <View className="items-center">
                <View className="relative items-center">
                    <Svg width={size} height={size / 1.8} viewBox={`0 0 ${size} ${size / 1.8}`}>
                        {/* Background arc */}
                        <Path
                            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
                            stroke="#E0E0E0"
                            strokeWidth={strokeWidth}
                            fill="transparent"
                            strokeLinecap="round"
                        />

                        <Defs>
                            <LinearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="0">
                                <Stop offset="0" stopColor="#FF4D4D" />
                                <Stop offset="0.3" stopColor="#FFB800" />
                                <Stop offset="0.6" stopColor="#00C853" />
                                <Stop offset="1" stopColor="#4A6CFF" />
                            </LinearGradient>
                        </Defs>

                        {/* Progress arc */}
                        <Path
                            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
                            stroke="url(#scoreGradient)"
                            strokeWidth={strokeWidth}
                            fill="transparent"
                            strokeDasharray={`${circumference} ${circumference}`}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                        />

                        {/* Indicator triangle */}
                        <G rotation={angle - 90} origin={`${size / 2}, ${size / 2}`}>
                            <Path
                                d={`M ${size / 2} ${size / 2 - radius - 15} L ${size / 2 - 10} ${size / 2 - radius + 10} L ${size / 2 + 10} ${size / 2 - radius + 10} Z`}
                                fill={getScoreColor()}
                            />
                        </G>

                        {/* Ticks for reference */}
                        {[0, 25, 50, 75, 100].map((tick, index) => {
                            const tickAngle = (180 * tick) / 100 - 90;
                            const tickX = size / 2 + (radius - strokeWidth) * Math.cos(tickAngle * Math.PI / 180);
                            const tickY = size / 2 + (radius - strokeWidth) * Math.sin(tickAngle * Math.PI / 180);

                            return (
                                <G key={index}>
                                    <Circle cx={tickX} cy={tickY} r={3} fill="#888" />
                                    <SvgText
                                        x={tickX}
                                        y={tickY + 15}
                                        fontSize={size * 0.035}
                                        fill="#888"
                                        textAnchor="middle"
                                    >
                                        {Math.round(tick * maxScore / 100)}
                                    </SvgText>
                                </G>
                            );
                        })}
                    </Svg>

                    {/* Score Display - CENTERED PROPERLY */}
                    <View
                        className="absolute items-center justify-center rounded-full border-2 border-gray-200"
                        style={{
                            width: size * 0.3,
                            height: size * 0.3,
                            top: "60%", 
                            left: "55%", 
                            transform: [{ translateX: -(size * 0.15) }, { translateY: -(size * 0.15) }],
                        }}
                    >
                        <Text style={{ color: getScoreColor(), fontSize: size * 0.1 }} className="font-bold">
                            {limitedScore}
                        </Text>
                        <Text style={{ color: getScoreColor(), fontSize: size * 0.05, marginTop: 2 }} className="font-medium">
                            {getScoreText()}
                        </Text>
                    </View>
                    <Text className="text-secondary-100 font-bold text-sm capitalize">up to GHC400.00</Text>

                </View>
            </View>
        </View>
    );
};

export default ScoreSpeedometer;
