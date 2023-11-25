import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";

export const handler = async (event) => {

	const done = (statusCode, body) => {
		return {
			statusCode,
			body: JSON.stringify(body) // body must be string
		};
	}

	try {
		// AWS SDK v3 example
		const stsClient = new STSClient({ region: 'us-east-1' });
		const stsCommand = new GetCallerIdentityCommand({});
		const stsResponse = await stsClient.send(stsCommand);
		console.log("🚀 ~ file: index.mjs:9 ~ handler ~ stsResponse:", stsResponse)

		// NodeJS 20 native support for fetch API - POKEAPI example
		const pokeResponse = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
		const ditto = await pokeResponse.json();
		console.log("🚀 ~ file: index.mjs:14 ~ handler ~ ditto:", ditto)

		// Return all examples in response
		const res = {
			message: 'AWS Lambda CI/CD with Github Actions',
			event,
			awsSdk: stsResponse,
			pokeApi: ditto
		}

		return done(200, res)

	} catch (error) {
		console.error("🚀 ~ file: index.mjs:27 ~ handler ~ error", error)
		return done(500, error)
	}

};