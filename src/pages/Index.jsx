import React, { useState, useEffect } from "react";

import { Box, Heading, Text, Link, VStack, Spinner } from "@chakra-ui/react";

const Index = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/tag/artificial-intelligence");
        const data = await response.json();
        setArticles(data.items);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <Box maxWidth="800px" margin="0 auto" padding="20px">
      <Heading as="h1" size="xl" textAlign="center" marginBottom="20px">
        AI News from Medium
      </Heading>
      {isLoading ? (
        <Spinner size="xl" thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" margin="0 auto" />
      ) : (
        <VStack spacing={8} align="stretch">
          {articles.map((article) => (
            <Box key={article.guid} borderWidth="1px" borderRadius="lg" padding="20px">
              <Link href={article.link} isExternal>
                <Heading as="h2" size="lg" marginBottom="10px">
                  {article.title}
                </Heading>
              </Link>
              <Text fontSize="md" color="gray.600">
                {article.pubDate}
              </Text>
              <Text marginTop="10px">{article.description}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Index;
