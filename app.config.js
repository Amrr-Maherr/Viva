module.exports = ({ config }) => {
  const envConfig = {
    // Load environment variables for development
    expoPublicGeminiApiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
  };

  return {
    ...config,
    extra: {
      ...config.extra,
      ...envConfig,
    },
  };
};