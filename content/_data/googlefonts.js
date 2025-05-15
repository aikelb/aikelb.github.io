import Fetch from "@11ty/eleventy-fetch";

export default async function () {
	let url =
		"https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
	let fontCss = await Fetch(url, {
		duration: "1d",
		type: "text",
		fetchOptions: {
			headers: {
				// lol
				"user-agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
			},
		},
	});
	return fontCss;
}
