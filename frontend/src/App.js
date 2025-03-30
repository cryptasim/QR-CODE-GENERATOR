import { useState } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Input,
  Button,
  Image,
  Heading,
  Text,
  useToast,
  Container,
} from "@chakra-ui/react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const generateQRCode = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/generate", {
        url,
      });
      setQrCode(response.data.qrCode);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <ChakraProvider>
      <Container maxW="container.md" py={10}>
        <VStack spacing={6}>
          <Heading>QR Code Generator</Heading>
          <Text>Enter a URL to generate a QR code</Text>
          <Input
            placeholder="Enter URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            colorScheme="blue"
            onClick={generateQRCode}
            isLoading={loading}
            loadingText="Generating"
          >
            Generate QR Code
          </Button>
          {qrCode && (
            <Box boxShadow="md" p={4} borderRadius="md">
              <Image src={qrCode} alt="QR Code" />
            </Box>
          )}
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default App;
