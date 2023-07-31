import LeftHeader from "@/components/Header/LeftHeader";
import SearchHeader from "@/components/Header/SearchHeader";
import { Stack, useRouter } from "expo-router";

const SearchNavigation = () => {
  const router = useRouter()
  return (
    <Stack>
      <Stack.Screen name="index" options={{
          header: () => <SearchHeader />,
        }} />
        <Stack.Screen name="[detail]" options={{
          header: () => <LeftHeader handle={() => router.replace('/search')} />,
          animation: 'slide_from_right'
        }} />
    </Stack>
  );
};

export default SearchNavigation