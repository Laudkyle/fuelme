import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="Refuel" options={{ title: "Refuel" }} />
    </Stack>
  );
};

export default HomeLayout;
