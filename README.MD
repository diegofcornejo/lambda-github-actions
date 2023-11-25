<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email, project_title, project_description
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
![License](https://img.shields.io/github/license/diegofcornejo/lambda-github-actions?style=for-the-badge)
![Build](https://img.shields.io/github/actions/workflow/status/diegofcornejo/lambda-github-actions/main.yml?branch=master&style=for-the-badge)
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- ![Alt](https://repobeats.axiom.co/api/embed/cba41cff11950e90521f7f67990dba6cb3743f6b.svg "Repobeats analytics image") -->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/diegofcornejo/lambda-github-actions">
    <img src="https://miro.medium.com/max/2000/1*bxhEFjJ4J2CI5sfFsuP7fg.jpeg" alt="Logo" width="auto" height="80">
  </a>

  <h3 align="center">Lambda Github Actions</h3>

  <p align="center">
    Deploy AWS lambda functions using CI/CD github actions
    <br />
    <a href="https://github.com/diegofcornejo/lambda-github-actions"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/diegofcornejo/lambda-github-actions">View Demo</a>
    ·
    <a href="https://github.com/diegofcornejo/lambda-github-actions/issues">Report Bug</a>
    ·
    <a href="https://github.com/diegofcornejo/lambda-github-actions/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- GETTING STARTED -->
## Getting Started

Clone the repository or you can use the [template](https://github.com/new?template_name=lambda-github-actions&template_owner=diegofcornejo)

### Prerequisites

* Create github secrets

```sh
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
```

Note: Your credentials must have permissions to deploy lambda functions and create roles.(needed for the first deploy if you don't have a role)
```yml
lambda:CreateFunction
lambda:UpdateFunctionCode
lambda:UpdateFunctionConfiguration
iam:CreateRole
iam:AttachRolePolicy
iam:PassRole
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/diegofcornejo/lambda-github-actions.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```



<!-- USAGE EXAMPLES -->
## Usage
Modify the `lambda.config.json` file with your lambda function configuration
```json
{
    "FunctionName": "lambda-github-actions",
    "Description": "Lambda CI with github actions",
    "Role":"GithubActionsRole",
    "Handler":"index.handler",
    "Runtime":"nodejs20.x",
    "Timeout": 3,
    "MemorySize": 256
}
```

Modify the `index.mjs` file with your lambda function code
```js
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";

export const handler = async (event) => {

	// AWS SDK v3 example
	const stsClient = new STSClient({ region: 'us-east-1' });
	const stsCommand = new GetCallerIdentityCommand({});
	const stsResponse = await stsClient.send(stsCommand);
	console.log("🚀 ~ file: index.mjs:9 ~ handler ~ stsResponse:", stsResponse)

	// NodeJS 20 native support for fetch API - POKEAPI example
	const pokeResponse = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
	const ditto = await pokeResponse.json();
	console.log("🚀 ~ file: index.mjs:14 ~ handler ~ ditto:", ditto)

	const res = {
		message: 'AWS Lambda CI/CD with Github Actions',
		event,
		awsSdk: stsResponse,
		pokeApi: ditto
	}

	const response = {
		statusCode: 200,
		body: JSON.stringify(res)
	};
	return response;
};
```

And finally push your changes to the repository, the github action will deploy your lambda function, you can see the logs in the actions tab.

If you need you can modify the github action workflow file `.github/workflows/main.yml` with your own configuration.

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/diegofcornejo/lambda-github-actions/issues) for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Diego Cornejo - [@diegofcornejo](https://twitter.com/diegofcornejo) - diegof.cornejo@gmail.com

Project Link: [https://github.com/diegofcornejo/lambda-github-actions](https://github.com/diegofcornejo/lambda-github-actions)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* Vercel ncc (@vercel/ncc)
  - `@vercel/ncc` does not work correctly with preinstalled `aws-sdk` package, for example:
	```js
	import { STSClient } from "@aws-sdk/client-sts"
	```
	is treated as a CommonJS module, and try to load using `require`:
	```js
	module.exports = eval("require")("@aws-sdk/client-sts");
	``` 

	To avoid this issue, modify the `main.yml` and add any aws-sdk package with the `-e` flag to exclude it from the build. 
	
	For example, if you need to use `@aws-sdk/client-sts`, you can use the following command:
    ```yml
    npx @vercel/ncc build ./src/index.mjs -e @aws-sdk/client-sts
    ```
  - [Vercel ncc on npm](https://www.npmjs.com/package/@vercel/ncc): ESM + Relative imports without .js extension causes "ReferenceError: require is not defined in ES module scope" [#1123](https://github.com/vercel/ncc/issues/1123)






<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/diegofcornejo/lambda-github-actions.svg?style=for-the-badge
[contributors-url]: https://github.com/diegofcornejo/lambda-github-actions/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/diegofcornejo/lambda-github-actions.svg?style=for-the-badge
[forks-url]: https://github.com/diegofcornejo/lambda-github-actions/network/members
[stars-shield]: https://img.shields.io/github/stars/diegofcornejo/lambda-github-actions.svg?style=for-the-badge
[stars-url]: https://github.com/diegofcornejo/lambda-github-actions/stargazers
[issues-shield]: https://img.shields.io/github/issues/diegofcornejo/lambda-github-actions.svg?style=for-the-badge
[issues-url]: https://github.com/diegofcornejo/lambda-github-actions/issues
[license-shield]: https://img.shields.io/github/license/diegofcornejo/lambda-github-actions.svg?style=for-the-badge
[license-url]: https://github.com/diegofcornejo/lambda-github-actions/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]:https://www.linkedin.com/in/diego-cornejo-devops-sre/
<!-- [product-screenshot]: images/screenshot.png -->
