import { Box, Text, View } from "native-base";

export default function Forbidden() {
    return (
        <View w={"100%"} h={500} alignItems="center" justifyContent="center">
            <Box bg="primary.box" w={"100%"} h={"100%"} overflow="hidden"  rounded="lg" padding={3}>
                <Text color="primary" alignSelf="center" mt={25} fontSize="3xl" fontWeight="bold">Access Denied</Text>
                <Text color="primary" alignSelf="center" mt={3} fontSize="xl">You are not authorized to access this page.</Text>
            </Box>
        </View>
    )
}