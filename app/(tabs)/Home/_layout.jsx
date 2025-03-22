import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home", headerShown:false }} />
      <Stack.Screen name="Refuel" options={{ title: "Refuel", headerShown:false }} />
      <Stack.Screen name="Completed" options={{ title: "Completed", headerShown:false }} />
    </Stack>
  );
};

export default HomeLayout;
