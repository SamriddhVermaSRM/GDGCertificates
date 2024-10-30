import { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [pageData, setPageData] = useState();
	var data;
	useEffect(() => {
		fetchProfilePageString('tii').then((data) => {
			setPageData(data);
		});
	}, []);
	pageData ? (data = exportBadgeLinks(pageData)) : console.log('no data');
	console.log(pageData);
	return <></>;
}

async function fetchProfilePageString(url) {
	const response = await fetch(
		'http://localhost:8080/https://www.cloudskillsboost.google/public_profiles/b96d480e-d673-4ae5-9845-06bc9d72c153',
		{
			method: 'GET',
		}
	);
	const data = await response.text();
	return data;
}

export default App;

const exportBadgeLinks = (data) => {
	const name = data.split('<title>')[1].split('|')[0];
	const links = data.split('<a class="badge-image" href="').slice(1);
	const linkToBadge = links.map((link) => link.split('">')[0]);
	const linkToImage = links.map((link) => link.split('src="')[1].split('"')[0]);
	console.log(linkToBadge);
	console.log(linkToImage);
	console.log(name);

	const obj = {
		name: name,
		links: {
			badges: linkToBadge,
			images: linkToImage,
		},
	};
	return obj;
};
