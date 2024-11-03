import { useEffect, useState } from 'react';
import CertificateDetails from './CertificateDetails';
import ViewCertificate from './ViewCertificate';
import { Routes, Route } from 'react-router-dom';

function Certificate() {
	const [ProfileURL, setProfileURL] = useState();
	// https://www.cloudskillsboost.google/public_profiles/b3487dc3-9b6f-4b3a-90bc-8bd65c3a8aea

	const server = window.location.href
		.split('/')[2]
		.split(':')[0]
		.replace('3000', '8080');

	useEffect(() => {
		ProfileURL
			? fetchData(ProfileURL).then((data) => {
					data ? handleDataFetch(data) : {};
					// window.location.href = '/error'
			  })
			: console.log('waiting for user input');
	}, [ProfileURL]);

	const fetchData = async (url) => {
		console.log('fetching data started');

		try {
			const response = await fetch('http://167.71.225.221:8080/' + url, {
				method: 'GET',
			});
			if (!response.ok) {
				throw new Error('You might have entered an invalid or wrong URL');
			}
			const data = await response.text();
			const name = data.split('<title>')[1].split('|')[0];
			const links = data.split('<a class="badge-image" href="').slice(1);
			const linkToBadge = links.map((link) => link.split('">')[0]);
			const linkToImage = links.map(
				(link) => link.split('src="')[1].split('"')[0]
			);

			const obj = {
				name: name,
				links: {
					badges: linkToBadge,
					images: linkToImage,
				},
			};
			return obj;
		} catch (error) {
			console.error(error);
			return undefined;
		}
	};

	const handleDataFetch = (data) => {
		console.log('fetched data');
		localStorage.setItem('data', JSON.stringify(data));
		var dataURL = JSON.stringify(data);
		window.location.href = '/certificate/view?data=' + dataURL;
	};

	return (
		<>
			<Routes>
				<Route
					path='/'
					element={<CertificateDetails setProfileURL={setProfileURL} />}
				/>
				<Route
					path='/view'
					element={<ViewCertificate />}
				/>
			</Routes>
		</>
	);
}

export default Certificate;

// (window.location.href = '/error')
