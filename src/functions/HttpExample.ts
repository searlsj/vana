import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { TextAnalysisClient, AzureKeyCredential, TextAnalysisClientOptions } from "@azure/ai-language-text";

export async function HttpExample(request: HttpRequest, context: InvocationContext): Promise<any> {
    context.log(`Http function processed request for url "${request.url}"`);

    const endpoint = 'http://localhost:5000';
    const apiKey = '';
    const documents = [
        "I hated the movie. It was so slow!",
        "The movie made it into my top ten favorites.",
        "What a great movie!",
    ];
      
    const options: TextAnalysisClientOptions = {
        allowInsecureConnection: true
    };
    const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey), options);
    
    let results;
    try {
        results = await client.analyze("LanguageDetection", documents);
    } catch (error: any) {
        context.log(error);
    }

    return { body: results || null };
};

app.http('HttpExample', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: HttpExample
});
