import { useState, useEffect } from 'react';
import './App.css';

function App() {
	// take the url from user input
	const url =
		'https://www.cloudskillsboost.google/public_profiles/b3487dc3-9b6f-4b3a-90bc-8bd65c3a8aea';
	const [pageData, setPageData] = useState();
	var data;
	useEffect(() => {
		// fetch full user page data
		fetchProfilePageString(url).then((data) => {
			setPageData(data);
		});
	}, []);
	// when page data is fetched, export badge links and everything else
	pageData ? (data = exportBadgeLinks(pageData)) : console.log('no data');

	// received data
	console.log(data);

	return <></>;
}

async function fetchProfilePageString(url) {
	const response = await fetch('http://localhost:8080/' + url, {
		method: 'GET',
	});
	const data = await response.text();
	return data;
}

export default App;

const exportBadgeLinks = (data) => {
	const name = data.split('<title>')[1].split('|')[0];
	const links = data.split('<a class="badge-image" href="').slice(1);
	const linkToBadge = links.map((link) => link.split('">')[0]);
	const linkToImage = links.map((link) => link.split('src="')[1].split('"')[0]);
	// console.log(linkToBadge);
	// console.log(linkToImage);
	// console.log(name);

	const obj = {
		name: name,
		links: {
			badges: linkToBadge,
			images: linkToImage,
		},
	};
	return obj;
};
