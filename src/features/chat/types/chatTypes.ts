// Type for each text part inside contents
type Part = {
    text: string;
};

// Type for each content block (user or system)
type Content = {
    parts: Part[];
};

// Type for candidates returned by the API
type Candidate = {
    content: {
        parts: Part[];
    };
};

// Full response type from Gemini API
export type GeminiResponse = {
    candidates: Candidate[];
    metadata?: {
        model?: string;
        inputTokens?: number;
        outputTokens?: number;
    };
};
