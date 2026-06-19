import axios from "axios";

const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.1-8b-instant';

const SYSTEM_PROMPT = `
You are Viva, a helpful AI assistant for the Viva e-commerce app. Your role is to help users with product-related questions, purchase guidance, and shopping decisions.

Guidelines:
- Explain products clearly and concisely
- Help users decide whether to buy a product based on their needs, budget, and use case
- Provide purchase guidance when asked
- Compare products using structured bullet points when requested
- Keep responses under 5–7 lines unless the user explicitly asks for details
- Be polite, professional, and helpful
- Answer in the same language the user wrote in
- Do not invent product specifications; if information is missing, clearly say so
- Maintain a neutral, shopping-focused tone (not casual conversation)
`;

interface GroqResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
        index: number;
        message: {
            role: string;
            content: string;
        };
        finish_reason: string;
    }[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

interface GroqError {
    error: string;
}

const FetchChat = async (chatMessage: string): Promise<{ content: string } | GroqError | null> => {
    if (!GROQ_API_KEY) {
        console.error('Groq API key is not set. Please set EXPO_PUBLIC_GROQ_API_KEY in your environment variables.');
        return { error: 'AI service not configured. Please contact the administrator.' };
    }

    try {
        const response = await axios.post<GroqResponse>(
            GROQ_API_URL,
            {
                model: MODEL,
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: chatMessage }
                ],
                max_tokens: 1024,
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                timeout: 30000,
            }
        );

        const content = response.data.choices?.[0]?.message?.content;
        if (!content) {
            return { error: 'Empty response from AI service.' };
        }

        return { content };
    } catch (error: any) {
        console.error('Error fetching chat:', error);

        if (error.response) {
            const status = error.response.status;
            if (status === 429) {
                return { error: 'Rate limit exceeded. Please try again later.' };
            } else if (status === 400) {
                return { error: 'Bad request. Please check your input.' };
            } else if (status === 401 || status === 403) {
                return { error: 'Authentication error. Please check API configuration.' };
            } else if (status >= 500) {
                return { error: 'AI service error. Please try again later.' };
            }
        } else if (error.request) {
            return { error: 'Network error. Please check your connection.' };
        }

        return { error: 'Failed to fetch response. Please try again.' };
    }
};

export default FetchChat;
